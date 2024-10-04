import { Suspense, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Layout from '@/pages/consult/layout'
import ConsultationTable from '@/components/table/ConsultationTable'
import ConsultationFilterTable from '@/components/table/ConsultationFilterTable'
import ConsultationFilter from '@/components/filter/ConsultationFilter'
import { ResultSearchPermissionsGranted } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { SEARCH_PERMISSIONS_GRANTED_QUERY } from '@/graphql/queries'
import ConsultationManagerTable from '../table/ConsultationManagerTable'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function ConsultBranch({
  studentManagerFilter,
  studentFilter,
  filterSearch,
  supervisor,
  mUsername,
}) {
  console.log(supervisor)
  return (
    <>
      <ConBox>
        {supervisor ? (
          <>
            {filterSearch ? (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <ConsultationFilterTable studentFilter={studentFilter} />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <ConsultationTable />
              </Suspense>
            )}
          </>
        ) : (
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <ConsultationManagerTable
              mUsername={mUsername}
              filterSearch={filterSearch}
              studentManagerFilter={studentManagerFilter}
            />
          </Suspense>
        )}
      </ConBox>
    </>
  )
}
