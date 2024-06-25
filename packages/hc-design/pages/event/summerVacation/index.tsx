import Form from '@/components/Form'
import { Link } from '@nextui-org/react'
import Head from 'next/head'

export default function eventSummerVacation() {
  return (
    <>
      <Head>
        <title>HART | 6월 여름방학특강 </title>
        <meta
          name="description"
          content="이벤트 | 6월 여름방학특강 - 너의 여름방학"
        />
      </Head>
      <section className="bg-[#fff]">
        <div className="max-w-[1440px] mx-auto my-0">
          <div className="hidden w-full wmd:block">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/evt/evt_summer_02.webp"
              alt="6월 너의 여름방학 너와 나의 여름방학을 위해 모두 준비해보았어요.
              event01. 모든 방학특강 전액 국비 지원 너를 위해 준비했어. 할인보다 전액지원이 좋잖아. | 포토샵, 일러스트, 에펙, webtoon, 컴퓨터그래픽스운용기능사, 웹디자인기능사
              event02. 패키지 과정 전액 국비 지원 너를 위해 준비했어. 알차게 학과별 MASTER 해봐. | 영상편집 MASTER, 웹디자인(UI/UX) MASTER, 시각디자인 MASTER, 웹툰 베이직 MASTER
              event03. 블렌더 에셋 모델링 마스터과정 개설 너를 위해 준비했어. 부담없이 3D 모델링 패키지 과정. | 포토샵 + 일러스트 + 에펙 + 블렌더이 모든게  300,000원!!
              event04. 친구 추천시 추가 10% 할인 너를 위해 준비했어. 친구랑 같이 즐겁게 공부해. | 조기 마감 될 수 있으므로 서둘러 상담 신청하세요. , 친구와 같이 상담 신청하면 모두에게 10% 할인!!
              event05.뜨거운 여름, 시원한 아메리카노와 함께. 뜨거운 여름, 시원한 아메리카노와 함께. 너를 위해 준비했어. 아이스 아메리카노. | 상담만 받아도 바나프레소 음료 쿠폰 증정!!
              +event 너를 위해 준비했어. H아카데미는 취업에 강해.| 81% 높은 취업률을 자랑하는 취업지원 시스템, 진로상담과 함께 정확한 플랜을 설계해 드립니다.
              관심있는 과정을 선택 후, 조회서비스를 이용하시면 보다 빠르고 간편하게 수강료 및 시간표 등 원하시는 정보를 안내드립니다.
              "
            />
          </div>
          <div className="block w-full wmd:hidden">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/evt/mo/evt_summer_02.webp"
              alt="6월 너의 여름방학 너와 나의 여름방학을 위해 모두 준비해보았어요.
              event01. 모든 방학특강 전액 국비 지원 너를 위해 준비했어. 할인보다 전액지원이 좋잖아. | 포토샵, 일러스트, 에펙, webtoon, 컴퓨터그래픽스운용기능사, 웹디자인기능사
              event02. 패키지 과정 전액 국비 지원 너를 위해 준비했어. 알차게 학과별 MASTER 해봐. | 영상편집 MASTER, 웹디자인(UI/UX) MASTER, 시각디자인 MASTER, 웹툰 베이직 MASTER
              event03. 블렌더 에셋 모델링 마스터과정 개설 너를 위해 준비했어. 부담없이 3D 모델링 패키지 과정. | 포토샵 + 일러스트 + 에펙 + 블렌더이 모든게  300,000원!!
              event04. 친구 추천시 추가 10% 할인 너를 위해 준비했어. 친구랑 같이 즐겁게 공부해. | 조기 마감 될 수 있으므로 서둘러 상담 신청하세요. , 친구와 같이 상담 신청하면 모두에게 10% 할인!!
              event05.뜨거운 여름, 시원한 아메리카노와 함께. 뜨거운 여름, 시원한 아메리카노와 함께. 너를 위해 준비했어. 아이스 아메리카노. | 상담만 받아도 바나프레소 음료 쿠폰 증정!!
              +event 너를 위해 준비했어. H아카데미는 취업에 강해.| 81% 높은 취업률을 자랑하는 취업지원 시스템, 진로상담과 함께 정확한 플랜을 설계해 드립니다.
              관심있는 과정을 선택 후, 조회서비스를 이용하시면 보다 빠르고 간편하게 수강료 및 시간표 등 원하시는 정보를 안내드립니다.
              "
            />
          </div>
        </div>
      </section>
      <section className="pb-[6rem]">
        <Form />
      </section>
    </>
  )
}
