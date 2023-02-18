import { makeAutoObservable } from 'mobx';
import Translation from '../core/utils/translation';

export type NotificationType = 'error' | 'warning' | 'success' | 'help';

class NotificationStore {
  type: NotificationType = 'error';
  message = Translation.empty;
  timer = 0;
  isActive = false;
  duration = 5000;

  constructor() {
    makeAutoObservable(this);
  }

  private clear() {
    this.isActive = false;
    this.message = Translation.empty;
    this.timer = 0;
  }

  private show(message: Translation, type: NotificationType) {
    this.message = message;
    this.type = type;
    this.isActive = true;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.clear();
    }, this.duration);
  }

  error(message: Translation) {
    this.show(message, 'error');
  }

  success(message: Translation) {
    this.show(message, 'success');
  }

  close() {
    this.isActive = false;
  }
}

export default NotificationStore;
