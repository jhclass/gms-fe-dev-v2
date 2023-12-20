import { useEffect } from 'react'
import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  CREATE_CONSULTATION_MEMO_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
} from '@/graphql/mutations'
import { useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
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
const MemoList = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`
const MemoItem = styled.li`
  width: 100%;
  display: flex;
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
  const [searchStudentStateMutation, { data, loading, error }] = useMutation(
    SEARCH_STUDENTSTATE_MUTATION,
  )
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { content: '', studentStateId: studentId },
  })
  const { isDirty, isSubmitSuccessful } = formState

  const onSubmit = data => {
    if (isDirty) {
      createMemo({
        variables: {
          content: data.content,
          studentStateId: studentId,
        },
        onCompleted: () => {
          props.setMemoList([])
          searchStudentStateMutation({
            variables: {
              searchStudentStateId: parseInt(studentId),
            },
            onCompleted: data => {
              props.setMemoList(
                data.searchStudentState.studentState[0].consultationMemo,
              )
            },
          })
        },
      })
      userLogs(`수강생 ID:${studentId} 메모 등록`)
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
            <Button2
              buttonType="submit"
              width="100%"
              height="2.5rem"
              typeBorder={true}
              fontColor="#fff"
              bgColor="#007de9"
            >
              등록
            </Button2>
          </MemoBtn>
        </MemoBox>
      </DetailForm>
    </>
  )
}
