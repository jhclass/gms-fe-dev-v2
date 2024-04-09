import { Link } from '@nextui-org/react'
import styled, { keyframes } from 'styled-components'

const aniScroll = keyframes`
 0%{ transform: translateX(0%) }
  100%{ transform: translateX(-100%) }
  `

const aniScroll2 = keyframes`
   0%{ transform: translateX(100%) }
  100%{ transform: translateX(0%) }
  `

const LoopBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  height: 2.9167vw;

  @media screen and (max-width: 960px) {
    height: 3.8889vw;
  }
`

const LoopItem1 = styled.ul`
  position: absolute;
  display: flex;
  width: max-content;
  animation: ${aniScroll} 50s linear infinite reverse;
`

const LoopItem2 = styled.ul`
  position: absolute;
  display: flex;
  width: max-content;
  animation: ${aniScroll2} 50s linear infinite reverse;
`
const LoopCon = styled.li`
  img {
    height: 2.9167vw;
  }
  @media screen and (max-width: 960px) {
    img {
      height: 3.8889vw;
    }
  }
`

export default function LoopDeco() {
  return (
    <LoopBox>
      <LoopItem1>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
      </LoopItem1>
      <LoopItem2>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
        <LoopCon>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
            alt=""
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/loopDeco.webp"
            alt=""
          />
        </LoopCon>
      </LoopItem2>
    </LoopBox>
  )
}
