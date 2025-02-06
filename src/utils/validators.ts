export const isEmailValid = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const nameValidator = (name: string): boolean => {
  return /^[a-zA-Z]{2,}$/.test(name);
};

export const isPasswordStrong = (password: string): boolean => {
  return /^(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(password);
};