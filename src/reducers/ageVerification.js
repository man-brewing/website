import { SET_VERIFIED_AGE } from '../actions/ageVerification'

export default function ageVerification (state = null, action) {
  switch (action.type) {
    case SET_VERIFIED_AGE :
      return {
          ...state,
          isAgeVerified: action.isAgeVerified,
      }
    default :
      return state
  }
}