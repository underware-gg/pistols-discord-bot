import { destroyCookie } from "nookies";

const handler = (req, res) => {

  destroyCookie(null, "token");

  res.writeHead(302, { Location: "/" });
  res.end();
}

export default handler;
