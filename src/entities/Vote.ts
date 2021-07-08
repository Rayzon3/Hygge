import {Entity as TOEntity, Column, Index, BeforeInsert, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import Entity from "./Entity"
import { User } from "./User";
import Comment from "./Comment";

@TOEntity("votes")
export class Vote extends Entity {
    post: import("/Users/rahulbhardwaj/Documents/Dev/nextjs/Hygge/src/entities/Post").default;

    constructor(vote: Partial<Vote>){
        super()
        Object.assign(this, vote)
    }

    @Column()
    value: number

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User

    @Column()
    username: string

    @ManyToOne(() => Comment)
    comment: Comment
   
}
