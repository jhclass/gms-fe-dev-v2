import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function managerSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  optionDefualt,
  filter,
}) {
  const { error: searchManager, data: searchManagerData } =
    useSuspenseQuery<searchManageUserQuery>(SEARCH_MANAGEUSER_QUERY, {
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

  if (searchManager) {
    console.log(searchManager)
  }

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
          <SelectItem key={item.id} value={item.id}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
