import React from 'react'
import MenuAll from './MenuAll'
import Link from 'next/link'
import styled from 'styled-components'

const GnbBox = styled.div`
  border-top: 1px solid #c2c2c2;
`
const Wrap = styled.div`
  display: flex;
  width: 1440px;
  margin: 0 auto;
`
const BnrBox = styled.div`
  width: 20%;
`
const LavList = styled.div`
  width: 80%;
  display: flex;
`

const LavBox = styled.ul`
  width: 12.5%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #c2c2c2;
  align-items: center;
  gap: 0.3rem;
  > li {
    width: 100%;
    text-align: center;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
  img {
    margin: 0 auto;
  }
`

export default function Gnb({ setHoverIndex }) {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  return (
    <>
      <GnbBox>
        <div className="wrap" style={{ display: 'flex' }}>
          <BnrBox>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_bnr01.png"
              alt="컴퓨터교육부분 2022 한국소비자산업평가 1위"
            />
          </BnrBox>
          <LavList>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(1)
              }}
            >
              <li>
                <Link href="/motiongraphic">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_01.png"
                    alt="프리미어프로"
                  />
                </Link>
              </li>
              <li>
                <Link href="/motiongraphic/afterEffect">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_02.png"
                    alt="에펙"
                  />
                </Link>
              </li>
              <li>
                <Link href="/motiongraphic/cinema">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_03.png"
                    alt="시네마4D"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_04.png"
                    alt="모션포트폴리오"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(2)
              }}
            >
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_01.png"
                    alt="포토샵"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_02.png"
                    alt="일러스트"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_03.png"
                    alt="그래픽스운용기능사"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_04.png"
                    alt="웹디자인기능사"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(3)
              }}
            >
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_01.png"
                    alt="기초드로잉(클립스튜디오)"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_02.png"
                    alt="웹툰 연출/각색"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_03.png"
                    alt="웹툰 배경"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_04.png"
                    alt="웹툰 원고"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(4)
              }}
            >
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_01.png"
                    alt="디지털드로잉"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_02.png"
                    alt="원화(아트웍/게임)"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_03.png"
                    alt="이모티콘 제작"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(5)
              }}
            >
              <li>
                <Link href="/support">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_01.png"
                    alt="구직자과정"
                  />
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_02.png"
                    alt="재직자과정"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_03.png"
                    alt="국가기간전략산업산업훈련"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_04.png"
                    alt="취업시스템"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_05.png"
                    alt="취업현황"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_06.png"
                    alt="채용정보"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_07.png"
                    alt="언론보도"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(6)
              }}
            >
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_01.png"
                    alt="K-MOVE(일본)"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_02.png"
                    alt="해외취업시스템"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_03.png"
                    alt="일본 약정회사 현환"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(7)
              }}
            >
              <li>
                <Link href="/academy">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_01.png"
                    alt="아카데미소개"
                  />
                </Link>
              </li>
              <li>
                <Link href="/academy/features">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_02.png"
                    alt="교육특성"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_03.png"
                    alt="강사소개"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_04.png"
                    alt="교육시설"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_05.png"
                    alt="커뮤니티"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_06.png"
                    alt="오시는길"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_07.png"
                    alt="포트폴리오"
                  />
                </Link>
              </li>
            </LavBox>
            <LavBox
              onMouseEnter={() => {
                setHoverIndex(8)
              }}
            >
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_01.png"
                    alt="수강료조회"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_02.png"
                    alt="시간표조회"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_03.png"
                    alt="카톡상담"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_04.png"
                    alt="온라인상담"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_05.png"
                    alt="위치조회"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_06.png"
                    alt="업무제휴"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_07.png"
                    alt="맞춤컨설팅"
                  />
                </Link>
              </li>
            </LavBox>
          </LavList>
        </div>
      </GnbBox>
    </>
  )
}
