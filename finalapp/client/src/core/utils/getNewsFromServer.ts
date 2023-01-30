import { BASE_SERVER_URL, NEWS_URL } from '../constants/serverConstants'
import { News } from '../types/News'

export const getNewsFromServer = async (): Promise<Array<News>> => {
    const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${NEWS_URL}`)

    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (error) {
            console.error('Error with parsing news array: ', error)
            return []
        }
    } else {
        console.error(rawResponse.statusText)
    }

    return []
}
