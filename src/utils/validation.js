export const validateUsername = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.length < 3 || username.length > 20) {
    return "Username must be 3-20 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "Email is required";
  }

  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must contain at least 6 characters";
  }

  return "";
};

export const validateFullName = (name) => {
  if (!name.trim()) {
    return "Full name is required";
  }

  if (name.trim().length < 2) {
    return "Name must contain at least 2 characters";
  }

  return "";
};