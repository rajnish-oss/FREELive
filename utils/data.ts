 const data = {
  name: "Hemis National Park",
  qoute: "Where nature tells its own story",
  location: "Ladakh, India",
  images: [
    "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_square.jpg",
    "https://www.italyperfect.com/g/photos/upload/sml_845543004-1590582528-ip-info-rome.jpg",
    "https://www.italia.it/content/dam/tdh/en/interests/lazio/roma/roma-in-48-ore/media/20220127150143-colosseo-roma-lazio-shutterstock-756032350.jpg",
    "https://www.touristitaly.com/wp-content/uploads/2023/03/Trevi-Fountain-rome-2-1024x683.jpg",
  ],
  rating: 4.3,
  price: "₹12,000",
  tripDuration: "3 days",

  tags: ["wildlife", "mountains", "offbeat", "nature", "remote", "spiritual"],

  overview: `Hemis National Park is India's largest national park, known for its raw high-altitude landscape and rare wildlife. The park is home to elusive snow leopards, Tibetan wolves, and many species of alpine flora and fauna. It offers a peaceful, spiritual escape amidst the Himalayas.`,

  mustSeeAttractions: [
    "Hemis Monastery",
    "Markha Valley Trek",
    "Rumbak Village",
    "Ganda La Pass",
  ],

  thingsToDo: {
    adventure: [
      "Snow Leopard Tracking Trek",
      "Markha Valley Trek",
      "High-altitude camping",
    ],
    cultural: [
      "Visit Hemis Monastery Festival",
      "Explore Ladakhi villages",
      "Interact with local monks",
    ],
    nature: ["Wildlife photography", "Bird watching", "Stargazing at night"],
  },

  seasonsInfo: {
    summer: {
      months: "May to September",
      description:
        "Best time to visit. Mild weather, open trails, and high chances of wildlife sightings.",
    },
    winter: {
      months: "December to February",
      description:
        "Extreme cold, but best for spotting snow leopards during the Snow Leopard Trek. Requires experienced guides.",
    },
    monsoon: {
      months: "July to August",
      description:
        "Light rain, but mostly dry due to high altitude. Some trails may be risky.",
    },
  },

  howToReach: {
      flight: "Fly to Leh Kushok Bakula Rimpochee Airport",
      road: "Shared cabs and local taxis available from Leh to park entrances",
      trek: "Markha Valley trek route goes through the park",
  },

  cautions: [
    "High altitude – carry medicine for AMS (Acute Mountain Sickness)",
    "Limited phone/network access",
    "Pack warm clothes even in summer",
    "Restricted zones require permits",
  ],

  priceBreakdown: {
    budget: { 
      cost:"₹5,500",
      services: ["Homestay accommodation", " Local transport by bus", "Basic meals included","Entry fees to attractions","Basic trekking activities"]
    },
    Mid_Range: {
      cost:"₹10,000",
      services:["3-star resort accommodation","Private cab for sightseeing","All meals at good restaurants","Guided tours and activities","Adventure sports included"]
    },
    luxury: {
      cost:"₹15,000",
      services:["5-star resort accommodation","Private chauffeured car for sightseeing","All meals at high-end restaurants","Guided tours and activities","Adventure sports included"]
    }
  },

  similarPlaces: [
    {
      name: "Great Himalayan National Park",
      location: "Himachal Pradesh",
      slug: "great-himalayan-national-park",
      image: "/images/ghnp.jpg",
    },
    {
      name: "Valley of Flowers",
      location: "Uttarakhand",
      slug: "valley-of-flowers",
      image: "/images/valley.jpg",
    },
    {
      name: "Spiti Valley",
      location: "Himachal Pradesh",
      slug: "spiti-valley",
      image: "/images/spiti.jpg",
    },
  ],
};

export default data