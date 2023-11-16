import { styled } from 'styled-components'

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Theader = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
`

const TableItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
`

const Tnum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  padding: 1rem 1rem 1rem 0;
  font-size: inherit;
  color: inherit;
`
const T1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const T2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const TsuvDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const Tname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const Tphone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const TcreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const Tmanager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const TstVisit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const TexpEnrollDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
`
const Tprogress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem 0 1rem 1rem;
  font-size: inherit;
  color: inherit;
`

export default function ConsolutationTable() {
  return (
    <>
      <TableWrap>
        <Theader>
          <Tnum>No</Tnum>
          <T1>
            <i className="xi-star"></i>
          </T1>
          <T2>접수구분</T2>
          <TsuvDiv>수강구분</TsuvDiv>
          <Tname>이름</Tname>
          <Tphone>연락처</Tphone>
          <TcreatedAt>등록일시</TcreatedAt>
          <Tmanager>담당자</Tmanager>
          <TstVisit>상담예정일</TstVisit>
          <TexpEnrollDate>수강예정월</TexpEnrollDate>
          <Tprogress>상담상태</Tprogress>
        </Theader>
        <TableItem>
          <Tnum>1</Tnum>
          <T1>
            <label>
              <i className="xi-star-o"></i>
              <input id="" type="checkbox" />
            </label>
          </T1>
          <T2>온라인</T2>
          <TsuvDiv>HRD</TsuvDiv>
          <Tname>김초코</Tname>
          <Tphone>01022223333</Tphone>
          <TcreatedAt>2023.09.10</TcreatedAt>
          <Tmanager>박주임</Tmanager>
          <TstVisit>2023.09.12</TstVisit>
          <TexpEnrollDate> - </TexpEnrollDate>
          <Tprogress>상담예정</Tprogress>
        </TableItem>
        <TableItem>
          <Tnum>1</Tnum>
          <T1>
            <input type="checkbox" />
          </T1>
          <T2>온라인</T2>
          <TsuvDiv>HRD</TsuvDiv>
          <Tname>김초코</Tname>
          <Tphone>01022223333</Tphone>
          <TcreatedAt>2023.09.10</TcreatedAt>
          <Tmanager>박주임</Tmanager>
          <TstVisit>2023.09.12</TstVisit>
          <TexpEnrollDate> - </TexpEnrollDate>
          <Tprogress>상담예정</Tprogress>
        </TableItem>
        <TableItem>
          <Tnum>1</Tnum>
          <T1>
            <input type="checkbox" />
          </T1>
          <T2>온라인</T2>
          <TsuvDiv>HRD</TsuvDiv>
          <Tname>김초코</Tname>
          <Tphone>01022223333</Tphone>
          <TcreatedAt>2023.09.10</TcreatedAt>
          <Tmanager>박주임</Tmanager>
          <TstVisit>2023.09.12</TstVisit>
          <TexpEnrollDate> - </TexpEnrollDate>
          <Tprogress>상담예정</Tprogress>
        </TableItem>
      </TableWrap>
    </>
  )
}
