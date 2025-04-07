import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-blue-600 text-white shadow-md relative z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          DummyStore
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/products" className="hover:underline">Product</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/favorites" className="hover:underline">❤️ Favorit</Link></li>
          <li><Link to="/cart" className="hover:underline">🛒 Keranjang</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu with transition */}
      <div
        className={`md:hidden absolute w-full bg-blue-600 px-6 py-4 transition-all duration-300 ease-in-out origin-top transform ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li><Link to="/" onClick={closeMenu} className="hover:underline">Home</Link></li>
          <li><Link to="/products" onClick={closeMenu} className="hover:underline">Product</Link></li>
          <li><Link to="/about" onClick={closeMenu} className="hover:underline">About</Link></li>
          <li><Link to="/favorites" onClick={closeMenu} className="hover:underline">❤️ Favorit</Link></li>
          <li><Link to="/cart" onClick={closeMenu} className="hover:underline">🛒 Keranjang</Link></li>
        </ul>
      </div>
    </header>
  );
}
