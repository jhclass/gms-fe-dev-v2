import styled from 'styled-components'
import {
  Button,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react'
import AdviceTypeModalChip from './AdviceTypeModalChip'
import { Suspense, useEffect, useState } from 'react'
import { ResultAdviceType } from '@/src/generated/graphql'
import { useSuspenseQuery } from '@apollo/client'
import { SEE_ADVICE_TYPE_QUERY } from '@/graphql/queries'

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
type seeAdviceTypeQuery = {
  seeAdviceType: ResultAdviceType
}
export default function AdviceTypeModal({
  isOpen,
  onClose,
  setValue,
  adviceTypeSelected,
  setAdviceTypeSelected,
  setAdviceTypeSelectedName,
}) {
  const { error, data } = useSuspenseQuery<seeAdviceTypeQuery>(
    SEE_ADVICE_TYPE_QUERY,
    {
      variables: {
        page: 1,
        category: '상담분야',
        limit: 100,
      },
    },
  )
  const adviceList = data?.seeAdviceType.adviceType

  if (error) {
    console.log(error)
  }
  const handleAdviceChange = values => {
    setAdviceTypeSelected(values)
  }
  const clickAdviceSubmit = () => {
    setValue('adviceTypes', adviceTypeSelected, { shouldDirty: true })
    const typesArray = adviceTypeSelected
      .map(id => {
        const foundObject = adviceList.find(obj => obj.id === id)
        return foundObject ? foundObject.type : null
      })
      .filter(type => type !== null)
    setAdviceTypeSelectedName(typesArray)
    onClose()
  }

  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                상담 분야 선택
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="scrollbar min-h-[10rem]">
                  <CheckboxGroup
                    orientation="horizontal"
                    className="gap-1 radioBox pb-[1rem]"
                    color="secondary"
                    value={adviceTypeSelected}
                    onChange={handleAdviceChange}
                  >
                    <AdviceTypeModalChip adviceList={adviceList} />
                  </CheckboxGroup>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  variant="light"
                  className="text-accent"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => {
                    clickAdviceSubmit()
                  }}
                >
                  선택
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
