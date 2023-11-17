import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

type CustomInputProps = {
  type?: string
  id?: string
  label?: string
  errors?: any
}

const InputBox = styled(motion.div)`
  margin-top: 0.7rem;
  position: relative;
  padding: 0.375rem 0.75rem;
  width: 100%;
  height: 3.5rem;
  border: 1px solid #fafafa;
  border-radius: 0.75rem;
  font-weight: 400;
  color: #fafafa;
  font-size: 1rem;
`
const Input = styled(motion.input)`
  height: 100%;
  width: 100%;
  padding-top: 1rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background: transparent;

  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0px 0 transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
  }

  &:autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0px 0 transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
  }
`

const Label = styled(motion.label)`
  position: absolute;
  left: 0.75rem;
  font-weight: 200;
  color: #fafafa;
`

const ErrorMessage = styled.p`
  padding: 0.5rem 0.5rem 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: tomato;
`

const InputVariants = {
  initial: {
    top: '1rem',
    fontSize: '1rem',
    opacity: '1',
  },
  focus: {
    top: '0.3rem',
    fontSize: '0.8rem',
    opacity: '0.5',
  },
  hasValue: {
    top: '0.3rem',
    fontSize: '0.8rem',
    opacity: '0.5',
  },
}

export default function CustomRippleButton(
  { type, id, label, errors }: CustomInputProps,
  ref,
) {
  const [isFocused, setIsFocused] = useState(false)
  const { register, control, setValue } = useForm()

  const value = useWatch({
    control,
    name: id,
  })

  return (
    <>
      <InputBox>
        <Label
          htmlFor={id}
          variants={InputVariants}
          initial="initial"
          animate={isFocused || value ? 'focus' : 'initial'}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          type={type}
          id={id}
          onFocus={() => setIsFocused(true)}
          {...register(id, {
            onBlur: () => setIsFocused(value ? true : false),
          })}
        />
      </InputBox>
      {errors && <ErrorMessage>{String(errors)}</ErrorMessage>}
      Login{' '}
      <Input
        type="password"
        id="password"
        label="Password"
        {...register('password', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요',
          },
        })}
        ref={passwordRef}
        errors={errors.password && errors.password.message}
      />
    </>
  )
}
