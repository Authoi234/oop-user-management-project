import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(pass) {
    const hash = await bcrypt.hash(pass, saltRounds);
    return hash;
}

export async function verifyPassword(inputPassword, hash) {
    const match = await bcrypt.compare(inputPassword, hash);
    return match;
}


