export async function readApiResponse(response) {
  const body = await response.text();
  let data;

  try {
    data = body ? JSON.parse(body) : {};
  } catch {
    throw new Error(
      `The server returned an unexpected response (${response.status}). Please check the backend deployment logs.`
    );
  }

  if (!response.ok) {
    throw new Error(data.message || 'The request could not be completed.');
  }

  return data;
}
