import Link from 'next/link'
import React from 'react'
import Form from '@/components/Form'
import DetailFixed from '@/components/section/DetailFixed'
import Curriculum from '@/components/section/Curriculum01'
import DetailInfo from '@/components/section/DetailInfo'
import Review from '@/components/section/Review'
import Portfolio from '@/components/section/Portfolio'
import TopBnr from '@/components/section/TopBnr'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import SlideSection from '@/components/section/SlideSection'
import MainSection01 from '@/components/section/MainSection01'
import Section01_3col from '@/components/section/Section01._3col'
import Curriculum01 from '@/components/section/Curriculum01'
import Curriculum02 from '@/components/section/Curriculum02'
import Section01_img from '@/components/section/Section01_img'

export default function Detail() {
  const scrollTo = (target: string): void => {
    const consultSection = document.getElementById(target)
    if (consultSection) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.clientHeight : 0
      const targetSectionTop =
        consultSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: targetSectionTop - headerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <TopBnr />
      <section className="bg-black">
        <div className="text-center wrap">
          <p className="pt-20 text-center text-white">
            <span className="inline-block text-black border-2 border-[#F28705] bg-[#F28705] rounded-lg text-center text-xl font-bold px-2 py-1">
              웹툰작가에게 배우는
            </span>
            <br />
            <b className="inline-block mt-5 text-4xl/[3rem]">
              웹툰제작과정
              <span className="text-2xl/[3rem] pl-3">Webtoon</span>
            </b>
          </p>
          <figure className="w-full mx-auto mt-10">
            <img src="/src/detail/d2_main_section03.jpg" />
          </figure>
        </div>
      </section>
      <section className="py-16 bg-[#222]">
        <div className="wrap">
          <p className="text-white">
            <b className="inline-block mb-5 text-2xl">
              웹툰제작을 원하는 사람 모두 환영
            </b>
          </p>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            <div className="px-10 py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#F28705] font-bold bg-[#F28705] rounded-lg px-3 py-2 mb-2">
                  입학상담 및 사전평가
                </span>
              </p>
              <p className="mt-5 text-base text-center text-white">
                입문자여도 스킬업을 원해도 나의 실력부터, 취미여도 작가데뷔나
                취업을 원해도 나의 목적을 이룰 수 있습니다.
              </p>
            </div>
            <div className="px-10 py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#F28705] font-bold bg-[#F28705] rounded-lg px-3 py-2 mb-2">
                  웹툰작가님의 커리큘럼
                </span>
              </p>
              <p className="mt-5 text-base text-center text-white">
                입문자 분들도 쉽게 따라올 수 있도록 3단계로 나누어 실력을 점점
                쌓아갈 수 있도록 커리큘럼 구성하였습니다.
              </p>
            </div>
            <div className="px-10 py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#F28705] font-bold bg-[#F28705] rounded-lg px-3 py-2 mb-2">
                  1:1피드백, 개인맞춤지도
                </span>
              </p>
              <p className="mt-5 text-base text-center text-white">
                단계별 테스트를 통해 나의 실력을 체크하고 성장을 위한 1:1
                피드백을 통해 개인 맞춤형 수업을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-black">
        <div className="wrap">
          <p className="text-white">
            <b className="inline-block text-2xl">
              웹툰 배경 제작
              <br />
              스케치업을 활용한 웹툰배경 이미지
            </b>
          </p>
          <figure className="w-full mt-10 overflow-hidden">
            <img src="/src/detail/d2_img_section.jpg" width="100%" />
          </figure>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="wrap">
          <div className="text-center">
            <p className="inline-block px-4 py-2 text-sm font-bold text-center text-white bg-[#F28705] border-2 border-[#F28705] rounded-lg">
              Flowchart
            </p>
            {/* <h4 className="text-center text-[#021226]">
              <b className="inline-block mt-2 text-2xl">[ Flowchart ]</b>
            </h4> */}
            <ul className="mx-auto mt-10 lg:w-full xl:w-4/5">
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 01. 웹툰의 이해
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    하드웨어 및 소프트웨어의 이해 (tablet, Cintiq, CLIP STUDIO,
                    Photoshop 등)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    웹툰제작 시 사용되는 툴의 환경설정 및 실습 (클립스튜디오,
                    포토샵)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    웹툰제작을 시작하기에 앞서 웹툰제작에 사용되는 하드웨어와
                    소프트웨어의 종류 및 활용법을 이해하고 각각의 활용 예시 등을
                    통해 사용법을 익힐 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 02. 드로잉의 이해 및 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    기초 인체드로잉 (손, 발, 몸, 다리, 얼굴, 헤어 등)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    크로키, 모작 등 다양한 방법을 통한 인체 익히기
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    인체의 기본 비율, 캐릭터 두상의 비율 및 형태, 근육을 통한
                    인체의 연결과 윤곽, 인체 무게 중심, 옷 주름과 신발, 얼굴
                    표정 등 다양한 인체비율 연구를 통해 인체 드로잉을 이해할 수
                    있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 03. 펜선 및 채색
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    펜선 실습 (클립스튜디오 툴을 통한 다양한 브러시 도구와 응용)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    채색 실습 (기본 채색 및 명암 활용법과 레이어 및 효과를
                    이용한 응용)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    클립스튜디오의 다양한 브러시 도구를 이용한 펜선 연습을 통해
                    다양한 펜선의 종류를 이해할 수 있고, 다양한 채색 활용 예시를
                    통해 채색 및 명암 활용법 등을 익힐 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 04. 원고의 이해 및 실습 Part.1
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    1컷 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    원고가 어떻게 완성되는지 간단한 예시를 보고 원고 중 1컷
                    완성을 목표로 합니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 05. 캐릭터 및 인체 연구
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    내가 원하는 캐릭터 만들기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터에 맞는 인체연습
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    기성작가들의 작품 중 본인이 생각하는 이미지와 어울리는
                    캐릭터를 모작해 보고, 내가 구상하고 있는 스토리와 접목시켜
                    내가 원하는 캐릭터를 만들어 봅니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 06. 내가 원하는 캐릭터 완성
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터 펜선 및 채색
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    흉상, 반신상, 전신 완성하기
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    내가 원하는 캐릭터 샘플을 완성하고 캐릭터 설정에 나오는
                    흉상, 반신상, 전신을 완성해 봅니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 07. 배경의 이해와 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    투시법(기본 1,2,3점 투시, 투시별 연출 및 활용 방법)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    스케치업을 활용한 배경제작 및 3D 이질감 보정
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    투시를 이용한 인물을 그려보며 투시법, 투시별 연출 및 활용
                    방법 등 배경연출을 이해할 수 있고, 스케치업을 통해 3D 배경을
                    제작하거나 활용할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 08. 원고의 이해 및 실습 Part.2
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    4컷 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    내가 만든 캐릭터와 배경을 기반으로 원고시안의 개인별
                    피드백을 통해 4컷 원고 완성을 목표로 합니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 09. 스토리 작법
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 장르의 스토리와 스토리의 전개방식에 대한 이해
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    재미있는 소재를 만드는 6가지 방법
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    사건의 중심이 되는 3명의 캐릭터 설정
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    다양한 스토리의 활용 및 적용 예시를 통해 스토리 작법 이론
                    및, 스토리를 어떻게 시작할 것인지, 나에게 맞는 장르는 어떤
                    것인지 파악하고 나만의 스토리를 작성할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 10. 연출 이론
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    연출에 대한 기초 이론 ( 샷과 앵글을 통한 연출, 각도와 대조의
                    연출, 컷에 대한 이해)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 장르의 연출 (ex 일상, 판타지, 스릴러 등 장르에 따른
                    다양한 연출연구)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    다양한 연출법에 대한 기초이론의 학습을 통해 스토리의 전개,
                    장르, 시간의 흐름에 따라 나의 작품을 연출할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 11. 연출의 이론 및 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    인물의 성격, 감정표현 등에 따른 연출 활용
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    배경, 채색의 연출 활용(긴장감, 추격패턴, 혼란, 시선의
                    흐름으로 컷의 연결 및 전조)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    다양한 연출방법의 학습을 통해 단지 그리는 것이 아니라 인물과
                    배경, 오브제 등 디테일한 부분들의 연출 활용법을 배우고
                    본인이 만든 스토리를 더욱 생동감 있게 연출할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 12. 원고의 이해 및 실습 Part.3
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    프롤로그 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    본인이 만든 스토리의 프롤로그를 만들어 봅니다. 수차례 원고를
                    거듭하면서 원고에 시작과 마무리에 대한 감을 익힙니다.
                  </li>
                </ul>
              </li>
              <li className="mt-10 p-6 text-left text-[#021226] border-2 border-[#F28705] rounded-lg bg-[#F28705]">
                <span className="text-[#F28705] border-2 border-[#021226] bg-[#021226] text-center text-xl py-1 px-4 inline-block mb-2">
                  Portfolio.
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 13. 단편 웹툰 제작
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    시놉시스 작성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터 시트 그리기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글, 그림 콘티 작성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    단편 원고 작업, 편집
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#021226] border-t-1">
                    작가 데뷔 및 취업을 위한 포트폴리오 제작
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#F2F2F2]">
        <div className="wrap">
          <h4 className="text-center text-black">
            <span className="text-2xl">수강생들의 생생한 후기</span>
            <br />
            <b className="mt-4 text-3xl">REVIEW</b>
          </h4>
          <div className="mt-4">
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[23rem] lg:h-[23rem]">
                <img
                  src="/src/images/user.webp"
                  alt="김○○의 포트폴리오"
                  loading="lazy"
                  width="100%"
                />
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-right">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">프론트엔드 마스터반</b> 수강생
                  </span>
                  김○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left even:items-end">
                  <p>
                    <span className="text-primary">3.7</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 3.7}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  구현까지만 할 줄 아는 개발자는 많습니다. 하지만{' '}
                  <b>유저에 대해 치열하게 고민하며 성능을 챙기는 개발자</b>는
                  드물죠. 이번 프로젝트 구성은 제가 경험해 온
                  <b>
                    프로덕트 도메인의 인사이트(금융 - 카드사 &amp; 개인예산관리
                    프로젝트, 여행 - 여행 프로젝트)를
                  </b>{' '}
                  모두 모았습니다. 이 모든 강의는 프로덕트 도메인의 특성에 따라{' '}
                  <b>
                    유저가 어떠한 것을 기대하고 불편해하는지 파악하며 최적화
                  </b>
                  가 진행됩니다. 이를 통해 여러분은 유저에 대해 치열한 고민을
                  하고, 최적화까지 할 줄아는 개발자가 될 수 있습니다. 뿐만
                  아니라 부분 부분 최적화를 다루는 강의는 있지만, 실제 실무
                  베이스로 서비스에 최적화를 적용해나가는 최적화 강의는 많지
                  않습니다. 이 강의는{' '}
                  <b>실제 실무 베이스로 최적화를 다루며 적용</b>해나갑니다. 이
                  강의를 활용하신다면 개발하고 계시는 프로젝트에 강의 내용을
                  적용하고{' '}
                  <b>
                    프론트엔드 개발자로서 UX를 고려한 최적화까지 이뤄낼 수
                    있다고 자신있게 말씀드립니다.
                  </b>
                </p>
              </div>
            </div>
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[23rem] lg:h-[23rem]">
                <img
                  src="/src/images/user.webp"
                  alt="이○○의 포트폴리오"
                  loading="lazy"
                  width="100%"
                />
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-right">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">프론트엔드 마스터반</b> 수강생
                  </span>
                  이○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left even:items-end">
                  <p>
                    <span className="text-primary">4.0</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 4}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  구현까지만 할 줄 아는 개발자는 많습니다. 하지만{' '}
                  <b>유저에 대해 치열하게 고민하며 성능을 챙기는 개발자</b>는
                  드물죠. 이번 프로젝트 구성은 제가 경험해 온
                  <b>
                    프로덕트 도메인의 인사이트(금융 - 카드사 &amp; 개인예산관리
                    프로젝트, 여행 - 여행 프로젝트)를
                  </b>{' '}
                  모두 모았습니다. 이 모든 강의는 프로덕트 도메인의 특성에 따라{' '}
                  <b>
                    유저가 어떠한 것을 기대하고 불편해하는지 파악하며 최적화
                  </b>
                  가 진행됩니다. 이를 통해 여러분은 유저에 대해 치열한 고민을
                  하고, 최적화까지 할 줄아는 개발자가 될 수 있습니다. 뿐만
                  아니라 부분 부분 최적화를 다루는 강의는 있지만, 실제 실무
                  베이스로 서비스에 최적화를 적용해나가는 최적화 강의는 많지
                  않습니다. 이 강의는{' '}
                  <b>실제 실무 베이스로 최적화를 다루며 적용</b>해나갑니다. 이
                  강의를 활용하신다면 개발하고 계시는 프로젝트에 강의 내용을
                  적용하고{' '}
                  <b>
                    프론트엔드 개발자로서 UX를 고려한 최적화까지 이뤄낼 수
                    있다고 자신있게 말씀드립니다.
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="wrap">
          <h4 className="text-2xl font-bold">커리큘럼을 확인하세요.</h4>
          <p className="mt-3 text-base">
            입학상담을 통해 나의 실력에 맞는 진도를 상담하실 수 있습니다.
            <br />
            지금 나의 실력을 체크하고 꿈에 한발 더 다가가세요!
          </p>
          <ul className="mt-10">
            <li>
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-2">
                Part1. 오리엔테이션
              </p>
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                <Accordion
                  defaultExpandedKeys={['1']}
                  variant="splitted"
                  className="px-0 font-bold"
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="01. 오리엔테이션"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        강의 및 강사 소개
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion
                  defaultExpandedKeys={['1']}
                  variant="splitted"
                  className="px-0 font-bold"
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 2"
                    title="02. 웹툰의 이해"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        하드웨어 및 소프트웨어 이해 (tablet, Cintiq, CLIP
                        STUDIO, Photoshop 등)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        웹툰제작 시 사용되는 툴의 환경설정 및 실습(클립스튜디오,
                        포토샵)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-2">
                Part2. 웹툰 캐릭터 제작
              </p>
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 3"
                    title="01. 인체 드로잉의 이해 및 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        기초 인체드로잉
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        크로키, 모작 등 다양한 방법을 통한 인체 익히기
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 4"
                    title="02. 펜선 및 채색"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        클립스튜디오 툴을 활용한 펜선 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        기본채색 및 명암 활용법 등 실습
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 5"
                    title="03. 원고의 이해 및 실습 Part.1"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글콘디 및 콘치, 러프스케치, 펜선 및 채식, 원고 과정의
                        이해 및 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        웹툰캐릭터 제작
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-2">
                Part3. 4컷 웹툰 제작
              </p>
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 6"
                    title="01. 캐릭터 및 인체 연구"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        내가 원하는 캐릭터 만들기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터에 맞는 인체 연습
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 7"
                    title="02. 내가 원하는 캐릭터 완성"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터 펜선 및 채색
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        흉상, 반신상, 전신 완성하기
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 8"
                    title="03. 배경의 이해와 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        투시법(기본 1,2,3점 투시, 투시별 연출 및 활용 방법)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        스케치업을 활용한 배경 제작 및 3D 이질감 보정
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 9"
                    title="04. 원고의 이해 및 실습 Part.2"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글콘디 및 콘치, 러프스케치, 펜선 및 채식, 원고 과정의
                        이해 및 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        4컷 웹툰 완성
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-2">
                Part4. 웹툰 프롤로그 완성
              </p>
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 10"
                    title="01. 스토리 작법"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 장르의 스토리와 스토리의 전개방식에 대한 이해
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        재미있는 소재를 만드는 6가지 방법
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        사건의 중심이 되는 3명의 캐릭터 설정
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 11"
                    title="02. 연출 이론"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        연출에 대한 기초 이론(샷과 앵글을 통한 연출, 각도와
                        대조의 연출, 컷에 대한 이해)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 장르의 연출 (ex. 일상, 판타지, 스릴러 등 장르에
                        따른 다양한 연출 연구)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 12"
                    title="03. 연출의 이론 및 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        인물의 성격, 감정표현 등에 따른 연출 활용
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        배경, 채색의 연출 활용(긴장감, 추격패턴, 혼란, 시선의
                        흐름으로 컷의 연결 및 전조)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-2">
                Part5. Portfolio
              </p>
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 13"
                    title="01. 단편 웹툰 제작"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        시놉시스 작성
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터 시트 그리기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글, 그림 콘티 작성
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        단편 원고 작업, 편집
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        작가 데뷔 및 취업을 위한 포트폴리오 제작
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
          </ul>
          <p className="mt-10 text-base">
            * 수업일정과 소요되는 시간, 진도진행 방식 등 학생들의 레벨에
            기반하여 조금씩 변경 될 수 있습니다
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#0D0D0D]">
        <Portfolio />
      </section>
      <section id="consult" className="py-20">
        <Form />
      </section>
      <DetailFixed />
    </>
  )
}
