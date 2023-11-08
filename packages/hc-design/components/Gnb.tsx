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
      <ul className="flex items-center w-full px-3 overflow-x-auto overflow-y-hidden text-lg font-bold lg:px-0 lg:w-auto whitespace-nowrap scroll">
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
            SNS이벤트
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="#"
            onClick={handleTest}
            className="py-3 lg:py-0"
          >
            리뉴얼EVENT
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
            EVENT1
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="#"
            onClick={handleTest}
            className="py-3 lg:py-0"
          >
            EVENT2
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="#"
            onClick={handleTest}
            className="py-3 lg:py-0"
          >
            EVENT3
          </Link>
        </li>
        <li className="mx-2">
          <Link
            color="foreground"
            href="#"
            onClick={handleTest}
            className="py-3 lg:py-0"
          >
            EVENT4
          </Link>
        </li>
      </ul>
    </>
  )
}
