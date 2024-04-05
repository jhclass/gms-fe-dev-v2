import WideSlider from '@/components/main/WideSlider'
import WideSliderMo from '@/components/main/WideSliderMo'
import QuickMenu from '@/components/main/QuickMenu'
import { styled } from 'styled-components'
import Curriculum from '@/components/main/Curriculum'
import Review from '@/components/main/Review'
import { Link } from '@nextui-org/react'

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
  padding: 3.5rem 0;
  background: #0e0053;
  @media (max-width: 640px) {
    background: none;
  }
`
const MainBnr = styled.div`
  padding-bottom: 3.5rem;
  background: #0e0053;
  @media (max-width: 640px) {
    background: none;
  }
`
const MainBtn = styled.div`
  display: none;
  margin: 2rem 0 4rem;
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

      <QuickMenu></QuickMenu>
      <MainBtn>
        <Link>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/btn/mo/main_btn01.webp"
            alt="전체 과정(컨텐츠) 보기"
          />
        </Link>
      </MainBtn>
      <SectionArea>
        <Wrap>
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_bnr02.webp"
            alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
          />
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_tit.webp"
            alt="Design&IT / @curriculum"
          />
        </Wrap>
        <ItemArea>
          <Curriculum />
        </ItemArea>
      </SectionArea>
      <img
        className="block mb-20 md:hidden"
        src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_deco01.webp"
      />
      <SectionArea>
        <Wrap>
          <img
            className="hidden md:block"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_tit.webp"
            alt="RealFeedback / @student review"
          />
          <img
            className="block md:hidden"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_revi_tit.webp"
            alt="RealFeedback / @student review"
          />
        </Wrap>
        <ItemArea>
          <Review />
        </ItemArea>
      </SectionArea>
      <img
        className="block mb-20 md:hidden"
        src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_deco02.webp"
      />
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
        <Wrap className="hidden md:block">
          <Link>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom.webp"
              alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
            />
          </Link>
        </Wrap>
        <img
          className="block md:hidden"
          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/mo/main_bottom.webp"
          alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
        />
      </SectionArea>
    </MainCon>
  )
}
