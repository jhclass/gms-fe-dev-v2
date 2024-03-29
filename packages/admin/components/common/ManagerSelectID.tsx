import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { ManageUser } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

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
  const { error: seeManagerError, data: seeManagerData } =
    useSuspenseQuery<seeManagerQuery>(SEE_MANAGEUSER_QUERY)
  const managerList = [
    optionDefualt,
    ...seeManagerData?.seeManageUser?.filter(filter),
  ]

  if (seeManagerError) {
    console.log(seeManagerError)
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
          <SelectItem key={item.mUserId} value={item.mUserId}>
            {item.mUsername}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
