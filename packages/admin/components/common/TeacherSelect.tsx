import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function TeacherSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  optionDefualt,
}) {
  const router = useRouter()
  const {
    error: searchManagerError,
    data: searchManagerData,
    refetch,
  } = useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
    variables: {
      mGrade: 20,
      resign: 'N',
      limit: 100,
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
        defaultValue={defaultValue}
        variant="bordered"
        selectedKeys={[selecedKey]}
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
