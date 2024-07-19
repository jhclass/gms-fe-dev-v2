import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import { gradeState, partState } from '@/lib/recoilAtoms'
import { ResultAdviceType } from '@/src/generated/graphql'
import useMmeQuery from '@/utils/mMe'
import { useSuspenseQuery } from '@apollo/client'
import { Link, Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { styled } from 'styled-components'

const AddLink = styled.p`
  > a {
    font-size: 0.8rem;
    color: #71717a;
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

export default function PartMultiSelect({
  defaultValue = null,
  selecedKey,
  field,
  label,
  handleChange,
  placeholder = ' ',
  optionDefualt = null,
  filter = null,
}) {
  const router = useRouter()
  const partStatus = useRecoilValue(partState)

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'teacherType' },
    })
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
        {Object.entries(partStatus).map(([key, item]) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      {/* {(mGrade < grade.general || mPart.includes('교무팀')) && (
        <AddLink>
          <Link size="sm" underline="hover" href="#" onClick={handleClick}>
            강의분야 추가
          </Link>
        </AddLink>
      )} */}
    </>
  )
}
