import { useMutation, useQuery } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_AMOUNT_STUDENT_QUERY, SEE_REFUND_QUERY } from '@/graphql/queries'
import router, { useRouter } from 'next/router'
import RefundItem from '@/components/table/RefundItem'
import { useRecoilState } from 'recoil'
import { reqRefundPageState } from '@/lib/recoilAtoms'
import {
  APPROVAL_REFUND_MUTATION,
  REQ_REFUND_MUTATION,
  SEARCH_PAYMENT_DETAIL_FILTER_MUTATION,
  UPDATE_STUDENT_RECEIVED_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const ColorHelp = styled.div`
  display: flex;
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`
const TheaderListBox = styled.div`
  display: flex;
  width: 86%;
`
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
const TrequestAt = styled.div<{ $width: number }>`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${props => props.$width * 0.12}px;
`
const Tmanager = styled.div<{ $width: number }>`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${props => props.$width * 0.12}px;
`
const Tname = styled.div<{ $width: number }>`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${props => props.$width * 0.1}px;
  font-weight: 600;
`
const Tsubject = styled.div<{ $width: number }>`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 31%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${props => props.$width * 0.31}px;
`
const Tpayment = styled.div<{ $width: number }>`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${props => props.$width * 0.09}px;
`
const TpaymentName = styled.div<{ $width: number }>`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${props => props.$width * 0.12}px;
`
const Tamount = styled.div<{ $width: number }>`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 14%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${props => props.$width * 0.14}px;
  font-weight: 600;

  &.card {
    color: #007de9;
  }
  &.cash {
    color: #ff5900;
  }
`
const Tlist = styled.div`
  display: table-cell;
  width: 86%;
  min-width: ${1200 * 0.86}px;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 14%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.14}px;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

export default function RequestRefundTable() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useRecoilState(reqRefundPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const { userLogs } = useUserLogsMutation()
  const [searchPaymentDetailFilterMutation] = useMutation(
    SEARCH_PAYMENT_DETAIL_FILTER_MUTATION,
  )
  const [reqRefoundMutation] = useMutation(REQ_REFUND_MUTATION)
  const [approvalRefoundMutation] = useMutation(APPROVAL_REFUND_MUTATION)
  const [updateReceived] = useMutation(UPDATE_STUDENT_RECEIVED_MUTATION)
  const [result, setResult] = useState(null)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    searchPaymentDetailFilterMutation({
      variables: {
        reqRefund: true,
        refundApproval: false,
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: resData => {
        if (resData.searchPaymentDetail.ok) {
          const { PaymentDetail, totalCount } =
            resData.searchPaymentDetail || {}
          setResult({ PaymentDetail, totalCount })
          handleScrollTop()
        }
      },
    })
  }, [router, currentPage])

  const clickApprovalRefund = item => {
    const isAssignment = confirm(
      '환불 승인 하시겠습니까? \n 한번 승인 시 취소 불가능',
    )
    if (isAssignment) {
      approvalRefoundMutation({
        variables: {
          refundApprovalId: item.id,
          refundApproval: true,
          refundApprovalDate: new Date(),
          studentPaymentId: item.studentPaymentId,
        },
        onCompleted: resData => {
          if (resData.refundApproval.ok) {
            updateReceived({
              variables: {
                amountReceived:
                  item.cashOrCard === '카드'
                    ? item.studentPayment.amountReceived - item.amountPayment
                    : item.studentPayment.amountReceived - item.depositAmount,
                editStudentPaymentId: item.studentPaymentId,
                subjectId: item.studentPayment.subjectId,
                processingManagerId: item.studentPayment.processingManagerId,
              },
              onCompleted: result => {
                if (result.editStudentPayment.ok) {
                  searchPaymentDetailFilterMutation({
                    variables: {
                      reqRefund: true,
                      refundApproval: false,
                      page: currentPage,
                      limit: currentLimit,
                    },
                    onCompleted: resData => {
                      if (resData.searchPaymentDetail.ok) {
                        const { PaymentDetail, totalCount } =
                          resData.searchPaymentDetail || {}
                        setResult({ PaymentDetail, totalCount })
                      }
                    },
                  })
                  alert('환불 승인 되었습니다.')
                  userLogs(`paymentDetail ID : ${item.id} / 환불 승인`)
                }
              },
            })
          }
        },
      })
    }
  }

  const clickCancelReq = item => {
    const isAssignment = confirm('환불 거부 하시겠습니까?')
    if (isAssignment) {
      reqRefoundMutation({
        variables: {
          reqRefundId: item.id,
          reqRefund: false,
          reqRefundDate: '',
        },
        onCompleted: result => {
          if (result.reqRefund.ok) {
            searchPaymentDetailFilterMutation({
              variables: {
                reqRefund: true,
                refundApproval: false,
                page: currentPage,
                limit: currentLimit,
              },
              onCompleted: resData => {
                if (resData.searchPaymentDetail.ok) {
                  const { PaymentDetail, totalCount } =
                    resData.searchPaymentDetail || {}
                  setResult({ PaymentDetail, totalCount })
                  handleScrollTop()
                }
              },
            })
            alert('결제 취소요청 되었습니다.')
            userLogs(`paymentDetail ID : ${item.id} / 환불 거부`)
          }
        },
      })
    }
  }

  return (
    result !== null && (
      <>
        <TTopic>
          <Ttotal>
            총 <span>{totalCount}</span>건
          </Ttotal>
          <ColorHelp>
            <ColorCip>
              <span style={{ background: '#007de9' }}></span> : 현금
            </ColorCip>
            <ColorCip>
              <span style={{ background: '#FF5900' }}></span> : 카드
            </ColorCip>
          </ColorHelp>
        </TTopic>
        <TableArea>
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <TableWrap>
              <Theader>
                <TheaderBox>
                  <TheaderListBox>
                    <TrequestAt $width={1032}>신청일</TrequestAt>
                    <Tmanager $width={1032}>신청담당자</Tmanager>
                    <Tname $width={1032}>수강생명</Tname>
                    <Tsubject $width={1032}>수강과정</Tsubject>
                    <Tpayment $width={1032}>결제구분</Tpayment>
                    <TpaymentName $width={1032}>은행/카드사</TpaymentName>
                    <Tamount $width={1032}>환불금액</Tamount>
                  </TheaderListBox>
                  <Tbtn></Tbtn>
                </TheaderBox>
              </Theader>
              {result.totalCount > 0 &&
                result.PaymentDetail.map((item, index) => (
                  <TableItem key={index}>
                    <TableRow>
                      <Tlist>
                        <RefundItem
                          tableData={item}
                          itemIndex={index}
                          currentPage={currentPage}
                          limit={currentLimit}
                          width={1032}
                        />
                      </Tlist>
                      <Tbtn>
                        <BtnBox>
                          <Button
                            size="sm"
                            variant="solid"
                            color="primary"
                            className="w-full text-white"
                            onClick={() => clickApprovalRefund(item)}
                          >
                            환불 승인
                          </Button>
                          <Button
                            size="sm"
                            variant="bordered"
                            color="primary"
                            className="w-full"
                            onClick={() => clickCancelReq(item)}
                          >
                            환불 거부
                          </Button>
                        </BtnBox>
                      </Tbtn>
                    </TableRow>
                  </TableItem>
                ))}
              {result.totalCount === 0 && (
                <Nolist>등록된 수강생이 없습니다.</Nolist>
              )}
            </TableWrap>
          </ScrollShadow>
          {result.totalCount > 0 && (
            <PagerWrap>
              <Pagination
                variant="light"
                showControls
                initialPage={currentPage}
                page={currentPage}
                total={Math.ceil(result.totalCount / currentLimit)}
                onChange={newPage => {
                  setCurrentPage(newPage)
                }}
              />
            </PagerWrap>
          )}
        </TableArea>
      </>
    )
  )
}
