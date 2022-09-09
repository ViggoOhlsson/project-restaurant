export interface IBooking {
  date: Date;
  time: number;
  guests: number;
  customer: ICustomer;
  _id: string;
}

export interface IBookingPrimitive {
  date: string;
  time: number;
  guests: number;
  email: string;
  name: string;
  phone: number;
}

export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: number;
}
