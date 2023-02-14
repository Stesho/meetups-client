import React from 'react';
import { Steps } from './steps/Steps';
import styles from './CreateMeetupStepper.module.scss';
import {
  RequiredCreateForm,
  FormRequiredData,
} from '../forms/create/required/RequiredCreateForm';
import {
  FormAdditionalData,
  AdditionalCreateForm,
} from '../forms/create/additional/AdditionalCreateForm';

interface CreateMeetupStepperProps {
  onCreate?: (
    required: FormRequiredData,
    additional: FormAdditionalData,
  ) => void;
  onExit: () => void;
}

export const CreateMeetupStepper = (
  props: CreateMeetupStepperProps,
): JSX.Element => {
  const STEPS: Array<string> = ['Обязательные поля', 'Дополнительные поля'];

  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const [requiredFormData, setRequiredFormData] =
    React.useState<FormRequiredData | null>(null);
  const [additionalFormData, setAdditionalFormData] =
    React.useState<FormAdditionalData | null>(null);

  const onRequiredFormSubmit = (
    data: FormRequiredData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event?.preventDefault();
    setRequiredFormData(data);
    setCurrentStep((old) => old + 1);
  };

  const onAdditionalFormSubmit = (
    data: FormAdditionalData,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event?.preventDefault();
    setAdditionalFormData(data);
    props.onCreate && props.onCreate(requiredFormData!, data); // data because additionalFormData is not set yet (async)
  };

  const onAdditionalFormCancel = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event?.preventDefault();
    setCurrentStep((old) => old - 1);
  };

  return (
    <div className={styles.stepper}>
      <Steps steps={STEPS} current={currentStep} />
      <div className={styles.text}>
        <h2 className="basicH1">Новый митап</h2>
        <p className={`paragraph ${styles.description}`}>
          Заполните необходимые поля ниже наиболее подробно, это даст полную
          <br />
          информации о предстоящем событии.
        </p>
      </div>

      {currentStep === 0 ? (
        <RequiredCreateForm
          onSubmit={onRequiredFormSubmit}
          onCancel={props.onExit}
        />
      ) : (
        <AdditionalCreateForm
          onSubmit={onAdditionalFormSubmit}
          onCancel={onAdditionalFormCancel}
        />
      )}
    </div>
  );
};
