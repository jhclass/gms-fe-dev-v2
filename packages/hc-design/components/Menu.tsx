import React from 'react'
import { moMenuOpenState } from '@/lib/recoilAtoms'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import Accordion from '@/components/Accordion'

export default function Menu() {
  const [moMenuOpen, setmoMenuOpen] = useRecoilState(moMenuOpenState)

  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  const handleButtonClick = () => {
    setmoMenuOpen(!moMenuOpen)
  }

  const menu = [
    {
      title: '프론트엔드',
      list: [
        {
          title: '프론트엔드1',
          link: '/detail',
        },
        {
          title: '프론트엔드2',
          link: '/detail',
        },
        {
          title: '프론트엔드3',
          link: '/detail',
        },
        {
          title: '프론트엔드4',
          link: '/detail',
        },
        {
          title: '프론트엔드5',
          link: '/detail',
        },
      ],
    },
    {
      title: '백엔드',
      list: [
        {
          title: '백엔드1',
          link: '/detail',
        },
        {
          title: '백엔드2',
          link: '/detail',
        },
        {
          title: '백엔드3',
          link: '/detail',
        },
        {
          title: '백엔드4',
          link: '/detail',
        },
        {
          title: '백엔드5',
          link: '/detail',
        },
      ],
    },
  ]

  return (
    <>
      <div
        className={`${
          moMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-150 ease-in-out fixed flex justify-end top-0 right-0 w-full h-[100%] z-50`}
      >
        <div className="w-[90%] h-full bg-white">
          <div className="px-3 items-center justify-between flex h-[5rem] bg-white">
            <Link href="#" className="flex items-center">
              <span className="mr-1 text-5xl text-primary">
                <i className="xi-profile" />
              </span>
              <span className="text-xl font-bold text-black">로그인</span>
            </Link>
            <button
              className="flex items-center justify-center w-6 h-full outline-none group rounded-small tap-highlight-transparent"
              type="button"
              onClick={handleButtonClick}
            >
              <span className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:block before:h-px before:w-6 before:bg-current before:translate-y-px before:rotate-45 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:translate-y-0 after:-rotate-45"></span>
            </button>
          </div>
          <ul className="items-center text-center justify-between flex h-[4rem] border-b-1 border-t-1">
            <li className="w-1/2 h-full bg-white">
              <Link
                href="/consult"
                className="block w-full h-full text-lg/[4rem] font-bold text-primary"
              >
                상담신청
              </Link>
            </li>
            <li className="w-1/2 h-full bg-primary">
              <Link
                href="#"
                onClick={handleTest}
                className="block w-full h-full text-lg/[4rem] font-bold text-white"
              >
                고객센터
              </Link>
            </li>
          </ul>
          <div className="h-[calc(100%-4rem)]">
            {menu.map((item, index) => (
              <Accordion key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${
          moMenuOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-[100%] bg-black/80 z-[49]`}
      ></div>
    </>
  )
}
