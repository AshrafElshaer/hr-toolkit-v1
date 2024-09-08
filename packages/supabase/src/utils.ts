export async function safeAsync<T, E extends Error = Error>(
  callbackFn: () => Promise<T>,
): Promise<{
  data: T | null;
  error: E | null;
}> {
  try {
    const data = await callbackFn();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? (error as E)
          : (new Error("Unknown error") as E),
    };
  }
}
