import { BASE_SERVER_URL, MEETUPS_URL } from '../constants/serverConstants'
import { Meetup } from '../types/Meetup'

export const getMeetupFromServerById = async (id: string): Promise<Meetup | null> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`)

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Error with parsing meetups array: ', error)
            return null
        }
    } else {
        console.error(rawResponse.statusText)
    }

    return null
}
