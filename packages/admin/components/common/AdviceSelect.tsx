import { SEE_ADVICE_TYPE_QUERY, SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { ResultAdviceType } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function managerSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  optionDefualt,
  filter = null,
}) {
  const { error: adviceError, data: adviceData } =
    useSuspenseQuery<seeAdviceTypeQuery>(SEE_ADVICE_TYPE_QUERY)
  const adviceList = [optionDefualt, ...adviceData?.seeAdviceType.adviceType]

  if (adviceError) {
    console.log(adviceError)
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
        {adviceList?.map(item => (
          <SelectItem key={item.type} value={item.type}>
            {item.type}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
