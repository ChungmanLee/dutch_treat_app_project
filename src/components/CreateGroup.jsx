import { useSetRecoilState } from "recoil"
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { Form } from "react-bootstrap"
import { groupNameState } from "./state/groupName"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateGroup = () => {

    const [validGroupName, setValidGroupName] = useState(false)//status about one fild is valid or not

    const [validated, setValidated] = useState(false)//checking if the form was in validation cycle

    const setGroupName = useSetRecoilState(groupNameState)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity()) {
            setValidGroupName(true)
            navigate("/members")
            //when it's valid, it will be stored in recoil state
        } else {
            event.stopPropagation();
            setValidGroupName(false)
            //when it's not valid stop the progation.
        }
        setValidated(true)//after the valication cycle, return true
    }

    return (
        <CenteredOverlayForm
            title="First, let's come up with a name for the group!"
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <Form.Group controlId="validationGroupName">
                <Form.Control
                    type="text"
                    required
                    placeholder="2023 UK Travel"
                    onChange={(e) => setGroupName(e.target.value)}
                //contrulled component. whenever something has been input in the form, it will be stored in the recoil.
                />
            </Form.Group>
            <Form.Control.Feedback
                type="invalid"
                data-valid={validGroupName}
            >
                Please enter your group name.
            </Form.Control.Feedback>
        </CenteredOverlayForm>
    )

}