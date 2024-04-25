import Form from '@/components/Form'
import Head from 'next/head'
import Link from 'next/link'

export default function Consult() {
  return (
    <>
      <Head>
        <title>HART | 전체과정보기</title>
        <meta name="description" content="전체과정보기" />
      </Head>
      <section id="consult" className="pb-16">
        <div className="max-w-[2000px] mx-auto my-0 relative">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/cate_top.webp"
            alt="Design curriculum 전체과정보기 기초과정부터 취업 포트폴리오과정까지, 트렌드를 접목한 진짜를 교육합니다."
            className="hidden w-ful wmd:block"
          />
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/cate_top.webp"
            alt="Design curriculum 전체과정보기 기초과정부터 취업 포트폴리오과정까지, 트렌드를 접목한 진짜를 교육합니다."
            className="block w-full wmd:hidden"
          />
        </div>
        <div className="wrap">
          <div className="relative mt-[3rem] wmd:mt-[6rem]">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_01.webp"
              alt="영상편집 / 2D,3D 모션그래픽 MOTION GRAPHICS 모션그래픽 컨셉을 설정하고 그에따른 기법, 푸티지를 녹인 모션그래픽 연출을 교육합니다."
              className="hidden mx-auto my-0 w-ful wmd:block"
            />
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_01.webp"
              alt="영상편집 / 2D,3D 모션그래픽 MOTION GRAPHICS 모션그래픽 컨셉을 설정하고 그에따른 기법, 푸티지를 녹인 모션그래픽 연출을 교육합니다."
              className="block w-ful wmd:hidden"
            />
            <ul className="absolute flex left-[3.3333vw] bottom-[6.4074vw] gap-[2%] wmd:bottom-[23%] wmd:left-[6%] wmd:w-[50%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/motiongraphic">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_01_01.webp"
                    alt="영상편집과정"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_01_01.webp"
                    alt="영상편집과정"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/motiongraphic/afterEffect">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_01_02.webp"
                    alt="2D모션그래픽과정"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_01_02.webp"
                    alt="2D모션그래픽과정"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/motiongraphic/cinema">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_01_03.webp"
                    alt="3D모션그래픽과정"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_01_03.webp"
                    alt="3D모션그래픽과정"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative mt-[3rem] wmd:mt-[6rem]">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_02.webp"
              alt="시각디자인 visual design 디자인 표현의 근간을 이루는 기초시각디자인 및 다양한 표현기법을 다룹니다."
              className="hidden mx-auto my-0 w-ful wmd:block"
            />
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_02.webp"
              alt="시각디자인 visual design 디자인 표현의 근간을 이루는 기초시각디자인 및 다양한 표현기법을 다룹니다."
              className="block w-ful wmd:hidden"
            />
            <ul className="absolute flex left-[3.3333vw] bottom-[6.8074vw] flex-wrap gap-[2%] wmd:bottom-[28%] wmd:left-[6%] wmd:w-[38%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/design">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_02_01.webp"
                    alt="포토샵과정"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_02_01.webp"
                    alt="포토샵과정"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/design/illust">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_02_02.webp"
                    alt="일러스트과정"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_02_02.webp"
                    alt="일러스트과정"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
            <ul className="absolute flex left-[3.3333vw] bottom-[1.6667vw] flex-wrap gap-[2%] wmd:bottom-[7%] wmd:left-[6%] wmd:w-[38%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/design/graphics">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_02_03.webp"
                    alt="컴퓨터그래픽스운용기능사"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_02_03.webp"
                    alt="컴퓨터그래픽스운용기능사"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/design/webdesign">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_02_04.webp"
                    alt="웹디자인기능사"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_02_04.webp"
                    alt="웹디자인기능사"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative mt-[3rem] wmd:mt-[6rem]">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_03.webp"
              alt="웹툰 캐릭터 / 연출 / 각색 / 배경 / 스토리 (원고, 작가데뷔) webtoon 웹툰작가님이 직접 교육해주는 기획부터 포트폴리오, 작가데뷔까지 가능한 수업입니다."
              className="hidden mx-auto my-0 w-ful wmd:block"
            />
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_03.webp"
              alt="웹툰 캐릭터 / 연출 / 각색 / 배경 / 스토리 (원고, 작가데뷔) webtoon 웹툰작가님이 직접 교육해주는 기획부터 포트폴리오, 작가데뷔까지 가능한 수업입니다."
              className="block w-ful wmd:hidden"
            />
            <ul className="absolute flex left-[3.3333vw] bottom-[6.8074vw] flex-wrap gap-[2%] wmd:bottom-[28%] wmd:left-[6%] wmd:w-[38%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/webtoon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_03_01.webp"
                    alt="웹툰캐릭터"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_03_01.webp"
                    alt="웹툰캐릭터"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/webtoon/production">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_03_02.webp"
                    alt="웹툰 연출 / 각색"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_03_02.webp"
                    alt="웹툰 연출 / 각색"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
            <ul className="absolute flex left-[3.3333vw] bottom-[1.6667vw] flex-wrap gap-[2%] wmd:bottom-[7%] wmd:left-[6%] wmd:w-[38%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/webtoon/background">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_03_03.webp"
                    alt="웹툰 배경"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_03_03.webp"
                    alt="웹툰 배경"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/webtoon/story">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_03_04.webp"
                    alt="웹툰 스토리 (원고/작가)"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_03_04.webp"
                    alt="웹툰 스토리 (원고/작가)"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative mt-[3rem] wmd:mt-[6rem]">
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_04.webp"
              alt="디지털드로잉 / 이모티콘 제작 digital drawing 디지털 일러스트레이션의 다양한 완성, 그리고 5주만의 이모티콘 크리에이터까지!!"
              className="hidden mx-auto my-0 w-ful wmd:block"
            />
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_04.webp"
              alt="디지털드로잉 / 이모티콘 제작 digital drawing 디지털 일러스트레이션의 다양한 완성, 그리고 5주만의 이모티콘 크리에이터까지!!"
              className="block w-ful wmd:hidden"
            />
            <ul className="absolute flex left-[3.3333vw] bottom-[6.4074vw] gap-[2%] wmd:bottom-[23%] wmd:left-[6%] wmd:w-[50%]">
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/artwork">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_04_01.webp"
                    alt="디지털드로잉"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_04_01.webp"
                    alt="디지털드로잉"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/artwork/game">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_04_02.webp"
                    alt="원화 (아트웍 / 게임)"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_04_02.webp"
                    alt="원화 (아트웍 / 게임)"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
              <li className="flex-1 w-[20.7407vw] wmd:w-auto ">
                <Link href="/artwork/emoticon">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/catebg_04_03.webp"
                    alt="이모티콘 제작"
                    className="hidden w-ful wmd:block"
                  />
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/catebg_04_03.webp"
                    alt="이모티콘 제작"
                    className="block w-ful wmd:hidden"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
