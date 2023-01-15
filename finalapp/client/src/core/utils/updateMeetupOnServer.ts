import { Meetup } from '../types/Meetup'
import { BASE_SERVER_URL, MEETUPS_URL } from '../constants/serverConstants'
import { UNKNOWN_ERROR } from '../constants/errorConstants'

export const updateMeetupOnServer = async (editedMeetup: Meetup): Promise<Meetup | string> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMeetup)
    })

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Unable to parse received response: ', error)
            return UNKNOWN_ERROR
        }
    }

    return rawResponse.statusText
}
