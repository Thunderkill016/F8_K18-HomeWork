export type { Style, Column, Row, Customer };
interface Style {
  [key: string]: string;
}
interface Column {
  value: string;
  text: string;
  style?: Style;
}
interface Row {
  [key: string]: string | number | null;
  id: number;
}
interface Customer extends Row {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  rank: string;
}
