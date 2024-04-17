import Form from '@/components/Form'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, lazy } from 'react'
import styled from 'styled-components'

const TopText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const PCTopbtn = styled.div`
  position: absolute;
  top: 1.5278vw;
  left: 1.5278vw;
  display: flex;
`

const Btns = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #fff;

  a {
    display: block;
    width: 15.6944vw;
    max-width: 226px;
    background: #fff;
  }
`

const TopBtn = styled.div`
  position: absolute;
  top: 3.7037vw;
  left: 9.2593vw;
  gap: 0.5rem;
  display: none;

  img {
    width: 20.7407vw;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`

const MoCon = styled.div`
  position: relative;
  display: none;
  width: 100%;
  z-index: 2;
  margin-top: -7.5%;

  @media (max-width: 768px) {
    display: block;
  }
`
const MoDeco = styled.p`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`

const BtnSection = styled.div`
  position: relative;

  a {
    position: absolute;
    top: 0;
    right: 1.5rem;
    max-width: 13.5rem;
    width: 14%;
  }

  @media (max-width: 768px) {
    a {
      width: 20%;
      max-width: 10rem;
    }
  }
`
export default function designIllustrator() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

  return (
    <>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0 relative">
            <div className="hidden w-full wmd:block">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_graphics_bg.png"
                alt="웹디자인기능사"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_graphics_bg.png"
                alt="웹디자인기능사"
              />
            </div>
            <TopText>
              <TopBtn>
                <Link href="/design">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_top_btn01.webp"
                    alt="포토샵"
                  />
                </Link>
                <Link href="/design/illust">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_top_btn02.webp"
                    alt="일러스트"
                  />
                </Link>
                <Link href="/design/graphics">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_top_btn03.webp"
                    alt="그래픽스운용기사"
                  />
                </Link>
                <Link href="/design/webdesign">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_top_btn04.webp"
                    alt="웹디자인기능사"
                  />
                </Link>
              </TopBtn>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_graphics_01.webp"
                alt="컴퓨터그래픽스운용기능사 @COMPUTER GRAPHICS LICENSE
                시험에 필요한 핵심만 쏙쏙, 출제유형 분석과 모의고사 트레이닝!!
                최근 일러스트의 비중이 높아진 컴퓨터그래픽스 운용기능사의 시험유형을 파악.
                일러스트 실습을 통한 오브젝트 표현법 실습과 포토샵 필터의 사용법. 최종 아웃풋을 위한
                인디자인 사용방법까지 단기간에 실기문제에 적응하도록 학습하는 수업입니다.
                "
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_graphics_01.webp"
                alt="컴퓨터그래픽스운용기능사 @COMPUTER GRAPHICS LICENSE
                시험에 필요한 핵심만 쏙쏙, 출제유형 분석과 모의고사 트레이닝!!
                최근 일러스트의 비중이 높아진 컴퓨터그래픽스 운용기능사의 시험유형을 파악.
                일러스트 실습을 통한 오브젝트 표현법 실습과 포토샵 필터의 사용법. 최종 아웃풋을 위한
                인디자인 사용방법까지 단기간에 실기문제에 적응하도록 학습하는 수업입니다.
                "
                className="block w-full wmd:hidden"
              ></img>
            </TopText>
            <img
              className="absolute hidden w-full md:block bottom-[-4.0833vw] z-[-1]"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
              alt=""
            />
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="relative hidden w-full wmd:block">
            <PCTopbtn>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco_s.webp" /> */}
              <Btns>
                <Link href="/design">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_top_btn01.webp"
                    alt="포토샵"
                  />
                </Link>
                <Link href="/design/illust">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_top_btn02.webp"
                    alt="일러스트"
                  />
                </Link>
                <Link href="/design/graphics">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_top_btn03.webp"
                    alt="그래픽스운용기사"
                  />
                </Link>
                <Link href="/design/webdesign">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_top_btn04.webp"
                    alt="웹디자인기능사"
                  />
                </Link>
              </Btns>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco.webp" /> */}
            </PCTopbtn>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_graphics_02.png"
              alt="Step .01 시험소개, 문제 유형 파악 | 컴퓨터그래픽스운용기능사 소개 시험시 주의사항 학습 기출문제 풀이,
              Step .02 일러스트 이해 | 출제유형에 맞는 일러스트레이터 실기 유형 파악 및 이해 기출문제 풀이,
              Step .03 포토샵 이해 | 출제유형에 맞는 포토샵 실기 유형 파악 및 이해 기출문제 풀이,
              Step .04 인디자인 이해(출력) |인디자인 재단선 작성 및 출력 이해 사기출문제 풀이,
              
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              일러스트 | 시험유형에 맞는 일러스트 오브젝트 표현능력을 향상합니다.
              포토샵 | 포토샵 필터의 기능과 시험에 맞는 레이어스타일을 학습합니다.
              사전연습 | 시험응시 중 실수할 수 있는 요소를 사전에 파악하여 시험에 대한 실전적응력을 향상합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_illust_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_graphics_03.png"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_illust_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_graphics_02.png"
              alt="Step .01 시험소개, 문제 유형 파악 | 컴퓨터그래픽스운용기능사 소개 시험시 주의사항 학습 기출문제 풀이,
              Step .02 일러스트 이해 | 출제유형에 맞는 일러스트레이터 실기 유형 파악 및 이해 기출문제 풀이,
              Step .03 포토샵 이해 | 출제유형에 맞는 포토샵 실기 유형 파악 및 이해 기출문제 풀이,
              Step .04 인디자인 이해(출력) |인디자인 재단선 작성 및 출력 이해 사기출문제 풀이,
              
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              일러스트 | 시험유형에 맞는 일러스트 오브젝트 표현능력을 향상합니다.
              포토샵 | 포토샵 필터의 기능과 시험에 맞는 레이어스타일을 학습합니다.
              사전연습 | 시험응시 중 실수할 수 있는 요소를 사전에 파악하여 시험에 대한 실전적응력을 향상합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_illust_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_graphics_03.png"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
      <section className="mt-[-14rem] pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
