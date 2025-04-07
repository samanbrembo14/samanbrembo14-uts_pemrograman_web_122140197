import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          DummyStore
        </Link>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/products" className="hover:underline">Product</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/favorites" className="hover:underline">❤️ Favorit</Link></li>
          <Link to="/cart" className="hover:underline">🛒 Keranjang</Link>

        </ul>
      </nav>
    </header>
  );
}
