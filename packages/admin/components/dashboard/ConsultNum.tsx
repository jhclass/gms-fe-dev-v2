import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { DASHBOARD_UNP_QUERY } from '@/graphql/queries'

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
  align-items: baseline;
`
const Total = styled.div`
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.25rem;
  color: #ff5900;
`
const MoM = styled.div`
  align-items: baseline;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  margin-left: 0.5rem;
  color: #ff5900;
`
const MoMIcon = styled.p`
  height: 1.25rem;
`

export default function ConsultNum() {
  const { data, refetch } = useQuery(DASHBOARD_UNP_QUERY)
  const unpCount = data?.dashboardUnp.unpCount || 0
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenClick, setIsOpenClick] = useState(false)
  const dateFormet = data => {
    if (parseInt(data) < 10000) {
      const result = data.toLocaleString()
      return result
    } else {
      return '9999+'
    }
  }
  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <ItemBox>
      <Title>
        <span>미처리 상담</span>
        <ToolTipBox>
          <Tooltip
            content={
              <DashTooltip className="px-1 py-2">
                <DashTooltipTitle className="font-bold text-small">
                  미처리 상담
                </DashTooltipTitle>
                <DashTooltipCon className="text-tiny">
                  상담 신청일로부터 3일이 경과되고, 접수 대기였던 상태
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
        <Total>{dateFormet(unpCount)}</Total>
      </Content>
    </ItemBox>
  )
}
