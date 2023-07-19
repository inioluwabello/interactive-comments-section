import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp }) => {
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
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
export default TimeAgo;