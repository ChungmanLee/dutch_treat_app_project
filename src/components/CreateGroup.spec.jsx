import { RecoilRoot } from "recoil"
import { CreateGroup } from "./CreateGroup"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

const componentRendering = () => {
    render(
        <RecoilRoot>
          <CreateGroup />
        </RecoilRoot>
    )//React component which I want to test.

    const input = screen.getByPlaceholderText('2023 UK Travel')
    const saveButton = screen.getByText('Save')
    const errorMessage = screen.getByText('Please enter your group name.')
    return {
        input,
        saveButton,
        errorMessage
    }
}

describe('CreateGroupPage', () =>{
    test('Whether Group Name Input Componant Randing or not', () =>{
        const {input, saveButton} = componentRendering()

        //input component
        expect(input).not.toBeNull()

        //save button
        expect(saveButton).not.toBeNull()
    })

    test('when click save button without inputting group name, prompt error message', async () => {
        const {saveButton, errorMessage} = componentRendering()

        await userEvent.click(saveButton)
        expect(errorMessage).toHaveAttribute('data-valid', 'false')
    })//await -> async

    test('when click save button after input group name, success', async () => {
        const {input, saveButton, errorMessage} = componentRendering()

        await userEvent.type(input, 'Sample Group Name')
        await userEvent.click(saveButton)

        await waitFor(() => {
            expect(errorMessage).toHaveAttribute('data-valid', 'true')
        })
    })//await -> async
})