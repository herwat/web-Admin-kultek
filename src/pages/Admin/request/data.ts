/**
 * @Author: Your name
 * @Date:   2024-06-11 13:33:43
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-16 17:05:55
 */
import { Firestore, DocumentReference, doc } from "firebase/firestore";

export type JenisBisnis = 'Warung Makanan' | 'Warung Berjalan' | null;

export type Person = {
  id: string;
  Products: string;
  Alamat: string;
  NoHp: string;
  Nama: string;
  JenisBisnis: JenisBisnis;
  Status: boolean;
  email: string;
};

export const data: Person[] = [
  {
    Nama: 'Warung Soto Ayam',
    JenisBisnis: null,
    Status: true,
    email: 'warung.soto.ayam@gmail.com',
    Products: '',
    Alamat: '',
    NoHp: '',
    id: 'some-id',  // Assuming you have an ID to work with
  },
  // Tambahkan data lainnya
];

// Fungsi untuk memvalidasi bahwa semua email menggunakan domain gmail.com
function validateEmails(persons: Person[]): boolean {
  return persons.every(person => person.email.endsWith('@gmail.com'));
}

// Validasi data
if (!validateEmails(data)) {
  throw new Error('All emails must use the domain gmail.com');
}

console.log('All emails are valid.');
