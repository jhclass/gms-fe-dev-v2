import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { styled } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useState } from 'react'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'

import { CREATE_CERTIFICATE_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'

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
  width: 25%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.25}px;
`

const Tdate = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 0.5rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
`

const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 0.5rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.15}px;
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

const DatePickerBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 21;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  .react-datepicker {
    /* margin-left: 50%; */
  }
  .react-datepicker-wrapper {
    display: inline;
    width: 100%;
  }
  .react-datepicker__input-container {
    display: inline;
  }
  .react-datepicker__close-icon {
    height: 2.5rem;
    top: auto;
    bottom: 0;
  }
  .react-datepicker__triangle {
    left: 1.5rem !important;
    transform: translate(0, 0) !important;
  }
`

export default function AcquisitionForm({ paymentId, subjectId }) {
  const { userLogs } = useUserLogsMutation()
  const [createCertificate] = useMutation(CREATE_CERTIFICATE_MUTATION)
  const [acquisitionDate, setAcquisitionDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    console.log(data)
    console.log(subjectId, paymentId)
    // createCertificate({
    //   variables: {
    //     subjectId: subjectId,
    //     studentPaymentId: paymentId,
    //     eduType: data.eduType === '' ? null : data.eduType,
    //     cAdate: data.cAdate === '' ? null : data.cAdate,
    //     certificateName:
    //       data.certificateName === '' ? null : data.certificateName,
    //     certificateIssuer:
    //       data.certificateIssuer === '' ? null : data.certificateIssuer,
    //     certificateLevel:
    //       data.certificateLevel === '' ? null : data.certificateLevel,
    //   },
    //   onCompleted: result => {
    // console.log(result)
    //   userLogs(
    //     `paymentId: ${paymentId} 자격 취득 현황 등록`,
    //     `ok: ${result.createEduInfomation.ok}`,
    //   )
    //   if (result.createEduInfomation.ok) {
    //     alert('자격 취득 현황이 추가되었습니다.')
    //     reset()
    //     setAcquisitionDate(null)
    //   }
    // },
    // })
  }

  const formatDate = data => {
    const date = new Date(data)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')}`
    return formatted
  }

  return (
    <>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <ClickBox>
                  <Tdate>취득일자</Tdate>
                  <Ttext>자격증명</Ttext>
                  <Ttext>급수</Ttext>
                  <Ttext>발행처</Ttext>
                  <Tbtn></Tbtn>
                </ClickBox>
              </TheaderBox>
            </Theader>
            <TableItem>
              <TableRow>
                <ClickForm onSubmit={handleSubmit(onSubmit)}>
                  <Tdate>
                    <Controller
                      name="cAdate"
                      control={control}
                      rules={{ required: '취득일자를 선택해주세요' }}
                      render={({ field }) => (
                        <>
                          <Input
                            labelPlacement="outside"
                            variant="bordered"
                            radius="sm"
                            size="sm"
                            type="text"
                            placeholder=" "
                            id="date"
                            classNames={{
                              input: 'caret-transparent',
                            }}
                            isReadOnly={true}
                            startContent={<i className="xi-calendar" />}
                            value={field.value ? formatDate(field.value) : ''}
                            onClick={() => setIsOpen(!isOpen)}
                          />
                          {errors.cAdate && (
                            <p className="px-2 pt-2 text-xs text-red">
                              {String(errors.cAdate.message)}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </Tdate>
                  <Ttext>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      type="text"
                      placeholder=" "
                      className="w-full"
                      {...register('certificateName', {
                        required: {
                          value: true,
                          message: '자격증명을 작성해주세요',
                        },
                      })}
                    />
                    {errors.certificateName && (
                      <p className="px-2 pt-2 text-xs text-red">
                        {String(errors.certificateName.message)}
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
                      {...register('certificateLevel')}
                    />
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
                      {...register('certificateIssuer', {
                        required: {
                          value: true,
                          message: '발행처을 작성해주세요',
                        },
                      })}
                    />
                    {errors.certificateIssuer && (
                      <p className="px-2 pt-2 text-xs text-red">
                        {String(errors.certificateIssuer.message)}
                      </p>
                    )}
                  </Ttext>
                  <Tbtn>
                    <BtnBox>
                      <Button
                        type="submit"
                        size="sm"
                        variant="solid"
                        color="primary"
                        className="w-full text-white bg-secondary"
                        // onClick={() => setIsOpen(!isOpen)}
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
      {isOpen && (
        <DatePickerBox>
          <DatePicker
            inline
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
            }) => (
              <DatePickerHeader
                rangeYears={years}
                clickDate={date}
                changeYear={changeYear}
                changeMonth={changeMonth}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
            locale="ko"
            showYearDropdown
            selected={acquisitionDate || null}
            onChange={date => {
              setValue('cAdate', date)
              clearErrors('cAdate')
              setAcquisitionDate(date)
              setIsOpen(false)
            }}
          />
        </DatePickerBox>
      )}
    </>
  )
}
