import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { ResultAdviceType } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { Select, SelectItem } from '@nextui-org/react'

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function AdviceMultiSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  placeholder = ' ',
  optionDefualt = null,
  filter = null,
  category,
}) {
  const { error: adviceError, data: adviceData } =
    useSuspenseQuery<seeAdviceTypeQuery>(SEE_ADVICE_TYPE_QUERY, {
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

  return (
    <>
      <Select
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        className="w-full"
        classNames={{
          value: 'text-[#11141c] opacity-1',
        }}
        isMultiline={true}
        selectionMode="multiple"
        defaultValue={defaultValue}
        variant="bordered"
        selectedKeys={selecedKey}
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
