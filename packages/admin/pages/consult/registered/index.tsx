import MainWrap from '@/components/wrappers/MainWrap'
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
import ConsultationRegistered from '@/components/table/ConsultationRegistered'

const ConBox = styled.div`
  margin: 2rem 0;
`

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default function Consult() {
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
        onCompleted: () => {
          searchStudentStateMutation({
            variables: {
              progress: 60,
              page: currentPage,
              limit: currentLimit,
            },
            onCompleted: resData => {
              const { studentState, totalCount } =
                resData.searchStudentState || {}
              setSearchResult({ studentState, totalCount })
            },
          })
          setCheckItem([])
          const dirtyFieldsArray = [...Object.values(checkItem)]
          alert('상담카드가 삭제되었습니다.')
          userLogs(`ID : [${dirtyFieldsArray}] 상담카드 삭제`)
        },
      })
    }
  }

  return (
    <>
      <MainWrap>
        <Breadcrumb
          rightArea={true}
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
                size="sm"
                radius="sm"
                variant="solid"
                className="text-white bg-flag1"
                onClick={() => clickDelete(checkItem)}
              >
                {checkItem?.length !== 0 && <>{checkItem?.length}건 </>}
                삭제
              </Button>
            </DeleteDiv>
          }
        />
        <ConBox>
          <ConsultationRegistered
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