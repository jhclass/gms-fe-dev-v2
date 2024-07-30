import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import { isScreenState, navOpenState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import CheckToken from '@/components/wrappers/CheckToken'
import { useEffect, useState } from 'react'
import Footer from '@/components/layout/Footer'
import { ScrollShadow } from '@nextui-org/react'
import SubCategory from '../layout/SubCategory'

const Wrap = styled(motion.div)<{ $navOpen: boolean }>`
  position: relative;
  display: flex;
  min-height: 100vh;
  height: 100%;
  padding: ${props => (props.$navOpen ? '4rem 0 0 18rem;' : '4rem 0 0 5rem;')};
  background-color: #d6e4f1;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding: 4rem 0 0 0;
  }
`
const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 7rem);

  @media screen and (max-width: 1024px) {
    min-height: calc(100vh - 6rem);
  }
`
const ConBox = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;

  @media screen and (max-width: 1024px) {
    padding: 1.5rem 1rem;
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
  }, [isScreen, setNavOpen])

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day,
  ).padStart(2, '0')}`
  //socketTest
  const [status, setStatus] = useState('Connecting...')
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const [reconnectInterval, setReconnectInterval] = useState(1000) // 초기 재연결 간격 (1초)
  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log('token:', token)
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URI}${token}`)

    ws.onopen = () => {
      setStatus('WebSocket connection opened')
      console.log('WebSocket connection opened')
      ws.send('클라이언트에서 서버로 메시지 전송')
    }

    ws.onmessage = event => {
      try {
        const message = JSON.parse(event.data)
        console.log('Message from server:', message)

        if (message.type === 'NEW_STUDENTSTATE') {
          setMessages(prevMessages => [...prevMessages, message.data])
          console.log('NEW_STUDENTSTATE message received:', message.data)
          sessionStorage.setItem('newTodayState', formattedDate)
          sessionStorage.setItem('newStudentState', 'true')
        }

        if (message.type === 'NEW_STUDENT') {
          setMessages(prevMessages => [...prevMessages, message.data])
          console.log('NEW_STUDENT message received:', message.data)
          sessionStorage.setItem('newToday', formattedDate)
          sessionStorage.setItem('newStudent', 'true')
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
    ws.onclose = () => {
      setStatus('WebSocket connection closed')
      console.log('WebSocket connection closed')
    }

    ws.onerror = error => {
      setStatus('WebSocket error')
      console.log('WebSocket error:', error)
    }

    return () => {
      ws.close()
    }
  }, [])
  //socketTest
  return (
    <>
      <Wrap $navOpen={navOpen}>
        <Header />
        <Nav />
        <ContainerWrap>
          <SubCategory />
          <Container>
            <ConBox>{children}</ConBox>
            <Footer />
          </Container>
        </ContainerWrap>
      </Wrap>
    </>
  )
}
