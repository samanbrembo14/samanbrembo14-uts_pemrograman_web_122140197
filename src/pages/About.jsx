import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tentang Aplikasi</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Aplikasi ini adalah proyek UTS Pemrograman Web berbasis React yang menggunakan{' '}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          DummyJSON API
        </a>{' '}
        sebagai sumber data produk. Proyek ini dirancang dengan clean code, UI modern, dan struktur folder terorganisir.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">🔧 Fitur Utama:</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1 mb-8">
        <li>Menampilkan daftar produk dari API eksternal</li>
        <li>Halaman detail produk dengan kontrol jumlah dan subtotal</li>
        <li>Filter kategori & pencarian produk dengan history</li>
        <li>Like/favorit produk (tersimpan di localStorage)</li>
        <li>Keranjang belanja global dengan jumlah dinamis</li>
        <li>Modal preview saat menambahkan ke keranjang</li>
        <li>Halaman khusus cart dengan tombol <strong>“Beli Sekarang”</strong></li>
        <li>Routing dinamis & penanganan halaman 404</li>
        <li>State global menggunakan Context & <code>useReducer</code></li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">🛠 Teknologi yang Digunakan:</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>React + Vite</li>
        <li>Tailwind CSS</li>
        <li>React Router</li>
        <li>Framer Motion (untuk animasi)</li>
        <li>PropTypes, Context API, useReducer, dan custom hooks</li>
      </ul>

      <p className="mt-8 text-gray-600 text-sm">
        Dibuat oleh <strong>Alwi</strong> — Semester 6 Pemrograman Web.
        <br />
        Terima kasih sudah mencoba aplikasi ini! 🙌
      </p>
    </motion.div>
  );
}
