import { useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_SUBJECT_QUERY } from '@/graphql/queries'
import SubjectItem from './SubjectItem'
import router from 'next/router'

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
  text-align: center;
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
const EllipsisBox = styled.p`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const HiddenLabel = styled.label`
  display: none;
`
export default function SubjectTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const { loading, error, data, refetch } = useQuery(SEE_SUBJECT_QUERY, {
    variables: { page: currentPage, limit: currentLimit },
  })
  const subjectTotal = data?.seeSubject.totalCount || []
  const subjectData = data?.seeSubject.subject || []

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  useEffect(() => {
    refetch()
  }, [router, refetch])
  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{subjectTotal}</span>건
        </Ttotal>
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
            {subjectData?.map((item, index) => (
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
                    <Tname>
                      <EllipsisBox>{item.subjectName}</EllipsisBox>
                    </Tname>
                    <TsubDiv>{item.subDiv}</TsubDiv>
                    <Tfee>{feeFormet(item.fee)}</Tfee>
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
        {subjectTotal > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              total={Math.ceil(subjectTotal / currentLimit)}
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