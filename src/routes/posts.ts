import { Request, Response, Router } from "express";
import Post from "../entities/Post";
import Sub from "../entities/Sub";

import auth from "../middleware/auth"

const createPost = async (req: Request, res: Response) => {
    const { title, body, sub } = req.body

    const user = res.locals.user

    if(title.trim() === ""){
        return res.status(400).json({ title: "The title must not be empty !!" })
    }

    try {
        //find sub
        const subRecord = await Sub.findOneOrFail({ name: sub })

        const post = new Post({ title, body, user, sub: subRecord })
        await post.save()
        return res.json(post)
    } catch (error) {
     console.log(error)
     return res.status(500).json({ error: "Oops, something went wrong :/" })   
    }

}

const router = Router()
router.post("/", auth, createPost)

export default router