import { parseISO, format } from 'date-fns'

interface IDateProps {
  dateString: string
}

export default function Date(props: IDateProps) {
  const { dateString } = props
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  )
}