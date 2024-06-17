import { styled } from 'styled-components'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table'
import {
  CellSelect,
  HeaderCellSelect,
  useRowSelect,
} from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Pagination, useDisclosure } from '@nextui-org/react'
import WorksLogs from '@/components/modal/WorksLogs'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  CREATE_ATTENDANCE_MUTATION,
  CREATE_WORKLOGS_MUTATION,
  EDIT_ATTENDANCE_MUTATION,
} from '@/graphql/mutations'
import {
  SEE_ATTENDANCE_ALL_QUERY,
  SEE_ATTENDANCE_QUERY,
} from '@/graphql/queries'

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const TestSelect = styled.select`
  text-align: center;
`

const BtnCell = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`

const BtnBox = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const TodayTag = styled.span`
  display: inline-block;
  background: #07bbae;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  margin-left: 0.4rem;
  padding: 0.1rem 0.5rem;
  vertical-align: middle;
`

export default function Attendance({ lectureData, setUpdateAttendance }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const today = new Date().toISOString().split('T')[0]
  const [page, setPage] = useState(1)
  const [periodArr, setPeriodArr] = useState([])
  const [periodArrIndex, setPeriodArrIndex] = useState(null)
  const [week, setWeek] = useState(null)
  const [todayIndex, setTodayIndex] = useState(null)
  const [attendanceAllData, setAttendanceAllData] = useState([])
  const [workId, setWorkId] = useState(null)
  const tableRef = useRef(null)
  const [data, setData] = useState({ nodes: [] })
  const [selectedValues, setSelectedValues] = useState([])
  const [selectWrokLogDate, setSelectWrokLogDate] = useState(null)
  const [gridTemplateColumns, setGridTemplateColumns] = useState(
    '50px 50px 100px 100px repeat(4, 70px)',
  )
  const [gridTemplateColumnsMo, setGridTemplateColumnsMo] = useState('100px')
  const [createAttendance] = useMutation(CREATE_ATTENDANCE_MUTATION)
  const [createWorkLogs] = useMutation(CREATE_WORKLOGS_MUTATION)
  const [EditAttendance] = useMutation(EDIT_ATTENDANCE_MUTATION)
  const [seeAttendance, { refetch: seeAttendanceRefetch }] = useLazyQuery(
    SEE_ATTENDANCE_ALL_QUERY,
  )

  const fetchAttendanceForDate = async (date, id) => {
    const { data } = await seeAttendance({
      variables: {
        attendanceDate: date,
        lecturesId: id,
      },
    })
    return data?.seeAttendance?.enrollData || []
  }
  const fetchAllAttendance = async () => {
    if (week.length > 0) {
      const allData = await Promise.all(
        week.map(date => fetchAttendanceForDate(date, lectureData.id)),
      )
      setAttendanceAllData(allData)
    }
  }

  const splitArrayIntoChunks = (array, chunkSize) => {
    const chunks = []

    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize)
      if (chunk.length < chunkSize) {
        while (chunk.length < chunkSize) {
          chunk.push('')
        }
      }
      chunks.push(chunk)
    }

    return chunks
  }

  const findChunkContainingDate = (array, date) => {
    let currentDate = new Date(date)

    const formatDate = date => {
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return `${year}-${month}-${day}`
    }

    while (true) {
      const formattedDate = formatDate(currentDate)
      const chunk = array.find(chunk => chunk.includes(formattedDate))
      if (chunk) {
        return chunk
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  const findDataInChunks = (chunks, data) => {
    const formatDate = date => {
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return `${year}-${month}-${day}`
    }

    let currentDate = new Date(data)

    while (true) {
      const formattedDate = formatDate(currentDate)
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i].includes(formattedDate)) {
          return i
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  useEffect(() => {
    if (lectureData) {
      const chunks = splitArrayIntoChunks(lectureData?.lectureDetails, 5)
      setPeriodArr(chunks)
      setPeriodArrIndex(findDataInChunks(chunks, today) + 1)
      setPage(findDataInChunks(chunks, today) + 1)
      setWeek(findChunkContainingDate(chunks, today))
      setData({ nodes: lectureData?.subject.StudentPayment })
    }
  }, [lectureData])

  useEffect(() => {
    if (week) {
      const dataIndex = week.indexOf(today)
      setTodayIndex(dataIndex)

      fetchAllAttendance()
    }
  }, [week, today])

  useEffect(() => {
    if (periodArr.length > 0 && page !== null) {
      setWeek(periodArr[page - 1])
    }
  }, [page, periodArr])

  useEffect(() => {
    if (week) {
      const initialValues = week.map((day, dayIndex) =>
        data.nodes.map((item, index) =>
          attendanceAllData[dayIndex] && attendanceAllData[dayIndex][index]
            ? attendanceAllData[dayIndex][index].attendanceState
            : '-',
        ),
      )
      setSelectedValues(initialValues)
    }
  }, [attendanceAllData, week])

  useEffect(() => {
    if (todayIndex > 2 && tableRef.current) {
      setTimeout(() => {
        const scrollWidth = tableRef.current.scrollWidth
        tableRef.current.scrollLeft = scrollWidth
      }, 100)
    }
  }, [todayIndex])

  const onSelectChange = (action, state) => {
    console.log(action, state)
  }

  const handleSelectChange = (value, itemIndex, dayIndex) => {
    const updatedValues = [...selectedValues]
    updatedValues[dayIndex][itemIndex] = value
    setSelectedValues(updatedValues)
  }

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  })

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  useEffect(() => {
    if (week) {
      let newGridTemplateColumns = '50px 50px 100px 100px repeat(4, 70px)'
      let newGridTemplateColumnsMo = '100px'

      if (todayIndex < 0) {
        for (let i = 0; i < 5; i++) {
          newGridTemplateColumns += ' repeat(1, minmax(min-content, 1fr))'
          newGridTemplateColumnsMo += ' repeat(1, minmax(min-content, 1fr))'
        }
      } else {
        if (todayIndex !== 0) {
          for (let i = 0; i < todayIndex; i++) {
            newGridTemplateColumns += ' repeat(1, minmax(min-content, 1fr))'
            newGridTemplateColumnsMo += ' repeat(1, minmax(min-content, 1fr))'
          }
        }
        newGridTemplateColumns += ' repeat(1, minmax(min-content, 2fr))'
        newGridTemplateColumnsMo += ' repeat(1, minmax(min-content, 2fr))'
        for (let i = 0; i < 4 - todayIndex; i++) {
          newGridTemplateColumns += ' repeat(1, minmax(min-content, 1fr))'
          newGridTemplateColumnsMo += ' repeat(1, minmax(min-content, 1fr))'
        }
      }

      setGridTemplateColumns(newGridTemplateColumns)
      setGridTemplateColumnsMo(newGridTemplateColumnsMo)
    }
  }, [week, todayIndex])
  const theme = useTheme([
    // getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:${gridTemplateColumns};
        text-align:center;
        font-size: 0.875rem;
        color: #71717a;

        @media (max-width: 768px) {
        --data-table-library_grid-template-columns:${gridTemplateColumnsMo};
          }
      `,
      BaseCell: `
        padding: 1rem;
        // min-width: 70px;

        &:nth-of-type(${todayIndex >= 0 ? 9 + todayIndex : -1}) {
          // background:rgba(0, 125, 233, 0.15);
          border-left: 0.2rem solid #07bbae;
          border-right: 0.2rem solid #07bbae;
        }
        &:nth-of-type(1) {
          position: sticky;
          left: 0;
          z-index: 2;
          @media (max-width: 768px) {
            display:none;
          }
        }

        &:nth-of-type(2) {
          left: 50px;
          @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(3) {
          left: 100px;
          @media (max-width: 768px) {
            left: 0;
          }

        }
        &:nth-of-type(4) {
          left: 200px;
            @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(5) {
          left: 300px;
          font-weight: bold;
          @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(6) {
          left: 370px;
          font-weight: bold;
          color: #007de9;
          @media (max-width: 768px) {
            display:none;
          }
        }
          &:nth-of-type(7) {
          left: 440px;
          font-weight: bold;
              color: #ff5900;
          @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(8) {
          left: 510px;
          font-weight: bold;
          box-shadow: 5px 0 20px -15px rgba(0, 0, 0, 0.7);

          @media (max-width: 768px) {
            display:none;
          }
        }

        > div {
          overflow:unset;
          white-space:unset;
          text-overflow:unset;
        }
      `,
      HeaderRow: `
        background:#fff;
      `,
      HeaderCell: `
        text-align:center;
        padding: 1rem;
        font-weight: 600;
        color:#111;
        border-bottom: 1px solid #e4e4e7;

          &:nth-of-type(${todayIndex >= 0 && 9 + todayIndex}) {
            border-radius: 0.5rem 0.5rem  0 0;
            border-top: 0.2rem solid #07bbae;
          }

          span {
            display: inline-block;
            vertical-align:middle;
          }
      `,
      Row: `
        background:#fff;
        &:nth-of-type(even){
          background:#e2eafc;
        }

        &:last-of-type{
          > td:nth-of-type(${todayIndex >= 0 && 9 + todayIndex}) {
            border-radius: 0 0 0.5rem 0.5rem;
            border-bottom: 0.2rem solid #07bbae;
          }
        }

        &:hover {
          background:#f7fafc;
        }
      `,
    },
  ])

  const extractProperty = (data, property) => {
    return data.nodes.map(item => {
      const keys = property.split('.')
      let value = item
      for (const key of keys) {
        if (value && key in value) {
          value = value[key]
        } else {
          return null
        }
      }
      return value
    })
  }

  const openWorkLog = date => {
    setSelectWrokLogDate(date)
    onOpen()
  }

  const onSubmit = index => {
    const attendanceDate = String(week[index])
    const id = extractProperty(data, `student.id`)
    const payMentID = extractProperty(data, `id`)
    const state = selectedValues[index]

    createAttendance({
      variables: {
        lecturesId: lectureData.id,
        studentPaymentId: payMentID,
        attendanceDate: attendanceDate,
        studentId: id,
        attendanceState: state,
      },
      onCompleted: resData => {
        if (resData.createAttendance.ok) {
          createWorkLogs({
            variables: {
              lecturesId: lectureData.id,
              workLogsDate: attendanceDate,
            },
            onCompleted: result => {
              if (result.createWorkLogs.ok) {
                alert(`${attendanceDate} 출석체크 완료`)
                window.location.reload()
              }
            },
          })
        }
      },
    })
  }

  const onEdit = index => {
    const attendanceDate = String(week[index])
    const attendanceId = attendanceAllData[index].map(i => i.id)
    const state = selectedValues[index]

    EditAttendance({
      variables: {
        editAttendanceId: attendanceId,
        attendanceState: state,
      },
      onCompleted: resData => {
        if (resData.editAttendance.ok) {
          // fetchAllAttendance()
          seeAttendanceRefetch()
          alert(`${attendanceDate} 출석수정 완료`)
        }
      },
    })
  }

  return (
    week && (
      <>
        <div>
          <Table
            ref={tableRef}
            data={data}
            theme={theme}
            layout={{
              custom: true,
              horizontalScroll: true,
              fixedHeader: true,
            }}
            select={select}
            className="pb-2 scrollbar"
          >
            {tableList => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSelect pinLeft />
                    <HeaderCell pinLeft>No</HeaderCell>
                    <HeaderCell pinLeft>이름</HeaderCell>
                    <HeaderCell pinLeft>수강구분</HeaderCell>
                    <HeaderCell pinLeft>훈련 일수</HeaderCell>
                    <HeaderCell pinLeft>출석 일수</HeaderCell>
                    <HeaderCell pinLeft>결석 일수</HeaderCell>
                    <HeaderCell pinLeft>출석률</HeaderCell>
                    {week.map((item, index) => (
                      <HeaderCell key={index}>
                        <span>{item}</span>
                        {index === todayIndex && <TodayTag>Today</TodayTag>}
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList
                    .filter(student => student.lectureAssignment === '배정')
                    .map((item, index) => (
                      <Row key={item.id} item={item}>
                        <CellSelect item={item} />
                        <Cell pinLeft>{index + 1}</Cell>
                        <Cell pinLeft>{item.student.name}</Cell>
                        <Cell pinLeft>{item.subDiv}</Cell>
                        <Cell pinLeft>{item.days}</Cell>
                        <Cell pinLeft>{item.attendanceDate}</Cell>
                        <Cell pinLeft>{item.absent}</Cell>
                        <Cell pinLeft>{item.attendanceRate}</Cell>
                        {attendanceAllData.map((dayValue, dayIndex) => (
                          <Cell key={dayIndex}>
                            <TestSelect
                              style={{
                                width: '100%',
                                border: 'none',
                                fontSize: '1rem',
                                padding: 0,
                                margin: 0,
                              }}
                              disabled={
                                dayIndex !== todayIndex &&
                                attendanceAllData[dayIndex]?.length === 0
                              }
                              value={selectedValues[dayIndex][index]}
                              onChange={event => {
                                handleSelectChange(
                                  event.target.value,
                                  index,
                                  dayIndex,
                                )
                              }}
                            >
                              <option value="-">-</option>
                              <option value="출석">출석</option>
                              <option value="지각">지각</option>
                              <option value="조퇴">조퇴</option>
                              <option value="결석">결석</option>
                              <option value="외출">외출</option>
                            </TestSelect>
                          </Cell>
                        ))}
                      </Row>
                    ))}

                  <Row
                    item={{
                      id: '1',
                      nodes: [],
                    }}
                  >
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    <Cell pinLeft></Cell>
                    {periodArrIndex <= page ? (
                      <>
                        {week.map((item, index) => (
                          <Cell key={index}>
                            <BtnCell>
                              <Button
                                isDisabled={
                                  attendanceAllData[index]?.length === 0
                                    ? true
                                    : false
                                }
                                size="sm"
                                radius="sm"
                                variant="solid"
                                color="primary"
                                onClick={() => openWorkLog(item)}
                              >
                                일지
                              </Button>
                              {index >= todayIndex ? (
                                <>
                                  {index === todayIndex &&
                                  attendanceAllData[todayIndex]?.length !==
                                    0 ? (
                                    <Button
                                      isDisabled={
                                        index > todayIndex ? true : false
                                      }
                                      size="sm"
                                      radius="sm"
                                      variant="solid"
                                      className="text-white bg-[#07bbae]"
                                      onClick={() => onEdit(index)}
                                    >
                                      수정
                                    </Button>
                                  ) : (
                                    <Button
                                      isDisabled={
                                        index !== todayIndex &&
                                        attendanceAllData[index]?.length === 0
                                      }
                                      size="sm"
                                      radius="sm"
                                      variant="solid"
                                      className="text-white bg-[#07bbae]"
                                      onClick={() => onSubmit(index)}
                                    >
                                      저장
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <>
                                  {attendanceAllData[index]?.length === 0 ? (
                                    <Button
                                      isDisabled={selectedValues[
                                        todayIndex
                                      ].includes('-')}
                                      size="sm"
                                      radius="sm"
                                      variant="solid"
                                      className="text-white bg-[#07bbae]"
                                      onClick={() => onSubmit(index)}
                                    >
                                      저장
                                    </Button>
                                  ) : (
                                    <Button
                                      isDisabled={
                                        index > todayIndex ? true : false
                                      }
                                      size="sm"
                                      radius="sm"
                                      variant="solid"
                                      className="text-white bg-[#07bbae]"
                                      onClick={() => onEdit(index)}
                                    >
                                      수정
                                    </Button>
                                  )}
                                </>
                              )}
                            </BtnCell>
                          </Cell>
                        ))}
                      </>
                    ) : (
                      <>
                        {week.map((item, index) => (
                          <Cell key={index}>
                            <BtnCell>
                              <Button
                                size="sm"
                                radius="sm"
                                variant="solid"
                                color="primary"
                                onClick={() => openWorkLog(item)}
                              >
                                일지
                              </Button>
                              <Button
                                size="sm"
                                radius="sm"
                                variant="solid"
                                className="text-white bg-[#07bbae]"
                              >
                                수정
                              </Button>
                            </BtnCell>
                          </Cell>
                        ))}
                      </>
                    )}
                  </Row>
                </Body>
              </>
            )}
          </Table>

          <BtnBox>
            <Button
              size="md"
              variant="solid"
              className="w-full text-[#000] bg-[#FEE500]"
              // onClick={() => setIsOpen(!isOpen)}
            >
              <i className="xi-kakaotalk text-[1.5rem]" />
              카카오톡발송
            </Button>
            <Button
              size="md"
              variant="bordered"
              color="primary"
              className="w-full"
              // onClick={() => clickCancelReq(item)}
            >
              SMS발송
            </Button>
          </BtnBox>
        </div>
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={page}
            page={page}
            total={periodArr.length}
            onChange={newPage => {
              handlePageChange(newPage)
            }}
          />
        </PagerWrap>
        <WorksLogs
          isOpen={isOpen}
          onClose={onClose}
          lectureId={lectureData.id}
          workLogeDate={selectWrokLogDate}
        />
      </>
    )
  )
}
