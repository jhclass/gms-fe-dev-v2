import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function managerSelect({
  defaultValue = null,
  selectedKey,
  field,
  label,
  handleChange,
  optionDefualt,
  filter,
}) {
  const router = useRouter()
  const {
    error: searchManagerError,
    data: searchManagerData,
    refetch,
  } = useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
    variables: {
      mGrade: filter.mGrade,
      mRank: filter.mRank,
      mPart: filter.mPart,
      searchManageUserId: filter.id,
      resign: 'N',
    },
  })
  const managerList = [
    optionDefualt,
    ...searchManagerData?.searchManageUser.data,
  ]

  if (searchManagerError) {
    console.log(searchManagerError)
  }

  useEffect(() => {
    refetch({
      mGrade: filter.mGrade,
      mRank: filter.mRank,
      mPart: filter.mPart,
      searchManageUserId: filter.id,
      resign: 'N',
    })
  }, [router])

  return (
    <>
      <Select
        labelPlacement="outside"
        label={label}
        placeholder=" "
        className="w-full"
        defaultValue={defaultValue}
        variant="bordered"
        selectedKeys={[selectedKey]}
        onChange={value => {
          if (value.target.value !== '') {
            field.onChange(value)
            handleChange(value)
          }
        }}
      >
        {managerList.map(item => (
          <SelectItem key={item.mUsername} value={item.mUsername}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
