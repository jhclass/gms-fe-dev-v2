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
  width: 21.5278vw;
  @media (max-width: 960px) {
    width: 10rem;
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
    padding-right: 1vw;
  }

  @media (max-width: 960px) {
    display: none;
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
  background-image: url('https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_bg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  max-height: 100vh;
  padding-left: 0.3rem;
  height: 100%;
`

const MgnbBnr = styled.p`
  a {
    display: block;
  }
`
const MgnbNav = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    display: block;
    width: 100%;
    height: 100%;

    img {
      width: 14rem;
    }
  }
`
const MgnbNav2 = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  li {
    width: calc(50% - 1rem);
  }
  a {
    display: block;
    width: 100%;
    height: 100%;

    img {
      width: 10rem;
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
          <div className="bg-[#040033] lg:bg-white">
            <MainTopBnr />

            <HeaderBox className="wrap ">
              <Logo>
                <Link href="/" className="block">
                  <img
                    className="hidden lg:block"
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/header_logo.webp"
                    alt="H ACADEMY | H아카데미"
                  />
                  <img
                    className="w-[12rem] block lg:hidden"
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
                {cate.map((item, index) => (
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
                ))}
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
            <Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_bnr01.webp"
                alt="전과정 국비지원"
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
              <Link href="/design">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_02.webp"
                  alt="시각디자인과정"
                />
              </Link>
            </li>
            <li>
              <Link href="/webtoon">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_03.webp"
                  alt="웹툰과정"
                />
              </Link>
            </li>
            <li>
              <Link href="/artwork">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_04.webp"
                  alt="디지털드로잉과정"
                />
              </Link>
            </li>
          </MgnbNav>
          <MgnbNav2>
            <li>
              <Link href="/support">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_05.webp"
                  alt="국비/취업지원"
                />
              </Link>
            </li>
            <li>
              <Link href="/academy">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_06.webp"
                  alt="아카데미소개"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_07.webp"
                  alt="일본취업지원"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_08.webp"
                  alt="고객상담센터"
                />
              </Link>
            </li>
          </MgnbNav2>
        </MgnbCon>
      </Mgnb>
    </>
  )
}
