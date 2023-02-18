import React from 'react';
import { FormattedMessage } from 'react-intl';
import Translation from '../../core/utils/translation';

interface TranslatedMessageProps {
  message: Translation;
}

const TranslatedMessage = (
  props: TranslatedMessageProps,
): JSX.Element | null => {
  if (!props.message.id) {
    return null;
  }

  return (
    <FormattedMessage id={props.message.id} values={props.message.params} />
  );
};

export default TranslatedMessage;
