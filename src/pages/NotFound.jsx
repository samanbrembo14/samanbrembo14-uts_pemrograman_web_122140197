import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [0, -5, 5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-7xl mb-4"
      >
        😵‍💫
      </motion.div>

      <h1 className="text-4xl font-bold text-red-600 mb-2">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 mb-6">Ups! Sepertinya kamu nyasar ke jalur yang salah.</p>

      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </motion.div>
  );
}
