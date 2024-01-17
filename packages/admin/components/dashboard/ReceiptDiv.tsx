import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
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
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)

  const donutData = {
    series: [42, 47, 52, 58, 65, 25],
    options: {
      labels: ['온라인', '전화', '내사', 'HRD', '카카오톡', '플레이스'],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
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
          options={donutData.options}
          series={donutData.series}
          type="polarArea"
          className="w-[20rem]"
        />
      </Content>
    </ItemBox>
  )
}
