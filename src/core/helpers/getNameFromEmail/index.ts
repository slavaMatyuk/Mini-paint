const getNameFromEmail = (text: string): string => {
  const name = text.split('@')[0];
  return name[0].toUpperCase() + name.slice(1);
};

export default getNameFromEmail;
