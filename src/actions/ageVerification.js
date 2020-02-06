/**
 * Action type for verifying vistor age.
 */
export const SET_VERIFIED_AGE = 'SET_VERIFIED_AGE'

/**
 * Action for setting verified age.
 * @param {*} isAgeVerified True if 21 or over, false otherwise.
 */
export function setVerifiedAge (isAgeVerified) {
  return {
    type: SET_VERIFIED_AGE,
    isAgeVerified,
  }
}