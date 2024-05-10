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
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
`

export default function RequestMessage({ isOpen, onClose }) {
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

  const onSubmit = () => {
    onClose()
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

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  요청 상세
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
                  <Button color="primary" type="submit">
                    읽음
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
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
