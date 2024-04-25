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
export default function artworkEmoticon() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

  return (
    <>
      <Head>
        <title>HART | 이모티콘</title>
        <meta name="description" content="이모티콘" />
      </Head>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0 relative">
            <div className="hidden w-full wmd:block">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                playsinline={true}
                loop={true}
                playing={true}
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_emoticon_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/artwork_emoticon_bg.mp4"
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_emoticon_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/artwork_emoticon_bg.mp4"
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_emoticon_01.webp"
                alt="이모티콘 과정소개 @EMOTICON
                생동감 있는 감정표현으로 5주 만의 이모티콘 크리에이터 되기!! 이모티콘과 상관없는 비전공자도 캐릭터제작 실습을 통한 이모티콘을 승인 받을 수 있는 방법을 알려드립니다. 누구나 쉽고 재미있게 만드는 이모티콘 제작을 해보고 캐릭터를 만드는 방법부터 판매, 제안 까지 가능한 수업입니다. 내가 제작한 이모티콘 카카오톡에 제안!"
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_emoticon_01.webp"
                alt="이모티콘 과정소개 @EMOTICON
                생동감 있는 감정표현으로 5주 만의 이모티콘 크리에이터 되기!! 이모티콘과 상관없는 비전공자도 캐릭터제작 실습을 통한 이모티콘을 승인 받을 수 있는 방법을 알려드립니다. 누구나 쉽고 재미있게 만드는 이모티콘 제작을 해보고 캐릭터를 만드는 방법부터 판매, 제안 까지 가능한 수업입니다. 내가 제작한 이모티콘 카카오톡에 제안!"
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_emoticon_02.webp"
              alt="Step .01 이모티콘 제작의 이해 | 하드웨어 및 소프트웨어의 이해 (Tablet, Photoshop) 동시 작업을 위한 기초 작업과정 이해 이모티콘 제작에 사용되는 Tablet과 Photoshop을 사용하기 위한 환경설정과 활용예시 등을 통해 사용법과 기초 작업 틀을 구축합니다.,
              Step .02 이모티콘 제작 기획 | 이모티콘샵의 시장조사 / 표절과 창작의 이해 이모티콘 시장 트렌드를 이해하여 상업적인 이모티콘을 제작방향을 설정하며, 표절과 창작의 차이를 통해 나만의 이모티콘을 기획할 수 있습니다.,
              Step .03 이모티콘 캐릭터 제작 | 스케치 클린업 및 채색 / Phtoshop action을 활용한 빠르고 깔끔한 채색 기초 스케치와 깔끔하게 따는 클린업 작업의 개념을 이해하며 드로잉을 실습할 수 있고, Photoshop의 로봇기능이라 불리는 'action'을 활용하여 빠르고 정확하게 채색하는 방법을 배워 이모티콘 캐릭터를 제작할 수 있습니다.,
              Step .04 식자 및 감정 표현 | 다양한 폰트를 활용한 텍스트 표현 / 다양한 감정 표현과 이펙트 효과 무료로 사용할 수 있는 다양한 폰트를 활용하여 텍스트를 표현할 수 있는 방법과 캐릭터들에 생동감을 실어줄 수 있도록 상황에 맞는 감정표현방법, 이를 극대화 할 수 있는 이펙트 효과를 학습해 캐릭터의 감정표현을 극대화 할 수 있습니다.,
              Step .05 시뮬레이터를 통한 세부 보정 | 슬라이스로 이모티콘 분할 및 출력 / 이모티콘 스튜디오에 올려 보정 및 확인 장면별 각각의 이모티콘들을 분리해 출력하고 이모티콘 뷰어(시뮬레이터)를 통해 이미지와 폰트의 사이즈, 선 굵기, 가독성 등을 조절하여 카카오 이모티콘 스튜디오를 통해 확인하는 절차들을 학습할 수 있습니다.,
              Step .06 1:1 개인 피드백 통해 멈춰있는 이모티콘 완성 | 기획, 스케치, 클린업, 채색, 식자, 효과, 세부보정 단계 개별 실습 1:1 개인 피드백을 통해 각자의 개성 있는 이모티콘 완성 앞서 배운 내용을 기반으로 내가 직접 이모티콘을 제작합니다. 1:1 개인피드백을 통해 보통 3셋트 이상의 이모티콘을 제작해 볼 수 있습니다.,
              Step .07 애니메이션의 원리 이해 | 디즈니에서 애니메이터들에게 강조하는 애니메이션 원칙 간단한 애니메이션 실습(로켓발사) 애니메이션 원칙을 학습할 수 있으며 이를 응용해 재미있고 맛깔나는 애니메이션을 만들어 볼 수 있습니다.,
              Step .08 경제적인 애니메이션? | 경제적인 애니메이션이란 무엇인가? 펄쩍펄쩍 뛰는 캐릭터 제작 / 가속도 개념과 역가속도 개념에 대한 이해 생동감 있으면서도 효율적인, 힘의 분산을 잘 하는 '경제적인' 애니메이션에 대해 학습할 수 있습니다.,
              Step .09 효율적인 애니메이션 |Photoshop의 filter활용과 puppet warp 기능 활용 경제적이고 효율적인 작업을 위해 Photoshop의 puppet warp기능을 활용하여 부드러운 애니메이션을 만들어보고, Photoshop의 속도감을 내는 필터를 통해 더욱 더 강렬한 속도감을 표현할 수 있는 방법을 학습할 수 있습니다.,
              Step .10 Gif Cam을 활용한 애니메이션 | 동영상을 캡처하여 참고자료 및 애니메이션 만들기 Gif Cam을 활용해 동영상을 캡쳐하여 gif 파일을 만들고, 애니메이션을 재현하고 로토스코핑기법을 활용한 애니메이션 기법을 학습할 수 있습니다.,
              Step .11 이모티콘 크리에이터가 되기 위한 노하우 | 여러 플랫폼에 이식해보기 / 크리에이터 등록 및 이모티콘 제안 카카오톡, 라인, 오지큐, 모히톡 등 플랫폼마다 파일크기와 비율이 다르기 때문에 플랫폼별 특징을 이해하고 형식에 맞춰 이식하는 방법을 체험하고 이모티콘 승인을 위한 포인트 및 노하우를 배울 수 있습니다.
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              추천 대상 [ NO. 01 ] | 자유로운 시간을 활용해 본업에 지장 없이, 자본금 없이 부수입을 생각하고 계신 분
              추천 대상 [ NO. 02 ] | 이모티콘 제작에 대해 기초부터 이모티콘샵의 승인까지 제대로 배워보고 싶은 분
              추천 대상 [ NO. 03 ] | 아이디어는 있는데 어떻게 표현해야 하는지 방법을 몰라 고민이신 분
              추천 대상 [ NO. 04 ] | 그림을 못 그려도, 나만의 개성있는 이모티콘을 만들어 보고 싶은 분
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/artwork_emoticon_03.webp"
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_emoticon_02.webp"
              alt="Step .01 이모티콘 제작의 이해 | 하드웨어 및 소프트웨어의 이해 (Tablet, Photoshop) 동시 작업을 위한 기초 작업과정 이해 이모티콘 제작에 사용되는 Tablet과 Photoshop을 사용하기 위한 환경설정과 활용예시 등을 통해 사용법과 기초 작업 틀을 구축합니다.,
              Step .02 이모티콘 제작 기획 | 이모티콘샵의 시장조사 / 표절과 창작의 이해 이모티콘 시장 트렌드를 이해하여 상업적인 이모티콘을 제작방향을 설정하며, 표절과 창작의 차이를 통해 나만의 이모티콘을 기획할 수 있습니다.,
              Step .03 이모티콘 캐릭터 제작 | 스케치 클린업 및 채색 / Phtoshop action을 활용한 빠르고 깔끔한 채색 기초 스케치와 깔끔하게 따는 클린업 작업의 개념을 이해하며 드로잉을 실습할 수 있고, Photoshop의 로봇기능이라 불리는 'action'을 활용하여 빠르고 정확하게 채색하는 방법을 배워 이모티콘 캐릭터를 제작할 수 있습니다.,
              Step .04 식자 및 감정 표현 | 다양한 폰트를 활용한 텍스트 표현 / 다양한 감정 표현과 이펙트 효과 무료로 사용할 수 있는 다양한 폰트를 활용하여 텍스트를 표현할 수 있는 방법과 캐릭터들에 생동감을 실어줄 수 있도록 상황에 맞는 감정표현방법, 이를 극대화 할 수 있는 이펙트 효과를 학습해 캐릭터의 감정표현을 극대화 할 수 있습니다.,
              Step .05 시뮬레이터를 통한 세부 보정 | 슬라이스로 이모티콘 분할 및 출력 / 이모티콘 스튜디오에 올려 보정 및 확인 장면별 각각의 이모티콘들을 분리해 출력하고 이모티콘 뷰어(시뮬레이터)를 통해 이미지와 폰트의 사이즈, 선 굵기, 가독성 등을 조절하여 카카오 이모티콘 스튜디오를 통해 확인하는 절차들을 학습할 수 있습니다.,
              Step .06 1:1 개인 피드백 통해 멈춰있는 이모티콘 완성 | 기획, 스케치, 클린업, 채색, 식자, 효과, 세부보정 단계 개별 실습 1:1 개인 피드백을 통해 각자의 개성 있는 이모티콘 완성 앞서 배운 내용을 기반으로 내가 직접 이모티콘을 제작합니다. 1:1 개인피드백을 통해 보통 3셋트 이상의 이모티콘을 제작해 볼 수 있습니다.,
              Step .07 애니메이션의 원리 이해 | 디즈니에서 애니메이터들에게 강조하는 애니메이션 원칙 간단한 애니메이션 실습(로켓발사) 애니메이션 원칙을 학습할 수 있으며 이를 응용해 재미있고 맛깔나는 애니메이션을 만들어 볼 수 있습니다.,
              Step .08 경제적인 애니메이션? | 경제적인 애니메이션이란 무엇인가? 펄쩍펄쩍 뛰는 캐릭터 제작 / 가속도 개념과 역가속도 개념에 대한 이해 생동감 있으면서도 효율적인, 힘의 분산을 잘 하는 '경제적인' 애니메이션에 대해 학습할 수 있습니다.,
              Step .09 효율적인 애니메이션 |Photoshop의 filter활용과 puppet warp 기능 활용 경제적이고 효율적인 작업을 위해 Photoshop의 puppet warp기능을 활용하여 부드러운 애니메이션을 만들어보고, Photoshop의 속도감을 내는 필터를 통해 더욱 더 강렬한 속도감을 표현할 수 있는 방법을 학습할 수 있습니다.,
              Step .10 Gif Cam을 활용한 애니메이션 | 동영상을 캡처하여 참고자료 및 애니메이션 만들기 Gif Cam을 활용해 동영상을 캡쳐하여 gif 파일을 만들고, 애니메이션을 재현하고 로토스코핑기법을 활용한 애니메이션 기법을 학습할 수 있습니다.,
              Step .11 이모티콘 크리에이터가 되기 위한 노하우 | 여러 플랫폼에 이식해보기 / 크리에이터 등록 및 이모티콘 제안 카카오톡, 라인, 오지큐, 모히톡 등 플랫폼마다 파일크기와 비율이 다르기 때문에 플랫폼별 특징을 이해하고 형식에 맞춰 이식하는 방법을 체험하고 이모티콘 승인을 위한 포인트 및 노하우를 배울 수 있습니다.
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              추천 대상 [ NO. 01 ] | 자유로운 시간을 활용해 본업에 지장 없이, 자본금 없이 부수입을 생각하고 계신 분
              추천 대상 [ NO. 02 ] | 이모티콘 제작에 대해 기초부터 이모티콘샵의 승인까지 제대로 배워보고 싶은 분
              추천 대상 [ NO. 03 ] | 아이디어는 있는데 어떻게 표현해야 하는지 방법을 몰라 고민이신 분
              추천 대상 [ NO. 04 ] | 그림을 못 그려도, 나만의 개성있는 이모티콘을 만들어 보고 싶은 분
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/artwork_emoticon_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
      <section className="mt-[-13rem] pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
