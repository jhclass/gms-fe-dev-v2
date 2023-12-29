import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { subStatusState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '../common/Button'
import { Chip, Input, Select, SelectItem } from '@nextui-org/react'
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
const BoxArea = styled.div`
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
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;
`
const BoxTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const BoxMiddle = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const BoxBottom = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  width: 70%;
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

export default function TableFillter({ isActive, onCreateToggle }) {
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

  const onSubmit = data => {
    console.log(data)
  }

  const deleteFiled = () => {
    console.log('삭제')
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <BoxArea>
          <BoxTop>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야1
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
            <Chip variant="bordered" onClose={deleteFiled}>
              분야2
            </Chip>
          </BoxTop>
          <BoxBottom>
            <FilterForm onSubmit={handleSubmit(onSubmit)}>
              <ItemBox>
                <Input
                  labelPlacement="outside-left"
                  placeholder=" "
                  type="text"
                  variant="bordered"
                  label="분야명"
                  classNames={{
                    mainWrapper: ['w-[90%]'],
                  }}
                />
                <Button
                  buttonType="submit"
                  width="calc(50% - 0.5rem)"
                  height="2.5rem"
                  typeBorder={true}
                  fontColor="#fff"
                  bgColor="#007de9"
                >
                  등록
                </Button>
              </ItemBox>
            </FilterForm>
          </BoxBottom>
        </BoxArea>
      </FilterBox>
    </>
  )
}
