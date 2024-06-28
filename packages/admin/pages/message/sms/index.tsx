import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/message/layout'
import { useState } from 'react'
import SMSTabs from '@/components/items/SMSTabs'
import { Textarea } from '@nextui-org/react'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
  display: flex;
  gap: 1rem;
`
const LeftBox = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
`
const RightBox = styled.div`
  width: calc(100% - 20rem);
  display: flex;
  flex-direction: column;
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

export default function message() {
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [studentFilter, setStudentFilter] = useState()

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={false}
          isWrite={false}
          rightArea={false}
        />
        <ConBox>
          <LeftBox>
            <Textarea
              variant="flat"
              label="문자내용"
              labelPlacement="outside"
              placeholder="문자내용을 작성해주세요."
              minRows={10}
            />
          </LeftBox>
          <RightBox>
            <SMSTabs />
          </RightBox>
        </ConBox>
      </MainWrap>
    </>
  )
}
message.getLayout = page => <Layout>{page}</Layout>
