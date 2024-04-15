import dynamic from 'next/dynamic'
import Link from 'next/link'
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
export default function motiongraphicAfterEffect() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
  return (
    <>
      <section>
        <div>
          <div className="max-w-[2000px] mx-auto my-0 relative">
            <div className="hidden w-full wmd:block">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_premiere_01.webp"
                alt="프리미어 과정소개 @Premiere Pro 영상 편집의 바이블, 프리미어 프로를 활용해 나만의 영상 만들기!! 날이 갈수록 점점 늘어나는 1인 크리에이터의 시대! 영상 편집에 가장 많이 사용되는 프로그램인 프리미어 프로를 A부터 Z까지 모두 가르쳐드리며 크리에이터로서 영상을 만들 수 있는 기초를 다지는 수업입니다."
              ></img>
            </div>
            <div className="block w-full wmd:hidden">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_premiere_01.png"
                alt="프리미어 과정소개 @Premiere Pro 영상 편집의 바이블, 프리미어 프로를 활용해 나만의 영상 만들기!! 날이 갈수록 점점 늘어나는 1인 크리에이터의 시대! 영상 편집에 가장 많이 사용되는 프로그램인 프리미어 프로를 A부터 Z까지 모두 가르쳐드리며 크리에이터로서 영상을 만들 수 있는 기초를 다지는 수업입니다."
              ></img>
            </div>

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
              <Link href="/artmotiongraphicwork/cinema">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_top_btn03.webp"
                  alt="3D모션그래픽"
                />
              </Link>
            </TopBtn>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="relative hidden w-full wmd:block">
            <PCTopbtn>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco_s.webp" /> */}
              <Btns>
                <Link href="/artwork">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn01.webp"
                    alt="영상편집"
                  />
                </Link>
                <Link href="/artwork/game">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn02.webp"
                    alt="2D모션그래픽"
                  />
                </Link>
                <Link href="/artwork/emoticon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_top_btn03.webp"
                    alt="3D모션그래픽"
                  />
                </Link>
              </Btns>
              {/* <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/detail_deco.webp" /> */}
            </PCTopbtn>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_premiere_02.webp"
              alt="Step .01 프리미어 프로 UI 이해 및 활용 | 프리미어 프로 UI 기초 설명과 용어 정리 Sequence와 frame rate 등, 영상 설정에 대한 기본적인 이해
              Step .02 편집 기초 |자르기 툴과 잔물결 제거를 통한 효율적인 컷 작업 트랜지션의 기초와 기본적인 이론 설명
              Step .03 Title | Legacy Title을 활용한 실제 TV예능같은 자막 만들기
              Step .04 Vrew | 인공지능 기술인 딥러닝과 자막 작업의 연관성 국내 회사에서 개발한 자동 자막 제작 프로그램 VREW 소개
              Step .05 Key frame, Preset | Key frame을 활용해  단조롭지 않은 영상 만들기 직접 만든 이펙트를 Preset으로 저장하여 작업시간 단축하기
              Step .06 Chroma Key | Chroma Key로 제작된 소스의 기초 이해 Color key, Ultra Key 등의 기본 이펙트 활용하기
              Step .07 Color Correcting, Color Grading | Color Correcting, Color Grading의 개념과 차이점 이해 Lumetri Scope를 활용해 간단한 Color Grading 해보기
              Step .08 After Effect와 연동 | After Effect의 인터페이스 기초 After Effect에서 Expression 및 Effects를 활용해보기

              에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              UI 이해 및 활용 | 프리미어 프로 UI 기초 설명을 통하여 영상디자인으로의 기본적인 영상설정을 학습 합니다.
              연출방식 | 영상제작을 위한 컷편집, 음악편집, 색보정부터 자막까지 프리미어프로를 통한 이펙트 있는 영상편집을 배웁니다.
              고급이펙트 | After Effect와 연동을 통한 영상을 제작할수 있는 능력을 함양합니다.
            "
              className="hidden w-full wmd:block"
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_ae_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/motion_premiere_03.webp"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
              현업 디자이너 중심의 전문강사진 운영 | 기획이 반영된 포트폴리오 &개인별 맞춤 취업지원 | 디자이너 실무자를 초청한 트렌드 파악시간 제공 | 포트폴리오 제작을 위한 쾌적한 환경제공
              수강신청 절차 @ 컨설팅 전문가들의 개인면담을 통해, 개인의 실력에 맞춘 전문교육을 진행합니다.
              01 전화. 온라인 정보조회 | 홈페이지를 통해 정보확인 후, 전화, 온라인을 통한 간편조회. 과정별 담당자 매칭
              02 방문 후 상담진행 | 상담일정 조율 후, 매칭된 과정 담당자를 통한 상담 진행
              03 수강등록 | 수강등록을 위한 원서 작성 후, 입학기간 내 수강료 결제 
              04 취업 및 진로상담 | 교육과정 수강 중 일차별 피드백과 직종에 따른 회사 선택 및 취업지원 진행"
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_ae_deco.webp"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_premiere_02.png"
              alt="프리미어 과정소개 @Premiere Pro 영상 편집의 바이블, 프리미어 프로를 활용해 나만의 영상 만들기!! 날이 갈수록 점점 늘어나는 1인 크리에이터의 시대! 영상 편집에 가장 많이 사용되는 프로그램인 프리미어 프로를 A부터 Z까지 모두 가르쳐드리며 크리에이터로서 영상을 만들 수 있는 기초를 다지는 수업입니다.
              Step .01 프리미어 프로 UI 이해 및 활용 | 프리미어 프로 UI 기초 설명과 용어 정리 Sequence와 frame rate 등, 영상 설정에 대한 기본적인 이해
              Step .02 편집 기초 |자르기 툴과 잔물결 제거를 통한 효율적인 컷 작업 트랜지션의 기초와 기본적인 이론 설명
              Step .03 Title | Legacy Title을 활용한 실제 TV예능같은 자막 만들기
              Step .04 Vrew | 인공지능 기술인 딥러닝과 자막 작업의 연관성 국내 회사에서 개발한 자동 자막 제작 프로그램 VREW 소개
              Step .05 Key frame, Preset | Key frame을 활용해  단조롭지 않은 영상 만들기 직접 만든 이펙트를 Preset으로 저장하여 작업시간 단축하기
              Step .06 Chroma Key | Chroma Key로 제작된 소스의 기초 이해 Color key, Ultra Key 등의 기본 이펙트 활용하기
              Step .07 Color Correcting, Color Grading | Color Correcting, Color Grading의 개념과 차이점 이해 Lumetri Scope를 활용해 간단한 Color Grading 해보기
              Step .08 After Effect와 연동 | After Effect의 인터페이스 기초 After Effect에서 Expression 및 Effects를 활용해보기

              에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              UI 이해 및 활용 | 프리미어 프로 UI 기초 설명을 통하여 영상디자인으로의 기본적인 영상설정을 학습 합니다.
              연출방식 | 영상제작을 위한 컷편집, 음악편집, 색보정부터 자막까지 프리미어프로를 통한 이펙트 있는 영상편집을 배웁니다.
              고급이펙트 | After Effect와 연동을 통한 영상을 제작할수 있는 능력을 함양합니다.
              "
              className="block w-full wmd:hidden"
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_ae_btn.webp"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/motion_premiere_03.png"
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
