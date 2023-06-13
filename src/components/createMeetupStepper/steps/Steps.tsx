import styles from './Steps.module.scss';
import TranslatedMessage from '../../translatedMessage/TranslatedMessage';
import Translation from '../../../core/utils/translation';

interface StepsProps {
  steps: Array<Translation>;
  current: number;
}

export const Steps = (props: StepsProps): JSX.Element => (
  <div className={styles.steps}>
    {props.steps.map(
      (step: Translation, index: number): JSX.Element => (
        <div
          className={`${styles.step} ${
            props.current === index ? styles.current : ''
          }`}
          key={step.id}
        >
          <span className={styles.number}>{index + 1}</span>
          <span className={styles.name}>
            <TranslatedMessage message={step} />
          </span>
        </div>
      ),
    )}
  </div>
);
