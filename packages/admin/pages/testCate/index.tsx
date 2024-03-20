import MainWrap from '@/components/wrappers/MainWrap'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import Layout from '@/pages/testCate/layout'
// import { nodes } from '@/pages/testCate/data'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
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

export default function TestCate() {
  const nodes = [
    {
      id: '0',
      name: '김빨강',
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
    '2024-03-18',
    '2024-03-19',
    '2024-03-20',
    '2024-03-21',
    '2024-03-22',
  ]
  const todayIndex = datesArray.indexOf(today)

  let gridTemplateColumns = 'repeat(5, 1fr)'
  for (let i = 1; i < todayIndex + 1; i++) {
    gridTemplateColumns += ' repeat(1, .8fr)'
  }
  gridTemplateColumns += ' repeat(1, 1.4fr)'
  for (let i = todayIndex + 1 + 1; i <= 5; i++) {
    gridTemplateColumns += ' repeat(1, .8fr)'
  }

  const test = e => {
    console.log(e)
  }

  const [data, setData] = useState({ nodes })

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
      `,
      BaseCell: `
        padding: 0.5rem;
        &:nth-of-type(1) {
          left: 0px;
          border-radius: 0.5rem 0 0 0.5rem;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(2) {
          left: 10%;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(3) {
          left: 15%;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(4) {
          left: 20%;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(5) {
          left: 25%;
          background:hsl(240 5% 98%);
        }
        &:nth-last-of-type(1) {
          border-radius: 0 0.5rem 0.5rem 0;
        }
      `,
      HeaderRow: `
        background:#d6e4f1;
      `,
      HeaderCell: `
        text-align:center;   
        padding: 1rem;
        font-weight: 600;
        &:nth-of-type(1) {
              background:#d6e4f1;
        }
        &:nth-of-type(2) {
              background:#d6e4f1;
        }
        &:nth-of-type(3) {
              background:#d6e4f1;
        }
        &:nth-of-type(4) {
        background:#d6e4f1;
        }
        &:nth-of-type(5) {
              background:#d6e4f1;
        }
      `,
    },
  ])

  const COLUMNS = [
    { label: '이름', renderCell: item => item.name, pinLeft: true },
    { label: '훈련 일수', renderCell: item => item.days, pinLeft: true },
    { label: '출석 일수', renderCell: item => item.attendance, pinLeft: true },
    { label: '결석 일수', renderCell: item => item.absent, pinLeft: true },
    { label: '출석률', renderCell: item => item.attendanceRate, pinLeft: true },
    {
      label: '24-01-01',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day1}
          onChange={event => handleUpdate(event.target.value, item.id, 'day1')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },

    {
      label: '24-01-02',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day2}
          onChange={event => handleUpdate(event.target.value, item.id, 'day2')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-03',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day3}
          onChange={event => handleUpdate(event.target.value, item.id, 'day3')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-04',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day4}
          onChange={event => handleUpdate(event.target.value, item.id, 'day4')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-05',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day5}
          onChange={event => handleUpdate(event.target.value, item.id, 'day5')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-06',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day6}
          onChange={event => handleUpdate(event.target.value, item.id, 'day6')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-07',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day7}
          onChange={event => handleUpdate(event.target.value, item.id, 'day7')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-08',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day8}
          onChange={event => handleUpdate(event.target.value, item.id, 'day8')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-09',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day9}
          onChange={event => handleUpdate(event.target.value, item.id, 'day9')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
    {
      label: '24-01-10',
      renderCell: item => (
        <TestSelect
          style={{
            width: '100%',
            border: 'none',
            fontSize: '1rem',
            padding: 0,
            margin: 0,
          }}
          value={item.day10}
          onChange={event => handleUpdate(event.target.value, item.id, 'day10')}
        >
          <option value="-">-</option>
          <option value="출석">출석</option>
          <option value="결석">결석</option>
          <option value="지각">지각</option>
          <option value="조퇴">조퇴</option>
        </TestSelect>
      ),
    },
  ]
  return (
    gridTemplateColumns && (
      <>
        <MainWrap>
          <div>
            {/* <div style={{ height: '300px' }}> */}
            {/* <CompactTable
            columns={COLUMNS}
            data={data}
            theme={theme}
            layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
          /> */}
            <Table
              data={data}
              theme={theme}
              layout={{
                custom: true,
                horizontalScroll: true,
                fixedHeader: true,
              }}
            >
              {tableList => (
                <>
                  <Header>
                    <HeaderRow>
                      <HeaderCell pinLeft>이름</HeaderCell>
                      <HeaderCell pinLeft>훈련 일수</HeaderCell>
                      <HeaderCell pinLeft>출석 일수</HeaderCell>
                      <HeaderCell pinLeft>결석 일수</HeaderCell>
                      <HeaderCell pinLeft>출석률</HeaderCell>
                      <HeaderCell>24-01-01</HeaderCell>
                      <HeaderCell>24-01-02</HeaderCell>
                      <HeaderCell>24-01-03</HeaderCell>
                      <HeaderCell>24-01-04</HeaderCell>
                      <HeaderCell>24-01-05</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body>
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
                      <Cell>
                        <Button onClick={() => test('24.04.01')}>
                          훈련일지
                        </Button>
                      </Cell>
                      <Cell>
                        <Button onClick={() => test('24.04.02')}>
                          훈련일지
                        </Button>
                      </Cell>
                      <Cell>
                        <Button onClick={() => test('24.04.03')}>
                          훈련일지
                        </Button>
                      </Cell>
                      <Cell>
                        <Button onClick={() => test('24.04.04')}>
                          훈련일지
                        </Button>
                      </Cell>
                      <Cell>
                        <Button onClick={() => test('24.04.05')}>
                          훈련일지
                        </Button>
                      </Cell>
                    </Row>
                    {tableList.map(item => (
                      <Row key={item.id} item={item}>
                        <Cell pinLeft>{item.name}</Cell>
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
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
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
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
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
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
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
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
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
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                            <option value="조퇴">조퇴</option>
                          </TestSelect>
                        </Cell>
                      </Row>
                    ))}
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
        </MainWrap>
      </>
    )
  )
}
TestCate.getLayout = page => <Layout>{page}</Layout>
