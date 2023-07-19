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
    
    const [showingModal, setShowingModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const handleClose = () => setShowingModal(false);
    const handleDelete = () => {
        dispatch(commentSlice.actions.delete(deleteId))
        setDeleteId("");
        setShowingModal(false);
    }

    return (
        <main className="main">
            {comments && comments.map((comment: IComment) => {
                return (
                    <CommentItem 
                        key={comment.id} 
                        comment={comment} 
                        currentUser={currentUser}
                        setShowingModal={setShowingModal}
                        setDeleteId={setDeleteId}
                         />
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
                <button className="btnn pry-bg" onClick={handleSend}>SEND</button>
            </div>}

            {showingModal && <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header bold">Delete commment</div>
                    <div className="modal-body">
                        Are you sure you want to delete this comment?
                        This will remove the comment and can't be undone.
                    </div>
                    <div className="footer">
                        <div className="space-between">
                            <button onClick={handleClose} className="btnn btn-grey">NO, CANCEL</button>
                            <button onClick={handleDelete} className="btnn btn-red">YES, DELETE</button>
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default Comments