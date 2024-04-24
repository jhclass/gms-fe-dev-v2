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
import { useState } from 'react'
import { Button, Pagination } from '@nextui-org/react'

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

export default function TestCate() {
  const nodes = [
    {
      id: '0',
      name: '김빨강',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '출석',
      day2: '출석',
      day3: '출석',
      day4: '조퇴',
      day5: '출석',
      day6: '출석',
      day7: '출석',
      day8: '-',
      day9: '-',
      day10: '-',
      _hasContent: false,
    },
    {
      id: '1',
      name: '김주황',
      subDiv: '근로자',
      days: 7,
      attendance: 5,
      absent: 2,
      attendanceRate: '42.8%',
      day1: '출석',
      day2: '결석',
      day3: '출석',
      day4: '결석',
      day5: '출석',
      day6: '출석',
      day7: '출석',
      day8: '-',
      day9: '-',
      day10: '-',
      _hasContent: false,
    },
    {
      id: '2',
      name: '김노랑',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '조퇴',
      day2: '출석',
      day3: '출석',
      day4: '조퇴',
      day5: '출석',
      day6: '출석',
      day7: '출석',
      day8: '-',
      day9: '-',
      day10: '-',
      _hasContent: false,
    },
    {
      id: '3',
      name: '김초록',
      subDiv: '근로자',
      days: 7,
      attendance: 5,
      absent: 2,
      attendanceRate: '42.8%',
      day1: '출석',
      day2: '출석',
      day3: '출석',
      day4: '결석',
      day5: '출석',
      day6: '결석',
      day7: '출석',
      day8: '-',
      day9: '-',
      day10: '-',
      _hasContent: false,
    },
    {
      id: '4',
      name: '김파랑',
      subDiv: '근로자',
      days: 7,
      attendance: 5,
      absent: 2,
      attendanceRate: '42.8%',
      day1: '출석',
      day2: '출석',
      day3: '출석',
      day4: '결석',
      day5: '출석',
      day6: '결석',
      day7: '출석',
      day8: '-',
      day9: '-',
      day10: '-',
      _hasContent: false,
    },
    {
      id: '5',
      name: '김남',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '출석',
      day2: '지각',
      day3: '출석',
      day4: '-',
      day5: '-',
      _hasContent: false,
    },
    {
      id: '6',
      name: '김보라',
      subDiv: '근로자',
      days: 7,
      attendance: 5,
      absent: 2,
      attendanceRate: '42.8%',
      day1: '출석',
      day2: '지각',
      day3: '출석',
      day4: '-',
      day5: '-',
      _hasContent: false,
    },
    {
      id: '7',
      name: '박빨강',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '출석',
      day2: '지각',
      day3: '출석',
      day4: '-',
      day5: '-',
      _hasContent: false,
    },
    {
      id: '8',
      name: '박주황',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '출석',
      day2: '지각',
      day3: '출석',
      day4: '-',
      day5: '-',
      _hasContent: false,
    },
    {
      id: '9',
      name: '박노랑',
      subDiv: '근로자',
      days: 7,
      attendance: 7,
      absent: 0,
      attendanceRate: '100%',
      day1: '출석',
      day2: '지각',
      day3: '출석',
      day4: '-',
      day5: '-',
      _hasContent: false,
    },
  ]
  // const data = { nodes }

  const today = new Date().toISOString().split('T')[0]
  const datesArray = [
    '2024-04-22',
    '2024-04-23',
    '2024-04-24',
    '2024-04-25',
    '2024-04-26',
  ]
  const todayIndex = datesArray.indexOf(today)

  let gridTemplateColumns = '70px 70px 100px 100px repeat(4, 70px)'
  let gridTemplateColumnsMo = '70px 70px 100px'
  if (todayIndex !== 0) {
    for (let i = 0; i < todayIndex; i++) {
      gridTemplateColumns += ' repeat(1, minmax(min-content, 1fr))'
      gridTemplateColumnsMo += ' repeat(1, minmax(min-content, 1fr))'
    }
  }
  gridTemplateColumns += ' repeat(1, minmax(min-content, 2fr))'
  gridTemplateColumnsMo += ' repeat(1, minmax(min-content, 2fr))'
  for (let i = 0; i < 4 - todayIndex; i++) {
    gridTemplateColumns += ' repeat(1, minmax(min-content, 1fr))'
    gridTemplateColumnsMo += ' repeat(1, minmax(min-content, 1fr))'
  }
  console.log(gridTemplateColumns)
  const [data, setData] = useState({ nodes })
  const test = e => {
    console.log(e)
  }

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  })

  function onSelectChange(action, state) {
    console.log(action, state)
  }

  const handleUpdate = (value, id, property) => {
    setData(state => ({
      ...state,
      nodes: state.nodes.map(node => {
        if (node.id === id) {
          return { ...node, [property]: value }
        } else {
          return node
        }
      }),
    }))
  }

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
        min-width: 70px;
        &:nth-of-type(${8 + todayIndex}) {
          // background:rgba(0, 125, 233, 0.15);

        }
        &:nth-of-type(1) {
          position: sticky;
          left: 0;
          border-radius: 0.5rem 0 0 0.5rem;
          z-index: 2;
        }

        &:nth-of-type(2) {
          left: 70px;

        }
        &:nth-of-type(3) {
          left: 140px;

          @media (max-width: 768px) {
            display:none;
          } 
        }
        &:nth-of-type(4) {
          left: 240px;
            @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(5) {
          left: 340px;
          font-weight: bold;
          @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-of-type(6) {
          left: 410px;
          font-weight: bold;
          @media (max-width: 768px) {
            display:none;
          }
        }
          &:nth-of-type(7) {
          left: 480px;
          font-weight: bold;
          @media (max-width: 768px) {
            display:none;
          }
        }
           &:nth-of-type(8) {
          left: 550px;
          font-weight: bold;

          @media (max-width: 768px) {
            display:none;
          }
        }
        &:nth-last-of-type(1) {
          border-radius: 0 0.5rem 0.5rem 0;
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
      `,
      Row: `
        background:#fff;
        &:nth-of-type(even){
          background:#e2eafc;
        }

        &:hover {
          background:#f7fafc;
        }
      `,
    },
  ])

  return (
    gridTemplateColumns && (
      <>
        <div>
          <Table
            data={data}
            theme={theme}
            layout={{
              custom: true,
              horizontalScroll: true,
              fixedHeader: true,
            }}
            select={select}
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
                    {datesArray.map((item, index) => (
                      <HeaderCell key={index}>{item}</HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item, index) => (
                    <Row key={item.id} item={item}>
                      <CellSelect item={item} />
                      <Cell pinLeft>{index + 1}</Cell>
                      <Cell pinLeft>{item.name}</Cell>
                      <Cell pinLeft>{item.subDiv}</Cell>
                      <Cell pinLeft>{item.days}</Cell>
                      <Cell pinLeft>{item.attendance}</Cell>
                      <Cell pinLeft>{item.absent}</Cell>
                      <Cell pinLeft>{item.attendanceRate}</Cell>
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day1}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day1')
                          }
                        >
                          <option value="-">-</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="조퇴">조퇴</option>
                          <option value="지각&조퇴">지각&조퇴</option>
                          <option value="결석">결석</option>
                          <option value="외출">외출</option>
                          <option value="지각&외출">지각&외출</option>
                          <option value="외출&조퇴">외출&조퇴</option>
                          <option value="지각&외출&조퇴">지각&외출&조퇴</option>
                          <option value="휴가/공가">휴가/공가</option>
                          <option value="절반출석">절반출석</option>
                        </TestSelect>
                      </Cell>
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day2}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day2')
                          }
                        >
                          <option value="-">-</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="조퇴">조퇴</option>
                          <option value="지각&조퇴">지각&조퇴</option>
                          <option value="결석">결석</option>
                          <option value="외출">외출</option>
                          <option value="지각&외출">지각&외출</option>
                          <option value="외출&조퇴">외출&조퇴</option>
                          <option value="지각&외출&조퇴">지각&외출&조퇴</option>
                          <option value="휴가/공가">휴가/공가</option>
                          <option value="절반출석">절반출석</option>
                        </TestSelect>
                      </Cell>
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day3}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day3')
                          }
                        >
                          <option value="-">-</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="조퇴">조퇴</option>
                          <option value="지각&조퇴">지각&조퇴</option>
                          <option value="결석">결석</option>
                          <option value="외출">외출</option>
                          <option value="지각&외출">지각&외출</option>
                          <option value="외출&조퇴">외출&조퇴</option>
                          <option value="지각&외출&조퇴">지각&외출&조퇴</option>
                          <option value="휴가/공가">휴가/공가</option>
                          <option value="절반출석">절반출석</option>
                        </TestSelect>
                      </Cell>
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day4}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day4')
                          }
                        >
                          <option value="-">-</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="조퇴">조퇴</option>
                          <option value="지각&조퇴">지각&조퇴</option>
                          <option value="결석">결석</option>
                          <option value="외출">외출</option>
                          <option value="지각&외출">지각&외출</option>
                          <option value="외출&조퇴">외출&조퇴</option>
                          <option value="지각&외출&조퇴">지각&외출&조퇴</option>
                          <option value="휴가/공가">휴가/공가</option>
                          <option value="절반출석">절반출석</option>
                        </TestSelect>
                      </Cell>
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day5}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day5')
                          }
                        >
                          <option value="-">-</option>
                          <option value="출석">출석</option>
                          <option value="지각">지각</option>
                          <option value="조퇴">조퇴</option>
                          <option value="지각&조퇴">지각&조퇴</option>
                          <option value="결석">결석</option>
                          <option value="외출">외출</option>
                          <option value="지각&외출">지각&외출</option>
                          <option value="외출&조퇴">외출&조퇴</option>
                          <option value="지각&외출&조퇴">지각&외출&조퇴</option>
                          <option value="휴가/공가">휴가/공가</option>
                          <option value="절반출석">절반출석</option>
                        </TestSelect>
                      </Cell>
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
                    <Cell>
                      <BtnCell>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          onClick={() => test('24.04.01')}
                        >
                          일지
                        </Button>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                        >
                          저장
                        </Button>
                      </BtnCell>
                    </Cell>
                    <Cell>
                      <BtnCell>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          onClick={() => test('24.04.01')}
                        >
                          일지
                        </Button>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                        >
                          저장
                        </Button>
                      </BtnCell>
                    </Cell>
                    <Cell>
                      <BtnCell>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          onClick={() => test('24.04.01')}
                        >
                          일지
                        </Button>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                        >
                          저장
                        </Button>
                      </BtnCell>
                    </Cell>
                    <Cell>
                      <BtnCell>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          onClick={() => test('24.04.01')}
                        >
                          일지
                        </Button>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                        >
                          저장
                        </Button>
                      </BtnCell>
                    </Cell>
                    <Cell>
                      <BtnCell>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          onClick={() => test('24.04.01')}
                        >
                          일지
                        </Button>
                        <Button
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                        >
                          저장
                        </Button>
                      </BtnCell>
                    </Cell>
                  </Row>
                </Body>
              </>
            )}
          </Table>
        </div>
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={1}
            page={1}
            total={5}
            // onChange={newPage => {
            //   setCurrentPage(newPage)
            // }}
          />
        </PagerWrap>
      </>
    )
  )
}
