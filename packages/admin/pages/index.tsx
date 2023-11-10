import Header from '@/components/Header'
import Nav from '@/components/Nav'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 4rem 0 0 18rem;
  background-color: #d6e4f1;
`
export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <Nav />
      </Container>
    </>
  )
}
