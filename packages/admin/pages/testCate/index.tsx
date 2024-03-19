import MainWrap from '@/components/wrappers/MainWrap'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import Layout from '@/pages/testCate/layout'
import { nodes } from '@/pages/testCate/data'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table'
// import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useState } from 'react'
import { Button, Pagination } from '@nextui-org/react'
import ConsolutationCompletedTable from '@/components/table/ConsultationRegistered'

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const TestSelect = styled.select`
  text-align: center;
`

export default function TestCate() {
  // const data = { nodes }

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
      --data-table-library_grid-template-columns: 100px repeat(4, 100px) repeat(10, 1fr);
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
          left: 100px;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(3) {
          left: 200px;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(4) {
          left: 300px;
            background:hsl(240 5% 98%);
        }
        &:nth-of-type(5) {
          left: 400px;
          background:hsl(240 5% 98%);
        }
         &:nth-last-of-type(1) {
          left: 0px;
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
          <Table data={data} theme={theme}>
            {tableList => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell>이름</HeaderCell>
                    <HeaderCell>훈련 일수</HeaderCell>
                    <HeaderCell>출석 일수</HeaderCell>
                    <HeaderCell>결석 일수</HeaderCell>
                    <HeaderCell>출석률</HeaderCell>
                    <HeaderCell>24-01-01</HeaderCell>
                    <HeaderCell>24-01-02</HeaderCell>
                    <HeaderCell>24-01-03</HeaderCell>
                    <HeaderCell>24-01-04</HeaderCell>
                    <HeaderCell>24-01-05</HeaderCell>
                    <HeaderCell>24-01-06</HeaderCell>
                    <HeaderCell>24-01-07</HeaderCell>
                    <HeaderCell>24-01-08</HeaderCell>
                    <HeaderCell>24-01-09</HeaderCell>
                    <HeaderCell>24-01-10</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  <Row
                    item={{
                      id: '1',
                      nodes: [],
                    }}
                  >
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.01')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.02')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.03')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.04')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.05')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.06')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.07')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.08')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.09')}>훈련일지</Button>
                    </Cell>
                    <Cell>
                      <Button onClick={() => test('24.04.10')}>훈련일지</Button>
                    </Cell>
                  </Row>
                  {tableList.map(item => (
                    <Row key={item.id} item={item}>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.days}</Cell>
                      <Cell>{item.attendance}</Cell>
                      <Cell>{item.absent}</Cell>
                      <Cell>{item.attendanceRate}</Cell>
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
                      <Cell>
                        <TestSelect
                          style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1rem',
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.day6}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day6')
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
                          value={item.day7}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day7')
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
                          value={item.day8}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day8')
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
                          value={item.day9}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day9')
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
                          value={item.day10}
                          onChange={event =>
                            handleUpdate(event.target.value, item.id, 'day10')
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
}
TestCate.getLayout = page => <Layout>{page}</Layout>
