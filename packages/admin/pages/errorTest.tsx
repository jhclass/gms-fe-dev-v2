import { useState } from 'react'

export default function Home() {
  const [error, setError] = useState(false)

  // 버튼 클릭 시 에러 발생
  if (error) {
    throw new Error('강제로 발생한 클라이언트 에러!')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>홈 페이지</h1>
      <button onClick={() => setError(true)}>에러 발생시키기</button>
    </div>
  )
}
