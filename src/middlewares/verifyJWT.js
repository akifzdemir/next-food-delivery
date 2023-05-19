import jwt from 'jsonwebtoken';

const verifyJWT = (token) => {
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        return { userId: verify.user.id, role: verify.user.role };
    } catch (err) {
        throw new Error("Invalid token")
    }
};

export default verifyJWT;
