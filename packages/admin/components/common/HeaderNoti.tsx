import { Suspense, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { SEE_ALARMS_QUERY, SEE_ALARMS_TOTAL_QUERY } from '@/graphql/queries'
import { READ_ALARMS_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import AlarmsModal from '@/components/modal/AlarmsModal'
import { Button } from '@nextui-org/react'
import { ResultSeeAlarms } from '@/src/generated/graphql'
import AlarmsTotal from '../items/AlarmsTotal'

const NotiBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 2.2rem;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    right: -0.9rem;
    margin-top: -0.75rem;
    background: #d4d4d8;
    transition: 0.3s;
  }

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    &:after {
      right: -0.4rem;
    }
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

  @media screen and (max-width: 1024px) {
    width: 100vw;
    top: 3.9rem;
    right: 0;
    margin-left: 0;
  }
`
const DropBox = styled.div`
  position: relative;
  border: 1px solid #d4d4d8;
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

const LodingDiv = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default function HeaderNoti({}) {
  const [isListOpen, setIsListOpen] = useState(false)
  const notiBoxRef = useRef(null)
  const { userLogs } = useUserLogsMutation()
  const [readAlarms] = useMutation(READ_ALARMS_MUTATION)
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

  const clickReadAll = () => {
    const readAll = confirm('모두 읽음 처리하시겠습니까?')
    if (readAll) {
      readAlarms({
        variables: {
          all: 'Y',
        },
        refetchQueries: [SEE_ALARMS_QUERY, SEE_ALARMS_TOTAL_QUERY],
        onCompleted: result => {
          if (result.readAlarms.ok) {
            userLogs('알람 모두 읽음 처리')
            alert('모두 읽음 처리 하였습니다.')
          }
        },
      })
    }
  }

  return (
    <>
      <NotiBox ref={notiBoxRef}>
        <NotiBtn onClick={() => setIsListOpen(!isListOpen)}>
          <i className="xi-bell-o" />
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <AlarmsTotal />
          </Suspense>
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
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <AlarmsModal isListOpen={isListOpen} />
              </Suspense>
            </DropBox>
          </NotiListBox>
        )}
      </NotiBox>
      {/* <SeeRequestMessage isOpen={isOpen} onClose={onClose} /> */}
    </>
  )
}
