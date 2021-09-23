const bcrypt = require('bcryptjs');

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(password, salt);
    return hashed;
}

module.exports = hashPassword;