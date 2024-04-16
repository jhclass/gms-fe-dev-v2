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
export default function webtoonDrawing() {
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_drawing_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_drawing_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_drawing_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_drawing_bg.mp4"
              />
            </div>
            <TopText>
              <TopBtn>
                <Link href="/webtoon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_top_btn01.webp"
                    alt="웹툰캐릭터(클립스튜디오)"
                  />
                </Link>
                <Link href="/webtoon/production">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_top_btn02.webp"
                    alt="웹툰연출/각색"
                  />
                </Link>
                <Link href="/webtoon/background">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_top_btn03.webp"
                    alt="웹툰배경"
                  />
                </Link>
                <Link href="/webtoon/story">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_top_btn04.webp"
                    alt="웹툰 스토리(원고/작가)"
                  />
                </Link>
              </TopBtn>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_drawing_01.webp"
                alt="기초드로잉 (CLIP STUDIO) 과정소개 @BASIC DRAWING
                웹툰 / 일러스트레이션의 시작, 즐기면서 배우는 드로잉&창작 기본기 트레이닝!
                클립스튜디오의 사용법 및 기초적인 도형을 이해하며, 디자인 스타일에 맞는 일러스트를 표현. 컨셉에 맞는 캐릭터의 표현과 성격에 맞는 비율 표현원리를 배우는 수업입니다. 또한 여러방면에 걸쳐 활용가능한 아이덴티티의 개념까지 함께 연습이 되도록 교육하는 강좌입니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_drawing_01.webp"
                alt="기초드로잉 (CLIP STUDIO) 과정소개 @BASIC DRAWING
                웹툰 / 일러스트레이션의 시작, 즐기면서 배우는 드로잉&창작 기본기 트레이닝!
                클립스튜디오의 사용법 및 기초적인 도형을 이해하며, 디자인 스타일에 맞는 일러스트를 표현. 컨셉에 맞는 캐릭터의 표현과 성격에 맞는 비율 표현원리를 배우는 수업입니다. 또한 여러방면에 걸쳐 활용가능한 아이덴티티의 개념까지 함께 연습이 되도록 교육하는 강좌입니다."
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
                <Link href="/webtoon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_top_btn01.webp"
                    alt="웹툰캐릭터(클립스튜디오)"
                  />
                </Link>
                <Link href="/webtoon/production">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_top_btn02.webp"
                    alt="웹툰연출/각색"
                  />
                </Link>
                <Link href="/webtoon/background">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_top_btn03.webp"
                    alt="웹툰배경"
                  />
                </Link>
                <Link href="/webtoon/story">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_top_btn04.webp"
                    alt="웹툰 스토리(원고/작가)"
                  />
                </Link>
              </Btns>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco.webp" /> */}
            </PCTopbtn>
            <img
              className="absolute hidden w-full md:block top-[2.0833vw] z-[-1]"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/loopDeco.webp"
              alt=""
            />
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_drawing_02.webp"
              alt="Step .01 드로잉 기초 및 채색.01 | 클립스튜디오기초 - 인체 단순화 (몸통) - 인체 단순화 (하체) - 인체 단순화 (상하체),
              Step .02 드로잉 기초 및 채색.02 | 클립스튜디오기초 - 인체 단순화 (팔) - 인체 단순화 (손) - 인체 단순화 (발, 잡화),
              Step .03 캐릭터 드로잉.01 | Stroke 스케치 및 채색 - 인물, 피사체,
              Step .04 캐릭터 드로잉.02 | 인물 이미지 자료를 통한 고정점 잡기 - 부동 자세 및 전신 - 걷는 자세 - 뛰는 자세 - 앉은 자세,
              Step .05 캐릭터 채색 | 배색 차트 채색 이론 컬러를 이용한 채색과 툴에 대한 설명 (포토샵 포함) 레이어를 이용한 하이라이트(빛) 묘사 진행,
              Step .06 캐릭터 재해석 모작 | 설정에 맞는 캐릭터 분석 및 디자인 현대 트렌드 패션을 적용한 캐릭터 모작,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_drawing_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_drawing_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_drawing_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_drawing_02.webp"
              alt="Step .01 드로잉 기초 및 채색.01 | 클립스튜디오기초 - 인체 단순화 (몸통) - 인체 단순화 (하체) - 인체 단순화 (상하체),
              Step .02 드로잉 기초 및 채색.02 | 클립스튜디오기초 - 인체 단순화 (팔) - 인체 단순화 (손) - 인체 단순화 (발, 잡화),
              Step .03 캐릭터 드로잉.01 | Stroke 스케치 및 채색 - 인물, 피사체,
              Step .04 캐릭터 드로잉.02 | 인물 이미지 자료를 통한 고정점 잡기 - 부동 자세 및 전신 - 걷는 자세 - 뛰는 자세 - 앉은 자세,
              Step .05 캐릭터 채색 | 배색 차트 채색 이론 컬러를 이용한 채색과 툴에 대한 설명 (포토샵 포함) 레이어를 이용한 하이라이트(빛) 묘사 진행,
              Step .06 캐릭터 재해석 모작 | 설정에 맞는 캐릭터 분석 및 디자인 현대 트렌드 패션을 적용한 캐릭터 모작,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_drawing_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_drawing_03.webp"
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
