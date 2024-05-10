import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'

const FromID = styled.p`
  color: #171717;
  font-weight: 700;
  width: inherit;
  font-size: 0.875rem;
`
const ReqText = styled.p`
  color: #71717a;
  width: inherit;
  font-size: 0.875rem;
`

export default function ReqToast({}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isListOpen, setIsListOpen] = useState(false)
  return (
    <>
      <FromID>아무개</FromID>
      <ReqText>
        여기여기여기에 요청요여기에 요청요여기에 요청요청요청 이런거 요청합니다.
      </ReqText>
    </>
  )
}
