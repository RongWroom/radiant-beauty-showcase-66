export interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

// Using the actual reviews from your site
export const customerReviews: Review[] = [
  {
    author: "AC Fletcher",
    rating: 5,
    reviewBody: "Really good service received from Sharon. Great initial consultation, very informative & detailed to ensure I knew what to expect throughout the laser hair removal treatment. Sharon is always professional, friendly & approachable.",
    datePublished: "2024-01-15"
  },
  {
    author: "Megan Coulson",
    rating: 5,
    reviewBody: "You won't regret going to Sharon for any treatment. She's friendly, professional and cares about each individual and how the course of treatment is going, and is willing to tailor to your specific needs.",
    datePublished: "2024-01-10"
  },
  {
    author: "Tracey Thornton-Clark",
    rating: 5,
    reviewBody: "I had the pleasure of experiencing a Hifu facial, Hydrafacial, and laser skin rejuvenation treatment from Sharon, and I must say, the results were absolutely incredible! Sharon is a true magician when it comes to skincare.",
    datePublished: "2024-01-08"
  },
  {
    author: "Leanne Wears",
    rating: 5,
    reviewBody: "I've been going to STW Aesthetic Clinic for my Hydrofacials and my skin has never been better. I no longer have breakouts or dry patches. Sharon is so lovely and really professional.",
    datePublished: "2024-01-05"
  },
  {
    author: "Danielle Cullen",
    rating: 5,
    reviewBody: "Great service. Sharon is so professional and friendly. I love the hydrafacial skin treatment and cool sculpting treatment. Fabulous business. Great prices. Highly recommend.",
    datePublished: "2024-01-03"
  },
  {
    author: "Zainab Alfaham",
    rating: 5,
    reviewBody: "Had four sessions so far and have already seen a reduction in hair growth. Sharon is very friendly and professional. Will work to your schedule! Happy customer so far!",
    datePublished: "2023-12-28"
  }
];

export const aggregateRating = {
  ratingValue: 5.0,
  reviewCount: customerReviews.length,
  bestRating: 5,
  worstRating: 5
};