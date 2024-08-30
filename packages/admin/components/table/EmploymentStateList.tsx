import { ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'
import EmploymentStateItem from '@/components/table/EmploymentStateItem'

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
  display: table;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
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
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.2}px;
`
const Tdate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`

export default function EmploymentStateList({ student }) {
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tphone>수강구분</Tphone>
                  <Tphone>훈련생전화번호</Tphone>
                  <Tnum>훈련생나이</Tnum>
                  <Tphone>훈련생유형</Tphone>
                  <Tdate>최근상담구분</Tdate>
                  <Tdate>최근상담일</Tdate>
                  <Tdate>취업일</Tdate>
                  <Tname>회사명</Tname>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <EmploymentStateItem student={student} />
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
