import { ScrollShadow } from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { consultPageState } from '@/lib/recoilAtoms'
import LectureReportItem from './LectureReportItem'

const TableArea = styled.div`
  margin-top: 0.5rem;
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
  border-bottom: 1px solid #d4d4d8;
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tlong = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`

export default function ConsolutationTable(lecture) {
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>승인인원</Tnum>
                  <Tnum>확정인원</Tnum>
                  <Tnum>모집률</Tnum>
                  <Tnum>수강포기</Tnum>
                  <Tnum>미수료</Tnum>
                  <Tnum>중도탈락율</Tnum>
                  <Tlong>조기취업 가입</Tlong>
                  <Tlong>조기취업 미가입</Tlong>
                  <Tnum>수료인원</Tnum>
                  <Tnum>수료율</Tnum>
                  <Tlong>수강평점</Tlong>
                  <Tlong>재직증명 확보예정</Tlong>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <LectureReportItem lecture={lecture} />
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
