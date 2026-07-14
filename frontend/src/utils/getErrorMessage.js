export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return "Couldn't reach the server. Please check your connection and try again.";
  }

  if (error?.message && !error.message.includes('status code')) {
    return error.message;
  }

  return fallback;
}