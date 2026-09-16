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
  Plus,
  Pencil,
  Trash2,
  Store,
  Package,
  BarChart3,
  DollarSign,
  ClipboardList,
  RefreshCw,
  MessageCircle,
  Send,
  Star,
  Check,
  MapPin,
  CreditCard,
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
      "Your wardrobe, your mood, your moment. Pieces made for every version of you.",
    tags: ["Dresses", "Tops", "Going Out", "Soft Girl", "Baddie"],
    visual: "women",
  },
  Shoes: {
    eyebrow: "STEP INTO IT",
    title: "Shoes",
    description:
      "The finishing touch. Heels, sneakers, flats and little pairs that complete the look.",
    tags: ["Heels", "Sneakers", "Flats", "Sandals", "Boots"],
    visual: "shoes",
  },
  Bags: {
    eyebrow: "CARRY YOUR LOOK",
    title: "Bags",
    description:
      "Mini, shoulder, crossbody or tote — find the bag that makes the outfit.",
    tags: ["Handbags", "Shoulder Bags", "Crossbody", "Mini Bags", "Tote Bags"],
    visual: "bags",
  },
  Accessories: {
    eyebrow: "THE LITTLE DETAILS",
    title: "Accessories",
    description:
      "Jewelry, hair pieces, sunglasses and finishing touches made to pull everything together.",
    tags: ["Jewelry", "Hair Accessories", "Sunglasses", "Belts", "Hats"],
    visual: "accessories",
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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

  const [passwordResetRequested, setPasswordResetRequested] =
    useState(false);

  /* ---------------------------------------
     CHECKOUT STATE
  ---------------------------------------- */

  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("Nairobi");
  const [checkoutNotes, setCheckoutNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [sellerSaving, setSellerSaving] = useState(false);
  const [sellerMessage, setSellerMessage] = useState("");
  const [sellerError, setSellerError] = useState("");
  const [sellerEditingProduct, setSellerEditingProduct] = useState(null);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerOrdersLoading, setSellerOrdersLoading] = useState(false);
  const [sellerOrdersError, setSellerOrdersError] = useState("");
  const [adminProducts, setAdminProducts] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminActionId, setAdminActionId] = useState(null);

  /* ---------------------------------------
     REVIEWS / MESSAGING / CUSTOM / PAYMENTS
  ---------------------------------------- */

  const [productReviews, setProductReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageSending, setMessageSending] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageSeller, setMessageSeller] = useState(null);
  const [messageError, setMessageError] = useState("");

  const [customForm, setCustomForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    referenceUrl: "",
  });
  const [customSubmitting, setCustomSubmitting] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [customError, setCustomError] = useState("");
  const [customRequests, setCustomRequests] = useState([]);

  const [paymentPhone, setPaymentPhone] = useState("");
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [sellerForm, setSellerForm] = useState({
    shopName: "",
    bio: "",
    phone: "",
    logoUrl: "",
  });
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    madeToOrder: false,
    productionDays: "",
    imageUrl: "",
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");


  /* ---------------------------------------
     ENSURE PROFILE
  ---------------------------------------- */

  const ensureProfile = async (authUser) => {
    if (!authUser?.id) return null;

    const { data: existing, error: readError } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, avatar_url, role")
      .eq("id", authUser.id)
      .maybeSingle();

    if (readError) {
      console.error("LOOPA profile lookup error:", readError);
      return null;
    }

    if (existing) return existing;

    const { data: created, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: authUser.id,
        email: authUser.email || "",
        full_name:
          authUser.user_metadata?.full_name ||
          authUser.user_metadata?.name ||
          "",
      })
      .select("id, full_name, email, phone, avatar_url, role")
      .single();

    if (createError) {
      console.error("LOOPA profile creation error:", createError);
      return null;
    }

    return created;
  };

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
        await ensureProfile(user);
        await loadProfile(user.id);
        await loadOrders(user.id);
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

        if (_event === "PASSWORD_RECOVERY") {
          setUser(currentUser);
          setAuthMode("reset");
          setAuthError("");
          setAuthMessage("");
          setPassword("");
          setConfirmPassword("");
          setPage("auth");
          setAuthLoading(false);
          return;
        }

        setUser(currentUser);

        if (currentUser) {
          await ensureProfile(currentUser);
          await loadProfile(currentUser.id);
          await loadOrders(currentUser.id);
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
    if (!userId) {
      setProfile(null);
      return null;
    }

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
    return data;
  };

  /* ---------------------------------------
     LOAD CUSTOMER ORDERS
  ---------------------------------------- */

  const loadOrders = async (userId) => {
    if (!userId) {
      setOrders([]);
      return;
    }

    setOrdersLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("id, buyer_id, total_amount, status, shipping_address, payment_method, payment_status, created_at")
      .eq("buyer_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOOPA orders loading error:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setOrdersLoading(false);
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
        const products = productData || [];
        let productsWithImages = products;

        if (products.length > 0) {
          const productIds = products.map((product) => product.id);
          const { data: imageData, error: imageError } = await supabase
            .from("images")
            .select("id, product_id, image_url, sort_order")
            .in("product_id", productIds)
            .order("sort_order", { ascending: true });

          if (imageError) {
            console.warn(
              "LOOPA product images could not be loaded yet:",
              imageError
            );
          } else {
            const firstImageByProduct = {};
            (imageData || []).forEach((image) => {
              if (
                image.product_id &&
                image.image_url &&
                !firstImageByProduct[image.product_id]
              ) {
                firstImageByProduct[image.product_id] = image.image_url;
              }
            });

            productsWithImages = products.map((product) => ({
              ...product,
              image_url: firstImageByProduct[product.id] || null,
            }));
          }
        }

        setDbProducts(productsWithImages);
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
    setSelectedProduct(null);
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
    setCart((old) => {
      const existingItem = old.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return old.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...old,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const addProductQuantityToBag = (product, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);

    setCart((old) => {
      const existingItem = old.find((item) => item.id === product.id);
      const stockLimit =
        product.stock !== null && product.stock !== undefined
          ? Number(product.stock)
          : null;

      if (existingItem) {
        const nextQuantity = (existingItem.quantity || 1) + safeQuantity;
        const finalQuantity =
          stockLimit !== null
            ? Math.min(nextQuantity, stockLimit)
            : nextQuantity;

        return old.map((item) =>
          item.id === product.id
            ? { ...item, quantity: finalQuantity }
            : item
        );
      }

      return [...old, { ...product, quantity: stockLimit !== null ? Math.min(safeQuantity, stockLimit) : safeQuantity }];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((old) =>
      old.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: (item.quantity || 1) - 1,
              }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  const removeFromBag = (productId) => {
    setCart((old) =>
      old.filter((item) => item.id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        (item.quantity || 1),
    0
  );

  /* ---------------------------------------
     CHECKOUT
  ---------------------------------------- */

  const openCheckout = () => {
    setCheckoutError("");

    if (!user) {
      setAuthMessage("Please log in to continue to checkout.");
      openAuth("login");
      return;
    }

    if (cart.length === 0) {
      setPage("bag");
      return;
    }

    setCheckoutName(
      profile?.full_name ||
        profile?.name ||
        ""
    );
    setPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setCheckoutError("");

    if (!user) {
      setAuthMessage("Please log in to place your order.");
      openAuth("login");
      return;
    }

    if (cart.length === 0) {
      setCheckoutError("Your bag is empty. Add something before checking out.");
      return;
    }

    if (!checkoutName.trim() || !checkoutPhone.trim() || !checkoutAddress.trim() || !checkoutCity.trim()) {
      setCheckoutError("Please complete your name, phone number, delivery address, and city.");
      return;
    }

    if (paymentMethod === "M-Pesa" && !paymentPhone.trim()) {
      setCheckoutError("Please enter the M-Pesa phone number for this payment.");
      return;
    }

    setCheckoutSubmitting(true);

    const shippingAddress = [
      checkoutAddress.trim(),
      checkoutCity.trim(),
    ].filter(Boolean).join(", ");

    const orderPayload = {
      buyer_id: user.id,
      total_amount: cartSubtotal,
      status: "pending",
      shipping_address: shippingAddress,
      shipping_phone: checkoutPhone.trim(),
      notes: checkoutNotes.trim() || null,
      payment_method: paymentMethod,
      payment_status: paymentMethod === "Cash on Delivery" ? "pending" : "pending",
    };

    const { data, error } = await supabase
      .from("orders")
      .insert(orderPayload)
      .select()
      .single();

    if (error) {
      console.error("LOOPA order error:", error);
      setCheckoutError(
        error.message ||
          "We couldn't place your order right now. Please try again."
      );
      setCheckoutSubmitting(false);
      return;
    }

    // Save each purchased item so creators can see their sales.
    const orderItems = cart.map((item) => ({
      order_id: data.id,
      product_id: item.id,
      seller_id: item.seller_id || null,
      quantity: item.quantity || 1,
      unit_price: Number(item.price || 0),
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("LOOPA order items error:", orderItemsError);
      // Keep the order itself intact, but tell the shopper that order tracking
      // may be incomplete until the order_items table/RLS is configured.
      setCheckoutError(
        "Your order was created, but we couldn't save its item details. Please contact LOOPA support before placing another order."
      );
      setPlacedOrder(data);
      setCheckoutSubmitting(false);
      return;
    }

    const paymentResult = await createPaymentRecord(data);
    if (paymentResult.error) {
      console.error("LOOPA payment record error:", paymentResult.error);
      setCheckoutError("Your order was created, but the payment record could not be saved. Please contact LOOPA support.");
      setPlacedOrder(data);
      setCheckoutSubmitting(false);
      return;
    }

    setPlacedOrder(data);
    setCart([]);
    setCheckoutSubmitting(false);
    setPage("order-success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------------------------------
     PASSWORD RESET
  ---------------------------------------- */

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setAuthError("Please enter the email address for your LOOPA account.");
      return;
    }

    setAuthSubmitting(true);

    const redirectTo = `${window.location.origin}/`;

    const { error } = await supabase.auth.resetPasswordForEmail(
      trimmedEmail,
      { redirectTo }
    );

    if (error) {
      setAuthError(
        error.message ||
          "We couldn't send the password reset email. Please try again."
      );
      setAuthSubmitting(false);
      return;
    }

    setPasswordResetRequested(true);
    setAuthMessage(
      "Password reset email sent. Check your inbox and open the link to create a new password. 💕"
    );
    setAuthSubmitting(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthMessage("");

    if (password.length < 6) {
      setAuthError("Your new password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("Your passwords do not match.");
      return;
    }

    setAuthSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setAuthError(
        error.message ||
          "We couldn't update your password. Please request another reset email."
      );
      setAuthSubmitting(false);
      return;
    }

    await supabase.auth.signOut();

    setUser(null);
    setProfile(null);
    setPassword("");
    setConfirmPassword("");
    setAuthMode("login");
    setPasswordResetRequested(false);
    setAuthMessage(
      "Your password has been updated successfully. You can now log in. 💕"
    );
    setAuthSubmitting(false);
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

    const ensuredProfile = await ensureProfile(data.user);
    if (ensuredProfile) {
      setProfile(ensuredProfile);
    } else {
      await loadProfile(data.user.id);
    }

    setAuthMessage("Welcome back to LOOPA 💕");
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
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: data.user.id,
            email: data.user.email || email.trim(),
            full_name: fullName.trim(),
          },
          { onConflict: "id" }
        );

      if (profileError) {
        console.error("LOOPA profile save error:", profileError);
      }

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
     REVIEWS
  ---------------------------------------- */

  const loadProductReviews = async (productId) => {
    if (!productId) return;
    setReviewsLoading(true);
    setReviewError("");
    const { data, error } = await supabase
      .from("reviews")
      .select("id, product_id, buyer_id, rating, comment, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("LOOPA reviews loading error:", error);
      setProductReviews([]);
      setReviewError(error.message || "Reviews could not be loaded.");
    } else {
      setProductReviews(data || []);
    }
    setReviewsLoading(false);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewMessage("");
    setReviewError("");
    if (!user) {
      openAuth("login");
      return;
    }
    if (!selectedProduct) return;
    if (!reviewComment.trim()) {
      setReviewError("Please add a short review.");
      return;
    }
    setReviewSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      product_id: selectedProduct.id,
      buyer_id: user.id,
      rating: Number(reviewRating),
      comment: reviewComment.trim(),
    });
    if (error) {
      setReviewError(error.message || "We couldn't submit your review.");
    } else {
      setReviewComment("");
      setReviewRating(5);
      setReviewMessage("Your review has been added. ♡");
      await loadProductReviews(selectedProduct.id);
    }
    setReviewSubmitting(false);
  };

  /* ---------------------------------------
     MESSAGING
  ---------------------------------------- */

  const openMessaging = async (sellerId, product = null) => {
    if (!user) {
      openAuth("login");
      return;
    }
    if (!sellerId || sellerId === user.id) return;
    setMessageError("");
    setMessageSeller({ id: sellerId, product });
    setMessages([]);
    setPage("messages");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const { data: existingRows } = await supabase
      .from("conversations")
      .select("id, subject, created_at")
      .eq("buyer_id", user.id)
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false })
      .limit(1);

    let conversation = existingRows?.[0] || null;
    if (!conversation) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ buyer_id: user.id, seller_id: sellerId, subject: product?.name ? `Question about ${product.name}` : "LOOPA message" })
        .select("id, subject, created_at")
        .single();
      if (error) {
        setMessageError(error.message || "We couldn't start this conversation.");
        return;
      }
      conversation = data;
    }

    setActiveConversation(conversation);
    await loadConversationMessages(conversation.id);
  };

  const loadConversationMessages = async (conversationId) => {
    if (!conversationId) return;
    setMessagesLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("id, conversation_id, sender_id, body, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (error) {
      setMessageError(error.message || "Messages could not be loaded.");
      setMessages([]);
    } else {
      setMessages(data || []);
    }
    setMessagesLoading(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user || !activeConversation || !messageText.trim()) return;
    setMessageSending(true);
    setMessageError("");
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: activeConversation.id,
        sender_id: user.id,
        body: messageText.trim(),
      })
      .select("id, conversation_id, sender_id, body, created_at")
      .single();
    if (error) {
      setMessageError(error.message || "We couldn't send your message.");
    } else {
      setMessages((old) => [...old, data]);
      setMessageText("");
    }
    setMessageSending(false);
  };

  /* ---------------------------------------
     CUSTOM REQUESTS
  ---------------------------------------- */

  const loadCustomRequests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("custom_requests")
      .select("id, title, description, category, budget, deadline, reference_url, status, created_at")
      .eq("buyer_id", user.id)
      .order("created_at", { ascending: false });
    setCustomRequests(data || []);
  };

  const submitCustomRequest = async (e) => {
    e.preventDefault();
    setCustomError("");
    setCustomMessage("");
    if (!user) {
      openAuth("login");
      return;
    }
    if (!customForm.title.trim() || !customForm.description.trim()) {
      setCustomError("Please add a title and describe what you want made.");
      return;
    }
    setCustomSubmitting(true);
    const { error } = await supabase.from("custom_requests").insert({
      buyer_id: user.id,
      title: customForm.title.trim(),
      description: customForm.description.trim(),
      category: customForm.category.trim() || null,
      budget: customForm.budget ? Number(customForm.budget) : null,
      deadline: customForm.deadline || null,
      reference_url: customForm.referenceUrl.trim() || null,
      status: "open",
    });
    if (error) {
      setCustomError(error.message || "We couldn't submit your request.");
    } else {
      setCustomForm({ title: "", description: "", category: "", budget: "", deadline: "", referenceUrl: "" });
      setCustomMessage("Your custom request has been sent to LOOPA. ♡");
      await loadCustomRequests();
    }
    setCustomSubmitting(false);
  };

  /* ---------------------------------------
     PAYMENTS
  ---------------------------------------- */

  const createPaymentRecord = async (order) => {
    if (!user || !order?.id) return { error: null };
    const { data, error } = await supabase
      .from("payments")
      .insert({
        order_id: order.id,
        buyer_id: user.id,
        amount: Number(order.total_amount || cartSubtotal),
        method: paymentMethod,
        phone: paymentMethod === "M-Pesa" ? paymentPhone.trim() : null,
        status: "pending",
      })
      .select()
      .single();
    if (!error) setPaymentMessage("Payment record created. Your payment is pending confirmation.");
    return { data, error };
  };

  const updateSellerOrderStatus = async (orderId, nextStatus) => {
    if (!user || !orderId) return;
    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);
    if (error) {
      setSellerOrdersError(error.message || "We couldn't update this order.");
      return;
    }
    await loadSellerOrders(user.id);
  };

  /* ---------------------------------------
     SELLER DASHBOARD
  ---------------------------------------- */

  const resetSellerProductForm = () => {
    setSellerEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: dbCategories[0]?.id || "",
      madeToOrder: false,
      productionDays: "",
      imageUrl: "",
    });
    setProductImageFile(null);
    setProductImagePreview("");
  };

  const loadSellerDashboard = async (userId) => {
    if (!userId) return;

    setSellerLoading(true);
    setSellerError("");

    const { data: sellerData, error: sellerErrorData } = await supabase
      .from("seller_profiles")
      .select("id, user_id, shop_name, bio, phone, logo_url")
      .eq("user_id", userId)
      .maybeSingle();

    if (sellerErrorData && sellerErrorData.code !== "PGRST116") {
      console.warn("LOOPA seller profile loading error:", sellerErrorData);
    }

    setSellerProfile(sellerData || null);
    setSellerForm({
      shopName: sellerData?.shop_name || "",
      bio: sellerData?.bio || "",
      phone: sellerData?.phone || profile?.phone || "",
      logoUrl: sellerData?.logo_url || "",
    });

    const sellerId = sellerData?.id;

    if (!sellerId) {
      setSellerError("Your seller profile could not be found.");
      setSellerProducts([]);
      setSellerLoading(false);
      return;
    }

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, description, price, stock, status, seller_id, category_id, made_to_order, production_days, created_at")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (productsError) {
      setSellerError(productsError.message || "We couldn't load your products.");
      setSellerProducts([]);
    } else {
      const productList = products || [];
      let withImages = productList;
      if (productList.length) {
        const ids = productList.map((item) => item.id);
        const { data: images } = await supabase
          .from("images")
          .select("id, product_id, image_url, sort_order")
          .in("product_id", ids)
          .order("sort_order", { ascending: true });
        const first = {};
        (images || []).forEach((image) => {
          if (image.product_id && image.image_url && !first[image.product_id]) {
            first[image.product_id] = image.image_url;
          }
        });
        withImages = productList.map((item) => ({ ...item, image_url: first[item.id] || null }));
      }
      setSellerProducts(withImages);
    }

    setSellerLoading(false);
  };

  const loadSellerOrders = async (userId) => {
    if (!userId) {
      setSellerOrders([]);
      return;
    }

    setSellerOrdersLoading(true);
    setSellerOrdersError("");

    const { data: sellerData, error: sellerProfileError } = await supabase
      .from("seller_profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (sellerProfileError || !sellerData?.id) {
      setSellerOrders([]);
      setSellerOrdersError(
        sellerProfileError?.message || "Your seller profile could not be found."
      );
      setSellerOrdersLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("order_items")
      .select(`
        id,
        order_id,
        product_id,
        seller_id,
        quantity,
        unit_price,
        created_at,
        orders:order_id (
          id,
          customer_id,
          order_number,
          status,
          subtotal,
          delivery_fee,
          total_amount,
          delivery_address,
          delivery_phone,
          notes,
          created_at
        ),
        products:product_id (
          id,
          name
        )
      `)
      .eq("seller_id", sellerData.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOOPA seller orders loading error:", error);
      setSellerOrders([]);
      setSellerOrdersError(error.message || "We couldn't load your sales right now.");
    } else {
      setSellerOrders(data || []);
    }

    setSellerOrdersLoading(false);
  };

  const loadAdminProducts = async () => {
    setAdminLoading(true);
    setAdminError("");

    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", user?.id || "")
      .maybeSingle();

    if (profileError) {
      setAdminError(profileError.message || "We couldn't verify your admin access.");
      setAdminLoading(false);
      return;
    }

    if (currentProfile?.role !== "admin") {
      setAdminError("Admin access is required to review products.");
      setAdminLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select(`
        id, seller_id, name, description, price, stock, status, made_to_order, production_days, created_at,
        categories:category_id (id, name),
        images:product_id (id, image_url, sort_order)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      // Fall back to a simpler query if the nested images relationship isn't available.
      const fallback = await supabase
        .from("products")
        .select("id, seller_id, name, description, price, stock, status, made_to_order, production_days, created_at, category_id")
        .order("created_at", { ascending: false });

      if (fallback.error) {
        setAdminError(fallback.error.message || "We couldn't load products for approval.");
        setAdminProducts([]);
      } else {
        setAdminProducts(fallback.data || []);
      }
    } else {
      const normalized = (data || []).map((item) => ({
        ...item,
        image_url: Array.isArray(item.images)
          ? item.images.sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))[0]?.image_url || null
          : null,
      }));
      setAdminProducts(normalized);
    }

    setAdminLoading(false);
  };

  const openAdminApproval = async () => {
    if (!user) {
      openAuth("login");
      return;
    }

    const liveProfile = await loadProfile(user.id);
    if (liveProfile?.role !== "admin") {
      setAdminError("Admin access is required to review products.");
      return;
    }

    await loadAdminProducts();
    setPage("admin");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateAdminProductStatus = async (productId, status) => {
    setAdminActionId(productId);
    setAdminError("");

    const { data: liveProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id || "")
      .maybeSingle();

    if (liveProfile?.role !== "admin") {
      setAdminError("Admin access is required to review products.");
      setAdminActionId(null);
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({ status })
      .eq("id", productId);

    if (error) {
      setAdminError(error.message || "We couldn't update this product.");
      setAdminActionId(null);
      return;
    }

    await loadAdminProducts();
    setAdminActionId(null);
  };

  const AdminApprovalPage = () => {
    const pending = adminProducts.filter((item) => item.status === "pending");

    return (
      <main className="admin-approval-page">
        <section className="seller-dashboard-hero">
          <div>
            <p className="standard-eyebrow">LOOPA ADMIN</p>
            <h1>Product Approval</h1>
            <p>Review creator submissions before they appear in the public LOOPA shop.</p>
          </div>
          <div className="seller-hero-icon">✓</div>
        </section>

        <section className="admin-approval-section">
          <div className="section-heading">
            <div>
              <p className="standard-eyebrow">SUBMISSIONS</p>
              <h2>Pending products</h2>
            </div>
            <button className="secondary-button" type="button" onClick={loadAdminProducts}>Refresh</button>
          </div>

          {adminError && <p className="seller-error">{adminError}</p>}
          {adminLoading ? (
            <div className="empty-shop"><h2>Loading submissions...</h2></div>
          ) : pending.length === 0 ? (
            <div className="empty-shop"><h2>No pending products.</h2><p>New creator submissions will appear here.</p></div>
          ) : (
            <div className="admin-product-list">
              {pending.map((product) => (
                <article className="admin-product-card" key={product.id}>
                  <div className="admin-product-image">
                    {product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>LOOPA</span>}
                  </div>
                  <div className="admin-product-info">
                    <p className="standard-eyebrow">PENDING REVIEW</p>
                    <h2>{product.name}</h2>
                    <p>{product.description || "No description provided."}</p>
                    <strong>KES {Number(product.price || 0).toLocaleString()}</strong>
                    <p>{product.made_to_order ? `Made to order${product.production_days ? ` • ${product.production_days} days` : ""}` : `${Number(product.stock || 0).toLocaleString()} in stock`}</p>
                    <div className="admin-product-actions">
                      <button className="primary-button" type="button" disabled={adminActionId === product.id} onClick={() => updateAdminProductStatus(product.id, "approved")}>
                        {adminActionId === product.id ? "Updating..." : "Approve"}
                      </button>
                      <button className="secondary-button" type="button" disabled={adminActionId === product.id} onClick={() => updateAdminProductStatus(product.id, "rejected")}>Reject</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {adminProducts.filter((item) => item.status === "approved").length > 0 && (
            <div className="admin-approved-list">
              <p className="standard-eyebrow">APPROVED</p>
              <h2>{adminProducts.filter((item) => item.status === "approved").length} approved product(s)</h2>
            </div>
          )}
        </section>
      </main>
    );
  };

  const refreshSellerStudio = async () => {
    if (!user) return;
    setSellerMessage("");
    await Promise.all([
      loadSellerDashboard(user.id),
      loadSellerOrders(user.id),
    ]);
    setSellerMessage("Your Creator Studio is up to date. ♡");
  };

  const openSellerDashboard = async () => {
    if (!user) {
      openAuth("login");
      return;
    }
    setSellerMessage("");
    setSellerError("");
    await Promise.all([
      loadSellerDashboard(user.id),
      loadSellerOrders(user.id),
    ]);
    setPage("seller");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveSellerProfile = async (e) => {
    e.preventDefault();
    setSellerMessage("");
    setSellerError("");
    if (!sellerForm.shopName.trim()) {
      setSellerError("Please enter your shop name.");
      return;
    }
    setSellerSaving(true);

    const payload = {
      user_id: user.id,
      shop_name: sellerForm.shopName.trim(),
      bio: sellerForm.bio.trim() || null,
      phone: sellerForm.phone.trim() || null,
      logo_url: sellerForm.logoUrl.trim() || null,
    };

    const { data, error } = await supabase
      .from("seller_profiles")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      setSellerError(error.message || "We couldn't save your shop profile.");
    } else {
      setSellerProfile(data);
      setSellerMessage("Your shop profile has been saved. ♡");
    }
    setSellerSaving(false);
  };

  const editSellerProduct = (product) => {
    setSellerEditingProduct(product);
    setProductForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      categoryId: product.category_id || "",
      madeToOrder: Boolean(product.made_to_order),
      productionDays: product.production_days ?? "",
      imageUrl: product.image_url || "",
    });
    setProductImageFile(null);
    setProductImagePreview(product.image_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSellerError("Please choose an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSellerError("Please choose an image smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setSellerError("");
    setProductImageFile(file);
    setProductImagePreview(URL.createObjectURL(file));
  };

  const saveSellerProduct = async (e) => {
    e.preventDefault();
    setSellerMessage("");
    setSellerError("");

    if (!productForm.name.trim() || !productForm.price || !productForm.categoryId) {
      setSellerError("Please add a product name, price, and category.");
      return;
    }

    if (!sellerEditingProduct && !productImageFile) {
      setSellerError("Please choose a product image before submitting.");
      return;
    }

    setSellerSaving(true);

    const sellerId = sellerProfile?.id || (await supabase
      .from("seller_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()).data?.id;

    if (!sellerId) {
      setSellerError("Your seller profile could not be found.");
      setSellerSaving(false);
      return;
    }

    const payload = {
      name: productForm.name.trim(),
      description: productForm.description.trim() || null,
      price: Number(productForm.price),
      stock: Number(productForm.stock || 0),
      category_id: productForm.categoryId,
      made_to_order: Boolean(productForm.madeToOrder),
      production_days: productForm.madeToOrder ? Number(productForm.productionDays || 0) : null,
      seller_id: sellerId,
    };

    let productId = sellerEditingProduct?.id;
    let productData;
    let error;

    if (productId) {
      ({ data: productData, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId)
        .eq("seller_id", sellerId)
        .select()
        .single());
    } else {
      ({ data: productData, error } = await supabase
        .from("products")
        .insert({ ...payload, status: "pending" })
        .select()
        .single());
      productId = productData?.id;
    }

    if (error) {
      setSellerError(error.message || "We couldn't save this product.");
      setSellerSaving(false);
      return;
    }

    if (productImageFile && productId) {
      const extension = productImageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeName = productImageFile.name
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);
      const filePath = `${user.id}/${productId}-${Date.now()}-${safeName || `product.${extension}`}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, productImageFile, {
          upsert: false,
          contentType: productImageFile.type,
          cacheControl: "3600",
        });

      if (uploadError) {
        setSellerError(uploadError.message || "We couldn't upload your product image.");
        setSellerSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData?.publicUrl;

      if (!imageUrl) {
        setSellerError("The image uploaded, but we couldn't create its public URL.");
        setSellerSaving(false);
        return;
      }

      const { data: existingImage, error: imageLookupError } = await supabase
        .from("images")
        .select("id")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (imageLookupError) {
        setSellerError(imageLookupError.message || "We couldn't save the product image.");
        setSellerSaving(false);
        return;
      }

      if (existingImage?.id) {
        const { error: imageUpdateError } = await supabase
          .from("images")
          .update({ image_url: imageUrl })
          .eq("id", existingImage.id);

        if (imageUpdateError) {
          setSellerError(imageUpdateError.message || "We couldn't save the product image.");
          setSellerSaving(false);
          return;
        }
      } else {
        const { error: imageInsertError } = await supabase
          .from("images")
          .insert({
            product_id: productId,
            image_url: imageUrl,
            sort_order: 0,
          });

        if (imageInsertError) {
          setSellerError(imageInsertError.message || "We couldn't save the product image.");
          setSellerSaving(false);
          return;
        }
      }
    }

    await loadSellerDashboard(user.id);
    resetSellerProductForm();
    setSellerMessage(sellerEditingProduct ? "Product updated successfully. ♡" : "Product submitted for approval. ♡");
    setSellerSaving(false);
  };

  const deleteSellerProduct = async (productId) => {
    if (!window.confirm("Remove this product from your shop?")) return;
    setSellerError("");
    const sellerId = sellerProfile?.id || (await supabase
      .from("seller_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()).data?.id;

    if (!sellerId) {
      setSellerError("Your seller profile could not be found.");
      return;
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .eq("seller_id", sellerId);
    if (error) {
      setSellerError(error.message || "We couldn't remove this product.");
      return;
    }
    await loadSellerDashboard(user.id);
    setSellerMessage("Product removed.");
  };

  const SellerDashboardPage = () => {
    const totalProducts = sellerProducts.length;
    const approvedProducts = sellerProducts.filter((item) => item.status === "approved").length;
    const pendingProducts = sellerProducts.filter((item) => item.status === "pending").length;
    const soldUnits = sellerOrders.reduce((total, item) => total + Number(item.quantity || 0), 0);
    const grossSales = sellerOrders.reduce(
      (total, item) => total + Number(item.unit_price || 0) * Number(item.quantity || 0),
      0
    );
    const activeOrders = sellerOrders.filter(
      (item) => !["delivered", "cancelled", "canceled"].includes(String(item.orders?.status || "").toLowerCase())
    ).length;

    return (
      <main className="seller-dashboard-page">
        <section className="seller-dashboard-hero">
          <div>
            <p className="standard-eyebrow">LOOPA CREATOR STUDIO</p>
            <h1>{sellerProfile?.shop_name || "Build your LOOPA shop."}</h1>
            <p>Create your storefront, add your pieces, and manage your collection from one place.</p>
          </div>
          <div className="seller-hero-icon"><Store size={34} /></div>
        </section>

        <section className="seller-stats-grid">
          <div className="seller-stat"><Package size={20} /><span>Products</span><strong>{totalProducts}</strong></div>
          <div className="seller-stat"><Sparkles size={20} /><span>Approved</span><strong>{approvedProducts}</strong></div>
          <div className="seller-stat"><BarChart3 size={20} /><span>Pending</span><strong>{pendingProducts}</strong></div>
          <div className="seller-stat"><ClipboardList size={20} /><span>Active Orders</span><strong>{activeOrders}</strong></div>
          <div className="seller-stat"><Package size={20} /><span>Units Sold</span><strong>{soldUnits}</strong></div>
          <div className="seller-stat"><DollarSign size={20} /><span>Gross Sales</span><strong>KES {grossSales.toLocaleString()}</strong></div>
        </section>

        {sellerMessage && <div className="seller-success">{sellerMessage}</div>}
        {sellerError && <div className="seller-error">{sellerError}</div>}

        <div className="seller-dashboard-grid">
          <section className="seller-card">
            <div className="seller-card-heading">
              <div><p className="standard-eyebrow">YOUR SHOP</p><h2>Shop profile</h2></div>
              <Store size={22} />
            </div>
            <form onSubmit={saveSellerProfile} className="seller-form">
              <label>Shop name<input value={sellerForm.shopName} onChange={(e) => setSellerForm({ ...sellerForm, shopName: e.target.value })} placeholder="e.g. Mithi Studio" /></label>
              <label>Shop bio<textarea value={sellerForm.bio} onChange={(e) => setSellerForm({ ...sellerForm, bio: e.target.value })} placeholder="Tell LOOPA shoppers what makes your pieces special." rows="4" /></label>
              <label>Phone number<input value={sellerForm.phone} onChange={(e) => setSellerForm({ ...sellerForm, phone: e.target.value })} placeholder="07XX XXX XXX" /></label>
              <label>Shop logo URL <span className="optional-label">Optional</span><input value={sellerForm.logoUrl} onChange={(e) => setSellerForm({ ...sellerForm, logoUrl: e.target.value })} placeholder="https://..." /></label>
              <button className="seller-primary-button" disabled={sellerSaving}>{sellerSaving ? "Saving..." : "Save Shop Profile"}</button>
            </form>
          </section>

          <section className="seller-card">
            <div className="seller-card-heading">
              <div><p className="standard-eyebrow">{sellerEditingProduct ? "EDIT PIECE" : "NEW PIECE"}</p><h2>{sellerEditingProduct ? "Update product" : "Add a product"}</h2></div>
              <Plus size={22} />
            </div>
            <form onSubmit={saveSellerProduct} className="seller-form">
              <label>Product name<input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} placeholder="Product name" /></label>
              <label>Description<textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} placeholder="Describe the piece." rows="4" /></label>
              <div className="seller-form-two">
                <label>Price (KES)<input type="number" min="0" step="1" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} placeholder="2500" /></label>
                <label>Category<select value={productForm.categoryId} onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}><option value="">Select category</option>{dbCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
              </div>
              <label className="seller-checkbox"><input type="checkbox" checked={productForm.madeToOrder} onChange={(e) => setProductForm({ ...productForm, madeToOrder: e.target.checked })} /><span>Made to order</span></label>
              {!productForm.madeToOrder ? <label>Stock<input type="number" min="0" step="1" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} placeholder="10" /></label> : <label>Production days<input type="number" min="1" step="1" value={productForm.productionDays} onChange={(e) => setProductForm({ ...productForm, productionDays: e.target.value })} placeholder="7" /></label>}
              <label className="seller-image-upload-label">
                Product image
                <input type="file" accept="image/*" onChange={handleProductImageChange} />
                <span className="seller-upload-hint">Choose a clear product photo (max 5MB).</span>
              </label>
              {productImagePreview && (
                <div className="seller-image-preview" style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={productImagePreview} alt="Product preview" style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "10px" }} />
                  <span>{productImageFile ? productImageFile.name : "Current product image"}</span>
                </div>
              )}
              <div className="seller-form-actions"><button className="seller-primary-button" disabled={sellerSaving}>{sellerSaving ? "Saving..." : sellerEditingProduct ? "Update Product" : "Submit Product"}</button>{sellerEditingProduct && <button type="button" className="seller-secondary-button" onClick={resetSellerProductForm}>Cancel</button>}</div>
              {!sellerEditingProduct && <p className="seller-note">New products start as pending so they can be reviewed before appearing in the public shop.</p>}
            </form>
          </section>
        </div>

        <section className="seller-card seller-sales-card">
          <div className="seller-card-heading">
            <div><p className="standard-eyebrow">SALES & ORDERS</p><h2>Your sales</h2></div>
            <button type="button" className="seller-refresh-button" onClick={refreshSellerStudio} disabled={sellerOrdersLoading}>
              <RefreshCw size={16} className={sellerOrdersLoading ? "seller-spin" : ""} /> Refresh
            </button>
          </div>

          {sellerOrdersError && <div className="seller-error seller-order-setup-note">{sellerOrdersError}</div>}

          {sellerOrdersLoading ? (
            <div className="seller-empty">Loading your sales...</div>
          ) : sellerOrders.length === 0 ? (
            <div className="seller-empty seller-sales-empty">
              <div className="seller-sales-empty-icon"><DollarSign size={22} /></div>
              <h3>No sales yet.</h3>
              <p>When customers purchase your approved pieces, their orders and sales will appear here.</p>
            </div>
          ) : (
            <div className="seller-order-list">
              {sellerOrders.map((item) => (
                <article className="seller-order-row" key={item.id}>
                  <div className="seller-order-main">
                    <span className="seller-order-number">#{String(item.order_id).slice(0, 8).toUpperCase()}</span>
                    <h3>{item.products?.name || "LOOPA piece"}</h3>
                    <p>{formatOrderDate(item.created_at)} · Qty {item.quantity}</p>
                    {item.orders?.shipping_address && <small>{item.orders.shipping_address}</small>}
                  </div>
                  <div className="seller-order-meta">
                    <strong>KES {(Number(item.unit_price || 0) * Number(item.quantity || 0)).toLocaleString()}</strong>
                    <span className={`seller-status seller-status-${String(item.orders?.status || "pending").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{prettyOrderStatus(item.orders?.status || "pending")}</span>
                    <select value={item.orders?.status || "pending"} onChange={(e) => updateSellerOrderStatus(item.order_id, e.target.value)} aria-label="Update order status">
                      <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="seller-card seller-products-card">
          <div className="seller-card-heading"><div><p className="standard-eyebrow">YOUR COLLECTION</p><h2>Products</h2></div><span>{totalProducts} total</span></div>
          {sellerLoading ? <div className="seller-empty">Loading your products...</div> : sellerProducts.length === 0 ? <div className="seller-empty"><h3>Your collection is empty.</h3><p>Add your first piece above and send it for review.</p></div> : <div className="seller-product-list">{sellerProducts.map((product) => <article className="seller-product-row" key={product.id}><div className="seller-product-thumb">{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>LOOPA</span>}</div><div className="seller-product-main"><h3>{product.name}</h3><p>KES {Number(product.price || 0).toLocaleString()} · {product.stock == null ? "Made to Order" : `${product.stock} in stock`}</p></div><span className={`seller-status seller-status-${product.status || "pending"}`}>{prettyOrderStatus(product.status || "pending")}</span><div className="seller-product-actions"><button onClick={() => editSellerProduct(product)} aria-label={`Edit ${product.name}`}><Pencil size={17} /></button><button onClick={() => deleteSellerProduct(product.id)} aria-label={`Delete ${product.name}`}><Trash2 size={17} /></button></div></article>)}</div>}
        </section>
      </main>
    );
  };

  /* ---------------------------------------
     MESSAGES PAGE
  ---------------------------------------- */

  const MessagesPage = () => (
    <main className="messages-page">
      <div className="messages-header">
        <button className="bag-back" onClick={() => setPage("home")}>← Back to LOOPA</button>
        <p className="standard-eyebrow">LOOPA MESSAGES</p>
        <h1>Talk to a creator.</h1>
        <p>Keep questions, customization details, and order conversations in one place.</p>
      </div>
      <section className="messages-card">
        {messageError && <div className="community-error">{messageError}</div>}
        {activeConversation ? <>
          <div className="conversation-header"><div><p className="standard-eyebrow">CONVERSATION</p><h2>{activeConversation.subject || "LOOPA message"}</h2></div><span>Creator</span></div>
          <div className="message-thread">{messagesLoading ? <p className="community-muted">Loading messages...</p> : messages.length === 0 ? <p className="community-muted">Start the conversation below.</p> : messages.map((message) => <div key={message.id} className={`message-bubble ${message.sender_id === user.id ? "mine" : "theirs"}`}><p>{message.body}</p><small>{formatOrderDate(message.created_at)}</small></div>)}</div>
          <form className="message-compose" onSubmit={sendMessage}><textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows="2" placeholder="Write a message..." /><button className="checkout-primary-button" disabled={messageSending}>{messageSending ? "Sending..." : <><Send size={17} /> Send</>}</button></form>
        </> : <div className="messages-empty"><MessageCircle size={28} /><h2>No conversation selected.</h2><p>Open a product and tap “Message Creator” to start.</p></div>}
      </section>
    </main>
  );

  /* ---------------------------------------
     CUSTOM REQUEST PAGE
  ---------------------------------------- */

  const CustomRequestPage = () => {
    useEffect(() => { if (user) loadCustomRequests(); }, [user]);
    return (
      <main className="custom-request-page">
        <div className="custom-request-header"><button className="bag-back" onClick={() => setPage("home")}>← Back to LOOPA</button><p className="standard-eyebrow">LOOPA CUSTOM</p><h1>Dream it. Make it LOOPA.</h1><p>Tell us what you want made and a creator can help bring it to life.</p></div>
        <div className="custom-request-layout">
          <form className="custom-request-form" onSubmit={submitCustomRequest}>
            <label>Request title<input value={customForm.title} onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })} placeholder="e.g. Pink crochet birthday dress" /></label>
            <label>What would you like made?<textarea value={customForm.description} onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })} rows="6" placeholder="Describe the style, color, size, materials, or special details." /></label>
            <div className="seller-form-two"><label>Category<input value={customForm.category} onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })} placeholder="Clothing, bag, crochet..." /></label><label>Budget (KES)<input type="number" min="0" value={customForm.budget} onChange={(e) => setCustomForm({ ...customForm, budget: e.target.value })} placeholder="Optional" /></label></div>
            <label>Needed by <span className="optional-label">Optional</span><input type="date" value={customForm.deadline} onChange={(e) => setCustomForm({ ...customForm, deadline: e.target.value })} /></label>
            <label>Reference image URL <span className="optional-label">Optional</span><input value={customForm.referenceUrl} onChange={(e) => setCustomForm({ ...customForm, referenceUrl: e.target.value })} placeholder="https://..." /></label>
            {customError && <div className="community-error">{customError}</div>}{customMessage && <div className="community-success">{customMessage}</div>}
            <button className="checkout-primary-button" type="submit" disabled={customSubmitting}>{customSubmitting ? "Sending..." : <><Sparkles size={17} /> Send Custom Request</>}</button>
          </form>
          <aside className="custom-request-aside"><p className="standard-eyebrow">YOUR REQUESTS</p><h2>Custom pieces</h2>{customRequests.length === 0 ? <p className="community-muted">Your submitted custom requests will appear here.</p> : <div className="custom-request-list">{customRequests.map((request) => <article key={request.id}><strong>{request.title}</strong><span>{prettyOrderStatus(request.status || "open")}</span><p>{request.description}</p></article>)}</div>}</aside>
        </div>
      </main>
    );
  };

  /* ---------------------------------------
     PRODUCT DETAIL
  ---------------------------------------- */

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setProductReviews([]);
    loadProductReviews(product.id);
    setPage("product");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    const product = selectedProduct;
    const hasImage = Boolean(product.image_url);
    const isOutOfStock =
      product.stock !== null && product.stock !== undefined && Number(product.stock) <= 0;
    const stockLimit =
      product.stock !== null && product.stock !== undefined
        ? Number(product.stock)
        : null;

    const relatedProducts = dbProducts
      .filter((item) => item.id !== product.id && item.category_id === product.category_id)
      .slice(0, 4);

    const handleAddToBag = () => {
      addProductQuantityToBag(product, selectedQuantity);
      setSelectedQuantity(1);
    };

    return (
      <main className="product-detail-page">
        <button
          type="button"
          className="back-home product-detail-back"
          onClick={() => setPage("shop")}
        >
          ← Back to {activeCategory || "LOOPA"}
        </button>

        <section className="product-detail-layout">
          <div className="product-detail-media">
            {hasImage ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-detail-photo"
              />
            ) : (
              <div className="product-detail-placeholder">
                <span>LOOPA</span>
                <small>IMAGE COMING SOON</small>
              </div>
            )}
          </div>

          <div className="product-detail-copy">
            <p className="product-detail-eyebrow">
              {product.made_to_order ? "MADE TO ORDER" : "LOOPA EDIT"}
            </p>

            <h1>{product.name}</h1>

            <p className="product-detail-price">
              KES {Number(product.price || 0).toLocaleString()}
            </p>

            {product.description && (
              <p className="product-detail-description">
                {product.description}
              </p>
            )}

            <div className="product-detail-divider" />

            <div className="product-detail-meta">
              <div>
                <span>Availability</span>
                <strong>
                  {isOutOfStock
                    ? "Out of stock"
                    : product.made_to_order
                    ? "Made to order"
                    : stockLimit !== null
                    ? `${stockLimit} available`
                    : "Available"}
                </strong>
              </div>

              {product.made_to_order && product.production_days && (
                <div>
                  <span>Production time</span>
                  <strong>{product.production_days} days</strong>
                </div>
              )}
            </div>

            {!isOutOfStock && (
              <div className="product-detail-buy-row">
                <div className="detail-quantity-control" aria-label="Quantity">
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                  >−</button>
                  <span>{selectedQuantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuantity((value) =>
                        stockLimit !== null ? Math.min(stockLimit, value + 1) : value + 1
                      )
                    }
                    aria-label="Increase quantity"
                  >+</button>
                </div>

                <button
                  type="button"
                  className="product-detail-add"
                  onClick={handleAddToBag}
                >
                  Add {selectedQuantity > 1 ? `${selectedQuantity} to Bag` : "to Bag"}
                </button>

                <button
                  type="button"
                  className={`product-detail-wishlist${
                    wishlist.includes(product.id) ? " active" : ""
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={
                    wishlist.includes(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <Heart
                    size={20}
                    fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            )}

            {isOutOfStock && (
              <div className="product-detail-actions">
                <button type="button" className="product-detail-add" disabled>
                  Out of Stock
                </button>
                <button
                  type="button"
                  className={`product-detail-wishlist${wishlist.includes(product.id) ? " active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            )}

            <div className="product-detail-note">
              <span>LOOPA</span>
              <p>Your Style. Your World.</p>
            </div>
          </div>
        </section>

        <section className="product-community-section">
          <div className="product-community-grid">
            <section className="product-community-card">
              <p className="standard-eyebrow">REVIEWS</p>
              <div className="review-heading-row">
                <div>
                  <h2>What shoppers think</h2>
                  <p>{productReviews.length} review{productReviews.length === 1 ? "" : "s"}</p>
                </div>
                <div className="review-average">
                  <Star size={17} fill="currentColor" />
                  <strong>{productReviews.length ? (productReviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / productReviews.length).toFixed(1) : "—"}</strong>
                </div>
              </div>
              {reviewsLoading ? <p className="community-muted">Loading reviews...</p> : productReviews.length === 0 ? <p className="community-muted">No reviews yet. Be the first to share your experience.</p> : <div className="review-list">{productReviews.map((review) => <article className="review-item" key={review.id}><div className="review-stars">{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill={star <= Number(review.rating) ? "currentColor" : "none"} />)}</div><p>{review.comment}</p><small>{formatOrderDate(review.created_at)}</small></article>)}</div>}
              <form className="review-form" onSubmit={submitReview}>
                <div className="review-form-top"><label>Rating<select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} star{value === 1 ? "" : "s"}</option>)}</select></label><label>Your review<textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows="3" placeholder="What did you think?" /></label></div>
                {reviewError && <div className="community-error">{reviewError}</div>}
                {reviewMessage && <div className="community-success">{reviewMessage}</div>}
                <button className="product-detail-add" type="submit" disabled={reviewSubmitting}>{reviewSubmitting ? "Posting..." : user ? "Post Review" : "Log In to Review"}</button>
              </form>
            </section>

            <section className="product-community-card product-message-card">
              <p className="standard-eyebrow">TALK TO THE CREATOR</p>
              <h2>Have a question?</h2>
              <p>Ask the creator about fit, materials, customization, delivery, or anything else before you order.</p>
              <button type="button" className="checkout-primary-button" onClick={() => openMessaging(product.seller_id, product)}><MessageCircle size={17} /> Message Creator</button>
            </section>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="related-products-heading">
              <div>
                <p className="standard-eyebrow">YOU MAY ALSO LOVE</p>
                <h2>More from this edit</h2>
              </div>
              <button type="button" onClick={() => setPage("shop")}>Shop all <ArrowRight size={16} /></button>
            </div>
            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                ProductCard({ product: item })
              ))}
            </div>
          </section>
        )}
      </main>
    );
  };

  /* ---------------------------------------
     PRODUCT CARD
  ---------------------------------------- */

  const ProductCard = ({ product }) => {
    const hasImage = Boolean(product.image_url);
    const isOutOfStock =
      product.stock !== null && product.stock <= 0;

    return (
      <article
        className="product-card"
        role="button"
        tabIndex={0}
        onClick={() => openProduct(product)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProduct(product);
          }
        }}
      >
        <div className={`product-image${hasImage ? " has-image" : ""}`}>
          <span className="product-tag">
            {product.made_to_order ? "Made to Order" : "Available"}
          </span>

          <button
            type="button"
            className="wishlist-button"
            aria-label={
              wishlist.includes(product.id)
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart
              size={18}
              strokeWidth={1.8}
              fill={wishlist.includes(product.id) ? "currentColor" : "none"}
            />
          </button>

          {hasImage ? (
            <img
              className="product-photo"
              src={product.image_url}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <div className="product-placeholder" aria-hidden="true">
              <span>LOOPA</span>
              <small>IMAGE COMING SOON</small>
            </div>
          )}

          {!isOutOfStock && (
            <button
              type="button"
              className="quick-add-button"
              onClick={(event) => {
                event.stopPropagation();
                addToBag(product);
              }}
            >
              Quick Add
            </button>
          )}
        </div>

        <div className="product-info">
          <p className="seller">LOOPA Creator</p>
          <h3>{product.name}</h3>
          <p className="price">
            KES {Number(product.price).toLocaleString()}
          </p>

          {product.stock !== null && (
            <p className={`stock-note${isOutOfStock ? " out" : ""}`}>
              {isOutOfStock
                ? "Out of stock"
                : `${product.stock} available`}
            </p>
          )}

          <button
            type="button"
            className="add-button"
            onClick={(event) => {
              event.stopPropagation();
              addToBag(product);
            }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Bag"}
          </button>
        </div>
      </article>
    );
  };

  /* ---------------------------------------
     AUTH PAGE
  ---------------------------------------- */

  const AuthPage = () => {
    const isLogin = authMode === "login";
    const isSignup = authMode === "signup";
    const isForgot = authMode === "forgot";
    const isReset = authMode === "reset";

    const title = isLogin
      ? "Welcome back."
      : isSignup
      ? "Create your account."
      : isForgot
      ? "Reset your password."
      : "Create a new password.";

    const eyebrow = isLogin
      ? "WELCOME BACK"
      : isSignup
      ? "JOIN THE LOOPA WORLD"
      : isForgot
      ? "PASSWORD RESET"
      : "NEW PASSWORD";

    const intro = isLogin
      ? "Log in to save your favorites, manage your bag and keep shopping."
      : isSignup
      ? "Create your free LOOPA account and make your fashion world yours."
      : isForgot
      ? "Enter your email and we'll send you a secure password reset link."
      : "Choose a new password for your LOOPA account.";

    return (
      <main className="auth-page">
        <div className="auth-decoration auth-bow">🎀</div>
        <div className="auth-decoration auth-flower">🌸</div>

        <div className="auth-card">
          <button
            type="button"
            className="auth-back"
            onClick={() => {
              setAuthMode("login");
              setAuthError("");
              setAuthMessage("");
              setPassword("");
              setConfirmPassword("");
              setPasswordResetRequested(false);
              setPage("home");
            }}
          >
            ← Back to LOOPA
          </button>

          <div className="auth-logo">LOOPA</div>

          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="auth-intro">{intro}</p>

          {authError && (
            <div className="auth-alert error">{authError}</div>
          )}

          {authMessage && (
            <div className="auth-alert success">{authMessage}</div>
          )}

          {isForgot && passwordResetRequested ? (
            <div className="auth-reset-success">
              <div className="auth-reset-icon">♡</div>
              <h2>Check your email.</h2>
              <p>
                We sent a secure password reset link to{" "}
                <strong>{email.trim()}</strong>.
              </p>
              <p>
                Open the link from the same browser to create your new password.
              </p>

              <button
                type="button"
                className="auth-submit"
                onClick={() => {
                  setPasswordResetRequested(false);
                  setAuthMode("login");
                  setAuthMessage("");
                  setAuthError("");
                }}
              >
                Back to Log In
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <form
              className="auth-form"
              onSubmit={
                isLogin
                  ? handleLogin
                  : isSignup
                  ? handleSignup
                  : isForgot
                  ? handleForgotPassword
                  : handleUpdatePassword
              }
            >
              {isSignup && (
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              )}

              {!isReset && (
                <div className="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              )}

              {!isForgot && (
                <div className="form-field">
                  <label>{isReset ? "New Password" : "Password"}</label>

                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isReset
                          ? "Enter your new password"
                          : "Enter your password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={
                        isReset || isSignup
                          ? "new-password"
                          : "current-password"
                      }
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {(isSignup || isReset) && (
                <div className="form-field">
                  <label>
                    {isReset ? "Confirm New Password" : "Confirm Password"}
                  </label>

                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={
                        isReset
                          ? "Confirm your new password"
                          : "Confirm your password"
                      }
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => {
                    setAuthMode("forgot");
                    setAuthError("");
                    setAuthMessage("");
                    setPasswordResetRequested(false);
                  }}
                >
                  Forgot password?
                </button>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={authSubmitting}
              >
                {authSubmitting
                  ? "Please wait..."
                  : isLogin
                  ? "Log In"
                  : isSignup
                  ? "Create Account"
                  : isForgot
                  ? "Send Reset Link"
                  : "Update Password"}

                {!authSubmitting && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {!isReset && (
            <div className="auth-switch">
              <span>
                {isForgot
                  ? "Remember your password?"
                  : isLogin
                  ? "Don't have a LOOPA account?"
                  : "Already have a LOOPA account?"}
              </span>

              <button
                type="button"
                onClick={() => {
                  setAuthMode(
                    isForgot ? "login" : isLogin ? "signup" : "login"
                  );
                  setAuthError("");
                  setAuthMessage("");
                  setPasswordResetRequested(false);
                }}
              >
                {isForgot ? "Log in" : isLogin ? "Create one" : "Log in"}
              </button>
            </div>
          )}

          {isReset && (
            <div className="auth-switch">
              <span>Remember your password?</span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                  setAuthMessage("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </main>
    );
  };

  /* ---------------------------------------
     ACCOUNT / ORDERS NAVIGATION
  ---------------------------------------- */

  const openOrders = async () => {
    if (!user) {
      openAuth("login");
      return;
    }

    await loadOrders(user.id);
    setSelectedOrder(null);
    setPage("orders");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setPage("order-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatOrderDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const prettyOrderStatus = (status) => {
    if (!status) return "Pending";
    return String(status)
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  /* ---------------------------------------
     ACCOUNT PAGE
  ---------------------------------------- */

  const AccountPage = () => {
    return (
      <main className="account-page">
        <div className="account-card">
          <div className="account-avatar">
            <UserCircle size={58} />
          </div>

          <p className="eyebrow">MY LOOPA</p>

          <h1>{profile?.full_name || "Welcome to LOOPA"}</h1>
          <p className="account-email">{user?.email}</p>

          <div className="account-menu">
            <button type="button" onClick={() => setPage("account")}>
              <User size={19} />
              My Profile
              <ChevronRight size={17} />
            </button>

            <button type="button" onClick={() => setPage("home")}>
              <Heart size={19} />
              My Wishlist
              <ChevronRight size={17} />
            </button>

            <button type="button" onClick={openOrders}>
              <ShoppingBag size={19} />
              My Orders
              <span className="account-menu-count">{orders.length}</span>
              <ChevronRight size={17} />
            </button>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </main>
    );
  };

  /* ---------------------------------------
     ORDERS PAGE
  ---------------------------------------- */

  const OrdersPage = () => {
    return (
      <main className="orders-page">
        <div className="orders-header">
          <button className="bag-back" onClick={() => setPage("account")}>
            ← Back to Account
          </button>
          <p className="standard-eyebrow">MY LOOPA</p>
          <h1>My Orders</h1>
          <p>Everything you've ordered from LOOPA, all in one place.</p>
        </div>

        {ordersLoading ? (
          <section className="orders-empty-card">
            <div className="orders-loader" aria-hidden="true" />
            <p>Loading your orders...</p>
          </section>
        ) : orders.length === 0 ? (
          <section className="orders-empty-card">
            <div className="orders-empty-icon"><ShoppingBag size={30} /></div>
            <p className="standard-eyebrow">NOTHING HERE YET</p>
            <h2>Your LOOPA story starts here.</h2>
            <p>You haven't placed an order yet. Find something you love and make it yours.</p>
            <button className="checkout-primary-button" onClick={() => setPage("home")}>
              Start Shopping <ArrowRight size={18} />
            </button>
          </section>
        ) : (
          <section className="orders-list">
            {orders.map((order) => (
              <button
                className="order-card"
                key={order.id}
                type="button"
                onClick={() => openOrderDetail(order)}
              >
                <div className="order-card-top">
                  <div>
                    <p className="standard-eyebrow">ORDER</p>
                    <h2>#{String(order.id).slice(0, 8).toUpperCase()}</h2>
                  </div>
                  <span className={`order-status order-status-${String(order.status || "pending").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    {prettyOrderStatus(order.status)}
                  </span>
                </div>

                <div className="order-card-bottom">
                  <span>{formatOrderDate(order.created_at)}</span>
                  <strong>KES {Number(order.total_amount || 0).toLocaleString()}</strong>
                  <ChevronRight size={18} />
                </div>
              </button>
            ))}
          </section>
        )}
      </main>
    );
  };

  /* ---------------------------------------
     ORDER DETAIL PAGE
  ---------------------------------------- */

  const OrderDetailPage = () => {
    if (!selectedOrder) {
      return (
        <main className="orders-page">
          <div className="orders-header">
            <button className="bag-back" onClick={openOrders}>← Back to Orders</button>
            <h1>Order not found.</h1>
          </div>
        </main>
      );
    }

    const order = selectedOrder;

    return (
      <main className="order-detail-page">
        <div className="order-detail-header">
          <button className="bag-back" onClick={openOrders}>← Back to Orders</button>
          <p className="standard-eyebrow">ORDER DETAILS</p>
          <h1>#{String(order.id).slice(0, 8).toUpperCase()}</h1>
          <p>Placed {formatOrderDate(order.created_at)}</p>
        </div>

        <div className="order-detail-grid">
          <section className="order-detail-card">
            <p className="standard-eyebrow">STATUS</p>
            <div className="order-detail-status-row">
              <strong>{prettyOrderStatus(order.status)}</strong>
              <span className={`order-status order-status-${String(order.status || "pending").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                {order.payment_status ? prettyOrderStatus(order.payment_status) : "Pending"}
              </span>
            </div>
            <div className="order-timeline">
              <div className="timeline-dot active" />
              <div>
                <strong>Order received</strong>
                <p>Your LOOPA order has been received.</p>
              </div>
            </div>
          </section>

          <section className="order-detail-card">
            <p className="standard-eyebrow">DELIVERY</p>
            <h2>Where it's going</h2>
            <p className="order-address">{order.shipping_address || "Delivery details will be confirmed."}</p>
          </section>

          <section className="order-detail-card">
            <p className="standard-eyebrow">PAYMENT</p>
            <h2>{order.payment_method || "Payment"}</h2>
            <p className="order-muted">Payment status: {prettyOrderStatus(order.payment_status || "pending")}</p>
          </section>

          <section className="order-detail-card order-total-card">
            <p className="standard-eyebrow">ORDER TOTAL</p>
            <div className="order-total-big">
              <span>Total</span>
              <strong>KES {Number(order.total_amount || 0).toLocaleString()}</strong>
            </div>
          </section>
        </div>
      </main>
    );
  };

  /* ---------------------------------------
     CHECKOUT PAGE
  ---------------------------------------- */

  const CheckoutPage = () => {
    if (!user) {
      return (
        <main className="checkout-page">
          <section className="checkout-login-state">
            <p className="standard-eyebrow">CHECKOUT</p>
            <h1>Log in to continue.</h1>
            <p>Your LOOPA account keeps your order details secure and makes checkout easier.</p>
            <button className="checkout-primary-button" onClick={() => openAuth("login")}>
              Log In
            </button>
          </section>
        </main>
      );
    }

    return (
      <main className="checkout-page">
        <div className="checkout-header">
          <button className="bag-back" onClick={() => setPage("bag")}>
            ← Back to Bag
          </button>
          <p className="standard-eyebrow">LOOPA CHECKOUT</p>
          <h1>Almost yours.</h1>
          <p>Complete your details and place your order.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <section className="checkout-card">
              <div className="checkout-section-heading">
                <span>01</span>
                <div>
                  <p className="standard-eyebrow">DELIVERY DETAILS</p>
                  <h2>Where should we deliver?</h2>
                </div>
              </div>

              <label>Full name
                <input value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} placeholder="Your full name" />
              </label>

              <label>Phone number
                <input value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} placeholder="07XX XXX XXX" inputMode="tel" />
              </label>

              <label>Delivery address
                <textarea value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} placeholder="Apartment, building, street, estate or landmark" rows="3" />
              </label>

              <label>City
                <input value={checkoutCity} onChange={(e) => setCheckoutCity(e.target.value)} placeholder="Nairobi" />
              </label>

              <label>Order notes <span className="optional-label">Optional</span>
                <textarea value={checkoutNotes} onChange={(e) => setCheckoutNotes(e.target.value)} placeholder="Anything your LOOPA creator should know?" rows="3" />
              </label>
            </section>

            <section className="checkout-card">
              <div className="checkout-section-heading">
                <span>02</span>
                <div>
                  <p className="standard-eyebrow">PAYMENT</p>
                  <h2>How would you like to pay?</h2>
                </div>
              </div>

              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === "M-Pesa" ? "selected" : ""}`}>
                  <input type="radio" name="payment" value="M-Pesa" checked={paymentMethod === "M-Pesa"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span><strong>M-Pesa</strong><small>Pay securely using M-Pesa.</small></span>
                </label>

                <label className={`payment-option ${paymentMethod === "Cash on Delivery" ? "selected" : ""}`}>
                  <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span><strong>Cash on Delivery</strong><small>Pay when your LOOPA order arrives.</small></span>
                </label>
              </div>

              {paymentMethod === "M-Pesa" && (
                <label className="checkout-payment-phone">M-Pesa phone number
                  <input value={paymentPhone} onChange={(e) => setPaymentPhone(e.target.value)} placeholder="07XX XXX XXX" inputMode="tel" required={paymentMethod === "M-Pesa"} />
                </label>
              )}

              {paymentMessage && <div className="checkout-success-note">{paymentMessage}</div>}
              <p className="checkout-payment-note">M-Pesa payment records are created as pending. To collect real STK payments, connect a secure server-side M-Pesa provider or Supabase Edge Function; never put M-Pesa secrets in this React file.</p>
            </section>

            {checkoutError && (
              <div className="checkout-error">{checkoutError}</div>
            )}

            <button className="checkout-primary-button place-order-button" type="submit" disabled={checkoutSubmitting}>
              {checkoutSubmitting ? "Placing Order..." : "Place Order"}
              {!checkoutSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <aside className="checkout-summary">
            <p className="standard-eyebrow">YOUR ORDER</p>
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div className="checkout-item-image">LOOPA</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity || 1}</span>
                  </div>
                  <strong>KES {(Number(item.price || 0) * (item.quantity || 1)).toLocaleString()}</strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-line">
              <span>Subtotal</span>
              <strong>KES {cartSubtotal.toLocaleString()}</strong>
            </div>
            <div className="checkout-summary-line">
              <span>Delivery</span>
              <span>Calculated separately</span>
            </div>
            <div className="checkout-summary-divider" />
            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>KES {cartSubtotal.toLocaleString()}</strong>
            </div>
          </aside>
        </div>
      </main>
    );
  };

  /* ---------------------------------------
     ORDER SUCCESS PAGE
  ---------------------------------------- */

  const OrderSuccessPage = () => {
    return (
      <main className="order-success-page">
        <section className="order-success-card">
          <div className="order-success-mark">✓</div>
          <p className="standard-eyebrow">ORDER PLACED</p>
          <h1>It’s yours. ♡</h1>
          <p>Thank you for shopping with LOOPA. Your order has been received and we’ll keep you updated as it moves forward.</p>

          {placedOrder?.id && (
            <div className="order-number">
              <span>Order number</span>
              <strong>#{String(placedOrder.id).slice(0, 8).toUpperCase()}</strong>
            </div>
          )}

          <div className="order-success-actions">
            <button className="checkout-primary-button" onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Continue Shopping
            </button>
            <button className="success-secondary-button" onClick={() => setPage("account")}>
              View My Account
            </button>
          </div>
        </section>
      </main>
    );
  };

  /* ---------------------------------------
     BAG PAGE
  ---------------------------------------- */

  const BagPage = () => {
    return (
      <main className="bag-page">
        <div className="bag-header">
          <button
            className="bag-back"
            onClick={() => setPage("home")}
          >
            ← Continue Shopping
          </button>

          <p className="standard-eyebrow">
            YOUR LOOPA BAG
          </p>

          <h1>Your Bag</h1>

          <p>
            {cartCount === 0
              ? "Your bag is waiting for something beautiful."
              : `${cartCount} ${cartCount === 1 ? "item" : "items"} in your bag`}
          </p>
        </div>

        {cart.length === 0 ? (
          <section className="bag-empty">
            <div className="bag-empty-mark">♡</div>

            <p className="standard-eyebrow">
              NOTHING HERE YET
            </p>

            <h2>Your bag is empty.</h2>

            <p>
              Find something you love and add it to your LOOPA bag.
            </p>

            <button
              className="bag-shop-button"
              onClick={() => {
                setActiveCategory("Women");
                setActiveSubcategory("All Women");
                setPage("shop");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Shop LOOPA
            </button>
          </section>
        ) : (
          <section className="bag-layout">
            <div className="bag-items">
              {cart.map((item) => (
                <article className="bag-item" key={item.id}>
                  <div className="bag-item-image">
                    <span>LOOPA</span>
                  </div>

                  <div className="bag-item-details">
                    <p className="bag-item-label">
                      LOOPA CREATOR
                    </p>

                    <h2>{item.name}</h2>

                    <p className="bag-item-price">
                      KES {Number(item.price || 0).toLocaleString()}
                    </p>

                    {item.made_to_order && (
                      <p className="bag-made-order">
                        Made to Order
                        {item.production_days
                          ? ` • ${item.production_days} days`
                          : ""}
                      </p>
                    )}

                    <div className="bag-controls">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span>{item.quantity || 1}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeFromBag(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="bag-item-total">
                    KES {(Number(item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </div>
                </article>
              ))}
            </div>

            <aside className="bag-summary">
              <p className="standard-eyebrow">
                ORDER SUMMARY
              </p>

              <h2>Your total</h2>

              <div className="bag-summary-row">
                <span>Subtotal</span>
                <strong>KES {cartSubtotal.toLocaleString()}</strong>
              </div>

              <div className="bag-summary-row">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="bag-summary-divider" />

              <div className="bag-summary-total">
                <span>Total</span>
                <strong>KES {cartSubtotal.toLocaleString()}</strong>
              </div>

              <button
                className="bag-checkout-button"
                onClick={openCheckout}
              >
                Proceed to Checkout
              </button>
            </aside>
          </section>
        )}
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
    const content = standardWorldContent[activeCategory];

    if (!content) return null;

    return (
      <section className="shop-world-hero simple-category-hero">
        <div className="shop-world-copy">
          <p className="standard-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="standard-world-description">{content.description}</p>

          <div className="standard-shop-tags">
            {content.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveSubcategory(tag)}
                className={activeSubcategory === tag ? "active" : ""}
              >
                {tag}
              </button>
            ))}
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

            {user && profile?.role === "admin" && (
              <button
                className="admin-header-button"
                onClick={openAdminApproval}
                type="button"
                aria-label="Admin Approval"
                title="Admin Approval"
              >
                Admin Approval
              </button>
            )}

            {user && (
              <button
                className="icon-button seller-header-button"
                onClick={openSellerDashboard}
                aria-label="Creator Studio"
                title="Creator Studio"
              >
                <Store size={20} />
              </button>
            )}

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
                setPage("bag");
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Shopping bag"
            >
              <ShoppingBag
                size={20}
              />

              {cartCount > 0 && (
                <span className="count">
                  {cartCount}
                </span>
              )}

            </button>

          </div>

        </div>

      </header>

      {/* ADMIN APPROVAL */}

      {page === "admin" && user && AdminApprovalPage()}

      {/* SELLER DASHBOARD */}

      {page === "seller" && user && SellerDashboardPage()}

      {page === "messages" && user && MessagesPage()}

      {page === "custom" && CustomRequestPage()}

      {/* AUTH */}

      {page === "auth" && AuthPage()}

      {/* ACCOUNT */}

      {page === "account" && user && AccountPage()}

      {/* ORDERS */}

      {page === "orders" && user && OrdersPage()}

      {/* ORDER DETAIL */}

      {page === "order-detail" && user && OrderDetailPage()}

      {/* CHECKOUT */}

      {page === "checkout" && CheckoutPage()}

      {/* ORDER SUCCESS */}

      {page === "order-success" && OrderSuccessPage()}

      {/* BAG */}

      {page === "bag" && BagPage()}

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
                    ProductCard({ product })
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
                    openAuth("login");
                    return;
                  }
                  setPage("custom");
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
          PRODUCT DETAIL
      ====================================== */}

      {page === "product" && ProductDetailPage()}

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
            StandardShopHero()
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
                      ProductCard({ product })
                    )
                  )}

                </div>

              ) : standardWorldContent[
                  activeCategory
                ] ? (
                <div className="standard-empty">
                  <div className="standard-empty-line" aria-hidden="true" />

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
                  SpecialShopDecor()

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
