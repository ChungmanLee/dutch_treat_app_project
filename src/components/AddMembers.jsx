import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { InputTags } from 'react-bootstrap-tagsinput'
import { useRecoilState, useRecoilValue } from "recoil"
import { groupMembersState } from "./state/groupMembers"
import { useState } from "react"
import { groupNameState } from "./state/groupName"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"


export const AddMembers = () => {

    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)

    const groupName = useRecoilValue(groupNameState)

    const [validated, setValidated] = useState(false)
    
    const navigate = useNavigate()

    const saveGroupMembers = () =>{}

    const handleSubmit = (event) => {
        event.preventDefault()
        setValidated(true)
        if (groupMembers.length > 0) {
            navigate(ROUTES.EXPENSE_MAIN)
        }
    }

    const header = `Please provide the names of all the ${groupName} group members`

    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >

            <InputTags
                placeholder="space(mobile-enter) btween names"
                onTags={(value) => setGroupMembers(value.values)}
            />
            {validated && groupMembers.length === 0 && (
                <StyledErrorMessage>Please enter your names of your group members</StyledErrorMessage>
            )}

        </CenteredOverlayForm>
    )
}//tdd(Test-Driven Development)

const StyledErrorMessage = styled.span`
    color: red;
`