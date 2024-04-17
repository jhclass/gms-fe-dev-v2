import { styled } from 'styled-components'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { UPDATE_FAVORITE_MUTATION } from '@/graphql/mutations'
import { SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'
import Link from 'next/link'
import { Button, Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import LectureReportList from './LectureReportList'

const TableRow = styled.div`
  position: relative;
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
  z-index: 1;
  /* display: grid;
  width: 100%;
  grid-template-columns: 0.5rem 2% auto; */
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
  width: 8%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
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
const EllipsisBox = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ConsolutItem(props) {
  return (
    <>
      <TableRow>
        <ClickBox>
          <Tnum>
            <EllipsisBox>20</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>10</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>50%</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>0</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>0</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>0%</EllipsisBox>
          </Tnum>
          <Tlong>
            <EllipsisBox>0</EllipsisBox>
          </Tlong>
          <Tlong>
            <EllipsisBox>0</EllipsisBox>
          </Tlong>
          <Tnum>
            <EllipsisBox>9</EllipsisBox>
          </Tnum>
          <Tnum>
            <EllipsisBox>100%</EllipsisBox>
          </Tnum>
          <Tlong>
            <EllipsisBox>훈련교육중</EllipsisBox>
          </Tlong>
          <Tlong>
            <EllipsisBox>0</EllipsisBox>
          </Tlong>
        </ClickBox>
      </TableRow>
    </>
  )
}