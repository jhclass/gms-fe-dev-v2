import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useState } from 'react'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};

  span {
    color: red;
  }
`

export default function RequestMessage({
  isOpen,
  onClose,
  managerId,
  managerName,
}) {
  const { userLogs } = useUserLogsMutation()
  const {
    control,
    register,
    handleSubmit,
    formState,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm()
  const { errors } = formState
  const [manager, setManager] = useState('받는 사람')

  const onSubmit = data => {
    closePopup()
  }

  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  const closePopup = () => {
    reset()
    setManager('받는 사람')
    onClose()
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={closePopup}>
        <ModalContent>
          {closePopup => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  요청 하기
                </ModalHeader>
                <ModalBody>
                  <ScrollShadow className="scrollbar min-h-[10rem] max-h-[25rem]">
                    <DetailDiv>
                      <FlexBox>
                        <AreaBox>
                          <div>
                            <FilterLabel>Form</FilterLabel>
                            <LineBox>아무개</LineBox>
                          </div>
                        </AreaBox>
                        <AreaBox>
                          <Textarea
                            isReadOnly={true}
                            label="요청 내용"
                            labelPlacement="outside"
                            className="max-w-full"
                            variant="bordered"
                            defaultValue={
                              '요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청요청'
                            }
                            maxRows={3}
                          />
                        </AreaBox>
                        <AreaBox>
                          <Textarea
                            label="답변 내용"
                            labelPlacement="outside"
                            className="max-w-full"
                            variant="bordered"
                            maxRows={5}
                            onChange={e => {
                              register('detail').onChange(e)
                            }}
                            {...register('detail')}
                          />
                        </AreaBox>
                      </FlexBox>
                    </DetailDiv>
                  </ScrollShadow>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    className="text-accent"
                    variant="light"
                    onPress={closePopup}
                  >
                    Close
                  </Button>
                  <Button size="sm" color="primary" type="submit">
                    답변하기
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
