import { Chip } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation } from '@apollo/client'
import {
  CHANGE_ORDER_AT_MUTATION,
  EDIT_ADVICE_TYPE_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { styled } from 'styled-components'

export default function CreateAdviceTypeChip({
  adviceList,
  refetch,
  category,
  orderRefetch,
}) {
  const { userLogs } = useUserLogsMutation()
  const [editAdvice] = useMutation(EDIT_ADVICE_TYPE_MUTATION)
  const [changeOrderAt] = useMutation(CHANGE_ORDER_AT_MUTATION)
  const createNumberArray = n => Array.from({ length: n }, (_, i) => i + 1)

  const deleteType = async item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (!isDelete) return

    try {
      const result = await editAdvice({
        variables: {
          editAdviceTypeId: item.id,
          onOff: 'N',
        },
      })
      const typeID = adviceList
        .filter(type => type.id !== item.id)
        .map(advice => advice.id)
      const typeIndex = createNumberArray(typeID.length)
      const changeResult = await changeOrderAt({
        variables: {
          ids: typeID,
          indexNums: typeIndex,
        },
      })
      if (!result.data.editAdviceType.ok) {
        throw new Error(`${category} 삭제 실패`)
      }
      if (!changeResult.data.changeOrderAT.ok) {
        throw new Error(`${category} 삭제 후 순서 재설정 실패`)
      }

      refetch({
        page: 1,
        category: category,
        limit: 50,
      })
      orderRefetch({
        page: 1,
        category: category,
        limit: 30,
      })
      alert(`${category}가 삭제되었습니다.`)
      userLogs(`${item.type} ${category} 삭제`)
    } catch (error) {
      console.error(`${category} 삭제 중 에러 발생:`, error)
    }
  }

  return (
    <>
      {adviceList &&
        adviceList?.map((item, index) => (
          <Chip
            key={index}
            variant="bordered"
            onClose={() => deleteType(item)}
            className={'hover:border-primary'}
          >
            {item.type}
          </Chip>
        ))}
    </>
  )
}
