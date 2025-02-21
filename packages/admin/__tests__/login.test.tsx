import { MockedProvider } from '@apollo/client/testing' // ✅ Apollo Client Mocking
import Login from '@/pages/login'
import { act, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'
import { gql } from '@apollo/client'

// 🔹 useRouter()의 push 함수를 mock 처리
const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// 🔹 GraphQL 쿼리 모킹 (실제 API 요청 없이 가짜 데이터 반환)
const LOGIN_MUTATION = gql`
  mutation Mutation($mUserId: String!, $mPassword: String!) {
    mLogin(mUserId: $mUserId, mPassword: $mPassword) {
      error
      ok
      token
      refreshToken
    }
  }
`
const CREATE_USER_ACTIVITY_LOGS_MUTATION = gql`
  mutation Mutation($eventName: String!, $description: String) {
    createUserActivityLogs(eventName: $eventName, description: $description) {
      error
      message
      ok
    }
  }
`

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        mUserId: 'admin',
        mPassword: 'a123123',
      },
    },
    result: {
      data: {
        mLogin: {
          error: null,
          ok: true,
          token: 'test-token',
          refreshToken: 'test-refresh-token',
        },
      },
    },
  },
  {
    request: {
      query: CREATE_USER_ACTIVITY_LOGS_MUTATION,
      variables: {
        eventName: '로그인',
        description: 'ok: true',
      },
    },
    result: {
      data: {
        createUserActivityLogs: {
          error: null,
          message: '로그 기록 성공',
          ok: true,
        },
      },
    },
  },
]

test('로그인 후 / 페이지로 이동', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    </MockedProvider>,
  )

  const user = userEvent.setup()

  // 로그인 버튼이 존재하는지 확인
  expect(screen.getByText('로그인')).toBeInTheDocument()

  // 🔹 ID와 비밀번호 입력
  await act(async () => {
    await user.type(screen.getByLabelText('User ID'), 'admin')
    await user.type(screen.getByLabelText('password'), 'a123123')
  })

  // 🔹 로그인 버튼 클릭
  await act(async () => {
    await user.click(screen.getByRole('button', { name: '로그인' }))
  })
  // 🔹 Mock된 GraphQL 응답이 처리될 때까지 기다리기
  await new Promise(resolve => setTimeout(resolve, 0))
  // 🔹 push('/')가 호출되었는지 확인
  expect(mockPush).toHaveBeenCalledWith('/')
})
