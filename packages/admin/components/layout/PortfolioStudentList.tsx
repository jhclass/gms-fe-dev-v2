import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { completionStatus } from '@/lib/recoilAtoms'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_PORTFLIO_STUDDENTS_QUERY } from '@/graphql/queries'
import { Chip } from '@nextui-org/react'
import { ResultSearchSm } from '@/src/generated/graphql'
import { useEffect, useState } from 'react'

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

type searchSMQuery = {
  searchSM: ResultSearchSm
}

export default function PortfolioTab({
  lectureId,
  sortStudents,
  setPaymentId,
  setStudentName,
  setIsCreateOpen,
}) {
  const completion = useRecoilValue(completionStatus)
  const [portfolioStudentId, setPortfolioStudentId] = useState([])
  const {
    error,
    data: portfolioData,
    refetch,
  } = useSuspenseQuery<searchSMQuery>(SEARCH_PORTFLIO_STUDDENTS_QUERY, {
    variables: {
      modelType: 'StudentPortfolio',
      lectureId: lectureId,
    },
  })

  useEffect(() => {
    if (portfolioData) {
      const sort = portfolioData.searchSM.data.map(student => student.studentId)
      setPortfolioStudentId(sort)
    }
  }, [portfolioData])

  if (error) {
    console.log(error)
  }

  const clickPortFolio = (id, name) => {
    setPaymentId(id)
    setStudentName(name)
    setIsCreateOpen(true)
  }

  return (
    <>
      <AreaTitle>
        <h4>포트폴리오</h4>
      </AreaTitle>
      <FlexChipBox>
        {sortStudents &&
          sortStudents
            .filter(student => student.courseComplete !== completion.dropout)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => clickPortFolio(item.id, item.student.name)}
              >
                <Chip
                  endContent={
                    <>
                      {portfolioStudentId.includes(item.student.id) ? (
                        <p className="text-[1rem] text-primary">
                          <i className="xi-check-circle" />
                        </p>
                      ) : (
                        <p className="text-[1rem] text-gray">
                          <i className="xi-close-circle" />
                        </p>
                      )}
                    </>
                  }
                  variant="bordered"
                  className={'hover:border-primary leading-none'}
                >
                  {item.student.name}
                </Chip>
              </button>
            ))}
      </FlexChipBox>
    </>
  )
}
