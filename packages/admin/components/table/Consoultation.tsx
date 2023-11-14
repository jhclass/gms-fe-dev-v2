import { styled } from 'styled-components'

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
`

const Theader = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
`

const TableItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
`

export default function ConsolutationTable() {
  return (
    <>
      <TableWrap>
        <Theader>
          <div>No</div>
          <div></div>
          <div>접수구분</div>
          <div>수강구분</div>
          <div>이름</div>
          <div>연락처</div>
          <div>등록일시</div>
          <div>담당자</div>
          <div>상담예정일</div>
          <div>수강예정월</div>
          <div>상담상태</div>
        </Theader>
        <TableItem>
          <div>No</div>
          <div></div>
          <div>접수구분</div>
          <div>수강구분</div>
          <div>이름</div>
          <div>연락처</div>
          <div>등록일시</div>
          <div>담당자</div>
          <div>상담예정일</div>
          <div>수강예정월</div>
          <div>상담상태</div>
        </TableItem>
      </TableWrap>
    </>
  )
}
