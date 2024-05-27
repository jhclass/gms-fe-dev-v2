import { Chip } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation } from '@apollo/client'
import { DELETE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { styled } from 'styled-components'

export default function CreateAdviceTypeChip({ adviceList, refetch }) {
  const { userLogs } = useUserLogsMutation()
  const [deleteAdvice] = useMutation(DELETE_ADVICE_TYPE_MUTATION)

  const deleteType = async item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (!isDelete) return

    try {
      const result = await deleteAdvice({
        variables: {
          deleteAdviceTypeId: item.id,
        },
      })

      if (!result.data.deleteAdviceType.ok) {
        throw new Error('상담 분야 삭제 실패')
      }
      refetch({
        page: 1,
        category: '상담분야',
        limit: 50,
      })

      alert('상담 분야가 삭제되었습니다.')
      userLogs(`${item.type} 상담분야 삭제`)
    } catch (error) {
      console.error('상담 분야 삭제 중 에러 발생:', error)
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
