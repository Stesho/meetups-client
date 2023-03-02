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
import TranslatedMessage from '../translatedMessage/TranslatedMessage';
import Translation from '../../core/utils/translation';

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
  const requiredFields = Translation.translatedText(
    'meetups.create.stepper.requires',
  );
  const additionalFields = Translation.translatedText(
    'meetups.create.stepper.additional',
  );
  const STEPS: Array<Translation> = [requiredFields, additionalFields];

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

  // const onPreviousStep = (
  //   data: FormRequiredData,
  //   event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   onRequiredFormSubmit(data, event);
  //   props.onExit();
  // }

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
        <h2 className="basicH1">
          <TranslatedMessage
            message={Translation.translatedText('meetups.create.title')}
          />
        </h2>
        <p className={`paragraph ${styles.description}`}>
          <TranslatedMessage
            message={Translation.translatedText('meetups.create.caption')}
          />
        </p>
      </div>

      {currentStep === 0 ? (
        <RequiredCreateForm
          initialValues={requiredFormData || undefined}
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
