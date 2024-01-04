import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { subStatusState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Chip, Input, Select, SelectItem } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_ADVICE_TYPE_MUTATION,
  DELETE_ADVICE_TYPE_MUTATION,
} from '@/graphql/mutations'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'

type ConsultFilterProps = {
  isActive: boolean
}

const FilterBox = styled(motion.div)`
  overflow: hidden;
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
const BoxTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const BoxBottom = styled.div`
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

export default function CreateAdviceType({ isActive, onCreateToggle }) {
  const { userLogs } = useUserLogsMutation()
  const [createAdvice] = useMutation(CREATE_ADVICE_TYPE_MUTATION)
  const [deleteAdvice] = useMutation(DELETE_ADVICE_TYPE_MUTATION)
  const { loading, error, data } = useQuery(SEE_ADVICE_TYPE_QUERY)
  const adviceList = data?.seeAdviceType.adviceType || []
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      type: '',
    },
  })

  const onSubmit = data => {
    if (isDirty) {
      createAdvice({
        variables: {
          type: data.type,
        },
        refetchQueries: [
          {
            query: SEE_ADVICE_TYPE_QUERY,
          },
        ],
        onCompleted: data => {
          alert('상담 분야가 등록되었습니다.')
        },
      })
      userLogs(`${data.type} 상담분야 등록`)
    }
  }

  const deleteType = item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (isDelete) {
      deleteAdvice({
        variables: {
          deleteAdviceTypeId: item.id,
        },
        refetchQueries: [
          {
            query: SEE_ADVICE_TYPE_QUERY,
          },
        ],
        onCompleted: data => {
          alert('상담 분야가 삭제되었습니다.')
        },
      })
      userLogs(`${item.type} 상담분야 삭제`)
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
          <BoxTop>
            {adviceList.map((item, index) => (
              <Chip
                key={index}
                variant="bordered"
                onClose={() => deleteType(item)}
              >
                {item.type}
              </Chip>
            ))}
          </BoxTop>
          <BoxBottom>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <InputBox>
                  <Input
                    labelPlacement="outside-left"
                    placeholder="2글자 이상 작성해주세요."
                    type="text"
                    variant="bordered"
                    label="분야명"
                    classNames={{
                      label: ['w-[4rem]'],
                      mainWrapper: ['w-[calc(100%-4rem)]'],
                    }}
                    onChange={e => {
                      register('type').onChange(e)
                    }}
                    {...register('type', {
                      minLength: {
                        value: 2,
                        message: '2글자 이상 작성해주세요',
                      },
                    })}
                  />
                  {errors.type && (
                    <p className="w-full ml-[4.5rem] text-xs text-red-500">
                      {String(errors.type.message)}
                    </p>
                  )}
                </InputBox>
                <Button
                  buttonType="submit"
                  width="calc(50%)"
                  height="2.5rem"
                  typeBorder={true}
                  fontColor="#fff"
                  bgColor="#007de9"
                >
                  등록
                </Button>
              </ItemBox>
            </FilterForm>
          </BoxBottom>
        </BoxArea>
      </FilterBox>
    </>
  )
}
