import Form from '@/components/Form'
import dynamic from 'next/dynamic'
import Head from 'next/head'
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
      <Head>
        <title>HART | 웹툰스토리</title>
        <meta name="description" content="웹툰스토리" />
      </Head>
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_story_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_story_bg.mp4"
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_story_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_story_bg.mp4"
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_story_01.webp"
                alt="웹툰 원고(작가데뷔) 과정소개 @webtoon author
                작가(보조작가)데뷔를 위한!! 도전작 및 공모전을 위한 !! 웹툰 완성 최종단계!!
                지금까지 기초드로잉, 웹툰 연출/각색, 배경 드로잉을 경험하였다면,
                이제는 작가데뷔 차례!! 작가데뷔를 위한 도전작 준비 기획부터 투고까지!!
                대표 웹툰 플랫폼 및 대형 웹툰 유통사를 소개 받으며, 웹툰원고 투고를 지원합니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_story_01.webp"
                alt="웹툰 원고(작가데뷔) 과정소개 @webtoon author
                작가(보조작가)데뷔를 위한!! 도전작 및 공모전을 위한 !! 웹툰 완성 최종단계!!
                지금까지 기초드로잉, 웹툰 연출/각색, 배경 드로잉을 경험하였다면,
                이제는 작가데뷔 차례!! 작가데뷔를 위한 도전작 준비 기획부터 투고까지!!
                대표 웹툰 플랫폼 및 대형 웹툰 유통사를 소개 받으며, 웹툰원고 투고를 지원합니다."
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_story_02.webp"
              alt="Step .01 트렌드 / 글로벌 웹툰기획 TIP | 썸네일 기획 및 작성 - 장르 선택 및 트리트먼트 작성 단편 분량 1~3화 준비하기,
              Step .02 웹툰작가 능력강화 | 캐릭터 연구(시트제작, 드로잉, 채색) 배경작업 (스케치업, 사진보정 및 편집 등) 콘티 (원고로 옮기기 및 스케치),
              Step .03 웹툰 편집, 각색 방법론 | 웹툰 도전작 원고 완성도 기준 설정 채색 및 배경 각색 노하우 휭 스크롤( 페이지 ) 콘티 제작 최종 작품기획서 작성, 
              Step .04 웹툰 및 웹소설 플랫폼 | 대표 플랫폼 : 네이버, 카카오, 레진코믹스 등 웹툰 스튜디오, 유통전문 회사 이해 희 역량 파악 후 포지션 지원,
              Step .05 웹툰 법률 ( 만화포함 ) 원고 완성 및 투고 | 웹툰 계약의 이해 ( 업계 권장 작가 계약서 살펴보기 )
              웹툰( 만화 ) 저작권과 상업적 이용 라이선스 이해 트레이싱 및 표절 피하기 원고 완성 및 투고,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_consult_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_story_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/detail_top_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_story_02.webp"
              alt="Step .01 트렌드 / 글로벌 웹툰기획 TIP | 썸네일 기획 및 작성 - 장르 선택 및 트리트먼트 작성 단편 분량 1~3화 준비하기,
              Step .02 웹툰작가 능력강화 | 캐릭터 연구(시트제작, 드로잉, 채색) 배경작업 (스케치업, 사진보정 및 편집 등) 콘티 (원고로 옮기기 및 스케치),
              Step .03 웹툰 편집, 각색 방법론 | 웹툰 도전작 원고 완성도 기준 설정 채색 및 배경 각색 노하우 휭 스크롤( 페이지 ) 콘티 제작 최종 작품기획서 작성, 
              Step .04 웹툰 및 웹소설 플랫폼 | 대표 플랫폼 : 네이버, 카카오, 레진코믹스 등 웹툰 스튜디오, 유통전문 회사 이해 희 역량 파악 후 포지션 지원,
              Step .05 웹툰 법률 ( 만화포함 ) 원고 완성 및 투고 | 웹툰 계약의 이해 ( 업계 권장 작가 계약서 살펴보기 )
              웹툰( 만화 ) 저작권과 상업적 이용 라이선스 이해 트레이싱 및 표절 피하기 원고 완성 및 투고,

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/detail_consult_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_story_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
      <section className="mt-[-7rem] wmd:mt-[-10rem] pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
