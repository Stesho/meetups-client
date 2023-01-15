import { AuthorizationRequestData } from '../types/AuthorizationRequestData'
import { User } from '../types/User'
import { BASE_SERVER_URL, LOGIN_URL } from '../constants/serverConstants'

export const tryAuthorize = async (authData: AuthorizationRequestData): Promise<User | null> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Unable to parse received response: ', error)
            return null
        }
    } else {
        console.error('Error in trying to authorize')
        return null
    }
}
