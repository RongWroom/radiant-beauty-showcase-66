
export interface Treatment {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const treatments: Treatment[] = [
  {
    id: 1,
    name: "Hydrating Facial",
    description: "Replenish and revitalize dry skin with our intensive hydrating treatment",
    price: "£90",
    image: "/placeholder.svg",
    category: "Facial"
  },
  {
    id: 2,
    name: "Anti-Aging Treatment",
    description: "Reduce fine lines and wrinkles with our advanced anti-aging procedure",
    price: "£120",
    image: "/placeholder.svg",
    category: "Anti-Aging"
  },
  {
    id: 3,
    name: "Acne Treatment",
    description: "Clear your skin and prevent future breakouts with our specialized acne treatment",
    price: "£85",
    image: "/placeholder.svg",
    category: "Acne"
  },
  {
    id: 4,
    name: "Microdermabrasion",
    description: "Exfoliate your skin for a smoother, clearer complexion",
    price: "£75",
    image: "/placeholder.svg",
    category: "Exfoliation"
  },
  {
    id: 5,
    name: "LED Light Therapy",
    description: "Enhance your skin's natural healing process with targeted light therapy",
    price: "£95",
    image: "/placeholder.svg",
    category: "Light Therapy"
  },
  {
    id: 6,
    name: "Dermal Fillers",
    description: "Restore volume and smooth away deep lines with our dermal filler treatments",
    price: "£250",
    image: "/placeholder.svg",
    category: "Fillers"
  },
  {
    id: 7,
    name: "Chemical Peel",
    description: "Reveal fresh, new skin with our clinical-grade chemical peels",
    price: "£110",
    image: "/placeholder.svg",
    category: "Peels"
  },
  {
    id: 8,
    name: "Vitamin C Infusion",
    description: "Brighten your complexion with our powerful vitamin C treatment",
    price: "£85",
    image: "/placeholder.svg",
    category: "Vitamin Treatments"
  }
];

export const featuredTreatments = treatments.slice(0, 3);

export const stats: Stat[] = [
  { value: "130+", label: "Client reviews" },
  { value: "1398+", label: "Happy clients" },
  { value: "93%", label: "Satisfaction rate" }
];
