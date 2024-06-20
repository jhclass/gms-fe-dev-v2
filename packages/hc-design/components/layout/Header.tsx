import { Link } from '@nextui-org/react'
import MainTopBnr from '@/components/main/MainTopBnr'
import Gnb from '@/components/Gnb'
import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { headerFixedState, moMenuOpenState } from '@/lib/recoilAtoms'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.5rem;
  gap: 0.5rem;
  @media (max-width: 960px) {
    height: 4rem;
  }
`
const Logo = styled.div`
  @media (max-width: 960px) {
    width: 13rem;
  }
`

const Nav = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;

  > li {
    position: relative;
    cursor: pointer;
    a {
      opacity: 1 !important;
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`
const CallBtn = styled.button`
  display: none;
  width: 2.5rem;
  @media (max-width: 960px) {
    display: block;
  }
  a {
    opacity: 1 !important;
    vertical-align: middle;
  }
`
const GnbBtn = styled.button`
  display: none;
  width: 3rem;
  @media (max-width: 960px) {
    display: block;
  }
`
const GnbBox = styled.div`
  display: none;
`
const Mgnb = styled.div<{ $moMenuOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  justify-content: space-between;
  align-items: flex-start;
  z-index: 100;
  height: 100%;
  display: none;

  @media (max-width: 960px) {
    display: ${props => (props.$moMenuOpen ? 'flex' : 'none')};
  }
`

const MgnbClose = styled.button`
  width: 4rem;
`
const MgnbCon = styled.div`
  width: 85%;
  background-image: url('https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_bg.webp');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  max-height: 100vh;
  height: 100%;
`

const MgnbBnr = styled.p`
  a {
    display: block;
  }
`
const MgnbNav = styled.ul`
  margin-top: 1rem;
  padding: 0 2rem;
  display: flex;
  gap: 0.5rem 2rem;
  flex-wrap: wrap;

  li {
    width: calc(50% - 1rem);
  }

  a {
    display: block;
    width: 100%;
    height: 100%;

    img {
      /* width: 14rem; */
    }
  }
`

const cate = [
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_on.webp',
    alt: '모션그래픽과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_on.webp',
    alt: '시각디자인과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_on.webp',
    alt: '웹툰과정 (작가데뷔)',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_on.webp',
    alt: '디지털드로잉과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_on.webp',
    alt: '국비/취업지원',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_on.webp',
    alt: '아카데미소개',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_off.webp',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_on.webp',
    alt: '고객상담센터',
  },
]

export default function Header() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  const router = useRouter()
  const [moMenuOpen, setmoMenuOpen] = useRecoilState(moMenuOpenState)
  const [headerFixed, setHeaderFixed] = useRecoilState(headerFixedState)
  const [showGnb, setShowGnb] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)

  const handleButtonClick = () => {
    setmoMenuOpen(!moMenuOpen)
  }

  const consultClick = () => {
    router.push('/consult')
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > 0) {
        setHeaderFixed(true)
      } else {
        setHeaderFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const clickCall = () => {
    window.gtag('event', '전화상담클릭', {
      event_category: 'Phone Call',
      event_label: '02-364-0008',
    })
  }

  return (
    <>
      <header
        id="header"
        className="px-0 m-auto max-w-full h-[4rem] lg:h-[10rem] relative z-[40]"
      >
        <div
          className={`${
            headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'
          } flex-col w-full  max-w-full px-0`}
        >
          <div className="bg-[#000] lg:bg-white">
            <MainTopBnr />

            <HeaderBox className="wrap">
              <CallBtn>
                <Link onClick={clickCall} href="tel:02-364-0008">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/call_btn.webp"
                    alt="02)364-0008"
                  />
                </Link>
              </CallBtn>
              <Logo>
                <Link href="/" className="block">
                  <img
                    className="hidden lg:block"
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/header_logo.webp"
                    alt="H ACADEMY | H아카데미"
                  />
                  <img
                    className="block lg:hidden"
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/header_logo.webp"
                    alt="H ACADEMY | H아카데미"
                  />
                </Link>
              </Logo>

              <Nav
                onMouseEnter={() => {
                  setHoverIndex(0)
                }}
                onMouseLeave={() => {
                  setHoverIndex(null)
                }}
              >
                {cate.map((item, index) =>
                  index < 4 ? (
                    <li
                      key={index}
                      onMouseEnter={() => {
                        setHoverIndex(index + 1)
                      }}
                    >
                      <Link href="/cs/curriculum" className="block">
                        <img
                          src={hoverIndex - 1 === index ? item.on : item.off}
                          alt={item.alt}
                        />
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={index}
                      onMouseEnter={() => {
                        setHoverIndex(index + 1)
                      }}
                    >
                      <img
                        src={hoverIndex - 1 === index ? item.on : item.off}
                        alt={item.alt}
                      />
                    </li>
                  ),
                )}
              </Nav>
              <GnbBtn onClick={handleButtonClick}>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/nav_btn.webp"
                  alt="메뉴"
                ></img>
              </GnbBtn>
            </HeaderBox>
          </div>
          <GnbBox
            onMouseEnter={() => {
              setHoverIndex(0)
            }}
            onMouseLeave={() => {
              setHoverIndex(null)
            }}
            style={{ display: hoverIndex ? 'block' : 'none' }}
            // style={{ display: 'block' }}
            className="hidden lg:block"
          >
            <Gnb setHoverIndex={setHoverIndex} />
          </GnbBox>
        </div>
      </header>
      {/* <Menu /> */}
      <Mgnb $moMenuOpen={moMenuOpen}>
        <MgnbClose onClick={handleButtonClick}>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/close_btn01.webp"
            alt="close"
          />
        </MgnbClose>
        <MgnbCon>
          <MgnbBnr>
            <Link href="/">
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_logo.webp"
                alt="ACADEMY"
              />
            </Link>
          </MgnbBnr>
          <MgnbNav>
            <li>
              <Link href="/motiongraphic">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_01.webp"
                  alt="모션그래픽과정"
                />
              </Link>
            </li>
            <li>
              <Link href="/motiongraphic/afterEffect">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_02.webp"
                  alt="2D모션그래픽"
                />
              </Link>
            </li>
            <li>
              <Link href="/motiongraphic/cinema">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_03.webp"
                  alt="3D모션그래픽"
                />
              </Link>
            </li>
            <li>
              <Link href="/design">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_04.webp"
                  alt="포토샵"
                />
              </Link>
            </li>
            <li>
              <Link href="/design/illust">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_05.webp"
                  alt="일러스트"
                />
              </Link>
            </li>
            <li>
              <Link href="/design/graphics">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_06.webp"
                  alt="컴퓨터그래픽스운용기능사"
                />
              </Link>
            </li>
            <li>
              <Link href="/design/webdesign">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_07.webp"
                  alt="웹디자인기능사"
                />
              </Link>
            </li>
            <li>
              <Link href="/webtoon">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_08.webp"
                  alt="웹툰캐릭터"
                />
              </Link>
            </li>
            <li>
              <Link href="/webtoon/production">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_09.webp"
                  alt="웹툰 연출 / 각색"
                />
              </Link>
            </li>
            <li>
              <Link href="/webtoon/background">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_10.webp"
                  alt="웹툰배경"
                />
              </Link>
            </li>
            <li>
              <Link href="/webtoon/story">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_11.webp"
                  alt="웹툰스토리 ( 원고 / 작가 )"
                />
              </Link>
            </li>
            <li>
              <Link href="/artwork">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_12.webp"
                  alt="디지털드로잉"
                />
              </Link>
            </li>
            <li>
              <Link href="/artwork/game">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_13.webp"
                  alt="원화 ( 아트웍 / 게임 )"
                />
              </Link>
            </li>
            <li>
              <Link href="/artwork/emoticon">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_14.webp"
                  alt="이모티콘제작"
                />
              </Link>
            </li>
            <li>
              <Link href="/support">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_15.webp"
                  alt="국민내일배움카드"
                />
              </Link>
            </li>
            <li>
              <Link href="/support/system">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_16.webp"
                  alt="취업시스템"
                />
              </Link>
            </li>
            <li>
              <Link href="/academy">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_17.webp"
                  alt="아카데미소개"
                />
              </Link>
            </li>
            <li>
              <Link href="/academy/features">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_18.webp"
                  alt="교육특성"
                />
              </Link>
            </li>
            <li>
              <Link href="/cs/location">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_19.webp"
                  alt="오시는길 ( 위치조회 )"
                />
              </Link>
            </li>
            <li>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_20.webp"
                  alt="수강료 / 시간표 조회"
                />
              </Link>
            </li>
            <li>
              <Link href="/cs/consult">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_21.webp"
                  alt="온라인 상담"
                />
              </Link>
            </li>
            {/* <li>
              <Link href="#">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_22.webp"
                  alt="업무제휴"
                />
              </Link>
            </li> */}
          </MgnbNav>
        </MgnbCon>
      </Mgnb>
    </>
  )
}
