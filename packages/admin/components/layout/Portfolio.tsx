import styled from 'styled-components'
import { Suspense, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { Chip } from '@nextui-org/react'
import { useRecoilValue } from 'recoil'
import { completionStatus } from '@/lib/recoilAtoms'
import PortfolioForm from '@/components/form/PortfolioForm'

const DetailBox = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Noti = styled.p`
  font-size: 0.75rem;

  span {
    color: red;
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: right;
  }
`
const LodingDiv = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FlexChipBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export default function Portfolio({ students }) {
  const [isCreate, setIsCreate] = useState(false)
  const completion = useRecoilValue(completionStatus)
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')
  const naturalCompare = (a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  }
  const sortStudents = students.sort((a, b) => {
    return naturalCompare(a.student.name, b.student.name)
  })
  // console.log(students)

  return (
    <>
      <DetailBox>
        <DetailDiv>
          <AreaTitle>
            <h4>포트폴리오</h4>
          </AreaTitle>
          <FlexChipBox>
            <button>
              <Chip
                endContent={
                  <p className="text-[1rem] text-primary">
                    <i className="xi-check-circle" />
                  </p>
                }
                variant="bordered"
                className={'hover:border-primary leading-none'}
              >
                학생이름
              </Chip>
            </button>
            {sortStudents &&
              sortStudents
                .filter(
                  student => student.courseComplete !== completion.dropout,
                )
                .map((item, index) => (
                  <button key={index}>
                    <Chip
                      endContent={
                        <p className="text-[1rem] text-gray">
                          <i className="xi-close-circle" />
                        </p>
                      }
                      variant="bordered"
                      className={'hover:border-primary leading-none'}
                    >
                      {item.student.name}
                    </Chip>
                  </button>
                ))}
          </FlexChipBox>
        </DetailDiv>
      </DetailBox>
      <DetailBox>
        <DetailDiv>
          <PortfolioForm
            setIsCreate={setIsCreate}
            // subjectId={subjectId}
          />
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            {/* <ReaularEvaluationList
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              lectureId={lectureId}
              subjectId={subjectId}
              mId={mId}
            /> */}
          </Suspense>
        </DetailDiv>
      </DetailBox>
    </>
  )
}
