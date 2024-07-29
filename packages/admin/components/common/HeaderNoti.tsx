import {
  Button,
  Pagination,
  ScrollShadow,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { styled, useTheme } from 'styled-components'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { SEE_ALARMS_QUERY } from '@/graphql/queries'
import { READ_ALARMS_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { ResultSeeAlarms } from '@/src/generated/graphql'

const NotiBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 2.2rem;

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

  /* &:before {
    bottom: -1.5rem;
    left: 50%;
    margin-left: -0.5rem;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 0.5rem solid #fff;
    border-top: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  } */
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
  background: ${({ theme }) => theme.colors.primary};
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
  right: -9.3rem;
  width: 24rem;
  /* margin-left: -12rem; */
  /* padding-top: 0.7rem; */

  @media screen and (max-width: 1024px) {
    width: 100vw;
    top: 3.9rem;
    right: 0;
    margin-left: 0;
  }
`
const DropBox = styled.div`
  position: relative;
  border: 1px solid #e4e4e7;
  background: #fff;
  border-radius: 0.5rem;
  height: fit-content;
  padding-bottom: 1rem;
`

const FlexBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;
  align-items: center;
`
const Noti = styled.p`
  font-size: 0.8rem;

  span {
    color: red;
  }
`
const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .flexList {
    padding: 0.5rem;
    max-height: 25vh;
    height: 100%;
    @media screen and (max-width: 1024px) {
      max-height: 60vh !important;
    }
  }
`

const NotiItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
  width: 100%;
  height: 55px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #d9e3fa;
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
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  flex: 1;
  text-align: end;
`
const ReqText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.gray};
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
  color: #11181c;

  @media screen and (max-width: 1024px) {
    height: 20vh;
  }
`
type seeAlarmsQuery = {
  seeAlarms: ResultSeeAlarms
}

export default function HeaderNoti({}) {
  const theme = useTheme()
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

  const fetchMoreData = async nextPage => {
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
  }

  useEffect(() => {
    if (isFetching) {
      const nextPage = currentPage + 1
      fetchMoreData(nextPage).finally(() => {
        setIsFetching(false)
      })
    }
  }, [isFetching])

  const handleScroll = async e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching) {
      if (currentPage < Math.ceil(data.seeAlarms.totalCount / currentLimit)) {
        setIsFetching(true)
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
          <i className="xi-bell-o" />
          <NotiNum>{alarms === null ? '0' : data.seeAlarms.totalCount}</NotiNum>
        </NotiBtn>
        {isListOpen && (
          <NotiListBox>
            <DropBox>
              <FlexBox>
                <Noti>
                  <span>*</span> 알람은 30일간 보관 후 삭제처리 됩니다.
                </Noti>
                <Button
                  size="sm"
                  variant="solid"
                  className="text-white bg-accent"
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
                  className="scrollbar_g flexList"
                >
                  {alarms?.length > 0 && (
                    <>
                      {alarms?.map((alarm, index) => (
                        <NotiItem key={index}>
                          <ClickBox>
                            <NotiFlag
                              style={{ background: theme.colors.primary }}
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
                </ScrollShadow>
              </ScrollBox>
            </DropBox>
          </NotiListBox>
        )}
      </NotiBox>
      {/* <SeeRequestMessage isOpen={isOpen} onClose={onClose} /> */}
    </>
  )
}
