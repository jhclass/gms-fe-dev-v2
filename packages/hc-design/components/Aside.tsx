import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { asideHiddenState, moAsideOpenState } from '@/lib/recoilAtoms'
import { keyframes, styled } from 'styled-components'

const ballonKey = keyframes`
  0% {
  top: -1.8rem;
  }
  100% {
  top: -2.5rem;
  }
`

const Ballon = styled.p`
  display: block;
  position: absolute;
  padding: 0.1rem 0.4rem;
  width: 6rem;
  left: 50%;
  margin-left: -3rem;
  top: -2.5rem;
  background: #100061;
  font-size: 0.9rem;
  font-weight: 700;
  color: #c9f237;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 1px 2px 1rem rgba(0, 0, 0, 1);
  animation: ${ballonKey} 0.8s ease-in-out infinite alternate;

  &:after {
    border-top: 0.6rem solid #100061;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    margin-left: -0.6rem;
  }
`

export default function Aside() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  const [asideHidden, setAsideHiddenState] = useRecoilState(asideHiddenState)
  const [moAsideOpen, setMoAsideOpenState] = useRecoilState(moAsideOpenState)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > 0) {
        setAsideHiddenState(false)
      } else {
        setAsideHiddenState(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleAsideClick = () => {
    setMoAsideOpenState(!moAsideOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const clickKakao = () => {
    window.gtag('event', '카카오톡 상담클릭', {
      event_category: 'kakao',
      event_label: 'channel',
      value: 1,
    })
    // window.open('https://pf.kakao.com/_EQExkG')
    window.open('https://pf.kakao.com/_xhdrYC')
  }

  return (
    <>
      <aside
        id="aside"
        className="bottom-[8rem] rounded-s-lg right-[1rem] fixed z-40 lg:py-0 lg:px-0 lg:bg-transparent lg:bottom-28 transition-all"
      >
        <div className="relative w-[4rem] h-[4rem] bg-[#f8e540] rounded-full shadow-[-1px_2px_2px_rgba(0,0,0,0.6)]">
          <Ballon>바로 상담 👍</Ballon>
          <Link
            href="#"
            onClick={clickKakao}
            className="flex items-center justify-center w-full h-full text-[3rem]"
          >
            <i className="xi-kakaotalk" />
          </Link>
        </div>
        <div className="hidden lg:block w-[4rem] mt-[0.5rem] lg:mt-[0.8rem] rounded-full shadow-[-1px_2px_2px_rgba(0,0,0,0.6)]">
          <Link
            href="/cs/curriculum"
            as="/cs/curriculum"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/floating02.webp"
              alt="교육과정조회"
            />
          </Link>
        </div>
        <div className="hidden lg:block w-[4rem] mt-[0.5rem] lg:mt-[0.8rem] rounded-full shadow-[-1px_2px_2px_rgba(0,0,0,0.6)]">
          <Link
            href="/event/summerVacation"
            as="/event/summerVacation"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/floating03.webp"
              alt="방학특강수강료조회"
            />
          </Link>
        </div>
        {/* <div className="hidden lg:block w-[4rem] mt-[0.5rem] lg:mt-[0.8rem] rounded-full shadow-[-1px_2px_2px_rgba(0,0,0,0.6)]">
          <Link
            href="/support"
            as="/support"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/floating04.webp"
              alt="국비과정조회"
            />
          </Link>
        </div> */}
        <div className="w-[4rem] mt-[0.5rem] lg:mt-[0.8rem]">
          <Link
            href="/cs/consult"
            as="/cs/consult"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/floating01.webp"
              alt="문의하기"
            />
          </Link>
        </div>
      </aside>
    </>
  )
}
