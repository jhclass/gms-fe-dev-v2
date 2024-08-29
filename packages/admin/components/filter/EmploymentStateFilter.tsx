import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { studentPageState } from '@/lib/recoilAtoms'
import { useForm } from 'react-hook-form'
import { Button, Input, Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear, subMonths } from 'date-fns'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useRouter } from 'next/router'
import EmploymentStudentFilterForm from '../form/EmploymentStudentFilterForm'
import EmploymentLectureFilterForm from '../form/EmploymentLectureFilterForm'
registerLocale('ko', ko)
const _ = require('lodash')

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
`
const Noti = styled.p`
  font-size: 0.8rem;
  span {
    color: red;
  }
`
const FilterDiv = styled.div`
  width: 100%;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`

const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}

export default function StudentsFilter({
  isActive,
  onFilterSearch,
  setStudentFilter,
  studentFilter,
}) {
  const router = useRouter()
  const { typeTab } = router.query
  const [selected, setSelected] = useState('studentPaymentFilter')

  useEffect(() => {
    if (typeTab) {
      setSelected(String(typeTab))
    }
  }, [typeTab])

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <FilterDiv>
          <Tabs
            variant="underlined"
            aria-label="Options"
            color="primary"
            classNames={{
              tabList: 'flex-wrap',
              tab: 'w-auto',
              panel: 'flex flex-col gap-[2rem]',
            }}
            selectedKey={selected}
            onSelectionChange={e => setSelected(String(e))}
          >
            <Tab key="studentPaymentFilter" title="학생정보로 검색">
              <EmploymentStudentFilterForm
                onFilterSearch={onFilterSearch}
                setStudentFilter={setStudentFilter}
                studentFilter={studentFilter}
              />
            </Tab>
            <Tab key="lectureFilter" title="강의정보로 검색">
              <EmploymentLectureFilterForm
                onFilterSearch={onFilterSearch}
                setStudentFilter={setStudentFilter}
                studentFilter={studentFilter}
              />
            </Tab>
          </Tabs>
        </FilterDiv>
      </FilterBox>
    </>
  )
}
