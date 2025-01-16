import { useSuspenseQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled, useTheme } from 'styled-components'
import { SEE_WORK_BOARD_QUERY } from '@/graphql/queries'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { workboardPageState } from '@/lib/recoilAtoms'
import { ResultSeeWorkBoard } from '@/src/generated/graphql'
import SubjectsItem from '@/components/items/SubjectsItem'

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
const ColorHelp = styled.div`
  display: flex;
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
`
const TableWrap = styled.div`
  width: 100%;
  display: block;
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
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`
const Tflag = styled.div`
  display: table-cell;
  width: 0.5rem;
  height: 100%;
  min-width: 7px;
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 5%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.05}px;
  vertical-align: middle;
`
const Ttitle = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 300px;
  vertical-align: middle;
`
const Twriter = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 80px;
  vertical-align: middle;
`
const Ttoteam = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 80px;
  vertical-align: middle;
`
const Ttoperson = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 80px;
  vertical-align: middle;
`

const Tdate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
  vertical-align: middle;
`
const TStaus = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
  vertical-align: middle;
`

const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  row-gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.gray};
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
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
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

type seeWorkboardQuery = {
  seeWorkBoard: ResultSeeWorkBoard
}

export default function WorkboardTable() {
  const theme = useTheme()
  const [currentPage, setCurrentPage] = useRecoilState(workboardPageState)
  const [currentLimit] = useState(10)
  const { error, data, refetch } = useSuspenseQuery<seeWorkboardQuery>(
    SEE_WORK_BOARD_QUERY,
    {
      variables: { page: currentPage, limit: currentLimit },
    },
  )
  const workboardTotal = data?.seeWorkBoard.totalCount
  const workboardData = data?.seeWorkBoard.data
  console.log('workboard', workboardData[0].writer)
  console.log('total', data?.seeWorkBoard.totalCount)

  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    handleScrollTop()
  }, [currentPage])

  useEffect(() => {
    const handleRouteChange = () => {
      refetch()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{workboardTotal}</span>건
        </Ttotal>
        <ColorHelp>
          <ColorCip>
            <span style={{ background: theme.colors.primary }}></span> : 노출
          </ColorCip>
          <ColorCip>
            <span
              style={{ background: theme.colors.gray, opacity: '0.8' }}
            ></span>{' '}
            : 미노출
          </ColorCip>
        </ColorHelp>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tflag></Tflag>
                <Tnum>No</Tnum>
                <Ttitle>글제목</Ttitle>
                <Twriter>작성자</Twriter>
                <Ttoteam>작업부서</Ttoteam>
                <Ttoperson>작업자</Ttoperson>
                <Tdate>작업시작일</Tdate>
                <Tdate>작업완료일</Tdate>
                <TStaus>진행상태</TStaus>
              </TheaderBox>
            </Theader>
            {workboardTotal > 0 &&
              workboardData?.map((item, index) => (
                <TableItem
                  key={index}
                  onClick={() =>
                    router.push(
                      {
                        pathname: `/subjects/detail/${item.id}`,
                        query: { page: currentPage, limit: currentLimit },
                      },
                      `/subjects/detail/${item.id}`,
                    )
                  }
                >
                  <TableRow>
                    <Tflag
                      style={{
                        background:
                          item.workStatus === '미처리'
                            ? theme.colors.primary
                            : theme.colors.gray,
                        opacity: item.workStatus === '미처리' ? '1' : '0.8',
                      }}
                    ></Tflag>

                    <Tnum>
                      {(currentPage - 1) * currentLimit + (index + 1)}
                    </Tnum>
                    <Ttitle>{item.title}</Ttitle>
                    <Twriter>{item.writer}</Twriter>
                    <Ttoteam>{item.toTeam}</Ttoteam>
                    <Ttoperson>{item.toPerson}</Ttoperson>
                    <Tdate>
                      {item.startDate ? getDate(item.startDate) : '-'}
                    </Tdate>
                    <Tdate>{item.endDate ? getDate(item.endDate) : '-'}</Tdate>
                    <TStaus>{item.workStatus ? item.workStatus : '-'}</TStaus>
                  </TableRow>
                </TableItem>
              ))}
            {workboardTotal === 0 && <Nolist>등록된 요청이 없습니다.</Nolist>}
          </TableWrap>
        </ScrollShadow>
        {workboardTotal > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
              total={Math.ceil(workboardTotal / currentLimit)}
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
