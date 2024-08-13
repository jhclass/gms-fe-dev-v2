import { SEARCH_SM_QUERY } from '@/graphql/queries'
import { ResultSearchSm } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import EducationalHistoryItem from '@/components/items/EducationalHistoryItem'
import { styled } from 'styled-components'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import DropOutItem from '../items/DropOutItem'

const DetailDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  border: 2px solid hsl(240 6% 90%);
  padding: 1rem;
  border-radius: 0.5rem;
`

export default function DropOutList({ students }) {
  return (
    <>
      <DetailDiv>
        {students &&
          students.map((item, index) => (
            <DropOutItem key={index} item={item} />
          ))}
      </DetailDiv>
    </>
  )
}
