import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { subStatusState, subjectPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useState } from 'react'

type ConsultFilterProps = {
  isActive: boolean
}

const FilterBox = styled(motion.div)`
  overflow: hidden;
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const BoxTop = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;
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

export default function SubjectsFillter({
  isActive,
  onFilterSearch,
  setSubjectFilter,
}) {
  const subStatus = useRecoilValue(subStatusState)
  const subjectPage = useResetRecoilState(subjectPageState)
  const [sub, setSub] = useState('-')
  const [exposure, setExposure] = useState('-')
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      exposure: '-',
      subDiv: '-',
      subjectName: '',
    },
  })

  const handleSubChange = e => {
    setSub(e.target.value)
  }

  const handleExposureChange = e => {
    setExposure(e.target.value)
  }
  const onSubmit = data => {
    if (isDirty) {
      const filter = {
        subjectName: data.subjectName === '' ? null : data.subjectName,
        subDiv: data.subDiv === '-' ? null : data.subDiv,
        exposure:
          data.exposure === '-'
            ? null
            : data.exposure === '노출'
            ? true
            : false,
      }
      setSubjectFilter(filter)
      onFilterSearch(true)
      subjectPage()
    }
  }

  const handleReset = () => {
    setSub('-')
    setExposure('-')
    reset()
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxTop>
            <ItemBox>
              <Controller
                control={control}
                name="subDiv"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={<FilterLabel>수강구분</FilterLabel>}
                    placeholder=" "
                    defaultValue={'-'}
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[sub]}
                    onChange={value => {
                      if (value.target.value !== '') {
                        field.onChange(value)
                        handleSubChange(value)
                      }
                    }}
                  >
                    {Object.entries(subStatus).map(([key, item]) =>
                      key === '0' ? (
                        <SelectItem value="-" key={'-'}>
                          -
                        </SelectItem>
                      ) : (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </Select>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                name="exposure"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={<FilterLabel>노출여부</FilterLabel>}
                    placeholder=" "
                    defaultValue={'-'}
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[exposure]}
                    onChange={value => {
                      if (value.target.value !== '') {
                        field.onChange(value)
                        handleExposureChange(value)
                      }
                    }}
                  >
                    <SelectItem value="-" key={'-'}>
                      -
                    </SelectItem>
                    <SelectItem value="노출" key={'노출'}>
                      노출
                    </SelectItem>
                    <SelectItem value="미노출" key={'미노출'}>
                      미노출
                    </SelectItem>
                  </Select>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="과목명"
                {...register('subjectName')}
              />
            </ItemBox>
          </BoxTop>
          <BtnBox>
            <Button
              buttonType="submit"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              typeBorder={true}
              fontColor="#fff"
              bgColor="#007de9"
            >
              검색
            </Button>
            <Button
              buttonType="reset"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              fontColor="#007de9"
              bgColor="#fff"
              borderColor="#007de9"
              typeBorder={true}
              onClick={handleReset}
            >
              초기화
            </Button>
          </BtnBox>
        </FilterForm>
      </FilterBox>
    </>
  )
}
