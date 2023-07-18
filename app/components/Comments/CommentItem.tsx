import { IComment, IUser, commentSlice, useDispatch } from "@/lib/redux";
import VoteComponent from "./VoteComponent"

interface CommentItemProp {
    comment: IComment
    currentUser: IUser | null
}

const CommentItem = ({ comment, currentUser }: CommentItemProp) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="comment">
                <div className="space-between">
                    <div className="vote-box">
                        <VoteComponent votes={comment.score} commentId={comment.id} />
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

                            <div className="comment-actions">
                                {currentUser && comment.user.username !== currentUser.username && 
                                <a className="reply-btn" onClick={() => { dispatch(commentSlice.actions.reply(comment.id)) }}>
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
                                    
                                    <a className="edit-btn" onClick={() => { dispatch(commentSlice.actions.edit(comment.id)) }}>
                                        <img src="/images/icon-edit.svg" alt="reply" />
                                        Edit
                                    </a>
                                </div>
                                }
                            </div>
                        </div>

                        <div className="content">{comment.content}</div>
                    </div>
                </div>
            </div>

            <div className="reply-box">
                {comment.replies.map((reply: IComment) => {
                    return <CommentItem key={reply.id} comment={reply} currentUser={currentUser} />
                })}
            </div>
        </>
    )
}

export default CommentItem;