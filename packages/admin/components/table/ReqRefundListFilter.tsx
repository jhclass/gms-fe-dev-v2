import { useMutation } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled, useTheme } from 'styled-components'
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
import { subMonths } from 'date-fns'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-start;
  }
`
const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }
`
const ColorHelp = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0.5rem;
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
  display: table;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
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
    color: ${({ theme }) => theme.colors.primary};
  }
  &.cash {
    color: ${({ theme }) => theme.colors.accent};
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
  color: ${({ theme }) => theme.colors.gray};
`

export default function ReqRefundFilterTable({ studentFilter }) {
  const theme = useTheme()
  const { userLogs } = useUserLogsMutation()
  const [currentPage, setCurrentPage] = useRecoilState(reqRefundPageState)
  const [reqRefoundMutation] = useMutation(REQ_REFUND_MUTATION)
  const [approvalRefoundMutation] = useMutation(APPROVAL_REFUND_MUTATION)
  const [updateReceived] = useMutation(UPDATE_STUDENT_RECEIVED_MUTATION)
  const [currentLimit] = useState(10)
  const [searchPaymentDetailFilterMutation] = useMutation(
    SEARCH_PAYMENT_DETAIL_FILTER_MUTATION,
  )
  const [searchResult, setSearchResult] = useState(null)
  const [result, setResult] = useState(null)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const today = new Date()
  const lastSixMonths = subMonths(new Date(), 6)
  const adjustedStudentFilter = {
    ...studentFilter,
    reqRefundDate: studentFilter.reqRefundDate || [lastSixMonths, today],
  }
  useEffect(() => {
    searchPaymentDetailFilterMutation({
      variables: {
        ...adjustedStudentFilter,
        reqRefund: true,
        refundApproval: false,
        sortOf: 'reqRefundDate',
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: resData => {
        if (resData.searchPaymentDetail.ok) {
          const { PaymentDetail, totalCount } =
            resData.searchPaymentDetail || {}
          setSearchResult({ PaymentDetail, totalCount })
        }
      },
    })
  }, [studentFilter, currentPage])

  const clickApprovalRefund = item => {
    const isAssignment = confirm(
      '환불 승인 하시겠습니까? \n한번 승인 시 취소 불가능',
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
          userLogs(
            `paymentDetail ID : ${item.id} / 환불 승인`,
            `ok: ${resData.refundApproval.ok}`,
          )
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
                      ...adjustedStudentFilter,
                      reqRefund: true,
                      refundApproval: false,
                      sortOf: 'reqRefundDate',
                      page: currentPage,
                      limit: currentLimit,
                    },
                    onCompleted: resData => {
                      if (resData.searchPaymentDetail.ok) {
                        const { PaymentDetail, totalCount } =
                          resData.searchPaymentDetail || {}
                        setSearchResult({ PaymentDetail, totalCount })
                      }
                    },
                  })
                  alert('환불 승인 되었습니다.')
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
          userLogs(
            `paymentDetail ID : ${item.id} / 환불 거부`,
            `ok: ${result.reqRefund.ok}`,
          )
          if (result.reqRefund.ok) {
            searchPaymentDetailFilterMutation({
              variables: {
                ...adjustedStudentFilter,
                reqRefund: true,
                refundApproval: false,
                sortOf: 'reqRefundDate',
                page: currentPage,
                limit: currentLimit,
              },
              onCompleted: resData => {
                if (resData.searchPaymentDetail.ok) {
                  const { PaymentDetail, totalCount } =
                    resData.searchPaymentDetail || {}
                  setSearchResult({ PaymentDetail, totalCount })
                  handleScrollTop()
                }
              },
            })
            alert('환불 거부 되었습니다.')
          }
        },
      })
    }
  }

  const resetList = () => {
    window.location.href = '/accounting/request'
  }

  return (
    <>
      <TTopic>
        <TopBox>
          <Ttotal>
            총{' '}
            <span>
              {searchResult?.totalCount === null ? 0 : searchResult?.totalCount}
            </span>
            건이 검색되었습니다.
          </Ttotal>
          <Button size="sm" radius="sm" color="primary" onClick={resetList}>
            전체보기
          </Button>
        </TopBox>
        <ColorHelp>
          <ColorCip>
            <span style={{ background: theme.colors.primary }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: theme.colors.accent }}></span> : 미배정
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
            {searchResult?.totalCount > 0 &&
              searchResult?.PaymentDetail.map((item, index) => (
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
            {searchResult?.totalCount === 0 && (
              <Nolist>검색결과가 없습니다.</Nolist>
            )}
          </TableWrap>
        </ScrollShadow>
        {searchResult?.totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
              total={Math.ceil(searchResult?.totalCount / currentLimit)}
              onChange={newPage => {
                setCurrentPage(newPage)
              }}
            />
          </PagerWrap>
        )}
      </TableArea>
    </>
  )
}
