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
  width: 60%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 360px;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 102px;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 132px;
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

export default function SubjectModal({
  sbjIsOpen,
  sbjClose,
  setValue,
  subjectSelected,
  setSubjectSelected,
  radio = false,
  setSubjectSelectedData = null,
  subjectSelectedID = null,
}) {
  const router = useRouter()
  const [currentSubjectPage, setCurrentSubjectPage] = useState(1)
  const [currentSubjectLimit, setCurrentSubjectLimit] = useState(5)
  const [searchSubjectMutation] = useMutation(SEARCH_SUBJECT_MUTATION)
  const [subjectList, setSubjectList] = useState(null)
  const [subjectSearch, setSubjectSearch] = useState(null)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      subjectName: '',
    },
  })
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    if (subjectSelectedID !== null) {
      setSubjectSelected(String(subjectSelectedID))
    }
  }, [sbjIsOpen])

  useEffect(() => {
    searchSubjectMutation({
      variables: {
        subjectName: subjectSearch,
        exposure: true,
        page: currentSubjectPage,
        limit: currentSubjectLimit,
      },
      onCompleted: resData => {
        const { result, totalCount } = resData.searchSubject || {}
        setSubjectList({ result, totalCount })
      },
    })
  }, [router, currentSubjectPage, subjectSearch])

  const handleSbjChange = values => {
    setSubjectSelected(values)
  }

  const clickSbjSubmit = () => {
    if (radio) {
      searchSubjectMutation({
        variables: {
          searchSubjectId: parseInt(subjectSelected),
        },
        onCompleted: resData => {
          const { result } = resData.searchSubject || {}
          setSubjectSelectedData(result[0])
        },
      })
    }
    setValue('subject', subjectSelected, { shouldDirty: true })
    sbjClose()
  }

  const onSubjectSubmit = data => {
    setSubjectSearch(data.subjectName)
  }

  const resetSearch = () => {
    setSubjectSearch(null)
    reset()
  }
  return (
    <>
      <Modal size={'2xl'} isOpen={sbjIsOpen} onClose={sbjClose}>
        <ModalContent>
          {sbjClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                상담 과정 선택
              </ModalHeader>
              <ModalBody>
                <BtnArea>
                  <TopBox>
                    <Ttotal>
                      총 <span>{subjectList?.totalCount}</span>건
                    </Ttotal>
                    {subjectSearch !== null && (
                      <Button
                        size="sm"
                        radius="sm"
                        variant="bordered"
                        color="primary"
                        onClick={resetSearch}
                      >
                        전체보기
                      </Button>
                    )}
                    <Button
                      size="sm"
                      radius="sm"
                      variant="solid"
                      className="text-white bg-flag1"
                      onClick={() => {
                        router.push('/subjects')
                      }}
                    >
                      과정 등록/수정
                    </Button>
                  </TopBox>
                  <ItemBox onSubmit={handleSubmit(onSubjectSubmit)}>
                    <Input
                      labelPlacement="outside-left"
                      size="sm"
                      placeholder=" "
                      type="text"
                      variant="bordered"
                      label="과목명"
                      defaultValue={subjectSearch}
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
                <ScrollShadow orientation="horizontal" className="scrollbar">
                  {radio ? (
                    <RadioGroup
                      value={subjectSelected || ''}
                      onValueChange={handleSbjChange}
                      classNames={{
                        wrapper: 'gap-0',
                      }}
                    >
                      <Theader>
                        <TableRow>
                          <Tcheck></Tcheck>
                          <Tname>과정명</Tname>
                          <TsubDiv>수강구분</TsubDiv>
                          <Tfee>과정 금액</Tfee>
                        </TableRow>
                      </Theader>
                      {subjectList?.result !== null &&
                        subjectList?.result.map((item, index) => (
                          <TableItem key={index}>
                            <TableRow>
                              <Radio key={item.id} value={String(item.id)}>
                                <SubjectItem tableData={item} />
                              </Radio>
                            </TableRow>
                          </TableItem>
                        ))}
                      {subjectList?.result === null && (
                        <Nolist>노출중인 과정이 없습니다.</Nolist>
                      )}
                    </RadioGroup>
                  ) : (
                    <CheckboxGroup
                      value={subjectSelected || []}
                      onChange={handleSbjChange}
                      classNames={{
                        wrapper: 'gap-0',
                      }}
                    >
                      <Theader>
                        <TableRow>
                          <Tcheck></Tcheck>
                          <Tname>과정명</Tname>
                          <TsubDiv>수강구분</TsubDiv>
                          <Tfee>과정 금액</Tfee>
                        </TableRow>
                      </Theader>
                      {subjectList?.result !== null &&
                        subjectList?.result.map((item, index) => (
                          <TableItem key={index}>
                            <TableRow>
                              <Checkbox key={item.id} value={item.subjectName}>
                                <SubjectItem tableData={item} />
                              </Checkbox>
                            </TableRow>
                          </TableItem>
                        ))}
                      {subjectList?.result === null && (
                        <Nolist>노출중인 과정이 없습니다.</Nolist>
                      )}
                    </CheckboxGroup>
                  )}
                </ScrollShadow>
                {subjectList?.totalCount !== null && (
                  <PagerWrap>
                    <Pagination
                      variant="light"
                      showControls
                      initialPage={currentSubjectPage}
                      total={Math.ceil(
                        subjectList?.totalCount / currentSubjectLimit,
                      )}
                      onChange={newPage => {
                        setCurrentSubjectPage(newPage)
                      }}
                    />
                  </PagerWrap>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={sbjClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    clickSbjSubmit()
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
