const crypto = require('crypto');

const createHash = () => {
  const hash = crypto
    .randomBytes(Math.ceil((8 * 3) / 4))
    .toString('base64')
    .slice(0, 8)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');
  return hash;
};

module.exports = createHash;
