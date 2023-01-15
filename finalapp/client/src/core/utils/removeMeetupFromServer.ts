import { Meetup } from '../types/Meetup'
import { BASE_SERVER_URL, MEETUPS_URL } from '../constants/serverConstants'

export const removeMeetupFromServerById = async (id: string): Promise<Meetup | null> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`, {
        method: 'DELETE'
    })

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Error: ', error)
            return null
        }
    } else {
        console.error(rawResponse.statusText)
    }

    return null
}
