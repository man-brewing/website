import { setVerifiedAge } from "./ageVerification"

export function handleInitialState () {
    return (dispatch) => {
        dispatch(setVerifiedAge(false))
    }
}