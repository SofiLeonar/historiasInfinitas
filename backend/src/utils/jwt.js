import jwt from "jsonwebtoken";

export function createToken(payload) {
    return jwt.sign(payload, "s3cr3t",{
        expiresIn: "2h"
    });
}

export function verifyToken(token) {
    return jwt.verify(token, "s3cr3t");
}   