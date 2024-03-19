/**
 * Utility Method to create options for a fetch call
 * @param method GET, POST, PUT, DELETE
 * @param body  The request body (only relevant for POST and PUT)
 * @returns
 */
export function makeOptions(
  method: string,
  body: object | null,
  headers: object = {},
  addToken?: boolean
): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  if (addToken){
    //@ts-expect-error // Ignore this line, it works u fuck
    opts.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return opts;
}

/**
 * Utility Method to handle http-errors returned as a JSON-response with fetch
 * Meant to be used in the first .then() clause after a fetch-call
 */
export async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message
      ? errorResponse.message
      : "No details provided";
    throw new Error(msg);
  }
  return res.json();
}
