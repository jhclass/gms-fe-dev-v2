import { ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'
import LectureReportItem from '@/components/items/LectureReportItem'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  assignmentState,
  completionStatus,
  employmentStatus,
} from '@/lib/recoilAtoms'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`
const Tlong = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`

export default function LectureReportTable({ lecture, students }) {
  const assignment = useRecoilValue(assignmentState)
  const completion = useRecoilValue(completionStatus)
  const employment = useRecoilValue(employmentStatus)
  const [isFinish, setIsFinish] = useState(false)
  const [approvedPersonnel, setApprovedPersonnel] = useState(null)
  const [confirmedPersonnel, setConfirmedPersonnel] = useState(null)
  const [enrollmentRate, setEnrollmentRate] = useState(null)
  const [courseDropout, setCourseDropout] = useState(null)
  const [incomplete, setIncomplete] = useState(null)
  const [dropoutRate, setDropoutRate] = useState(null)
  const [earlyEmployment, setEarlyEmployment] = useState(null)
  const [notEarlyEmployed, setNotEarlyEmployed] = useState(null)
  const [graduates, setGraduates] = useState(null)
  const [graduationRate, setGraduationRate] = useState(null)
  const [expectedEmploymentProof, setExpectedEmploymentProof] = useState(null)

  const calculatePercentage = (part, total) => {
    if (total === 0) {
      return 0
    }
    let percentage = (part / total) * 100
    return parseFloat(percentage.toFixed(2))
  }

  const countFilteredStudents = (students, filterCondition) => {
    const filteredStudents = students.filter(filterCondition)
    return filteredStudents.length
  }

  useEffect(() => {
    if (lecture && students) {
      const today = new Date()
      const endDate = new Date(parseInt(lecture.lecturePeriodEnd))
      const earlyEmploymentStudent = students.filter(
        student =>
          student.courseComplete === completion.inTraining &&
          student.employment !== employment.unemployed,
      )

      setApprovedPersonnel(lecture.ApprovedNum)
      setConfirmedPersonnel(lecture.confirmedNum)
      setEnrollmentRate(
        calculatePercentage(lecture.confirmedNum, lecture.ApprovedNum),
      )

      setCourseDropout(
        countFilteredStudents(
          students,
          student => student.courseComplete === completion.dropout,
        ),
      )

      if (earlyEmploymentStudent.length > 0) {
        setEarlyEmployment(
          countFilteredStudents(
            earlyEmploymentStudent,
            student =>
              student.EmploymentStatus[0].completionType === '조기취업' &&
              student.EmploymentStatus[0].imploymentInsurance === 'Y',
          ),
        )
        setNotEarlyEmployed(
          countFilteredStudents(
            earlyEmploymentStudent,
            student =>
              student.EmploymentStatus[0].completionType === '조기취업' &&
              student.EmploymentStatus[0].imploymentInsurance === 'N',
          ),
        )

        setExpectedEmploymentProof(
          countFilteredStudents(
            earlyEmploymentStudent,
            student => student.EmploymentStatus[0].proofOfImployment === 'Y',
          ),
        )
      }

      if (today > endDate) {
        setIncomplete(
          countFilteredStudents(
            students,
            student => student.courseComplete === completion.notCompleted,
          ),
        )
        setGraduates(
          countFilteredStudents(
            students,
            student => student.courseComplete === completion.completed,
          ),
        )
      } else {
        setIncomplete(0)
        setGraduates(0)
      }
    }
  }, [lecture, students])

  useEffect(() => {
    setDropoutRate(
      calculatePercentage(courseDropout + incomplete, lecture.confirmedNum),
    )
    setGraduationRate(calculatePercentage(graduates, lecture.confirmedNum))
  }, [courseDropout, incomplete, graduates])

  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tnum>승인인원</Tnum>
                  <Tnum>확정인원</Tnum>
                  <Tnum>모집률</Tnum>
                  <Tnum>수강포기</Tnum>
                  <Tnum>미수료</Tnum>
                  <Tnum>중도탈락율</Tnum>
                  <Tlong>조기취업 가입</Tlong>
                  <Tlong>조기취업 미가입</Tlong>
                  <Tnum>수료인원</Tnum>
                  <Tnum>수료율</Tnum>
                  <Tlong>재직증명 확보예정</Tlong>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <LectureReportItem
              isFinish={isFinish}
              approvedPersonnel={approvedPersonnel}
              confirmedPersonnel={confirmedPersonnel}
              enrollmentRate={enrollmentRate}
              courseDropout={courseDropout}
              incomplete={incomplete}
              dropoutRate={dropoutRate}
              earlyEmployment={earlyEmployment}
              notEarlyEmployed={notEarlyEmployed}
              graduates={graduates}
              graduationRate={graduationRate}
              expectedEmploymentProof={expectedEmploymentProof}
            />
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
