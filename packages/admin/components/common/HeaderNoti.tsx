import {
  Button,
  Pagination,
  ScrollShadow,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import SeeRequestMessage from '@/components/modal/SeeRequestMessage'
import { useLazyQuery, useMutation } from '@apollo/client'
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
`
const NotiListBox = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  width: 20rem;
  margin-left: -10rem;
  border: 1px solid #e4e4e7;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.5rem;
  height: fit-content;

  @media screen and (max-width: 1024px) {
    width: 70vw;
    left: auto;
    right: 0;
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
`
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
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
  width: calc(95% - 0.5rem);
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
const FromID = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #171717;
  font-weight: 700;
  font-size: 0.875rem;
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
  padding: 2rem 0;
  color: #fff;
`
type seeAlarmsQuery = {
  seeAlarms: ResultSeeAlarms
}

export default function HeaderNoti({}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(30)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isListOpen, setIsListOpen] = useState(false)
  const { userLogs } = useUserLogsMutation()
  const [seeAlarms, { data }] = useLazyQuery<seeAlarmsQuery>(SEE_ALARMS_QUERY)
  const [readAlarms] = useMutation(READ_ALARMS_MUTATION)

  const notiBoxRef = useRef(null)

  const handleClickOutside = event => {
    if (notiBoxRef.current && !notiBoxRef.current.contains(event.target)) {
      setIsListOpen(false)
    }
  }

  useEffect(() => {
    if (isListOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isListOpen])

  useEffect(() => {
    if (isListOpen) {
      seeAlarms({
        variables: {
          limit: currentLimit,
          page: currentPage,
        },
      })
    }
  }, [isListOpen, currentPage])

  const clickReadAll = () => {
    const readAll = confirm('모두 읽음 처리하시겠습니까?')
    if (readAll) {
      readAlarms({
        variables: {
          all: 'Y',
        },
        refetchQueries: [SEE_ALARMS_QUERY],
        onCompleted: result => {
          if (result.readAlarms.ok) {
            userLogs('알람 모두 읽음 처리')
            alert('모두 읽음 처리 하였습니다.')
          }
        },
      })
    }
  }

  const clickRead = id => {
    const readAlarm = confirm('읽음 처리하시겠습니까?')
    if (readAlarm) {
      readAlarms({
        variables: {
          readAlarmsId: id,
        },
        refetchQueries: [SEE_ALARMS_QUERY],
        onCompleted: result => {
          if (result.readAlarms.ok) {
            userLogs(`알람ID : ${id} 읽음 처리`)
            alert('읽음 처리 하였습니다.')
          }
        },
      })
    }
  }

  return (
    <>
      <NotiBox ref={notiBoxRef}>
        <NotiBtn onClick={() => setIsListOpen(!isListOpen)}>
          <img
            src="https://highclass-image.s3.amazonaws.com/admin/icon/ico_noti.webp"
            alt="알림"
          />
          <NotiNum>0</NotiNum>
        </NotiBtn>
        {isListOpen && (
          <>
            {data && (
              <NotiListBox>
                <FlexBox>
                  <Button
                    size="sm"
                    variant="solid"
                    className="bg-[#ff5900] text-white"
                    onClick={clickReadAll}
                  >
                    모두 읽음
                  </Button>
                </FlexBox>
                <ScrollBox>
                  <ScrollShadow orientation="vertical" className="scrollbar">
                    <div>
                      <ListBox>
                        {data.seeAlarms.data?.length > 0 && (
                          <>
                            {data.seeAlarms.data?.map((alarm, index) => (
                              <NotiItem key={index}>
                                <ClickBox>
                                  <NotiFlag
                                    style={{ background: 'blue' }}
                                  ></NotiFlag>
                                  <ReqBox>
                                    <FromID>{alarm.title}</FromID>
                                    <ReqText>{alarm.content}</ReqText>
                                  </ReqBox>
                                </ClickBox>
                                <NotiClose onClick={() => clickRead(alarm.id)}>
                                  <i className="xi-close-circle" />
                                </NotiClose>
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
                        {data.seeAlarms.data?.length === 0 && (
                          <Nolist>알람이 없습니다.</Nolist>
                        )}
                      </ListBox>
                    </div>
                  </ScrollShadow>
                </ScrollBox>
                {data.seeAlarms.data?.length > 0 && (
                  <PagerWrap>
                    <Pagination
                      variant="light"
                      showControls
                      initialPage={currentPage}
                      page={currentPage}
                      total={Math.ceil(40 / currentLimit)}
                      onChange={newPage => {
                        setCurrentPage(newPage)
                      }}
                      classNames={{
                        item: 'text-white hover:text-[#000]',
                        prev: 'text-white hover:text-[#000]',
                        next: 'text-white hover:text-[#000]',
                      }}
                    />
                  </PagerWrap>
                )}
              </NotiListBox>
            )}
          </>
        )}
      </NotiBox>
      {/* <SeeRequestMessage isOpen={isOpen} onClose={onClose} /> */}
    </>
  )
}
