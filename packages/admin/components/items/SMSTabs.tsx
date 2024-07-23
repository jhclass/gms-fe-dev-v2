import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  smsFilterActiveState,
  smsFilterState,
  smsSearchState,
} from '@/lib/recoilAtoms'
import SMSCard from '@/components/items/SMSCard'
import SMSList from '@/components/table/SMSList'
import SMSFilterList from '../table/SMSFilterList'
import SmsSendFilter from '../filter/SmsSendFilter'

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

export default function SMSTabs({ setMessageCon, setValue, setByteLength }) {
  const [selected, setSelected] = useState('mySMS')
  const [filterActive, setFilterActive] = useRecoilState(smsFilterActiveState)
  const [filterSearch, setFilterSearch] = useRecoilState(smsFilterState)
  const [smsFilter, setSmsFilter] = useRecoilState(smsSearchState)

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
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <SMSCard
              setMessageCon={setMessageCon}
              setValue={setValue}
              setByteLength={setByteLength}
              type={'개인'}
            />
          </Suspense>
        </Tab>
        <Tab key="commonSMS" title="공통문자함">
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <SMSCard
              setMessageCon={setMessageCon}
              setValue={setValue}
              setByteLength={setByteLength}
              type={'공통'}
            />
          </Suspense>
        </Tab>
        <Tab key="send" title="보낸문자함">
          <SmsSendFilter
            isActive={filterActive}
            onFilterSearch={setFilterSearch}
            setSmsFilter={setSmsFilter}
            smsFilter={smsFilter}
          />
          {filterSearch ? (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <SMSFilterList smsFilter={smsFilter} />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <SMSList />
            </Suspense>
          )}
        </Tab>
      </Tabs>
    </>
  )
}
