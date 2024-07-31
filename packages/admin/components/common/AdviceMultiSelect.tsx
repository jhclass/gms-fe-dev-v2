import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { gradeState } from '@/lib/recoilAtoms'
import { ResultAdviceType } from '@/src/generated/graphql'
import useMmeQuery from '@/utils/mMe'
import { useSuspenseQuery } from '@apollo/client'
import { Link, Select, SelectItem } from '@nextui-org/react'
import { createSearchParamsBailoutProxy } from 'next/dist/client/components/searchparams-bailout-proxy'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { styled } from 'styled-components'

const AddLink = styled.p`
  > a {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray};
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function AdviceMultiSelect({
  defaultValue = null,
  selectedKey,
  field,
  label,
  handleChange,
  placeholder = ' ',
  optionDefualt = null,
  filter = null,
  category,
}) {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart') || []
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
  const adviceList = adviceData?.seeAdviceType.adviceType

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
        classNames={{
          value: 'text-black opacity-1',
        }}
        isMultiline={true}
        selectionMode="multiple"
        defaultValue={defaultValue}
        variant="bordered"
        selectedKeys={selectedKey}
        onChange={value => {
          if (value.target.value !== '') {
            field.onChange(value)
          }
        }}
        onSelectionChange={handleChange}
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
