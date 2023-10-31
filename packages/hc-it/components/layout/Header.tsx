import { Accordion, AccordionItem, Button, Link } from '@nextui-org/react'
import MainTopBnr from '@/components/main/MainTopBnr'
import Gnb from '@/components/Gnb'
import Menu from '@/components/Menu'
import SearchBox from '@/components/SearchBox'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { headerFixedState, moMenuOpenState } from '@/lib/recoilAtoms'
import { useEffect } from 'react'

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
        className="px-0 m-auto ax-w-full h-[10rem] relative z-[40]"
      >
        <div
          className={`${
            headerFixed ? 'fixed top-0 left-0 z-40' : 'relative'
          } flex-col w-full bg-white max-w-full px-0 border-b-1`}
        >
          <div className="w-full bg-[#27272E] h-[2.5rem]">
            <ul className="flex items-center h-full text-lg wrap">
              <li className="min-w-[4.5rem] h-full cursor-pointer border-x-1 border-slate-400 bg-primary">
                <Link
                  href="/"
                  className="block w-full h-full text-lg text-center px-2 py-1.5 text-white"
                >
                  IT
                </Link>
              </li>
              <li className="min-w-[4.5rem] h-full cursor-pointer border-r-1 border-slate-400">
                <Link
                  href="/"
                  onClick={handleTest}
                  className="block w-full text-lg h-full text-center px-2 py-1.5 text-white"
                >
                  그래픽
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex wrap items-center justify-between w-full max-w-[1440px] h-[4.5rem] border-b-1 border-primary py-3 lg:border-b-0">
            <div className="flex items-center">
              <h1 className="mr-10 grow-0">
                <Link href="/" className="block w-[10rem]">
                  <img src="/src/images/hc_logo_2.svg" />
                </Link>
              </h1>
              <SearchBox />
            </div>
            <div className="flex items-center justify-end">
              <Button
                onClick={consultClick}
                variant="flat"
                className="hidden text-white lg:block bg-zinc-700"
              >
                온라인 상담
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
          <div className="flex items-center lg:pb-2 lg:wrap h-[3.5rem]">
            <Gnb />
          </div>
        </div>
      </header>
      <Menu />
    </>
  )
}
