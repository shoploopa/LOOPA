import React, { useState, useEffect } from "react";
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
  Eye,
  EyeOff,
  LogOut,
  UserCircle,
} from "lucide-react";
import "./style.css";
import { supabase } from "./supabase";

/* =========================================================
   LOOPA SHOP STRUCTURE
========================================================= */

const categoryStructure = {
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

/* =========================================================
   LOOPA WORLD INFORMATION
========================================================= */

const worldInfo = {
  Women: {
    eyebrow: "LOOPA WOMEN • THE EDIT",
    title: "Your wardrobe, your world.",
    description:
      "Pieces for every version of you — from everyday pretty to dressed all the way up.",
    emptyIcon: "W",
    emptyTitle:
      "Your wardrobe is about to get prettier.",
    emptyText:
      "Beautiful pieces from LOOPA creators are coming soon.",
    visuals: ["W", "01", "02", "03"],
  },

  "Little Loves": {
    eyebrow: "LITTLE LOVES • TINY TREASURES",
    title: "A little world of lovely things.",
    description:
      "Dreamy pieces for babies, toddlers and little girls — made for tiny moments and big memories.",
    emptyIcon: "🧸",
    emptyTitle: "Tiny treasures are coming.",
    emptyText:
      "Our little boutique is getting ready for its first beautiful drop.",
    visuals: [
      "🧸",
      "🌈",
      "🎀",
      "🪆",
      "🧸",
      "☁️",
      "🧸",
    ],
  },

  Shoes: {
    eyebrow: "LOOPA SHOES • THE SHOE EDIT",
    title: "Give your outfit a little lift.",
    description:
      "Heels, sneakers, sandals and more for every mood, moment and main-character entrance.",
    emptyIcon: "S",
    emptyTitle:
      "Your next favorite pair is coming.",
    emptyText:
      "We're getting the LOOPA shoe closet ready.",
    visuals: ["S", "01", "02", "03"],
  },

  Bags: {
    eyebrow: "LOOPA BAGS • THE BAG EDIT",
    title: "Carry something beautiful.",
    description:
      "Mini bags, everyday favorites and statement pieces made to complete your look.",
    emptyIcon: "B",
    emptyTitle:
      "Something pretty is on the way.",
    emptyText:
      "Your next everyday obsession is coming soon.",
    visuals: ["B", "01", "02", "03"],
  },

  Accessories: {
    eyebrow: "LOOPA ACCESSORIES • THE FINISHING TOUCH",
    title: "Little details. Big energy.",
    description:
      "Jewelry, hair pieces, sunglasses and finishing touches that make the whole look.",
    emptyIcon: "A",
    emptyTitle:
      "The finishing touches are coming.",
    emptyText:
      "Beautiful details for your LOOPA look are coming soon.",
    visuals: ["A", "01", "02", "03"],
  },

  "Crochet Corner": {
    eyebrow: "LOOPA ARTISAN • CROCHET CORNER",
    title: "Made stitch by stitch.",
    description:
      "Yarn, stitches, beads and handmade pieces created with patience, personality and love.",
    emptyIcon: "🧶",
    emptyTitle: "The yarn is warming up.",
    emptyText:
      "Handmade pieces are coming soon.",
    visuals: [
      "🧶",
      "🪡",
      "🧵",
      "📿",
      "✂️",
      "🧶",
    ],
  },
};

/* =========================================================
   APP
========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [dbCategories, setDbCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [page, setPage] = useState("home");

  const [activeCategory, setActiveCategory] =
    useState("Women");

  const [activeSubcategory, setActiveSubcategory] =
    useState("All Women");

  const [search, setSearch] = useState("");

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  /* =========================================================
     AUTH
  ========================================================= */

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] =
    useState(true);

  const [authMode, setAuthMode] =
    useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [authMessage, setAuthMessage] =
    useState("");

  const [authError, setAuthError] =
    useState("");

  const [authSubmitting, setAuthSubmitting] =
    useState(false);

  /* =========================================================
     CHECK CURRENT USER
  ========================================================= */

  useEffect(() => {
    const getCurrentUser = async () => {
      setAuthLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        await loadProfile(user.id);
      }

      setAuthLoading(false);
    };

    getCurrentUser();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const currentUser =
            session?.user || null;

          setUser(currentUser);

          if (currentUser) {
            await loadProfile(
              currentUser.id
            );
          } else {
            setProfile(null);
          }
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  const loadProfile = async (userId) => {
    const { data, error } =
      await supabase
        .from("profiles")
        .select(
          "id, full_name, email, phone, avatar_url, role"
        )
        .eq("id", userId)
        .maybeSingle();

    if (error) {
      console.error(
        "LOOPA profile loading error:",
        error
      );
      return;
    }

    setProfile(data);
  };

  /* =========================================================
     LOAD STORE
  ========================================================= */

  useEffect(() => {
    const loadStore = async () => {
      setLoadingCategories(true);
      setLoadingProducts(true);

      const {
        data: categoryData,
        error: categoryError,
      } =
        await supabase
          .from("categories")
          .select(
            "id, name, description, image_url"
          )
          .order("name");

      if (categoryError) {
        console.error(
          "LOOPA category loading error:",
          categoryError
        );
      } else {
        setDbCategories(
          categoryData || []
        );
      }

      const {
        data: productData,
        error: productError,
      } =
        await supabase
          .from("products")
          .select(
            "id,name,description,price,stock,status,seller_id,category_id,made_to_order,production_days,created_at"
          )
          .eq("status", "approved")
          .order("created_at", {
            ascending: false,
          });

      if (productError) {
        console.error(
          "LOOPA product loading error:",
          productError
        );
      } else {
        setDbProducts(
          productData || []
        );
      }

      setLoadingCategories(false);
      setLoadingProducts(false);
    };

    loadStore();
  }, []);

  /* =========================================================
     CATEGORY ID
  ========================================================= */

  const getCategoryId = (
    categoryName
  ) => {
    const category =
      dbCategories.find(
        (item) =>
          item.name.toLowerCase() ===
          categoryName.toLowerCase()
      );

    return category?.id || null;
  };

  /* =========================================================
     OPEN SHOP
  ========================================================= */

  const openShop = (category) => {
    setActiveCategory(category);

    const subcategories =
      categoryStructure[category] ||
      [`All ${category}`];

    setActiveSubcategory(
      subcategories[0]
    );

    setPage("shop");
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     OPEN AUTH
  ========================================================= */

  const openAuth = (
    mode = "login"
  ) => {
    setAuthMode(mode);
    setAuthMessage("");
    setAuthError("");

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");

    setPage("auth");
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const activeCategoryId =
    getCategoryId(
      activeCategory
    );

  const filteredProducts =
    dbProducts.filter(
      (product) => {
        const categoryMatch =
          product.category_id ===
          activeCategoryId;

        const searchText =
          search.toLowerCase().trim();

        const searchMatch =
          !searchText ||
          product.name
            ?.toLowerCase()
            .includes(searchText) ||
          product.description
            ?.toLowerCase()
            .includes(searchText);

        return (
          categoryMatch &&
          searchMatch
        );
      }
    );

  const homeProducts =
    dbProducts.slice(0, 4);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (
    id
  ) => {
    if (!user) {
      openAuth("login");
      return;
    }

    setWishlist((old) =>
      old.includes(id)
        ? old.filter(
            (item) => item !== id
          )
        : [...old, id]
    );
  };

  /* =========================================================
     CART
  ========================================================= */

  const addToBag = (
    product
  ) => {
    if (!user) {
      openAuth("login");
      return;
    }

    setCart((old) => [
      ...old,
      product,
    ]);
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    setAuthError("");
    setAuthMessage("");
    setAuthSubmitting(true);

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        }
      );

    if (error) {
      setAuthError(
        error.message ||
          "We couldn't log you in. Please check your details."
      );

      setAuthSubmitting(false);
      return;
    }

    setUser(data.user);

    await loadProfile(
      data.user.id
    );

    setAuthMessage(
      "Welcome back to LOOPA 💕"
    );

    setAuthSubmitting(false);

    setTimeout(
      () => setPage("home"),
      700
    );
  };

  /* =========================================================
     SIGN UP
  ========================================================= */

  const handleSignup = async (
    e
  ) => {
    e.preventDefault();

    setAuthError("");
    setAuthMessage("");

    if (!fullName.trim()) {
      setAuthError(
        "Please enter your full name."
      );
      return;
    }

    if (!email.trim()) {
      setAuthError(
        "Please enter your email address."
      );
      return;
    }

    if (password.length < 6) {
      setAuthError(
        "Your password must be at least 6 characters."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setAuthError(
        "Your passwords do not match."
      );
      return;
    }

    setAuthSubmitting(true);

    const {
      data,
      error,
    } =
      await supabase.auth.signUp(
        {
          email: email.trim(),
          password,
          options: {
            data: {
              full_name:
                fullName.trim(),
            },
          },
        }
      );

    if (error) {
      setAuthError(
        error.message ||
          "We couldn't create your account."
      );

      setAuthSubmitting(false);
      return;
    }

    if (
      data.user &&
      data.session
    ) {
      await supabase
        .from("profiles")
        .update({
          full_name:
            fullName.trim(),
        })
        .eq(
          "id",
          data.user.id
        );

      setUser(data.user);

      await loadProfile(
        data.user.id
      );

      setAuthMessage(
        "Your LOOPA account is ready 💕"
      );

      setTimeout(
        () => setPage("home"),
        800
      );
    } else {
      setAuthMessage(
        "Account created! Please check your email to confirm your account, then log in. 💕"
      );

      setAuthMode("login");
      setPassword("");
      setConfirmPassword("");
    }

    setAuthSubmitting(false);
  };

  /* =========================================================
     LOG OUT
  ========================================================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setProfile(null);
    setPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     PRODUCT CARD
  ========================================================= */

  const ProductCard = ({
    product,
  }) => (
    <article
      className={`product-card product-${activeCategory
        .toLowerCase()
        .replace(
          /\s+/g,
          "-"
        )}`}
    >
      <div className="product-image">

        <span className="product-tag">
          {product.made_to_order
            ? "Made to Order"
            : "Available"}
        </span>

        <button
          className="wishlist-button"
          onClick={() =>
            toggleWishlist(
              product.id
            )
          }
          aria-label="Add to wishlist"
        >
          <Heart
            size={19}
            fill={
              wishlist.includes(
                product.id
              )
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <span className="product-visual-placeholder">
          {activeCategory ===
          "Women"
            ? "WOMEN"
            : activeCategory ===
              "Shoes"
            ? "SHOES"
            : activeCategory ===
              "Bags"
            ? "BAGS"
            : activeCategory ===
              "Accessories"
            ? "DETAILS"
            : ""}
        </span>

      </div>

      <div className="product-info">

        <p className="seller">
          LOOPA Creator
        </p>

        <h3>
          {product.name}
        </h3>

        <p className="price">
          KES{" "}
          {Number(
            product.price
          ).toLocaleString()}
        </p>

        {product.stock !==
          null && (
          <p className="seller">
            {product.stock >
            0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        )}

        <button
          className="add-button"
          onClick={() =>
            addToBag(product)
          }
          disabled={
            product.stock !==
              null &&
            product.stock <=
              0
          }
        >
          {product.stock !==
            null &&
          product.stock <=
            0
            ? "Out of Stock"
            : "Add to Bag"}
        </button>

      </div>
    </article>
  );

  /* =========================================================
     WORLD VISUAL
  ========================================================= */

  const WorldVisual = () => {
    const info =
      worldInfo[
        activeCategory
      ];

    /* LITTLE LOVES — UNTOUCHED */
    if (
      activeCategory ===
      "Little Loves"
    ) {
      return (
        <div className="world-visual little-world-visual">

          <div className="little-cloud cloud-a">
            ☁️
          </div>

          <div className="little-cloud cloud-b">
            ☁️
          </div>

          <div className="rainbow rainbow-main">
            🌈
          </div>

          <div className="toy toy-teddy">
            🧸
          </div>

          <div className="toy toy-doll">
            🪆
          </div>

          <div className="toy toy-bow">
            🎀
          </div>

          <div className="toy toy-blocks">
            🧸
          </div>

          <div className="little-stars">
            ✦　✧　✦　✧
          </div>

        </div>
      );
    }

    /* CROCHET CORNER — UNTOUCHED */
    if (
      activeCategory ===
      "Crochet Corner"
    ) {
      return (
        <div className="world-visual crochet-world-visual">

          <div className="yarn-ball yarn-large">
            🧶
          </div>

          <div className="yarn-ball yarn-small-one">
            🧶
          </div>

          <div className="yarn-ball yarn-small-two">
            🧶
          </div>

          <div className="craft-tool hook-one">
            🪡
          </div>

          <div className="craft-tool hook-two">
            🪡
          </div>

          <div className="bead-string">
            ● ○ ● ○ ● ○ ●
          </div>

          <div className="thread-lines">
            ∿∿∿∿∿
          </div>

          <div className="craft-flower">
            🌸
          </div>

        </div>
      );
    }

    /* WOMEN / SHOES / BAGS / ACCESSORIES */
    return (
      <div
        className={`world-visual standard-world-visual world-${activeCategory
          .toLowerCase()
          .replace(
            /\s+/g,
            "-"
          )}`}
      >
        <div className="editorial-frame">
          <span className="editorial-number">
            01
          </span>

          <span className="editorial-word">
            {activeCategory ===
            "Women"
              ? "THE EDIT"
              : activeCategory ===
                "Shoes"
              ? "THE SHOE EDIT"
              : activeCategory ===
                "Bags"
              ? "THE BAG EDIT"
              : "THE DETAIL EDIT"}
          </span>

          <span className="editorial-line" />

          <span className="editorial-small">
            LOOPA / 2026
          </span>
        </div>

        <div className="editorial-float float-one">
          {activeCategory ===
          "Women"
            ? "W"
            : activeCategory ===
              "Shoes"
            ? "S"
            : activeCategory ===
              "Bags"
            ? "B"
            : "A"}
        </div>

        <div className="editorial-float float-two">
          02
        </div>

        <div className="editorial-float float-three">
          03
        </div>
      </div>
    );
  };

  /* =========================================================
     AUTH PAGE
  ========================================================= */

  const AuthPage = () => (
    <main className="auth-page">

      <div className="auth-decoration auth-bow">
        🎀
      </div>

      <div className="auth-decoration auth-flower">
        ✿
      </div>

      <div className="auth-card">

        <button
          className="auth-back"
          onClick={() =>
            setPage("home")
          }
        >
          ← Back to LOOPA
        </button>

        <div className="auth-logo">
          LOOPA
        </div>

        <div className="auth-card-heading">

          <span className="auth-mini-icon">
            ♡
          </span>

          <h1>
            {authMode ===
            "login"
              ? "Welcome back, babe."
              : "Come join LOOPA."}
          </h1>

          <p className="auth-intro">
            {authMode ===
            "login"
              ? "Your little fashion world is waiting."
              : "Create your account and make LOOPA yours."}
          </p>

        </div>

        {authError && (
          <div className="auth-alert auth-error">
            {authError}
          </div>
        )}

        {authMessage && (
          <div className="auth-alert auth-success">
            {authMessage}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={
            authMode ===
            "login"
              ? handleLogin
              : handleSignup
          }
        >

          {authMode ===
            "signup" && (
            <label className="form-field">

              <span>
                Full name
              </span>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                placeholder="Your full name"
                autoComplete="name"
              />

            </label>
          )}

          <label className="form-field">

            <span>
              Email address
            </span>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="you@example.com"
              autoComplete="email"
            />

          </label>

          <label className="form-field">

            <span>
              Password
            </span>

            <div className="password-input">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Your password"
                autoComplete={
                  authMode ===
                  "login"
                    ? "current-password"
                    : "new-password"
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label="Show password"
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                  />
                ) : (
                  <Eye
                    size={18}
                  />
                )}
              </button>

            </div>

          </label>

          {authMode ===
            "signup" && (
            <label className="form-field">

              <span>
                Confirm password
              </span>

              <div className="password-input">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label="Show password"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </button>

              </div>

            </label>
          )}

          {authMode ===
            "login" && (
            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                setAuthMessage(
                  "Password reset will be connected next 💕"
                )
              }
            >
              Forgot password?
            </button>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={
              authSubmitting
            }
          >
            {authSubmitting
              ? "Please wait..."
              : authMode ===
                "login"
              ? "Log In"
              : "Create My Account"}
          </button>

        </form>

        <div className="auth-switch">

          <span>
            {authMode ===
            "login"
              ? "Don't have a LOOPA account?"
              : "Already have a LOOPA account?"}
          </span>

          <button
            type="button"
            onClick={() =>
              openAuth(
                authMode ===
                  "login"
                  ? "signup"
                  : "login"
              )
            }
          >
            {authMode ===
            "login"
              ? "Sign Up"
              : "Log In"}
          </button>

        </div>

        <p className="auth-love">
          Made for girls who love pretty things ♡
        </p>

      </div>

    </main>
  );

  /* =========================================================
     ACCOUNT PAGE
  ========================================================= */

  const AccountPage = () => (
    <main className="account-page">

      <button
        className="back-home"
        onClick={() =>
          setPage("home")
        }
      >
        ← Back to LOOPA
      </button>

      <div className="account-card">

        <div className="account-avatar">
          {profile?.full_name
            ?.charAt(0)
            ?.toUpperCase() ||
            "♡"}
        </div>

        <p className="eyebrow">
          MY LOOPA
        </p>

        <h1>
          Hi,{" "}
          {profile?.full_name?.split(
            " "
          )[0] || "babe"}
          ♡
        </h1>

        <p className="account-email">
          {profile?.email ||
            user?.email}
        </p>

        <div className="account-menu">

          <button
            onClick={() => {
              setPage("home");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <UserCircle
              size={20}
            />

            <span>
              My Profile
            </span>

            <ChevronRight
              size={18}
            />
          </button>

          <button
            onClick={() => {
              setPage("home");
              setWishlist([]);
            }}
          >
            <Heart size={20} />

            <span>
              My Wishlist
            </span>

            <ChevronRight
              size={18}
            />
          </button>

          <button
            onClick={() =>
              setPage("home")
            }
          >
            <ShoppingBag
              size={20}
            />

            <span>
              My Orders
            </span>

            <ChevronRight
              size={18}
            />
          </button>

        </div>

        <button
          className="logout-button"
          onClick={
            handleLogout
          }
        >
          <LogOut size={18} />
          Log Out
        </button>

      </div>

    </main>
  );

  /* =========================================================
     SHOP PAGE
  ========================================================= */

  const ShopPage = () => {

    const info =
      worldInfo[
        activeCategory
      ];

    const themeClass =
      activeCategory ===
      "Little Loves"
        ? "little-shop-page"
        : activeCategory ===
          "Crochet Corner"
        ? "crochet-shop-page"
        : `standard-shop-page ${activeCategory
            .toLowerCase()
            .replace(
              /\s+/g,
              "-"
            )}-shop-page`;

    return (
      <main
        className={`shop-page ${themeClass}`}
      >

        <button
          className="back-home"
          onClick={() =>
            setPage("home")
          }
        >
          ← Back to LOOPA
        </button>

        <section className="shop-world-hero">

          <div className="shop-world-copy">

            <p className="eyebrow">
              {info.eyebrow}
            </p>

            <h1>
              {info.title}
            </h1>

            <p>
              {info.description}
            </p>

            {activeCategory !==
              "Little Loves" &&
              activeCategory !==
                "Crochet Corner" && (
                <div className="world-meta">
                  <span>
                    CURATED BY LOOPA
                  </span>

                  <span>
                    2026 EDIT
                  </span>
                </div>
              )}

          </div>

          <WorldVisual />

        </section>

        <div className="shop-layout">

          <aside className="shop-sidebar">

            <h3>
              Shop by
            </h3>

            {(
              categoryStructure[
                activeCategory
              ] || []
            ).map(
              (
                subcategory
              ) => (
                <button
                  key={
                    subcategory
                  }
                  className={
                    activeSubcategory ===
                    subcategory
                      ? "subcategory active"
                      : "subcategory"
                  }
                  onClick={() =>
                    setActiveSubcategory(
                      subcategory
                    )
                  }
                >
                  {
                    subcategory
                  }
                </button>
              )
            )}

          </aside>

          <section className="product-area">

            <div className="product-toolbar">

              <span>
                {loadingProducts
                  ? "Loading..."
                  : `${filteredProducts.length} pieces`}
              </span>

              <span>
                Featured ↓
              </span>

            </div>

            {loadingProducts ? (

              <div className="empty-shop loading-state">

                <div className="empty-icon">
                  •
                </div>

                <h2>
                  Getting things pretty...
                </h2>

                <p>
                  We're bringing your LOOPA pieces together.
                </p>

              </div>

            ) : filteredProducts.length >
              0 ? (

              <div className="shop-product-grid">

                {filteredProducts.map(
                  (
                    product
                  ) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                    />
                  )
                )}

              </div>

            ) : (

              <div className="empty-shop">

                <div className="empty-decor">

                  {info.visuals
                    .slice(0, 4)
                    .map(
                      (
                        item,
                        index
                      ) => (
                        <span
                          key={
                            index
                          }
                        >
                          {
                            item
                          }
                        </span>
                      )
                    )}

                </div>

                <div className="empty-icon">
                  {
                    info.emptyIcon
                  }
                </div>

                <h2>
                  {
                    info.emptyTitle
                  }
                </h2>

                <p>
                  {
                    info.emptyText
                  }
                </p>

                <button
                  className="empty-home-button"
                  onClick={() =>
                    setPage(
                      "home"
                    )
                  }
                >
                  Explore LOOPA
                  <ArrowRight
                    size={17}
                  />
                </button>

              </div>

            )}

          </section>

        </div>

      </main>
    );
  };

  /* =========================================================
     HEADER
  ========================================================= */

  return (
    <div className="app">

      <header className="header">

        <div className="header-inner">

          <button
            className="logo"
            onClick={() => {
              setPage("home");
              setMenuOpen(
                false
              );

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            LOOPA
          </button>

          <nav className="nav">

            {Object.keys(
              categoryStructure
            ).map(
              (category) => (
                <button
                  key={
                    category
                  }
                  onClick={() =>
                    openShop(
                      category
                    )
                  }
                >
                  {
                    category
                  }
                </button>
              )
            )}

          </nav>

          <div className="header-actions">

            <div className="search-box">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search LOOPA"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    openShop(
                      "Women"
                    );
                  }
                }}
              />

            </div>

            <button
              className="icon-button"
              onClick={() =>
                user
                  ? setPage(
                      "account"
                    )
                  : openAuth(
                      "login"
                    )
              }
              aria-label="Account"
            >
              <User size={20} />
            </button>

            <button
              className="icon-button"
              onClick={() =>
                user
                  ? setPage(
                      "account"
                    )
                  : openAuth(
                      "login"
                    )
              }
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlist.length >
                0 && (
                <span className="count">
                  {
                    wishlist.length
                  }
                </span>
              )}

            </button>

            <button
              className="icon-button"
              onClick={() =>
                user
                  ? setPage(
                      "account"
                    )
                  : openAuth(
                      "login"
                    )
              }
              aria-label="Shopping bag"
            >
              <ShoppingBag
                size={20}
              />

              {cart.length >
                0 && (
                <span className="count">
                  {
                    cart.length
                  }
                </span>
              )}

            </button>

            <button
              className="mobile-menu"
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu
                  size={22}
                />
              )}
            </button>

          </div>

        </div>

        {menuOpen && (
          <div className="mobile-nav">

            {Object.keys(
              categoryStructure
            ).map(
              (category) => (
                <button
                  key={
                    category
                  }
                  onClick={() =>
                    openShop(
                      category
                    )
                  }
                >
                  {
                    category
                  }

                  <ChevronRight
                    size={17}
                  />
                </button>
              )
            )}

            {!user ? (
              <>
                <button
                  onClick={() =>
                    openAuth(
                      "login"
                    )
                  }
                >
                  Log In
                  <ChevronRight
                    size={17}
                  />
                </button>

                <button
                  onClick={() =>
                    openAuth(
                      "signup"
                    )
                  }
                >
                  Sign Up
                  <ChevronRight
                    size={17}
                  />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setPage(
                    "account"
                  );
                  setMenuOpen(
                    false
                  );
                }}
              >
                My Account
                <ChevronRight
                  size={17}
                />
              </button>
            )}

          </div>
        )}

      </header>

      {/* AUTH */}

      {page === "auth" && (
        <AuthPage />
      )}

      {/* ACCOUNT */}

      {page === "account" &&
        user && (
          <AccountPage />
        )}

      {/* SHOP */}

      {page === "shop" && (
        <ShopPage />
      )}

      {/* =====================================================
          HOME
      ====================================================== */}

      {page === "home" && (
        <main>

          {/* HERO */}

          <section className="hero">

            <div className="hero-content">

              <p className="eyebrow">
                WELCOME TO LOOPA
              </p>

              <h1>
                Your style.
                <br />
                Your world.
              </h1>

              <p>
                A feminine fashion
                marketplace made
                for women, girls
                and little loves.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  openShop(
                    "Women"
                  )
                }
              >
                Shop Women
                <ArrowRight
                  size={18}
                />
              </button>

            </div>

            <div className="hero-decoration">

              <span className="hero-bow">
                🎀
              </span>

              <span className="hero-flower">
                ✿
              </span>

              <span className="hero-heart">
                ♡
              </span>

            </div>

          </section>

          {/* CATEGORIES */}

          <section className="section">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  EXPLORE LOOPA
                </p>

                <h2>
                  Shop your world.
                </h2>

              </div>

              <button
                className="text-button"
                onClick={() =>
                  openShop(
                    "Women"
                  )
                }
              >
                View all
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

            <div className="category-grid">

              <button
                className="category-card women-card"
                onClick={() =>
                  openShop(
                    "Women"
                  )
                }
              >
                <span className="category-icon">
                  👗
                </span>

                <span>
                  Women
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

              <button
                className="category-card little-card"
                onClick={() =>
                  openShop(
                    "Little Loves"
                  )
                }
              >
                <span className="category-icon">
                  🧸
                </span>

                <span>
                  Little Loves
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

              <button
                className="category-card shoes-card"
                onClick={() =>
                  openShop(
                    "Shoes"
                  )
                }
              >
                <span className="category-icon">
                  👠
                </span>

                <span>
                  Shoes
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

              <button
                className="category-card bags-card"
                onClick={() =>
                  openShop(
                    "Bags"
                  )
                }
              >
                <span className="category-icon">
                  👜
                </span>

                <span>
                  Bags
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

              <button
                className="category-card accessories-card"
                onClick={() =>
                  openShop(
                    "Accessories"
                  )
                }
              >
                <span className="category-icon">
                  💎
                </span>

                <span>
                  Accessories
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

              <button
                className="category-card crochet-card"
                onClick={() =>
                  openShop(
                    "Crochet Corner"
                  )
                }
              >
                <span className="category-icon">
                  🧶
                </span>

                <span>
                  Crochet Corner
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

            </div>

          </section>

          {/* LITTLE LOVES — UNTOUCHED */}

          <section className="little-world home-world-section">

            <div className="little-content">

              <span className="little-badge">
                🧸 LITTLE LOVES
              </span>

              <h2>
                Tiny pieces for
                <br />
                big little moments.
              </h2>

              <p>
                A dreamy little
                corner for babies,
                toddlers and
                little girls.
              </p>

              <button
                className="little-primary"
                onClick={() =>
                  openShop(
                    "Little Loves"
                  )
                }
              >
                Enter Little Loves
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

            <div className="little-visual">

              <div className="cloud-card">

                ☁️

                <strong>
                  Sweet little things
                </strong>

                <span>
                  made for your little love
                </span>

              </div>

              <div className="teddy">
                🧸
              </div>

              <div className="tiny-bows">
                🎀 🎀 🎀
              </div>

            </div>

          </section>

          {/* PRODUCTS */}

          {homeProducts.length >
            0 && (
            <section className="section">

              <div className="section-heading">

                <div>

                  <p className="eyebrow">
                    NEW ON LOOPA
                  </p>

                  <h2>
                    Fresh pieces.
                  </h2>

                </div>

                <button
                  className="text-button"
                  onClick={() =>
                    openShop(
                      "Women"
                    )
                  }
                >
                  Shop women
                  <ArrowRight
                    size={17}
                  />
                </button>

              </div>

              <div className="home-products">

                {homeProducts.map(
                  (product) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                    />
                  )
                )}

              </div>

            </section>
          )}

          {/* CROCHET — UNTOUCHED */}

          <section className="crochet-world home-world-section">

            <div className="crochet-content">

              <p className="eyebrow">
                LOOPA ARTISAN
              </p>

              <h2>
                Welcome to
                <br />
                Crochet Corner.
              </h2>

              <p>
                Handmade pieces,
                beautiful stitches
                and a little bit
                of yarn magic.
              </p>

              <div className="crochet-tags">

                <span>
                  🧶 Yarn
                </span>

                <span>
                  🪡 Stitches
                </span>

                <span>
                  📿 Beads
                </span>

              </div>

              <button
                className="crochet-button"
                onClick={() =>
                  openShop(
                    "Crochet Corner"
                  )
                }
              >
                Explore Crochet
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

            <div className="crochet-visual">

              <div className="yarn-circle">
                🧶
              </div>

              <div className="yarn-small">
                🧶
              </div>

              <div className="crochet-flower">
                🌸
              </div>

              <div className="yarn-decoration">
                ∿∿∿∿∿
              </div>

            </div>

          </section>

          {/* CUSTOM */}

          <section className="custom-section section">

            <div>

              <p className="eyebrow">
                MADE YOUR WAY
              </p>

              <h2>
                Can't find exactly
                <br />
                what you're imagining?
              </h2>

              <p>
                Custom pieces are
                coming to LOOPA —
                made around your
                vision.
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() =>
                openShop(
                  "Women"
                )
              }
            >
              Explore LOOPA
              <ArrowRight
                size={18}
              />
            </button>

          </section>

        </main>
      )}

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-brand">

          <h3>
            LOOPA
          </h3>

          <p>
            Your Style. Your World.
          </p>

        </div>

        <div className="footer-links">

          <button
            onClick={() =>
              openShop("Women")
            }
          >
            Women
          </button>

          <button
            onClick={() =>
              openShop(
                "Little Loves"
              )
            }
          >
            Little Loves
          </button>

          <button
            onClick={() =>
              openShop(
                "Crochet Corner"
              )
            }
          >
            Crochet Corner
          </button>

          {!user ? (
            <button
              onClick={() =>
                openAuth(
                  "signup"
                )
              }
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={() =>
                setPage(
                  "account"
                )
              }
            >
              My Account
            </button>
          )}

        </div>

        <p className="footer-copy">
          © 2026 LOOPA. Made with love.
        </p>

      </footer>

    </div>
  );
}

createRoot(
  document.getElementById(
    "root"
  )
).render(
  <App />
);
