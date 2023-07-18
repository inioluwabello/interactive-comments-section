import { commentSlice, useDispatch } from "@/lib/redux";

interface VoteComponentProps {
    votes: number,
    commentId: number
}

const VoteComponent = ({ votes, commentId }: VoteComponentProps) => {

    const dispatch = useDispatch();
    return (
        <div className="vote-box-inner">
            <a className="vote-action" onClick={() => { dispatch(commentSlice.actions.incrementScore(commentId)) }}>+</a>
            <span className="vote-action">{votes}</span>
            <a className="vote-action" onClick={() => { dispatch(commentSlice.actions.decrementScore(commentId)) }}>-</a>
        </div>
    )
}

export default VoteComponent;