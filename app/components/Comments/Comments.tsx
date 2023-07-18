"use client";

import CommentItem from "./CommentItem"
import { IComment, selectComments, selectCurrentUser, useSelector } from "@/lib/redux";

const Comments = () => {
    const comments = useSelector(selectComments)
    const currentUser = useSelector(selectCurrentUser)

    return (
        <main className="main">
            {comments && comments.map((comment: IComment) => {
                return (
                    <CommentItem key={comment.id} comment={comment} currentUser={currentUser} />
                )
            })}

            <div className="comment-box space-between">
                <img src={currentUser.image.png} alt="user" className="user-image" />
                <textarea name="comment-input" id="comment-input" placeholder="Add a comment..." className="comment-input"></textarea>
                <button className="btn pry-bg">SEND</button>
            </div>
        </main>
    )
}

export default Comments