import jwt from "jsonwebtoken";

const issueToken = (userId) => {
  console.log("userId", userId);
  const options = {
    expiresIn: "2d",
  };
  const payload = {
    sub: userId,
    aud: "tom",
  };
  const secretOrPrivateKey = "something-really-hard-to-guess";

  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);

  return jwtToken;
};

export { issueToken };
