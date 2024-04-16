import WideSlider from '@/components/main/WideSlider'
import WideSliderMo from '@/components/main/WideSliderMo'
import { styled } from 'styled-components'
import Curriculum from '@/components/main/Curriculum'
import { Link } from '@nextui-org/react'
import LoopDeco from '@/components/items/LoopDeco'
import BottomSlider from '@/components/main/BottomSlider'

const MainCon = styled.div`
  padding-bottom: 3.5rem;
`
const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;

  > a {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 960px) {
    padding: 0 2rem;
  }
`
const SectionArea = styled.div``
const ItemArea = styled.div`
  @media (max-width: 640px) {
    background: none;
  }
`
const MainBnr = styled.div`
  padding: 8rem 0;

  @media (max-width: 640px) {
    background: none;
    padding: 5rem 0;
  }
`
const MainBtn = styled.div`
  display: none;
  a {
    display: block;
  }
  @media (max-width: 640px) {
    display: block;
  }
`
export default function Home() {
  // const router = useRouter()
  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/detail/motion')
  //   }
  // }, [router])
  return (
    <MainCon>
      <div className="hidden md:block">
        <WideSlider />
      </div>
      <div className="block md:hidden">
        <WideSliderMo></WideSliderMo>
      </div>

      {/* <QuickMenu></QuickMenu> */}

      <LoopDeco />
      <MainBtn>
        <Link href="/cs/curriculum">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_btn01.webp"
            alt="H ACADEMY 전체 과정보기"
          />
        </Link>
        <LoopDeco />
      </MainBtn>

      <SectionArea>
        <Wrap>
          <img
            className="hidden md:block md:mt-[8rem]"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_tit.webp"
            alt="Design&IT / @curriculum"
          />
          <img
            className="block md:hidden mt-[5rem]"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_curr_tit.webp"
            alt="Design&IT / @curriculum"
          />
        </Wrap>
        <LoopDeco />
        <ItemArea>
          <Curriculum />
        </ItemArea>
      </SectionArea>
      <SectionArea>
        <Wrap>
          <img
            className="hidden md:block md:mt-[8rem]"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_tit.webp"
            alt="RealFeedback / @student review"
          />
          <img
            className="block mt-[5rem] md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_revi_tit.webp"
            alt="RealFeedback / @student review"
          />
        </Wrap>
        <LoopDeco />
        <ItemArea>
          <Wrap>
            <img
              className="hidden md:block"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_01.webp"
              alt="후기"
            />
            <img
              className="block md:hidden"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_revi_01.webp"
              alt="후기"
            />
          </Wrap>
        </ItemArea>
      </SectionArea>
      <MainBnr>
        <Wrap>
          <Link href="/support">
            <img
              className="hidden md:block"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bnr01.webp"
              alt="국비지원, 내일배움카드 나도 지원대상인지 궁금하다면? 빠른 확인서비스 이용하기! Click"
            />
            <img
              className="block md:hidden"
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_bnr01.webp"
              alt="국비지원, 내일배움카드 나도 지원대상인지 궁금하다면? 빠른 확인서비스 이용하기! Click"
            />
          </Link>
        </Wrap>
      </MainBnr>

      <SectionArea>
        <Wrap>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom_tit.webp"
            alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_bottom_tit.webp"
            alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
          />
        </Wrap>
        <LoopDeco />
        <ItemArea>
          <div className="relative max-w-[2000px] mx-auto my-0">
            <BottomSlider />
          </div>
        </ItemArea>
      </SectionArea>
    </MainCon>
  )
}
