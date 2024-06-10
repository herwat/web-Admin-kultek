/**
 * @Author: Your name
 * @Date:   2024-05-28 10:32:00
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-06-10 19:03:41
 */
export type JenisBisnis = 'Warung Makanan' | 'Warung Berjalan' | null;

export type Person = {
  Nama: string;
  JenisBisnis: JenisBisnis;
  Status: boolean; 
  email: string;
};

// data.ts
export const data: Person[] = [
  {
    Nama: 'Warung Soto Ayam',
    JenisBisnis: null,
    Status: true, 
    email: 'warung.soto.ayam@gmail.com',
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


