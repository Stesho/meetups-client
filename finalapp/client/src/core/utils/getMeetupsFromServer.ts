import { BASE_SERVER_URL, MEETUPS_URL } from '../constants/serverConstants'
import { Meetup } from '../types/Meetup'

export const getMeetupsFromServer = async (): Promise<Array<Meetup>> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`)

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Error with parsing meetups array: ', error)
            return []
        }
    } else {
        console.error(rawResponse.statusText)
    }

    return []
}
