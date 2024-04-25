import Form from '@/components/Form'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
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
export default function motiongraphicAfterEffect() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
  return (
    <>
      <Head>
        <title>HART | 2D모션그래픽</title>
        <meta name="description" content="2D모션그래픽" />
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/motion_ae_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/motion_ae_bg.mp4"
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
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/motion_ae_poster.webp"
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/motion_ae_bg.mp4"
              />
            </div>
            <TopText>
              <TopBtn>
                <Link href="/motiongraphic">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_top_btn01.webp"
                    alt="영상편집"
                  />
                </Link>
                <Link href="/motiongraphic/afterEffect">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_top_btn02.webp"
                    alt="2D모션그래픽"
                  />
                </Link>
                <Link href="/motiongraphic/cinema">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_top_btn03.webp"
                    alt="3D모션그래픽"
                  />
                </Link>
              </TopBtn>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_ae_01.webp"
                alt="에프터이펙트 과정소개 @AFTER EFFECT
                모션그래픽 영상제작의 표준!! 에프터 이펙트의 기초부터 활용까지!! 화려한 영상미로 시선을 사로잡는 모션그래픽?? 현업에서 가장 핫한 에프터이펙트의 사용 기법으로 탄탄 기초부터, 화려한 영상제작까지 배우는 수업입니다.
                관련자격증#ACE"
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_ae_01.webp"
                alt="에프터이펙트 과정소개 @AFTER EFFECT
                모션그래픽 영상제작의 표준!! 에프터 이펙트의 기초부터 활용까지!! 화려한 영상미로 시선을 사로잡는 모션그래픽?? 현업에서 가장 핫한 에프터이펙트의 사용 기법으로 탄탄 기초부터, 화려한 영상제작까지 배우는 수업입니다.
                관련자격증#ACE"
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
                <Link href="/motiongraphic">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn01.webp"
                    alt="영상편집"
                  />
                </Link>
                <Link href="/motiongraphic/afterEffect">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn02.webp"
                    alt="2D모션그래픽"
                  />
                </Link>
                <Link href="/motiongraphic/cinema">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn03.webp"
                    alt="3D모션그래픽"
                  />
                </Link>
              </Btns>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco.webp" /> */}
            </PCTopbtn>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_ae_02.webp"
              alt="Step .01 인터페이스의 이해, 기본 조작 연습 Mask와 Shape Layer의 이해와 기초 | 컴포지션(작업창) 옵션들의 이해 기본 단축키 숙지와 연습 컴포지션(작업창) 옵션들의 이해 기본 단축키 숙지와 연습,
              Step .02 Matte의 이해와 활용 Parent와 Puppet tool |번짐 영상소스를 활용한 장면전환 효과 연출 캐릭터 소스의 관절을 연결한 애니메이션 제작,
              Step .03 3d Layer의 이해와 활용 카메라 레이어 기초 | 나비의 날개 짓 만들기 Solid Layer를 이용한 큐브 제작 카메라의 기본 조작 연습 Depth Of Field 옵션 활용,
              Step .04 Null 카메라 기법과 라이트의 이해 편집의 이해 | 카메라를 Null Layer에 연결 및 화면 내 위치 이동 및 제어 프리미어 프로그램의 기본 조작 연습 편집 기법에 기초한 영상제작,
              Step .05 크로마키와 트래킹 키프레임의 그래프 곡선 조절 | Keylight효과를 이용한 크로마키 작업 Tracker 기능을 활용한 영상 합성, Speed Graph 조절을 통한 부드럽고 속도감 있는 애니메이션 제작,
              Step .06 노트북 영상 합성 글리치 이펙트 만들기 | 노트북 화면의 그린스크린 제거 및 직접 만든 화면 합성 오류, 고장 난 느낌의 모션제작,
              Step .07 Trapcode Particular 영화 엔딩시퀀스 만들기 | Particular 플러그인을 활용한 특수효과 만들기 간단한 영상 편집과 화면 디자인 작업하기,
              Step .08 Video Copilot Trapcode Mir | Saber 플러그인을 활용한 특수효과 제작 Mir 플러그인을 활용한 다양한 배경 영상 제작,
              Step .09 Rowbyte Plexus 일러스트 애니메이션 | Plexus 플러그인과 3D 모델을 활용한 배경 영상 제작 Shaper Layer를 활용한 일러스트와 모션 제작,
              Step .10 드로잉 애니메이션 키네틱 타이포그래피 | 로토스코핑 기법을 활용한 간단한 손 그림 애니메이션 제작 노래에 맞춰 가사가 등장하는 타이포 영상 만들기,
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              용어 이해 | 보다 원활한 이해를 위해 컴포지션, 프레임 등. 영상편집에 사용되는 기초 용어개념부터 탄탄히 교육을 진행 합니다.
              감각적 모션연출 / 플러그인의 활용 | 그래프 기능의 이해와 활용을 통해, 보다 감각적이고 생동감 넘치는 모션을 제작 및 기초적인 기능들과 이펙트를 기반으로 응용하는 방안과 노하우를 교육합니다.
              1:1 개별질문 & 피드백 | 현장에서 직접 모니터를 마주하며 문제해결 및 질의응답을 통한 실시간 피드백을 지원합니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_ae_03.webp"
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
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_ae_02.webp"
              alt="Step .01 인터페이스의 이해, 기본 조작 연습 Mask와 Shape Layer의 이해와 기초 | 컴포지션(작업창) 옵션들의 이해 기본 단축키 숙지와 연습 컴포지션(작업창) 옵션들의 이해 기본 단축키 숙지와 연습,
              Step .02 Matte의 이해와 활용 Parent와 Puppet tool |번짐 영상소스를 활용한 장면전환 효과 연출 캐릭터 소스의 관절을 연결한 애니메이션 제작,
              Step .03 3d Layer의 이해와 활용 카메라 레이어 기초 | 나비의 날개 짓 만들기 Solid Layer를 이용한 큐브 제작 카메라의 기본 조작 연습 Depth Of Field 옵션 활용,
              Step .04 Null 카메라 기법과 라이트의 이해 편집의 이해 | 카메라를 Null Layer에 연결 및 화면 내 위치 이동 및 제어 프리미어 프로그램의 기본 조작 연습 편집 기법에 기초한 영상제작,
              Step .05 크로마키와 트래킹 키프레임의 그래프 곡선 조절 | Keylight효과를 이용한 크로마키 작업 Tracker 기능을 활용한 영상 합성, Speed Graph 조절을 통한 부드럽고 속도감 있는 애니메이션 제작,
              Step .06 노트북 영상 합성 글리치 이펙트 만들기 | 노트북 화면의 그린스크린 제거 및 직접 만든 화면 합성 오류, 고장 난 느낌의 모션제작,
              Step .07 Trapcode Particular 영화 엔딩시퀀스 만들기 | Particular 플러그인을 활용한 특수효과 만들기 간단한 영상 편집과 화면 디자인 작업하기,
              Step .08 Video Copilot Trapcode Mir | Saber 플러그인을 활용한 특수효과 제작 Mir 플러그인을 활용한 다양한 배경 영상 제작,
              Step .09 Rowbyte Plexus 일러스트 애니메이션 | Plexus 플러그인과 3D 모델을 활용한 배경 영상 제작 Shaper Layer를 활용한 일러스트와 모션 제작,
              Step .10 드로잉 애니메이션 키네틱 타이포그래피 | 로토스코핑 기법을 활용한 간단한 손 그림 애니메이션 제작 노래에 맞춰 가사가 등장하는 타이포 영상 만들기,
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              용어 이해 | 보다 원활한 이해를 위해 컴포지션, 프레임 등. 영상편집에 사용되는 기초 용어개념부터 탄탄히 교육을 진행 합니다.
              감각적 모션연출 / 플러그인의 활용 | 그래프 기능의 이해와 활용을 통해, 보다 감각적이고 생동감 넘치는 모션을 제작 및 기초적인 기능들과 이펙트를 기반으로 응용하는 방안과 노하우를 교육합니다.
              1:1 개별질문 & 피드백 | 현장에서 직접 모니터를 마주하며 문제해결 및 질의응답을 통한 실시간 피드백을 지원합니다.
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_ae_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </MoCon>
        </div>
      </section>
      <section className="mt-[-3rem] pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
