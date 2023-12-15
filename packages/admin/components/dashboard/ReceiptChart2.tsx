import { useMotionValue, Reorder } from 'framer-motion'
import { useRaisedShadow } from '@/utils/useRaisedShadow'
import { styled } from 'styled-components'
import { Tooltip } from '@nextui-org/react'
import * as d3 from 'd3'
interface ChartData {
  name: string
  value: number
}
const SvgBox = styled.svg`
  max-width: 100%;
  height: auto;
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
  color: #17c964;
`
const MoMIcon = styled.p`
  height: 1.25rem;
`

export default function ReceiptChart() {
  // data,
  const data: ChartData[] = [
    { name: '온라인', value: 120 },
    { name: '방문', value: 22 },
    { name: '전화', value: 39 },
    { name: '미지정', value: 30 },
  ]
  const width = 320
  const height = Math.min(width, 500)
  const radius = Math.min(width, height) / 2
  const viewBox = String([-width / 2, -height / 2, width, height])
  const arc = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
  const pie = d3
    .pie()
    .padAngle(1 / radius)
    .sort(null)

  // const pieData = pie(data)
  // console.log()

  return (
    <SvgBox width={width} height={height} viewBox={viewBox}>
      <path
        fill="none"
        stroke="currentColor"
        // stroke-width="1.5"
        // d={line(data)}
      />
      {/* <g fill="white" stroke="currentColor">
        {pieData?.map((path, index) => (
          <path key={index} fill="rgb(66, 136, 181)" d={arc(path)}>
            <title></title>
          </path>
        ))}
      </g>
      <g>
        {pieData?.map((d, index) => (
          <text key={index} transform={`translate(${arc.centroid(d)})`}>
            <tspan y="-0.4em" fontWeight="bold">
              {data[index].name}
            </tspan>
            {d.endAngle - d.startAngle > 0.25 && (
              <tspan x="0" y="0.7em" fillOpacity="0.7">
                {data[index].value}
              </tspan>
            )}
          </text>
        ))}
      </g> */}
    </SvgBox>
  )
}
