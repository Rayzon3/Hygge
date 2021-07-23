import { Request, Response, Router } from "express";
import { validate, isEmpty } from "class-validator"
import { User }from "../entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import auth from "../middleware/auth"
import user from "../middleware/user";


const mapErrors = (errors: Object[]) => {
    return errors.reduce(( prev: any, err: any ) => {
        prev[err.property] = Object.entries(err.constraints)[0][1]
        return prev
    }, {})
}


const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body

    try {
        let errors: any = {}
        //validate data
        const emailUser = await User.findOne({ email })
        const usernameUser = await User.findOne({ username })

        if(emailUser) errors.email = "You made an oopsie :/ This email is already taken!"
        if(usernameUser) errors.username = "You made an oopsie :/ This username is already taken!"

        if(Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        //create user
        const user = new User({ email, username, password })
        errors = await validate(user)
        if(errors.length > 0) {
            
            return res.status(400).json(mapErrors(errors))
        }
        
        await user.save()

        //return user
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        let errors: any = {}

        if(isEmpty(username)) errors.username = "Username field must not be empty !!"
        if(isEmpty(password)) errors.password = "Password field must not be empty !!"
        if(Object.keys(errors).length > 0) return res.status(400).json(errors)

        const user = await User.findOne({ username })
        if(!user) return res.status(404).json({ username: "Worng username and password combination !!" })

        const passwordMatches = await bcrypt.compare(password, user.password) 
        if(!passwordMatches) return res.status(401).json({ password: "Worng username and password combination !!" })
        
        //gen JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET!) // idealing should be base62
        //store JWT in cookie
        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
            path: "/" //where cookie is valid, the whole site
        }))
        return res.json(user)

    } catch (error) {
        console.log(error)
        return res.json({ erroe: "Oops, that should not have happened :/ " })
    }
}

const logout = ( res: Response) => {
    res.set("Set-Cookie", cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),// expire immediately
        path: "/" //where cookie is valid, the whole site
    }))

    return res.status(200).json({ success: true })
}

const me =  ( res: Response) => {
   return res.json(res.locals.user)
}

const router = Router()
router.post("/register", register)
router.post("/login", login)
router.get("/me", user, auth, me)
router.get("/logout", user, auth, logout)

export default router