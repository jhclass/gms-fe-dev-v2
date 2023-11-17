import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { styled } from 'styled-components'

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`

const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
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
  min-width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 0.5rem;
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
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 50px;
`
const T1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
`
const T2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TsuvDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TcreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TstVisit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`

const tableData = [
  {
    name: '김초코',
    progress: '상담예정',
    phone: '01022223333',
    enrDiv: '온라인',
    suvDiv: 'HRD',
    createdAt: '2023.09.12',
    stVisit: '2023.09.14',
    expEnrollDate: '',
    manager: '이주임',
  },
  {
    name: '박딸기',
    progress: '상담대기',
    phone: '01009871234',
    enrDiv: '온라인',
    suvDiv: 'HRD',
    createdAt: '2023.03.12',
    stVisit: '2023.06.14',
    expEnrollDate: '2023.07.16',
    manager: '김사원',
  },
]

export default function ConsolutationTable() {
  // const router = useRouter()
  // const tableRef = useRef(null)
  // const startX = useRef(null)

  // const handleMouseDown = event => {
  //   if (tableRef.current) {
  //     // 마우스 다운 이벤트에서 초기 위치 설정
  //     startX.current = event.pageX - tableRef.current.scrollLeft
  //   }
  // }

  // const handleMouseUp = () => {
  //   // 마우스 업 이벤트에서 초기 위치 초기화
  //   startX.current = null
  // }

  // const handleMouseMove = event => {
  //   if (startX.current !== null && tableRef.current) {
  //     // 클릭 후 드래그 중에는 스크롤을 움직임
  //     event.preventDefault()
  //     const newScrollLeft = event.pageX - startX.current
  //     tableRef.current.scrollLeft = newScrollLeft
  //   }
  // }

  // const handleItemClick = () => {
  //   if (startX.current === null) {
  //     // 클릭 이벤트 처리: 원하는 동작 수행 (예: 상세 페이지로 이동)
  //     router.push('/your-detail-page') // 원하는 상세 페이지 경로로 변경
  //   }
  // }

  // useEffect(() => {
  //   if (tableRef.current) {
  //     tableRef.current.addEventListener('mousedown', handleMouseDown)
  //     tableRef.current.addEventListener('mouseup', handleMouseUp)
  //     tableRef.current.addEventListener('mousemove', handleMouseMove)
  //   }

  //   return () => {
  //     if (tableRef.current) {
  //       tableRef.current.removeEventListener('mousedown', handleMouseDown)
  //       tableRef.current.removeEventListener('mouseup', handleMouseUp)
  //       tableRef.current.removeEventListener('mousemove', handleMouseMove)
  //     }
  //   }
  // }, [tableRef])

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
        {tableData.map((item, index) => (
          <TableItem key={index}>
            <Tnum>{index}</Tnum>
            <T1>
              <label htmlFor={`check${index}`}>
                <i className="xi-star-o"></i>
                <input id={`check${index}`} type="checkbox" hidden />
              </label>
            </T1>
            <T2>{item.enrDiv}</T2>
            <TsuvDiv>{item.suvDiv}</TsuvDiv>
            <Tname>{item.name}</Tname>
            <Tphone>{item.phone}</Tphone>
            <TcreatedAt>{item.createdAt}</TcreatedAt>
            <Tmanager>{item.manager !== '' ? item.manager : '-'}</Tmanager>
            <TstVisit>{item.stVisit !== '' ? item.stVisit : '-'}</TstVisit>
            <TexpEnrollDate>
              {item.expEnrollDate !== '' ? item.expEnrollDate : '-'}
            </TexpEnrollDate>
            <Tprogress>{item.progress}</Tprogress>
          </TableItem>
        ))}
      </TableWrap>
    </>
  )
}
