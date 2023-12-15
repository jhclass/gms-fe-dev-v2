import { useMotionValue, Reorder } from 'framer-motion'
import { useRaisedShadow } from '@/utils/useRaisedShadow'
import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'

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
  gap: 0.2rem;
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
const Content = styled.div`
  display: flex;
  align-items: baseline;
`
const Total = styled.div`
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.25rem;
`
const MoM = styled.div`
  align-items: baseline;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  margin-left: 0.5rem;
  color: #f31260;
`
const MoMIcon = styled.p`
  height: 1.25rem;
`

export default function ConsultNum() {
  return (
    <ItemBox>
      <Title>
        <span>미처리 상담 수</span>
        <ToolTipBox>
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="font-bold text-small">Custom Content</div>
                <div className="text-tiny">
                  This is a custom tooltip content
                </div>
              </div>
            }
            placement="bottom"
          >
            <i className="xi-help" />
          </Tooltip>
        </ToolTipBox>
      </Title>
      <Content>
        <Total>12</Total>
        <MoM>
          <MoMIcon>
            <i className="xi-arrow-down" />
          </MoMIcon>
          3
        </MoM>
      </Content>
    </ItemBox>
  )
}
