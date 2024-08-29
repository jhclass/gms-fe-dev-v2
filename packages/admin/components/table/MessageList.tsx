import { useSuspenseQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useRecoilState, useRecoilValue } from 'recoil'
import { consultPageState, gradeState } from '@/lib/recoilAtoms'
import { SearchManageUserResult } from '@/src/generated/graphql'
import MasageItem from '@/components/table/MasageItem'

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
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.12}px;
  font-weight: 600;
`
const Tcon = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 58%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.58}px;
`
const TDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
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
type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}
export default function MessageList() {
  const grade = useRecoilValue(gradeState)
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const { error, data, refetch } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: { mGrade: grade.teacher },
    },
  )
  const managerData = data?.searchManageUser.data
  const managerTotal = data?.searchManageUser.totalCount

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    refetch()
  }, [])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{managerTotal}</span>건
        </Ttotal>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>No</Tnum>
                  <Tname>보낸사람</Tname>
                  <Tcon>요청내용</Tcon>
                  <TDate>요청일자</TDate>
                  <TDate>읽은일자</TDate>
                </ClickBox>
              </TheaderBox>
            </Theader>
            {managerData.length > 0 &&
              managerData?.map((item, index) => (
                <MasageItem
                  forName="student"
                  key={index}
                  tableData={item}
                  itemIndex={index}
                  currentPage={currentPage}
                  limit={currentLimit}
                />
              ))}
            {managerTotal === 0 && <Nolist>등록된 직원이 없습니다.</Nolist>}
          </TableWrap>
        </ScrollShadow>
        {totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
              total={Math.ceil(totalCount / currentLimit)}
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
