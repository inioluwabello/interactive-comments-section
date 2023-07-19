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
            <a className="vote-item text-center vote-action" 
                onClick={() => { 
                    dispatch(commentSlice.actions.handleScoreUpdate({ 
                        originalCommentId, 
                        commentId, 
                        value: 1 
                    })) 
                }}>
                    <img src="/images/icon-minus.svg" alt="minus" />
                </a>
            <span className="vote-item vote-score">{votes}</span>
            <a className="vote-item text-center vote-action" 
                onClick={() => { 
                    dispatch(commentSlice.actions.handleScoreUpdate({ 
                        originalCommentId, 
                        commentId, 
                        value: -1 
                    })) 
                }}>
                    <img src="/images/icon-plus.svg" alt="plus" />
                </a>
        </div>
    )
}

export default VoteComponent;