import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useProducts } from '../hooks/useProducts';
import { useProductContext } from '../context/ProductContext';
import { useMemo } from 'react';

export default function Products() {
  const { data: products, loading, error } = useProducts();
  const { state, dispatch } = useProductContext();

  const search = state.searchQuery;
  const selectedCategory = state.selectedCategory;
  const searchHistory = state.searchHistory;

  const categories = [...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) =>
        selectedCategory === 'all' ? true : item.category === selectedCategory
      );
  }, [products, search, selectedCategory]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });

    // Simpan ke history jika ada isinya
    if (value.trim()) {
      dispatch({ type: 'ADD_SEARCH_HISTORY', payload: value.trim() });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Produk Tersedia
      </h1>

      {/* 🔍 Search & Filter */}
      <div className="mb-6 text-center flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder="Cari produk..."
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
          value={search}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' && search.trim()) {
              dispatch({ type: 'ADD_SEARCH_HISTORY', payload: search.trim() });
            }
          }}
        />

        {/* Riwayat Pencarian */}
        {searchHistory.length > 0 && (
          <div className="text-sm text-gray-500 mt-2 max-w-md w-full">
            <p className="mb-1 font-medium">Riwayat Pencarian:</p>
            <ul className="flex flex-wrap gap-2">
              {searchHistory.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 bg-gray-200 text-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-300"
                >
          <span
            onClick={() =>
              dispatch({ type: 'SET_SEARCH_QUERY', payload: item })
            }
          >
            {item}
          </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'REMOVE_SEARCH_HISTORY', payload: item });
                    }}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}


        <select
          value={selectedCategory}
          onChange={(e) =>
            dispatch({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value })
          }
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
            dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'all' });
          }}
          className="text-sm text-red-700 font-bold mt-2 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          Reset Filter
        </button>
      </div>

      {/* Filtered Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 flex flex-col items-center">
          <img
            src="/notfoundd.png"
            alt="Tidak ada produk"
            className="w-72 h-auto mb-6"
          />
          <p>Produk yang kamu cari gaada :'(</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.thumbnail}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
