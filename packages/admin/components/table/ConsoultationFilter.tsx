import { useMutation, useQuery } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsoultItem from '@/components/table/ConsoultItem'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { studentFilterState } from '@/lib/recoilAtoms'
import { SEARCH_STUDENTSTATE_MUTATION } from '@/graphql/mutations'
import { MME_QUERY, SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'

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
    color: #007de9;
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
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
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
const Tfavorite = styled.div`
  display: table-cell;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
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
  min-width: 50px;
`
const TreceiptDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TstVisit = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
export default function ConsolutationFilterTable({ onFilterSearch }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const studentFilter = useRecoilValue(studentFilterState)
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const [searchResult, setSearchResult] = useState(null)
  const setFilterState = useSetRecoilState(studentFilterState)
  const {
    loading: MMeLoading,
    error: MMeError,
    data: MMeData,
  } = useQuery(MME_QUERY)
  const FavoList = MMeData?.mMe.favoriteStudentState
  const { data: seeFavoData } = useQuery(SEE_FAVORITESTATE_QUERY)
  const favoData = seeFavoData?.seeFavorite || []
  const favoTotal = favoData?.length || 0

  useEffect(() => {
    searchStudentStateMutation({
      variables: {
        ...studentFilter,
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: resData => {
        const { studentState, totalCount } = resData.searchStudentState || {}
        setSearchResult({ studentState, totalCount })
      },
    })
  }, [studentFilter, currentPage])

  const resetList = () => {
    setFilterState({})
    onFilterSearch(false)
  }

  const isDisplayFlag = (student): string => {
    const currentDate = new Date()
    const LocalDdate = new Date(
      parseInt(student.createdAt),
    ).toLocaleDateString()
    const targetDate = new Date(LocalDdate)
    const progressState = student.progress
    const differenceInDays = Math.floor(
      (currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    )
    if (differenceInDays >= 0 && differenceInDays < 3) {
      return '#007de9'
    } else if (differenceInDays >= 3 && progressState === 0) {
      return '#FF5900'
    } else {
      return 'transparent'
    }
  }

  return (
    <>
      <TTopic>
        <TopBox>
          <Ttotal>
            총 <span>{searchResult?.totalCount}</span>건이 검색되었습니다.
          </Ttotal>
          <Button size="sm" radius="sm" color="primary" onClick={resetList}>
            전체보기
          </Button>
        </TopBox>
        <ColorHelp>
          <ColorCip>
            <span style={{ background: '#007de9' }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: '#FF5900' }}></span> : 미처리
          </ColorCip>
        </ColorHelp>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tfavorite>
                  <i className="xi-star"></i>
                </Tfavorite>
                <ClickBox>
                  <Tnum>No</Tnum>
                  <Tprogress>진행상태</Tprogress>
                  <TreceiptDiv>접수구분</TreceiptDiv>
                  <TsubDiv>수강구분</TsubDiv>
                  <Tname>이름</Tname>
                  <Tphone>연락처</Tphone>
                  <TcreatedAt>등록일시</TcreatedAt>
                  <Tmanager>담당자</Tmanager>
                  <TstVisit>상담예정일</TstVisit>
                  <TexpEnrollDate>수강예정일</TexpEnrollDate>
                </ClickBox>
              </TheaderBox>
            </Theader>

            {searchResult?.studentState.map((item, index) => (
              <ConsoultItem
                key={index}
                tableData={item}
                itemIndex={index}
                currentPage={currentPage}
                limit={currentLimit}
                favorite={FavoList?.includes(item.id)}
                favoTotal={favoTotal}
                flagColor={isDisplayFlag(item)}
              />
            ))}
          </TableWrap>
        </ScrollShadow>
        {searchResult?.totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
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
