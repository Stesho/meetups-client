import { FormRequiredData } from '../../components/forms/create/required/RequiredCreateForm';
import { FormAdditionalData } from '../../components/forms/create/additional/AdditionalCreateForm';
import { CreatedMeetup } from '../types/Meetup';
import { ShortUser } from '../types/User';

export const combineFormDataForCreatedMeetup = (
  required: FormRequiredData,
  additional: FormAdditionalData,
  user: ShortUser,
): CreatedMeetup => {
  return {
    start: new Date(new Date().getTime()).toISOString(),
    finish: new Date(new Date().getTime() + 20000).toISOString(),
    author: user,
    modified: new Date().toISOString(),
    image: additional.image as string,
    excerpt: required.description,
    place: additional.place,
    subject: required.name,
    speakers: [],
  };
};
