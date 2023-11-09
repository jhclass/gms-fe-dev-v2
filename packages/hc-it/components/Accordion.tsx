import React from 'react'
import { moCateOpenState, moMenuOpenState } from '@/lib/recoilAtoms'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import router from 'next/router'

export default function Accordion({
  item,
  index,
}: {
  item: any
  index: number
}) {
  const [moCateOpen, setMoCateOpen] = useRecoilState(moCateOpenState)
  const [, setmoMenuOpen] = useRecoilState(moMenuOpenState)
  const toggleCate = () => {
    let openCate
    if (moCateOpen.cateNum === index) {
      openCate = {
        cateNum: index,
        cateOpen: !moCateOpen.cateOpen,
      }
    } else {
      openCate = {
        cateNum: index,
        cateOpen: true,
      }
    }
    setMoCateOpen(openCate)
  }
  const clickMenu = () => {
    setmoMenuOpen(false)
  }

  return (
    <>
      <div key={index}>
        <h5
          className={`${
            moCateOpen.cateNum === index && moCateOpen.cateOpen
              ? 'before:rotate-0 before:opacity-0 '
              : 'before:rotate-90 before:opacity-100'
          } text-xl font-bold border-b-1 relative pl-[1rem] pr-[3rem] w-full h-full py-4 outline-none tap-highlight-transparent after:absolute after:w-4 after:h-[1px] after:bg-zinc-600 after:top-[50%] after:right-[1rem] before:absolute before:w-4 before:h-[1px] before:bg-zinc-600 before:top-[50%] before:right-[1rem] before:transition-all ease-in-out`}
          onClick={toggleCate}
        >
          {item.title}
        </h5>
        <ul
          className={`${
            moCateOpen.cateNum === index && moCateOpen.cateOpen
              ? 'h-full py-3'
              : 'h-0'
          } w-full bg-zinc-100 transition-all ease-in-out`}
        >
          {item.list.map((list: any, subIndex: number) => (
            <li
              key={subIndex}
              className={`${
                moCateOpen.cateNum === index && moCateOpen.cateOpen
                  ? 'h-full block'
                  : 'h-0 hidden'
              } py-3 text-lg text-black px-7`}
            >
              <Link href={list.link} onClick={clickMenu}>
                {list.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
