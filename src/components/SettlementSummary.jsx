import { useRecoilValue } from "recoil"
import { expensesState } from "./state/expenses"
import { groupMembersState } from "./state/groupMembers"
import { styled } from "styled-components"
import { StyledTitle } from "./AddExpenseForm"
import { Button } from "react-bootstrap"
import { useRef } from "react"
import { toPng } from "html-to-image"
import { Download } from "react-bootstrap-icons"

export const calculateMinTransaction = (expenses, members, amountPerPerson) => {
    const minTransactions = []
    if (!expenses || !members || !amountPerPerson || amountPerPerson === 0) {
        return minTransactions
    }

    //1. Amount that should be paid by each person
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson
    })

    //2. Updated amount that should be paid by each person 
    expenses.forEach(({ payer, amount }) => {
        membersToPay[payer] -= amount
    })

    //make an array that is sorted by amount with ascending sort.
    const sortedMembersToPay = Object.keys(membersToPay)
        .map(member => (
            { member: member, amount: membersToPay[member] }
        ))
        .sort((a, b) => a.amount - b.amount)//ascending

    var left = 0 //receiver
    var right = sortedMembersToPay.length - 1 //sender
    while (left < right) {
        while (left < right && sortedMembersToPay[left].amount === 0) {
            left++
        }// to reduce unnecessary calculation
        while (left < right && sortedMembersToPay[right].amount === 0) {
            right--
        }// to reduce unnecessary calculation

        const toReceive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]
        const amountToReceive = Math.abs(toReceive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if (amountToSend > amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToReceive,
            })
            toReceive.amount = 0
            toSend.amount -= amountToReceive
            left++
        }
        else {
            minTransactions.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToSend
            })
            toSend.amount = 0
            toReceive.amount += amountToSend
            right--
        }
    }
    //while until the pointer has been crossed

    return minTransactions
}

export const SettlementSummary = () => {
    const expenses = useRecoilValue(expensesState)
    const members = useRecoilValue(groupMembersState)
    const wrapperElement = useRef(null)

    const totalExpenseAmount = parseFloat(expenses.reduce((prevAmount, curExpense) => prevAmount + parseFloat(curExpense.amount), 0)).toFixed(2)

    const groupMembersCount = members ? members.length : 0

    const splitAmount = totalExpenseAmount / groupMembersCount
    const minTransaction = calculateMinTransaction(expenses, members, splitAmount)

    const exportToImage = () => {
        if (wrapperElement.current === null) {
            return
        }
    
        toPng(wrapperElement.current, {
            filter: (node) => node.tagName !== 'BUTTON',
        })// remove the button from the image
            .then((dataURL) => {
            const link = document.createElement('a')
            link.download = 'settlement-summary.png'
            link.href = dataURL
    
            link.click()
        })
            .catch((err) => {
            console.error(err)
        })
    
    }
    return (
        <StyledWrapper  ref={wrapperElement}>
            <StyledTitle>2. Settle Expenses</StyledTitle>
            {totalExpenseAmount > 0 && groupMembersCount > 0 && (
                <div>
                    <StyledSummary>
                        <span>{groupMembersCount} people - {totalExpenseAmount} euro in total.</span>
                        <br />
                        <span>{splitAmount} euro per a person</span>
                    </StyledSummary>
                    <StyledUl>
                        {minTransaction.map(({ sender, receiver, amount }, index) =>
                            <li key={`transaction-${index}`}>
                                <span>{sender} should send {amount} euro to {receiver}</span>
                            </li>
                        )}
                    </StyledUl>
                    <StyledButton data-testid="btn-img-download" onClick={exportToImage}>
                        <Download />
                    </StyledButton>
                </div>
            )}
        </StyledWrapper>
    )
}

const StyledButton = styled(Button)`
  background: none;
  border: none;
  font-size: 28px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #7878E1;

  &:hover, &:active {
    background: none;
    color: #00008C;
  }
`

const StyledWrapper = styled.div`
  padding: 1.5em;
  background-color: #C8FFFF;
  color: #7878E1;
  text-align: center;
  font-size: 22px;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;

  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 6vw;
  }
`

const StyledUl = styled.ul`
  margin-top: 1em;
  font-weight: 600;
  line-height: 200%;
  text-align: left;

  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    60% {
      opacity: 0;
    }
  }
`

const StyledSummary = styled.div`
  margin-top: 1em;
`
