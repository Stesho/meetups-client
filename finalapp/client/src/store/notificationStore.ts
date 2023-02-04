import {makeAutoObservable} from 'mobx'

export type NotificationType = 'error' | 'warning' | 'success' | 'help'

class NotificationStore {
  type: NotificationType = 'error'
  message = ''
  timer = 0
  isActive = false
  duration = 5000

  constructor() {
    makeAutoObservable(this)
  }

  private clear() {
    this.isActive = false
    this.message = ''
    this.timer = 0
  }

  private show(message: string, type: NotificationType) {
    this.message = message
    this.type = type
    this.isActive = true

    if(this.timer) {
      clearTimeout(this.timer)
    }
    
    this.timer = window.setTimeout(() => {
      this.clear()
    }, this.duration)
  }

  error(message: string) {
    this.show(message, 'error')
  }

  success(message: string) {
    this.show(message, 'success')
  }

  close() {
    this.isActive = false
  }
}

export default NotificationStore;