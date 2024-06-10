import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSuspenseQuery } from '@apollo/client'
import { DASHBOARD_AT_QUERY } from '@/graphql/queries'
import { DashboardAtResult } from '@/src/generated/graphql'
import { useRouter } from 'next/router'

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

  .apexcharts-legend {
    max-width: 87px;
    overflow-y: hidden;
    overflow-x: overlay;
    white-space: nowrap;
    padding: 0;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(0, 125, 233);
      border-radius: 0.75rem;
    }

    &::-webkit-scrollbar-track {
      background: rgb(0, 125, 233, 0.1);
    }

    @media (max-width: 479px) {
      max-width: 100%;
      width: auto;
    }
  }
`
type DashboardAT = {
  dashboardAT: DashboardAtResult
}

export default function AdviceTypeCon() {
  const router = useRouter()
  const { data, refetch } = useSuspenseQuery<DashboardAT>(DASHBOARD_AT_QUERY)
  const adviceTypeData = data?.dashboardAT
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)

  useEffect(() => {
    refetch()
  }, [router])

  const donutData = {
    series: adviceTypeData?.count || [],
    options: {
      chart: { offsetX: -10 },
      labels: adviceTypeData?.topFiveName || [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { offsetX: 0 },
            legend: {
              position: 'bottom',
              offsetX: 0,
            },
          },
        },
      ],
      legend: {
        offsetX: -20,
      },
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
            <span>상담분야 TOP{adviceTypeData?.topFiveName.length}</span>
            <ToolTipBox>
              <Tooltip
                content={
                  <DashTooltip className="px-1 py-2">
                    <DashTooltipTitle className="font-bold text-small">
                      상담분야 TOP{adviceTypeData?.topFiveName.length}
                    </DashTooltipTitle>
                    <DashTooltipCon className="text-tiny">
                      상담 분야 중 상위 {adviceTypeData?.topFiveName.length}분야
                      (중복 선택 포함)
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
              width="310"
            />
          </Content>
        </>
      )}
    </ItemBox>
  )
}
