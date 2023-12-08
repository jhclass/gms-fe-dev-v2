import { Accordion, AccordionItem, Button, Link } from '@nextui-org/react'
import MainTopBnr from '@/components/main/MainTopBnr'
import Gnb from '@/components/Gnb'
import Menu from '@/components/Menu'
import SearchBox from '@/components/SearchBox'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { headerFixedState, moMenuOpenState } from '@/lib/recoilAtoms'
import { useEffect } from 'react'
import MenuAll from '../MenuAll'

export default function Header() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  const router = useRouter()
  const [moMenuOpen, setmoMenuOpen] = useRecoilState(moMenuOpenState)
  const [headerFixed, setHeaderFixed] = useRecoilState(headerFixedState)

  const handleButtonClick = () => {
    setmoMenuOpen(!moMenuOpen)
  }

  const consultClick = () => {
    router.push('/consult')
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const topBnrTop = document.getElementById('mainTopBnr').clientHeight

      if (currentScroll > topBnrTop) {
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
      <MainTopBnr />
      <header
        id="header"
        className="px-0 m-auto ax-w-full h-[8rem] lg:h-[4.5rem] relative z-[40]"
      >
        <div
          className={`${
            headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'
          } flex-col w-full bg-white max-w-full px-0 border-b-1`}
        >
          <div className="flex wrap items-center justify-between w-full max-w-[1440px] h-[4.5rem] border-b-1 border-primary lg:border-b-0">
            <div className="flex items-center h-full">
              <h1 className="grow-0">
                <Link href="/" className="block w-[10rem] py-3">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/common/hc_logo_2.svg" />
                </Link>
              </h1>
              <div className="items-center hidden h-full px-10 lg:flex">
                <div className="min-w-[5.5rem] relative hidden h-full mr-3 md:hidden lg:block after:w-[1px]">
                  <MenuAll />
                </div>
                <ul className="flex items-center px-3 scroll overflow-x-auto overflow-y-hidden text-lg font-base max-w-[87%] w-auto lg:px-0 whitespace-nowrap scroll_sm">
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="#"
                      onClick={handleTest}
                      className="py-3 lg:py-0"
                    >
                      ⭐BEST 강의 특별전
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="#"
                      onClick={handleTest}
                      className="py-3 lg:py-0"
                    >
                      😍얼리버드할인
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="#"
                      onClick={handleTest}
                      className="py-3 lg:py-0"
                    >
                      🔥타임세일
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="#"
                      onClick={handleTest}
                      className="py-3 lg:py-0"
                    >
                      😍얼리버드할인
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="#"
                      onClick={handleTest}
                      className="py-3 lg:py-0"
                    >
                      🔥타임세일
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-end py-3">
              <Button
                onClick={consultClick}
                variant="flat"
                className="hidden bg-white text-zinc-700 border-1 lg:block border-zinc-700"
              >
                지금 바로 문의하기
              </Button>
              <Link
                href="/consult"
                className="flex items-center justify-center w-10 h-10 mr-2 text-2xl text-white rounded-full lg:hidden bg-primary"
              >
                <i className="xi-call" />
              </Link>
              <button
                className="flex items-center justify-center w-7 h-[3rem] outline-none lg:hidden group tap-highlight-transparent"
                type="button"
                onClick={handleButtonClick}
              >
                <span className="relative w-7 h-[1.5px] bg-black pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:h-full before:absolute before:w-full before:bg-current before:-translate-y-2 before:rotate-0 after:content-[''] after:absolute before:left-0 after:left-0 after:h-full after:w-full after:bg-current after:translate-y-2 after:rotate-0"></span>
              </button>
            </div>
          </div>
          <div className="flex items-center lg:pb-2 lg:wrap h-[3.5rem] lg:hidden">
            <Gnb />
          </div>
        </div>
      </header>
      <Menu />
    </>
  )
}
