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
  top: 22px;
  left: 22px;
  display: flex;
`

const Btns = styled.div`
  display: flex;
  gap: 0.5rem;

  a {
    display: block;
    width: 226px;
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_webdesign_bg.png"
                alt="웹디자인기능사"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_webdesign_bg.png"
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_webdesign_01.webp"
                alt="웹디자인기능사 과정소개 @CRAFTSMAN WEB DESIGN
                웹 경험이 없어도 수강 OK~ 출제유형 분석을 통한 기출문제로 체계적인 시험대비!!
                최근 퍼블리싱의 비중이 높아진 웹디자인기능사의 시험유형을 파악.
                HTML부터 CSS, J-Query까지 합격에 필요한 내용을 분석하여 단기간에 학습하고,
                자체개발한 기출문제를 통해 실기문제에 대한 적응력을 함양하는 수업입니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_webdesign_01.webp"
                alt="웹디자인기능사 과정소개 @CRAFTSMAN WEB DESIGN
                웹 경험이 없어도 수강 OK~ 출제유형 분석을 통한 기출문제로 체계적인 시험대비!!
                최근 퍼블리싱의 비중이 높아진 웹디자인기능사의 시험유형을 파악.
                HTML부터 CSS, J-Query까지 합격에 필요한 내용을 분석하여 단기간에 학습하고,
                자체개발한 기출문제를 통해 실기문제에 대한 적응력을 함양하는 수업입니다."
                className="block w-full wmd:hidden"
              ></img>
            </TopText>
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_webdesign_02.png"
              alt="Step .01 HTML5, CSS | HTML5의 정의. 문서를 구성하는 기본요소 파악 구조를 나타내는 요소 정의 요소를 활용한 레이아웃 작업 CSS정의 및 속성,
              Step .02 J-Query기초 및 활용 | J-Query 기본 문법 J-Query 메소드 마우스이벤트 소개 J-Query 응용,
              Step .03 기출문제 풀이1 | 웹디자인기능사 기출문제풀이,
              Step .04 기출문제 풀이2 | 웹디자인기능사 기출문제풀이 최종점검,
              
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              시험유형 분석 | 시험유형에 맞는 HTML5의 정의 및 요소를 학습합니다.
              문제 처리능력 향상 | CSS속성 문제에 대한 유형변화와 핵심을 찾도록 합니다.
              J-Query 집중대비 | J-Query활용분야에서 출제될 수 있는 문제를 집중 공략합니다.
              자체개발 기출문제 | 자체개발한 기출문제를 통해 실전적용력을 함양합니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_webdesign_03.png"
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_webdesign_02.png"
              alt="Step .01 HTML5, CSS | HTML5의 정의. 문서를 구성하는 기본요소 파악 구조를 나타내는 요소 정의 요소를 활용한 레이아웃 작업 CSS정의 및 속성,
              Step .02 J-Query기초 및 활용 | J-Query 기본 문법 J-Query 메소드 마우스이벤트 소개 J-Query 응용,
              Step .03 기출문제 풀이1 | 웹디자인기능사 기출문제풀이,
              Step .04 기출문제 풀이2 | 웹디자인기능사 기출문제풀이 최종점검,
              
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              시험유형 분석 | 시험유형에 맞는 HTML5의 정의 및 요소를 학습합니다.
              문제 처리능력 향상 | CSS속성 문제에 대한 유형변화와 핵심을 찾도록 합니다.
              J-Query 집중대비 | J-Query활용분야에서 출제될 수 있는 문제를 집중 공략합니다.
              자체개발 기출문제 | 자체개발한 기출문제를 통해 실전적용력을 함양합니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_webdesign_03.png"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
    </>
  )
}
