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

/* ---------------------------------------
   LOOPA SHOP STRUCTURE
---------------------------------------- */

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

/* ---------------------------------------
   SPECIAL WORLDS
---------------------------------------- */

const worldContent = {
  "Little Loves": {
    eyebrow: "A LITTLE WORLD OF LOVE",
    title: "Little Loves",
    description:
      "A dreamy little world filled with adorable pieces for babies, toddlers and little girls.",
    emptyIcon: "🧸",
    emptyTitle: "Something sweet is coming...",
    emptyText:
      "We're bringing beautiful little things to Little Loves.",
    pills: [
      "🧸 Baby",
      "🌈 Toddler",
      "🎀 Little Girls",
      "🎂 Birthdays",
      "👯 Mommy & Me",
      "🌸 Handmade",
    ],
  },

  "Crochet Corner": {
    eyebrow: "LOOPA ARTISAN",
    title: "Crochet Corner",
    description:
      "A cozy handmade world of yarn, stitches, beads, hooks and beautiful creations made by hand.",
    emptyIcon: "🧶",
    emptyTitle: "The yarn is still spinning...",
    emptyText:
      "Beautiful handmade creations from LOOPA artisans will appear here.",
    pills: [
      "🧶 Crochet",
      "🪡 Needles",
      "🧵 Thread",
      "📿 Beads",
      "🪝 Hooks",
      "✂️ Handmade",
    ],
  },
};

/* ---------------------------------------
   EDITORIAL SHOP CONTENT
---------------------------------------- */

const standardWorldContent = {
  Women: {
    eyebrow: "THE WOMEN'S EDIT",
    title: "Women",
    description:
      "Curated fashion for every mood, moment and version of you.",
  },

  Shoes: {
    eyebrow: "THE SHOE EDIT",
    title: "Shoes",
    description:
      "The finishing step to every look — from everyday staples to statement pairs.",
  },

  Bags: {
    eyebrow: "THE BAG EDIT",
    title: "Bags",
    description:
      "Everyday carryalls, statement pieces and little bags made for your world.",
  },

  Accessories: {
    eyebrow: "THE ACCESSORY EDIT",
    title: "Accessories",
    description:
      "The details that change everything — jewelry, hair pieces, shades and more.",
  },
};

/* ---------------------------------------
   SUBCATEGORY KEYWORDS
   Used until Supabase has a dedicated
   subcategory column.
---------------------------------------- */

const subcategoryKeywords = {
  Women: {
    Dresses: ["dress", "dresses", "gown", "maxi", "midi", "mini dress"],
    Tops: ["top", "tops", "blouse", "shirt", "bodysuit", "crop top"],
    Skirts: ["skirt", "skirts"],
    Pants: ["pant", "pants", "trouser", "trousers"],
    Jeans: ["jean", "jeans", "denim"],
    "Two-Piece Sets": [
      "two piece",
      "two-piece",
      "2 piece",
      "set",
      "co-ord",
      "coord",
      "co ord",
    ],
    "Going Out": [
      "going out",
      "party",
      "night out",
      "date night",
      "club",
      "evening",
    ],
    "Soft Girl": [
      "soft girl",
      "soft",
      "pastel",
      "feminine",
      "romantic",
    ],
    Baddie: [
      "baddie",
      "bodycon",
      "sexy",
      "statement",
      "snatched",
    ],
    Elegant: [
      "elegant",
      "classy",
      "luxury",
      "sophisticated",
      "formal",
    ],
  },

  Shoes: {
    Heels: ["heel", "heels", "stiletto", "pump", "pumps"],
    Sneakers: ["sneaker", "sneakers", "trainer", "trainers"],
    Flats: ["flat", "flats", "loafer", "loafers", "ballet"],
    Sandals: ["sandal", "sandals"],
    Boots: ["boot", "boots", "ankle boot"],
    Slides: ["slide", "slides", "slipper"],
  },

  Bags: {
    Handbags: ["handbag", "handbags", "purse", "purses"],
    "Shoulder Bags": [
      "shoulder bag",
      "shoulder bags",
    ],
    Crossbody: [
      "crossbody",
      "cross body",
      "cross-body",
    ],
    "Mini Bags": [
      "mini bag",
      "mini bags",
      "micro bag",
      "small bag",
    ],
    "Tote Bags": [
      "tote",
      "tote bag",
      "tote bags",
    ],
    "Crochet Bags": [
      "crochet bag",
      "crochet bags",
    ],
  },

  Accessories: {
    Jewelry: [
      "jewelry",
      "jewellery",
      "necklace",
      "necklaces",
      "earring",
      "earrings",
      "bracelet",
      "bracelets",
      "ring",
      "rings",
      "anklet",
      "anklets",
    ],
    "Hair Accessories": [
      "hair",
      "scrunchie",
      "scrunchies",
      "hair clip",
      "hair clips",
      "headband",
      "headbands",
      "bow",
      "bows",
    ],
    Sunglasses: [
      "sunglasses",
      "sunglass",
      "shades",
      "eyewear",
    ],
    Belts: ["belt", "belts"],
    Hats: [
      "hat",
      "hats",
      "cap",
      "caps",
      "bucket hat",
    ],
  },

  "Little Loves": {
    Baby: ["baby", "babies", "infant"],
    Toddler: ["toddler"],
    "Little Girls": [
      "little girl",
      "girls",
      "girl",
    ],
    Birthday: [
      "birthday",
      "birthday dress",
      "party dress",
    ],
    "Mommy & Me": [
      "mommy",
      "mummy",
      "mom",
      "mother",
      "matching",
    ],
    Handmade: [
      "handmade",
      "hand-crafted",
      "handcrafted",
    ],
  },

  "Crochet Corner": {
    "Crochet Bags": [
      "crochet bag",
      "crochet bags",
    ],
    "Crochet Clothing": [
      "crochet dress",
      "crochet top",
      "crochet skirt",
      "crochet clothing",
      "crochet cardigan",
    ],
    "Crochet Accessories": [
      "crochet accessory",
      "crochet accessories",
      "crochet hat",
      "crochet headband",
    ],
    "Crochet Home": [
      "crochet home",
      "crochet blanket",
      "crochet pillow",
      "crochet decor",
      "crochet décor",
    ],
    "Custom Crochet": [
      "custom crochet",
      "custom",
      "made to order",
    ],
  },
};

/* ---------------------------------------
   APP
---------------------------------------- */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [dbCategories, setDbCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [page, setPage] = useState("home");

  const [activeCategory, setActiveCategory] =
    useState("Women");

  const [activeSubcategory, setActiveSubcategory] =
    useState("All Women");

  const [search, setSearch] = useState("");

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  /* ---------------------------------------
     AUTH STATE
  ---------------------------------------- */

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* ---------------------------------------
     AUTH FORM
  ---------------------------------------- */

  const [authMode, setAuthMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [fullName, setFullName] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] =
    useState(false);

  /* ---------------------------------------
     CHECK CURRENT USER
  ---------------------------------------- */

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
    } = supabase.auth.onAuthStateChange(
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

  /* ---------------------------------------
     LOAD PROFILE
  ---------------------------------------- */

  const loadProfile = async (userId) => {
    const { data, error } = await supabase
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

  /* ---------------------------------------
     LOAD CATEGORIES + PRODUCTS
  ---------------------------------------- */

  useEffect(() => {
    const loadStore = async () => {
      setLoadingCategories(true);
      setLoadingProducts(true);

      const {
        data: categoryData,
        error: categoryError,
      } = await supabase
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
      } = await supabase
        .from("products")
        .select(
          `
          id,
          name,
          description,
          price,
          stock,
          status,
          seller_id,
          category_id,
          made_to_order,
          production_days,
          created_at
        `
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

  /* ---------------------------------------
     FIND CATEGORY ID
  ---------------------------------------- */

  const getCategoryId = (categoryName) => {
    const category = dbCategories.find(
      (item) =>
        item.name.toLowerCase() ===
        categoryName.toLowerCase()
    );

    return category?.id || null;
  };

  /* ---------------------------------------
     OPEN SHOP
  ---------------------------------------- */

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

  /* ---------------------------------------
     OPEN AUTH
  ---------------------------------------- */

  const openAuth = (mode = "login") => {
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

  /* ---------------------------------------
     CHECK SUBCATEGORY
  ---------------------------------------- */

  const matchesSubcategory = (
    product,
    category,
    subcategory
  ) => {
    if (
      !subcategory ||
      subcategory.startsWith("All ")
    ) {
      return true;
    }

    const productText = `
      ${product.name || ""}
      ${product.description || ""}
    `
      .toLowerCase()
      .trim();

    const keywords =
      subcategoryKeywords?.[category]?.[
        subcategory
      ];

    if (
      !keywords ||
      keywords.length === 0
    ) {
      return true;
    }

    return keywords.some((keyword) =>
      productText.includes(
        keyword.toLowerCase()
      )
    );
  };

  /* ---------------------------------------
     CURRENT CATEGORY
  ---------------------------------------- */

  const activeCategoryId =
    getCategoryId(activeCategory);

  /* ---------------------------------------
     FILTER PRODUCTS
  ---------------------------------------- */

  const filteredProducts =
    dbProducts.filter((product) => {
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

      const subcategoryMatch =
        matchesSubcategory(
          product,
          activeCategory,
          activeSubcategory
        );

      return (
        categoryMatch &&
        searchMatch &&
        subcategoryMatch
      );
    });

  /* ---------------------------------------
     HOME PRODUCTS
  ---------------------------------------- */

  const homeProducts =
    dbProducts.slice(0, 4);

  /* ---------------------------------------
     WISHLIST
  ---------------------------------------- */

  const toggleWishlist = (id) => {
    setWishlist((old) =>
      old.includes(id)
        ? old.filter(
            (item) => item !== id
          )
        : [...old, id]
    );
  };

  /* ---------------------------------------
     CART
  ---------------------------------------- */

  const addToBag = (product) => {
    setCart((old) => [
      ...old,
      product,
    ]);
  };

  /* ---------------------------------------
     LOGIN
  ---------------------------------------- */

  const handleLogin = async (e) => {
    e.preventDefault();

    setAuthError("");
    setAuthMessage("");
    setAuthSubmitting(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

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

    setTimeout(() => {
      setPage("home");
    }, 700);
  };

  /* ---------------------------------------
     SIGN UP
  ---------------------------------------- */

  const handleSignup = async (e) => {
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

    if (password !== confirmPassword) {
      setAuthError(
        "Your passwords do not match."
      );
      return;
    }

    setAuthSubmitting(true);

    const { data, error } =
      await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name:
              fullName.trim(),
          },
        },
      });

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

      setTimeout(() => {
        setPage("home");
      }, 800);
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

  /* ---------------------------------------
     LOG OUT
  ---------------------------------------- */

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

  /* ---------------------------------------
     PRODUCT CARD
  ---------------------------------------- */

  const ProductCard = ({
    product,
  }) => {
    return (
      <article className="product-card">

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

          <span className="product-emoji">
            🛍️
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
              {product.stock > 0
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
              product.stock <= 0
            }
          >
            {product.stock !==
              null &&
            product.stock <= 0
              ? "Out of Stock"
              : "Add to Bag"}
          </button>

        </div>

      </article>
    );
  };

  /* ---------------------------------------
     AUTH PAGE
  ---------------------------------------- */

  const AuthPage = () => {
    return (
      <main className="auth-page">

        <div className="auth-decoration auth-bow">
          🎀
        </div>

        <div className="auth-decoration auth-flower">
          🌸
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

          <p className="eyebrow">
            {authMode ===
            "login"
              ? "WELCOME BACK"
              : "JOIN THE LOOPA WORLD"}
          </p>

          <h1>
            {authMode ===
            "login"
              ? "Welcome back."
              : "Create your account."}
          </h1>

          <p className="auth-intro">
            {authMode ===
            "login"
              ? "Log in to save your favorites, manage your bag and keep shopping."
              : "Create your free LOOPA account and make your fashion world yours."}
          </p>

          {authError && (
            <div className="auth-alert error">
              {authError}
            </div>
          )}

          {authMessage && (
            <div className="auth-alert success">
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
              <div className="form-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  autoComplete="name"
                />

              </div>
            )}

            <div className="form-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                autoComplete="email"
              />

            </div>

            <div className="form-field">

              <label>
                Password
              </label>

              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
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
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {authMode ===
              "signup" && (
              <div className="form-field">

                <label>
                  Confirm Password
                </label>

                <div className="password-input">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
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

              </div>
            )}

            {authMode ===
              "login" && (
              <button
                type="button"
                className="forgot-password"
                onClick={() => {
                  setAuthMessage(
                    "Password reset is coming next. 💕"
                  );
                  setAuthError("");
                }}
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={
                authSubmitting
              }
            >
              {authSubmitting
                ? "Please wait..."
                : authMode ===
                  "login"
                ? "Log In"
                : "Create Account"}

              {!authSubmitting && (
                <ArrowRight
                  size={18}
                />
              )}
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

          <div className="auth-love">
            🎀 Your Style. Your World. 🎀
          </div>

        </div>

      </main>
    );
  };

  /* ---------------------------------------
     ACCOUNT PAGE
  ---------------------------------------- */

  const AccountPage = () => {
    return (
      <main className="account-page">

        <div className="account-card">

          <div className="account-avatar">
            <UserCircle
              size={58}
            />
          </div>

          <p className="eyebrow">
            MY LOOPA
          </p>

          <h1>
            {profile?.full_name ||
              "Welcome to LOOPA"}
          </h1>

          <p className="account-email">
            {user?.email}
          </p>

          <div className="account-menu">

            <button>
              <User size={19} />
              My Profile
              <ChevronRight
                size={17}
              />
            </button>

            <button>
              <Heart size={19} />
              My Wishlist
              <ChevronRight
                size={17}
              />
            </button>

            <button>
              <ShoppingBag
                size={19}
              />
              My Orders
              <ChevronRight
                size={17}
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
  };

  /* ---------------------------------------
     SPECIAL SHOP EMPTY STATE
  ---------------------------------------- */

  const SpecialShopDecor = () => {
    if (
      activeCategory ===
      "Little Loves"
    ) {
      return (
        <div
          className="little-shop-decor"
          aria-hidden="true"
        >
          <span>☁️</span>
          <span>🌈</span>
          <span>🧸</span>
          <span>🎀</span>
          <span>⭐</span>
          <span>🪆</span>
          <span>🧸</span>
          <span>☁️</span>
          <span>🌸</span>
        </div>
      );
    }

    if (
      activeCategory ===
      "Crochet Corner"
    ) {
      return (
        <div
          className="crochet-shop-decor"
          aria-hidden="true"
        >
          <span>🧶</span>
          <span>🪝</span>
          <span>🧵</span>
          <span>📿</span>
          <span>🪡</span>
          <span>✂️</span>
          <span>🧶</span>
          <span>🧵</span>
          <span>📿</span>
        </div>
      );
    }

    return null;
  };

  /* ---------------------------------------
     STANDARD SHOP HERO
  ---------------------------------------- */

  const StandardShopHero = () => {
    const content =
      standardWorldContent[
        activeCategory
      ];

    if (!content) {
      return null;
    }

    return (
      <section className="shop-world-hero">
        <div className="shop-world-copy">
          <p className="standard-eyebrow">
            {content.eyebrow}
          </p>

          <h1>
            {content.title}
          </h1>

          <p className="standard-world-description">
            {content.description}
          </p>

          <div className="standard-shop-tags">
            {content.tags.map(
              (tag) => (
                <span key={tag}>
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div
          className="standard-world-visual"
          aria-hidden="true"
        >
          <div className="standard-visual-frame">
            <span className="standard-visual-label">
              {content.visualLabel}
            </span>

            <span className="standard-visual-mark">
              {content.mark}
            </span>

            <span className="standard-visual-caption">
              YOUR STYLE. YOUR WORLD.
            </span>
          </div>
        </div>
      </section>
    );
  };

  /* ---------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="header-inner">

          <button
            className="mobile-menu"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >
            {menuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <button
            className="logo"
            onClick={() => {
              setPage("home");
              setMenuOpen(false);
            }}
          >
            LOOPA
          </button>

          <nav
            className={`nav ${
              menuOpen
                ? "nav-open"
                : ""
            }`}
          >

            {Object.keys(
              categoryStructure
            ).map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    openShop(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}

          </nav>

          <div className="header-actions">

            <div className="search-box">

              <Search size={17} />

              <input
                placeholder="Search LOOPA..."
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
              onClick={() => {
                if (!user) {
                  openAuth("login");
                } else {
                  setPage("account");
                }
              }}
              aria-label="Account"
            >
              <User size={20} />
            </button>

            <button
              className="icon-button"
              onClick={() => {
                if (!user) {
                  openAuth("login");
                }
              }}
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlist.length >
                0 && (
                <span className="count">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              className="icon-button"
              onClick={() => {
                if (!user) {
                  openAuth("login");
                }
              }}
              aria-label="Shopping bag"
            >
              <ShoppingBag
                size={20}
              />

              {cart.length > 0 && (
                <span className="count">
                  {cart.length}
                </span>
              )}

            </button>

          </div>

        </div>

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

      {/* =====================================
          HOME
      ====================================== */}

      {page === "home" && (
        <main>

          {/* HERO */}

          <section className="hero">

            <div className="hero-decoration hero-bow">
              🎀
            </div>

            <div className="hero-decoration hero-flower">
              🌸
            </div>

            <div className="hero-content">

              <p className="eyebrow">
                WELCOME TO LOOPA
              </p>

              <h1>
                Your Style.
                <br />
                <em>
                  Your World.
                </em>
              </h1>

              <p className="hero-copy">
                A fashion marketplace
                for beautiful pieces,
                creative sellers and
                every version of you.
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

          </section>

          {/* SHOP YOUR LOOPA */}

          <section className="section">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  DISCOVER YOUR WORLD
                </p>

                <h2>
                  Shop your LOOPA
                </h2>

              </div>

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
                  🎀
                </span>

                <div>
                  <h3>
                    Women
                  </h3>
                  <p>
                    Fashion for her
                  </p>
                </div>

                <ChevronRight />
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

                <div>
                  <h3>
                    Little Loves
                  </h3>
                  <p>
                    Tiny fashion
                    dreams
                  </p>
                </div>

                <ChevronRight />
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

                <div>
                  <h3>
                    Shoes
                  </h3>
                  <p>
                    Step into pretty
                  </p>
                </div>

                <ChevronRight />
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

                <div>
                  <h3>
                    Bags
                  </h3>
                  <p>
                    Carry your world
                  </p>
                </div>

                <ChevronRight />
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

                <div>
                  <h3>
                    Accessories
                  </h3>
                  <p>
                    The finishing
                    touch
                  </p>
                </div>

                <ChevronRight />
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

                <div>
                  <h3>
                    Crochet Corner
                  </h3>
                  <p>
                    Where yarn
                    becomes art
                  </p>
                </div>

                <ChevronRight />
              </button>

            </div>

          </section>

          {/* LITTLE LOVES */}

          <section className="little-world">

            <div className="little-cloud cloud-one">
              ☁️
            </div>

            <div className="little-cloud cloud-two">
              ☁️
            </div>

            <div className="little-star star-one">
              ⭐
            </div>

            <div className="little-star star-two">
              ✨
            </div>

            <div className="little-rainbow">
              🌈
            </div>

            <div className="little-toy toy-one">
              🧸
            </div>

            <div className="little-toy toy-two">
              🪆
            </div>

            <div className="little-content">

              <div className="little-badge">
                🧸 LITTLE LOVES
              </div>

              <h2>
                Tiny clothes.
                <br />
                <em>
                  Big little moments.
                </em>
              </h2>

              <p>
                A dreamy little
                world filled with
                adorable pieces for
                babies, toddlers and
                little girls.
              </p>

              <div className="little-buttons">

                <button
                  className="little-primary"
                  onClick={() =>
                    openShop(
                      "Little Loves"
                    )
                  }
                >
                  Explore Little Loves
                  <ArrowRight
                    size={17}
                  />
                </button>

              </div>

              <div className="little-pills">

                <span>
                  🎀 Baby
                </span>

                <span>
                  🧸 Toddler
                </span>

                <span>
                  🌸 Little Girls
                </span>

                <span>
                  🎂 Birthdays
                </span>

              </div>

            </div>

            <div className="little-visual">

              <div className="cloud-card">

                <div className="teddy">
                  🧸
                </div>

                <div className="tiny-bows">
                  🎀 🌸 🎀
                </div>

                <p>
                  made for little
                  loves
                </p>

              </div>

            </div>

          </section>

          {/* TRENDING */}

          <section className="section">

            <div className="section-heading split-heading">

              <div>

                <p className="eyebrow">
                  THE LOOPA EDIT
                </p>

                <h2>
                  Trending now
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
                Shop all
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

            {loadingProducts ? (
              <div className="empty-shop">
                <span>🎀</span>
                <h2>
                  Loading LOOPA...
                </h2>
                <p>
                  Bringing the latest
                  pieces to you.
                </p>
              </div>
            ) : homeProducts.length >
              0 ? (
              <div className="home-products">
                {homeProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={
                        product
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <div className="empty-shop">
                <span>🎀</span>
                <h2>
                  Coming to LOOPA
                </h2>
                <p>
                  Beautiful pieces from
                  LOOPA creators will
                  appear here.
                </p>
              </div>
            )}

          </section>

          {/* CROCHET */}

          <section className="crochet-world">

            <div className="yarn-decoration yarn-one">
              🧶
            </div>

            <div className="yarn-decoration yarn-two">
              🧵
            </div>

            <div className="crochet-needle needle-one">
              🪡
            </div>

            <div className="crochet-hook hook-one">
              🪝
            </div>

            <div className="crochet-beads beads-one">
              📿
            </div>

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

              <p className="eyebrow">
                LOOPA ARTISAN
              </p>

              <h2>
                Crochet
                <br />
                <em>
                  Corner
                </em>
              </h2>

              <p>
                Slow-made pieces,
                beautiful stitches and
                handmade creations made
                with love.
              </p>

              <div className="crochet-tags">

                <span>
                  🧶 Crochet Bags
                </span>

                <span>
                  📿 Beaded Pieces
                </span>

                <span>
                  🪡 Needlework
                </span>

                <span>
                  🪝 Crochet Hooks
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
                Enter Crochet Corner
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

          </section>

          {/* CUSTOM */}

          <section className="custom-section">

            <div>

              <p className="eyebrow">
                MADE JUST FOR YOU
              </p>

              <h2>
                Dream it.
                <br />
                <em>
                  Make it LOOPA.
                </em>
              </h2>

              <p>
                Want something custom?
                Connect with a LOOPA
                creator and bring your
                dream piece to life.
              </p>

              <button
                className="primary-button"
                onClick={() => {
                  if (!user) {
                    openAuth(
                      "login"
                    );
                  }
                }}
              >
                Start a Custom Request
                <Sparkles
                  size={17}
                />
              </button>

            </div>

          </section>

        </main>
      )}

      {/* =====================================
          SHOP
      ====================================== */}

      {page === "shop" && (
        <main
  className={`shop-page ${
    activeCategory === "Little Loves"
      ? "shop-page-little"
      : activeCategory === "Crochet Corner"
      ? "shop-page-crochet"
      : ["Women", "Shoes", "Bags", "Accessories"].includes(activeCategory)
      ? `standard-shop-page ${activeCategory
          .toLowerCase()
          .replace(/\s+/g, "-")}-shop-page`
      : ""
  }`}
>

          <button
            className="back-home"
            onClick={() =>
              setPage("home")
            }
          >
            ← Back to LOOPA
          </button>

          {/* STANDARD EDITORIAL HERO */}

          {standardWorldContent[
            activeCategory
          ] && (
            <StandardShopHero />
          )}

          {/* LITTLE / CROCHET HEADER */}

          {worldContent[
            activeCategory
          ] && (
            <div className="shop-header">

              <p className="eyebrow">
                {activeCategory ===
                "Little Loves"
                  ? "🧸 A LITTLE WORLD"
                  : "🧶 THE HANDMADE STUDIO"}
              </p>

              <h1>
                {activeCategory}
              </h1>

              <p>
                {
                  worldContent[
                    activeCategory
                  ].description
                }
              </p>

              <div className="special-shop-pills">
                {worldContent[
                  activeCategory
                ].pills.map(
                  (pill) => (
                    <span
                      key={pill}
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>

            </div>
          )}

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
                (subcategory) => (
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
                    {subcategory}
                  </button>
                )
              )}

            </aside>

            <section className="product-area">

              <div className="product-toolbar">

                <span>
                  {loadingProducts
                    ? "Loading..."
                    : `${filteredProducts.length} ${
                        filteredProducts.length ===
                        1
                          ? "piece"
                          : "pieces"
                      }`}
                </span>

                <span>
                  {activeSubcategory}
                </span>

              </div>

              {loadingProducts ? (

                <div className="empty-shop">

                  <span>
                    {activeCategory ===
                    "Little Loves"
                      ? "🧸"
                      : activeCategory ===
                        "Crochet Corner"
                      ? "🧶"
                      : ""}
                  </span>

                  <h2>
                    Loading LOOPA...
                  </h2>

                  <p>
                    We're bringing the
                    pieces in.
                  </p>

                </div>

              ) : filteredProducts.length >
                0 ? (

                <div className="shop-product-grid">

                  {filteredProducts.map(
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

              ) : standardWorldContent[
                  activeCategory
                ] ? (
                <div className="standard-empty">
                  <div className="standard-empty-mark">
                    {standardWorldContent[
                      activeCategory
                    ].mark}
                  </div>

                  <p className="standard-eyebrow">
                    COMING SOON
                  </p>

                  <h2>
                    New pieces are on the way.
                  </h2>

                  <p>
                    We're curating something special
                    for this edit. Check back soon
                    for new LOOPA pieces.
                  </p>
                </div>
              ) : (
                <div className="special-empty-wrapper">
                  <SpecialShopDecor />

                  <div className="empty-shop special-empty">
                    <span className="empty-icon">
                      {worldContent[
                        activeCategory
                      ]?.emptyIcon || ""}
                    </span>

                    <h2>
                      {worldContent[
                        activeCategory
                      ]?.emptyTitle ||
                        `No ${activeSubcategory.toLowerCase()} yet`}
                    </h2>

                    <p>
                      {worldContent[
                        activeCategory
                      ]?.emptyText ||
                        `We're still adding beautiful ${activeSubcategory.toLowerCase()} pieces to LOOPA.`}
                    </p>

                    {activeCategory ===
                      "Little Loves" && (
                      <div className="empty-character-row">
                        🧸 ☁️ 🌈 🎀 🪆 ⭐
                      </div>
                    )}

                    {activeCategory ===
                      "Crochet Corner" && (
                      <div className="empty-character-row">
                        🧶 🪝 🧵 📿 🪡 ✂️
                      </div>
                    )}
                                    </div>
                </div>
              )}
            </section>

          </div>

        </main>
      )}

      {/* FOOTER */}

      <footer className="footer">

        <div>

          <h2>
            LOOPA
          </h2>

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
              openShop("Shoes")
            }
          >
            Shoes
          </button>

          <button
            onClick={() =>
              openShop("Bags")
            }
          >
            Bags
          </button>

          <button
            onClick={() =>
              openShop(
                "Accessories"
              )
            }
          >
            Accessories
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

          {!user && (
            <button
              onClick={() =>
                openAuth("signup")
              }
            >
              Sign Up
            </button>
          )}

          {user && (
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

        <p>
          © 2026 LOOPA. Made with love.
        </p>

      </footer>

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
