import { useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsultItem from '@/components/table/ConsultItem'
import {
  MME_FAVO_QUERY,
  SEE_FAVORITESTATE_QUERY,
  SEE_STUDENT_QUERY,
} from '@/graphql/queries'
import FavoItem from '@/components/table/FavoItem'
import router from 'next/router'
import StudentsItem from './studentsItem'

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
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
  vertical-align: middle;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tbirthday = styled.div`
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
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 32%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.32}px;
  font-weight: 600;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
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
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
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

const students = [
  {
    id: 1,
    subDiv: '국가기간',
    birthday: '1993.08.31',
    name: '안태상',
    phone: '01012345678',
    subject: '멀티미디어 영상콘텐츠제작(프리미어,에펙,영상편집) A',
    createManager: '이주임',
    createAt: '1704352499717',
  },
  {
    id: 2,
    subDiv: '일반',
    birthday: '1998.04.21',
    name: '김은영',
    phone: '01087654321',
    subject: null,
    createManager: '김사원',
    createAt: '1704352499717',
  },
  {
    id: 3,
    subDiv: '국가기간',
    birthday: '2000.08.14',
    name: '박세희',
    phone: '01096325874',
    subject: '멀티미디어 영상콘텐츠제작(프리미어,에펙,영상편집) A',
    createManager: '박대리',
    createAt: '1704352499717',
  },
  {
    id: 4,
    subDiv: '일반',
    birthday: '1992.01.28',
    name: '최나나',
    phone: '01074185236',
    subject: null,
    createManager: '이주임',
    createAt: '1704352499717',
  },
  {
    id: 5,
    subDiv: '근로자',
    birthday: '2003.10.17',
    name: '이하나',
    phone: '01075319642',
    subject: null,
    createManager: '김사원',
    createAt: '1704352499717',
  },
]

export default function StudentsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>5</span>건
        </Ttotal>
        {/* <ColorHelp>
          <ColorCip>
            <span style={{ background: '#007de9' }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: '#FF5900' }}></span> : 미처리
          </ColorCip>
        </ColorHelp> */}
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
                  <TsubDiv>수강구분</TsubDiv>
                  <Tbirthday>생년월일</Tbirthday>
                  <Tname>이름</Tname>
                  <Tsubject>수강과정</Tsubject>
                  <Tphone>연락처</Tphone>
                  <Tmanager>담당자</Tmanager>
                  <TcreatedAt>등록일시</TcreatedAt>
                </ClickBox>
              </TheaderBox>
            </Theader>
            {/* {favoData?.map((item, index) => (
              <FavoItem
                forName="favo"
                key={index}
                tableData={item}
                itemIndex={index}
                favorite={FavoList?.includes(item.id)}
              />
            ))} */}
            <br />
            {students?.map((item, index) => (
              <StudentsItem
                forName="student"
                key={index}
                tableData={item}
                itemIndex={index}
                currentPage={currentPage}
                limit={currentLimit}
              />
            ))}
          </TableWrap>
        </ScrollShadow>
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={1}
            total={2}
            onChange={newPage => {
              // setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
      </TableArea>
    </>
  )
}
