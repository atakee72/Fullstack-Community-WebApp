const createStringArray = (arr, prop) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i][prop]);
  }
  return result;
};

export default createStringArray;
