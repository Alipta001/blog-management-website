const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;


 // HASH PASSWORD
 const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

    return hashedPassword;
  } catch (error) {
    throw error;
  }
};



// COMPARE PASSWORD
const comparePassword = async (
  password,
  hashedPassword
) => {
  try {
    const isMatched = await bcrypt.compare(
      password,
      hashedPassword
    );

    return isMatched;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  hashPassword,
  comparePassword,
};