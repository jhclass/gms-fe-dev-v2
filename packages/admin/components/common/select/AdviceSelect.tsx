import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { ResultAdviceType } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

const hasKorean = (value = '') => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)

const sortAdviceList = list => {
  return [...(list || [])].sort((a, b) => {
    const aType = a?.type || ''
    const bType = b?.type || ''
    const aKorean = hasKorean(aType)
    const bKorean = hasKorean(bType)

    if (aKorean !== bKorean) {
      return aKorean ? -1 : 1
    }

    return aType.localeCompare(bType, aKorean ? 'ko-KR' : 'en-US')
  })
}

export default function AdviceSelect({
  defaultValue = null,
  selectedKey,
  field,
  label,
  handleChange,
  placeholder = ' ',
  optionDefault = null,
  filter = null,
  category,
}) {
  const router = useRouter()
  const {
    error: adviceError,
    data: adviceData,
    refetch,
  } = useSuspenseQuery<seeAdviceTypeQuery>(SEE_ADVICE_TYPE_QUERY, {
    variables: {
      page: 1,
      category: category,
      limit: 100,
    },
  })

  const sortedAdviceList = sortAdviceList(adviceData?.seeAdviceType.adviceType)
  const adviceList = optionDefault
    ? [optionDefault, ...sortedAdviceList]
    : sortedAdviceList

  if (adviceError) {
    console.log(adviceError)
  }

  useEffect(() => {
    refetch({
      page: 1,
      category: category,
      limit: 100,
    })
  }, [router])

  return (
    <>
      <Select
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        className="w-full"
        defaultValue={defaultValue}
        variant="bordered"
        selectedKeys={selectedKey ? [selectedKey] : []}
        onChange={value => {
          if (value.target.value !== '') {
            field.onChange(value)
            handleChange(value)
          }
        }}
      >
        {adviceList?.map(item => (
          <SelectItem key={item.type} value={item.type}>
            {item.type}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
