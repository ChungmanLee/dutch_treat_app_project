import { Button, Container, Form, Row } from "react-bootstrap"
import styled from "styled-components"
import { OverlayWrapper } from "./OverlayWrapper"
import { ServiceLogo } from "./ServiceLogo"

export const CenteredOverlayForm = ({title, children, handleSubmit, validated}) => {
    return (
        <StyledCentralizingContainer>
            <ServiceLogo />
            <OverlayWrapper>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <StyledRow>
                            <Row className = "aligin-items-start">
                                <StyledTitleH2>{title}</StyledTitleH2>
                            </Row>
                            <Row className = "aligin-items-center">
                                {children}
                            </Row>
                            <Row className = "aligin-items-end">
                                <StyledSubmitButton variant="info">Save</StyledSubmitButton>
                            </Row>
                        </StyledRow>
                    </Form>
                </Container>
                {/* {children} */}
            </OverlayWrapper>
        </StyledCentralizingContainer>
    )
}


const StyledCentralizingContainer = styled(Container)`
  width: 55vw;
  @media (max-width: 500px) {
    width: 80vw;
  }
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`// 나중에 고치기


const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
    width: 50%;
    height: 40px;
    margin: 0 auto;
    background: #7878E1;
    border-radius: 7px;
    border: none;
    color: white;
    &:hover {
        background: #7878E1;
        filter: brightness(85%);
    }
`

const StyledRow = styled(Row) `
    align-items: center;
    Justify-content: center;
    height:60vh;
`

const StyledTitleH2 = styled.h2`
    font-weight: 700;
    line-height: 33px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`