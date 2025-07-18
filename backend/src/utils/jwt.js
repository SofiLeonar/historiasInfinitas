import jwt from "jsonwebtoken";

const SECRET = "s3cr3t"; // Usá la misma clave en todo tu backend

export function createToken({ id, rol, nombre }) {
  return jwt.sign({ id, rol, nombre }, "s3cr3t", {
    expiresIn: "2h",
  });
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
