import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"
import { groupMembersState } from "./state/groupMembers"
import { ExpenseMain } from "./ExpenseMain"
import { API } from "aws-amplify"

const renderComponent = () => {
    render(
        <RecoilRoot initializeState={(snap) => {
            snap.set(groupMembersState, ['David', 'Stephen'])
        }}>
            <ExpenseMain />
        </RecoilRoot>
    )

    const dateInput = screen.getByPlaceholderText("Choose the Date")
    const addButton = screen.getByText('Add')
    const descInput = screen.getByPlaceholderText("Enter the Description")
    const amountInput = screen.getByPlaceholderText("Amount")
    const payerInput = screen.getByDisplayValue("Choose a Payer")

    const descErrorMessage = screen.getByText('Please enter the description.')
    const payerErrorMessage = screen.getByText('Please choose a payer.')
    const amountErrorMessage = screen.getByText('The amount should be more than 0 euro.')

    return {
        amountInput,
        payerInput,
        payerErrorMessage,
        amountErrorMessage,
        descErrorMessage,
        addButton,
        dateInput,
        descInput,
    }
}

describe('Expense Settlement Main Page', () => {
    beforeEach(() => {
        // To test if the front end is working properly, by mocking API.put, it should be acting like success answer has been arrived withoug sending real nework request
        API.put = jest.fn().mockResolvedValue({ "data": {} })
        console.error = jest.fn()
    })

    describe('Expense Dtail Input Component', () => {
        test('If xpense Dtail Input Component Rendering', () => {
            const { dateInput, descInput, amountInput, payerInput, addButton } = renderComponent()
            expect(dateInput).toBeInTheDocument()
            expect(payerInput).toBeInTheDocument()
            expect(addButton).toBeInTheDocument()
            expect(descInput).toBeInTheDocument()
            expect(amountInput).toBeInTheDocument()
        })

        test('when click save button without inputting necessary values, prompt error message', async () => {
            const { addButton, descErrorMessage, payerErrorMessage, amountErrorMessage } = renderComponent()

            expect(addButton).toBeInTheDocument()
            userEvent.click(addButton)

            await waitFor(() => {
                expect(descErrorMessage).toHaveAttribute('data-valid', 'false')
            })
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'false')
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'false')
        })

        test('when click save button after input necessary values, success', async () => {
            const { descInput, amountInput, payerInput, addButton,
                descErrorMessage, payerErrorMessage, amountErrorMessage } = renderComponent()

            userEvent.type(descInput, 'Tesco')
            userEvent.type(amountInput, '100')
            userEvent.selectOptions(payerInput, 'David') // before test, names of the member should be set
            userEvent.click(addButton)

            await waitFor(() => {
                expect(descErrorMessage).toHaveAttribute('data-valid', 'true')
            })
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'true')
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'true')
        })
    })

    describe('Expense List Component', () => {
        test('If Expense List Component Rendering', () => {
            renderComponent()
            const expenseListComponent = screen.getByTestId('expenseList')

            expect(expenseListComponent).toBeInTheDocument()
        })
    })

    describe('Expense Settlement Component', () => {
        test('If Expense Settlement Component Rendering', () => {
          renderComponent()
    
          const component = screen.getByText(/Settle Expenses/i)
          expect(component).toBeInTheDocument()
        })
    })

    describe('When New Expense Is Entered,', () => {
        const addNewExpense = () => {
            const { dateInput, descInput, payerInput, amountInput, addButton } = renderComponent()
            userEvent.type(dateInput, '2023-10-10')
            userEvent.type(descInput, 'Tesco')
            userEvent.type(amountInput, '100')
            userEvent.selectOptions(payerInput, 'David')
            userEvent.click(addButton)
        }

        beforeEach(() => {
            addNewExpense()
        })

        test('Date, Description, Payer, Amount will be added on the list', async () => {
            const expenseListComponent = screen.getByTestId('expenseList')

            const dateValue = within(expenseListComponent).getByText('2023-10-10')
            await waitFor(() => {
                expect(dateValue).toBeInTheDocument()
            })

            const descValue = within(expenseListComponent).getByText('Tesco')
            expect(descValue).toBeInTheDocument()

            const payerValue = within(expenseListComponent).getByText('David')
            expect(payerValue).toBeInTheDocument()

            const amountValue = within(expenseListComponent).getByText('100')
            expect(amountValue).toBeInTheDocument()
        })

        test('Settlement Result Should Be Updated', async () => {
            const totalText = screen.getByText(/2 people - 100.00 euro in total./i)
            await waitFor(() => {
              expect(totalText).toBeInTheDocument()
            })
      
            const transactionText = screen.getByText(/Stephen should send 50 euro to David/i)
            expect(transactionText).toBeInTheDocument()
        
        })

        const htmlToImage = require('html-to-image')
        test('Can Save The Result With Image File', async () => {
            const downloadBtn = screen.getByTestId("btn-img-download")
            
            const spiedToPng = jest.spyOn(htmlToImage, 'toPng')

            userEvent.click(downloadBtn)
            await waitFor(() => {
                expect(spiedToPng).toHaveBeenCalledTimes(1)
            })
            await waitFor(() => {

                expect(downloadBtn).toBeInTheDocument()
            })
        })
        

        afterEach(() => {
            jest.resetAllMocks()
        })//finish spying
    })

})