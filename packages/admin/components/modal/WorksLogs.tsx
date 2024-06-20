import styled from 'styled-components'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import WorksSchedule from '@/components/table/WorksSchedule'
import WorksTime from '@/components/table/WorksTime'
import WorksRemark from '@/components/table/WorksRemark'
import { SEARCH_WORKLOGS_QUERY, SEE_ATTENDANCE_QUERY } from '@/graphql/queries'

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

export default function WorksLogsModal({
  isOpen,
  onClose,
  lectureId,
  workLogeDate,
}) {
  const [seeAttendance] = useLazyQuery(SEE_ATTENDANCE_QUERY)
  const [searchWorkLog] = useLazyQuery(SEARCH_WORKLOGS_QUERY)
  const [workLogData, setWorkLogData] = useState(null)
  const [attendanceData, setAttendanceData] = useState(null)
  const [trainingData, setTrainingData] = useState({
    trainingInfoOne: ['1교시', '', '', '', ''],
    trainingInfoTwo: ['2교시', '', '', '', ''],
    trainingInfoThree: ['3교시', '', '', '', ''],
    trainingInfoFour: ['4교시', '', '', '', ''],
    trainingInfoFive: ['5교시', '', '', '', ''],
    trainingInfoSix: ['6교시', '', '', '', ''],
    trainingInfoSeven: ['7교시', '', '', '', ''],
    trainingInfoEight: ['8교시', '', '', '', ''],
  })

  const fetchWorkLogData = async (date, id) => {
    const { data } = await searchWorkLog({
      variables: {
        workLogsDate: date,
        lecturesId: id,
      },
    })
    return data?.searchWorkLogs?.data[0] || []
  }
  const fetchWorkLog = async (date, id) => {
    try {
      const data = await fetchWorkLogData(date, id)
      setWorkLogData(data)
    } catch (error) {
      console.error('작업 로그 데이터를 가져오는 중 오류 발생:', error)
    }
  }
  const fetchAttendanceForDate = async (date, id) => {
    const { data } = await seeAttendance({
      variables: {
        attendanceDate: date,
        lecturesId: id,
      },
    })
    return data?.seeAttendance || []
  }

  const fetchAttendance = async (date, id) => {
    try {
      const data = await fetchAttendanceForDate(date, id)
      setAttendanceData(data)
    } catch (error) {
      console.error('작업 로그 데이터를 가져오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (lectureId && workLogeDate) {
      fetchWorkLog(workLogeDate, lectureId)
      fetchAttendance(workLogeDate, lectureId)
    }
  }, [workLogeDate, lectureId])

  useEffect(() => {
    if (workLogData) {
      setTrainingData({
        trainingInfoOne:
          workLogData.trainingInfoOne.length === 0
            ? ['1교시', '', '', '', '']
            : workLogData.trainingInfoOne,
        trainingInfoTwo:
          workLogData.trainingInfoTwo.length === 0
            ? ['2교시', '', '', '', '']
            : workLogData.trainingInfoTwo,
        trainingInfoThree:
          workLogData.trainingInfoThree.length === 0
            ? ['3교시', '', '', '', '']
            : workLogData.trainingInfoThree,
        trainingInfoFour:
          workLogData.trainingInfoFour.length === 0
            ? ['4교시', '', '', '', '']
            : workLogData.trainingInfoFour,
        trainingInfoFive:
          workLogData.trainingInfoFive.length === 0
            ? ['5교시', '', '', '', '']
            : workLogData.trainingInfoFive,
        trainingInfoSix:
          workLogData.trainingInfoSix.length === 0
            ? ['6교시', '', '', '', '']
            : workLogData.trainingInfoSix,
        trainingInfoSeven:
          workLogData.trainingInfoSeven.length === 0
            ? ['7교시', '', '', '', '']
            : workLogData.trainingInfoSeven,
        trainingInfoEight:
          workLogData.trainingInfoEight.length === 0
            ? ['8교시', '', '', '', '']
            : workLogData.trainingInfoEight,
      })
    }
  }, [workLogData])

  // useEffect(() => {
  //   if (workLogData) {
  //     if (workLogData.paymentOne) {
  //     } else {
  //       fetchAttendanceForDate(workLogeDate, lectureId)
  //     }
  //   }
  // }, [workLogData])

  const { register, handleSubmit, reset, setValue } = useForm()

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} `
    return formatted
  }
  const getWorksLogsDate = data => {
    const week = ['일', '월', '화', '수', '목', '금', '토']

    const dayOfWeek = week[new Date(data).getDay()]

    return dayOfWeek
  }

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
                              <LineBox>
                                {formatDate(
                                  workLogData?.lectures.lecturePeriodStart,
                                )}{' '}
                                ~{' '}
                                {formatDate(
                                  workLogData?.lectures.lecturePeriodEnd,
                                )}
                              </LineBox>
                            </div>
                          </AreaBox>
                          <AreaBox>
                            <div>
                              <FilterLabel>훈련일자</FilterLabel>
                              <LineBox>
                                {workLogeDate} {getWorksLogsDate(workLogeDate)}
                                요일 (
                                {workLogData?.lectures.lectureDetails.indexOf(
                                  workLogeDate,
                                ) + 1}
                                일/
                                {workLogData?.lectures.lectureDetails.length}일)
                              </LineBox>
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
                              <BtnBox>
                                <Button size="sm" color="primary">
                                  서명
                                </Button>
                              </BtnBox>
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
                              defaultValue={workLogData?.lectures.temporaryName}
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
                              <b>
                                {
                                  attendanceData?.enrollData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
                            </LineBox>
                          </div>
                          <div className="text-[#007de9]">
                            <FilterLabel className="color">출석</FilterLabel>
                            <LineBox>
                              <b>
                                {
                                  attendanceData?.attendanceData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
                            </LineBox>
                          </div>
                          <div className="text-[#ff5900]">
                            <FilterLabel className="color">결석</FilterLabel>
                            <LineBox>
                              <b>
                                {
                                  attendanceData?.absentData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
                            </LineBox>
                          </div>
                        </FlexAreaBox>
                        <FlexAreaBox>
                          <div>
                            <FilterLabel>지각</FilterLabel>
                            <LineBox>
                              <b>
                                {
                                  attendanceData?.tardyData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
                            </LineBox>
                          </div>
                          <div>
                            <FilterLabel>조퇴</FilterLabel>
                            <LineBox>
                              <b>
                                {
                                  attendanceData?.leaveEarlyData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
                            </LineBox>
                          </div>
                          <div>
                            <FilterLabel>외출</FilterLabel>
                            <LineBox>
                              <b>
                                {
                                  attendanceData?.outingData.filter(
                                    student =>
                                      student.studentPayment
                                        .lectureAssignment !== '수강철회' &&
                                      student.studentPayment.courseComplete !==
                                        '중도포기',
                                  ).length
                                }
                              </b>
                              명
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
                          <WorksSchedule
                            setValue={setValue}
                            trainingData={trainingData}
                            setTrainingData={setTrainingData}
                          />
                        </AreaSection>
                        <AreaSection>
                          <AreaTitle>
                            <h4>훈련시간</h4>
                          </AreaTitle>
                          <WorksTime />
                        </AreaSection>

                        <AreaSection>
                          <AreaTitle>
                            <h4>출결사항</h4>
                          </AreaTitle>
                          <WorksRemark
                            setValue={setValue}
                            workLogData={workLogData}
                            attendanceData={attendanceData}
                          />
                        </AreaSection>
                        <AreaSection>
                          <AreaTitle>
                            <h4>특이사항</h4>
                          </AreaTitle>
                          <Textarea
                            label=""
                            placeholder="내용을 작성해주세요."
                            className="w-full"
                            variant="bordered"
                            minRows={10}
                          />
                        </AreaSection>
                      </ScrollShadow>
                    </DetailDiv>
                  </ScrollShadow>
                </DatailBody>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={sbjClose}
                >
                  Close
                </Button>
                <Button
                  size="sm"
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
