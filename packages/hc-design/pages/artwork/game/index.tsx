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
export default function artworkGame() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

  return (
    <>
      <Head>
        <title>HART | 원화(아트웍/게임)</title>
        <meta name="description" content="원화(아트웍/게임)" />
      </Head>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0 relative">
            <div className="hidden w-full wmd:block">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playsinline={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_game_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_game_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playsinline={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_game_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_game_bg.mp4"
              />
            </div>
            <TopText>
              <TopBtn className="block w-full wmd:hidden">
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_game_01.webp"
                alt="게임원화 과정소개 @GAME DRAWING
                컨셉아트의 기본부터 작품완성까지, 내가 그리는 게임, 주목받는 테크닉 트레이닝!! 게임컨셉아트를 이해하고 그에 따른 세계관 구성과 장르별 특성을 파악. 게임에 어울리는 컨셉을 설정하여 독창성있고 주목성있는 컨셉아트 완성을 목표로 진행되는 강좌입니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_game_01.webp"
                alt="게임원화 과정소개 @GAME DRAWING
                컨셉아트의 기본부터 작품완성까지, 내가 그리는 게임, 주목받는 테크닉 트레이닝!! 게임컨셉아트를 이해하고 그에 따른 세계관 구성과 장르별 특성을 파악. 게임에 어울리는 컨셉을 설정하여 독창성있고 주목성있는 컨셉아트 완성을 목표로 진행되는 강좌입니다."
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_game_02.webp"
              alt="Step .01 게임원화 이해 | 빛과 그림자 개념 이해 및 표현 입체표현 원리 이해 컨셉 조사 및 이미지 매칭 모작,
              Step .02 장르별 캐릭터 이해.01 | 소화 가능한 캐릭터 선택 및 파악 게임 장르별 캐릭터의 특성 이해 장르별 복식 이해 측면, 뒷면 묘사 모작,
              Step .03 장르별 캐릭터 이해.02 | 장르별 캐릭터 디테일 수정 및 표현기법 스킬업 학생 수준에 따른 배경추가 다각도에 따른 측면, 뒷면 세분화 묘사 모작,
              Step .04 레벨 디자인 | 레벨 디자인 이해 레벨 특성에 따른 캐릭터 의상 디테일 표현 의상 형태에 따른 레벨 특성 전달력 학습 창작,
              Step .05 컬러링.01 | 밝기에 따른 빛 표현 게임장르 특성에 따른 음영, 컬러링 표현기법 컬러 트레이싱 및 베리에이션 능력 향상 상세 컬러링 심화 창작,
              Step .06 장비 종류 이해.01 | 장비 종류에 따른 설정기법 학습 장비기능의 이해 창작,
              Step .07 컬러링.02 | 상세 양감 표현 다양한 생물구조에 따른 상세 양감표 창작,
              Step .08 장비 종류 이해.02 | 게임 밸런스 창작 장비 레벨에 따른 밸런스 묘사 창작 창작,
              Step .09 게임 컨셉 아트.01 | 컨셉아트 기획 배경 컨셉 설정 컨셉 특성 구체화,
              Step .10 게임 컨셉 아트.02 | 세부컨셉 구상 및 표현 컨셉아트 창작
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              장비의 사용원리 | 장비의 사용원리를 이해하고 스토리에 맞는 개성표현 능력을 기릅니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_game_03.webp"
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_game_02.webp"
              alt="Step .01 게임원화 이해 | 빛과 그림자 개념 이해 및 표현 입체표현 원리 이해 컨셉 조사 및 이미지 매칭 모작,
              Step .02 장르별 캐릭터 이해.01 | 소화 가능한 캐릭터 선택 및 파악 게임 장르별 캐릭터의 특성 이해 장르별 복식 이해 측면, 뒷면 묘사 모작,
              Step .03 장르별 캐릭터 이해.02 | 장르별 캐릭터 디테일 수정 및 표현기법 스킬업 학생 수준에 따른 배경추가 다각도에 따른 측면, 뒷면 세분화 묘사 모작,
              Step .04 레벨 디자인 | 레벨 디자인 이해 레벨 특성에 따른 캐릭터 의상 디테일 표현 의상 형태에 따른 레벨 특성 전달력 학습 창작,
              Step .05 컬러링.01 | 밝기에 따른 빛 표현 게임장르 특성에 따른 음영, 컬러링 표현기법 컬러 트레이싱 및 베리에이션 능력 향상 상세 컬러링 심화 창작,
              Step .06 장비 종류 이해.01 | 장비 종류에 따른 설정기법 학습 장비기능의 이해 창작,
              Step .07 컬러링.02 | 상세 양감 표현 다양한 생물구조에 따른 상세 양감표 창작,
              Step .08 장비 종류 이해.02 | 게임 밸런스 창작 장비 레벨에 따른 밸런스 묘사 창작 창작,
              Step .09 게임 컨셉 아트.01 | 컨셉아트 기획 배경 컨셉 설정 컨셉 특성 구체화,
              Step .10 게임 컨셉 아트.02 | 세부컨셉 구상 및 표현 컨셉아트 창작
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              장비의 사용원리 | 장비의 사용원리를 이해하고 스토리에 맞는 개성표현 능력을 기릅니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_game_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
      <section className="mt-[-10rem] pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
