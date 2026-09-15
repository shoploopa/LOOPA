import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Star,
} from "lucide-react";
import "./style.css";

const categories = [
  {
    name: "Women",
    label: "Fashion for her",
    className: "category-women",
    emoji: "🎀",
  },
  {
    name: "Little Loves",
    label: "Tiny fashion dreams",
    className: "category-kids",
    emoji: "🧸",
  },
  {
    name: "Shoes",
    label: "Step into pretty",
    className: "category-shoes",
    emoji: "👠",
  },
  {
    name: "Bags",
    label: "Carry your world",
    className: "category-bags",
    emoji: "👜",
  },
  {
    name: "Accessories",
    label: "The finishing touch",
    className: "category-accessories",
    emoji: "💎",
  },
  {
    name: "Crochet Corner",
    label: "Where yarn becomes art",
    className: "category-crochet",
    emoji: "🧶",
  },
];

const products = [
  {
    name: "Rosé Mini Dress",
    price: "KES 3,800",
    category: "Women",
    emoji: "👗",
    tag: "New",
  },
  {
    name: "Blush Bow Bag",
    price: "KES 2,600",
    category: "Bags",
    emoji: "👜",
    tag: "Trending",
  },
  {
    name: "Petal Crochet Bag",
    price: "KES 3,200",
    category: "Crochet",
    emoji: "🧶",
    tag: "Handmade",
  },
  {
    name: "Little Princess Set",
    price: "KES 2,900",
    category: "Little Loves",
    emoji: "🎀",
    tag: "Little Loves",
  },
];

const looks = [
  {
    title: "Soft Girl",
    description: "Pretty, effortless and feminine.",
    emoji: "🌸",
    className: "look-soft",
  },
  {
    title: "The It Girl",
    description: "Main character energy.",
    emoji: "💋",
    className: "look-it",
  },
  {
    title: "Little Princess",
    description: "The sweetest little looks.",
    emoji: "👑",
    className: "look-princess",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#" className="logo">
            <span className="logo-bow">🎀</span>
            LOOPA
          </a>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <a href="#women">Women</a>
            <a href="#little-loves">Little Loves</a>
            <a href="#shop">Shop</a>
            <a href="#crochet">Crochet Corner</a>
            <a href="#custom">Custom</a>
          </nav>

          <div className="header-actions">
            <button aria-label="Search">
              <Search size={20} />
            </button>
            <button aria-label="Wishlist">
              <Heart size={20} />
            </button>
            <button aria-label="Account">
              <User size={20} />
            </button>
            <button aria-label="Shopping bag" className="bag-button">
              <ShoppingBag size={20} />
              <span>0</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-decoration hero-heart">♡</div>
        <div className="hero-decoration hero-star">✦</div>
        <div className="hero-decoration hero-flower">✿</div>

        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={15} /> WELCOME TO LOOPA
          </p>

          <h1>
            Your Style.
            <br />
            <em>Your World.</em>
          </h1>

          <p className="hero-text">
            A dreamy marketplace for fashion, beautiful finds,
            handmade treasures and little loves.
          </p>

          <div className="hero-buttons">
            <a href="#shop" className="button button-dark">
              Explore LOOPA <ArrowRight size={17} />
            </a>
            <a href="#little-loves" className="button button-light">
              Shop Little Loves
            </a>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>

          <div className="fashion-card card-main">
            <div className="fashion-placeholder">👗</div>
            <span>NEW SEASON</span>
          </div>

          <div className="floating-card floating-bow">
            🎀
          </div>

          <div className="floating-card floating-heart">
            ♡
          </div>
        </div>
      </section>

      {/* SHOP YOUR LOOPA */}
      <section className="section category-section" id="shop">
        <div className="section-heading centered">
          <p className="eyebrow">FIND YOUR WORLD</p>
          <h2>Shop your LOOPA</h2>
          <p>
            From everyday pretty to one-of-a-kind pieces,
            there’s a little world waiting for you.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a
              href="#"
              className={`category-card ${category.className}`}
              key={category.name}
            >
              <span className="category-emoji">{category.emoji}</span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.label}</p>
              </div>
              <ChevronRight className="category-arrow" size={20} />
            </a>
          ))}
        </div>
      </section>

      {/* WOMEN */}
      <section className="women-world section" id="women">
        <div className="world-image women-image">
          <span>🎀</span>
          <div className="image-caption">THE WOMEN'S EDIT</div>
        </div>

        <div className="world-copy">
          <p className="eyebrow">FOR THE GIRL WHO LOVES FASHION</p>
          <h2>Pretty looks.<br />Big energy.</h2>
          <p>
            Discover dresses, tops, skirts, sets, shoes, bags
            and accessories from independent sellers and
            fashion creators.
          </p>

          <div className="mini-links">
            <a href="#">New Arrivals <ArrowRight size={16} /></a>
            <a href="#">Going Out <ArrowRight size={16} /></a>
            <a href="#">Soft Girl <ArrowRight size={16} /></a>
            <a href="#">Baddie <ArrowRight size={16} /></a>
          </div>

          <a href="#" className="text-link">
            Shop Women's Fashion <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* LITTLE LOVES */}
      <section className="little-loves" id="little-loves">
        <div className="cloud cloud-one">☁</div>
        <div className="cloud cloud-two">☁</div>
        <div className="kids-stars">✦　♡　✦</div>

        <div className="kids-intro">
          <p className="eyebrow">🎀 A TINY WORLD OF BEAUTIFUL THINGS</p>
          <h2>
            LOOPA
            <br />
            <span>Little Loves</span>
          </h2>
          <p>
            The sweetest little corner of LOOPA,
            made for tiny personalities and big little dreams.
          </p>
        </div>

        <div className="kids-boutique">
          <div className="kids-card teddy-card">
            <span className="big-kids-icon">🧸</span>
            <h3>Baby & Toddler</h3>
            <p>0–4 years</p>
            <a href="#">Shop now <ArrowRight size={15} /></a>
          </div>

          <div className="kids-card princess-card">
            <span className="big-kids-icon">👑</span>
            <h3>Little Girls</h3>
            <p>5–12 years</p>
            <a href="#">Shop now <ArrowRight size={15} /></a>
          </div>

          <div className="kids-card bow-card">
            <span className="big-kids-icon">🎀</span>
            <h3>Little Celebrations</h3>
            <p>Birthdays & special days</p>
            <a href="#">Shop now <ArrowRight size={15} /></a>
          </div>

          <div className="kids-card mommy-card">
            <span className="big-kids-icon">💗</span>
            <h3>Mommy & Me</h3>
            <p>Matching moments</p>
            <a href="#">Shop now <ArrowRight size={15} /></a>
          </div>
        </div>

        <div className="kids-bottom">
          <span>☁ Dreamy</span>
          <span>♡ Sweet</span>
          <span>✦ Playful</span>
          <span>🎀 Pretty</span>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="section products-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOP WHAT'S NEW</p>
            <h2>Trending on LOOPA</h2>
          </div>

          <a href="#" className="text-link">
            View all <ArrowRight size={17} />
          </a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <span className="product-tag">{product.tag}</span>
                <button className="product-heart">
                  <Heart size={18} />
                </button>
                <div className="product-placeholder">{product.emoji}</div>
              </div>

              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SHOP THE LOOK */}
      <section className="section looks-section">
        <div className="section-heading centered">
          <p className="eyebrow">GET THE VIBE</p>
          <h2>Shop the Look</h2>
          <p>
            One outfit. One mood. Everything you need.
          </p>
        </div>

        <div className="looks-grid">
          {looks.map((look) => (
            <a href="#" className={`look-card ${look.className}`} key={look.title}>
              <div className="look-icon">{look.emoji}</div>
              <div className="look-content">
                <p>LOOPA LOOK</p>
                <h3>{look.title}</h3>
                <span>{look.description}</span>
                <strong>Shop the look <ArrowRight size={16} /></strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CROCHET CORNER */}
      <section className="crochet-world" id="crochet">
        <div className="yarn-decoration yarn-left">🧶</div>
        <div className="yarn-decoration yarn-right">🧶</div>

        <div className="crochet-content">
          <p className="eyebrow">🧶 LOOPA ARTISAN</p>

          <h2>
            Welcome to the
            <br />
            <span>Crochet Corner.</span>
          </h2>

          <p>
            Where yarn becomes art. Discover beautifully handmade
            crochet fashion, bags, accessories and tiny treasures
            created stitch by stitch.
          </p>

          <div className="crochet-features">
            <span>✦ Handmade</span>
            <span>✦ One of a kind</span>
            <span>✦ Made with love</span>
          </div>

          <a href="#" className="button button-cream">
            Explore Crochet Corner <ArrowRight size={17} />
          </a>
        </div>

        <div className="crochet-art">
          <div className="yarn-ball">🧶</div>
          <div className="crochet-flower">🌸</div>
          <div className="crochet-bag">👜</div>
          <div className="stitch-card">
            <span>HANDMADE</span>
            <strong>STITCH</strong>
            <small>♡ by LOOPA artisans</small>
          </div>
        </div>
      </section>

      {/* CUSTOM */}
      <section className="custom-section" id="custom">
        <div className="custom-content">
          <p className="eyebrow">MAKE IT YOURS</p>
          <h2>Dream it.<br />Create it.</h2>
          <p>
            Have something special in mind? Connect with a LOOPA
            creator and bring your dream piece to life.
          </p>

          <a href="#" className="button button-dark">
            Start a Custom Request <ArrowRight size={17} />
          </a>
        </div>

        <div className="custom-art">
          <span>✂</span>
          <span>🎀</span>
          <span>🧵</span>
          <span>♡</span>
        </div>
      </section>

      {/* CREATOR */}
      <section className="section creator-section">
        <div className="creator-copy">
          <p className="eyebrow">FOR THE CREATIVE GIRLS</p>
          <h2>Turn your talent<br />into a brand.</h2>
          <p>
            Sell your fashion, handmade pieces and creative
            work on LOOPA. Build your shop, connect with customers
            and grow your brand.
          </p>

          <a href="#" className="text-link">
            Sell on LOOPA <ArrowRight size={17} />
          </a>
        </div>

        <div className="creator-card">
          <div className="creator-avatar">✨</div>
          <div>
            <p>LOOPA CREATOR</p>
            <h3>Your creativity belongs here.</h3>
            <div className="rating">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div>
          <p className="eyebrow">STAY IN THE LOOP</p>
          <h2>Pretty things are coming.</h2>
          <p>Get new drops, dreamy finds and LOOPA news.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button type="submit">
            Join LOOPA <ArrowRight size={17} />
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="logo-bow">🎀</span>
              LOOPA
            </a>
            <p>Your Style. Your World.</p>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <a href="#">Women</a>
            <a href="#">Little Loves</a>
            <a href="#">Shoes</a>
            <a href="#">Bags</a>
            <a href="#">Accessories</a>
          </div>

          <div className="footer-column">
            <h4>Discover</h4>
            <a href="#">Crochet Corner</a>
            <a href="#">Shop the Look</a>
            <a href="#">Custom</a>
            <a href="#">Creators</a>
          </div>

          <div className="footer-column">
            <h4>LOOPA</h4>
            <a href="#">About us</a>
            <a href="#">Sell on LOOPA</a>
            <a href="#">Help</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LOOPA. All rights reserved.</span>
          <span>Made for girls who love beautiful things ♡</span>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
