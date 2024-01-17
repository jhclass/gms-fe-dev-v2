import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation, useQuery } from '@apollo/client'
import { DASHBOARD_AT_QUERY } from '@/graphql/queries'

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
  const { loading, error, data } = useQuery(DASHBOARD_AT_QUERY)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)
  const adviceTypeData = data?.dashboardAT

  console.log(adviceTypeData)

  const donutData = {
    series: adviceTypeData?.count || [],
    options: {
      labels: adviceTypeData?.topFiveName || [],
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
      {adviceTypeData !== null && (
        <>
          <Title>
            <span>상담분야 TOP</span>
            <ToolTipBox>
              <Tooltip
                content={
                  <DashTooltip className="px-1 py-2">
                    <DashTooltipTitle className="font-bold text-small">
                      상담분야 TOP
                    </DashTooltipTitle>
                    <DashTooltipCon className="text-tiny">
                      상담 분야 중 상위 분야 (중복 선택 포함)
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
            <ApexChart
              options={donutData.options}
              series={donutData.series}
              type="donut"
            />
          </Content>
        </>
      )}
    </ItemBox>
  )
}
