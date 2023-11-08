import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

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
  background: radial-gradient(
    circle,
    rgba(56, 99, 182, 1),
    rgba(33, 58, 101, 1)
  );
`

const LoginBox = styled.div`
  font-size: 2rem;
  color: #333;
  min-width: 28rem;
  padding: 5rem 3rem;
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

  label {
    position: absolute;
    top: 1.1rem;
    left: 0.75rem;
    font-size: 1rem;
    font-weight: 200;
    color: #fafafa;
  }
`
const Input = styled(motion.input)`
  height: 100%;
  width: 100%;
  padding-top: 1rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background: transparent;
`

const Button = styled.button`
  margin-top: 3rem;
  width: 100%;
  min-height: 1.5rem;
  height: 3rem;
  padding: 0.375rem 0.75rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background: #007de9;
  overflow: hidden;
  font-size: 0.9rem;
  border-radius: 0.75rem;
  color: #fff;
  font-weight: bold;
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

const variants = {
  initial: {
    scale: 0,
  },
  focus: { scale: 3 },
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const onSubmit = (data: LoginForm) => {
    console.log(data)
  }

  return (
    <>
      <Container>
        <LoginBox>
          <Logo>
            <img src="/src/images/hc_logo_2_w.svg" alt="high class" />
          </Logo>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <motion.label variants={variants} htmlFor="id">
                User ID
              </motion.label>
              <Input
                whileFocus="focus"
                type="text"
                name="id"
                id="id"
                ref={() => register('id', { required: 'ID is required' })}
              />
            </InputBox>
            <InputBox>
              <label htmlFor="passWord">PassWord</label>
              <Input
                type="password"
                name="password"
                id="passWord"
                ref={() =>
                  register('password', {
                    required: '비밀번호는 필수 입력 항목입니다.',
                  })
                }
              />
            </InputBox>
            <Button type="submit">로그인</Button>
          </form>
          <Alink>
            <Link href={''}>Forget ID or PW ?</Link>
          </Alink>
        </LoginBox>
      </Container>
    </>
  )
}
