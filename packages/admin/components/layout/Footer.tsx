import styled from 'styled-components'

const FooterCon = styled.footer`
  display: flex;
  width: 100%;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d4d4d8;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 1024px) {
    padding: 2rem 1rem;
  }
`
const Copyright = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};

  @media screen and (max-width: 1024px) {
    font-size: 0.75rem;
  }
`
const WebBtn = styled.a`
  display: flex;
  align-items: baseline;
  position: relative;
  font-size: 0.75rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
`

export default function FooterComponent() {
  return (
    <>
      <FooterCon>
        <WebBtn href={`${process.env.NEXT_PUBLIC_WEB_URI}`} target="_blank">
          <i className="xi-mobile" />
          아카데미 바로가기
        </WebBtn>
        <Copyright>
          <i className="xi-copyright" /> 2023. H ACADEMY Co. All rights
          reserved.
        </Copyright>
      </FooterCon>
    </>
  )
}
