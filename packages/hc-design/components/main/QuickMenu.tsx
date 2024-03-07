import Link from 'next/link'
import styled from 'styled-components'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const QuickBox = styled.div`
  border-top: 2px solid #b8b8b8;
  border-bottom: 2px solid #b8b8b8;
  background: #f3f3f3;

  @media (max-width: 1024px) {
    display: none;
  }

  img {
    max-width: 100%;
  }
`
const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`
const QuickItem = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: center;
    align-items: center;

    &:first-child {
      border-bottom: 1px solid #b8b8b8;
    }
  }
`

const QuickCon = styled.div`
  a {
    display: flex;
  }
`

export default function handleClick() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }
  return (
    <QuickBox>
      <Wrap>
        <QuickItem>
          <figure>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_quick_tit01.png"
              alt="notice & event"
            />
          </figure>
          <QuickCon>
            <Link href="#" onClick={handleClick}>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_quick_no_01.png"
                alt="event 2024년 K-MOVE 해외취업 과정 개강"
              />
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/icon/flag_new.png"
                alt="NEW"
              />
            </Link>
          </QuickCon>
        </QuickItem>
        <QuickItem>
          <figure>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_quick_tit02.png"
              alt="Congratulation"
            />
          </figure>
          <QuickCon>
            <Link href="#" onClick={handleClick}>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_quick_con_01.png"
                alt="주식회사범정 김OO님 취업을 축하드립니다."
              />
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/icon/flag_new.png"
                alt="NEW"
              />
            </Link>
          </QuickCon>
        </QuickItem>
      </Wrap>
    </QuickBox>
  )
}
