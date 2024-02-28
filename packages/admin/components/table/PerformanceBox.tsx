import { useMutation, useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_STUDENT_QUERY } from '@/graphql/queries'
import router from 'next/router'
import StudentItem from '@/components/table/StudentItem'
import { useRecoilState } from 'recoil'
import { studentPageState } from '@/lib/recoilAtoms'
import PerformanceItem from './PerformanceItem'
import PerformanceTotal from './PerformanceTotal'
import { SEARCH_PAYMENT_MUTATION } from '@/graphql/mutations'

const TableArea = styled.div``
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 700px;
  border-bottom: 1px solid #e4e4e7;
  border-radius: 0.5rem;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
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
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.15}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.2}px;
`
const TSubject = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.4}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${600 * 0.25}px;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-size: 0.875rem;
  color: #71717a;
`

export default function PerformanceBox({ managerData }) {
  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tnum>No</Tnum>
                <TcreatedAt>등록일시</TcreatedAt>
                <TSubject>과정명</TSubject>
                <Tamount>실 수강료</Tamount>
              </TheaderBox>
            </Theader>
            {managerData?.totalCount > 0 && (
              <>
                {managerData?.payments.map((item, index) => (
                  <PerformanceItem
                    key={index}
                    tableData={item}
                    itemIndex={index}
                  />
                ))}
              </>
            )}
            {managerData?.totalCount === 0 && (
              <Nolist>데이터가 없습니다.</Nolist>
            )}
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}
