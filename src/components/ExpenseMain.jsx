import { Col, Container, Row } from "react-bootstrap"
import { AddExpenseForm } from "./AddExpenseForm"
import { ExpenseTable } from "./ExpenseTable"
import { styled } from "styled-components"
import { useRecoilValue } from "recoil"
import { groupNameState } from "./state/groupName"
import { SettlementSummary } from "./SettlementSummary"
import { ServiceLogo } from "./shared/ServiceLogo"

export const ExpenseMain = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={4}>
                    <LeftPane />
                </Col>
                <Col xs={12} md={8}>
                    <RightPane />
                </Col>
            </Row>
        </Container>
    )
}

const LeftPane = () => (
    <Container>
        <StyledGapRow>
            <Row>
                <ServiceLogo />
            </Row>
            <Row>
                <AddExpenseForm />
            </Row>
            <Row>
                <SettlementSummary />
            </Row>
        </StyledGapRow>
    </Container>
)

const RightPane = () => {
    const groupName = useRecoilValue(groupNameState)
    return (
        <StyledRightPaneWrapper>
            <Row>
                <StyledGroupName>{groupName || 'Group Name'}</StyledGroupName>
            </Row>
            <Row>
                <ExpenseTable />
            </Row>
        </StyledRightPaneWrapper>
    )
}

const StyledGroupName = styled.h2`
  margin-bottom: 6vh;
  font-size: 40px;
    font-weight: 700;
  line-height: 40px;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: 9vw;
    margin-bottom: 30px;
  }
`

const StyledRightPaneWrapper = styled(Container)`
  padding: 5vh 2vw 2vh 2vw;

  @media screen and (max-width: 600px) {
    padding: 50px 25px;
  }
`

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 4vh;
  justify-content: center;

  @media screen and (max-width: 600px) {
    padding-top: 30px;
  }
`