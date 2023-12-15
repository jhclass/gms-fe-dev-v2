import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'

const ENTER_ANIMATION_DURATION = 1500

const Wrapper = styled.div`
  height: 320px;
  width: 320px;
`

/* 
-1 -> Incorrect
0 -> Unattempted
1 -> Correct
*/

const COLOR_PALATTE = [
  { color: '#F7F7FA', opacity: 1 },
  { color: '#FFFFF', opacity: 0.3 },
  { color: '#00CA8D', opacity: 1 },
]

const DonutChart = ({
  animate,
  colorPalatte,
  data,
  size,
  strokeColor,
  strokeWidth,
  thickness,
}) => {
  const d3Container = useRef(null)
  const theme = colorPalatte || COLOR_PALATTE

  useEffect(() => {
    const containerEle = d3Container.current

    if (data && Array.isArray(data) && data.length && containerEle) {
      const startAngle = -Math.PI / data.length
      const endAngle = 2 * Math.PI + startAngle

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = size / 2

      // append the svg object to the div called 'my_dataviz'
      const svg = d3
        .select(containerEle)
        .append('svg')
        .attr('width', size)
        .attr('height', size)
        .append('g')
        .attr('transform', `translate(${size / 2},${size / 2})`)

      // Compute the position of each group on the pie:
      const pie = d3.pie().value(1).startAngle(startAngle).endAngle(endAngle)

      // 가져온 각도를 사용하여 interpolate 수행
      const angleInterpolation = d3.interpolate(
        pie.startAngle().call(pie),
        pie.endAngle().call(pie),
      )

      // define arc with an inner radius and outer radius
      const arc = d3
        .arc()
        .innerRadius(radius - thickness) // This is the size of the donut hole
        .outerRadius(radius)
        .cornerRadius(20)
        .padAngle(0.1)

      const path = svg.selectAll('g').data(pie(data))
      path.exit().remove()
      const arcs = path.enter()

      // Build the pie chart: Each part of the pie is a path that we build using the arc function.
      // d in attr("d", arc), specifies successive coordinates of the points through which the path has to go

      arcs
        .append('path')
        .attr('d', d => arc(d as any))
        .attr('fill', d => {
          if (!d || Number.isNaN(d.data)) {
            return null
          }

          return theme[Number(d.data) + 1].color
        })
        .attr('stroke', strokeColor)
        .style('opacity', d => {
          if (!d || Number.isNaN(d.data)) {
            return null
          }

          return theme[Number(d.data) + 1].opacity
        })
        .style('stroke-width', strokeWidth)
        .transition()
        .duration(animate ? ENTER_ANIMATION_DURATION : 0)
        .attrTween('d', (d, i, nodes) => {
          if (!animate) {
            return () => ''
          }

          const originalEnd = d.endAngle

          return t => {
            const currentAngle = angleInterpolation(t)

            if (currentAngle < d.startAngle) {
              return ''
            }

            const updatedD = {
              data: d.data,
              endAngle: Math.min(currentAngle, originalEnd),
              index: d.index,
              padAngle: d.padAngle,
              startAngle: d.startAngle,
              value: d.value,
              // Add innerRadius and outerRadius properties based on your logic
              innerRadius: radius - thickness,
              outerRadius: radius,
            }

            return arc(updatedD)
          }
        })
    }

    return () => {
      if (containerEle) {
        const svgEleList = containerEle.getElementsByTagName('svg')

        if (svgEleList && svgEleList.length) {
          const ele = svgEleList[0]

          containerEle.removeChild(ele)
        }
      }
    }
  }, [data, animate, size, theme, strokeColor, strokeWidth, thickness])

  if (!(data && Array.isArray(data) && data.length)) return null

  return <Wrapper ref={d3Container} />
}

DonutChart.propTypes = {
  animate: PropTypes.bool,
  colorPalatte: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      opacity: PropTypes.number.isRequired,
    }),
  ),
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  thickness: PropTypes.number.isRequired,
}

DonutChart.defaultProps = {
  animate: false,
  strokeColor: null,
  strokeWidth: null,
  colorPalatte: null,
}

export default DonutChart
