import { CREATE_EDU_INFOMATION_MUTATION } from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'
import {
  Button,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { styled } from 'styled-components'

const TableArea = styled.div`
  padding-bottom: 1.5rem;
`

const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`

const ClickBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.red};
  }
`

const ClickForm = styled.form`
  display: flex;
  width: 100%;
  align-items: flex-start;
`
const Ttext = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.23}px;
`

const Tselect = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.2}px;
`

const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 16%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.16}px;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const TableItem = styled.div`
  position: relative;
  width: 100%;
  min-width: fit-content;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
`

const TableRow = styled.div`
  display: flex;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

export default function EducationalHistoryForm({ paymentId, subjectId }) {
  const { userLogs } = useUserLogsMutation()
  const [createEduInfo] = useMutation(CREATE_EDU_INFOMATION_MUTATION)
  const [educationValue, setEducationValue] = useState('학력선택')
  const [graduationValue, setGraduationValue] = useState('졸업여부')
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    createEduInfo({
      variables: {
        subjectId: subjectId,
        studentPaymentId: paymentId,
        eduType: data.eduType === '' ? null : data.eduType,
        eduName: data.eduName === '' ? null : data.eduName,
        graduationStatus:
          data.graduationStatus === '' ? null : data.graduationStatus,
        major: data.major === '' ? null : data.major,
      },
      onCompleted: result => {
        userLogs(
          `paymentId: ${paymentId} 학력 등록`,
          `ok: ${result.createEduInfomation.ok}`,
        )
        if (result.createEduInfomation.ok) {
          alert('학력이 추가되었습니다.')
          reset()
          setEducationValue('학력선택')
          setGraduationValue('졸업여부')
        }
      },
    })
  }

  const handleEducationChange = e => {
    setEducationValue(e.target.value)
  }
  const handleGraduationChange = e => {
    setGraduationValue(e.target.value)
  }

  return (
    <TableArea>
      <ScrollShadow orientation="horizontal" className="scrollbar">
        <TableWrap>
          <Theader>
            <TheaderBox>
              <ClickBox>
                <Tselect>
                  학력 <span>*</span>
                </Tselect>
                <Ttext>
                  학교명 <span>*</span>
                </Ttext>
                <Ttext>전공</Ttext>
                <Tselect>졸업여부</Tselect>
                <Tbtn></Tbtn>
              </ClickBox>
            </TheaderBox>
          </Theader>
          <TableItem>
            <TableRow>
              <ClickForm onSubmit={handleSubmit(onSubmit)}>
                <Tselect>
                  <Controller
                    control={control}
                    name="eduType"
                    rules={{
                      required: {
                        value: true,
                        message: '학력을 선택해주세요',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label={<p className="hidden">학력</p>}
                        variant="bordered"
                        size="sm"
                        selectedKeys={[educationValue]}
                        onChange={value => {
                          if (value.target.value !== '') {
                            field.onChange(value)
                            handleEducationChange(value)
                          }
                        }}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'학력선택'} key={'학력선택'}>
                          학력선택
                        </SelectItem>
                        <SelectItem value={'초등학교'} key={'초등학교'}>
                          초등학교
                        </SelectItem>
                        <SelectItem value={'중학교'} key={'중학교'}>
                          중학교
                        </SelectItem>
                        <SelectItem value={'고등학교'} key={'고등학교'}>
                          고등학교
                        </SelectItem>
                        <SelectItem value={'대학,대학원'} key={'대학,대학원'}>
                          대학,대학원
                        </SelectItem>
                        <SelectItem value={'기타학력'} key={'기타학력'}>
                          기타학력
                        </SelectItem>
                      </Select>
                    )}
                  />
                  {errors.eduType && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.eduType.message)}
                    </p>
                  )}
                </Tselect>
                <Ttext>
                  <Input
                    labelPlacement="outside"
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    type="text"
                    placeholder=" "
                    className="w-full"
                    {...register('eduName', {
                      required: {
                        value: true,
                        message: '학교명을 작성해주세요',
                      },
                    })}
                  />
                  {errors.eduName && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.eduName.message)}
                    </p>
                  )}
                </Ttext>
                <Ttext>
                  <Input
                    labelPlacement="outside"
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    type="text"
                    placeholder=" "
                    className="w-full"
                    {...register('major')}
                  />
                </Ttext>
                <Tselect>
                  <Controller
                    control={control}
                    name="graduationStatus"
                    defaultValue={'졸업여부'}
                    render={({ field }) => (
                      <Select
                        label={<p className="hidden">졸업여부</p>}
                        labelPlacement="outside"
                        variant="bordered"
                        size="sm"
                        selectedKeys={[graduationValue]}
                        onChange={value => {
                          console.log(field)
                          if (value.target.value !== '') {
                            field.onChange(value)
                            handleGraduationChange(value)
                          }
                        }}
                        classNames={{
                          label: 'w-[4rem] pr-0',
                        }}
                      >
                        <SelectItem value={'졸업여부'} key={'졸업여부'}>
                          졸업여부
                        </SelectItem>
                        <SelectItem value={'졸업'} key={'졸업'}>
                          졸업
                        </SelectItem>
                        <SelectItem value={'휴학'} key={'휴학'}>
                          휴학
                        </SelectItem>
                        <SelectItem value={'재학'} key={'재학'}>
                          재학
                        </SelectItem>
                        <SelectItem value={'중퇴'} key={'중퇴'}>
                          중퇴
                        </SelectItem>
                      </Select>
                    )}
                  />
                </Tselect>
                <Tbtn>
                  <BtnBox>
                    <Button
                      type="submit"
                      size="sm"
                      variant="solid"
                      color="primary"
                      className="w-full text-white bg-secondary"
                    >
                      추가
                    </Button>
                  </BtnBox>
                </Tbtn>
              </ClickForm>
            </TableRow>
          </TableItem>
        </TableWrap>
      </ScrollShadow>
    </TableArea>
  )
}
