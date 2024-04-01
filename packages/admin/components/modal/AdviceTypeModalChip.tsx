import styled from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { ResultAdviceType } from '@/src/generated/graphql'

const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function AdviceTypeModalChip() {
  const { error, data } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
  )
  const adviceList = data?.seeAdviceType.adviceType

  if (error) {
    console.log(error)
  }

  return (
    <>
      {adviceList?.map((item, index) => (
        <ChipCheckbox key={item.id} value={item.type}>
          {item.type}
        </ChipCheckbox>
      ))}
      {adviceList === null && <Nolist>등록된 분야가 없습니다.</Nolist>}
    </>
  )
}
