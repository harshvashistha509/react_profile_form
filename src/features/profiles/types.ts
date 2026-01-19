export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  age: string;
  address: Address;
}
