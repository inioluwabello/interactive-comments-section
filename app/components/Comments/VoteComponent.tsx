import { commentSlice, useDispatch } from "@/lib/redux";

interface VoteComponentProps {
    votes: number
    commentId: string
    originalCommentId?: string
}

const VoteComponent = ({ originalCommentId, votes, commentId }: VoteComponentProps) => {

    const dispatch = useDispatch();
    return (
        <div className="vote-box-inner">
            <a className="vote-action" 
                onClick={() => { 
                    dispatch(commentSlice.actions.handleScoreUpdate({ 
                        originalCommentId, 
                        commentId, 
                        value: 1 
                    })) 
                }}>+</a>
            <span className="vote-action">{votes}</span>
            <a className="vote-action" 
                onClick={() => { 
                    dispatch(commentSlice.actions.handleScoreUpdate({ 
                        originalCommentId, 
                        commentId, 
                        value: -1 
                    })) 
                }}>-</a>
        </div>
    )
}

export default VoteComponent;