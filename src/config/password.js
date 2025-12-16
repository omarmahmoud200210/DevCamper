import argon2 from "argon2";

const hashPassword = async (password) => {
    return await argon2.hash(password);
};

const verifyPassword = async (password, hash) => {
    return await argon2.verify(hash, password);
};


export { hashPassword, verifyPassword };
