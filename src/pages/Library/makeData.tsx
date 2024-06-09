export type User = {
  authors: string;
  year: string;
  title: string;
  tags: string;
  // added: string;
  // file: string;
};

export const fakeData: User[] = [
  {
    authors: 'Iqra Aswad | Muhammad Niswar | Amil Ahmad Ilham',
    year: '2017',
    title: 'Pengembangan Media Proxy untuk Mendukung Komunikasi Real Time berbasis WEB',
    tags: 'webRTC',

  },
  {
    authors: 'KAmil Ahmad Ilham | Anugrayani Bustamin | Iqra Aswad |',
    year: '2020',
    title: 'Implementation of Clustering and Similarity Analysis for Detecing Content Similarity in Student Final Projects',
    tags: 'clustering, similarity',

  },
  {
    authors: 'Taslinda | Indrabayu | Anugrayani Bustamin',
    year: '2017',
    title: 'Sistem Deteksi Hambatan Pada Autonomous Driving',
    tags: 'autonomous driving, hambatan, SSD, mobilenet v2, real time',

  },
  {
    authors: 'Muhammad Fachrial Yuni Yunizar Yunus | Adnan | Christoforus Yohannes',
    year: '2019',
    title: 'Rancang Sistem Rumah Walet Cerdas Berbasis IOT',
    tags: 'End Devices, Node, Gateway, HTTP Request, Time on Air',

  },
  {
    authors: 'Rya Dita Purnama | Ingrid Nurtanio | Elly Warni',
    year: '2021',
    title: 'Implementasi Algoritma Apriori Pada Penyebab Kematian Bayi',
    tags: 'data mining, algoritma apriori, pola keterkaitan, penyebab kematian bayi',

  },
  {
    authors: 'Rizky Nadya Fatma | Ingrid Nurtanio | Andani',
    year: '2015',
    title: 'Sistem Prediksi Logistik Pemesanan Bahan Baku Pada Industri Makanan',
    tags: 'Prediksi, Rumah Makan, Bahan Makanan, Single Moving Average, Overstock',

  },

];
