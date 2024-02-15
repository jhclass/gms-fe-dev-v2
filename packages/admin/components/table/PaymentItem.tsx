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
const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;

  &.fee {
    color: #7dce00;
  }
  &.discount {
    color: #f85294;
  }
  &.actual {
    color: #0eacab;
  }
  &.unpaid {
    color: #ff5900;
  }
  &.amount {
    color: #043999;
  }
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.09}px;
  font-weight: 600;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 18%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.18}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
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
  const studentPayment = student.studentPayment || []

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
          <Link href={`/students/detail/${studentPayment.studentId}`}>
            <ClickBox>
              <Tnum>{(props.currentPage - 1) * conLimit + (conIndex + 1)}</Tnum>
              <TcreatedAt>
                <EllipsisBox>
                  {student?.depositDate
                    ? getDate(student?.depositDate)
                    : student?.paymentDate
                    ? getDate(student?.paymentDate)
                    : '-'}
                </EllipsisBox>
              </TcreatedAt>
              <Tname>
                <EllipsisBox>{student?.stName}</EllipsisBox>
              </Tname>
              <Tmanager>
                <EllipsisBox>{student?.receiver?.mUsername}</EllipsisBox>
              </Tmanager>
              <Tsubject>
                <EllipsisBox>
                  {studentPayment?.subject?.subjectName}
                </EllipsisBox>
              </Tsubject>
              <Tamount className="fee">
                <EllipsisBox>
                  {studentPayment?.tuitionFee === undefined ||
                  studentPayment?.tuitionFee === null
                    ? '0'
                    : feeFormet(studentPayment?.tuitionFee)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="discount">
                <EllipsisBox>
                  {studentPayment?.discountAmount === undefined ||
                  studentPayment?.discountAmount === null
                    ? '0'
                    : feeFormet(studentPayment?.discountAmount)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="actual">
                <EllipsisBox>
                  {studentPayment?.actualAmount === undefined ||
                  studentPayment?.actualAmount === null
                    ? '0'
                    : feeFormet(studentPayment?.actualAmount)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="unpaid">
                <EllipsisBox>
                  {studentPayment?.unCollectedAmount === undefined ||
                  studentPayment?.unCollectedAmount === null
                    ? '0'
                    : feeFormet(studentPayment?.unCollectedAmount)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="amount">
                {/* <EllipsisBox>{feeFormet(studentPayment.name)}</EllipsisBox> */}
                <EllipsisBox>
                  {student?.amountPayment === undefined ||
                  student?.amountPayment === null
                    ? '0'
                    : feeFormet(student?.amountPayment)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="amount">
                {/* <EllipsisBox>{feeFormet(studentPayment.name)}</EllipsisBox> */}
                <EllipsisBox>
                  {student?.depositAmount === undefined ||
                  student?.depositAmount === null
                    ? '0'
                    : feeFormet(student?.depositAmount)}
                </EllipsisBox>
              </Tamount>
              <Tamount className="amount">
                {/* <EllipsisBox>{feeFormet(studentPayment.name)}</EllipsisBox> */}
                <EllipsisBox>
                  {studentPayment?.amountReceived === undefined ||
                  studentPayment?.amountReceived === null
                    ? '0'
                    : feeFormet(studentPayment?.amountReceived)}
                </EllipsisBox>
              </Tamount>
            </ClickBox>
          </Link>
        </TableRow>
      </TableItem>
    </>
  )
}
