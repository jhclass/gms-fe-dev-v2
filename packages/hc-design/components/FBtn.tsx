import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { asideHiddenState, moAsideOpenState } from '@/lib/recoilAtoms'
import { styled } from 'styled-components'

const AsideBox = styled.aside``

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
  return (
    <>
      <aside
        id="aside"
        className={`${
          asideHidden ? 'opacity-0' : 'opacity-100'
        } bottom-[8rem] rounded-s-lg right-[1rem] fixed z-40 lg:py-0 lg:px-0 lg:bg-transparent lg:bottom-28 transition-all`}
      >
        <div className="w-[3.2rem] h-[3.2rem] text-white rounded-full text-2xl/none bg-primary">
          <Link
            href="/consult"
            as="/consult"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/floating01.png"
              alt="상담하기"
            />
          </Link>
        </div>
      </aside>
    </>
  )
}
