import React, { useEffect, useState } from 'react'

export default function RandomNum() {
  const [randomNum, setRandomNum] = useState(0)
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  useEffect(() => setRandomNum(getRandomNumber(1, 5)), [])

  return (
    <>
      <span className="text-[#d3ab7b] bg-black inline-block px-1 mx-1 rounded-md">
        {randomNum} 자리
      </span>
    </>
  )
}
