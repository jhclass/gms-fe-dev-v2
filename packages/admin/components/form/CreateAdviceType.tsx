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

export default function CreateAdviceType({ isActive, category }) {
  const { userLogs } = useUserLogsMutation()
  const [createAdvice] = useMutation(CREATE_ADVICE_TYPE_MUTATION)
  const [totalCount, setTotalCount] = useState(0)
  const {
    isOpen: typeIsOpne,
    onOpen: typeOnOPen,
    onClose: typeOnClose,
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
        `ok: ${result.data.createAdviceType.ok}`,
      )
      if (!result.data.createAdviceType.ok) {
        throw new Error(`${category} 등록 실패`)
      }
      alert(`${category} 분야가 등록되었습니다.`)
      reset()
    } catch (error) {
      console.error(`${category} 등록 중 에러 발생:`, error)
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
          <BoxBtn>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <InputBox>
                  <Input
                    labelPlacement="outside-left"
                    placeholder="2글자 이상 작성해주세요."
                    type="text"
                    variant="bordered"
                    label={`${category}명`}
                    classNames={{
                      label: ['w-[5.5rem]'],
                      mainWrapper: ['w-[calc(100%-4rem)]'],
                    }}
                    onChange={e => {
                      register('type').onChange(e)
                    }}
                    {...register('type', {
                      required: {
                        value: true,
                        message: '내용을 작성해주세요',
                      },
                      minLength: {
                        value: 2,
                        message: '2글자 이상 작성해주세요',
                      },
                    })}
                  />
                  {errors.type && (
                    <p className="w-full ml-[6rem] text-xs text-red">
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
    </>
  )
}
