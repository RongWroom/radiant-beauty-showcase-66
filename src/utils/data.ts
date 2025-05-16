
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
    name: "Cyrolipolysis (Fat Freeze)",
    description: "Replenish and revitalize dry skin with our intensive hydrating treatment",
    price: "£150",
    image: "/placeholder.svg",
    category: "Facial"
  },
  {
    id: 2,
    name: "Ultra 4D HIFU",
    description: "Reduce fine lines and wrinkles with our advanced anti-aging procedure",
    price: "£180",
    image: "/placeholder.svg",
    category: "Anti-Aging"
  },
  {
    id: 3,
    name: "Skin Tightening (Fibroblast)",
    description: "Clear your skin and prevent future breakouts with our specialized acne treatment",
    price: "£180",
    image: "/placeholder.svg",
    category: "Refresh"
  },
  {
    id: 4,
    name: "HydraFacial",
    description: "Exfoliate your skin for a smoother, clearer complexion",
    price: "£85",
    image: "/placeholder.svg",
    category: "Exfoliation"
  },
  {
    id: 5,
    name: "Laser Hair Removal",
    description: "Enhance your skin's natural healing process with targeted light therapy",
    price: "from £20",
    image: "/placeholder.svg",
    category: "Laser Therapy"
  },
  {
    id: 6,
    name: "Post Treatment",
    description: "Restore volume and smooth away deep lines with our dermal filler treatments",
    price: "£0",
    image: "/placeholder.svg",
    category: "Aftercare"
  }
];

export const featuredTreatments = treatments.slice(0, 3);

export const stats: Stat[] = [
  { value: "130+", label: "Client reviews" },
  { value: "1398+", label: "Happy clients" },
  { value: "93%", label: "Satisfaction rate" }
];
