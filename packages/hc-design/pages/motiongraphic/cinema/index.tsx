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
export default function motiongraphicChinema4D() {
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
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/motion_cinema_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/motion_cinema_bg.mp4"
              />
            </div>
            <TopText>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_cinema_01.png"
                alt="시네마 포디 과정소개 @CINEMA 4D
              모션그래픽 콘셉트에 부합하는 모델링, 맵핑, 라이팅, 키프레임과 충돌 태그 및 모그라프, 패브릭, 깃털, 연기 등. 다양한 사물과의 합성을 통해 작품완성까지!! 시포디의 기초사용법과 활용방법을 교육. 
              시포디의 시뮬레이션 기능을 이해하고 간단한 애니메이션부터 단계별 레슨을 통해, 자연스러운 움직임과 리얼한 재질표현을 위해 다양한 기능들을 학습하는 수업입니다.
              사실적 질감 묘사 및 다양한 사물과의 영상합성을 통해, 시네마포디를 사용한 최종결과물을 제작하게됩니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_cinema_01.png"
                alt="시네마 포디 과정소개 @CINEMA 4D
              모션그래픽 콘셉트에 부합하는 모델링, 맵핑, 라이팅, 키프레임과 충돌 태그 및 모그라프, 패브릭, 깃털, 연기 등. 다양한 사물과의 합성을 통해 작품완성까지!! 시포디의 기초사용법과 활용방법을 교육. 
              시포디의 시뮬레이션 기능을 이해하고 간단한 애니메이션부터 단계별 레슨을 통해, 자연스러운 움직임과 리얼한 재질표현을 위해 다양한 기능들을 학습하는 수업입니다.
              사실적 질감 묘사 및 다양한 사물과의 영상합성을 통해, 시네마포디를 사용한 최종결과물을 제작하게됩니다."
                className="block w-full wmd:hidden"
              ></img>
            </TopText>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_cinema_02.png"
              alt="Step .01 기초 UI활용 Modeling | 시포디 인터페이스의 이해 모션그래픽 및 영상제작 파이프라인 소개, 툴 설명 Nerbs 및 Spline 활용한 모델링 기초 모델링의 기본 이해, 제품디자인 ( Line/ Round/ Shape ),
              Step .02 Modeling, Mapping Animation | 모델링의 활용 / 스컬핑 방식의 이해 / 에프터이펙트와 Cinema4D의 호환 씬세팅을 위한 기본적인 이해 Camera/ Light/ 각각의 쉐이더에 대한 이해 UV에 대한 이해와 UV layout을 활용한 UV맵 정리,
              Step .03 Animation 심화과정 01 (Hair. Cloth. Mograph) | Hair/ Cloth를 활용한 깃털, 민들레, 천, 깃발 제작 및 애니메이션 X-Particle소개 Mograph를 활용한 Animation-1 Mograph를 활용한 Animation-2,
              Step .04 Animation 심화과정 02 (Dynamic 활용) | Dynamic을 활용한 시뮬레이션 Bake를 활용한 Slow Animation IK Rigging을 활용한 상어 및 새날개 애니메이션,
              Step .05 Character 제작 01 (Rigging) | Character Modeling Character Texture Character Rigging-1/2 Character Animation,
              Step .06 Character 제작 02 (Particle) | Render에 대한 이해 Sketch and Toon을 활용한 랜더링 합성에 대한 이해 최종 랜더 및 합성 과정의 이해,
              Step .07 Cloner | Cloner Object를 활용한 복제기능을 학습 각 이펙터들을 활용한 모션그래픽의 표현을 학습 Plain. Step. Shader. Spline Effector의 활용방법,
              Step .08 Mograph와 Dynamic 활용 | MoGraph와 Dynamic 활용한 효과 Sound Effector를 사용한 음악에 반응하는 Animation 다양한 MoGraph Effector를 활용한 표현, 
              Step .09 Xpresso이해 및 활용 Effectos | XPresso Thingking Particle을 통한 표현의 확장 Multi Pass 랜더링과 3D 트래킹 기법 및 합성 / 에프터 이팩트와의 연동법 포트폴리오 기획 - 기획방법을 이해하고 모작을 통한 작품 워킹 프로세스 이해하기,
              Step .10 연출기획 기획안 작성 | 연출기획 및 제작방식의 이해 컨셉도출 및 프로젝트 스케쥴 작성 모델링 기획 및 제작방식의 이해 독립적 작품 기획안 제작,
              Step .11 개인레슨 제작완료 | 작품 시뮬레이션 및 피드백 최종 수정 및 보완 영상시연 및 프리젠테이션
              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              빠른이해 / 모델링 표현 | 시포디의 인터페이스 및 기본 사용법을 습득. 완성되어진 모델링 예제를 바탕으로, 선(라인)표현의 이해와 응용을 배웁니다.
              사물의 모션제어 / 모그라프의 이해 | 애니메이션의 기본기를 체계적으로 배우고, 모그라프의 특성을 이해 및 활용하며 움직임과 파괴 및 변형의 제어기술을 습득합니다.
              패브릭(천), 털, 연기 표현 / 리깅 | 실제와 같은 주름 및 부드러운 촉감을 묘사. 조인트 및 믹사모를 활용한 리깅방법을 익히며, 쉽고 간편하게 표현하는 스킬을 습득.
              영상 합성 / 연출컨셉 기획 및 피드백 | 3D와 2D오브젝트를 합성하며, 에펙을 연동. 연출을 독립적으로 기획 후, 강사의 1:1 피드백을 통해 연출능력을 향상합니다.
            "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_cinema_btn.png"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_cinema_03.png"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_cinema_deco.png"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_cinema_02.png"
              alt="Step .01 기초 UI활용 Modeling | 시포디 인터페이스의 이해 모션그래픽 및 영상제작 파이프라인 소개, 툴 설명 Nerbs 및 Spline 활용한 모델링 기초 모델링의 기본 이해, 제품디자인 ( Line/ Round/ Shape ),
            Step .02 Modeling, Mapping Animation | 모델링의 활용 / 스컬핑 방식의 이해 / 에프터이펙트와 Cinema4D의 호환 씬세팅을 위한 기본적인 이해 Camera/ Light/ 각각의 쉐이더에 대한 이해 UV에 대한 이해와 UV layout을 활용한 UV맵 정리,
            Step .03 Animation 심화과정 01 (Hair. Cloth. Mograph) | Hair/ Cloth를 활용한 깃털, 민들레, 천, 깃발 제작 및 애니메이션 X-Particle소개 Mograph를 활용한 Animation-1 Mograph를 활용한 Animation-2,
            Step .04 Animation 심화과정 02 (Dynamic 활용) | Dynamic을 활용한 시뮬레이션 Bake를 활용한 Slow Animation IK Rigging을 활용한 상어 및 새날개 애니메이션,
            Step .05 Character 제작 01 (Rigging) | Character Modeling Character Texture Character Rigging-1/2 Character Animation,
            Step .06 Character 제작 02 (Particle) | Render에 대한 이해 Sketch and Toon을 활용한 랜더링 합성에 대한 이해 최종 랜더 및 합성 과정의 이해,
            Step .07 Cloner | Cloner Object를 활용한 복제기능을 학습 각 이펙터들을 활용한 모션그래픽의 표현을 학습 Plain. Step. Shader. Spline Effector의 활용방법,
            Step .08 Mograph와 Dynamic 활용 | MoGraph와 Dynamic 활용한 효과 Sound Effector를 사용한 음악에 반응하는 Animation 다양한 MoGraph Effector를 활용한 표현, 
            Step .09 Xpresso이해 및 활용 Effectos | XPresso Thingking Particle을 통한 표현의 확장 Multi Pass 랜더링과 3D 트래킹 기법 및 합성 / 에프터 이팩트와의 연동법 포트폴리오 기획 - 기획방법을 이해하고 모작을 통한 작품 워킹 프로세스 이해하기,
            Step .10 연출기획 기획안 작성 | 연출기획 및 제작방식의 이해 컨셉도출 및 프로젝트 스케쥴 작성 모델링 기획 및 제작방식의 이해 독립적 작품 기획안 제작,
            Step .11 개인레슨 제작완료 | 작품 시뮬레이션 및 피드백 최종 수정 및 보완 영상시연 및 프리젠테이션
            CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
            빠른이해 / 모델링 표현 | 시포디의 인터페이스 및 기본 사용법을 습득. 완성되어진 모델링 예제를 바탕으로, 선(라인)표현의 이해와 응용을 배웁니다.
            사물의 모션제어 / 모그라프의 이해 | 애니메이션의 기본기를 체계적으로 배우고, 모그라프의 특성을 이해 및 활용하며 움직임과 파괴 및 변형의 제어기술을 습득합니다.
            패브릭(천), 털, 연기 표현 / 리깅 | 실제와 같은 주름 및 부드러운 촉감을 묘사. 조인트 및 믹사모를 활용한 리깅방법을 익히며, 쉽고 간편하게 표현하는 스킬을 습득.
            영상 합성 / 연출컨셉 기획 및 피드백 | 3D와 2D오브젝트를 합성하며, 에펙을 연동. 연출을 독립적으로 기획 후, 강사의 1:1 피드백을 통해 연출능력을 향상합니다.
          "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_cinema_btn.png"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_cinema_03.png"
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
