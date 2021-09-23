const bcrypt = require('bcryptjs');

function passwordIsMatched(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}

module.exports = passwordIsMatched;