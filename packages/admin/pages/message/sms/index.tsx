import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/message/layout'
import { useEffect, useState } from 'react'
import SMSTabs from '@/components/items/SMSTabs'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import {
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import SMSAddrModal from '@/components/modal/SMSAddrModal'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import {
  CREATE_MESSAGE_STORAGE_MUTATION,
  SEND_SMS_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { SEE_MESSAGE_STORAGE_QUERY } from '@/graphql/queries'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftBox = styled.form`
  width: 24rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: calc(40px + 0.75rem);
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
  }
`

const RightBox = styled.div`
  width: calc(100% - 24rem);
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ByteBox = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  color: #71717a;
  font-size: 0.875rem;
  gap: 0.5rem;
`
const ChipBox = styled.div`
  display: flex;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const RoundBox = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #e3e3e6;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;
`
const DatePickerBox = styled.div`
  width: 100%;
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

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function message() {
  const [sendGruop, setSendGruop] = useState([])
  const [reservationDate, setReservationDate] = useState(null)
  const [saveType, setSaveType] = useState('개인')
  const [sendType, setSendType] = useState('즉시전송')
  const [messageCon, setMessageCon] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [byteLength, setByteLength] = useState(0)
  const [sendSms] = useMutation(SEND_SMS_MUTATION)
  const [createMessageStorage] = useMutation(CREATE_MESSAGE_STORAGE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm()
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formatDate = date => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const day = `0${d.getDate()}`.slice(-2)
    return `${year}${month}${day}`
  }

  const formatTime = date => {
    const d = new Date(date)
    const hours = `0${d.getHours()}`.slice(-2)
    const minutes = `0${d.getMinutes()}`.slice(-2)
    return `${hours}${minutes}`
  }

  useEffect(() => {
    if (isSubmitted) {
      if (!sendGruop || sendGruop.length === 0) {
        setError('receiver', {
          type: 'manual',
          message: '받는사람을 선택해주세요',
        })
      } else {
        clearErrors('receiver')
      }
    }
  }, [isSubmitted, sendGruop])

  const onSubmit = data => {
    setIsSubmitted(true)
    let phoneNumbers
    let sendDate
    let sendTime

    if (sendType === '예약전송') {
      sendDate = formatDate(reservationDate)
      sendTime = formatTime(reservationDate)
      setValue('rDate', sendDate)
      setValue('rTime', sendTime)
    } else {
      sendDate = formatDate(new Date())
      setValue('rDate', sendDate)
    }

    if (data.receiver) {
      phoneNumbers = data.receiver
        .map(item => item.phoneNumber || item.mPhoneNum || item.phoneNum1)
        .filter(Boolean)
        .join(',')
    }

    if (phoneNumbers !== undefined) {
      if (sendType === '예약전송') {
        if (sendDate !== undefined && sendTime !== undefined) {
          console.log('예약전송', data, sendDate, sendTime, phoneNumbers)
          // sendSms({
          //   variables: {
          //     receiver: phoneNumbers,
          //     message: data.message,
          //     rDate: sendDate,
          //     rTime: sendTime,
          //     senderNum: data.senderNum,
          //   },
          //   onCompleted: result => {
          //     if (result.sendSms.ok) {
          //       userLogs(
          //         `문자 메시지 발송예약`,
          //         `발송번호:${data.senderNum} | 수신번호:${phoneNumbers} | 예약일시:${sendDate} ${sendTime}`,
          //       )
          //       alert(
          //         `문자 메시지 발송 예약이 되었습니다.\n예약날짜: ${sendDate}\n 예약시간: ${sendTime}.`,
          //       )
          //     }
          //   },
          // })
        }
      } else {
        if (sendDate !== undefined) {
          console.log('즉시', data, sendDate, phoneNumbers)
          // sendSms({
          //   variables: {
          //     receiver: phoneNumbers,
          //     message: data.message,
          //     rDate: sendDate,
          //     senderNum: data.senderNum,
          //   },
          //   onCompleted: result => {
          //     console.log(result)
          //     if (result.sendSms.ok) {
          //       userLogs(
          //         `문자 메시지 발송`,
          //         `발송번호:${data.senderNum} | 수신번호:${phoneNumbers} | 즉시발송`,
          //       )
          //       alert(`문자 메시지가 발송 되었습니다.`)
          //     }
          //   },
          // })
        }
      }
    }
  }

  const deleteType = index => {
    const updatedGroup = [...sendGruop]
    updatedGroup.splice(index, 1)
    setSendGruop(updatedGroup)
    setValue('receiver', updatedGroup)
  }

  const handleSave = type => {
    const formattedMessage = messageCon
      .replace(/\n/g, '\\n')
      .replace(/ /g, '&nbsp;')
    createMessageStorage({
      variables: {
        message: formattedMessage,
        saveType: type,
      },
      refetchQueries: [SEE_MESSAGE_STORAGE_QUERY],
      onCompleted: result => {
        if (result.createMessageStorage.ok) {
          userLogs(`${type} 문자함 저장`, messageCon)
          alert(`${type} 문자함에 저장 되었습니다.`)
        }
      },
    })
  }

  const handleChange = e => {
    const value = e
    setMessageCon(value)
    const encoder = new TextEncoder()
    const bytes = encoder.encode(value).length
    setByteLength(bytes)
    setValue('message', value)
  }
  return (
    <>
      <MainWrap>
        <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
        <ConBox>
          <LeftBox onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: '내용을 작성해주세요.' }}
              render={({ field }) => (
                <Textarea
                  variant="flat"
                  label={<FilterLabel>문자내용</FilterLabel>}
                  labelPlacement="outside"
                  placeholder="문자내용을 작성해주세요."
                  minRows={10}
                  value={field.value}
                  onChange={e => {
                    handleChange(e.target.value)
                    field.onChange(e)
                  }}
                />
              )}
            />
            {errors.message && (
              <p className="px-2 pt-2 text-xs text-red-500">
                {String(errors.message.message)}
              </p>
            )}
            <ByteBox>
              <p
                style={{
                  color: byteLength > 90 ? '#ff5900' : 'inherit',
                  fontWeight: 700,
                }}
              >
                {byteLength > 90 ? 'LMS' : 'SMS'}
              </p>
              <p>
                {byteLength}/{byteLength > 90 ? '1000' : '90'}byte
              </p>
            </ByteBox>
            <RoundBox>
              <FlexBox>
                <RadioGroup
                  defaultValue="개인"
                  value={saveType}
                  onValueChange={setSaveType}
                  orientation="horizontal"
                  className="gap-[0.65rem]"
                >
                  <Radio key={'개인'} value={'개인'}>
                    <FilterLabel>개인</FilterLabel>
                  </Radio>
                  <Radio key={'공통'} value={'공통'}>
                    <FilterLabel>공통</FilterLabel>
                  </Radio>
                </RadioGroup>
                <Button
                  size="sm"
                  color="primary"
                  variant="bordered"
                  onClick={() => handleSave(saveType)}
                >
                  문자함 저장
                </Button>
              </FlexBox>
            </RoundBox>
            {/* {savedMessage && (
              <div
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{
                  __html: savedMessage.replace(/\n/g, '<br />'),
                }}
              />
            )} */}
            <RoundBox>
              <FlexBox>
                <FilterLabel>받는사람</FilterLabel>
                <Button
                  size="sm"
                  color="primary"
                  variant="bordered"
                  onClick={onOpen}
                >
                  추가
                </Button>
              </FlexBox>
              <ChipBox>
                {sendGruop?.map((item, index) => (
                  <Chip
                    key={index}
                    variant="bordered"
                    onClose={index => deleteType(index)}
                    className={'hover:border-primary'}
                  >
                    {item.mUsername
                      ? item.mUsername
                      : item.name
                      ? item.name
                      : null}
                    <span>
                      {item.mPhoneNum
                        ? `[${item.mPhoneNum}]`
                        : item.phoneNum1
                        ? `[${item.phoneNum1}]`
                        : item.phoneNumber}
                    </span>
                  </Chip>
                ))}
              </ChipBox>
              {errors.receiver && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.receiver.message)}
                </p>
              )}
            </RoundBox>
            <RoundBox>
              <FlexBox>
                <Input
                  isReadOnly={true}
                  labelPlacement="outside"
                  placeholder="'-'없이 작성해주세요"
                  variant="faded"
                  radius="md"
                  type="text"
                  label={<FilterLabel>보내는사람</FilterLabel>}
                  maxLength={11}
                  value={'01041942040'}
                  onChange={e => {
                    register('senderNum').onChange(e)
                  }}
                  className="w-full"
                  {...register('senderNum', {
                    required: {
                      value: true,
                      message: '휴대폰번호를 입력해주세요.',
                    },
                    maxLength: {
                      value: 11,
                      message: '최대 11자리까지 입력 가능합니다.',
                    },
                    minLength: {
                      value: 10,
                      message: '최소 10자리 이상이어야 합니다.',
                    },
                    pattern: {
                      value: /^010[0-9]{7,8}$/,
                      message: '010으로 시작해주세요.',
                    },
                  })}
                />
              </FlexBox>
              {errors.senderNum && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.senderNum.message)}
                </p>
              )}
            </RoundBox>
            <RoundBox>
              <FlexBox>
                <RadioGroup
                  defaultValue="즉시전송"
                  value={sendType}
                  onValueChange={setSendType}
                  orientation="horizontal"
                  className="gap-[0.65rem]"
                >
                  <Radio key={'즉시전송'} value={'즉시전송'}>
                    <FilterLabel>즉시전송</FilterLabel>
                  </Radio>
                  <Radio key={'예약전송'} value={'예약전송'}>
                    <FilterLabel>예약전송</FilterLabel>
                  </Radio>
                </RadioGroup>
              </FlexBox>
              {sendType === '예약전송' && (
                <FlexBox className="mt-[1rem]">
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="rTime"
                      rules={{
                        required: {
                          value: true,
                          message: '예약 날짜와 시간을 선택해주세요.',
                        },
                      }}
                      render={({ field }) => (
                        <DatePicker
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
                          selected={
                            reservationDate === null
                              ? null
                              : new Date(reservationDate)
                          }
                          placeholderText="예약 일시를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setReservationDate(date)
                          }}
                          showTimeSelect
                          dateFormat="yyyy/MM/dd HH:mm"
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              label="예약일시"
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              id="date"
                              classNames={{
                                input: 'caret-transparent',
                              }}
                              isReadOnly={true}
                              startContent={<i className="xi-calendar" />}
                            />
                          }
                        />
                      )}
                    />
                  </DatePickerBox>
                </FlexBox>
              )}
              {errors.rTime && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.rTime.message)}
                </p>
              )}
            </RoundBox>
            <RoundBox>
              <Button type="submit" color="primary" className="w-full">
                문자 보내기
              </Button>
            </RoundBox>
          </LeftBox>
          <RightBox>
            <SMSTabs setMessageCon={setMessageCon} setValue={setValue} />
          </RightBox>
        </ConBox>
      </MainWrap>
      <SMSAddrModal
        isOpen={isOpen}
        onClose={onClose}
        setSendGruop={setSendGruop}
        sendGruop={sendGruop}
        setValue={setValue}
      />
    </>
  )
}
message.getLayout = page => <Layout>{page}</Layout>
