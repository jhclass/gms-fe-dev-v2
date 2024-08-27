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
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { Suspense, useEffect, useState } from 'react'
import ManagerSelectID from '@/components/common/ManagerSelectID'
import { toast } from 'react-toastify'
import ReqToast from '@/components/common/ReqToast'
import SeeRequestMessage from '@/components/modal/SeeRequestMessage'

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
    toast(<ReqToast messageData={data} />, {
      position: 'bottom-right',
      autoClose: 20000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClick: seeOnOPen,
      style: {
        // width: '100%',
      },
    })
  }

  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  const closePopup = () => {
    reset()
    setManager('받는 사람')
    onClose()
  }
  const {
    isOpen: seeIsOpne,
    onOpen: seeOnOPen,
    onClose: seeOnClose,
  } = useDisclosure()
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
                          <Controller
                            control={control}
                            name="processingManagerId"
                            rules={{
                              required: {
                                value: true,
                                message: '영업담당자를 선택해주세요.',
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <Suspense
                                fallback={
                                  <LodingDiv>
                                    <i className="xi-spinner-2" />
                                  </LodingDiv>
                                }
                              >
                                <ManagerSelectID
                                  selectedKey={manager}
                                  field={field}
                                  label={'To.'}
                                  handleChange={handleManagerChange}
                                  optionDefault={{
                                    id: '받는 사람',
                                    mUsername: '받는 사람',
                                  }}
                                  filter={{
                                    mGrade: null,
                                  }}
                                />
                              </Suspense>
                            )}
                          />
                          {errors.processingManagerId && (
                            <p className="px-2 pt-2 text-xs text-red">
                              {String(errors.processingManagerId.message)}
                            </p>
                          )}
                        </AreaBox>
                        <AreaBox>
                          <Textarea
                            label="요청 내용"
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
                    variant="bordered"
                    className="text-accent border-accent"
                    onPress={closePopup}
                  >
                    Close
                  </Button>
                  <Button size="sm" color="primary" type="submit">
                    요청하기
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <SeeRequestMessage isOpen={seeIsOpne} onClose={seeOnClose} />
    </>
  )
}
