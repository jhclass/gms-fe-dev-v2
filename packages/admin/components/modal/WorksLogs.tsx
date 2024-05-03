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
  Textarea,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import SubjectItem from '@/components/table/SubjectItem'
import { useForm } from 'react-hook-form'
import WorksSchedule from '../table/WorksSchedule'
import WorksTime from '../table/WorksTime'
import WorksRemark from '../table/WorksRemark'

const Title = styled.h2`
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 1rem;

  &:after {
    content: '';
    width: 0.3rem;
    height: 100%;
    background: #07bbae;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0.3rem;
  }
`
const DatailBody = styled.div`
  @media (max-width: 768px) {
    /* overflow-y: auto; */
    overflow-x: hidden;
    height: 60vh;
  }
`

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }

  &.scroll {
    margin-top: 1rem;
    height: 40vh;
    overflow-x: hidden;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  &.reverse {
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
`

const AreaTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    font-size: 1rem;
    font-weight: 600;
  }
`
const AreaSection = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 1.5rem;
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`

const FlexAreaBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  > div {
    flex: 1;
  }
`
const FlexColBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  > div {
    flex: 1;
  }
`

const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`

const StempBox = styled.div`
  display: flex;
  padding: 0.6rem 0;
  height: 5.1rem;
  border: 2px solid hsl(240 6% 90%);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;

  > img {
    height: 100%;
  }
`
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

  &.color {
    color: inherit;
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
                <Title>업무일지</Title>
              </ModalHeader>
              <ModalBody>
                <DatailBody>
                  <ScrollShadow orientation="vertical" className="scrollbar">
                    <DetailDiv>
                      <FlexBox className="reverse">
                        <FlexColBox>
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
                        </FlexColBox>
                        <FlexAreaBox>
                          <AreaBox>
                            <div>
                              <FilterLabel>강사</FilterLabel>
                              <StempBox>
                                <img
                                  src="https://instaclone-uploadsss.s3.ap-northeast-2.amazonaws.com/stamps/2-1714446421459-stamp.png"
                                  alt="Description of image"
                                />
                              </StempBox>
                              <BtnBox>2024.02.01</BtnBox>
                            </div>
                          </AreaBox>
                          <AreaBox>
                            <div>
                              <FilterLabel>팀장</FilterLabel>
                              <StempBox></StempBox>
                              <BtnBox>
                                <Button size="sm" color="primary">
                                  서명
                                </Button>
                              </BtnBox>
                            </div>
                          </AreaBox>
                          <AreaBox>
                            <div>
                              <FilterLabel>원장</FilterLabel>
                              <StempBox></StempBox>
                              <BtnBox>
                                <Button size="sm" color="primary">
                                  서명
                                </Button>
                              </BtnBox>
                            </div>
                          </AreaBox>
                        </FlexAreaBox>
                      </FlexBox>
                      <FlexBox>
                        <AreaBox>
                          <div>
                            <Textarea
                              label="훈련과정명"
                              isDisabled={true}
                              isReadOnly={true}
                              labelPlacement="outside"
                              defaultValue={
                                '과정명엄청길다길다길다과정명엄청길다길다길다과정명엄청길다길다길다과정명엄청길다길다길다과정명엄청길다길다길다'
                              }
                              minRows={1}
                              variant="underlined"
                              size="md"
                              radius="sm"
                              classNames={{
                                base: 'opacity-1',
                              }}
                            ></Textarea>
                          </div>
                        </AreaBox>
                      </FlexBox>
                      <FlexBox>
                        <FlexAreaBox>
                          <div className="text-[#07bbae]">
                            <FilterLabel className="color">재적</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                          <div className="text-[#007de9]">
                            <FilterLabel className="color">출석</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                          <div className="text-[#ff5900]">
                            <FilterLabel className="color">결석</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                        </FlexAreaBox>
                        <FlexAreaBox>
                          <div>
                            <FilterLabel>지각</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                          <div>
                            <FilterLabel>조퇴</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                          <div>
                            <FilterLabel>외출</FilterLabel>
                            <LineBox>
                              <b>0</b>명
                            </LineBox>
                          </div>
                        </FlexAreaBox>
                      </FlexBox>
                    </DetailDiv>
                    <DetailDiv className="scroll">
                      <ScrollShadow
                        orientation="vertical"
                        className="scrollbar"
                      >
                        <AreaSection>
                          <AreaTitle>
                            <h4>훈련사항</h4>
                          </AreaTitle>
                          <WorksSchedule />
                        </AreaSection>
                        <AreaSection>
                          <AreaTitle>
                            <h4>훈련시간</h4>
                          </AreaTitle>
                          <WorksTime />
                        </AreaSection>
                        <AreaSection>
                          <AreaTitle>
                            <h4>지시사항</h4>
                          </AreaTitle>
                          <Textarea
                            label=""
                            placeholder="내용을 작성해주세요."
                            className="w-full"
                            variant="bordered"
                          />
                        </AreaSection>
                        <AreaSection>
                          <AreaTitle>
                            <h4>특이사항</h4>
                          </AreaTitle>
                          <WorksRemark />
                        </AreaSection>
                      </ScrollShadow>
                    </DetailDiv>
                  </ScrollShadow>
                </DatailBody>
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
