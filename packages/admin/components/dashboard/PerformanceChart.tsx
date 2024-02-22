import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { DASHBOARD_AT_QUERY } from '@/graphql/queries'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 190px;

  .apexcharts-series path {
    stroke-width: 0.3rem;
    @media (max-width: 768px) {
      stroke-width: 0.1rem;
    }
  }
`

export default function AdviceType() {
  const { loading, error, data } = useQuery(DASHBOARD_AT_QUERY)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)
  const adviceTypeData = data?.dashboardAT

  const donutData = {
    series: [
      {
        name: 'A',
        data: [10, 41, 35, 51, 49, 62, 67, 91, 148, 70, 15, 20],
      },
      {
        name: 'B',
        data: [
          20, 31, 15, 88, 29, 52, 69, 81, 128, 29, 57, 56, 81, 128, 29, 57, 56,
        ],
      },
      {
        name: 'C',
        data: [60, 21, 15, 18, 29, 52, 169, 81, 48, 100, 2, 56],
      },
      {
        name: 'D',
        data: [10, 31, 85, 28, 79, 152, 89, 81, 98, 34, 0, 0],
      },
      {
        name: 'E',
        data: [40, 71, 25, 98, 129, 32, 62, 81, 190, 12, 67, 22],
      },
      {
        name: 'F',
        data: [30, 151, 85, 18, 19, 132, 22, 61, 190, 0, 54, 78],
      },
    ],
    options: {
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      chart: {
        stroke: {
          width: 20,
        },
        // width: '100%',
        height: '100%',
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      colors: [
        '#2E93fA',
        '#80E399',
        '#ebaf32',
        '#DE4760',
        '#705Ecc',
        '#546E7A',
        '#66DA26',
        '#DF4800',
      ],
      xaxis: {
        categories: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
        ],
        tickAmount: 60,
        // type: 'datetime',
        // stepSize: 1,
        // min: new Date('2024.01.01').getTime(),
        // max: new Date('2024.01.13').getTime(),
        // labels: {
        //   formatter: function (value, timestamp, opts) {
        //     return opts.dateFormatter(new Date(timestamp), 'yy-MM-dd')
        //   },
        // },
      },
    },
  }

  return (
    <ConArea>
      <DetailBox>
        <DetailDiv>
          {adviceTypeData !== null && (
            <>
              <Content>
                <div
                  style={{ width: '100%', overflowX: 'scroll' }}
                  className="w-full bg-white"
                >
                  <ApexChart
                    options={donutData.options}
                    series={donutData.series}
                    type="line"
                    height="350"
                  />
                </div>
              </Content>
            </>
          )}
        </DetailDiv>
      </DetailBox>
    </ConArea>
  )
}
