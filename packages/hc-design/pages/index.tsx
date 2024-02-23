import WideSlider from '@/components/main/WideSlider'
import QuickMenu from '@/components/main/QuickMenu'
import { styled } from 'styled-components'
import Curriculum from '@/components/main/Curriculum'
import Review from '@/components/main/Review'
import { Link } from '@nextui-org/react'
const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`
const SectionArea = styled.div``
const ItemArea = styled.div`
  padding: 3.5rem 0;
  background: #0e0053;
`
const MainBnr = styled.div`
  padding-bottom: 3.5rem;
  background: #0e0053;
`
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
      <QuickMenu></QuickMenu>
      <SectionArea>
        <Wrap>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_curr_tit.png"
            alt="Design&IT / @curriculum"
          />
        </Wrap>
        <ItemArea>
          <Curriculum />
        </ItemArea>
      </SectionArea>
      <SectionArea>
        <Wrap>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_revi_tit.png"
            alt="RealFeedback / @student review"
          />
        </Wrap>
        <ItemArea>
          <Review />
        </ItemArea>
      </SectionArea>
      <MainBnr>
        <Wrap>
          <Link>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bnr01.png"
              alt="국비지원, 내일배움카드 나도 지원대상인지 궁금하다면? 빠른 확인서비스 이용하기! Click"
            />
          </Link>
        </Wrap>
      </MainBnr>
      <SectionArea>
        <Wrap>
          <Link>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom.png"
              alt="@CREATIVE FACILITY / 수강생의 학습능률을 위한, 쾌적한 시설과 환경을 제공합니다."
            />
          </Link>
        </Wrap>
      </SectionArea>
    </>
  )
}
