import { useMutation, useSuspenseQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled, useTheme } from 'styled-components'
import { useRecoilState } from 'recoil'
import { consultPageState } from '@/lib/recoilAtoms'
import { StudentPaymentResult } from '@/src/generated/graphql'
import { SEE_EMPLOYMENT_STUDENTPAYMENT_QUERY } from '@/graphql/queries'
import EmploymentItem from '@/components/table/EmploymentItem'
import { SEARCH_EMPLOYMENT_STUDENTPAYMENT_MUTATION } from '@/graphql/mutations'

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
    color: ${({ theme }) => theme.colors.primary};
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
const TlecturName = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 26%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.26}px;
`
const Tperiod = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.16}px;
`
const Ttimes = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
`

const Tteacher = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tcheck = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
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
type seeStudentPaymentQuery = {
  seeStudentPayment: StudentPaymentResult
}

export default function EmploymentList() {
  const theme = useTheme()
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [searchEmploymentStudentPayment] = useMutation(
    SEARCH_EMPLOYMENT_STUDENTPAYMENT_MUTATION,
  )
  const [resultData, setResultData] = useState(null)
  // const { error, data, refetch } = useSuspenseQuery<seeStudentPaymentQuery>(
  //   SEE_EMPLOYMENT_STUDENTPAYMENT_QUERY,
  //   {
  //     variables: { page: currentPage, limit: currentLimit },
  //   },
  // )
  // const studentData = data?.seeStudentPayment?.StudentPayment
  // const totalCount = data?.seeStudentPayment?.totalCount

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    searchEmploymentStudentPayment({
      variables: {
        lectureAssignment: '배정',
        page: currentPage,
        perPage: currentLimit,
      },
      onCompleted: resData => {
        console.log(resData)
        if (resData.searchStudentPayment.ok) {
          const { data, totalCount } = resData.searchStudentPayment || {}
          setResultData({ data, totalCount })
        }
      },
    })
  }, [currentPage])

  // if (error) {
  //   console.log(error)
  // }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{resultData?.totalCount}</span>건
        </Ttotal>
        {/* <ColorHelp>
          <ColorCip>
            <span style={{ background: theme.colors.primary }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: theme.colors.accent }}></span> : 미처리
          </ColorCip>
        </ColorHelp> */}
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>No</Tnum>
                  <TlecturName>강의이름</TlecturName>
                  <Tnum>회차</Tnum>
                  <Tperiod>강의기간</Tperiod>
                  <Ttimes>관리 종료일</Ttimes>
                  <Tteacher>강사명</Tteacher>
                  <Tname>학생명</Tname>
                  <Tcheck>취업여부</Tcheck>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
            {resultData?.totalCount > 0 &&
              resultData?.data.map((item, index) => (
                <EmploymentItem
                  forName="student"
                  key={index}
                  tableData={item}
                  itemIndex={index}
                  currentPage={currentPage}
                  limit={currentLimit}
                />
              ))}
            {resultData?.totalCount === 0 && (
              <Nolist>등록된 취업현황이 없습니다.</Nolist>
            )}
          </TableWrap>
        </ScrollShadow>
        {resultData?.totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
              total={Math.ceil(resultData?.totalCount / currentLimit)}
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
