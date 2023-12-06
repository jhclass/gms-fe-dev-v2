import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'

const TitleLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;
`
const SelectListText = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: var(--nextui-radius-medium);
  border-color: hsl(
    var(--nextui-default-200) /
      var(--nextui-default-200-opacity, var(--tw-border-opacity))
  );
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  -webkit-tap-highlight-color: transparent;
`

export default function ClickList({
  label,
  list,
  defaultValue,
  subjectSelected,
  setSubjectSelected,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleCheckboxChange = values => {
    // values에는 체크된 항목들의 배열이 들어 있음
    setSubjectSelected(values)
  }

  return (
    <>
      <Input
        labelPlacement="outside"
        placeholder="상담과목"
        variant="bordered"
        radius="md"
        type="text"
        label={label}
        defaultValue={defaultValue.join(', ')}
        value={
          subjectSelected.length > 0
            ? subjectSelected.join(', ')
            : defaultValue.join(', ')
        }
        className="w-full"
        onClick={onOpen}
      />
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <CheckboxGroup
                  value={subjectSelected}
                  onChange={handleCheckboxChange}
                >
                  {list?.map(item => (
                    <Checkbox key={item.id} value={item.subjectName}>
                      {item.subjectName}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
