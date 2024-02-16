import { useMutation, useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import {
  GET_HOURLY_SALES_QUERY,
  GET_SALES_QUERY,
  SEE_AMOUNT_STUDENT_QUERY,
} from '@/graphql/queries'
import router, { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'
import SalesItem from '@/components/table/SalesItem'
import SalesTotalItem from './SalesTotalItem'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const ColorHelp = styled.div`
  display: flex;
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }
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
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`

const TheaderBox = styled.div`
  display: table;
  width: 100%;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
  font-weight: 600;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

export default function SalesTable({
  onFilterSearch,
  studentFilter,
  setStudentFilter,
}) {
  const router = useRouter()
  const { data, refetch } = useQuery(GET_SALES_QUERY, {
    variables: {
      endDate: new Date(),
      startDate: new Date(),
    },
  })
  const {
    data: hourlyData,
    refetch: houralyRefetch,
    networkStatus: houralyNetworkStatus,
    error,
  } = useQuery(GET_HOURLY_SALES_QUERY, {
    variables: { date: new Date() },
  })
  const [searchResult, setSearchResult] = useState(null)

  async function fetchData(studentFilter) {
    let result
    if (Object.keys(studentFilter).length !== 0) {
      if (studentFilter.daily) {
        result = await houralyRefetch({
          date: studentFilter.selectDate[1],
        })
      } else {
        result = await refetch({
          startDate: studentFilter.selectDate[0],
          endDate: studentFilter.selectDate[1],
        })
      }
    } else {
      result = await houralyRefetch({
        date: new Date(),
      })
    }
    return result
  }

  useEffect(() => {
    fetchData(studentFilter)
      .then(result => {
        setSearchResult(result.data)
      })
      .catch(error => {
        console.error('Error occurred during data fetching:', error)
      })
  }, [studentFilter, router])

  const formatDate = data => {
    const date = new Date(data)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} `
    return formatted
  }

  return (
    searchResult !== null && (
      <>
        <TTopic>
          <Ttotal>
            검색 기간&nbsp;:&nbsp;
            {Object.keys(studentFilter).length === 0 ? (
              <>
                <span>{formatDate(new Date())}</span> -
                <span>{formatDate(new Date())}</span>
              </>
            ) : (
              <>
                <span>{formatDate(studentFilter.selectDate[0])}</span> -
                <span>{formatDate(studentFilter.selectDate[1])}</span>
              </>
            )}
          </Ttotal>
        </TTopic>
        <TableArea>
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <TableWrap>
              <Theader>
                <TheaderBox>
                  <TcreatedAt>결제일시</TcreatedAt>
                  <Tamount>카드 결제금액</Tamount>
                  <Tamount>현금 결제금액</Tamount>
                  <Tamount>결제 합계</Tamount>
                  <Tamount>카드 환불금액</Tamount>
                  <Tamount>현금 환불금액</Tamount>
                  <Tamount>환불 홥계</Tamount>
                  <Tamount>총 매출액</Tamount>
                </TheaderBox>
              </Theader>
              {studentFilter.daily || studentFilter.daily === undefined ? (
                <>
                  {searchResult?.getHourlySalesData?.map((item, index) => (
                    <SalesItem
                      key={index}
                      tableData={item}
                      type={true}
                      date={
                        studentFilter.daily
                          ? studentFilter.selectDate[0]
                          : new Date()
                      }
                    />
                  ))}
                  <SalesTotalItem
                    tableData={searchResult?.getHourlySalesData}
                  />
                </>
              ) : (
                <>
                  {searchResult?.getSalesData?.length > 0 ? (
                    <>
                      {searchResult?.getSalesData?.map((item, index) => (
                        <SalesItem key={index} tableData={item} type={false} />
                      ))}
                      <SalesTotalItem tableData={searchResult?.getSalesData} />
                    </>
                  ) : (
                    <>
                      <Nolist>검색결과가 없습니다.</Nolist>
                    </>
                  )}
                </>
              )}
            </TableWrap>
          </ScrollShadow>
        </TableArea>
      </>
    )
  )
}
