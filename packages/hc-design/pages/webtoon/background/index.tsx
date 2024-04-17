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
export default function webtoonBackground() {
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
                playsinline={true}
                muted={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_background_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_background_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                playsinline={true}
                muted={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_background_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_background_bg.mp4"
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_background_01.webp"
                alt="웹툰배경 과정소개 @perspective drawing
                    전경 및 캐릭터 투시도 기반의 웹툰 배경 제작! 소실점부터 다양한 구도를 체험하여 스케치업을 이용한 웹툰 배경 트레이닝!
                    선 원근법, 박스에 인물 넣기, 얼굴 도형화 각도 별 실습, 명암법과 그림자, 공간 또는 구도별 인물 배치 그리고 인체 비례와 동세, 해부학, 전경 투시 순으로 배경을 자연스럽게 그릴 수 있는 방법에 대해서 배울 수 있습니다. 또한 Sketch-Up(스케치업) 프로그램을 통해 3D배경 제작까지 공부합니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_background_01.webp"
                alt="웹툰배경 과정소개 @perspective drawing
                전경 및 캐릭터 투시도 기반의 웹툰 배경 제작! 소실점부터 다양한 구도를 체험하여 스케치업을 이용한 웹툰 배경 트레이닝!
                선 원근법, 박스에 인물 넣기, 얼굴 도형화 각도 별 실습, 명암법과 그림자, 공간 또는 구도별 인물 배치 그리고 인체 비례와 동세, 해부학, 전경 투시 순으로 배경을 자연스럽게 그릴 수 있는 방법에 대해서 배울 수 있습니다. 또한 Sketch-Up(스케치업) 프로그램을 통해 3D배경 제작까지 공부합니다."
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_background_02.webp"
              alt="Step .01 배경 드로잉 캐릭터 투시 | 소실점 이해 및 실내,실외의 다양한 투시도 제작 1~3 소점 투시 피사체, 건물, 배경, 캐릭터 점목 다양한 구도의 캐릭터 투시 제작,
              Step .02 배경 채색 스케치업 기본 | 원근감 표기 및 건물 질감 합성 스케치업 기초 및 실내, 실외 제작 - 사물 및 피사체를 통한 기본기 익히기 3D배경과 웹툰의 인물배치 응용하기,
              Step .03 건축물과 전경 | 건물 제작 및 건축양식에 어울리는 질감 합성하기 넓은 대지를 기준하여 구조 디자인 및 지형요소 알아보기,
              Step .04 원경 제작과 블렌더 (BLENDER) | 투시구조에 따른 원경과 구조 파악하기 블렌더 기초와 스컬핑 표현하기 스케치업과 연계된 호환요소 파악 및 표현하기 컨셉별 배경 보정방식 및 포트폴리오 제작,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_background_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_background_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_background_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_background_02.webp"
              alt="Step .01 배경 드로잉 캐릭터 투시 | 소실점 이해 및 실내,실외의 다양한 투시도 제작 1~3 소점 투시 피사체, 건물, 배경, 캐릭터 점목 다양한 구도의 캐릭터 투시 제작,
              Step .02 배경 채색 스케치업 기본 | 원근감 표기 및 건물 질감 합성 스케치업 기초 및 실내, 실외 제작 - 사물 및 피사체를 통한 기본기 익히기 3D배경과 웹툰의 인물배치 응용하기,
              Step .03 건축물과 전경 | 건물 제작 및 건축양식에 어울리는 질감 합성하기 넓은 대지를 기준하여 구조 디자인 및 지형요소 알아보기,
              Step .04 원경 제작과 블렌더 (BLENDER) | 투시구조에 따른 원경과 구조 파악하기 블렌더 기초와 스컬핑 표현하기 스케치업과 연계된 호환요소 파악 및 표현하기 컨셉별 배경 보정방식 및 포트폴리오 제작,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_background_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_background_03.webp"
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
