import React from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const isOutsideClick = () => {

  }

  React.useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref?.current?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;