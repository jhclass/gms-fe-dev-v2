import styled from 'styled-components'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Pagination,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SMSAddrItem2 from '@/components/items/SMSAddrItem2'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'

const ItemBox = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`

export default function handleCheck({ groupSelected, setGroupSelected }) {
  const { register, handleSubmit, watch } = useForm()
  const phoneNumber = watch('phoneNumber')

  const onSubmit = data => {
    if (phoneNumber) {
      const isDuplicate = groupSelected.some(
        group => group.phoneNumber === data.phoneNumber,
      )

      if (!isDuplicate) {
        if (groupSelected.length > 0) {
          const addGroup = [...groupSelected, { phoneNumber: data.phoneNumber }]
          setGroupSelected(addGroup)
        } else {
          setGroupSelected([{ phoneNumber: data.phoneNumber }])
        }
      } else {
        alert('이미 존재하는 전화번호입니다.')
      }
    }
  }

  return (
    <ItemBox onSubmit={handleSubmit(onSubmit)}>
      <Input
        labelPlacement="outside"
        placeholder="'-'없이 작성해주세요"
        variant="bordered"
        radius="md"
        type="text"
        label="전화번호"
        maxLength={11}
        className="w-full"
        {...register('phoneNumber', {
          maxLength: {
            value: 11,
            message: '최대 11자리까지 입력 가능합니다.',
          },
          minLength: {
            value: 10,
            message: '최소 10자리 이상이어야 합니다.',
          },
          pattern: {
            value: /^010[0-9]{7,8}$/,
            message: '010으로 시작해주세요.',
          },
        })}
      />
      <Button
        type="submit"
        size="sm"
        radius="sm"
        variant="solid"
        color="primary"
        className="text-white mb-[4px]"
      >
        추가
      </Button>
    </ItemBox>
  )
}
