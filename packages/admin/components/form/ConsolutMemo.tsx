import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import { Textarea, useDisclosure } from '@nextui-org/react'
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
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY, SEE_SUBJECT_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'

import useMmeQuery from '@/utils/mMe'

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
  line-hieght: 0.8rem;
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
  const memo = props.memoData
  const studentId = props.studentId
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const mGrade = useMme('mGrade')
  const [createMemo] = useMutation(CREATE_CONSULTATION_MEMO_MUTATION)
  const [deleteMemo] = useMutation(DELETE_CONSULTATION_MEMO_MUTATION)
  const [searchStudentStateMutation, { data, loading, error }] = useMutation(
    SEARCH_STUDENTSTATE_MUTATION,
  )

  const [memoList, setMemoList] = useState(memo)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: memo.id,
      content: memo.cotent,
      createdAt: memo.createdAt,
      updatedAt: memo.updatedAt,
      manageUser: {
        id: memo.manageUser,
        mUserId: memo.mUserId,
        mUsername: memo.mUsername,
      },
      manageUserId: memo.manageUserId,
    },
  })

  const onSubmit = data => {
    createMemo({
      variables: {
        content: data.content,
        studentStateId: studentId,
      },
      onCompleted: () => {
        searchStudentStateMutation({
          variables: {
            searchStudentStateId: parseInt(studentId),
          },
          onCompleted: data => {
            setMemoList(
              data.searchStudentState.studentState[0].consultationMemo,
            )
          },
        })
      },
    })
  }

  const onDelete = data => {
    deleteMemo({
      variables: {
        deleteConsultationMemoId: data,
      },
      onCompleted: () => {
        searchStudentStateMutation({
          variables: {
            searchStudentStateId: parseInt(studentId),
          },
          onCompleted: data => {
            setMemoList(
              data.searchStudentState.studentState[0].consultationMemo,
            )
          },
        })
      },
    })
  }

  // const onModify = data => {
  //   console.log(data)
  //   createMemo({
  //     variables: {
  //       content: data.content,
  //       studentStateId: studentId,
  //     },
  //     onCompleted: data => {
  //       console.log(data)
  //     },
  //   })
  // }

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

  useEffect(() => {
    console.log(memoList)
  }, [memoList])

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
            <Button2 buttonType="submit" width="100%" height="2.5rem">
              등록
            </Button2>
          </MemoBtn>
        </MemoBox>
        <MemoList>
          {memoList.map((item, index) => (
            <MemoItem key={index}>
              <Textarea
                label={
                  <MemoInfo>
                    <MemoGrade>{gradeStr(mGrade)}</MemoGrade>
                    <MemoName>{item.manageUser?.mUsername}</MemoName>
                    <MemoTime>{fametDate(item.createdAt)}</MemoTime>
                  </MemoInfo>
                }
                defaultValue={item.content}
                isReadOnly
                variant="faded"
                className="max-w-full"
                onChange={e => {
                  // register('memo').onChange(e)
                }}
                // {...register('memo')}
              />
              {mId == item.manageUser?.id && (
                <MemoListBtn>
                  <Button2 buttonType="button" width="100%" height="2.5rem">
                    수정
                  </Button2>
                  <Button2
                    buttonType="button"
                    typeBorder={true}
                    width="100%"
                    height="2.5rem"
                    onClick={() => onDelete(item.id)}
                  >
                    삭제
                  </Button2>
                </MemoListBtn>
              )}
            </MemoItem>
          ))}
        </MemoList>
      </DetailForm>
    </>
  )
}
