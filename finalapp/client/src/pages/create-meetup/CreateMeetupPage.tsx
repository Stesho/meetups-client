import React from 'react';
import styles from './CreateMeetupPage.module.scss';
import { CreateMeetupStepper } from '../../components/createMeetupStepper/CreateMeetupStepper';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FormRequiredData } from '../../components/forms/create/required/RequiredCreateForm';
import { FormAdditionalData } from '../../components/forms/create/additional/AdditionalCreateForm';
import { CreatedMeetup, Meetup } from '../../core/types/Meetup';
import { combineFormDataForCreatedMeetup } from '../../core/utils/combineFormDataForCreatedMeetup';
import { ShortUser } from '../../core/types/User';
import { useStore } from '../../context/storeContext';

interface CreateMeetupPageProps {
  user: ShortUser;
}

export const CreateMeetupPage = ({
  user,
}: CreateMeetupPageProps): JSX.Element => {
  const navigation: NavigateFunction = useNavigate();
  const meetupsStore = useStore('MeetupsStore');

  const leavePage = (): void => navigation('/meetups');

  const createMeetup = async (
    required: FormRequiredData,
    additional: FormAdditionalData,
  ): Promise<void> => {
    const combinedMeetup: CreatedMeetup = combineFormDataForCreatedMeetup(
      required,
      additional,
      user,
    );
    meetupsStore.addMeetup(combinedMeetup as Meetup);
    leavePage();
  };

  return (
    <section className="container smoothPage">
      <div className={styles.createMeetupPage}>
        <CreateMeetupStepper onExit={leavePage} onCreate={createMeetup} />
      </div>
    </section>
  );
};
