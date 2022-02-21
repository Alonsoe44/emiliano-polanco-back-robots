const bcrypt = require("bcrypt");

const password = "youaresafe";
const convert = async () => {
  const superPassword = await bcrypt.hash(password, 10);
  console.log(superPassword);
};

convert();
