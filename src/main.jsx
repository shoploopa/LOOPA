import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Sparkles,
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
    tag: "Little Love",
  },
  {
    id: 5,
    name: "Pearl Heels",
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
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Women");
  const [activeSubcategory, setActiveSubcategory] =
    useState("All Women");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const openShop = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(categories[category][0]);
    setPage("shop");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = product.category === activeCategory;

    const subcategoryMatch =
      activeSubcategory.startsWith("All ") ||
      product.subcategory === activeSubcategory;

    const searchMatch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.seller.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && subcategoryMatch && searchMatch;
  });

  const toggleWishlist = (id) => {
    setWishlist((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  };

  const addToBag = (product) => {
    setCart((old) => [...old, product]);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <button
            className="logo"
            onClick={() => setPage("home")}
          >
            LOOPA
          </button>

          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => openShop(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="header-actions">

            <div className="search-box">
              <Search size={17} />
              <input
                placeholder="Search LOOPA..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openShop("Women");
                  }
                }}
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

      {/* HOME */}
      {page === "home" && (
        <main>

          {/* HERO */}
          <section className="hero">
            <div className="hero-decoration hero-bow">🎀</div>
            <div className="hero-decoration hero-flower">🌸</div>

            <div className="hero-content">
              <p className="eyebrow">WELCOME TO LOOPA</p>

              <h1>
                Your Style.
                <br />
                <em>Your World.</em>
              </h1>

              <p className="hero-copy">
                A fashion marketplace for beautiful pieces,
                creative sellers and every version of you.
              </p>

              <button
                className="primary-button"
                onClick={() => openShop("Women")}
              >
                Shop Women
                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* SHOP YOUR LOOPA */}
          <section className="section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">DISCOVER YOUR WORLD</p>
                <h2>Shop your LOOPA</h2>
              </div>
            </div>

            <div className="category-grid">

              <button
                className="category-card women-card"
                onClick={() => openShop("Women")}
              >
                <span className="category-icon">🎀</span>
                <div>
                  <h3>Women</h3>
                  <p>Fashion for her</p>
                </div>
                <ChevronRight />
              </button>

              <button
                className="category-card little-card"
                onClick={() => openShop("Little Loves")}
              >
                <span className="category-icon">🧸</span>
                <div>
                  <h3>Little Loves</h3>
                  <p>Tiny fashion dreams</p>
                </div>
                <ChevronRight />
              </button>

              <button
                className="category-card shoes-card"
                onClick={() => openShop("Shoes")}
              >
                <span className="category-icon">👠</span>
                <div>
                  <h3>Shoes</h3>
                  <p>Step into pretty</p>
                </div>
                <ChevronRight />
              </button>

              <button
                className="category-card bags-card"
                onClick={() => openShop("Bags")}
              >
                <span className="category-icon">👜</span>
                <div>
                  <h3>Bags</h3>
                  <p>Carry your world</p>
                </div>
                <ChevronRight />
              </button>

              <button
                className="category-card accessories-card"
                onClick={() => openShop("Accessories")}
              >
                <span className="category-icon">💎</span>
                <div>
                  <h3>Accessories</h3>
                  <p>The finishing touch</p>
                </div>
                <ChevronRight />
              </button>

              <button
                className="category-card crochet-card"
                onClick={() => openShop("Crochet Corner")}
              >
                <span className="category-icon">🧶</span>
                <div>
                  <h3>Crochet Corner</h3>
                  <p>Where yarn becomes art</p>
                </div>
                <ChevronRight />
              </button>

            </div>
          </section>

          {/* LITTLE LOVES WORLD */}
          <section className="little-world">

            <div className="little-cloud cloud-one">☁️</div>
            <div className="little-cloud cloud-two">☁️</div>
            <div className="little-star star-one">⭐</div>
            <div className="little-star star-two">✨</div>

            <div className="little-content">

              <div className="little-badge">
                🧸 LITTLE LOVES
              </div>

              <h2>
                Tiny clothes.
                <br />
                <em>Big little moments.</em>
              </h2>

              <p>
                A dreamy little world filled with adorable
                pieces for babies, toddlers and little girls.
              </p>

              <div className="little-buttons">
                <button
                  className="little-primary"
                  onClick={() => openShop("Little Loves")}
                >
                  Explore Little Loves
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="little-pills">
                <span>🎀 Baby</span>
                <span>🧸 Toddler</span>
                <span>🌸 Little Girls</span>
                <span>🎂 Birthdays</span>
              </div>

            </div>

            <div className="little-visual">
              <div className="cloud-card">
                <div className="teddy">🧸</div>
                <div className="tiny-bows">🎀 🌸 🎀</div>
                <p>made for little loves</p>
              </div>
            </div>

          </section>

          {/* TRENDING */}
          <section className="section">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">THE LOOPA EDIT</p>
                <h2>Trending now</h2>
              </div>

              <button
                className="text-button"
                onClick={() => openShop("Women")}
              >
                Shop all <ArrowRight size={17} />
              </button>
            </div>

            <div className="home-products">

              {products.slice(0, 4).map((product) => (
                <article className="product-card" key={product.id}>

                  <div className="product-image">
                    <span className="product-tag">
                      {product.tag}
                    </span>

                    <button
                      className="wishlist-button"
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
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

                    <span className="product-emoji">
                      {product.emoji}
                    </span>
                  </div>

                  <div className="product-info">
                    <p className="seller">{product.seller}</p>
                    <h3>{product.name}</h3>
                    <p className="price">
                      KES {product.price.toLocaleString()}
                    </p>

                    <button
                      className="add-button"
                      onClick={() => addToBag(product)}
                    >
                      Add to Bag
                    </button>
                  </div>

                </article>
              ))}

            </div>
          </section>

          {/* CROCHET WORLD */}
          <section className="crochet-world">

            <div className="yarn-decoration yarn-one">🧶</div>
            <div className="yarn-decoration yarn-two">🧵</div>

            <div className="crochet-visual">
              <div className="yarn-circle">
                🧶
              </div>

              <div className="yarn-small">
                🧶
              </div>

              <div className="crochet-flower">
                🌼
              </div>
            </div>

            <div className="crochet-content">

              <p className="eyebrow">LOOPA ARTISAN</p>

              <h2>
                Crochet
                <br />
                <em>Corner</em>
              </h2>

              <p>
                Slow-made pieces, beautiful stitches and
                handmade creations made with love.
              </p>

              <div className="crochet-tags">
                <span>🧶 Crochet Bags</span>
                <span>🌼 Handmade</span>
                <span>🪡 Custom Pieces</span>
              </div>

              <button
                className="crochet-button"
                onClick={() => openShop("Crochet Corner")}
              >
                Enter Crochet Corner
                <ArrowRight size={17} />
              </button>

            </div>

          </section>

          {/* CUSTOM */}
          <section className="custom-section">
            <div>
              <p className="eyebrow">MADE JUST FOR YOU</p>

              <h2>
                Dream it.
                <br />
                <em>Make it LOOPA.</em>
              </h2>

              <p>
                Want something custom? Connect with a LOOPA
                creator and bring your dream piece to life.
              </p>

              <button className="primary-button">
                Start a Custom Request
                <Sparkles size={17} />
              </button>
            </div>
          </section>

        </main>
      )}

      {/* SHOP */}
      {page === "shop" && (
        <main className="shop-page">

          <button
            className="back-home"
            onClick={() => setPage("home")}
          >
            ← Back to LOOPA
          </button>

          <div className="shop-header">

            <p className="eyebrow">SHOP LOOPA</p>

            <h1>{activeCategory}</h1>

            <p>
              Discover pieces made to make you feel like you.
            </p>

          </div>

          <div className="shop-layout">

            <aside className="shop-sidebar">

              <h3>Shop by</h3>

              {categories[activeCategory].map(
                (subcategory) => (
                  <button
                    key={subcategory}
                    className={
                      activeSubcategory === subcategory
                        ? "subcategory active"
                        : "subcategory"
                    }
                    onClick={() =>
                      setActiveSubcategory(subcategory)
                    }
                  >
                    {subcategory}
                  </button>
                )
              )}

            </aside>

            <section className="product-area">

              <div className="product-toolbar">
                <span>
                  {filteredProducts.length} pieces
                </span>
                <span>Featured ↓</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="shop-product-grid">

                  {filteredProducts.map((product) => (
                    <article
                      className="product-card"
                      key={product.id}
                    >

                      <div className="product-image">

                        <span className="product-tag">
                          {product.tag}
                        </span>

                        <button
                          className="wishlist-button"
                          onClick={() =>
                            toggleWishlist(product.id)
                          }
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

                        <span className="product-emoji">
                          {product.emoji}
                        </span>

                      </div>

                      <div className="product-info">

                        <p className="seller">
                          {product.seller}
                        </p>

                        <h3>{product.name}</h3>

                        <p className="price">
                          KES {product.price.toLocaleString()}
                        </p>

                        <button
                          className="add-button"
                          onClick={() => addToBag(product)}
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
                  <h2>Coming to LOOPA</h2>
                  <p>
                    We're filling this little corner with
                    beautiful pieces.
                  </p>
                </div>
              )}

            </section>

          </div>

        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">

        <div>
          <h2>LOOPA</h2>
          <p>Your Style. Your World.</p>
        </div>

        <div className="footer-links">
          <button onClick={() => openShop("Women")}>
            Women
          </button>

          <button onClick={() => openShop("Little Loves")}>
            Little Loves
          </button>

          <button onClick={() => openShop("Crochet Corner")}>
            Crochet Corner
          </button>
        </div>

        <p>© 2026 LOOPA. Made with love.</p>

      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);
