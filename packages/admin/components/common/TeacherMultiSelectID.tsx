import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function TeacherMultiSelect({
  defaultSelectedKeys = null,
  selectedKey,
  field,
  label,
  handleChange,
  optionDefualt = null,
}) {
  const router = useRouter()
  const {
    error: searchManagerError,
    data: searchManagerData,
    refetch,
  } = useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
    variables: {
      mRank: '강사',
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
      mGrade: 20,
      resign: 'N',
      limit: 100,
    })
  }, [router])

  return (
    <>
      <Select
        labelPlacement="outside"
        label={label}
        placeholder=" "
        className="w-full"
        isMultiline={true}
        selectionMode="multiple"
        defaultSelectedKeys={defaultSelectedKeys}
        variant="bordered"
        selectedKeys={selectedKey}
        onChange={value => {
          if (value.target.value !== '') {
            field.onChange(value)
          }
        }}
        onSelectionChange={handleChange}
      >
        {managerList.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
