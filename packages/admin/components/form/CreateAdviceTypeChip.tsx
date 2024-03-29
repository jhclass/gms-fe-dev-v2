import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Chip } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { DELETE_ADVICE_TYPE_MUTATION } from '@/graphql/mutations'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import { ResultAdviceType } from '@/src/generated/graphql'

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
`
const BoxArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;
`
const BoxTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const BoxBottom = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
  max-width: 1400px;
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 70%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}

type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}

export default function CreateAdviceTypeChip() {
  const { userLogs } = useUserLogsMutation()
  const [deleteAdvice] = useMutation(DELETE_ADVICE_TYPE_MUTATION)
  const { error, data } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
  )
  const adviceList = data?.seeAdviceType.adviceType

  const deleteType = async item => {
    const isDelete = confirm(`[${item.type}]을 삭제하시겠습니까?`)
    if (!isDelete) return

    try {
      const result = await deleteAdvice({
        variables: {
          deleteAdviceTypeId: item.id,
        },
        refetchQueries: [
          {
            query: SEE_ADVICE_TYPE_QUERY,
          },
        ],
      })

      if (!result.data.deleteAdviceType.ok) {
        throw new Error('상담 분야 삭제 실패')
      }
      alert('상담 분야가 삭제되었습니다.')
      userLogs(`${item.type} 상담분야 삭제`)
    } catch (error) {
      console.error('상담 분야 삭제 중 에러 발생:', error)
    }
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      {adviceList?.map((item, index) => (
        <Chip key={index} variant="bordered" onClose={() => deleteType(item)}>
          {item.type}
        </Chip>
      ))}
    </>
  )
}
