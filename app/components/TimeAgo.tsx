import { parseISO, formatDistanceToNow } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = ''
  try{
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    } catch (e) {
        console.log(e)
    }

  return (
    <span title={timestamp}>
      {" "}{timeAgo}
    </span>
  )
}
export default TimeAgo;