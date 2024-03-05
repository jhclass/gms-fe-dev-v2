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
  @media (max-width: 768px) {
    height: 4rem;
  }
`
const Logo = styled.div`
  @media (max-width: 768px) {
    width: 12rem;
  }
`

const Nav = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;

  > li {
    width: 12.5%;
    position: relative;

    &:after {
      content: '';
      width: 50%;
      height: 0.4rem;
      background: #000;
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      margin-left: -25%;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`
const GnbBtn = styled.button`
  display: none;
  width: 3rem;
  @media (max-width: 768px) {
    display: block;
  }
`
const GnbBox = styled.div`
  display: none;
`
const Mgnb = styled.div<{ $moMenuOpen: boolean }>`
  display: ${props => (props.$moMenuOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  justify-content: space-between;
  align-items: flex-start;
  z-index: 100;
  height: 100%;
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
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_01_on.png',
    alt: '모션그래픽과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_02_on.png',
    alt: '시각디자인과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_03_on.png',
    alt: '웹툰과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_04_on.png',
    alt: '디지털드로잉과정',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_05_on.png',
    alt: '국비/취업지원',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_06_on.png',
    alt: '일본취업지원',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_07_on.png',
    alt: '아카데미소개',
  },
  {
    off: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_off.png',
    on: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/nav_08_on.png',
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
        className="px-0 m-auto ax-w-full h-[4rem] lg:h-[4.5rem] relative z-[40]"
      >
        <div
          className={`${
            headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'
          } flex-col w-full bg-[#040033] lg:bg-white max-w-full px-0 lg:border-b-1`}
        >
          <MainTopBnr />

          <HeaderBox className="wrap">
            <Logo>
              <Link href="/" className="block">
                <img
                  className="hidden lg:block"
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/header_logo.png"
                  alt="H ACADEMY | H아카데미"
                />
                <img
                  className="block lg:hidden"
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/mo/header_logo.png"
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
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/nav_btn.png"
                alt="메뉴"
              ></img>
            </GnbBtn>
          </HeaderBox>
          <GnbBox
            onMouseEnter={() => {
              setHoverIndex(0)
            }}
            onMouseLeave={() => {
              setHoverIndex(null)
            }}
            style={{ display: hoverIndex ? 'block' : 'none' }}
          >
            <Gnb setHoverIndex={setHoverIndex} />
          </GnbBox>
        </div>
      </header>
      <Menu />
      <Mgnb $moMenuOpen={moMenuOpen}>
        <MgnbClose onClick={handleButtonClick}>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/close_btn01.png"
            alt="close"
          />
        </MgnbClose>
        <MgnbCon>
          <MgnbBnr>
            <Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_logo.png"
                alt="ACADEMY"
              />
            </Link>
            <Link>
              <img
                src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_bnr01.png"
                alt="전과정 국비지원"
              />
            </Link>
          </MgnbBnr>
          <MgnbNav>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_01.png"
                  alt="모션그래픽과정"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_02.png"
                  alt="시각디자인과정"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_03.png"
                  alt="웹툰과정"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_04.png"
                  alt="디지털드로잉과정"
                />
              </Link>
            </li>
          </MgnbNav>
          <MgnbNav2>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_05.png"
                  alt="국비/쉬업지원"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_06.png"
                  alt="아카데미소개"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_07.png"
                  alt="일본취업지원"
                />
              </Link>
            </li>
            <li>
              <Link>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/nav/mo/nav_08.png"
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
