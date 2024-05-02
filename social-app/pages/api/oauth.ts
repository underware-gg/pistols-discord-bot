import type { NextApiHandler } from 'next';
import type { RESTGetAPIUserResult } from 'discord-api-types/v8';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import dayjs from 'dayjs';
import urlcat from 'urlcat';
import axios from 'axios';

// Configuration constants
// TODO: Add these to environment variables
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const JWT_SECRET = 'thisisasecret';

// The URL that we will redirect to
// note: this should be an environment variable
// but I'll cover that in part 2 since
// it will work fine locally for the time being
const REDIRECT_URL = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL;

// Scopes we want to be able to access as a user
const scope = ['identify'].join(' ');

// URL to redirect to outbound (to request authorization)
const OAUTH_URL = urlcat('https://discord.com/api/oauth2/authorize', {
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URL,
  response_type: 'token',
  scope,
});

/**
 * Exchanges an OAuth code for a full user object
 * @param code The code from the callback querystring
 */
async function exchangeCode(code: string) {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    redirect_uri: REDIRECT_URL,
    grant_type: 'authorization_code',
    code,
    scope,
  }).toString();

  const { data: auth } = await axios.post<{ access_token: string; token_type: string }>(
    'https://discord.com/api/oauth2/token',
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );

  const { data: user } = await axios.get<RESTGetAPIUserResult>(
    'https://discord.com/api/users/@me',
    { headers: { Authorization: `Bearer ${auth.access_token}` } },
  );
  // Include Discord ID in the user object
  user.id = user.id;
  return { user, auth };
}

/**
 * Generates the set-cookie header value from a given JWT token
 */
function getCookieHeader(token: string) {
  return serialize('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    expires: dayjs().add(1, 'day').toDate(),
    sameSite: 'lax',
  });
}

const handler = async (req, res) => {
  const { code = null } = req.query;

  if (!code) {
    res.redirect(OAUTH_URL);
    return;
  }

  try {
    const { user, auth } = await exchangeCode(code);
    const token = sign({ user, auth }, JWT_SECRET, { expiresIn: '24h' });
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      expires: dayjs().add(1, 'day').toDate(),
      sameSite: 'lax',
    });
    res.setHeader('Set-Cookie', cookie);

    res.redirect('/dashboard'); // Redirect directly to dashboard
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export default handler;