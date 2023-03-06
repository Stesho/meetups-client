import React from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

interface LoaderProps {
  children: JSX.Element
  promise: Promise<void>
  loaderClassName?: string
  spinnerClassName?: string
}

const Loader = (props: LoaderProps): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loading = async () => {
    await props.promise;
    setIsLoading(false);
  }

  React.useEffect(() => {
    loading();
  }, []);

  return (
    isLoading
    ? <LoadingSpinner
        loaderClassName={props.loaderClassName}
        spinnerClassName={props.spinnerClassName}
      />
    : props.children
  );
};

export default Loader;