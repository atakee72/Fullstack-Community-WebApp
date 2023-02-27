const transformDate = (time) => {
  const date = new Date(time).toLocaleString();
  return date;
};

export default transformDate;
