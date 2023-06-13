const parseTime = (time: string) => {
  const parsedTime = time.split(':');
  const hours = Number.parseInt(parsedTime[0]);
  const minutes = Number.parseInt(parsedTime[1]);
  return {
    hours,
    minutes,
  };
};

export default parseTime;