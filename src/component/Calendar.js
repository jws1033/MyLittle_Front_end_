import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("ko", ko);

<DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  locale="ko"
  placeholderText="Weeks start on Monday"
/>;