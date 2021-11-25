const MAX_LENGTH = 50;

const isValidEmail = (email: string): boolean => (
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)
  && (email.length <= MAX_LENGTH)
);

export default isValidEmail;
