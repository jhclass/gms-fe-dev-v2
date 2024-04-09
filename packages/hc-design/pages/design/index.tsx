import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, lazy } from 'react'
import styled from 'styled-components'

const TopText = styled.p`
  position: absolute;
  top: 0;
  left: 0;
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
export default function designPhotoshop() {
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
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/design_photoshop_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/design_photoshop_bg.mp4"
              />
            </div>
            <TopText>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_photoshop_01.webp"
                alt="포토샵 과정소개 @PHOTOSHOP
                포토샵 교육의 차별화, 전문적인 합성, 디테일한 보정. 실무자도 모르는 표현기법을 속성으로!! 포토샵 프로그램을 활용하여 지면광고 디자인, 전문적인 합성을 통한 디지털아트웍, 세부적인 색감보정을 통해 디자인의 완성도를 극대화 하는 수업입니다.
                관련자격증 #컴퓨터그래픽스운용기능사 #GTQ 포토샵 #ACP(구 ACA)/ ACE"
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_photoshop_01.webp"
                alt="포토샵 과정소개 @PHOTOSHOP
                포토샵 교육의 차별화, 전문적인 합성, 디테일한 보정. 실무자도 모르는 표현기법을 속성으로!! 포토샵 프로그램을 활용하여 지면광고 디자인, 전문적인 합성을 통한 디지털아트웍, 세부적인 색감보정을 통해 디자인의 완성도를 극대화 하는 수업입니다.
                관련자격증 #컴퓨터그래픽스운용기능사 #GTQ 포토샵 #ACP(구 ACA)/ ACE"
                className="block w-full wmd:hidden"
              ></img>
            </TopText>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_photoshop_02.webp"
              alt="Step .01 기초그래픽의 이해 브러시 / 성형 / 타이포 | 포토샵의 기본활용 방향 제시. 인터페이스 둘러보기 선택도구의 사용법 및 활용 / 컨텐트어웨어 / 퍼펫웝 사용 및 활용 브러시 활용 / 힐링브러시, 레드아이 툴 이해 리퀴파이를 사용한 올바른 성형 / 타이포 표현 및 필터활용 레이어스타일을 활용한 심볼제작,
              Step .02 이미지 보정 / 합성 블렌딩모드의 이해 / 합성 | 타이포의 변형 및 활용 / 패스의 이해 필터를 활용한 백그라운드 제작 / 스마트오브젝트 이해 블렌딩모드의 이해 / 보정도구(색상보정)의 이해 / HDR보정 블렌딩모드를 활용한 합성 작업 / 필 값을 활용한 레이어스타일 적용 마스크 활용 / 기본 아트웍 제작,
              Step .03 디스플레이스, 빛 표현의 이해 포스터에 적합한 컬러보정 | 광고 기본 레이아웃 / 진출, 후퇴색 표현, 시각 유도 표현법 디스플레이스 필터를 활용한 왜곡 표현법 / 원근감에 따른 하이라이트 지정법 레이어스타일을 접목한 빛 표현 / 기본구도 및 인물배치와 로고 정렬 컬러 발란스 활용 / 쉐도우, 미드톤에 맞는 색배합 / 음영에 따른 합성방법,
              Step .04 인물 리터칭 심화 컨셉디자인 | 피부톤 단계별 표현 / 이미지 밝기에 따른 소프트닝 표현 얼굴형태에 따른 하이라이트 적용법 / 샤프닝 적용법 셀렉티브 컬러 적용법 / 인물느낌(사진)에 따른 리터칭 표현법 리터칭을 활용한 몽환적 아트웍 표현,
              Step .05 노출광 계산 및 표현 | 노출광(역광) 계산법에 따른 화이트밸런스 조절 음영값 조절 및 하이트라이트 중간톤 표현그림자 표현 및 역광 적용법 / 아트웍 용도의 파이널 리터칭.01,
              Step .06 질감제작 형태 왜곡 및 리터칭용 | 자연광 색 보정 / 라이팅 이펙트 응용 / 레이어스타일을 활용한 질감제작 구도파악 및 이음새 연결 합성법 / 리퀴파이 및 웝을 활용한 형태 왜곡 빛 계산 및 색상보정 최종점검 / 아트웍 용도 파이널 리터칭.02
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              비트맵 그래픽 | 비트맵의 특성을 이해하고 원리부터 실용까지 자세한 설명과 실습을 통해 창의적인 그래픽 표현능력을 배웁니다.
              실무 포토샵 활용 | 실무에서는 어떤 방법으로 포토샵이 활용되는지 그 기본적인 내용을 이해합니다.
              실무능력 | 각종 예제, 과제, 그래픽이미지 제작 경험을 통해 실무에 즉시 투입될 수 있는 실무능력을 배양합니다.
              디자인 능력 | 모션그래픽, CG, Webtoon, 웹 등 통합적인 분야를 소화할 수 있는 디자인 능력을 함양합니다.
              "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_photoshop_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/design_photoshop_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_photoshop_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_photoshop_02.webp"
              alt="Step .01 기초그래픽의 이해 브러시 / 성형 / 타이포 | 포토샵의 기본활용 방향 제시. 인터페이스 둘러보기 선택도구의 사용법 및 활용 / 컨텐트어웨어 / 퍼펫웝 사용 및 활용 브러시 활용 / 힐링브러시, 레드아이 툴 이해 리퀴파이를 사용한 올바른 성형 / 타이포 표현 및 필터활용 레이어스타일을 활용한 심볼제작,
              Step .02 이미지 보정 / 합성 블렌딩모드의 이해 / 합성 | 타이포의 변형 및 활용 / 패스의 이해 필터를 활용한 백그라운드 제작 / 스마트오브젝트 이해 블렌딩모드의 이해 / 보정도구(색상보정)의 이해 / HDR보정 블렌딩모드를 활용한 합성 작업 / 필 값을 활용한 레이어스타일 적용 마스크 활용 / 기본 아트웍 제작,
              Step .03 디스플레이스, 빛 표현의 이해 포스터에 적합한 컬러보정 | 광고 기본 레이아웃 / 진출, 후퇴색 표현, 시각 유도 표현법 디스플레이스 필터를 활용한 왜곡 표현법 / 원근감에 따른 하이라이트 지정법 레이어스타일을 접목한 빛 표현 / 기본구도 및 인물배치와 로고 정렬 컬러 발란스 활용 / 쉐도우, 미드톤에 맞는 색배합 / 음영에 따른 합성방법,
              Step .04 인물 리터칭 심화 컨셉디자인 | 피부톤 단계별 표현 / 이미지 밝기에 따른 소프트닝 표현 얼굴형태에 따른 하이라이트 적용법 / 샤프닝 적용법 셀렉티브 컬러 적용법 / 인물느낌(사진)에 따른 리터칭 표현법 리터칭을 활용한 몽환적 아트웍 표현,
              Step .05 노출광 계산 및 표현 | 노출광(역광) 계산법에 따른 화이트밸런스 조절 음영값 조절 및 하이트라이트 중간톤 표현그림자 표현 및 역광 적용법 / 아트웍 용도의 파이널 리터칭.01,
              Step .06 질감제작 형태 왜곡 및 리터칭용 | 자연광 색 보정 / 라이팅 이펙트 응용 / 레이어스타일을 활용한 질감제작 구도파악 및 이음새 연결 합성법 / 리퀴파이 및 웝을 활용한 형태 왜곡 빛 계산 및 색상보정 최종점검 / 아트웍 용도 파이널 리터칭.02
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              비트맵 그래픽 | 비트맵의 특성을 이해하고 원리부터 실용까지 자세한 설명과 실습을 통해 창의적인 그래픽 표현능력을 배웁니다.
              실무 포토샵 활용 | 실무에서는 어떤 방법으로 포토샵이 활용되는지 그 기본적인 내용을 이해합니다.
              실무능력 | 각종 예제, 과제, 그래픽이미지 제작 경험을 통해 실무에 즉시 투입될 수 있는 실무능력을 배양합니다.
              디자인 능력 | 모션그래픽, CG, Webtoon, 웹 등 통합적인 분야를 소화할 수 있는 디자인 능력을 함양합니다.
              "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_photoshop_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/design_photoshop_03.webp"
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
