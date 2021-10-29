const getNameFromEmail = (text: string): string => {
  const name = text.split('@')[0];
  return `Hello, ${name[0].toUpperCase()}${name.slice(1)}!`;
};

export default getNameFromEmail;
