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
                <Link href="/" className="block w-[12rem]">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/common/H_logo.svg"
                    alt="H ACADEMY | H아카데미"
                  />
                </Link>
              </h1>
              <div className="items-center hidden h-full px-10 lg:flex">
                <ul className="flex items-center px-3 text-lg font-base lg:px-0 whitespace-nowrap scroll_sm">
                  <li className="relative mr-3 after:w-[1px] after:h-[6px] after:bg-zinc-500 after:absolute after:top-[50%] after:mt-[-3px] after:right-[-0.75rem]">
                    <Link
                      color="foreground"
                      href="/detail/webtoon"
                      className="py-3 lg:py-0"
                    >
                      🖌️ 웹툰
                    </Link>
                  </li>
                  <li className="relative mx-3 after:w-[1px] after:h-[6px] after:bg-zinc-500 after:absolute after:top-[50%] after:mt-[-3px] after:right-[-0.75rem]">
                    <Link
                      color="foreground"
                      href="/detail/emoticon"
                      className="py-3 lg:py-0"
                    >
                      😍 이모티콘
                    </Link>
                  </li>
                  <li className="mx-3">
                    <Link
                      color="foreground"
                      href="/detail/motion"
                      className="py-3 lg:py-0"
                    >
                      🏃 모션
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <div className="items-center hidden h-full px-10 lg:flex">
                <div className="min-w-[5.5rem] relative hidden h-full mr-3 md:hidden lg:block after:w-[1px]">
                  <MenuAll />
                </div>
                <ul className="flex items-center px-3 scroll overflow-x-auto overflow-y-hidden text-lg font-base max-w-[87%] w-auto lg:px-0 whitespace-nowrap scroll_sm">
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="/detail/webtoon"
                      className="py-3 lg:py-0"
                    >
                      🖌️웹툰
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="/detail/emoticon"
                      className="py-3 lg:py-0"
                    >
                      😍이모티콘
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link
                      color="foreground"
                      href="/detail/motion"
                      className="py-3 lg:py-0"
                    >
                      🖥️모션
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="flex items-center justify-end py-3">
              <Button
                onClick={consultClick}
                variant="flat"
                className="hidden text-white bg-primary border-1 lg:block border-primary"
              >
                <i className="pr-2 xi-call" />
                지금 바로 문의하기
              </Button>
              <Link
                href="/consult"
                className="flex items-center justify-center w-10 h-10 text-2xl text-white rounded-full lg:hidden bg-primary"
              >
                <i className="xi-call" />
              </Link>
              {/* <button
                className="flex items-center ml-2 justify-center w-7 h-[3rem] outline-none lg:hidden group tap-highlight-transparent"
                type="button"
                onClick={handleButtonClick}
              > */}
              {/* <span className="relative w-7 h-[1.5px] bg-black pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:h-full before:absolute before:w-full before:bg-current before:-translate-y-2 before:rotate-0 after:content-[''] after:absolute before:left-0 after:left-0 after:h-full after:w-full after:bg-current after:translate-y-2 after:rotate-0"></span>
              </button> */}
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
