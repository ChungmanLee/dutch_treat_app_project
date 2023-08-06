import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { groupMembersState } from "./state/groupMembers"
import { expensesState } from "./state/expenses"
import { styled } from "styled-components"

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState)

    const today = new Date()
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState(0)
    const [payer, setPayer] = useState(null)
    const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-"))

    const setExpense = useSetRecoilState(expensesState)

    const [isDescValid, setIsDescValid] = useState(false)
    const [isAmountValid, setIsAmountValid] = useState(false)
    const [isPayerValid, setIsPayerValid] = useState(false)

    const [validated, setValidated] = useState(false)

    const checkFormValidity = () => {
        const descValid = desc.length > 0
        const payerValid = payer !== null
        const amountValid = amount > 0
        setIsDescValid(descValid)
        setIsPayerValid(payerValid)
        setIsAmountValid(amountValid)

        return descValid && payerValid && amountValid
    }// check if the form is valid and update state

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(date, desc, amount, payer)//test
        if (checkFormValidity()) {
            //store data
            const newExpense = {
                date,
                desc,
                amount,
                payer,
            }
            setExpense(expense => [
                ...expense,
                newExpense,
            ])
        }
        setValidated(true)
    }

    return (
        <StyledWrapper>
            <Form noValidate onSubmit={handleSubmit}>
                <StyledTitle>1. Add Detail</StyledTitle>
                <Row>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Control
                                type="date"
                                placeholder="Choose the Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter the Description"
                                isValid={isDescValid}
                                isInvalid={!isDescValid && validated}
                                value={desc}
                                onChange={({ target }) => setDesc(target.value)}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                data-valid={isDescValid}
                            >
                                Please enter the description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <Form.Group>
                            <Form.Control
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                isValid={isAmountValid}
                                isInvalid={!isAmountValid && validated}
                                onChange={({ target }) => setAmount(target.value)}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                data-valid={isAmountValid}
                            >
                                The amount should be more than 0 euro.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Form.Group>
                            <Form.Select
                                defaultValue=""
                                onChange={({ target }) => setPayer(target.value)}
                                isValid={isPayerValid}
                                isInvalid={!isPayerValid && validated}
                            >
                                <option disabled value="">Choose a Payer</option>
                                {members.map(member =>
                                    <option key={member}>{member}</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback
                                type="invalid"
                                data-valid={isPayerValid}
                            >
                                Please choose a payer.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' className="d-grid gap-2">
                        <StyledSubmitButton>Add</StyledSubmitButton>
                    </Col>
                </Row>
            </Form>
        </StyledWrapper>
    )
}


const StyledWrapper = styled.div`
  padding: 40px;
  background-color: #C8FFFF;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;

  input, select {
    background: #E6FFE6;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    color: #000069;
    height: 43px;

    margin-bottom: 10px;

    &:focus {
      color: #000069;
      background: #9BFFDA;
      filter: brightness(80%);
    }

    ::placeholder {
      color: #000069;
    }
`

export const StyledTitle = styled.h3`
  color: #7878E1;
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
  @media screen and (max-width: 600px) {
    font-size: 5.5vw;
    line-height: 6vw;
  }
`
const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
  height: 43px;
  border: 0px;
  border-radius: 7px;
  background-color: #7878E1;
  color: white;
  margin-top: 5px;
  &:hover, &:focus {
    background: #7878E1;
    filter: brightness(85%);
  }
`