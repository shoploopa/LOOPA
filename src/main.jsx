import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  SlidersHorizontal,
} from "lucide-react";
import "./style.css";

const categories = {
  Women: [
    "All Women",
    "Dresses",
    "Tops",
    "Skirts",
    "Pants",
    "Jeans",
    "Two-Piece Sets",
    "Loungewear",
    "Going Out",
    "Soft Girl",
    "Baddie",
    "Elegant",
  ],
  "Little Loves": [
    "All Little Loves",
    "Baby",
    "Toddler",
    "Little Girls",
    "Birthday",
    "Mommy & Me",
    "Handmade",
  ],
  Shoes: [
    "All Shoes",
    "Heels",
    "Sneakers",
    "Flats",
    "Sandals",
    "Boots",
    "Slides",
  ],
  Bags: [
    "All Bags",
    "Handbags",
    "Shoulder Bags",
    "Crossbody",
    "Mini Bags",
    "Tote Bags",
    "Crochet Bags",
  ],
  Accessories: [
    "All Accessories",
    "Jewelry",
    "Earrings",
    "Necklaces",
    "Bracelets",
    "Hair Accessories",
    "Sunglasses",
    "Belts",
    "Hats",
  ],
  "Crochet Corner": [
    "All Crochet",
    "Crochet Bags",
    "Crochet Clothing",
    "Crochet Accessories",
    "Crochet Home",
    "Custom Crochet",
  ],
};

const products = [
  {
    id: 1,
    name: "Rosé Mini Dress",
    price: 3800,
    category: "Women",
    subcategory: "Dresses",
    seller: "Maison Rose",
    emoji: "👗",
    tag: "New",
  },
  {
    id: 2,
    name: "Blush Bow Bag",
    price: 2600,
    category: "Bags",
    subcategory: "Mini Bags",
    seller: "Pretty Things",
    emoji: "👜",
    tag: "Trending",
  },
  {
    id: 3,
    name: "Petal Crochet Bag",
    price: 3200,
    category: "Crochet Corner",
    subcategory: "Crochet Bags",
    seller: "Looped by Nia",
    emoji: "🧶",
    tag: "Handmade",
  },
  {
    id: 4,
    name: "Little Princess Set",
    price: 2900,
    category: "Little Loves",
    subcategory: "Toddler",
    seller: "Tiny Bloom",
    emoji: "🎀",
    tag: "Little Loves",
  },
  {
    id: 5,
    name: "Pretty Pearl Heels",
    price: 4500,
    category: "Shoes",
    subcategory: "Heels",
    seller: "Sole Society",
    emoji: "👠",
    tag: "Best Seller",
  },
  {
    id: 6,
    name: "Butterfly Hair Clips",
    price: 850,
    category: "Accessories",
    subcategory: "Hair Accessories",
    seller: "Blush & Bow",
    emoji: "🦋",
    tag: "Cute",
  },
  {
    id: 7,
    name: "Pink Satin Co-Ord",
    price: 4200,
    category: "Women",
    subcategory: "Two-Piece Sets",
    seller: "The Pink Edit",
    emoji: "🌸",
    tag: "Trending",
  },
  {
    id: 8,
    name: "Tiny Bow Dress",
    price: 2400,
    category: "Little Loves",
    subcategory: "Little Girls",
    seller: "Little Bloom",
    emoji: "🎀",
    tag: "New",
  },
  {
    id: 9,
    name: "Heart Pendant",
    price: 1200,
    category: "Accessories",
    subcategory: "Necklaces",
    seller: "Lumière",
    emoji: "💎",
    tag: "Pretty",
  },
  {
    id: 10,
    name: "Cloud Crochet Top",
    price: 2800,
    category: "Crochet Corner",
    subcategory: "Crochet Clothing",
    seller: "Knot & Bloom",
    emoji: "☁️",
    tag: "Handmade",
  },
  {
    id: 11,
    name: "Classic White Sneakers",
    price: 3900,
    category: "Shoes",
    subcategory: "Sneakers",
    seller: "Sole Society",
    emoji: "👟",
    tag: "Everyday",
  },
  {
    id: 12,
    name: "Mini Pearl Shoulder Bag",
    price: 3100,
    category: "Bags",
    subcategory: "Shoulder Bags",
    seller: "Pretty Things",
    emoji: "🤍",
    tag: "New",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Women");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All Women");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      product.category === selectedCategory &&
      (selectedSubcategory.startsWith("All ") ||
        product.subcategory === selectedSubcategory);

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.seller.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(categories[category][0]);
    setShopOpen(true);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <button className="logo" onClick={() => setShopOpen(false)}>
            LOOPA
          </button>

          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => openCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search LOOPA..."
              />
            </div>

            <button className="icon-button">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="count">{wishlist.length}</span>
              )}
            </button>

            <button className="icon-button">
              <User size={20} />
            </button>

            <button className="icon-button">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="count">{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {!shopOpen ? (
        <main>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">WELCOME TO LOOPA</p>
              <h1>
                Your Style.
                <br />
                <em>Your World.</em>
              </h1>
              <p>
                A feminine fashion marketplace made for women,
                little loves and everything beautifully you.
              </p>
              <button
                className="primary-button"
                onClick={() => openCategory("Women")}
              >
                Shop Women <ArrowLeft size={18} />
              </button>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">DISCOVER</p>
                <h2>Shop your LOOPA</h2>
              </div>
            </div>

            <div className="category-grid">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  className={`category-card category-${category
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  onClick={() => openCategory(category)}
                >
                  <span className="category-emoji">
                    {category === "Women" && "🎀"}
                    {category === "Little Loves" && "🧸"}
                    {category === "Shoes" && "👠"}
                    {category === "Bags" && "👜"}
                    {category === "Accessories" && "💎"}
                    {category === "Crochet Corner" && "🧶"}
                  </span>

                  <div>
                    <h3>{category}</h3>
                    <p>{categories[category][1]}</p>
                  </div>

                  <ChevronRight />
                </button>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="shop-page">
          <div className="shop-top">
            <button
              className="back-button"
              onClick={() => setShopOpen(false)}
            >
              <ArrowLeft size={18} />
              Back to LOOPA
            </button>

            <div className="shop-title">
              <p className="eyebrow">SHOP LOOPA</p>
              <h1>{selectedCategory}</h1>
              <p>
                Discover pieces made to make you feel like you.
              </p>
            </div>
          </div>

          <div className="shop-layout">
            <aside className="shop-sidebar">
              <div className="filter-heading">
                <h3>Shop by</h3>
                <SlidersHorizontal size={18} />
              </div>

              {categories[selectedCategory].map((subcategory) => (
                <button
                  key={subcategory}
                  className={
                    selectedSubcategory === subcategory
                      ? "subcategory active"
                      : "subcategory"
                  }
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
            </aside>

            <section className="product-area">
              <div className="product-toolbar">
                <p>
                  <strong>{filteredProducts.length}</strong> pieces to love
                </p>
                <button className="sort-button">Sort: Featured</button>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="shop-product-grid">
                  {filteredProducts.map((product) => (
                    <article className="product-card" key={product.id}>
                      <div className="product-image">
                        <span className="product-emoji">
                          {product.emoji}
                        </span>

                        <span className="product-tag">{product.tag}</span>

                        <button
                          className="wishlist-button"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            size={19}
                            fill={
                              wishlist.includes(product.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      <div className="product-info">
                        <p className="seller">{product.seller}</p>
                        <h3>{product.name}</h3>
                        <p className="price">
                          KES {product.price.toLocaleString()}
                        </p>

                        <button
                          className="add-button"
                          onClick={() => addToCart(product)}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-shop">
                  <span>🎀</span>
                  <h2>Nothing here yet</h2>
                  <p>
                    We're getting this LOOPA world ready for you.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      )}

      <footer className="footer">
        <div>
          <h2>LOOPA</h2>
          <p>Your Style. Your World.</p>
        </div>

        <p>© 2026 LOOPA. Made with love.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
