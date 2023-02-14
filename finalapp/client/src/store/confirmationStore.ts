import { makeAutoObservable } from 'mobx';

class ConfirmationStore {
  isActive = false;
  title = '';
  text = '';
  onConfirm: () => void = null!;

  constructor() {
    makeAutoObservable(this);
  }

  show(title: string, text: string, onConfirm: () => void): void {
    this.title = title;
    this.text = text;
    this.onConfirm = onConfirm;
    this.isActive = true;
  }

  close(): void {
    this.title = '';
    this.text = '';
    this.onConfirm = null!;
    this.isActive = false;
  }
}

export default ConfirmationStore;
