import {
  SEARCH_MANAGEUSER_QUERY,
  SEE_MANAGEUSER_QUERY,
} from '@/graphql/queries'
import { ManageUser, SearchManageUserResult } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

type seeManagerQuery = {
  seeManageUser: ManageUser[]
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
  // const { error: seeManagerError, data: seeManagerData } =
  //   useSuspenseQuery<seeManagerQuery>(SEE_MANAGEUSER_QUERY)
  // const managerList = [
  //   optionDefualt,
  //   ...seeManagerData?.seeManageUser?.filter(filter),
  // ]

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
          <SelectItem key={item.mUsername} value={item.mUsername}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
