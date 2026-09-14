import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import {
  alarmsTotalState,
  isScreenState,
  navOpenState,
} from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Footer from '@/components/layout/Footer'
import SubCategory from '@/components/layout/SubCategory'
import { toast } from 'react-toastify'
import ReqToast from '@/components/common/ReqToast'
import { useApolloClient, useQuery } from '@apollo/client'
import { SEE_ALARMS_QUERY, SEE_ALARMS_TOTAL_QUERY } from '@/graphql/queries'
import { useRouter } from 'next/router'
import useMmeQuery from '@/utils/mMe'
import { io } from 'socket.io-client'

const USER_ROOM_JOIN_EVENT = 'joinUserRoom'

const Wrap = styled(motion.div)<{ $navOpen: boolean }>`
  position: relative;
  display: flex;
  min-height: 100vh;
  height: 100%;
  padding: ${props => (props.$navOpen ? '4rem 0 0 18rem;' : '4rem 0 0 5rem;')};
  background-color: ${({ theme }) => theme.colors.mainBG};
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
  min-height: calc(100vh - 4rem);
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
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
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const branchId = useMme('branchId')
  const router = useRouter()
  const apolloClient = useApolloClient()
  const { error, data, refetch } = useQuery(SEE_ALARMS_TOTAL_QUERY)
  const [isScreen, setIsScreen] = useRecoilState(isScreenState)
  const [isMobile, setIsMobile] = useRecoilState(isScreenState)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)
  const [alarmsTotal, setAlarmsTotal] = useRecoilState(alarmsTotalState)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1024
      setIsScreen(isSmall)
      const isMo = window.innerWidth <= 480
      setIsMobile(isMo)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setIsScreen])

  useEffect(() => {
    if (data) {
      setAlarmsTotal(data.seeAlarms.totalCount)
    }
  }, [data])

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

  const syncRealtimeAlarm = async message => {
    const alarmData = message?.data ?? message
    const realtimeAlarm = {
      __typename: 'Alarm',
      id: -Date.now(),
      personalTarget: alarmData?.filterTargetIds ?? [],
      title: alarmData?.alarmTitle ?? '새 알림',
      content: alarmData?.alarmContent ?? '',
      createdAt: String(Date.now()),
    }

    setAlarmsTotal(prevTotal => prevTotal + 1)

    try {
      const variables = { page: 1, limit: 30 }
      const previous = apolloClient.readQuery({
        query: SEE_ALARMS_QUERY,
        variables,
      })

      if (previous?.seeAlarms) {
        apolloClient.writeQuery({
          query: SEE_ALARMS_QUERY,
          variables,
          data: {
            seeAlarms: {
              ...previous.seeAlarms,
              totalCount: (previous.seeAlarms.totalCount ?? 0) + 1,
              data: [realtimeAlarm, ...(previous.seeAlarms.data ?? [])],
            },
          },
        })
      }
    } catch (error) {
      console.log('Alarms cache is not ready yet:', error)
    }

    try {
      const result = await refetch()
      const nextTotal = result?.data?.seeAlarms?.totalCount
      if (typeof nextTotal === 'number') {
        setAlarmsTotal(currentTotal => Math.max(currentTotal, nextTotal))
      }
    } catch (error) {
      console.error('Failed to refresh alarms total:', error)
    }
  }
  useEffect(() => {
    if (!mId) {
      return
    }

    const token = localStorage.getItem('token')
    const socket = io('http://localhost:4001/gms-new-works', {
      path: '/socket.io', // 서버와 동일한 path
      transports: ['websocket'], // WebSocket만 사용
      auth: {
        token: token, // 인증 토큰
      },
    })

    socket.on('connect', () => {
      setStatus('Socket.IO connection opened')
      const roomPayload = { userId: mId, branchId }
      console.log('Socket.IO joinUserRoom emit:', roomPayload)
      socket.emit(USER_ROOM_JOIN_EVENT, roomPayload, response => {
        console.log('Socket.IO joinUserRoom response:', response)
      })
      console.log('Socket.IO connection opened')
    })

    socket.on('NEW_STUDENTSTATE', message => {
      console.log('NEW_STUDENTSTATE message received:', message)
      setMessages(prevMessages => [...prevMessages, message])

      const filterTargetIds =
        message?.data?.filterTargetIds ?? message?.filterTargetIds
      if (!filterTargetIds || filterTargetIds.includes(mId)) {
        toast(<ReqToast messageData={message} />, {
          position: 'bottom-right',
          autoClose: isMobile ? 5000 : 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClick: () => {
            router.push('/consult')
          },
        })

        syncRealtimeAlarm(message)
      }

      sessionStorage.setItem('newTodayState', formattedDate)
      sessionStorage.setItem('newStudentState', 'true')
    })

    socket.on('NEW_STUDENT', message => {
      console.log('NEW_STUDENT message received:', message)
      setMessages(prevMessages => [...prevMessages, message])
      sessionStorage.setItem('newToday', formattedDate)
      sessionStorage.setItem('newStudent', 'true')
      syncRealtimeAlarm(message)
    })

    socket.on('disconnect', () => {
      setStatus('Socket.IO connection closed')
      console.log('Socket.IO connection closed')
    })

    socket.on('connect_error', error => {
      setStatus('Socket.IO connection error')
      console.error('Socket.IO connection error:', error)
    })

    return () => {
      socket.disconnect()
    }
  }, [
    apolloClient,
    branchId,
    formattedDate,
    isMobile,
    mId,
    refetch,
    router,
    setAlarmsTotal,
  ])
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
