/**
 * @Author: Your name
 * @Date:   2024-06-11 13:33:43
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-16 17:05:55
 */

export type Request = {
  id: string;
  name: string;
  address: Address;
  whatsapp: string;
  type: string;
  status: string;
};

export type Address = {
  text: string;
  gmap?: string;
};
