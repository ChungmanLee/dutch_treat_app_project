import { useRecoilState, useSetRecoilState} from "recoil"
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { Form } from "react-bootstrap"
import { groupNameState } from "./state/groupName"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "aws-amplify"
import { groupIdState } from "./state/groupId"
import { RecoilDevTools } from "recoil-toolkit"
import { ROUTES } from "../routes"

export const CreateGroup = () => {
    const setGroupId = useSetRecoilState(groupIdState)

    const [validGroupName, setValidGroupName] = useState(false)//status about one fild is valid or not

    const [validated, setValidated] = useState(false)//checking if the form was in validation cycle

    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const navigate = useNavigate()

    const saveGroupName = () => {
        API.post('groupsApi', '/groups', {
          body: {
            groupName,
          }
        })
        .then(({ data }) => {
          const { guid } = data
          setGroupId(guid)
          navigate(ROUTES.ADD_MEMBERS(guid))
            //when it's valid, it will be stored in recoil state
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data.error)
            //when it's not valid stop the progation.
        })//error handling
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        saveGroupName()
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