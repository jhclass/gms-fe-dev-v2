import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { CREATE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import {
  SEE_ADVICE_TYPE_ORDER_QUERY,
  SEE_ADVICE_TYPE_QUERY,
} from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import CreateAdviceTypeChip from '@/components/form/CreateAdviceTypeChip'
import { Suspense, useState } from 'react'
import TypeIndex from '@/components/modal/TypeIndex'
import CreatePermissionChip from './CreatePermissionChip'
import ManagerMultiSelectID from '../common/ManagerMultiSelectID'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import ManagersModal from '../modal/ManagersModal'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
`
const BoxArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;
`
const BoxBtn = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
  max-width: 1400px;
`
const FlexBox = styled.div`
  display: flex;
  width: 50%;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;
  }
`

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}

const FilterLabel = styled.div`
  width: max-content;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;

    &.multi {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray};
    }
  }

  &.file {
    padding-bottom: 0.5rem;
  }
`

export default function PermissionCate({ isActive, permissionName }) {
  const { userLogs } = useUserLogsMutation()
  const [createAdvice] = useMutation(CREATE_ADVICE_TYPE_MUTATION)
  const [totalCount, setTotalCount] = useState(0)
  const [managers, setManagers] = useState([])
  const [managersName, setManagersName] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    control,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      manageUserIds: '',
    },
  })

  const onSubmit = data => {
    console.log(data)
    // try {
    //   const result = await createAdvice({
    //     variables: {
    //       type: data.type,
    //       indexNum: totalCount + 1,
    //       category: category,
    //     },
    //     refetchQueries: [
    //       {
    //         query: SEE_ADVICE_TYPE_QUERY,
    //         variables: {
    //           page: 1,
    //           limit: 50,
    //           category: category,
    //         },
    //       },
    //       {
    //         query: SEE_ADVICE_TYPE_ORDER_QUERY,
    //         variables: {
    //           page: 1,
    //           limit: 30,
    //           category: category,
    //         },
    //       },
    //     ],
    //   })
    //   userLogs(
    //     `${data.type} ${category} 등록`,
    //     `ok: ${result.data.createAdviceType.ok}`,
    //   )
    //   if (!result.data.createAdviceType.ok) {
    //     if (result.data.createAdviceType.message === '중복되는 분야 입니다.') {
    //       alert(`'${data.type}'은 중복되는 ${category}입니다.`)
    //     }
    //     throw new Error(`${category} 등록 실패`)
    //   }

    //   alert(`${category} 분야가 등록되었습니다.`)
    //   reset()
    // } catch (error) {
    //   console.error(`${category} 등록 중 에러 발생:`, error)
    // }
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <BoxArea>
          <BoxBtn>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <InputBox>
                  <Controller
                    control={control}
                    name="manageUserIds"
                    rules={{
                      required: {
                        value: true,
                        message: '대상을 선택해주세요.',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Textarea
                          readOnly
                          value={String(managersName)}
                          label={
                            <FilterLabel>
                              {permissionName} <span>*</span>
                            </FilterLabel>
                          }
                          labelPlacement="outside-left"
                          className="max-w-full"
                          variant="bordered"
                          minRows={1}
                          onClick={onOpen}
                          {...register('manageUserIds')}
                        />
                        <Suspense
                          fallback={
                            <LodingDiv>
                              <i className="xi-spinner-2" />
                            </LodingDiv>
                          }
                        >
                          <ManagersModal
                            isOpen={isOpen}
                            onClose={onClose}
                            managers={managers}
                            setManagers={setManagers}
                            setValue={setValue}
                            setManagersName={setManagersName}
                          />
                        </Suspense>
                      </>
                    )}
                  />
                  {errors.manageUserIds && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.manageUserIds.message)}
                    </p>
                  )}
                </InputBox>
                <FlexBox>
                  <Button
                    type="submit"
                    color="primary"
                    size="md"
                    className="w-[50%]"
                  >
                    추가
                  </Button>
                </FlexBox>
              </ItemBox>
            </FilterForm>
          </BoxBtn>
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <CreatePermissionChip topic={null} permissionName={null} />
          </Suspense>
        </BoxArea>
      </FilterBox>
    </>
  )
}
