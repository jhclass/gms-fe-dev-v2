import styled from 'styled-components'
import {
  Button,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'
import { DEV_EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'
import { Suspense, useEffect, useState } from 'react'
import ManagerSelectID from '../common/ManagerSelectID'

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
  color: #11181c;

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
    console.log(data)
    // try {
    //   const result = await devEditManager({
    //     variables: {
    //       mUserId: [managerData.mUserId],
    //       mPassword: data.mPassword.trim(),
    //     },
    //   })

    //   if (!result.data.devEditManageUser.ok) {
    //     throw new Error('비밀번호 변경 실패')
    //   }
    //   userLogs(`${managerData.mUsername} 비밀번호 변경`, 'password')
    //   alert('변경되었습니다.')
    //   closePopup()
    // } catch (error) {
    //   console.error('비밀번호 변경 중 에러 발생:', error)
    //   alert('비밀번호 변경 처리 중 오류가 발생했습니다.')
    //   closePopup()
    // }
  }

  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  const closePopup = () => {
    reset()
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
                  비밀번호 변경
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
                                  selecedKey={manager}
                                  field={field}
                                  label={'To.'}
                                  handleChange={handleManagerChange}
                                  optionDefualt={{
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
                            <p className="px-2 pt-2 text-xs text-red-500">
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
                            minRows={5}
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
                  <Button color="danger" variant="light" onPress={closePopup}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    비밀번호 변경
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
