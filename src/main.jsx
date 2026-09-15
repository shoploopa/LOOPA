import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const categories = [
  { icon: "🎀", name: "Bags", description: "Cute handmade pieces" },
  { icon: "🌸", name: "Clothing", description: "Made with love" },
  { icon: "🧶", name: "Home & Decor", description: "Cozy crochet details" },
  { icon: "♡", name: "Accessories", description: "Little things, beautifully made" },
];

const products = [
  { icon: "👜", name: "Blush Crochet Bag", price: "KES 2,500" },
  { icon: "🧸", name: "Handmade Crochet Bear", price: "KES 1,800" },
  { icon: "🌷", name: "Floral Crochet Top", price: "KES 3,200" },
  { icon: "🧺", name: "Crochet Market Basket", price: "KES 2,200" },
];

function App() {
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <nav className="nav">

          <a href="#" className="logo">
            <span className="logo-bow">🎀</span>
            L<span className="logo-loop">OO</span>PA
          </a>

          <div className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
            <a href="#custom">Custom Orders</a>
            <a href="#sellers">Sell on LOOPA</a>
          </div>

          <div className="nav-actions">
            <button aria-label="Search">⌕</button>
            <button aria-label="Wishlist">♡</button>
            <button aria-label="Shopping cart">🛍</button>
          </div>

        </nav>
      </header>


      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="tiny-hearts">♡ ♡ ♡</div>

            <span className="eyebrow">
              ✿ THE HANDMADE MARKETPLACE ✿
            </span>

            <h1>
              Handmade.
              <br />
              <span>Made with love.</span>
            </h1>

            <p>
              Discover beautiful crochet and handmade pieces from talented
              creators. Every stitch tells a story, and every piece is made
              just for you.
            </p>

            <div className="hero-buttons">
              <button className="primary-button">
                Shop handmade <span>♡</span>
              </button>

              <button className="secondary-button">
                Explore creators
              </button>
            </div>

            <div className="hero-note">
              🧶 Handmade by creators who care
            </div>

          </div>


          <div className="hero-art">

            <div className="hero-circle"></div>

            <div className="hero-card card-one">
              👜
              <span>cute bags</span>
            </div>

            <div className="hero-card card-two">
              🌸
              <span>made with love</span>
            </div>

            <div className="hero-card card-three">
              🧶
              <span>handmade</span>
            </div>

            <div className="big-bow">🎀</div>

            <div className="floating-heart heart-one">♡</div>
            <div className="floating-heart heart-two">♥</div>
            <div className="floating-heart heart-three">♡</div>

          </div>

        </section>


        {/* CATEGORY SECTION */}
        <section className="section" id="categories">

          <div className="section-heading">

            <div>
              <span className="eyebrow">♡ EXPLORE ♡</span>
              <h2>Shop by category</h2>
            </div>

            <p>
              Little handmade things that make life prettier.
            </p>

          </div>


          <div className="categories">

            {categories.map((category) => (
              <div className="category-card" key={category.name}>

                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <span className="card-arrow">→</span>

              </div>
            ))}

          </div>

        </section>


        {/* PRODUCTS */}
        <section className="section products-section" id="shop">

          <div className="section-heading">

            <div>
              <span className="eyebrow">♡ FRESH FINDS ♡</span>
              <h2>Trending on LOOPA</h2>
            </div>

            <button className="view-all">
              View all →
            </button>

          </div>


          <div className="products">

            {products.map((product) => (
              <div className="product-card" key={product.name}>

                <div className="product-image">

                  <span className="product-heart">♡</span>

                  <div className="product-emoji">
                    {product.icon}
                  </div>

                </div>

                <div className="product-info">

                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>

                  <button className="add-button">
                    +
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>


        {/* CUSTOM ORDER */}
        <section className="custom-order" id="custom">

          <div className="custom-decoration">🎀</div>

          <span className="eyebrow">♡ MADE YOUR WAY ♡</span>

          <h2>
            Dream it.
            <br />
            <span>We'll make it.</span>
          </h2>

          <p>
            Can't find exactly what you're looking for? Tell a LOOPA creator
            what you're dreaming of. Upload your inspiration, choose your
            colors and size, set your budget, and request a custom piece.
          </p>

          <button className="custom-button">
            Request a custom piece ♡
          </button>

        </section>


        {/* CREATOR SECTION */}
        <section className="creator-section" id="sellers">

          <div className="creator-copy">

            <span className="eyebrow">♡ FOR THE CREATORS ♡</span>

            <h2>
              Your hands.
              <br />
              <span>Your art.</span>
            </h2>

            <p>
              Turn your creativity into a business. Open your LOOPA shop and
              share your handmade pieces with people who love things made by
              hand.
            </p>

            <button className="primary-button">
              Sell on LOOPA →
            </button>

          </div>

          <div className="creator-art">
            <div>🧶</div>
            <span>Made by hand ♡</span>
          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-logo">
          🎀 LOOPA
        </div>

        <p>
          Handmade. Beautifully yours. ♡
        </p>

        <div className="footer-links">
          <span>Shop</span>
          <span>Creators</span>
          <span>Custom Orders</span>
          <span>About</span>
        </div>

        <div className="footer-bottom">
          © 2026 LOOPA · Made with love ♡
        </div>

      </footer>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
