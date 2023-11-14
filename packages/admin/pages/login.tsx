import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { loginIdFocuseState, loginPasswordFocuseState } from '@/lib/recoilAtoms'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { LogUserIn, isLoggedInVar } from '@/lib/apolloClient'
import { gql } from '@apollo/client'
const LOGIN_MUTATION = gql`
  mutation CreateStudentState($mUserId: String!, $mPassword: String!) {
    mLogin(mUserId: $mUserId, mPassword: $mPassword) {
      error
      ok
      token
    }
  }
`
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

export default function Login() {
  const { register, control, handleSubmit } = useForm<LoginForm>()
  const [loginIdFocus, setLoginIdFocus] = useRecoilState(loginIdFocuseState)
  const [loginPasswordFocus, setLoginPasswordFocus] = useRecoilState(
    loginPasswordFocuseState,
  )
  //api Test
  const router = useRouter()
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  console.log(isLoggedIn, '로그인상태체크') //로그인상태체크
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION)
  const onSubmit = (data: LoginForm) => {
    console.log(data)
    login({
      variables: {
        mUserId: data.id,
        mPassword: data.password,
      },
      onCompleted: data => {
        console.log(data) //데이터가 잘 들어오고 있는지 확인
        const {
          mLogin: { token },
        } = data
        LogUserIn(token) //토큰을 입력
        router.push('/')
      },
    })
  }

  const idValue = useWatch({ control, name: 'id' })
  const passValue = useWatch({ control, name: 'password' })

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
                animate={loginIdFocus || idValue ? 'focus' : 'initial'}
                htmlFor="id"
              >
                User ID
              </Label>
              <Input
                type="text"
                id="id"
                onFocus={() => setLoginIdFocus(true)}
                onBlur={() => setLoginIdFocus(false)}
                {...register('id', {
                  required: {
                    value: true,
                    message: '아이디를 입력해주세요',
                  },
                  onBlur: () => {
                    if (idValue) {
                      setLoginIdFocus(true)
                    } else {
                      setLoginIdFocus(false)
                    }
                  },
                })}
              />
            </InputBox>
            <InputBox>
              <Label
                variants={InputVariants}
                initial="initial"
                animate={loginPasswordFocus || passValue ? 'focus' : 'initial'}
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                onFocus={() => setLoginPasswordFocus(true)}
                {...register('password', {
                  required: {
                    value: true,
                    message: '비밀번호를 입력해주세요',
                  },
                  onBlur: () => {
                    if (passValue) {
                      setLoginPasswordFocus(true)
                    } else {
                      setLoginPasswordFocus(false)
                    }
                  },
                })}
              />
            </InputBox>
            <Button buttonType="submit">로그인</Button>
            {/*<Button buttonType="button" onClick={login}>
              API 테스트
              </Button>*/}
          </form>
          <Alink>
            <Link href={''}>Forget ID or PW ?</Link>
          </Alink>
        </LoginBox>
      </Container>
    </>
  )
}
