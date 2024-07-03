import styled from 'styled-components'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SMSAddrTeacher from '@/components/form/SMSAddrTeacher'
import SMSAddrStudent from '@/components/form/SMSAddrStudent'
import SMSAddrEmployee from '@/components/form/SMSAddrEmployee'

export default function SMSAddrModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(5)
  const [groupSelected, setGroupSelected] = useState(null)
  const [selected, setSelected] = useState('강사')
  const { register, handleSubmit, reset } = useForm()

  const handleCheck = values => {
    setGroupSelected(values)
  }

  return (
    <>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {sbjClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                전화번호 검색
              </ModalHeader>
              <ModalBody>
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
                  <Tab key="student" title="수강생">
                    <SMSAddrStudent />
                  </Tab>
                  <Tab key="employee" title="직원">
                    <SMSAddrEmployee />
                  </Tab>
                  <Tab key="teacher" title="강사">
                    <SMSAddrTeacher />
                  </Tab>
                  <Tab key="input" title="직접입력">
                    <Input
                      labelPlacement="outside"
                      placeholder="'-'없이 작성해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="전화번호"
                      maxLength={11}
                      // onChange={e => {
                      //   register('phoneNum1').onChange(e)
                      // }}
                      className="w-full"
                      // {...register('phoneNum1', {
                      //   required: {
                      //     value: true,
                      //     message: '휴대폰번호를 입력해주세요.',
                      //   },
                      //   maxLength: {
                      //     value: 11,
                      //     message: '최대 11자리까지 입력 가능합니다.',
                      //   },
                      //   minLength: {
                      //     value: 10,
                      //     message: '최소 10자리 이상이어야 합니다.',
                      //   },
                      //   pattern: {
                      //     value: /^010[0-9]{7,8}$/,
                      //     message: '010으로 시작해주세요.',
                      //   },
                      // })}
                    />
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button size="sm" color="primary" onPress={onClose}>
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
