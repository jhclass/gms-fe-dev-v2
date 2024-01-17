import { useMutation } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import router from 'next/router'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'
import SubjectItem from '@/components/table/SubjectItem'

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
  display: block;
  min-width: 780px;
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
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const Tflag = styled.div`
  display: table-cell;
  width: 0.5rem;
  height: 100%;
  min-width: 7px;
`
const TheaderBox = styled.div`
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
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
const Tdiv = styled.div`
  display: flex;
  align-items: center;
`
const Tname = styled.div`
  display: table-cell;
  text-align: center;
  width: 60%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 360px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 102px;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 132px;
`
const Texposure = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
  vertical-align: middle;
  i {
    font-size: 1rem;
  }
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
`
const Troom = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
`
const Tteache = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const OnExposure = styled.span`
  color: #007de9;
`
const OffExposure = styled.span`
  color: #71717a;
  opacity: 0.5;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  row-gap: 1rem;
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

export default function SubjectFilterTable({
  onFilterSearch,
  subjectFilter,
  setSubjectFilter,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const [searchSubjectMutation] = useMutation(SEARCH_SUBJECT_MUTATION)
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    searchSubjectMutation({
      variables: {
        ...subjectFilter,
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: resData => {
        const { result, totalCount } = resData.searchSubject || {}
        setSearchResult({ result, totalCount })
      },
    })
  }, [subjectFilter, currentPage])

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }

  const resetList = () => {
    setSubjectFilter({})
    onFilterSearch(false)
  }

  return (
    <>
      <TTopic>
        <TopBox>
          <Ttotal>
            총
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
            <span style={{ background: '#007de9' }}></span> : 노출
          </ColorCip>
          <ColorCip>
            <span style={{ background: '#71717a', opacity: '0.8' }}></span> :
            미노출
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
                <Tdiv>
                  <Tname>과정명</Tname>
                  <TsubDiv>수강구분</TsubDiv>
                  <Tfee>수강료</Tfee>
                </Tdiv>
                <Texposure>노출여부</Texposure>
                <Tdate>개강일</Tdate>
                <Tdate>종강일</Tdate>
                <Troom>강의실</Troom>
                <Tteache>강사명</Tteache>
              </TheaderBox>
            </Theader>
            {searchResult?.result !== null &&
              searchResult?.result.map((item, index) => (
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
                        background: item.exposure ? '#007de9' : '#71717a',
                        opacity: item.exposure ? '1' : '0.8',
                      }}
                    ></Tflag>
                    <Tnum>
                      {(currentPage - 1) * currentLimit + (index + 1)}
                    </Tnum>
                    <Tdiv>
                      <SubjectItem tableData={item} />
                    </Tdiv>
                    <Texposure>
                      {item.exposure ? (
                        <OnExposure>
                          <i className="xi-check-circle" />
                        </OnExposure>
                      ) : (
                        <OffExposure>
                          <i className="xi-check-circle " />
                        </OffExposure>
                      )}
                    </Texposure>
                    <Tdate>
                      {item.startDate ? getDate(item.startDate) : '-'}
                    </Tdate>
                    <Tdate>{item.endDate ? getDate(item.endDate) : '-'}</Tdate>
                    <Troom>{item.roomNum ? item.roomNum : '-'}</Troom>
                    <Tteache>{item.teacherName}</Tteache>
                  </TableRow>
                </TableItem>
              ))}
            {searchResult?.result === null && (
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
