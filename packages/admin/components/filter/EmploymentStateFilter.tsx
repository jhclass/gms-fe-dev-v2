import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import EmploymentStudentFilterForm from '@/components/form/EmploymentStudentFilterForm'
import EmploymentLectureFilterForm from '@/components/form/EmploymentLectureFilterForm'
import { useRouter } from 'next/router'

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
  setFilterType,
}) {
  const router = useRouter()
  const { typeTab } = router.query
  const [selected, setSelected] = useState('studentPaymentFilter')

  useEffect(() => {
    if (typeTab) {
      setSelected(String(typeTab))
    }
  }, [typeTab])

  const clickTab = e => {
    setFilterType(e)
    setSelected(e)
  }

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
            onSelectionChange={e => clickTab(String(e))}
          >
            <Tab key="studentPaymentFilter" title="학생정보로 검색">
              <EmploymentStudentFilterForm
                onFilterSearch={onFilterSearch}
                setStudentFilter={setStudentFilter}
              />
            </Tab>
            <Tab key="lectureFilter" title="강의정보로 검색">
              <EmploymentLectureFilterForm
                onFilterSearch={onFilterSearch}
                setStudentFilter={setStudentFilter}
              />
            </Tab>
          </Tabs>
        </FilterDiv>
      </FilterBox>
    </>
  )
}
