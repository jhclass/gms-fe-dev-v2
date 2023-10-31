import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { countdownState } from '@/lib/recoilAtoms'

interface CountdownProps {
  targetDate: Date
}

export default function Countdown({ targetDate }) {
  const [countdown, setCountdown] = useRecoilState(countdownState)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      const timeDifference = targetDate - currentTime

      setCountdown(Math.max(Math.floor(timeDifference / 1000), 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, setCountdown])

  const days = Math.floor(countdown / 86400)
  const hours = Math.floor((countdown % 86400) / 3600)
  const minutes = Math.floor((countdown % 3600) / 60)

  return (
    <>
      <span className="text-[#d3ab7b] bg-black inline-block px-1 ml-1 mr-1 rounded-md">
        {days}일
      </span>
      <span className="text-[#d3ab7b] bg-black inline-block px-1 mr-1 rounded-md">
        {hours}시간
      </span>
      <span className="text-[#d3ab7b] bg-black inline-block px-1 mr-1 rounded-md">
        {minutes}분
      </span>
    </>
  )
}
