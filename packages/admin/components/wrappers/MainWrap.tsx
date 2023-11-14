import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
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
const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: none;

  @media screen and (max-width: 1024px) {
    padding: 1rem;
  }
`

export default function MainWrap({ children }) {
  const [navOpen] = useRecoilState(navOpenState)

  return (
    <>
      <Wrap $navOpen={navOpen}>
        <Header />
        <Nav />
        <Container>{children}</Container>
      </Wrap>
    </>
  )
}
