export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
}

const RETRYABLE_STATUS = new Set([429, 503]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 2000,
  } = options;

  let delay = initialDelayMs;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      const status = error?.status;

      const shouldRetry =
        RETRYABLE_STATUS.has(status) &&
        attempt < maxAttempts;

      if (!shouldRetry) {
        throw error;
      }

      console.warn(
        `Attempt ${attempt}/${maxAttempts} failed with status ${status}. Retrying in ${delay}ms...`
      );

      await sleep(delay);

      delay *= 2;
    }
  }

  throw lastError;
}