import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function TeacherMultiSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  optionDefualt = null,
}) {
  const { error: searchManagerError, data: searchManagerData } =
    useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
      variables: {
        mGrade: 20,
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

  return (
    <>
      <Select
        labelPlacement="outside"
        label={label}
        placeholder=" "
        className="w-full"
        isMultiline={true}
        selectionMode="multiple"
        defaultValue={''}
        variant="bordered"
        selectedKeys={selecedKey}
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
