import { Chip } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation } from '@apollo/client'
import { EDIT_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { styled } from 'styled-components'

export default function CreateAdviceTypeChip({
  adviceList,
  refetch,
  category,
}) {
  const { userLogs } = useUserLogsMutation()
  const [editAdvice] = useMutation(EDIT_ADVICE_TYPE_MUTATION)

  const deleteType = async item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (!isDelete) return

    try {
      const result = await editAdvice({
        variables: {
          editAdviceTypeId: item.id,
        },
      })
      console.log(result)

      if (!result.data.editAdviceType.ok) {
        throw new Error(`${category} 삭제 실패`)
      }
      refetch({
        page: 1,
        category: category,
        limit: 50,
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
