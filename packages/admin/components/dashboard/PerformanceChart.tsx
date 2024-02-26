import { styled } from 'styled-components'
import dynamic from 'next/dynamic'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { ScrollShadow } from '@nextui-org/react'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const ConArea = styled.div`
  width: 100%;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const Content = styled.div`
  flex: 1;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 1000px;
  }

  .apexcharts-series path {
    stroke-width: 0.3rem;
    @media (max-width: 768px) {
      stroke-width: 0.1rem;
    }
  }
`
const ChartWrap = styled.div`
  min-width: 700px;
`

export default function AdviceType({ managerIds, totalAmount, totalCount }) {
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const managerUsernames = managerIds.map(
    id => managerList.find(user => user.id === id)?.mUsername,
  )

  const countValue = Math.max(...totalCount)
  const maxCountValue = countValue <= 10 ? 10 : countValue
  const amountValue = Math.max(...totalAmount)
  const maxAmountValue = amountValue <= 10000000 ? 10000000 : amountValue

  const chartData = {
    series: [
      {
        name: '총 건수',
        type: 'column',
        data: totalCount,
      },
      {
        name: '총 매출',
        type: 'column',
        data: totalAmount,
      },
      {
        name: '총 매출(라인)',
        type: 'line',
        data: totalAmount,
      },
    ],
    options: {
      chart: {
        height: 350,
        width: '100%',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
        },
      },
      stroke: {
        width: [0, 1, 1],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex > 0) {
            return val / 10000 + '만원'
          }
          return val
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined,
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45,
          },
        },
      },
      labels: managerUsernames,
      yaxis: [
        {
          title: {
            text: '총 건수',
          },
          max: maxCountValue,
        },
        {
          opposite: true,
          title: {
            text: '총 금액 (1만원 단위)',
          },
          labels: {
            formatter: function (value) {
              return (value / 10000).toFixed(0).toLocaleString()
            },
          },
          max: maxAmountValue,
        },
        {
          show: false,
          max: maxAmountValue,
        },
      ],
      colors: [
        'rgba(46,147,250,0.85)',
        'rgba(0,227,150,0.85)',
        'rgba(0,227,150,0.85)',
      ],
    },
  }

  return (
    <ConArea>
      <DetailBox>
        <DetailDiv>
          <Content>
            <ScrollShadow orientation="horizontal" className="scrollbar">
              <ChartWrap>
                <ApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  height="350"
                />
              </ChartWrap>
            </ScrollShadow>
          </Content>
        </DetailDiv>
      </DetailBox>
    </ConArea>
  )
}
