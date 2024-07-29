import styled from 'styled-components'

const FooterCon = styled.footer`
  display: flex;
  width: 100%;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d4d4d8;

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

export default function FooterComponent() {
  return (
    <>
      <FooterCon>
        <Copyright>
          <i className="xi-copyright" /> 2023. H ACADEMY Co. All rights
          reserved.
        </Copyright>
      </FooterCon>
    </>
  )
}
