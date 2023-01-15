import { DAY_SHORT_NAMES, MONTH_NAMES } from '../constants/dateTimeConstants'
import { Meetup } from '../types/Meetup'

export const getMeetupDatePlaceInfo = (meetup: Meetup): string => {
    const dateInfo = new Date(meetup.start)

    if (isNaN(dateInfo.getTime())) {
        return '-'
    }

    const dayName = DAY_SHORT_NAMES[dateInfo.getUTCDay()]
    const mountName = MONTH_NAMES[dateInfo.getUTCMonth()]
    const time = `${dateInfo.getUTCHours()}:${dateInfo.getUTCMinutes()}`

    const result = `${dayName}., ${dateInfo.getUTCDate()} ${mountName} - ${time} - ${meetup.place}`

    return result
}
