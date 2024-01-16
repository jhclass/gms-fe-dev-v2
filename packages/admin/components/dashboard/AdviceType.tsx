import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { DASHBOARD_TODAY_QUERY } from '@/graphql/queries'
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

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

export default function AdviceType() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)

  const data = {
    series: [44, 55, 41, 17, 15],
    options: {
      labels: ['분야1', '분야2', '분야3', '분야4', '분야5'],
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              value: {
                offsetY: 0,
              },
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
    },
  }
  return (
    <ItemBox>
      <Title>
        <span>상담분야 TOP5</span>
        <ToolTipBox>
          <Tooltip
            content={
              <DashTooltip className="px-1 py-2">
                <DashTooltipTitle className="font-bold text-small">
                  상담분야 TOP5
                </DashTooltipTitle>
                <DashTooltipCon className="text-tiny">
                  상담 분야 중 상위 5분야 (중복 선택 포함)
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
        <ApexChart options={data.options} series={data.series} type="donut" />
      </Content>
    </ItemBox>
  )
}
