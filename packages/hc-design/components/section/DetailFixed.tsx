import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { detailBottomHiddenState } from '@/lib/recoilAtoms'
import RandomNum from '@/components/section/RandomNum'

export default function DetailFixed({ title, description }) {
  const [detailBottomHidden, setDetailBottomHidden] = useRecoilState(
    detailBottomHiddenState,
  )

  useEffect(() => {
    const sectionToHide = document.getElementById('btm_fixed')
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const totalScrollPosition = documentHeight - windowHeight
    const footer = document.getElementById('footer')

    if (sectionToHide && footer) {
      const footerTop = totalScrollPosition - footer.clientHeight

      const handleScroll = () => {
        const currentScroll = window.scrollY

        if (currentScroll >= footerTop) {
          setDetailBottomHidden(true)
        } else {
          setDetailBottomHidden(false)
        }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [setDetailBottomHidden])

  const scrollToConsult = () => {
    const consultSection = document.getElementById('consult')
    if (consultSection) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.clientHeight : 0
      const consultSectionTop =
        consultSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: consultSectionTop - headerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <section
        id="btm_fixed"
        className={`fixed bottom-0 left-0 z-40 w-full py-0 lg:py-3 transition-all ${
          detailBottomHidden ? 'translate-y-32' : ''
        }`}
      >
        <div className="flex items-center justify-center mx-auto w-full lg:max-w-[95%] xl:w-[100rem]  flex-col lg:flex-row">
          <div className="bg-[#222] w-full lg:w-[95%] xl:w-[80%] text-[#aaaaaf] py-3 px-6 flex flex-row relative justify-between lg:rounded-2xl items-center">
            <div className="flex flex-1 lg:items-center flex-col lg:flex-row lg:justify-between lg:pr-[5rem]">
              <p className="flex flex-col justify-center flex-1 w-full overflow-hidden lg:pr-20">
                <strong className="absolute -top-7 left-0 text-base py-1 lg:top-0 lg:bg-transparent lg:text-left lg:py-0 w-full text-center lg:relative bg-[#444] text-[#e6e8eb] line-clamp-1">
                  {title}
                </strong>
                <span className="mt-1 text-sm max-w-[70rem] pr-3">
                  {description}
                </span>
              </p>
              {/* <div className="mt-1 text-sm">
                현재
                <RandomNum />
                남음
              </div> */}
            </div>
            <div className="text-[#aaaaaf]">
              <Button
                onPress={scrollToConsult}
                size="lg"
                variant="flat"
                className="text-white text-base bg-[#c72835] rounded-lg"
              >
                문의해요 👍
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
