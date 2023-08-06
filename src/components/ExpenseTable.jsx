import { Table } from "react-bootstrap"
import { useRecoilValue} from "recoil"
import styled from "styled-components"
import { expensesState } from "./state/expenses"
import { OverlayWrapper } from "./shared/OverlayWrapper"


export const ExpenseTable = () => {
    const expenses = useRecoilValue(expensesState)

    return (
        <OverlayWrapper minHeight={"73vh"} >
            <StyledTable data-testid="expenseList" borderless hover responsive>
                <StyledThead>
                    <tr>
                        <th>Date</th>
                        <th>Detail</th>
                        <th>Payer</th>
                        <th>Amount</th>
                    </tr>
                </StyledThead>
                <StyledTbody>
                    {expenses.map(({ date, desc, amount, payer }) => (
                        <tr>
                            <td>{date}</td>
                            <td>{desc}</td>
                            <td>{payer}</td>
                            <td>{parseInt(amount)}</td>
                        </tr>
                    ))}
                </StyledTbody>
            </StyledTable>
        </OverlayWrapper>
    )
}

const StyledTable = styled(Table)`
  min-width: 450px;
  @media screen and (max-width: 600px) {
    min-width: 300px;
  }
`

const StyledThead = styled.thead`
  color: #000069;
  background-color: ;
  font-weight: 730;
  font-size: 20px;
  text-align: center;
  line-height: 25px;
  th {
    padding: 15px 8px;
    min-width: 60px;
  }
  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 10px;
    th {
      padding: 10px 4px;
    }
  }
`
const StyledTbody = styled.tbody`
  td {
    font-weight: 300;
    line-height: 50px;
    text-align: center;
    font-size: 20px;

    @media screen and (max-width: 600px) {
      line-height: 20px;
      font-size: 4vw;
    }
  }
`