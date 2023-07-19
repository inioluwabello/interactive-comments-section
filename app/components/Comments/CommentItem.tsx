import {IComment, IUser, commentSlice, useDispatch } from "@/lib/redux";
import VoteComponent from "./VoteComponent"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

interface CommentItemProp {
    originalCommentId?: string
    comment: IComment
    currentUser: IUser
    setShowingModal: Dispatch<SetStateAction<boolean>>
    setDeleteId: Dispatch<SetStateAction<string>>
}

const CommentItem = ({ originalCommentId, comment, currentUser, setShowingModal, setDeleteId }: CommentItemProp) => {
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
        if (replyValue.length > 0)
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

    const handleDelete = (id:string) => {
        setShowingModal(true);
        setDeleteId(id)
    }

    return (
        <>
            <div className="comment">
                <div className="space-between">
                    <div className="desktop vote-box">
                        <VoteComponent votes={comment.score} commentId={comment.id} originalCommentId={originalCommentId} />
                    </div>
                    <div className="comment-area">
                        <div className="space-between">
                            <div className="comment-info">
                                <div className="flex">
                                    <img src={comment.user.image.png} alt="user" className="comment-info-item user-image" />
                                    <div className="comment-info-item username bold">{comment.user.username}</div>
                                    {currentUser && comment.user.username === currentUser.username &&
                                        <div className="comment-info-item author">you</div>
                                    }
                                    <div className="comment-info-item time">{comment.createdAt}</div>
                                </div>
                            </div>

                            {/* Reply, Edit & Delete buttons */}
                            <div className="desktop comment-actions">
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
                                    <a className="delete-btn" onClick={() => { handleDelete(comment.id) }}>
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
                        {editing && <div className="desktop edit-box space-between">
                            <textarea className="comment-input edit-area" value={editValue} onChange={handleEditInput}></textarea>
                            <button className="btnn pry-bg" 
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
                        </div>}

                        {editing && <div className="mobile edit-box">
                            <textarea className="comment-input edit-area" value={editValue} onChange={handleEditInput}></textarea>
                            <div className="text-right mt-1">
                                <button className="btnn pry-bg" 
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
                        </div>}
                    </div>
                </div>
                
                <div className="mobile mobile-actions">
                    <div className="space-between">
                        <div className="vote-box">
                            <VoteComponent votes={comment.score} commentId={comment.id} originalCommentId={originalCommentId} />
                        </div>

                        {/* Mobile: Reply, Edit & Delete buttons */}
                        <div className="comment-actions">
                            {currentUser && comment.user.username !== currentUser.username &&
                                <a className="reply-btn" onClick={() => {
                                    setReplying(true)
                                }}>
                                    <img src="/images/icon-reply.svg" alt="reply" />
                                    Reply
                                </a>
                            }

                            {!editing && currentUser && comment.user.username === currentUser.username &&
                                <div className="crud-actions">
                                    <a className="delete-btn" onClick={() => { handleDelete(comment.id) }}>
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
                </div>
            </div>

            {/* Reply box */}
            {replying && currentUser && <div className="desktop comment-box space-between">
                <img src={currentUser.image.png} alt="user" className="user-image" />
                <textarea 
                    name="comment-input" 
                    id="comment-input" 
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={replyValue}
                    onChange={handleReplyInput}></textarea>
                <button className="btnn pry-bg" onClick={handleReply}>REPLY</button>
            </div>}

            {replying && currentUser && <div className="mobile comment-box">
                <textarea 
                    name="comment-input" 
                    id="comment-input" 
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={replyValue}
                    onChange={handleReplyInput}></textarea>
                <div className="space-between mt-1">
                    <img src={currentUser.image.png} alt="user" className="user-image" />
                    <button className="btnn pry-bg" onClick={handleReply}>REPLY</button>
                </div>
            </div>}

            {/* Reply Items */}
            {comment.replies && <div className="reply-box">
                {comment.replies.map((reply: IComment) => {
                    return <CommentItem 
                        key={reply.id} 
                        comment={reply} 
                        originalCommentId={comment.id}
                        currentUser={currentUser}
                        setShowingModal={setShowingModal}
                        setDeleteId={setDeleteId}
                    />
                })}
            </div>}
        </>
    )
}

export default CommentItem;