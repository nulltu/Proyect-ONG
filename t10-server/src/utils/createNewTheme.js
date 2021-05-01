const createNewtheme = (body) => {
  const { name, primaryColor, lettersColor, backgroundColor } = body;

  return { name, primaryColor, lettersColor, backgroundColor };
};

module.exports = createNewtheme;
