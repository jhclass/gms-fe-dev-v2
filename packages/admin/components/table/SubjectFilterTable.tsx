import { useMutation } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import SubjectItem from './SubjectItem'
import router from 'next/router'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'

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
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
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
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
  vertical-align: middle;
`
const Tdiv = styled.div`
  display: flex;
  align-items: center;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
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
const OnExposure = styled.span`
  color: #007de9;
`
const OffExposure = styled.span`
  color: #71717a;
  opacity: 0.5;
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
        console.log(resData)
        // const { result, totalCount } = resData.searchSubject || {}
        // setSearchResult({ result, totalCount })
        const subjectSearch = resData.searchSubject.result || {}
        setSearchResult(subjectSearch)
      },
    })
  }, [subjectFilter, currentPage])

  const resetList = () => {
    setSubjectFilter({})
    onFilterSearch(false)
  }
  return (
    <>
      <TTopic>
        <TopBox>
          <Ttotal>
            총 <span>{searchResult?.totalCount}</span>건
          </Ttotal>
          <Button size="sm" radius="sm" color="primary" onClick={resetList}>
            전체보기
          </Button>
        </TopBox>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tnum>No</Tnum>
                <Tdiv>
                  <Tname>과정명</Tname>
                  <TsubDiv>수강구분</TsubDiv>
                  <Tfee>수강료</Tfee>
                </Tdiv>
                <Texposure>노출여부</Texposure>
              </TheaderBox>
            </Theader>
            {searchResult?.map((item, index) => (
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
                  <Tnum>{(currentPage - 1) * currentLimit + (index + 1)}</Tnum>
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
                </TableRow>
              </TableItem>
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
