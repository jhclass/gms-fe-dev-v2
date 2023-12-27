import React from 'react'
import MenuAll from './MenuAll'
import Link from 'next/link'

export default function Gnb() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }

  return (
    <>
      {/* <div className="hidden mr-3 md:hidden lg:block">
        <MenuAll />
      </div> */}
      {/* <ul className="flex items-center w-full px-3 overflow-x-auto overflow-y-hidden text-lg font-bold lg:px-0 lg:w-auto whitespace-nowrap scroll">
        <li className="mx-2">
          <Link
            color="foreground"
            href="/detail/webtoon"
            className="py-3 lg:py-0"
          >
            🖌️ 웹툰
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="/detail/emoticon"
            className="py-3 lg:py-0"
          >
            😍 이모티콘
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="/detail/motion"
            className="py-3 lg:py-0"
          >
            🖥️ 모션
          </Link>
        </li>
      </ul> */}
      <ul className="flex items-center w-full px-3 text-lg font-bold lg:px-0 lg:w-auto">
        <li className="relative mx-3 after:w-[1px] after:h-[6px] after:bg-zinc-500 after:absolute after:top-[50%] after:mt-[-3px] after:right-[-0.75rem]">
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
            🖥️ 모션
          </Link>
        </li>
      </ul>
    </>
  )
}
