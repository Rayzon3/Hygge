import { Request, Response, Router } from "express";
import { User } from "../entities/User";

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body

    try {
        //validate data

        //create user
        const user = new User({ email, username, password })
        await user.save()

        //return user
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const router = Router()
router.post("/register", register)

export default router