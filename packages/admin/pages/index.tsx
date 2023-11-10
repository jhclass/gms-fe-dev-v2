import Header from '@/components/Header'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Nav = styled.nav`
  font-size: 2rem;
  color: #333;
`

const Button = tw.button`
  bg-zinc-300 p-2 inline-flex items-center
  hover:bg-primary
`

export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <Nav></Nav>
      </Container>
    </>
  )
}
