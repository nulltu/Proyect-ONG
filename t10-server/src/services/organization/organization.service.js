const { Slides } = require('../../models/index');

const organizationService = {
  getSlides: async (organizationId) => {
    const res = await Slides.findAll({ where: { organizationId } });
    return res;
  },
  postSlides: async (data) => {
    const res = await Slides.create(data);
    return res;
  },
};

module.exports = organizationService;
