import styles from './ImagePreviewer.module.scss';
import fileIcon from '../../../../assets/icons/file-icon.svg';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';

interface PreviewerProps {
  title: string;
  size: number;
  onCancel: () => void;
}

export const ImagePreviewer = (props: PreviewerProps): JSX.Element => (
  <>
    <span className={styles.label}>Загруженные изображения</span>
    <div className={styles.previewer}>
      <img src={fileIcon} alt="Картинка загружена" />
      <div className={styles.information}>
        <span className={styles.fileName} title={props.title}>
          {props.title}
        </span>
        <span className={styles.fileSize} title={`${props.size} bytes`}>
          <TranslatedMessage
            message={Translation.translatedText('imageLoader.fileSize', {
              fileSize: (props.size / 1024 / 1024).toFixed(2),
            })}
          />
        </span>
      </div>
      <button className={styles.cancel} onClick={(): void => props.onCancel()}>
        ×
      </button>
    </div>
  </>
);
