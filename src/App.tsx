import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './custom.css';
import './skeleton.css';
import './normalize.css';



interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductLineCard {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    '/img/0.avif',
    '/img/1.avif',
    '/img/2.avif'
  ];

  const productLines: ProductLineCard[] = [
    {
      id: 'textil',
      title: 'Línea Textil',
      description: 'Suavizantes y productos especializados para el cuidado de textiles',
      images: [
        'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg',
        'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg',
        'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg'
      ],
      link: '/linea-textil'
    },
    {
      id: 'pisos',
      title: 'Línea Pisos y Superficies',
      description: 'Ambientadores y desinfectantes para todo tipo de superficies',
      images: [
        'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg',
        'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg',
        'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg'
      ],
      link: '/linea-pisos'
    },
    {
      id: 'cocina',
      title: 'Línea Cuidado de tu Cocina',
      description: 'Productos especializados para la limpieza y desinfección de cocinas',
      images: [
        'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg',
        'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg',
        'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg'
      ],
      link: '/linea-cocina'
    }
  ];

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Suavizante Suaroma Azul',
      description: 'Suavizante de ropa con fragancia duradera y aroma fresco',
      image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg',
      category: 'textil'
    },
    {
      id: '2',
      name: 'Galante Fresh Canela',
      description: 'Ambientador con amoniaco cuaternario, aroma duradero a canela',
      image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg',
      category: 'pisos'
    },
    {
      id: '3',
      name: 'Vital Suave Frutos Rojos',
      description: 'Jabón antiséptico con aroma a frutos rojos',
      image: 'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg',
      category: 'manos'
    }
  ];

  // Auto-advance hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header id= "main-header" className="fixed top-0 w-full bg-white shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* Contact Marquee */}
          <div className="contact-marquee">
            <p>
              <span>Contacto: coasquimicos@gmail.com | Teléfono: +57 317 5124097 | Calidad garantizada en todos nuestros productos</span>
            </p>
          </div>
          
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-black">Perdomo</span>
                <span className="text-blue-500">Solutions</span>
                <sup className="text-xs">®</sup>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-500 transition-colors">Inicio</a>
              <a href="#quienes-somos" className="text-gray-700 hover:text-blue-500 transition-colors">¿Quiénes Somos?</a>
              <div className="relative group">
                <a href="#productos" className="text-gray-700 hover:text-blue-500 transition-colors">Productos</a>
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48">
                  <a href="#textil" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Línea Textil</a>
                  <a href="#pisos" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Línea Pisos y Superficies</a>
                  <a href="#cocina" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Línea Cuidado de tu Cocina</a>
                </div>
              </div>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <ShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-lg border z-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-4">Carrito de Compras</h3>
                      {cartItems.length === 0 ? (
                        <p className="text-gray-500">El carrito está vacío</p>
                      ) : (
                        <>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {cartItems.map(item => (
                              <div key={item.id} className="flex items-center space-x-3">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">{item.name}</h4>
                                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 space-y-2">
                            <button
                              onClick={clearCart}
                              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                              Vaciar Carrito
                            </button>
                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                              Comprar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                <a href="#inicio" className="block py-2 text-gray-700 hover:text-blue-500 transition-colors">Inicio</a>
                <a href="#quienes-somos" className="block py-2 text-gray-700 hover:text-blue-500 transition-colors">¿Quiénes Somos?</a>
                <a href="#productos" className="block py-2 text-gray-700 hover:text-blue-500 transition-colors">Productos</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden mt-32">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroImages[currentHeroImage]})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Bienvenidos a Coasquímicos
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
            Una empresa 💯% Opita. Expertos en químicos para hogares, hospitales y más
          </p>
          <div className="max-w-md mx-auto animate-fade-in-up animation-delay-600">
            <input
              type="text"
              placeholder="¿Qué productos te gustaría comprar?"
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Hero Navigation Arrows */}
        <button
          onClick={prevHeroImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextHeroImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20"
        >
          <ChevronRight size={48} />
        </button>
      </section>

      {/* Features Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <p className="text-lg">Precios imbatibles para productos de la más alta calidad</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧤</span>
              </div>
              <p className="text-lg">Expertos en limpieza, calidad del producto y libre de gérmenes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <p className="text-lg">Entregas puntuales y garantizadas en el menor tiempo posible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section id="lineas-producto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nuestras Líneas de Productos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {productLines.map((line) => (
              <ProductLineCard key={line.id} productLine={line} />
            ))}
          </div>
        </div>
      </section>

      {/* Sample Products Section */}
      <section id="productos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Productos Destacados</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-blue-300 transition-colors">Facebook</a>
                <a href="#" className="block hover:text-blue-300 transition-colors">Instagram</a>
                <a href="#" className="block hover:text-blue-300 transition-colors">WhatsApp</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Empresa</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-blue-300 transition-colors">¿Quiénes Somos?</a>
                <a href="#" className="block hover:text-blue-300 transition-colors">Empleo</a>
                <a href="#" className="block hover:text-blue-300 transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contacto</h3>
              <p>Email: coasquimicos@gmail.com</p>
              <p>Teléfono: +57 317 5124097</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Product Line Card Component with Auto-Slider
const ProductLineCard: React.FC<{ productLine: ProductLineCard }> = ({ productLine }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productLine.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productLine.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productLine.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productLine.images.length) % productLine.images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden group">
        <img
          src={productLine.images[currentImageIndex]}
          alt={productLine.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Slider Controls */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {productLine.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{productLine.title}</h3>
        <p className="text-gray-600 mb-4">{productLine.description}</p>
        <a
          href={productLine.link}
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Ver Productos
        </a>
      </div>
    </div>
  );
  
};


export default App;