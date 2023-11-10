import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginIdInputState, loginPasswordInputState } from '@/lib/recoilAtoms'
import Button from '@/components/Button'

type LoginForm = {
  id: string
  password: string
}

const Logo = styled.h1`
  width: 15rem;
  margin: 0 auto 3rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 2rem;
  background: radial-gradient(
    circle,
    rgba(56, 99, 182, 1),
    rgba(33, 58, 101, 1)
  );
`

const LoginBox = styled.div`
  font-size: 2rem;
  color: #333;
  max-width: 28rem;
  width: 100%;
  padding: 5rem 2rem;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5rem rgba(0, 0, 0, 0.4);
`

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
`

const Label = styled(motion.label)`
  position: absolute;
  left: 0.75rem;
  font-weight: 200;
  color: #fafafa;
`

const Alink = styled.p`
  margin-top: 0.7rem;
  font-size: 0.9rem;
  font-weight: 200;
  color: #f4f4f5;
  padding-left: 0.2rem;

  a {
    position: relative;
  }

  a:after {
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f5;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`
const InputVariants = {
  initial: {
    top: '1rem',
    fontSize: '1rem',
    opacity: '1'
  },
  focus: {
    top: '0.3rem',
    fontSize: '0.8rem',
    opacity: '0.5'
  },
  hasValue: {
    top: '0.3rem',
    fontSize: '0.8rem',
    opacity: '0.5'
  },
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [loginIdInput, setLoginIdInput] = useRecoilState(loginIdInputState);
  const [loginPasswordInput, setLoginPasswordInput] = useRecoilState(loginPasswordInputState);

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  useEffect(() => {
    setLoginIdInput((prev) => ({ ...prev, isFocused: loginIdInput.isFocused || loginIdInput.hasValue }));
  }, [loginIdInput.isFocused, loginIdInput.hasValue, setLoginIdInput]);

  useEffect(() => {
    setLoginPasswordInput((prev) => ({ ...prev, isFocused: loginPasswordInput.isFocused || loginPasswordInput.hasValue }));
  }, [loginPasswordInput.isFocused, loginPasswordInput.hasValue, setLoginPasswordInput]);

  return (
    <>
            <Container>
        <LoginBox>
          <Logo>
            <img src="/src/images/hc_logo_2_w.svg" alt="high class" />
          </Logo>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <Label
                variants={InputVariants}
                initial="initial"
                animate={loginIdInput.isFocused || loginIdInput.hasValue ? 'focus' : 'initial'}
                htmlFor="id"
              >
                User ID
              </Label>
              <Input
                type="text"
                id="id"
                onFocus={() => setLoginIdInput((prev) => ({ ...prev, isFocused: true }))}
                onBlur={() => setLoginIdInput((prev) => ({ ...prev, isFocused: false }))}
                onChange={(e) => setLoginIdInput((prev) => ({ ...prev, hasValue: e.target.value.trim() !== '' }))}
                {...register('id', { 
                  required: {
                    value: true,
                    message: '아이디를 입력해주세요',
                  }
                 })}
              />
            </InputBox>
             <InputBox>
              <Label
                variants={InputVariants}
                initial="initial"
                animate={loginPasswordInput.isFocused || loginPasswordInput.hasValue ? 'focus' : 'initial'}
                htmlFor="id"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                onFocus={() => setLoginPasswordInput((prev) => ({ ...prev, isFocused: true }))}
                onBlur={() => setLoginPasswordInput((prev) => ({ ...prev, isFocused: false }))}
                onChange={(e) => setLoginPasswordInput((prev) => ({ ...prev, hasValue: e.target.value.trim() !== '' }))}
                {...register('password', { 
                  required: {
                    value: true,
                    message: '비밀번호를 입력해주세요',
                  }
                 })}
              />
            </InputBox>
            <Button
              buttonType="submit">
                로그인
            </Button>
          </form>
          <Alink>
            <Link href={''}>Forget ID or PW ?</Link>
          </Alink>
        </LoginBox>
      </Container>
    </>
  )
}
