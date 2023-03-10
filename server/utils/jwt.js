import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = { sub: userId }; // expiration date can  be added also here as exp: 123213234

  const options = {
    expiresIn: "2d",
    issuer: "K. E. A.",
  };

  //Put the secret in your .env file!!!
  const secretOrPrivateKey = "And the sky is blue!";

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  return token;
};

export default generateToken;
