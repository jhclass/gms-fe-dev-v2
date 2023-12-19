import { motion } from 'framer-motion'
import { useState } from 'react'
import { styled } from 'styled-components'

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TableItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
`

const TableLt = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
`
const Tname = styled.div`
  width: 50%;
  font-size: inherit;
  color: inherit;
  padding: 0.3rem 0;
  font-size: 1rem;
  font-weight: 600;
`

const TsuvDiv = styled.div`
  width: 50%;
  font-size: inherit;
  color: inherit;
  padding: 0.3rem 0;
`

const Tphone = styled.div`
  width: 50%;
  font-size: inherit;
  color: inherit;
  padding: 0.3rem 0;
`

const Tprogress = styled.div`
  width: 50%;
  font-size: inherit;
  padding: 0.3rem 0;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 600;
`

const TableRt = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ArrowBtn = styled(motion.button)`
  display: block;
  width: 2rem;
  height: 2rem;
  align-items: center;
`

const InfoBox = styled(motion.div)`
  display: block;
  width: 100%;
`

const Info = styled.ul`
  display: flex;
  width: 100%;
  padding-right: 10%;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  border-top: 1px solid #e4e4e7;

  li {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
  }
`

const TheaderMo = styled.span`
  color: #111;
  font-size: 0.8rem;
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
    expEnrollDate: '2023.09.16',
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
  const [infoActive, setInfoActive] = useState<{ [key: number]: boolean }>({})

  const toggleInfo = (index: number) => {
    setInfoActive(prev => {
      const updatedInfo = { ...prev }
      updatedInfo[index] = !prev[index]
      return updatedInfo
    })
  }

  const moreIconVariants = {
    initial: {
      rotate: 0,
    },
    active: {
      rotate: 180,
      transition: {
        duration: 0.3,
      },
    },
  }

  const moreInfoVariants = {
    hidden: {
      scaleY: 0,
      transformOrigin: 'top',
      height: 0,
    },
    visible: {
      scaleY: 1,
      transformOrigin: 'top',
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <>
      <TableWrap>
        {tableData.map((item, index) => (
          <TableItem key={index}>
            <TableLt>
              <Tname>{item.name}</Tname>
              <Tprogress>{item.progress}</Tprogress>
              <Tphone>{item.phone}</Tphone>
              <TsuvDiv>
                {item.enrDiv}/{item.suvDiv}
              </TsuvDiv>
            </TableLt>
            <TableRt>
              <button>
                <i className="xi-star" />
              </button>
              <ArrowBtn
                variants={moreIconVariants}
                initial="initial"
                animate={infoActive[index] ? 'active' : 'initial'}
                onClick={() => toggleInfo(index)}
              >
                <i className="xi-angle-down-min" />
              </ArrowBtn>
            </TableRt>
            <InfoBox
              variants={moreInfoVariants}
              initial="hidden"
              animate={infoActive[index] ? 'visible' : 'hidden'}
            >
              <Info>
                <li>
                  <TheaderMo>등록일시</TheaderMo>
                  {item.manager !== '' ? item.manager : '-'}
                </li>
                <li>
                  <TheaderMo>상담예정일</TheaderMo>
                  {item.stVisit !== '' ? item.stVisit : '-'}
                </li>
                <li>
                  <TheaderMo>수강예정일</TheaderMo>
                  {item.expEnrollDate !== '' ? item.expEnrollDate : '-'}
                </li>
                <li>
                  <TheaderMo>담당자</TheaderMo>
                  {item.manager}
                </li>
              </Info>
            </InfoBox>
          </TableItem>
        ))}
      </TableWrap>
    </>
  )
}
