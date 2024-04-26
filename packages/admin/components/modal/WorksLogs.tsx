import styled from 'styled-components'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Radio,
  RadioGroup,
  ScrollShadow,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import SubjectItem from '@/components/table/SubjectItem'
import { useForm } from 'react-hook-form'

const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
`
const Noti = styled.p`
  span {
    color: red;
  }
`
const UpdateTime = styled.p`
  span {
    color: #555;
  }
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`

export default function SubjectModal({
  isOpen,
  onClose,
  // setValue,
  // subjectSelected,
  // setSubjectSelected,
  // radio = false,
  // setSubjectSelectedData = null,
  // setSub = null,
}) {
  const router = useRouter()
  const [currentSubjectPage, setCurrentSubjectPage] = useState(1)
  const [currentSubjectLimit, setCurrentSubjectLimit] = useState(5)
  const [searchSubjectMutation] = useMutation(SEARCH_SUBJECT_MUTATION)
  const [subjectList, setSubjectList] = useState(null)
  const [subjectSearch, setSubjectSearch] = useState(null)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      subjectName: '',
    },
  })

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    searchSubjectMutation({
      variables: {
        subjectName: subjectSearch,
        exposure: true,
        page: currentSubjectPage,
        limit: currentSubjectLimit,
      },
      onCompleted: resData => {
        if (resData.searchSubject.ok) {
          const { result, totalCount } = resData.searchSubject || {}
          setSubjectList({ result, totalCount })
        }
      },
    })
  }, [router, currentSubjectPage, subjectSearch])

  // const handleSbjChange = values => {
  //   setSubjectSelected(values)
  // }

  // const clickSbjSubmit = async () => {
  //   if (radio) {
  //     const data = await searchSubjectMutation({
  //       variables: {
  //         searchSubjectId: parseInt(subjectSelected),
  //       },
  //     })
  //     if (!data.data.searchSubject.ok) {
  //       throw new Error('과목 검색 실패')
  //     }
  //     const { result } = data.data.searchSubject || {}
  //     setSubjectSelectedData(result[0])
  //     if (setSub !== null) {
  //       setSub(result[0].subDiv)
  //     }
  //   }
  //   setValue('subject', subjectSelected, { shouldDirty: true })
  //   sbjClose()
  // }

  const formatDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours().toString().padStart(2, '0')}:` +
        `${date.getMinutes().toString().padStart(2, '0')}:` +
        `${date.getSeconds().toString().padStart(2, '0')}`
      return formatted
    } else {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} `
      return formatted
    }
  }
  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {sbjClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                업무일지
              </ModalHeader>
              <ModalBody>
                <DetailDiv>
                  <FlexBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>훈련과정명</FilterLabel>
                        <LineBox>웹툰콘텐츠 제작</LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>훈련기간</FilterLabel>
                        <LineBox>2024-01-02 ~2024-02-01</LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>훈련일자</FilterLabel>
                        <LineBox>2024-02-12 금요일 (2일/20일)</LineBox>
                      </div>
                    </AreaBox>
                  </FlexBox>
                </DetailDiv>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={sbjClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose()
                  }}
                >
                  일지 등록
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
