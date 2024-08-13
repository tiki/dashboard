import { Amplify } from 'aws-amplify'

export const amplify = {
  configure: () => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: import.meta.env.VITE_USER_POOL_ID,
          userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
          identityPoolId: '',
          loginWith: {
            email: true
          },
          signUpVerificationMethod: 'code',
          userAttributes: {
            email: {
              required: true
            }
          },
          allowGuestAccess: false,
          passwordFormat: {
            minLength: 16,
            requireLowercase: true,
            requireUppercase: true,
            requireNumbers: true,
            requireSpecialCharacters: true
          }
        }
      }
    })
  }
}
