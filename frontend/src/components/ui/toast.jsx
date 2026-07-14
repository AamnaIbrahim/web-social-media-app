import toast from 'react-hot-toast';

export const showToast = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast(msg),
  promise: (promise, msgs) => toast.promise(promise, msgs),
};