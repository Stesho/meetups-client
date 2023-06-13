import { DAY_NAMES, DAY_SHORT_NAMES, MONTH_NAMES } from '../constants/dateTimeConstants';
import { Meetup } from '../types/Meetup';

export const getMeetupDatePlaceInfo = (meetup: Meetup): string => {
  const dateInfo = new Date(meetup.start)

  if (isNaN(dateInfo.getTime())) {
    return '-'
  }

  const dayName = DAY_SHORT_NAMES[dateInfo.getUTCDay()]
  const mountName = MONTH_NAMES[dateInfo.getUTCMonth()]
  const hours =`${dateInfo.getUTCHours()}`.padStart(2, '0')
  const minutes =`${dateInfo.getUTCMinutes()}`.padStart(2, '0') 
  const time = `${hours}:${minutes}`

  const result = `${dayName}., ${dateInfo.getUTCDate()} ${mountName} - ${time} - ${meetup.place}`

  return result
}

export const getMeetupDate = (meetup: Meetup): string => {
  const dateInfo = new Date(meetup.start)

  if (isNaN(dateInfo.getTime())) {
    return '-'
  }

  const dayName = DAY_NAMES[dateInfo.getUTCDay()]
  const mountName = MONTH_NAMES[dateInfo.getUTCMonth()]

  const result = `${dayName}, ${dateInfo.getUTCDate()} ${mountName.toLowerCase()}, ${dateInfo.getFullYear()}`

  return result
}

export const getMeetupTime = (meetup: Meetup): string => {
  const startDateInfo = new Date(meetup.start)
  const finishDateInfo = new Date(meetup.finish)

  const startHours = `${startDateInfo.getUTCHours()}`.padStart(2, '0')
  const startMinutes = `${startDateInfo.getUTCMinutes()}`.padStart(2, '0')
  const finishHours = `${finishDateInfo.getUTCHours()}`.padStart(2, '0')
  const finishMinutes = `${finishDateInfo.getUTCMinutes()}`.padStart(2, '0')

  const startTime = isNaN(startDateInfo.getTime()) ? '-' : `${startHours}:${startMinutes}`
  const finishTime = isNaN(finishDateInfo.getTime()) ? '-' : `${finishHours}:${finishMinutes}`

  const result = `${startTime} - ${finishTime}`

  return result
}
