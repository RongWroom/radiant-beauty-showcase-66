export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  benefits: string[];
  image: string;
  category: string;
  size?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Pro-Heal Serum Advanced+ 30ml",
    description: "Featuring our scientifically advanced Vitamin C time-release technology combined with a superior form of olive leaf extract and pure vitamins A & E this clinically proven formula delivers our highest ever antioxidant protection and exceptional healing properties.",
    price: "£157",
    benefits: [
      "Provides potent antioxidant protection",
      "Soothes and calms skin",
      "Helps improve the appearance of blemish-prone skin",
      "Helps reduce the appearance of fine lines and wrinkles",
      "Helps revitalise the appearance of aging and sensitive skin"
    ],
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Serum",
    size: "30ml",
    featured: true
  },
  {
    id: 2,
    name: "Pro-Heal Serum Advanced+ 15ml",
    description: "Featuring our scientifically advanced Vitamin C time-release technology combined with a superior form of olive leaf extract and pure vitamins A & E this clinically proven formula delivers our highest ever antioxidant protection and exceptional healing properties.",
    price: "£95",
    benefits: [
      "Provides potent antioxidant protection",
      "Soothes and calms skin",
      "Helps improve the appearance of blemish-prone skin",
      "Helps reduce the appearance of fine lines and wrinkles",
      "Helps revitalise the appearance of aging and sensitive skin"
    ],
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Serum",
    size: "15ml"
  },
  {
    id: 3,
    name: "Reparative Moisture Emulsion",
    description: "Rich Hydration for dry skin formulated with pharmaceutical grade botanicals, peptides, and powerful antioxidants and one of the first generation of products to contain Extremozyme® protection, which has been clinically proven to help prevent DNA damage.",
    price: "£105",
    benefits: [
      "Smooths and hydrates the skin",
      "Helps reduce the appearance of fine lines and wrinkles",
      "Provides both deep and surface hydration",
      "Helps prevent environmental damage with Extremozyme technology",
      "Excellent moisturizing prep for makeup",
      "Great for all skin types including oily and sensitive skin"
    ],
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Moisturizer"
  },
  {
    id: 4,
    name: "Moisturising Complex",
    description: "This versatile rich, yet easily absorbed botanical complex creates an anti-oxidant rich barrier that seals in moisture and insulates the skin from environmental damage.",
    price: "£98",
    benefits: [
      "Provides antioxidant-rich protective barrier",
      "Provides both deep and surface hydration",
      "Reduces the appearance of fine lines and wrinkles",
      "Smooths and softens"
    ],
    image: "https://images.pexels.com/photos/7262459/pexels-photo-7262459.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Moisturizer"
  },
  {
    id: 5,
    name: "Cleansing Complex",
    description: "This clear, lightweight cleansing gel is powerful - yet gentle enough for hypersensitive skin. Formulated with a balance of bionutrients, antioxidants and mild resurfacing ingredients that thoroughly cleanse without stripping essential natural oils.",
    price: "£25",
    benefits: [
      "Anti-acneic and deep cleansing",
      "Gentle enough for hypersensitive skin",
      "Thoroughly cleanses without stripping oils",
      "Contains bionutrients and antioxidants"
    ],
    image: "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Cleanser"
  },
  {
    id: 6,
    name: "GeneXC Serum",
    description: "GENEXC SERUM is a revolutionary formula featuring our proprietary combination of Extremozymes® which are clinically proven to help protect and revitalise the foundation of healthy skin, as they stimulate the genes associated with aging, hydration, and multi-level protection.",
    price: "£25",
    benefits: [
      "Protects and revitalises skin foundation",
      "Stimulates genes associated with aging",
      "Enhances hydration",
      "Provides multi-level protection"
    ],
    image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Serum"
  }
];

export const featuredProducts = products.filter(product => product.featured);
