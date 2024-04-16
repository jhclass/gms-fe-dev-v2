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
export default function artworkDigitalDrawing() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

  return (
    <>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0 relative">
            <div className="hidden w-full wmd:block">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_bg.mp4"
              />
            </div>
            <TopText>
              <TopBtn>
                <Link href="/artwork">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_top_btn01.webp"
                    alt="디지털드로잉"
                  />
                </Link>
                <Link href="/artwork/game">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_top_btn02.webp"
                    alt="원화 (아트윅/게임)"
                  />
                </Link>
                <Link href="/artwork/emoticon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_top_btn03.webp"
                    alt="이모티콘"
                  />
                </Link>
              </TopBtn>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_01.webp"
                alt="디지털드로잉 과정소개 @DIGITAL DRAWING
                디지털 일러스트레이션의 다양한 완성, 분야별 컨셉파악부터 스토리에 따른 개인별 작품완성까지!! 타블렛의 기초 사용법부터 체계적인이론을 바탕으로, 개인별 스타일에 맞는 드로잉을 표현하기 위한 1:1 면담진행, 개개인의 니즈에 맞춘 컨셉별 특성표현과 캐릭터의 독창성을 고려하여 창의적인 작품을 디지털기법을 통해 완성하는 교육과정입니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_01.webp"
                alt="디지털드로잉 과정소개 @DIGITAL DRAWING
                디지털 일러스트레이션의 다양한 완성, 분야별 컨셉파악부터 스토리에 따른 개인별 작품완성까지!! 타블렛의 기초 사용법부터 체계적인이론을 바탕으로, 개인별 스타일에 맞는 드로잉을 표현하기 위한 1:1 면담진행, 개개인의 니즈에 맞춘 컨셉별 특성표현과 캐릭터의 독창성을 고려하여 창의적인 작품을 디지털기법을 통해 완성하는 교육과정입니다."
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
                <Link href="/artwork">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_top_btn01.webp"
                    alt="디지털드로잉"
                  />
                </Link>
                <Link href="/artwork/game">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_top_btn02.webp"
                    alt="원화 (아트윅/게임)"
                  />
                </Link>
                <Link href="/artwork/emoticon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_top_btn03.webp"
                    alt="이모티콘"
                  />
                </Link>
              </Btns>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco.webp" /> */}
            </PCTopbtn>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_02.webp"
              alt="Step .01 라인드로잉의 중요성 | 타블렛 이용시 주의사항 및 사용방법 디지털 라인드로잉 강의(브러시기능 이해) -직선/정원/타원/프리커브 라인드로잉 연습 & 개인별 트레이닝,
              Step .02 구도와 명암의 이해 | 사물 대상 정면, 반측면 구도 및 명암 이해 동물캐릭터 대상 구도 및 명암 컬러링,
              Step .03 동물 부분묘사-1 | 실사 동물(大) 예시로 근육 개념 이해 및 드로잉 -기린/코끼리/하마 등 큰동물 대상 실습,
              Step .04 동물 부분묘사-2 | 실사 동물(小) 예시로 근육 개념 이해 및 드로잉 -다람쥐/토끼/도마뱀 등 작은동물 대상 실습
              Step .05 동물캐릭터 모작-1, 동물캐릭터 모작-2 | 동물 의인화 캐릭터를 통한 Level 드로잉 동물캐릭터 예시를 이용한 모작과 창작의 표현 노하우 습득,
              Step .06 인물캐릭터 부분묘사-1, 인물캐릭터 부분묘사-2 | 눈, 코, 어깨, 다리 부분묘사의 이해와 실습 인물캐릭터의 구조와 이해 이상적인 실사 비율과 다양한 반실사 비율 체험,
              Step .07 스토리구성 | 스토리 구성하기 - 모작 기반(또는 창작) 스토리 포인트 검토 - 선생님과 상의하여 구성완료,
              Step .08 캐릭터/아트웍 컨셉 드로잉-1 | 컨셉 기획 및 자료수집 캐릭터/아트웍 컨셉드로잉 - 러프 라인드로잉,
              Step .09 캐릭터/아트웍 컨셉 드로잉-2 | 캐릭터/아트웍 컨셉드로잉 - mass(덩어리) 및 컬러링,
              Step .10 캐릭터/아트웍 컨셉 드로잉-3 | 배경 컨셉드로잉 - 캐릭터/아트웍 구조에 맞춰 드로잉 및 수정보완,
              Step .11 작품View(씬)드로잉-1, 작품View(씬)드로잉-2 | 쿼터뷰( Quarter View )씬 드로잉 제작, 퍼스펙티브뷰 ( Perspective View ) 씬 드로잉 제작,
              Step .12 작품 최종보완 및 완료 최종 취업/작가 면담 | 작품(캐릭터/아트웍) 최종 수정.정리 취업/작가 과정 면담 - 취업연계 또는 작가진출 경로안내,
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              도형별 컨셉수정 | 드로잉이 이론과 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 도형별 컨셉수정 능력을 향상합니다.
              움직임의 원리 | 움직임의 원리를 이해하고 아이덴티티에 맞는 개성표현 능력을 기릅니다.
              면담&피드백 | 분야별 직종에 맞는 전문인력 양성을 위해 매 수업별 1:1로 교강사의 진로&적성 면담과 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_02.webp"
              alt="Step .01 라인드로잉의 중요성 | 타블렛 이용시 주의사항 및 사용방법 디지털 라인드로잉 강의(브러시기능 이해) -직선/정원/타원/프리커브 라인드로잉 연습 & 개인별 트레이닝,
              Step .02 구도와 명암의 이해 | 사물 대상 정면, 반측면 구도 및 명암 이해 동물캐릭터 대상 구도 및 명암 컬러링,
              Step .03 동물 부분묘사-1 | 실사 동물(大) 예시로 근육 개념 이해 및 드로잉 -기린/코끼리/하마 등 큰동물 대상 실습,
              Step .04 동물 부분묘사-2 | 실사 동물(小) 예시로 근육 개념 이해 및 드로잉 -다람쥐/토끼/도마뱀 등 작은동물 대상 실습
              Step .05 동물캐릭터 모작-1, 동물캐릭터 모작-2 | 동물 의인화 캐릭터를 통한 Level 드로잉 동물캐릭터 예시를 이용한 모작과 창작의 표현 노하우 습득,
              Step .06 인물캐릭터 부분묘사-1, 인물캐릭터 부분묘사-2 | 눈, 코, 어깨, 다리 부분묘사의 이해와 실습 인물캐릭터의 구조와 이해 이상적인 실사 비율과 다양한 반실사 비율 체험,
              Step .07 스토리구성 | 스토리 구성하기 - 모작 기반(또는 창작) 스토리 포인트 검토 - 선생님과 상의하여 구성완료,
              Step .08 캐릭터/아트웍 컨셉 드로잉-1 | 컨셉 기획 및 자료수집 캐릭터/아트웍 컨셉드로잉 - 러프 라인드로잉,
              Step .09 캐릭터/아트웍 컨셉 드로잉-2 | 캐릭터/아트웍 컨셉드로잉 - mass(덩어리) 및 컬러링,
              Step .10 캐릭터/아트웍 컨셉 드로잉-3 | 배경 컨셉드로잉 - 캐릭터/아트웍 구조에 맞춰 드로잉 및 수정보완,
              Step .11 작품View(씬)드로잉-1, 작품View(씬)드로잉-2 | 쿼터뷰( Quarter View )씬 드로잉 제작, 퍼스펙티브뷰 ( Perspective View ) 씬 드로잉 제작,
              Step .12 작품 최종보완 및 완료 최종 취업/작가 면담 | 작품(캐릭터/아트웍) 최종 수정.정리 취업/작가 과정 면담 - 취업연계 또는 작가진출 경로안내,
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              도형별 컨셉수정 | 드로잉이 이론과 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 도형별 컨셉수정 능력을 향상합니다.
              움직임의 원리 | 움직임의 원리를 이해하고 아이덴티티에 맞는 개성표현 능력을 기릅니다.
              면담&피드백 | 분야별 직종에 맞는 전문인력 양성을 위해 매 수업별 1:1로 교강사의 진로&적성 면담과 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_03.webp"
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
