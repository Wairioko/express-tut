import bcrypt from "bcrypt";

export const passwordHash = (password) => {
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);
    console.log(`Password: ${password}, Salt: ${salt}, Hashed Password: ${hashed_password}`);
    return hashed_password;
};
