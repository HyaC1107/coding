interface input {
  _value?: string | number;
  _dayOfWeek?: boolean;
  _selected?: boolean;
  _holiday?: boolean;
  _otherMonth?: boolean;
}
const md = (data: input): any => {
  //make day
  return {
    value: data._value,
    dayOfWeek: data._dayOfWeek,
    selected: data._selected,
    holiday: data._holiday,
    otherMonth: data._otherMonth,
  };
};

export const dummyCalendars = [
  [
    // first dummy date
    [
      md({_value: '일', _dayOfWeek: true}),
      md({_value: '월', _dayOfWeek: true}),
      md({_value: '화', _dayOfWeek: true}),
      md({_value: '수', _dayOfWeek: true}),
      md({_value: '목', _dayOfWeek: true}),
      md({_value: '금', _dayOfWeek: true}),
      md({_value: '토', _dayOfWeek: true}),
    ],
    [
      md({_value: 28, _otherMonth: true}),
      md({_value: 29, _otherMonth: true}),
      md({_value: 30, _otherMonth: true}),
      md({_value: 31, _otherMonth: true}),
      md({_value: 1}),
      md({_value: 2}),
      md({_value: 3}),
    ],
    [
      md({_value: 4}),
      md({_value: 5}),
      md({_value: 6}),
      md({_value: 7}),
      md({_value: 8}),
      md({_value: 9}),
      md({_value: 10}),
    ],
    [
      md({_value: 11}),
      md({_value: 12}),
      md({_value: 13}),
      md({_value: 14}),
      md({_value: 15}),
      md({_value: 16, _holiday: true}),
      md({_value: 17}),
    ],
    [
      md({_value: 18}),
      md({_value: 19}),
      md({_value: 20, _selected: true, _holiday: true}),
      md({_value: 21}),
      md({_value: 22}),
      md({_value: 23, _holiday: true}),
      md({_value: 24}),
    ],
    [
      md({_value: 25}),
      md({_value: 26}),
      md({_value: 27, _holiday: true}),
      md({_value: 28}),
      md({_value: 29}),
      md({_value: 30}),
      md({_value: 1, _otherMonth: true}),
    ],
  ],
  // second dummy date
  [
    [
      md({_value: '일', _dayOfWeek: true}),
      md({_value: '월', _dayOfWeek: true}),
      md({_value: '화', _dayOfWeek: true}),
      md({_value: '수', _dayOfWeek: true}),
      md({_value: '목', _dayOfWeek: true}),
      md({_value: '금', _dayOfWeek: true}),
      md({_value: '토', _dayOfWeek: true}),
    ],
    [
      md({_value: 25, _otherMonth: true}),
      md({_value: 26, _otherMonth: true}),
      md({_value: 27, _otherMonth: true}),
      md({_value: 28, _otherMonth: true}),
      md({_value: 29, _otherMonth: true}),
      md({_value: 30, _otherMonth: true}),
      md({_value: 1}),
    ],
    [
      md({_value: 2}),
      md({_value: 3}),
      md({_value: 4}),
      md({_value: 5}),
      md({_value: 6}),
      md({_value: 7}),
      md({_value: 8}),
    ],
    [
      md({_value: 9}),
      md({_value: 10}),
      md({_value: 11}),
      md({_value: 12}),
      md({_value: 13}),
      md({_value: 14, _holiday: true}),
      md({_value: 15, _holiday: true}),
    ],
    [
      md({_value: 16}),
      md({_value: 17}),
      md({_value: 18, _holiday: true}),
      md({_value: 19}),
      md({_value: 20}),
      md({_value: 21}),
      md({_value: 22}),
    ],
    [
      md({_value: 23}),
      md({_value: 24, _holiday: true}),
      md({_value: 25}),
      md({_value: 26}),
      md({_value: 27}),
      md({_value: 28}),
      md({_value: 29}),
    ],
    [
      md({_value: 30, _selected: true, _holiday: true}),
      md({_value: 31}),
      md({_value: 1, _otherMonth: true}),
      md({_value: 2, _otherMonth: true}),
      md({_value: 3, _otherMonth: true}),
      md({_value: 4, _otherMonth: true}),
      md({_value: 5, _otherMonth: true}),
    ],
  ],
];

export const todayDate = new Date();
export const todayYear = todayDate.getFullYear();
export const todayMonth = todayDate.getMonth() + 1; //0~11 반환
export const todayDay = todayDate.getDate();
export const getDateString = (date: any) => {};
export const numberOfDays = (date: any) => {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1, //실제 월
    0,
  ).getDate();
};
export const startDayOfMonth = (date: any) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(), //실제 월 -1
    1,
  ).getDay();
};

export const endDayOfMonth = (date: any) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(), //실제 월 -1
    numberOfDays(date),
  ).getDay();
};

const splitIntoChunk = (arr: any, chunk: any) => {
  const result = [];

  for (let index = 0; index < arr.length; index += chunk) {
    let tempArray;
    tempArray = arr.slice(index, index + chunk);
    result.push(tempArray);
  }

  return result;
};
