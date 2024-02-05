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
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
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
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
  font-weight: 600;
`
const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default function StudentsItem(props) {
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const student = props.tableData
  const studentPayment = student.studentPayment[0]
  const studentSubject = student.studentPayment[0]?.subject

  const fametDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours().toString().padStart(2, '0')}시`
      return formatted
    } else {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} `
      return formatted
    }
  }
  const feeFormet = fee => {
    const result = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <TcreatedAt>
            <EllipsisBox>
              {studentPayment?.paymentDate
                ? fametDate(studentPayment?.paymentDate, true)
                : '-'}
            </EllipsisBox>
          </TcreatedAt>
          <Tamount className="fee">
            <EllipsisBox>
              {studentPayment?.tuitionFee === undefined ||
              studentPayment?.tuitionFee === null
                ? '-'
                : feeFormet(studentPayment?.tuitionFee)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="discount">
            <EllipsisBox>
              {studentPayment?.discountAmount === undefined ||
              studentPayment?.discountAmount === null
                ? '-'
                : feeFormet(studentPayment?.discountAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="actual">
            <EllipsisBox>
              {studentPayment?.actualAmount === undefined ||
              studentPayment?.actualAmount === null
                ? '-'
                : feeFormet(studentPayment?.actualAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="unpaid">
            <EllipsisBox>
              {studentPayment?.unCollectedAmount === undefined ||
              studentPayment?.unCollectedAmount === null
                ? '-'
                : feeFormet(studentPayment?.unCollectedAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="amount">
            <EllipsisBox>
              {studentPayment?.actualAmount === undefined ||
              studentPayment?.actualAmount === null
                ? '-'
                : feeFormet(studentPayment?.actualAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="amount">
            <EllipsisBox>
              {studentPayment?.actualAmount === undefined ||
              studentPayment?.actualAmount === null
                ? '-'
                : feeFormet(studentPayment?.actualAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="amount">
            <EllipsisBox>
              {studentPayment?.actualAmount === undefined ||
              studentPayment?.actualAmount === null
                ? '-'
                : feeFormet(studentPayment?.actualAmount)}
            </EllipsisBox>
          </Tamount>
          <Tamount className="fee">
            <EllipsisBox>
              {studentPayment?.tuitionFee === undefined ||
              studentPayment?.tuitionFee === null
                ? '-'
                : feeFormet(studentPayment?.tuitionFee)}
            </EllipsisBox>
          </Tamount>
        </TableRow>
      </TableItem>
    </>
  )
}
