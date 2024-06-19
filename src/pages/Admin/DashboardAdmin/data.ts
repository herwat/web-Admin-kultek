/**
 * @Author: Your name
 * @Date:   2024-05-28 10:32:00
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-10 19:03:41
 */

import { Address } from '../request/data';

export type Mitra = {
  id: string;
  name: string;
  schedule?: Schedule;
  image?: string;
  products?: Product[];
  rating: number;
  address: Address;
  is_open: boolean;
  whatsapp: string;
  type: string;
};

export type Schedule = {
  [day: string]: {
    open_time: string;
    close_time: string;
  };
};

export type Product = {
  id: string;
  name: string;
  desc?: string;
  price: string;
  image?: string;
};
