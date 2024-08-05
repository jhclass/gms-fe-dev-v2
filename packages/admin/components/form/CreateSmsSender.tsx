import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { CREATE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import {
  SEE_ADVICE_TYPE_ORDER_QUERY,
  SEE_ADVICE_TYPE_QUERY,
} from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import CreateAdviceTypeChip from './CreateAdviceTypeChip'
import { Suspense, useState } from 'react'
import TypeIndex from '@/components/modal/TypeIndex'
import NotiModal from '@/components/modal/NotiModal'

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
const NotiBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  gap: 0.5rem;

  span {
    color: red;
  }

  button {
    font-size: 0.7rem;
  }
`
const BoxTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const MoreBtn = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.offWhite};
  display: flex;
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
  max-width: 70%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
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

export default function CreateSmsSender({ isActive, category }) {
  const { userLogs } = useUserLogsMutation()
  const [createAdvice] = useMutation(CREATE_ADVICE_TYPE_MUTATION)
  const [totalCount, setTotalCount] = useState(0)
  const {
    isOpen: typeIsOpne,
    onOpen: typeOnOPen,
    onClose: typeOnClose,
  } = useDisclosure()

  const {
    isOpen: notiIsOpne,
    onOpen: notiOnOPen,
    onClose: notiOnClose,
  } = useDisclosure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      type: '',
    },
  })

  const openOrderChange = () => {
    typeOnOPen()
  }

  const onSubmit = async data => {
    if (!isDirty) return
    const isConfirm = confirm(
      '이용증명원이 등록된 번호입니까?\n자세한 내용은 상단 "자세히보기" 버튼을 클릭해주세요.',
    )
    if (isConfirm) {
      try {
        const result = await createAdvice({
          variables: {
            type: data.type,
            indexNum: totalCount + 1,
            category: category,
          },
          refetchQueries: [
            {
              query: SEE_ADVICE_TYPE_QUERY,
              variables: {
                page: 1,
                limit: 50,
                category: category,
              },
            },
            {
              query: SEE_ADVICE_TYPE_ORDER_QUERY,
              variables: {
                page: 1,
                limit: 30,
                category: category,
              },
            },
          ],
        })

        userLogs(
          `${data.type} ${category} 등록`,
          `ok : ${result.data.createAdviceType.ok}`,
        )

        if (!result.data.createAdviceType.ok) {
          throw new Error(`${category} 등록 실패`)
        }
        alert(`${category}가 등록되었습니다.`)

        reset()
      } catch (error) {
        console.error(`${category} 등록 중 에러 발생:`, error)
      }
    }
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <BoxArea>
          <NotiBox>
            <p>
              <span>*</span> 반드시 이용증명원을 발급받은 번호만 등록해주세요.
            </p>
            <Button
              type="button"
              size="sm"
              // variant="light"
              variant="solid"
              className="px-2 text-white bg-accent h-unit-7"
              onClick={() => notiOnOPen()}
            >
              자세히보기
            </Button>
          </NotiBox>
          <BoxBtn>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <InputBox>
                  <Input
                    labelPlacement="outside-left"
                    placeholder="'-'없이 작성해주세요"
                    type="text"
                    variant="bordered"
                    label={category}
                    maxLength={11}
                    classNames={{
                      label: ['w-[6.5rem]'],
                      mainWrapper: ['w-[calc(100%-4rem)]'],
                    }}
                    onChange={e => {
                      register('type').onChange(e)
                    }}
                    {...register('type', {
                      maxLength: {
                        value: 11,
                        message: '최대 11자리까지 입력 가능합니다.',
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: '숫자만 사용가능합니다.',
                      },
                    })}
                  />
                  {errors.type && (
                    <p className="w-full ml-[4.5rem] text-xs text-red">
                      {String(errors.type.message)}
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
                    등록
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    size="md"
                    variant="bordered"
                    className="w-[50%]"
                    onClick={openOrderChange}
                  >
                    순서변경
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
            <CreateAdviceTypeChip
              category={category}
              setTotalCount={setTotalCount}
              typeIsOpne={typeIsOpne}
            />
          </Suspense>
        </BoxArea>
      </FilterBox>
      {typeIsOpne && (
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <TypeIndex
            isOpen={typeIsOpne}
            onClose={typeOnClose}
            category={category}
          />
        </Suspense>
      )}
      {notiIsOpne && <NotiModal isOpen={notiIsOpne} onClose={notiOnClose} />}
    </>
  )
}
