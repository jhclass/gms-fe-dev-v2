import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`

const Button = styled.button`
  background-color: red;
  color: #fff;
  padding: 0.5rem 1rem;a
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
export default function Header() {
  return (
    <>
      <Container></Container>
    </>
  )
}
