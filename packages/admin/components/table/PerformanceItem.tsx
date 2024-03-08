import { styled } from 'styled-components'
import Link from 'next/link'

type ConsultItemProps = {
  tableData: {
    adviceTypes: any
    id: number
    stName: string
    phoneNum1: string
    progress: number
    subDiv: string
    stVisit: string
    createdAt: string
    receiptDiv: string
    pic: string
  }
  forName?: string
  itemIndex: number
  currentPage: number
  limit?: number
  favorite?: boolean
  favoTotal?: number
  flagNum?: number
  checkBtn?: boolean
  checkItem?: number[]
  setCheckItem?: (newItems: number[]) => void
}

const TableItem = styled.div`
  position: relative;
  display: table;
  width: 100%;
  min-width: fit-content;
  border: 1px solid #e4e4e7;
  border-bottom: 0;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
`

const TableRow = styled.div`
  position: relative;
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem auto; */
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.15}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.2}px;
`
const TSubject = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.4}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.25}px;
`
const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default function PerformanceItem(props) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const paymentData = props.tableData

  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }
  const feeFormet = fee => {
    const result = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <ClickBox>
            <Tnum> {(props.currentPage - 1) * conLimit + (conIndex + 1)}</Tnum>
            <TcreatedAt>
              <EllipsisBox>{getDate(paymentData?.createdAt)}</EllipsisBox>
            </TcreatedAt>
            <TSubject>
              <EllipsisBox>{paymentData.subject.subjectName}</EllipsisBox>
            </TSubject>
            <Tamount>
              <EllipsisBox>{feeFormet(paymentData?.actualAmount)}</EllipsisBox>
            </Tamount>
          </ClickBox>
        </TableRow>
      </TableItem>
    </>
  )
}
