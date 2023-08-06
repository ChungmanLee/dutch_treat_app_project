import { render, screen, waitFor } from "@testing-library/react"
import { AddMembers } from "./AddMembers"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"

import { API } from "aws-amplify"

const renderComponent = () => {
  render(
    <BrowserRouter>
      <RecoilRoot>
        <AddMembers />
      </RecoilRoot>
    </BrowserRouter>
  )

  const input = screen.getByPlaceholderText('space btween names')
  const saveButton = screen.getByText('Save')

  return {
    input,
    saveButton,
  }
}

describe('Add Members Page', () => {
  beforeEach(() => {
    // To test if the front end is working properly, by mocking API.put, it should be acting like success answer has been arrived withoug sending real nework request
    API.put = jest.fn().mockResolvedValue({"data": {}})
  })

  test('If Group Membe Input Component is Rendering', () => {
    const {input, saveButton} = renderComponent()

    expect(input).not.toBeNull()
    expect(saveButton).not.toBeNull()
  })//renderring should be success. shouldn't be null.

  test('when click save button without inputting group member, prompt error message', async () => {
    const {saveButton} = renderComponent()

    userEvent.click(saveButton)

    const errorMessage = await screen.findByText('Please enter your names of your group members')
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument()
    })
  })//error message

  test('when click save button after input member names, success', async () => {
    const {input, saveButton} = renderComponent()

    userEvent.type(input, 'James Ian Arron')
    userEvent.click(saveButton)

    const errorMessage = screen.queryByText('Please enter your group members.')
    await waitFor(() => {
      expect(errorMessage).toBeNull()
    })
  })// error message shouldn't be found
})// should choose among find, query, get, text, testID etc.