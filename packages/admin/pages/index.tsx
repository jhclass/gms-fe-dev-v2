import NewConsultNum from '@/components/dashboard/NewConsultNum'
import ConsultNum from '@/components/dashboard/ConsultNum'
import Layout from '@/components/wrappers/MainWrap'
import styled from 'styled-components'
import NewConsultMonthNum from '@/components/dashboard/NewConsultMonthNum '
import AdviceType from '@/components/dashboard/AdviceType'
import ReceiptDiv from '@/components/dashboard/ReceiptDiv'
import { useAuthRedirect } from '@/utils/useAuthRedirect'

const HomeArea = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 1rem;

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    grid-auto-rows: 0.5rem;
    div {
      @media screen and (max-width: 1140px) {
        grid-row-end: span 5;
      }
    }
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, minmax(100%, 1fr));
    grid-auto-rows: unset;
    div {
      @media screen and (max-width: 1140px) {
        grid-row-end: unset;
      }
    }
  }
`

export default function Home() {
  const isCheckingLogin = useAuthRedirect()
  if (isCheckingLogin) {
    return null
  }

  return (
    <>
      <Layout>
        <HomeArea>
          <div>
            <NewConsultNum />
          </div>
          <div>
            <NewConsultMonthNum />
          </div>
          <div>
            <ConsultNum />
          </div>
          <div>
            <AdviceType />
          </div>
          <div>
            <ReceiptDiv />
          </div>
        </HomeArea>
      </Layout>
    </>
  )
}
