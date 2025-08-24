import dayjs from "dayjs";

export const formatDisplayDate = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY");
};

export const formatFullDisplayDate = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY HH:mm");
};
