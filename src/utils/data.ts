
export interface Treatment {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export const treatments: Treatment[] = [
  {
    id: 1,
    name: "Cyrolipolysis (Fat Freeze)",
    description: "Advanced fat freezing technology to eliminate stubborn fat cells permanently",
    price: "£150",
    image: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Cryo%201.jpeg",
    category: "Body Contouring",
    featured: true
  },
  {
    id: 2,
    name: "Ultra 4D HIFU",
    description: "High-Intensity Focused Ultrasound for non-invasive skin tightening and lifting",
    price: "£180",
    image: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Hifu%201.jpeg",
    category: "Anti-Aging"
  },
  {
    id: 3,
    name: "Skin Tightening (Fibroblast)",
    description: "Revolutionary plasma technology for natural skin tightening and rejuvenation",
    price: "£180",
    image: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/STW_Aesthetic_machine.jpeg",
    category: "Skin Tightening"
  },
  {
    id: 4,
    name: "HydraFacial",
    description: "Deep cleansing and hydrating facial treatment for radiant, healthy skin",
    price: "£85",
    image: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Hydrafacial.jpeg",
    category: "Facial"
  },
  {
    id: 5,
    name: "Laser Hair Removal",
    description: "Permanent hair reduction using advanced laser technology",
    price: "from £20",
    image: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Laser.jpeg",
    category: "Laser Therapy"
  }
];

export const featuredTreatments = treatments.slice(0, 3);

export const stats: Stat[] = [
  { value: "130+", label: "Client reviews" },
  { value: "1398+", label: "Happy clients" },
  { value: "93%", label: "Satisfaction rate" }
];
