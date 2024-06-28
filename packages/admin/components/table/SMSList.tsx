import { useSuspenseQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { Fragment, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsultItem from '@/components/table/ConsultItem'
import {
  MME_FAVO_QUERY,
  SEARCH_MANAGEUSER_QUERY,
  SEE_FAVORITESTATE_QUERY,
  SEE_MANAGEUSER_QUERY,
  SEE_STUDENT_STATE_QUERY,
} from '@/graphql/queries'
import FavoItem from '@/components/table/FavoItem'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { consultPageState } from '@/lib/recoilAtoms'
import {
  ManageUser,
  SearchManageUserResult,
  StudentState,
  StudentStateResponse,
} from '@/src/generated/graphql'
import MasageItem from './MasageItem'
import SMSItem from './SMSItem'

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
  display: table;
  min-width: calc(100% - 20rem);
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
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;

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
`
const TDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
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
type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}
export default function SMSList() {
  const [currentPage, setCurrentPage] = useRecoilState(consultPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>1</span>건
        </Ttotal>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <TDate>발송일시</TDate>
                  <Tnum>문자타입</Tnum>
                  <TDate>전송결과</TDate>
                  <Tname>수신번호</Tname>
                  <TDate>발신번호</TDate>
                  <Tcon>메세지</Tcon>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <SMSItem />
            {/* {managerTotal === 0 && <Nolist>등록된 직원이 없습니다.</Nolist>} */}
          </TableWrap>
        </ScrollShadow>
        {/* {totalCount > 0 && ( */}
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            // initialPage={currentPage}
            // page={currentPage}
            initialPage={1}
            page={1}
            // total={Math.ceil(totalCount / currentLimit)}
            total={3}
            onChange={newPage => {
              setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
        {/* )} */}
      </TableArea>
    </>
  )
}
