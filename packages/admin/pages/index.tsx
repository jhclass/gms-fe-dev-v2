import Layout from '@/components/wrappers/MainWrap'
import { navOpenState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

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
export default function Home() {
  const [navOpen] = useRecoilState(navOpenState)

  return (
    <>
      <Layout>
        <p>대시보드</p>
      </Layout>
    </>
  )
}
