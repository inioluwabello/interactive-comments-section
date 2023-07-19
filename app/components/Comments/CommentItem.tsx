import {IComment, IUser, commentSlice, useDispatch } from "@/lib/redux";
import VoteComponent from "./VoteComponent"
import { ChangeEvent, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

interface CommentItemProp {
    originalCommentId?: string
    comment: IComment
    currentUser: IUser
}

const CommentItem = ({ originalCommentId, comment, currentUser }: CommentItemProp) => {
    const dispatch = useDispatch();
    const [replyValue, setReplyValue] = useState("");
    const [editValue, setEditValue] = useState("");
    
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    
    const handleReplyInput = (e: ChangeEvent<HTMLTextAreaElement>): void =>  {
        setReplyValue(e.target.value)
    }

    const handleEditInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setEditValue(e.target.value)
    }

    const handleReply = () => {
        dispatch(commentSlice.actions.addReply({
            commentId: comment.id,
            comment: {
                content: replyValue,
                createdAt: Date.now().toString(),
                id: nanoid(),
                score: 0,
                user: currentUser,
                replyingTo: comment.user.username,
                replies: []
            },
        }))
        setReplyValue("");
        setReplying(false);
    }

    return (
        <>
            <div className="comment">
                <div className="space-between">
                    <div className="vote-box">
                        <VoteComponent votes={comment.score} commentId={comment.id} originalCommentId={originalCommentId} />
                    </div>
                    <div className="comment-area">
                        <div className="space-between">
                            <div className="comment-info">
                                <div className="flex">
                                    <img src={comment.user.image.png} alt="user" className="user-image" />
                                    <div className="username">{comment.user.username}</div>
                                    {currentUser && comment.user.username === currentUser.username &&
                                        <div className="author">you</div>
                                    }
                                    <div className="time">{comment.createdAt}</div>
                                </div>
                            </div>

                            {/* Reply, Edit & Delete buttons */}
                            <div className="comment-actions">
                                {currentUser && comment.user.username !== currentUser.username && 
                                <a className="reply-btn" onClick={() => { 
                                    setReplying(true)
                                    }}>
                                    <img src="/images/icon-reply.svg" alt="reply" />
                                    Reply
                                </a>
                                }
                                
                                {currentUser && comment.user.username === currentUser.username && 
                                <div className="crud-actions">
                                    <a className="delete-btn" onClick={() => { dispatch(commentSlice.actions.delete(comment.id)) }}>
                                        <img src="/images/icon-delete.svg" alt="reply" />
                                        Delete
                                    </a>
                                    
                                    <a className="edit-btn" onClick={() => { setEditing(true); setEditValue(comment.content) }}>
                                        <img src="/images/icon-edit.svg" alt="reply" />
                                        Edit
                                    </a>
                                </div>
                                }
                            </div>
                        </div>

                        {!editing && <div className="content">{comment.content}</div>}
                        {editing && <div className="edit-box">
                            <textarea className="edit-area" value={editValue} onChange={handleEditInput}></textarea>
                            <button className="btn pry-bg" 
                                onClick={() => { 
                                    dispatch(commentSlice.actions.update({
                                        content: editValue,
                                        createdAt: comment.createdAt,
                                        id: comment.id,
                                        score: comment.score,
                                        user: comment.user,
                                        replies: comment.replies,
                                        replyingTo: comment.replyingTo
                                    }));
                                    setEditing(false) 
                                }}>UPDATE</button>
                        </div>
                        }

                    </div>
                </div>
            </div>

            {replying && currentUser && <div className="comment-box space-between">
                <img src={currentUser.image.png} alt="user" className="user-image" />
                <textarea 
                    name="comment-input" 
                    id="comment-input" 
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={replyValue}
                    onChange={handleReplyInput}></textarea>
                <button className="btn pry-bg" onClick={handleReply}>REPLY</button>
            </div>}

            {comment.replies && <div className="reply-box">
                {comment.replies.map((reply: IComment) => {
                    return <CommentItem 
                        key={reply.id} 
                        comment={reply} 
                        originalCommentId={comment.id}
                        currentUser={currentUser} />
                })}
            </div>}
        </>
    )
}

export default CommentItem;