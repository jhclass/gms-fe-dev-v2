import { ScrollShadow, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import SeeRequestMessage from '../modal/SeeRequestMessage'

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

export default function HeaderNoti({}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isListOpen, setIsListOpen] = useState(false)
  return (
    <>
      <NotiBox>
        <NotiBtn onClick={() => setIsListOpen(!isListOpen)}>
          <img
            src="https://highclass-image.s3.amazonaws.com/admin/icon/ico_noti.webp"
            alt="알림"
          />
          <NotiNum>0</NotiNum>
        </NotiBtn>
        {isListOpen && (
          <NotiListBox>
            <ScrollBox>
              <ScrollShadow orientation="vertical" className="scrollbar">
                <div>
                  <ListBox>
                    <NotiItem>
                      <ClickBox onClick={onOpen}>
                        <NotiFlag style={{ background: 'blue' }}></NotiFlag>
                        <ReqBox>
                          <FromID>아무개</FromID>
                          <ReqText>
                            여기여기여기에 요청요여기에 요청요여기에
                            요청요청요청 이런거 요청합니다.
                          </ReqText>
                        </ReqBox>
                      </ClickBox>
                      <NotiClose>
                        <i className="xi-close-circle" />
                      </NotiClose>
                    </NotiItem>
                    <NotiItem className="read">
                      <ClickBox onClick={onOpen}>
                        <NotiFlag></NotiFlag>
                        <ReqBox>
                          <FromID>아무개</FromID>
                          <ReqText>
                            여기여기여기에 요청요여기에 요청요여기에
                            요청요청요청 이런거 요청합니다.
                          </ReqText>
                        </ReqBox>
                      </ClickBox>
                      <NotiClose>
                        <i className="xi-close-circle" />
                      </NotiClose>
                    </NotiItem>
                  </ListBox>
                </div>
              </ScrollShadow>
            </ScrollBox>
          </NotiListBox>
        )}
      </NotiBox>
      <SeeRequestMessage isOpen={isOpen} onClose={onClose} />
    </>
  )
}
