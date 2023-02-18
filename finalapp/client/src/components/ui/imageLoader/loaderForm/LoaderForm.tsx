import styles from './LoaderForm.module.scss';
import uploadIcon from '../../../../assets/icons/upload.svg';
import React from 'react';
import { checkImageFile } from '../../../../core/utils/checkImageFile';
import { MAX_UPLOADED_IMAGE_SIZE_MB } from '../../../../core/constants/restrictionConstants';
import TranslatedMessage from '../../../translatedMessage/TranslatedMessage';
import Translation from '../../../../core/utils/translation';

interface LoaderFormProps {
  onLoad: (file: File) => void;
}

export const LoaderForm = (props: LoaderFormProps): JSX.Element => {
  const [dragActive, setDragActive] = React.useState<boolean>(false);

  const handleDrag = (event: React.DragEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover')
      setDragActive(true);
    else if (event.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    checkImageFile(event.dataTransfer.files) &&
      props.onLoad(event.dataTransfer.files[0]);
  };

  const onInputLoad = (
    event: React.SyntheticEvent<HTMLInputElement, Event>,
  ): void => {
    checkImageFile(event.currentTarget.files) &&
      props.onLoad(event.currentTarget.files![0]);
  };

  return (
    <div className={styles.form} onDragEnter={handleDrag}>
      <label className={styles.label}>
        <input
          type="file"
          className={styles.input}
          accept="image/png, image/gif, image/jpeg"
          onChange={onInputLoad}
          multiple={false}
        />
        <div className={styles.labelContent}>
          <img src={uploadIcon} alt="upload icon" />
          <p className={styles.text}>
            <TranslatedMessage
              message={Translation.translatedText('imageLoader.text', {
                span: (word: string) => (
                  <span className={styles.button}>{word}</span>
                ),
              })}
            />
          </p>

          <span className={styles.note}>
            <TranslatedMessage
              message={Translation.translatedText('imageLoader.formats')}
            />
          </span>
          <span className={styles.note}>
            <TranslatedMessage
              message={Translation.translatedText('imageLoader.maxFileSize', {
                maxFileSize: MAX_UPLOADED_IMAGE_SIZE_MB,
              })}
            />
          </span>
        </div>
      </label>

      {dragActive && (
        <div
          className={styles.dragFileElement}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <TranslatedMessage
            message={Translation.translatedText('imageLoader.drop')}
          />
        </div>
      )}
    </div>
  );
};
