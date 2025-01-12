import JWT from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { PRIVATE_SECRET_STRING } from "$env/static/private";

const SECRET = PRIVATE_SECRET_STRING

export const jwt = {
    get(user: Payload) {
        return JWT.sign(user, SECRET, { expiresIn: '7d' })
    },
    verify(token: string) {
        try {
            return JWT.verify(token, SECRET) as Payload
        } catch (e) {
            return null
        }
    }
}

export const hash = {
    get(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },
    isValid(password: string, hash: string) {
        return bcrypt.compareSync(password, hash)
    }
}