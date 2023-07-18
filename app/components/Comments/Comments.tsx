"use client";

import { useEffect } from "react";
import CommentItem from "./CommentItem"
import { IComment, commentSlice, selectComments, selectCurrentUser, useDispatch, useSelector, userSlice } from "@/lib/redux";

const Comments = () => {
    const comments = useSelector(selectComments)
    const currentUser = useSelector(selectCurrentUser)

    const dispatch = useDispatch();
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await fetch('/data/data.json');
                const data = await response.json();
                console.log(data)

                dispatch(userSlice.actions.setCurrentUser(data.currentUser))
                dispatch(commentSlice.actions.setComments(data.comments))
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadInitialData();
    }, []);

    return (
        <main className="main">
            {comments && comments.map((comment: IComment) => {
                return (
                    <CommentItem key={comment.id} comment={comment} currentUser={currentUser} />
                )
            })}

            {currentUser && <div className="comment-box space-between">
                <img src={currentUser.image.png} alt="user" className="user-image" />
                <textarea name="comment-input" id="comment-input" placeholder="Add a comment..." className="comment-input"></textarea>
                <button className="btn pry-bg">SEND</button>
            </div>}
        </main>
    )
}

export default Comments