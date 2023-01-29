import { User } from '../types/User'
import { BASE_SERVER_URL, LOGIN_URL } from '../constants/serverConstants'

export const getUserFromServer = async (): Promise<User | null> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (rawResponse.ok) {
        try {
			const userData = await rawResponse.json()
            return userData.user
        } catch (error) {
            console.error('Unable to parse received response: ', error)
            return null
        }
    } else {
        console.error('Error in trying to get user')
        return null
    }
}
