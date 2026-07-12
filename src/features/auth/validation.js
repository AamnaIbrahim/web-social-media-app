export const loginRules = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
  },
  password: {
    required: 'Password is required',
  },
};

export const registerRules = {
  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
  },
  username: {
    required: 'Username is required',
    pattern: {
      value: /^[a-z0-9_]{3,20}$/,
      message: '3–20 characters, lowercase letters, numbers and underscores only',
    },
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
  },
};