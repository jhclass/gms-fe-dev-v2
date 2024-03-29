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
export default function webtoonProduction() {
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
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/webtoon_production_bg.mp4"
              />
            </div>
            <div className="block w-full wmd:hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                muted={true}
                loop={true}
                playing={true}
                url="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/video/mo/webtoon_production_bg.mp4"
              />
            </div>
            <TopText>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_production_01.png"
                alt="웹툰 연출/각색 과정소개 @webtoon dramatization
                    매끄러운 스토리 구성을 위한 기획부터 콘티 연출과 각색까지! 풍부한 전달력 및 웹툰 연출 TIP! 노하우!
                    웹툰작가 시점의 기본과 대중적인 스토리를 위한 기획방식을 이해하고 좋은 이야기를 구성하기 위한 스토리텔링 방식을 개인에 스타일에 접목시켜 나만의 스토리 연축을 습득합니다. 또한, 퍼포먼스를 더하기 위한 다양한 상황별 각색 ‘TIP’을 경험하고 웹툰 전체의 중요한 신호탄이 될 수 있는 작가 선생님만의 연축/각색 노하우를 습득합니다."
                className="hidden w-full wmd:block"
              ></img>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_production_01.png"
                alt="웹툰 연출/각색 과정소개 @webtoon dramatization
                    매끄러운 스토리 구성을 위한 기획부터 콘티 연출과 각색까지! 풍부한 전달력 및 웹툰 연출 TIP! 노하우!
                    웹툰작가 시점의 기본과 대중적인 스토리를 위한 기획방식을 이해하고 좋은 이야기를 구성하기 위한 스토리텔링 방식을 개인에 스타일에 접목시켜 나만의 스토리 연축을 습득합니다. 또한, 퍼포먼스를 더하기 위한 다양한 상황별 각색 ‘TIP’을 경험하고 웹툰 전체의 중요한 신호탄이 될 수 있는 작가 선생님만의 연축/각색 노하우를 습득합니다."
                className="block w-full wmd:hidden"
              ></img>
            </TopText>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_production_02.png"
              alt="Step .01 스토리 구성방식 | 스토리텔링을 위한 기획 및 스토리보딩 신속한 기획을 위한 플롯과 트리트먼트 적용 가상의 세계관 스토리 구성 시작하기 구성된 글과 스토리 바탕의 자료수집하기 스토리보드 제작하기,
              Step .02 연출 기획하기 | 장편, 단편 연재 및 목표 일정 계획하기 준비 된 스토리보드를 한줄 요약 및 요소 정하기 - 상징, 반전, 복선, 환상적인 캐릭터, 코믹한 캐릭터 등등,
              Step .03 스토리 각색 및 콘티 .01 | 스토리 각색 요소 점검 및 콘티 작성 장면 각색 및 기본 콘티 완성하기 웹툰연재 1~3화 승부수 표현을 위한 상징적인 각색 각색한 내용에 맞춰 기본콘티 완성, 
              Step .04 스토리 각색 및 콘티 .02 | 웹툰으로 발전하기 위한 각색한 글, 그림 콘티 다듬기 각 장면의 그림 박스 간격 및 공간 활용하기 다양한 콘티 습작을 통한 작화 진행 및 연출,
              Step .05 스토리 각색 및 콘티 .03 | 클립스튜디오 활용 및 원고 준비 대사 및 연출 편집 방식 체험하기 - 스케치 연출, 색조, 보정, 활용 방식,
              Step .06 스토리 각색 및 콘티 .04 | 콘티 원고로 옮기기 신선을 사로잡는 장면 연출 원고용 콘티 제작 20~60컷 최종 연출 수정 및 보완 (도전작 시작),

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_production_btn.png"
                  alt="수강료 조회"
                ></img>
              </Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/webtoon_production_03.png"
                alt="에이치아카데미 교육특성 @ 포트폴리오의 질이 다른 이유? 결과가 증명합니다.
                현업 디자이너 중심의 전문강사진 운영, 기획이 반영된 포트폴리오 & 개인별 맞춤 취업지원, 디자이너 실무자를 초청한 트렌드 파악시간 제공, 포트폴리오 제작을 위한 쾌적한 환경제공
                "
              ></img>
            </BtnSection>
          </div>
          <MoCon>
            <MoDeco>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_production_deco.png"
                alt=""
              />
            </MoDeco>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_production_02.png"
              alt="Step .01 스토리 구성방식 | 스토리텔링을 위한 기획 및 스토리보딩 신속한 기획을 위한 플롯과 트리트먼트 적용 가상의 세계관 스토리 구성 시작하기 구성된 글과 스토리 바탕의 자료수집하기 스토리보드 제작하기,
              Step .02 연출 기획하기 | 장편, 단편 연재 및 목표 일정 계획하기 준비 된 스토리보드를 한줄 요약 및 요소 정하기 - 상징, 반전, 복선, 환상적인 캐릭터, 코믹한 캐릭터 등등,
              Step .03 스토리 각색 및 콘티 .01 | 스토리 각색 요소 점검 및 콘티 작성 장면 각색 및 기본 콘티 완성하기 웹툰연재 1~3화 승부수 표현을 위한 상징적인 각색 각색한 내용에 맞춰 기본콘티 완성, 
              Step .04 스토리 각색 및 콘티 .02 | 웹툰으로 발전하기 위한 각색한 글, 그림 콘티 다듬기 각 장면의 그림 박스 간격 및 공간 활용하기 다양한 콘티 습작을 통한 작화 진행 및 연출,
              Step .05 스토리 각색 및 콘티 .03 | 클립스튜디오 활용 및 원고 준비 대사 및 연출 편집 방식 체험하기 - 스케치 연출, 색조, 보정, 활용 방식,
              Step .06 스토리 각색 및 콘티 .04 | 콘티 원고로 옮기기 신선을 사로잡는 장면 연출 원고용 콘티 제작 20~60컷 최종 연출 수정 및 보완 (도전작 시작),

              CLASS FOCUS 에이치아카데미는 개인 맞춤형 수업을 추구합니다.
              컨셉설정 | 장르별 특성에 따른 컨텐츠 목적의 개념을 이해하고 표현능력을 위한 컨셉설정 능력을 향상합니다.
              창작의 원리 | 일상의 현대적인 트렌드를 적용한 컨셉 기획 및 표현의 자유를 존중하며 창작의 노하우를 습득합니다.
              면담&피드백 | 분야별, 파트별 직종에 맞는 전문인력 양성을 위해 교강사가 수업내에 적성면담 및 피드백을 제공합니다.
              "
            ></img>
            <BtnSection>
              <Link href={'#'}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_production_btn.png"
                  alt="수강료 조회"
                ></img>
              </Link>

              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/webtoon_production_03.png"
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
