import { ShortUser } from './User'

export interface Meetup {
    id: string
    modified: string
    start: string
    finish: string
    author: ShortUser
    speakers: Array<ShortUser>
    subject: string
    excerpt: string
    place: string
    goCount: number
    status: 'DRAFT' | 'REQUEST' | 'CONFIRMED'
    isOver: boolean
    image?: string | null
}

export type CreatedMeetup = Omit<Meetup, 'goCount' | 'status' | 'isOver' | 'id'>
