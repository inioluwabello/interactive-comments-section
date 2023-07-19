'use client';

import { ChangeEvent, useEffect, useState } from "react";
import CommentItem from "./CommentItem"
import { IComment, commentSlice, selectComments, selectCurrentUser, useDispatch, useSelector } from "@/lib/redux";
import { nanoid } from "@reduxjs/toolkit";

const Comments = () => {

    const dispatch = useDispatch();
    
    const comments = useSelector(selectComments)
    const currentUser = useSelector(selectCurrentUser)
    const [commentValue, setCommentValue] = useState("");
    
    const handleCommentsInput = (e: ChangeEvent<HTMLTextAreaElement>): void =>  {
        setCommentValue(e.target.value)
    }

    const handleSend = () => {
        dispatch(commentSlice.actions.addComment({
            content: commentValue,
            createdAt: Date.now().toString(),
            id: nanoid(),
            score: 0,
            user: currentUser,
            replies: []
        }))
        setCommentValue("");
    }

    return (
        <main className="main">
            {comments && comments.map((comment: IComment) => {
                return (
                    <CommentItem key={comment.id} comment={comment} currentUser={currentUser} />
                )
            })}

            {currentUser && <div className="comment-box space-between">
                <img src={currentUser.image.png} alt="user" className="user-image" />
                <textarea 
                    name="comment-input" 
                    id="comment-input" 
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={commentValue}
                    onChange={handleCommentsInput}></textarea>
                <button className="btn pry-bg" onClick={handleSend}>SEND</button>
            </div>}
        </main>
    )
}

export default Comments