import { fetchAuthSession } from 'aws-amplify/auth'

export const auth = {
  // it will automatically refresh the token each time it called
  token: async () => {
    const session = await fetchAuthSession()
    if (!session.tokens) throw new Error()
    return session.tokens.accessToken.toString()
  }
}
