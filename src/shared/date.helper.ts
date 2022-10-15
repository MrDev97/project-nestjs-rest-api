export const dateToArray = (date: Date): Array<number> => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export const arrayToDate = (array: any): Date => {
  if (!Array.isArray(array) || array.some((i) => typeof i !== 'number'))
    return new Date(array.value.join());
};
