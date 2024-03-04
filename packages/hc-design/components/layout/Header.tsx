import { Accordion, AccordionItem, Button, Link } from '@nextui-org/react'
import MainTopBnr from '@/components/main/MainTopBnr'
import Gnb from '@/components/Gnb'
import Menu from '@/components/Menu'
import SearchBox from '@/components/SearchBox'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { headerFixedState, moMenuOpenState } from '@/lib/recoilAtoms'
import { useEffect, useState } from 'react'
import MenuAll from '../MenuAll'
import styled from 'styled-components'

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.5rem;
`
const Logo = styled.div``

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
`
const GnbBox = styled.div`
  display: none;
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
      // const topBnrTop = document.getElementById('mainTopBnr').clientHeight || 0

      // if (currentScroll > topBnrTop) {
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
        className="px-0 m-auto ax-w-full h-[8rem] lg:h-[4.5rem] relative z-[40]"
      >
        <div
          className={`${
            headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'
          } flex-col w-full bg-white max-w-full px-0 border-b-1`}
        >
          <MainTopBnr />

          <HeaderBox className="wrap">
            <Logo>
              <Link href="/" className="block">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/common/header_logo.png"
                  alt="H ACADEMY | H아카데미"
                />
              </Link>
            </Logo>

            <Nav
              onMouseEnter={() => {
                setHoverIndex(true)
                setHoverIndex(0)
              }}
              onMouseLeave={() => {
                setShowGnb(false)
                setHoverIndex(null)
              }}
            >
              {cate.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    setShowGnb(true)
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
    </>
  )
}
