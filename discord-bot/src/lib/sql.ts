export async function queryTorii<ResponseRaw, Response>(
  toriiUrl: string,
  query: string,
  formatFn: (rows: ResponseRaw) => Response
): Promise<Response> {
  const _query = query.split('\n').join(' ').trim(); // remove newlines
  try {
    const response = await fetch(`${toriiUrl}/sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: _query,
    });
    if (!response.ok) throw new Error(`Not ok`);
    return formatFn(await response.json() as ResponseRaw);
  } catch (error) {
    console.error(`queryTorii() Error fetching data:`, error, query);
    throw error;
  }
}
