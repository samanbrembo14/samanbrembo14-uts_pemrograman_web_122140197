import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl text-center space-y-8">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-blue-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Temukan Produk yang kamu inginkan di Web ini
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg md:text-xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Belanja produk dengan harga terbaik, mudah, cepat, dan menyenangkan. Semua data
          berasal dari <code className="text-blue-500">DummyJSON API</code>.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
          >
            Lihat Produk
          </Link>

          <Link
            to="/about"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-50 hover:scale-105"
          >
            Tentang Aplikasi
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
