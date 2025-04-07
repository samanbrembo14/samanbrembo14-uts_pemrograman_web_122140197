import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function CartPreviewModal({ product, qty, setQty, onAdd, onClose }) {
  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tambah ke Keranjang</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ×
          </button>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <img src={product.image} alt={product.title} className="w-20 h-20 rounded object-cover" />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-blue-600">${product.price}</p>
          </div>
        </div>

        {/* Qty control */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={handleDecrease}
            className="bg-gray-200 hover:bg-gray-300 text-xl px-3 py-1 rounded"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            className="w-16 text-center border border-gray-300 rounded py-1"
            value={qty}
            readOnly
          />
          <button
            onClick={handleIncrease}
            className="bg-gray-200 hover:bg-gray-300 text-xl px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Tambahkan
        </button>
      </motion.div>
    </motion.div>
  );
}

CartPreviewModal.propTypes = {
  product: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  setQty: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
