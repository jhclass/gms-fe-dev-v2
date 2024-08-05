import { useEffect } from 'react'
import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  CREATE_CONSULTATION_MEMO_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
} from '@/graphql/mutations'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const MemoBox = styled.div`
  width: 100%;
  display: flex;
  flex: 1 3;
  gap: 1rem;
  align-items: center;

  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`
const MemoBtn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

export default function CreateMemo(props) {
  const studentId = props.studentId
  const { userLogs } = useUserLogsMutation()
  const [createMemo] = useMutation(CREATE_CONSULTATION_MEMO_MUTATION)
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { content: '', studentStateId: studentId },
  })
  const { isDirty, isSubmitSuccessful } = formState

  const onSubmit = async data => {
    if (isDirty) {
      try {
        const result = await createMemo({
          variables: {
            content: data.content.trim(),
            studentStateId: studentId,
          },
        })

        userLogs(
          `상담학생 ID:${studentId} 메모 등록`,
          `ok: ${result.data.createConsultationMemo.ok}`,
        )

        props.setMemoList([])

        const {
          data: {
            searchStudentState: {
              ok,
              studentState: [{ consultationMemo }],
            },
          },
        } = await searchStudentStateMutation({
          variables: {
            searchStudentStateId: parseInt(studentId),
          },
        })

        if (!ok) {
          throw new Error('메모 등록 실패')
        }
        props.setMemoList(consultationMemo)
      } catch (error) {
        console.error('에러 발생:', error)
      }
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ content: '' })
    }
  }, [formState])
  return (
    <>
      <DetailForm onSubmit={handleSubmit(onSubmit)}>
        <MemoBox>
          <Textarea
            label="메모작성"
            labelPlacement="outside"
            className="max-w-full"
            variant="bordered"
            minRows={5}
            onChange={e => {
              register('content').onChange(e)
            }}
            {...register('content')}
          />
          <MemoBtn>
            <Button type="submit" color="primary" className="w-full text-white">
              등록
            </Button>
          </MemoBtn>
        </MemoBox>
      </DetailForm>
    </>
  )
}
