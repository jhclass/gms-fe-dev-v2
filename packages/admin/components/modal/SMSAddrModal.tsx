import styled from 'styled-components'
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
  Pagination,
  Radio,
  RadioGroup,
  ScrollShadow,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SEARCH_SUBJECT_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import SubjectItem from '@/components/table/SubjectItem'
import { useForm } from 'react-hook-form'

const BtnArea = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const ItemBox = styled.form`
  display: flex;
  gap: 0.5rem;
`
const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const TableRow = styled.div`
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`
const Tcheck = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tpart = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Trank = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tsbject = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

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
                <BtnArea>
                  <TopBox>
                    <RadioGroup
                      orientation="horizontal"
                      value={selected}
                      onValueChange={setSelected}
                      className="gap-[0.65rem]"
                    >
                      <Radio key={'직원'} value={'직원'}>
                        직원
                      </Radio>
                      <Radio key={'강사'} value={'강사'}>
                        강사
                      </Radio>
                      <Radio key={'수강생'} value={'수강생'}>
                        수강생
                      </Radio>
                    </RadioGroup>
                  </TopBox>
                  <ItemBox>
                    <Input
                      labelPlacement="outside-left"
                      size="sm"
                      placeholder=" "
                      type="text"
                      variant="bordered"
                      label="과목명"
                      // defaultValue={subjectSearch}
                      {...register('subjectName')}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      radius="sm"
                      variant="solid"
                      color="primary"
                      className="text-white"
                    >
                      검색
                    </Button>
                  </ItemBox>
                </BtnArea>
                <CheckboxGroup
                  value={groupSelected || []}
                  onChange={handleCheck}
                  classNames={{
                    wrapper: 'gap-0',
                  }}
                >
                  {selected === '직원' ? (
                    <>
                      <Theader>
                        <TableRow>
                          <Tcheck></Tcheck>
                          <Tname>이름</Tname>
                          <Tpart>부서명</Tpart>
                          <Trank>직위/직책</Trank>
                          <Tphone>휴대폰</Tphone>
                        </TableRow>
                      </Theader>
                      <TableItem>
                        <TableRow>
                          <Checkbox key={1} value={'1'}></Checkbox>
                        </TableRow>
                      </TableItem>
                      <Nolist>노출중인 과정이 없습니다.</Nolist>
                    </>
                  ) : selected === '강사' ? (
                    <>
                      <Theader>
                        <TableRow>
                          <Tcheck></Tcheck>
                          <Tname>이름</Tname>
                          <Tsbject>강의분야</Tsbject>
                          <Tphone>휴대폰</Tphone>
                        </TableRow>
                      </Theader>
                      <TableItem>
                        <TableRow>
                          <Checkbox key={1} value={'1'}></Checkbox>
                        </TableRow>
                      </TableItem>
                      <Nolist>노출중인 과정이 없습니다.</Nolist>
                    </>
                  ) : (
                    <>
                      <Theader>
                        <TableRow>
                          <Tcheck></Tcheck>
                          <Tname>이름</Tname>
                          <Tsbject>수강명</Tsbject>
                          <Tphone>휴대폰</Tphone>
                        </TableRow>
                      </Theader>
                      <TableItem>
                        <TableRow>
                          <Checkbox key={1} value={'1'}></Checkbox>
                        </TableRow>
                      </TableItem>
                      <Nolist>노출중인 과정이 없습니다.</Nolist>
                    </>
                  )}
                </CheckboxGroup>
                <PagerWrap>
                  <Pagination
                    variant="light"
                    showControls
                    initialPage={currentPage}
                    page={currentPage}
                    total={Math.ceil(20 / currentLimit)}
                    onChange={newPage => {
                      setCurrentPage(newPage)
                    }}
                  />
                </PagerWrap>
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
