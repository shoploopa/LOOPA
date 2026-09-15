import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const categories = [
  {
    icon: "👗",
    name: "Women",
    description: "Fashion for every version of her.",
    className: "women",
  },
  {
    icon: "🧸",
    name: "Little Loves",
    description: "Dreamy little looks for little loves.",
    className: "little",
  },
  {
    icon: "👠",
    name: "Shoes",
    description: "The perfect finishing touch.",
    className: "shoes",
  },
  {
    icon: "👜",
    name: "Bags",
    description: "Carry your style everywhere.",
    className: "bags",
  },
  {
    icon: "💎",
    name: "Accessories",
    description: "The little details that make the look.",
    className: "accessories",
  },
  {
    icon: "🧶",
    name: "Artisan",
    description: "Where fashion becomes art.",
    className: "artisan",
  },
];

const products = [
  {
    emoji: "🌸",
    name: "Rosé Mini Dress",
    price: "KES 4,800",
    category: "Women's Fashion",
    className: "rose",
  },
  {
    emoji: "👜",
    name: "Blush Bow Bag",
    price: "KES 3,200",
    category: "Bags",
    className: "blush",
  },
  {
    emoji: "🧶",
    name: "Petal Crochet Bag",
    price: "KES 3,800",
    category: "Artisan",
    className: "crochet",
  },
  {
    emoji: "🎀",
    name: "Little Princess Set",
    price: "KES 2,900",
    category: "Little Loves",
    className: "little-product",
  },
];

const looks = [
  {
    number: "01",
    title: "Soft Girl",
    description: "Pretty, effortless & romantic.",
    emoji: "🎀",
  },
  {
    number: "02",
    title: "The It Girl",
    description: "Bold pieces. Main character energy.",
    emoji: "💋",
  },
  {
    number: "03",
    title: "Little Princess",
    description: "Sweet little moments made beautiful.",
    emoji: "🧸",
  },
];

function App() {
  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">
        <nav className="nav">

          <a href="#" className="logo">
            <span className="logo-bow">🎀</span>
            L<span className="logo-loop">OO</span>PA
          </a>

          <div className="nav-links">
            <a href="#women">Women</a>
            <a href="#little-loves">Little Loves</a>
            <a href="#shop">Shop</a>
            <a href="#artisan">Artisan</a>
            <a href="#custom">Custom</a>
          </div>

          <div className="nav-actions">
            <button aria-label="Search">⌕</button>
            <button aria-label="Wishlist">♡</button>
            <button aria-label="Shopping bag">🛍</button>
          </div>

        </nav>
      </header>


      <main>

        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="hero-content">

            <div className="tiny-hearts">♡ ✦ ♡ ✦ ♡</div>

            <span className="eyebrow">
              ✿ WELCOME TO LOOPA ✿
            </span>

            <h1>
              Your style.
              <br />
              <span>Your world.</span>
            </h1>

            <p>
              Discover fashion, beautiful little things and extraordinary
              handmade art from creators you'll love.
            </p>

            <div className="hero-buttons">
              <button className="primary-button">
                Explore LOOPA <span>♡</span>
              </button>

              <button className="secondary-button">
                Shop the latest
              </button>
            </div>

            <div className="hero-note">
              ✦ Fashion · Little Loves · Artisan · Custom
            </div>

          </div>


          <div className="hero-art">

            <div className="hero-frame">
              <div className="hero-frame-inner">

                <div className="hero-fashion-shape">
                  👗
                </div>

                <span className="hero-art-label">
                  YOUR STYLE
                </span>

              </div>
            </div>

            <div className="hero-bow">🎀</div>

            <div className="hero-floating hero-float-one">
              ✦
            </div>

            <div className="hero-floating hero-float-two">
              ♡
            </div>

            <div className="hero-floating hero-float-three">
              ✿
            </div>

            <div className="hero-mini-card hero-mini-one">
              <span>♡</span>
              <div>
                <strong>Made for her</strong>
                <small>Beautiful things</small>
              </div>
            </div>

            <div className="hero-mini-card hero-mini-two">
              <span>🧶</span>
              <div>
                <strong>Made by hand</strong>
                <small>Made like art</small>
              </div>
            </div>

          </div>

        </section>


        {/* ================= CATEGORY STRIP ================= */}

        <section className="category-section" id="shop">

          <div className="section-heading">

            <div>
              <span className="eyebrow">♡ EXPLORE LOOPA ♡</span>
              <h2>Find your world.</h2>
            </div>

            <p>
              Fashion, little loves and beautiful things — all in one place.
            </p>

          </div>

          <div className="categories">

            {categories.map((category) => (
              <a
                href={`#${category.className}`}
                className={`category-card ${category.className}`}
                key={category.name}
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>

                <span className="card-arrow">↗</span>

              </a>
            ))}

          </div>

        </section>


        {/* ================= WOMEN ================= */}

        <section className="fashion-feature" id="women">

          <div className="fashion-feature-copy">

            <span className="eyebrow">♡ LOOPA WOMAN ♡</span>

            <h2>
              Dress like
              <br />
              <span>yourself.</span>
            </h2>

            <p>
              From everyday pretty to unforgettable nights, discover pieces
              that make you feel like the best version of you.
            </p>

            <button className="outline-button">
              Shop women's fashion →
            </button>

          </div>

          <div className="fashion-feature-art woman-art">

            <div className="fashion-art-circle"></div>

            <div className="fashion-art-piece">
              👗
            </div>

            <div className="fashion-art-tag">
              NEW SEASON
            </div>

            <span className="fashion-art-heart">♡</span>

          </div>

        </section>


        {/* ================= LITTLE LOVES ================= */}

        <section className="little-loves-section" id="little-loves">

          <div className="little-cloud cloud-one">☁</div>
          <div className="little-cloud cloud-two">☁</div>

          <div className="little-header">

            <span className="eyebrow">
              🧸 A LITTLE WORLD OF ITS OWN 🧸
            </span>

            <h2>
              LOOPA <span>Little Loves</span>
            </h2>

            <p>
              Tiny outfits. Big personalities. Beautiful little moments.
            </p>

          </div>

          <div className="little-content">

            <div className="little-visual">

              <div className="little-sun">✦</div>

              <div className="little-bear">
                🧸
              </div>

              <div className="little-bow">
                🎀
              </div>

              <div className="little-star star-one">✦</div>
              <div className="little-star star-two">♡</div>

            </div>

            <div className="little-copy">

              <span className="little-label">
                FOR OUR LITTLE LOVES
              </span>

              <h3>
                Sweet little
                <br />
                <span>things.</span>
              </h3>

              <p>
                Discover dreamy outfits, tiny shoes, adorable accessories,
                birthday looks and handmade treasures for the little ones.
              </p>

              <div className="little-links">
                <span>Newborn</span>
                <span>Baby</span>
                <span>Toddler</span>
                <span>Girls</span>
                <span>Mommy & Me</span>
              </div>

              <button className="little-button">
                Enter Little Loves ♡
              </button>

            </div>

          </div>

        </section>


        {/* ================= TRENDING ================= */}

        <section className="section products-section">

          <div className="section-heading">

            <div>
              <span className="eyebrow">♡ JUST LANDED ♡</span>
              <h2>Trending on LOOPA</h2>
            </div>

            <button className="view-all">
              View all →
            </button>

          </div>


          <div className="products">

            {products.map((product) => (
              <article
                className="product-card"
                key={product.name}
              >

                <div className={`product-image ${product.className}`}>

                  <button
                    className="product-heart"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    ♡
                  </button>

                  <div className="product-emoji">
                    {product.emoji}
                  </div>

                  {product.className === "crochet" && (
                    <span className="art-badge">
                      ARTISAN
                    </span>
                  )}

                </div>

                <div className="product-info">

                  <div>
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.price}</p>
                  </div>

                  <button
                    className="add-button"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    +
                  </button>

                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ================= SHOP THE LOOK ================= */}

        <section className="section looks-section">

          <div className="section-heading">

            <div>
              <span className="eyebrow">♡ STYLE IT ♡</span>
              <h2>Shop the look.</h2>
            </div>

            <p>
              Because the best outfits aren't meant to be worn alone.
            </p>

          </div>

          <div className="looks">

            {looks.map((look) => (
              <article className="look-card" key={look.number}>

                <div className="look-number">
                  {look.number}
                </div>

                <div className="look-emoji">
                  {look.emoji}
                </div>

                <div className="look-copy">
                  <h3>{look.title}</h3>
                  <p>{look.description}</p>
                  <button>Shop look →</button>
                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ================= ARTISAN ================= */}

        <section className="artisan-section" id="artisan">

          <div className="artisan-texture texture-one"></div>
          <div className="artisan-texture texture-two"></div>

          <div className="artisan-copy">

            <span className="eyebrow">
              ✦ LOOPA ARTISAN ✦
            </span>

            <h2>
              Where fashion
              <br />
              becomes <span>art.</span>
            </h2>

            <p>
              Discover crochet, embroidery, beadwork, textile art and
              extraordinary handmade pieces created by people who turn
              imagination into something you can wear, carry and keep.
            </p>

            <button className="artisan-button">
              Explore Artisan →
            </button>

          </div>

          <div className="artisan-art">

            <div className="artisan-orbit orbit-one"></div>
            <div className="artisan-orbit orbit-two"></div>

            <div className="crochet-art">
              🧶
            </div>

            <div className="artisan-stamp">
              MADE<br />
              BY HAND
            </div>

            <div className="artisan-detail">
              <span>TEXTURE</span>
              <strong>CRAFT</strong>
              <span>STORY</span>
            </div>

          </div>

        </section>


        {/* ================= CUSTOM ================= */}

        <section className="custom-order" id="custom">

          <div className="custom-decoration">🎀</div>

          <span className="eyebrow">
            ♡ MADE YOUR WAY ♡
          </span>

          <h2>
            Dream it.
            <br />
            <span>We'll make it.</span>
          </h2>

          <p>
            Have something specific in mind? Upload your inspiration,
            choose your colors and size, set your budget, and connect with
            a LOOPA creator to bring your idea to life.
          </p>

          <button className="custom-button">
            Request a custom piece ♡
          </button>

        </section>


        {/* ================= CREATOR ================= */}

        <section className="creator-section" id="sellers">

          <div className="creator-copy">

            <span className="eyebrow">
              ♡ FOR THE CREATORS ♡
            </span>

            <h2>
              Your hands.
              <br />
              <span>Your art.</span>
            </h2>

            <p>
              Turn your creativity into a business. Open your LOOPA shop,
              showcase your work and reach people who appreciate beautiful,
              thoughtfully made pieces.
            </p>

            <button className="primary-button">
              Sell on LOOPA →
            </button>

          </div>

          <div className="creator-art">

            <div className="creator-orbit"></div>

            <div className="creator-yarn">
              🧶
            </div>

            <span>
              Made by hand ♡
            </span>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-logo">
          🎀 LOOPA
        </div>

        <p>
          Your Style. Your World. ♡
        </p>

        <div className="footer-links">
          <a href="#women">Women</a>
          <a href="#little-loves">Little Loves</a>
          <a href="#artisan">Artisan</a>
          <a href="#custom">Custom</a>
          <a href="#sellers">Sell on LOOPA</a>
        </div>

        <div className="footer-bottom">
          © 2026 LOOPA · Your Style. Your World. ♡
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
