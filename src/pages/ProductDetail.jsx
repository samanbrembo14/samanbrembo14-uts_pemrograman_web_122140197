import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useProductContext } from '../context/ProductContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useProductContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const json = await res.json();
        setProduct(json);
      } catch (err) {
        setError('Gagal memuat detail produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id: product.id, title: product.title, price: product.price, image: product.thumbnail, qty },
    });
    alert('Produk ditambahkan ke keranjang!');
  };

  const handleBuy = () => {
    alert('Simulasi: Kamu akan langsung beli produk ini 🛒');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Gambar */}
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />

        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images?.slice(0, 5).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`preview-${idx}`}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* Detail dan Aksi */}
      <div className="flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">Kategori: {product.category}</p>

          <p className="text-green-600 font-semibold text-xl mb-1">${product.price}</p>
          {product.discountPercentage && (
            <p className="text-sm line-through text-gray-400">
              ${Math.round(product.price / (1 - product.discountPercentage / 100))}
            </p>
          )}

          <p className="text-gray-700 mt-6 whitespace-pre-line">{product.description}</p>
        </div>

        {/* Kontrol Jumlah & Aksi */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">Atur jumlah:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-3 py-1 bg-gray-300 rounded text-lg"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 bg-gray-300 rounded text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right mb-4 text-gray-700">
            Subtotal: <span className="font-semibold">${(product.price * qty).toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              + Keranjang
            </button>
            <button
              onClick={handleBuy}
              className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
            >
              Beli
            </button>
          </div>
        </div>

        <Link
          to="/products"
          className="text-blue-500 hover:underline text-sm inline-block mt-4"
        >
          ← Kembali ke daftar produk
        </Link>
      </div>
    </div>
  );
}
