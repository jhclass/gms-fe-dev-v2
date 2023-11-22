import {
  detailTopbnrFixedState,
  detailTopbnrHiddenState,
} from '@/lib/recoilAtoms'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function TopBnr() {
  const [detailTopbnrFixed, setDetailTopbnrFixed] = useRecoilState(
    detailTopbnrFixedState,
  )
  const [detailTopbnrHidden, setDetailTopbnrHidden] = useRecoilState(
    detailTopbnrHiddenState,
  )

  const datailTopBnrClick = () => {
    setDetailTopbnrHidden(!detailTopbnrHidden)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const topBnrTop = document.getElementById('mainTopBnr').clientHeight

      if (currentScroll > topBnrTop) {
        setDetailTopbnrFixed(true)
      } else {
        setDetailTopbnrFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        id="topBnr"
        className={`${detailTopbnrHidden ? 'hidden' : 'block'} h-[9rem]`}
      >
        <div
          className={`${
            detailTopbnrFixed
              ? 'fixed top-[8rem] lg:top-[4.5rem] left-0 z-[39]'
              : 'relative'
          } flex w-full items-center justify-center overflow-hidden bg-[#eee] isolate gap-x-6 h-[9rem]`}
        >
          <div className="flex flex-wrap items-center justify-center pr-12 lg:pr-0 flex-3 gap-x-4 gap-y-2 wrap">
            <Link href="">
              <img
                src="/src/images/topbnr.webp"
                alt="topbnr"
                className="h-full"
              />
            </Link>
          </div>
          <div className="flex justify-end absolute right-2 top-[50%] -mt-[1.5rem]">
            <button
              type="button"
              onClick={datailTopBnrClick}
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <i className="text-5xl text-black xi-close-min" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
