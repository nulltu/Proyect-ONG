const { Entries, EntriesTypes } = require('../../models/index');

const entryService = {
  getAllEntries: async (typeId) => {
    const res = await Entries.findAll({
      where: typeId ? { typeId } : undefined,
      include: [{ association: 'type' }],
    });
    return res;
  },
  createEntry: async (data) => {
    const res = await Entries.create(data);
    return res;
  },
  getOneById: async (id) => {
    const res = await Entries.findOne({ where: { id } });
    return res;
  },
  setUpdate: async (data, id) => {
    const res = await Entries.update(data, { where: { id } });
    return res;
  },
  deleteOneById: async (id) => {
    const res = await Entries.destroy({ where: { id } });
    return res;
  },
  getEntryType: async (type) => {
    if (!type) {
      return undefined;
    }
    const res = await EntriesTypes.findOne({
      where: { type },
    });
    return res;
  },
  getAllTypes: async () => EntriesTypes.findAll(),
};

module.exports = entryService;
