export interface IBooking {
  date: Date;
  time: number;
  guests: number;
  customer: ICustomer;
  _id: string;
}

export interface ICustomer {
  _id: string
  name: string
  email: string
  phone: number
}
