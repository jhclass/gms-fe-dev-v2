import { styled } from 'styled-components'
import { useSuspenseQuery } from '@apollo/client'
import { SEE_ALARMS_TOTAL_QUERY } from '@/graphql/queries'
import { ResultSeeAlarms } from '@/src/generated/graphql'

const NotiNum = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  min-width: 1.2rem;
  height: 1.2rem;
  border-radius: 1rem;
  position: absolute;
  left: 50%;
  top: -0.2rem;
  background: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  color: #fff;
  line-height: 1rem;
  justify-content: center;
  z-index: 2;

  @media screen and (max-width: 1024px) {
    min-width: 1rem;
    height: 1rem;
    left: 40%;
    top: 0;
    font-size: 0.7rem;
  }
`
type seeAlarmsQuery = {
  seeAlarms: ResultSeeAlarms
}

export default function AlarmsTotal({}) {
  const { error, data } = useSuspenseQuery<seeAlarmsQuery>(
    SEE_ALARMS_TOTAL_QUERY,
  )

  return (
    <NotiNum>
      {data.seeAlarms.totalCount > 100 ? '100+' : data.seeAlarms.totalCount}
    </NotiNum>
  )
}
