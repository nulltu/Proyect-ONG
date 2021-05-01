const demoTheme = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Themes', [
      {
        name: 'Default',
        backgroundColor: '#ffffff',
        borderColor: '#e1e4e8',
        tableColor: '#fafbfc',
        headerColor: '#ffffff',
        primaryColor: '#ffffff',
        lettersColor: '#000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dark',
        backgroundColor: '#0d1117',
        borderColor: '#30363d',
        tableColor: '#21262d',
        headerColor: '#161b22',
        primaryColor: '#30363d',
        lettersColor: '#ffffff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};

module.exports = demoTheme;
