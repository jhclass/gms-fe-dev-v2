import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { DASHBOARD_RD_QUERY } from '@/graphql/queries'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ItemBox = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: #71717a;
`
const ToolTipBox = styled.div`
  color: #71717a;
  font-size: 1.2rem;
`
const DashTooltip = styled.div`
  padding: 0.25rem 0.5rem;
`
const DashTooltipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`
const DashTooltipCon = styled.p`
  font-size: 0.75rem;

  span {
    display: block;
    font-size: 0.65rem;
    color: #777;
  }
`
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 190px;
`

export default function ReceiptDiv() {
  const { loading, error, data } = useQuery(DASHBOARD_RD_QUERY)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)
  const chartData = data?.dashboardRD
  const receiptDivValues = chartData
    ? chartData
        ?.filter(item => item.receiptDiv !== '')
        .map(item => item.receiptDiv)
    : []
  const countValues = chartData
    ? chartData?.filter(item => item.receiptDiv !== '').map(item => item.count)
    : []

  const chartOption = {
    series: [{ name: '총 건수', data: countValues }],
    option: {
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: receiptDivValues,
      },
    },
  }

  return (
    <ItemBox>
      <Title>
        <span>상담 접수 구분</span>
        <ToolTipBox>
          <Tooltip
            content={
              <DashTooltip className="px-1 py-2">
                <DashTooltipTitle className="font-bold text-small">
                  상담 접수 구분
                </DashTooltipTitle>
                <DashTooltipCon className="text-tiny">
                  상담 접수 구분에 따른 통계
                </DashTooltipCon>
              </DashTooltip>
            }
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={open => setIsOpen(open)}
          >
            <i
              className="xi-help"
              onClick={() => {
                setIsOpenClick(!isOpenClick)
                setIsOpen(!isOpenClick)
              }}
            />
          </Tooltip>
        </ToolTipBox>
      </Title>
      <Content>
        <ReactApexChart
          options={chartOption.option}
          series={chartOption.series}
          type="bar"
          height={175}
        />
      </Content>
    </ItemBox>
  )
}
