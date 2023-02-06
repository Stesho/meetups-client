import { BASE_SERVER_URL, MEETUPS_URL, LOGIN_URL, NEWS_URL } from "../constants/serverConstants"
import { Meetup } from "../types/Meetup"
import NotificationStore from "../../store/notificationStore"
import { User } from "../types/User"
import { AuthorizationRequestData } from "../types/AuthorizationRequestData"
import { News } from "../types/News"

class ServerApi {
  private errorMessage = {
    unauthorized: 'Войдите или создайте аккаунт',
    unknown: 'Что-то пошло не так',
    notFound: 'Не удалось отправить запрос',
    serverError: 'Что-то пошло не так. Сервер не доступен'
  }
  private successMessage = {
    addedMeetup: 'Добавлен новый митап',
    deletedMeetup: 'Митап успешно удален',
    updatedMeetup: 'Митап успешно обновлен'
  }

  constructor(private readonly notificationStore: NotificationStore) {}

  private getErrorMessage(errorStatus: number) {
    if(errorStatus === 401) {
      return this.errorMessage.unauthorized
    }
    if(errorStatus === 404) {
      return this.errorMessage.notFound
    }
    if(errorStatus === 500) {
      return this.errorMessage.serverError
    }
    else {
      return this.errorMessage.unknown
    }
  }
  
  private async fetch(url: string, options?: object): Promise<Response | null> {    
    try {
      const response = await fetch(url, options)

      if(!response.ok) {
        const errorMessage = this.getErrorMessage(response.status)
        this.notificationStore.error(errorMessage)
      }
      
      return response
    }
    catch {
      this.notificationStore.error(this.errorMessage.serverError)
      return null
    }
  }

  // Meetups
  async getMeetupsFromServer(): Promise<Meetup[]> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`)

      if(!response?.ok) {
        return []
      }

      return await response.json()
    }
    catch(error) {
      this.notificationStore.error(this.errorMessage.unknown)
      return []
    }
  }

  async updateMeetupOnServer(editedMeetup: Meetup): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMeetup)
      })

      if (!response?.ok) {
        return null
      }
      
      const meetup = await response.json()
      this.notificationStore.success(this.successMessage.updatedMeetup)

      return meetup
    }
    catch {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }

  async removeMeetupFromServerById(id: string): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response?.ok) {
        return null
      }

      const meetup = await response.json()
      this.notificationStore.success(this.successMessage.deletedMeetup)

      return meetup
    }
    catch {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }

  async sendCreatedMeetupToServer(newMeetup: Meetup): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMeetup)
      })

      if(!response?.ok) {
        return null
      }

      const meetup = await response.json()
      this.notificationStore.success(this.successMessage.addedMeetup)

      return meetup
    }
    catch {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }

  async getMeetupFromServerById(id: string): Promise<Meetup | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`)

      if(!response?.ok) {
        return null
      }

      return await response.json()
    }
    catch(error) {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }

  // User
  async tryAuthorize(authData: AuthorizationRequestData): Promise<User | null> {
    try {
      const response: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      })

      if(response?.status === 401) {
        this.notificationStore.error('Не верные логин или пароль')
        return null
      }

      const userData = await response.json()
      return userData.user
    }
    catch {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }

  async getUserFromServer(): Promise<User | null> {
    try {
      const response: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if(!response?.ok) {
        return null
      }

      const userData = await response.json()
      return userData.user
    }
    catch {
      console.error('Failed to retrieve user')
      return null
    }
  }

  // News
  async getNewsFromServer(): Promise<News[]> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}`)

      if(response === null) {
        return []
      }

      return response.json()
    }
    catch {
      this.notificationStore.error(this.errorMessage.unknown)
      return []
    }
  }

  async getNewsFromServerById(id: string): Promise<News | null> {
    try {
      const response = await this.fetch(`${BASE_SERVER_URL}${NEWS_URL}/${id}`)

      if(!response?.ok) {
        return null
      }

      return await response.json()
    }
    catch(error) {
      this.notificationStore.error(this.errorMessage.unknown)
      return null
    }
  }
}

export default ServerApi;