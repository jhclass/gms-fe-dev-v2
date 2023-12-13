import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import { Input, Textarea, useDisclosure } from '@nextui-org/react'
import {
  progressStatusState,
  subStatusState,
  receiptStatusState,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_CONSULTATION_MEMO_MUTATION,
  DELETE_CONSULTATION_MEMO_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
  UPDATE_CONSULTATION_MEMO_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY, SEE_SUBJECT_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'

import useMmeQuery from '@/utils/mMe'

const DetailForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
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
  margin-top: 1.5rem;
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
  background: #4f46e5;
  text-align: center;
  font-weight: 700;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.5rem;
`
const MemoName = styled.span`
  color: #11181c;
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

export default function ConsoultMemo(props) {
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const mGrade = useMme('mGrade')
  const [deleteMemo] = useMutation(DELETE_CONSULTATION_MEMO_MUTATION)
  const [updateMemo] = useMutation(UPDATE_CONSULTATION_MEMO_MUTATION)
  const [searchStudentStateMutation, { data, loading, error }] = useMutation(
    SEARCH_STUDENTSTATE_MUTATION,
  )

  const { register, handleSubmit, control } = useForm({})

  const onDelete = data => {
    deleteMemo({
      variables: {
        deleteConsultationMemoId: data,
      },
      onCompleted: () => {
        searchStudentStateMutation({
          variables: {
            searchStudentStateId: parseInt(props.studentId),
          },
          onCompleted: data => {
            props.setMemoList(
              data.searchStudentState.studentState[0].consultationMemo,
            )
          },
        })
      },
    })
  }

  const onSubmit = data => {
    console.log(data)
    updateMemo({
      variables: {
        updateConsultationMemoId: parseInt(data.id),
        content: data.content,
      },
      onCompleted: () => {
        props.setMemoList([])
        searchStudentStateMutation({
          variables: {
            searchStudentStateId: parseInt(props.studentId),
          },
          onCompleted: data => {
            props.setMemoList(
              data.searchStudentState.studentState[0].consultationMemo,
            )
          },
        })
      },
    })
  }

  const fametDate = data => {
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
      const gradeF = data.charAt(0).toUpperCase()
      return gradeF
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
        rules={{
          required: {
            value: true,
            message: '과정을 최소 1개 이상 선택해주세요.',
          },
        }}
        defaultValue={props.item.content}
        render={({ field }) => (
          <>
            <Textarea
              label={
                <MemoInfo>
                  <MemoGrade>{gradeStr(mGrade)}</MemoGrade>
                  <MemoName>{props.item.manageUser?.mUsername}</MemoName>
                  <MemoTime>{fametDate(props.item.createdAt)}</MemoTime>
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
          <Button2
            buttonType="submit"
            width="100%"
            height="2.5rem"
            typeBorder={true}
            fontColor="#fff"
            bgColor="#007de9"
          >
            수정
          </Button2>
          <Button2
            buttonType="button"
            width="100%"
            height="2.5rem"
            fontColor="#007de9"
            bgColor="#fff"
            borderColor="#007de9"
            typeBorder={true}
            onClick={() => onDelete(props.item.id)}
          >
            삭제
          </Button2>
        </MemoListBtn>
      )}
    </DetailForm>
  )
}
