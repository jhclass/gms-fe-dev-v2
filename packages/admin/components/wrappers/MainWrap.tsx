import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import { isScreenState, navOpenState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import WithAuth from '@/components/wrappers/WithAuth'
import { useEffect } from 'react'

const Wrap = styled(motion.div)<{ $navOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
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
  const [isScreen, setIsScreen] = useRecoilState(isScreenState)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1024
      setIsScreen(isSmall)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setIsScreen])

  useEffect(() => {
    if (isScreen) {
      setNavOpen(false)
    }
  }, [setNavOpen])

  return (
    <>
      <WithAuth>
        <Wrap $navOpen={navOpen}>
          <Header />
          <Nav />
          <Container>{children}</Container>
        </Wrap>
      </WithAuth>
    </>
  )
}
