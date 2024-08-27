import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import {
  ResultAdviceType,
  SearchManageUserResult,
} from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function ManagerSelect({
  defaultValue = null,
  selectedKey,
  field,
  label,
  handleChange,
  optionDefualt = null,
  isHyphen,
}) {
  const router = useRouter()
  const { error, data, refetch } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
    {
      variables: {
        page: 1,
        category: '수강구분',
        limit: 100,
      },
    },
  )

  const subDivList = optionDefualt
    ? [optionDefualt, ...data?.seeAdviceType.adviceType]
    : data?.seeAdviceType.adviceType

  useEffect(() => {
    refetch({
      page: 1,
      category: '수강구분',
      limit: 100,
    })
  }, [router])

  if (error) {
    console.log(error)
  }

  return isHyphen ? (
    <Select
      labelPlacement="outside"
      label={label}
      placeholder=" "
      defaultValue={defaultValue}
      className="w-full"
      variant="bordered"
      selectedKeys={[selectedKey]}
      onChange={value => {
        if (value.target.value !== '') {
          field.onChange(value)
          handleChange(value)
        }
      }}
    >
      {subDivList.map(item =>
        item.type === '없음' ? (
          <SelectItem value="-" key={'-'}>
            -
          </SelectItem>
        ) : (
          <SelectItem key={item.type} value={item.type}>
            {item.type}
          </SelectItem>
        ),
      )}
    </Select>
  ) : (
    <Select
      labelPlacement="outside"
      label={label}
      placeholder=" "
      defaultValue={defaultValue}
      className="w-full"
      variant="bordered"
      selectedKeys={[selectedKey]}
      onChange={value => {
        if (value.target.value !== '') {
          field.onChange(value)
          handleChange(value)
        }
      }}
    >
      {subDivList.map(item => (
        <SelectItem key={item.type} value={item.type}>
          {item.type}
        </SelectItem>
      ))}
    </Select>
  )
}
