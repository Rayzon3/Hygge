import { Request, Response, Router } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";
import auth from "../middleware/auth";

const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  //validate vote value
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: "Value must -1, 0, or 1" });
  }

  try {
   const user: User = res.locals.user
   let post = await Post.findOneOrFail({ identifier, slug })
   let vote: Vote | undefined
   let comment: Comment | undefined
   if(commentIdentifier){
     //find vote by comment
     comment = await Comment.findOneOrFail({ identifier: commentIdentifier })
     vote = await Vote.findOne({ user, comment })
   }  
   else{
     //find vote by post
     vote = await Vote.findOne({ user, post })
   }

   if(!vote && value === 0){
     return res.status(404).json({ error: "Vote not found" })
   }
   else if(!vote){
     vote = new Vote({ user, value })
     if(comment) vote.comment = comment
     else vote.post = post
     await vote.save()
   }
   else if(value === 0){
     await vote.remove()
   }
   else if(vote.value !== value){
     vote.value = value
     await vote.save()
   }
   post = await Post.findOne({ identifier, slug }, { relations: ["comments", "sub", "votes"] })

   return res.json(post)
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!!" });
  }
};

const router = Router();
router.post("/vote", auth, vote);

export default router;
