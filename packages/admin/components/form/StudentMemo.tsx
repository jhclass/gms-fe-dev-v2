import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  DELETE_STUDENT_MEMO_MUTATION,
  SEARCH_STUDENT_MEMO_MUTATION,
  UPDATE_STUDENT_MEMO_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import useMmeQuery from '@/utils/mMe'

const DetailForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`

const MemoListBtn = styled.p`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  button {
    width: 5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;

    button {
      width: 50%;
    }
  }
`
const MemoInfo = styled.label`
  display: flex;
  gap: 0.3rem;
`
const MemoGrade = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  overflow: hidden;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.teriary};
  text-align: center;
  font-weight: 700;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.5rem;
`
const MemoName = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
`
const MemoTime = styled.span``

type memoData = {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  manageUser: {
    id: number
    mUserId: string
    mUsername: string
  }
  manageUserId: number
}

export default function ConsultMemo(props) {
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const { userLogs } = useUserLogsMutation()
  const [deleteMemo] = useMutation(DELETE_STUDENT_MEMO_MUTATION)
  const [updateMemo] = useMutation(UPDATE_STUDENT_MEMO_MUTATION)
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MEMO_MUTATION)
  const { register, handleSubmit, control, formState } = useForm({})
  const { isDirty } = formState
  const onDelete = data => {
    const isDelete = confirm('메모를 삭제하시겠습니까?')
    if (isDelete) {
      deleteMemo({
        variables: {
          deleteStudentMemoId: data,
        },
        onCompleted: result => {
          userLogs(
            `수강생 id:${data} 메모 삭제`,
            `ok:${result.deleteStudentMemo.ok}`,
          )
          if (result.deleteStudentMemo.ok) {
            props.setMemoList([])
            searchStudentMutation({
              variables: {
                searchStudentId: parseInt(props.studentId),
              },
              onCompleted: data => {
                if (data.searchStudent.ok) {
                  props.setMemoList(data.searchStudent.student[0].studentMemo)
                }
              },
            })
          }
        },
      })
    }
  }

  const onSubmit = data => {
    if (isDirty) {
      updateMemo({
        variables: {
          editStudentMemoId: parseInt(data.id),
          content: data.content.trim(),
        },
        onCompleted: result => {
          userLogs(
            `수강생 id:${data.id} 메모 수정`,
            `ok:${result.editStudentMemo.ok}`,
          )
          if (result.editStudentMemo.ok) {
            props.setMemoList([])
            searchStudentMutation({
              variables: {
                searchStudentId: parseInt(props.studentId),
              },
              onCompleted: data => {
                if (data.searchStudent.ok) {
                  props.setMemoList(data.searchStudent.student[0].studentMemo)
                }
              },
            })
          }
        },
      })
    }
  }

  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}:` +
      `${date.getSeconds().toString().padStart(2, '0')}`

    return formatted
  }

  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

  return (
    <DetailForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        labelPlacement="outside"
        placeholder=" "
        variant="bordered"
        radius="md"
        type="text"
        label="아이디"
        defaultValue={props.item?.id}
        value={props.item?.id}
        className="hidden w-full"
        {...register('id')}
      />
      <Controller
        name="content"
        control={control}
        defaultValue={props.item.content}
        render={({ field }) => (
          <>
            <Textarea
              label={
                <MemoInfo>
                  <MemoGrade>
                    {gradeStr(props.item.manageUser?.mUserId)}
                  </MemoGrade>
                  <MemoName>{props.item.manageUser?.mUsername}</MemoName>
                  <MemoTime>{formatDate(props.item.updatedAt)}</MemoTime>
                </MemoInfo>
              }
              ref={field.ref}
              isReadOnly={mId == props.item.manageUser?.id ? false : true}
              variant="faded"
              className="max-w-full"
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              {...register('content')}
            />
          </>
        )}
      />
      {mId == props.item.manageUser?.id && (
        <MemoListBtn>
          <Button type="submit" color="primary" className="w-full text-white">
            수정
          </Button>
          <Button
            variant="bordered"
            color="primary"
            className="w-full text-primary"
            onClick={() => onDelete(props.item.id)}
          >
            삭제
          </Button>
        </MemoListBtn>
      )}
    </DetailForm>
  )
}
