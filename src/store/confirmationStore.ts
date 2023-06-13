import { makeAutoObservable } from 'mobx';
import Translation from '../core/utils/translation';

class ConfirmationStore {
  isActive = false;
  title: Translation = Translation.empty;
  text: Translation = Translation.empty;
  onConfirm: () => void = null!;

  constructor() {
    makeAutoObservable(this);
  }

  show(title: Translation, text: Translation, onConfirm: () => void): void {
    this.title = title;
    this.text = text;
    this.onConfirm = onConfirm;
    this.isActive = true;
  }

  close(): void {
    this.title = Translation.empty;
    this.text = Translation.empty;
    this.onConfirm = null!;
    this.isActive = false;
  }
}

export default ConfirmationStore;
