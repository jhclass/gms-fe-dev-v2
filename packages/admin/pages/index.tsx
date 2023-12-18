import NewConsultNum from '@/components/dashboard/NewConsultNum'
import ConsultNum from '@/components/dashboard/ConsultNum'
import Layout from '@/components/wrappers/MainWrap'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import NewConsultMonthNum from '@/components/dashboard/NewConsultMonthNum '

const Wrap = styled(motion.div)<{ $navOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: ${props => (props.$navOpen ? '4rem 0 0 18rem;' : '4rem 0 0 5rem;')};
  background-color: #d6e4f1;

  @media screen and (max-width: 1024px) {
    padding: 4rem 0 0 0;
  }
`
const HomeArea = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, minmax(320px, 1fr));
  gap: 1rem;

  @media screen and (max-width: 1695px) {
    grid-template-columns: repeat(3, minmax(320px, 1fr));
  }

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, minmax(320px, 1fr));
  }
`

export default function Home() {
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
        </HomeArea>
      </Layout>
    </>
  )
}
