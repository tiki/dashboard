export interface User {
  username: string
  userId: string
  signInDetails: SignInDetails
}

export interface SignInDetails {
  loginId: string
  authFlowType: string
}
