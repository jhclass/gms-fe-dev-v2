import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationReject from '@/components/table/ConsultationReject'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  DELETE_STUDENT_STATE_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import Layout from '@/pages/consult/layout'

const ConBox = styled.div`
  margin: 2rem 0;
`

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default function ConsultReject() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const [checkItem, setCheckItem] = useState([])
  const [deleteStudent] = useMutation(DELETE_STUDENT_STATE_MUTATION)
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const [searchResult, setSearchResult] = useState(null)

  const clickDelete = data => {
    const isDelete = confirm('상담카드를 삭제시겠습니까?')
    if (isDelete) {
      deleteStudent({
        variables: {
          deleteStudentStateId: data,
        },
        onCompleted: result => {
          if (result.deleteStudentState.ok) {
            searchStudentStateMutation({
              variables: {
                progress: 110,
                page: currentPage,
                limit: currentLimit,
              },
              onCompleted: resData => {
                if (resData.searchStudentState.ok) {
                  const { studentState, totalCount } =
                    resData.searchStudentState || {}
                  setSearchResult({ studentState, totalCount })
                  setCheckItem([])
                  const dirtyFieldsArray = [...Object.values(checkItem)]
                  userLogs(`ID : [${dirtyFieldsArray}] 상담카드 삭제`)
                  alert('상담카드가 삭제되었습니다.')
                }
              },
            })
          }
        },
      })
    }
  }

  return (
    <>
      <MainWrap>
        <Breadcrumb
          isFilter={false}
          isWrite={false}
          rightArea={mGrade < grade.general ? true : false}
          addRender={
            <DeleteDiv>
              {checkItem?.length !== 0 && (
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="primary"
                  className="bg-white min-w-unit-1"
                  onClick={() => setCheckItem([])}
                  startContent={<i className="xi-redo" />}
                ></Button>
              )}
              <Button
                isDisabled={checkItem?.length === 0 ? true : false}
                size="sm"
                radius="sm"
                variant="solid"
                className="text-white bg-accent"
                onClick={() => clickDelete(checkItem)}
              >
                {checkItem?.length !== 0 && <>{checkItem?.length}건 </>}
                삭제
              </Button>
            </DeleteDiv>
          }
        />
        <ConBox>
          <ConsultationReject
            currentLimit={currentLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            checkItem={checkItem}
            setCheckItem={setCheckItem}
          />
        </ConBox>
      </MainWrap>
    </>
  )
}
ConsultReject.getLayout = page => <Layout>{page}</Layout>
