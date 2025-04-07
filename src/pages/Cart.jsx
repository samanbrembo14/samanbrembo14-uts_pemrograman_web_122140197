import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { state, dispatch } = useProductContext();
  const { cart } = state;

  const handleQtyChange = (id, qty) => {
    if (qty >= 1) {
      dispatch({ type: 'CHANGE_QUANTITY', payload: { id, qty } });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const confirmed = window.confirm('Apakah kamu yakin ingin membeli semua produk ini?');
    if (confirmed) {
      alert('Pembelian berhasil! Terima kasih 🎉');
      dispatch({ type: 'CLEAR_CART' });
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="/notfound.png"
            alt="Tidak ada keranjang"
            className="w-32 h-auto mb-4 mx-auto"
          />
          <p>Keranjangmu kosong.</p>
          <Link
            to="/products"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Belanja Sekarang →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">${item.price} x {item.qty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty - 1)}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty + 1)}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-8">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </p>

            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition"
            >
              🛒 Beli Sekarang
            </button>
          </div>

        </>
      )}
    </div>
  );
}
