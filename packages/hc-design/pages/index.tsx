import WideSlider from '@/components/main/WideSlider'
import Ranking from '@/components/main/Ranking'
import New from '@/components/main/New'
import MainBnr from '@/components/main/MainBnr'
import Bnr from '@/components/main/Bnr'
import CateList from '@/components/main/CateList'
import Info from '@/components/main/Info'
import Form from '@/components/Form'
import QuickMenu from '@/components/main/QuickMenu'
import Coming from '@/components/main/Coming'
import MainPortfolio from '@/components/main/MainPortfolio'
import MainReview from '@/components/main/MainReview'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  // const router = useRouter()
  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/detail/motion')
  //   }
  // }, [router])
  return (
    <>
      <WideSlider />
      {/* <div className="hidden border-b lg:block">
        <QuickMenu />
      </div> */}
      {/* <div className="mt-16">
        <New />
      </div>
      <div className="mt-16">∂∂∂
        <Bnr />
      </div> */}
      <div className="mt-16">
        <Ranking />
      </div>
      {/*
      <div className="py-16 mt-10 bg-zinc-200">
        <MainBnr />
      </div>
      <div className="py-16 bg-zinc-800">
        <MainReview />
      </div>
      <div className="mt-16">
        <CateList cate={'근로자'} slideNo={1} />
      </div>
      <div className="mt-16">
        <CateList cate={'실업자'} slideNo={2} />
      </div>
      <div className="py-10 mt-10 bg-zinc-700">
        <Coming />
      </div>
      <div className="py-16 bg-zinc-200">
        <MainPortfolio />
      </div> */}
      <div className="py-16">
        <Info />
      </div>
    </>
  )
}
