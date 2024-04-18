import { styled } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
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
  color: #043999;

  &.refund {
    color: #ff5900;
  }
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.4}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export default function StudentsItem(props) {
  const router = useRouter()
  const conLimit = props.limit || 0
  const conIndex = props.itemIndex
  const payment = props.tableData

  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }
  const feeFormet = fee => {
    const result = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  const clickLink = e => {
    if (payment?.refundApproval) {
      e.preventDefault()
    } else {
      router.push(`/students/edit/payment/${payment.id}`, undefined, {
        shallow: true,
      })
    }
  }

  return (
    <>
      <TableItem>
        <TableRow>
          <ClickBox>
            <Tnum>{(props.currentPage - 1) * conLimit + (conIndex + 1)}</Tnum>
            <TcreatedAt>
              <EllipsisBox>
                {payment?.paymentDate ? getDate(payment?.paymentDate) : '-'}
              </EllipsisBox>
            </TcreatedAt>
            <Tname>
              <EllipsisBox>{payment?.stName}</EllipsisBox>
            </Tname>
            <Tmanager>
              <EllipsisBox>{payment?.receiver?.mUsername}</EllipsisBox>
            </Tmanager>
            <Tsubject>
              <EllipsisBox>{`[${payment?.studentPayment?.subject?.round}회차] ${payment?.studentPayment.subject?.subjectName}`}</EllipsisBox>
            </Tsubject>
            <Tamount className={payment?.refundApproval ? 'refund' : ''}>
              <EllipsisBox>
                {payment?.amountPayment === undefined ||
                payment?.amountPayment === null ||
                payment?.amountPayment === 0
                  ? '0'
                  : payment?.refundApproval
                  ? `-${feeFormet(payment?.amountPayment)}`
                  : feeFormet(payment?.amountPayment)}
              </EllipsisBox>
            </Tamount>
            <Tamount className={payment?.refundApproval ? 'refund' : ''}>
              <EllipsisBox>
                {payment?.depositAmount === undefined ||
                payment?.depositAmount === null ||
                payment?.depositAmount === 0
                  ? '0'
                  : payment?.refundApproval
                  ? `-${feeFormet(payment?.depositAmount)}`
                  : feeFormet(payment?.depositAmount)}
              </EllipsisBox>
            </Tamount>
          </ClickBox>
        </TableRow>
      </TableItem>
    </>
  )
}
