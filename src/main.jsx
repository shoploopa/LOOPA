import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const categories = [
  { icon: "👜", name: "Bags", description: "Cute handmade pieces" },
  { icon: "👗", name: "Clothing", description: "Made with love" },
  { icon: "🏠", name: "Home & Decor", description: "Cozy crochet details" },
  { icon: "🎀", name: "Accessories", description: "Little things, beautifully made" },
];

const products = [
  { icon: "👜", name: "Blush Crochet Bag", price: "KES 2,500" },
  { icon: "🧸", name: "Handmade Crochet Bear", price: "KES 1,800" },
  { icon: "🌸", name: "Floral Crochet Top", price: "KES 3,200" },
  { icon: "🧺", name: "Crochet Market Basket", price: "KES 2,200" },
];

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <nav className="nav">
          <a href="#" className="logo">
            L<span>OO</span>PA
          </a>

          <div className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
            <a href="#custom">Custom Orders</a>
            <a href="#sellers">Sell on LOOPA</a>
          </div>

          <div className="nav-actions">
            <button className="icon-button" aria-label="Search">
              🔍
            </button>

            <button className="icon-button" aria-label="Wishlist">
              ♡
            </button>

            <button className="icon-button" aria-label="Shopping cart">
              🛒
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">The handmade marketplace</span>

            <h1>
              Made by hands.
              <br />
              <span>Made for you.</span>
            </h1>

            <p>
              Discover beautiful crochet and handmade pieces from talented
              creators. Every piece has a story, and every stitch is made
              with love.
            </p>

            <button className="primary-button">
              Shop handmade
            </button>
          </div>

          <div className="hero-art">
            <div className="crochet-shape"></div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Explore</span>
              <h2>Shop by category</h2>
            </div>

            <p>Find something made just for you.</p>
          </div>

          <div className="categories">
            {categories.map((category) => (
              <div className="category-card" key={category.name}>
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section" id="shop">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Fresh finds</span>
              <h2>Trending on LOOPA</h2>
            </div>

            <p>Handpicked handmade favorites.</p>
          </div>

          <div className="products">
            {products.map((product) => (
              <div className="product-card" key={product.name}>
                <div className="product-image">{product.icon}</div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOM ORDERS */}
        <section className="custom-order" id="custom">
          <span className="eyebrow">Made your way</span>

          <h2>Can't find exactly what you want?</h2>

          <p>
            Tell a LOOPA creator what you're dreaming of. Upload inspiration,
            choose your colors and size, set your budget, and request a custom
            handmade piece.
          </p>

          <button className="custom-button">
            Request a custom piece
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © 2026 LOOPA · Handmade. Beautifully yours.
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
