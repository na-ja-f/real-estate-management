import jwt from "jsonwebtoken";

// interface UserPayload {
//     userId: string;
//     role: string;
// }

export const generateJWT = (user: any): string => {
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your_jwt_secret",
        {
            expiresIn: "30d",
        }
    );
    return token;
};