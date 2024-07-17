import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import SMSCard from '@/components/items/SMSCard'
import SMSList from '@/components/table/SMSList'

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
const NotiText = styled.p`
  text-align: center;
  font-size: 0.875rem;
`
const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`
const ConBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
`

export default function SMSTabs({ setMessage }) {
  const [selected, setSelected] = useState('mySMS')

  return (
    <>
      <Tabs
        variant="underlined"
        aria-label="Options"
        color="primary"
        classNames={{
          tabList: 'flex-wrap',
          tab: 'w-auto',
        }}
        selectedKey={selected}
        onSelectionChange={e => setSelected(String(e))}
      >
        <Tab key="mySMS" title="내문자함">
          <SMSCard setMessage={setMessage} />
        </Tab>
        <Tab key="commonSMS" title="공통문자함">
          <SMSCard setMessage={setMessage} />
        </Tab>
        <Tab key="send" title="보낸문자함">
          <SMSList />
        </Tab>
      </Tabs>
    </>
  )
}
