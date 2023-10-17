import { format, formatDistanceToNow } from "date-fns";

const timeFormatter = (date, formatType) => {
  return format(new Date(date), formatType);
};
const timeAgoFormat = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export { timeFormatter, timeAgoFormat };
