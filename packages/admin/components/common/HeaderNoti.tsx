import {
  Button,
  Pagination,
  ScrollShadow,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { SEE_ALARMS_QUERY } from '@/graphql/queries'
import { READ_ALARMS_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { ResultSeeAlarms } from '@/src/generated/graphql'

const NotiBtn = styled.button`
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;

  @media screen and (max-width: 1024px) {
    width: 2rem;
    height: 2rem;
  }

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    left: 3.1rem;
    margin-top: -0.75rem;
    background: #d4d4d8;
    transition: 0.3s;
  }
`

const NotiNum = styled.span`
  display: flex;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  background: #007de9;
  font-size: 0.8rem;
  color: #fff;
  line-height: 1rem;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    width: 1rem;
    height: 1rem;
    right: 0;
    top: 0;
    font-size: 0.7rem;
  }
`
const NotiBox = styled.div`
  position: relative;
  @media screen and (max-width: 1024px) {
    position: unset;
  }
`
const NotiListBox = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  width: 20rem;
  margin-left: -10rem;
  border: 1px solid #e4e4e7;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem;
  height: fit-content;
  padding-bottom: 1rem;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    top: 3.9rem;
    left: 0;
    margin-left: 0;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 0.5rem;
`
const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  max-height: 20vh;
  @media screen and (max-width: 1024px) {
    height: 60vh;
    max-height: 60vh;
  }
`
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
  overflow: auto;
`
const NotiItem = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  height: 55px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
  padding-right: 0.5rem;

  &.read {
    background: #ccc;
  }
`

const NotiFlag = styled.span`
  display: block;
  width: 0.5rem;
  height: 100%;
  background: #222;
`
const ClickBox = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`
const ReqBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: calc(100% - 1rem);
  padding: 0.3rem 0;
`
const NotiClose = styled.button`
  display: block;
  width: 5%;
  height: 100%;
`
const ReqTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`
const FromID = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #171717;
  font-weight: 700;
  font-size: 0.875rem;
  flex: 1;
`
const AlarmsTime = styled.p`
  color: #71717a;
  font-size: 0.875rem;
  flex: 1;
  text-align: end;
`
const ReqText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #71717a;
  font-size: 0.875rem;
`
const PagerWrap = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
`

const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 2rem;
  color: #fff;
  @media screen and (max-width: 1024px) {
    height: 20vh;
  }
`
type seeAlarmsQuery = {
  seeAlarms: ResultSeeAlarms
}

export default function HeaderNoti({}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(30)
  const [isListOpen, setIsListOpen] = useState(false)
  const { userLogs } = useUserLogsMutation()
  const { error, data, fetchMore, refetch } = useSuspenseQuery<seeAlarmsQuery>(
    SEE_ALARMS_QUERY,
    {
      variables: {
        page: 1,
        limit: currentLimit,
      },
    },
  )
  const [alarms, setAlarms] = useState([])
  const [readAlarms] = useMutation(READ_ALARMS_MUTATION)
  const [isFetching, setIsFetching] = useState(false)
  const notiBoxRef = useRef(null)

  const handleClickOutside = event => {
    if (notiBoxRef.current && !notiBoxRef.current.contains(event.target)) {
      setIsListOpen(false)
    }
  }

  useEffect(() => {
    if (data && data.seeAlarms) {
      setAlarms(data.seeAlarms.data)
    }
  }, [data])

  useEffect(() => {
    if (isListOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      setCurrentPage(1)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isListOpen])

  const handleScroll = async e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching) {
      if (currentPage < Math.ceil(data.seeAlarms.totalCount / currentLimit)) {
        setIsFetching(true)
        try {
          const nextPage = currentPage + 1
          await fetchMore({
            variables: { page: nextPage },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult

              const newAlarms = [
                ...prevResult.seeAlarms.data,
                ...fetchMoreResult.seeAlarms.data,
              ]

              setAlarms(newAlarms)

              return {
                ...prevResult,
                seeAlarms: {
                  ...prevResult.seeAlarms,
                  data: newAlarms,
                  totalCount: fetchMoreResult.seeAlarms.totalCount,
                },
              }
            },
          })

          setCurrentPage(nextPage)
        } finally {
          setIsFetching(false)
        }
      }
    }
  }

  const clickReadAll = () => {
    const readAll = confirm('모두 읽음 처리하시겠습니까?')
    if (readAll) {
      readAlarms({
        variables: {
          all: 'Y',
        },
        onCompleted: result => {
          if (result.readAlarms.ok) {
            refetch()
            userLogs('알람 모두 읽음 처리')
            alert('모두 읽음 처리 하였습니다.')
          }
        },
      })
    }
  }

  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}`
    return formatted
  }
  return (
    <>
      <NotiBox ref={notiBoxRef}>
        <NotiBtn onClick={() => setIsListOpen(!isListOpen)}>
          <img
            src="https://highclass-image.s3.amazonaws.com/admin/icon/ico_noti.webp"
            alt="알림"
          />
          <NotiNum>{alarms === null ? '0' : data.seeAlarms.totalCount}</NotiNum>
        </NotiBtn>
        {isListOpen && (
          <NotiListBox>
            <FlexBox>
              <Button
                size="sm"
                variant="solid"
                className="bg-[#ff5900] text-white"
                onClick={clickReadAll}
              >
                <p className="text-[1rem]">
                  <i className="xi-trash"></i>
                </p>
                모두 읽음
              </Button>
            </FlexBox>
            <ScrollBox>
              <ScrollShadow
                onScroll={handleScroll}
                orientation="vertical"
                className="scrollbar"
              >
                <ListBox>
                  {alarms?.length > 0 && (
                    <>
                      {alarms?.map((alarm, index) => (
                        <NotiItem key={index}>
                          <ClickBox>
                            <NotiFlag
                              style={{ background: '#07bbae' }}
                            ></NotiFlag>
                            <ReqBox>
                              <ReqTop>
                                <FromID>{alarm.title}</FromID>
                                <AlarmsTime>
                                  {formatDate(alarm.createdAt)}
                                </AlarmsTime>
                              </ReqTop>
                              <ReqText>{alarm.content}</ReqText>
                            </ReqBox>
                          </ClickBox>
                        </NotiItem>
                      ))}
                      {/* <NotiItem key={index}>
                      <ClickBox onClick={onOpen}>
                        <NotiFlag style={{ background: 'blue' }}></NotiFlag>
                        <ReqBox>
                          <FromID>{alarm.title}</FromID>
                          <ReqText>{alarm.content}</ReqText>
                        </ReqBox>
                      </ClickBox>
                      <NotiClose>
                        <i className="xi-close-circle" />
                      </NotiClose>
                    </NotiItem> */}
                    </>
                  )}
                  {(alarms?.length === 0 || alarms === null) && (
                    <Nolist>알람이 없습니다.</Nolist>
                  )}
                </ListBox>
              </ScrollShadow>
            </ScrollBox>
          </NotiListBox>
        )}
      </NotiBox>
      {/* <SeeRequestMessage isOpen={isOpen} onClose={onClose} /> */}
    </>
  )
}
