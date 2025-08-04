import { GoogleGenAI, Type } from "@google/genai";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";
const ai = new GoogleGenAI({});

function getImage(place: string){
     
  const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://google.serper.dev/images',
  headers: { 
    'X-API-KEY': process.env.X_API_KEY, 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify({q: place})
};

 async function makeRequest() {
  try {
    const response = await axios.request(config);
    const data = response.data.images.map((img: any) => img.imageUrl).slice(0, 10);
    return data
  }
  catch (error) {
    console.log(error);
  }
}

 return makeRequest();
}

export async function POST(req:NextRequest) {
    const url = new URL(req.url);
    const place = url.pathname.split('/').pop();

    if (!place) {
      return NextResponse.json({ error: "Missing place" }, { status: 400 });
    }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
   I’m building a travel discovery website. When I give you a destination, return a structured JSON object with rich travel information, like the example below. The destination I give should be treated as the focus point. Here's the format and details:

Example Output Format (for “Hemis National Park”):
  {
  "name": "Hemis National Park",
  "qoute": "Where nature tells its own story",
  "location": "Ladakh, India",
  "rating": 4.3,
  "price": "₹12,000",
  "tripDuration": "3 days",
  "tags": ["wildlife", "mountains", "offbeat", "nature", "remote", "spiritual"],
  "overview": "Short 3-4 sentence paragraph about the destination",
  "mustSeeAttractions": ["Attraction 1", "Attraction 2", "... up to 5"],
  "thingsToDo": {
    "adventure": ["Activity 1", "Activity 2", "..."],
    "cultural": ["Activity 1", "Activity 2", "..."],
    "nature": ["Activity 1", "Activity 2", "..."]
  },
  "seasonsInfo": {
    "summer": {
      "months": "Month range",
      "description": "What makes this season good/bad"
    },
    "winter": {
      "months": "Month range",
      "description": "Pros/cons of visiting in winter"
    },
    "monsoon": {
      "months": "Month range",
      "description": "Rain, weather, trail/accessibility info"
    }
  },
  "howToReach": {
    "flight": "Airport and nearest city",
    "road": "Bus/taxi/shared cab info",
    "trek": "If trekking is a common way to reach, describe it"
  },
  "cautions": [
    "List 3–5 travel warnings, safety or environmental tips"
  ],
  "priceBreakdown": {
    "budget": {
      "cost": "In US Dollar",
      "services": ["List of services included"]
    },
    "Mid_Range": {
      "cost": "In US Dollar",
      "services": ["List of services included"]
    },
    "luxury": {
      "cost": "In US Dollar",
      "services": ["List of services included"]
    }
  },
  "similarPlaces": [
    {
      "name": "Similar Place 1",
      "location": "State or Country",
      "slug": "url-friendly-name"
    },
    {
      "name": "Similar Place 2",
      "location": "State or Country",
      "slug": "url-friendly-name"
    }
    {
      "name": "Similar Place 1",
      "location": "State or Country",
      "slug": "url-friendly-name"
    },
    {
      "name": "Similar Place 2",
      "location": "State or Country",
      "slug": "url-friendly-name"
    }
  ]
}
Now return similar JSON output for this destination: ${place}
    `,
        config: {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      qoute: { type: Type.STRING },
      location: { type: Type.STRING },
      rating: { type: Type.NUMBER },
      price: { type: Type.STRING },
      tripDuration: { type: Type.STRING },
      tags: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      overview: { type: Type.STRING },
      mustSeeAttractions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      thingsToDo: {
        type: Type.OBJECT,
        properties: {
          adventure: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          cultural: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          nature: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        propertyOrdering: ["adventure", "cultural", "nature"],
      },
      seasonsInfo: {
        type: Type.OBJECT,
        properties: {
          summer: {
            type: Type.OBJECT,
            properties: {
              months: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            propertyOrdering: ["months", "description"],
          },
          winter: {
            type: Type.OBJECT,
            properties: {
              months: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            propertyOrdering: ["months", "description"],
          },
          monsoon: {
            type: Type.OBJECT,
            properties: {
              months: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            propertyOrdering: ["months", "description"],
          },
        },
        propertyOrdering: ["summer", "winter", "monsoon"],
      },
      howToReach: {
        type: Type.OBJECT,
        properties: {
          flight: { type: Type.STRING },
          road: { type: Type.STRING },
          trek: { type: Type.STRING },
        },
        propertyOrdering: ["flight", "road", "trek"],
      },
      cautions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      priceBreakdown: {
        type: Type.OBJECT,
        properties: {
          budget: {
            type: Type.OBJECT,
            properties: {
              cost: { type: Type.STRING },
              services: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            propertyOrdering: ["cost", "services"],
          },
          Mid_Range: {
            type: Type.OBJECT,
            properties: {
              cost: { type: Type.STRING },
              services: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            propertyOrdering: ["cost", "services"],
          },
          luxury: {
            type: Type.OBJECT,
            properties: {
              cost: { type: Type.STRING },
              services: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            propertyOrdering: ["cost", "services"],
          },
        },
        propertyOrdering: ["budget", "Mid_Range", "luxury"],
      },
      similarPlaces: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            location: { type: Type.STRING },
            slug: { type: Type.STRING },
          },
          propertyOrdering: ["name", "location", "slug"],
        },
      },
    },
    propertyOrdering: [
      "name",
      "qoute",
      "location",
      "rating",
      "price",
      "tripDuration",
      "tags",
      "overview",
      "mustSeeAttractions",
      "thingsToDo",
      "seasonsInfo",
      "howToReach",
      "cautions",
      "priceBreakdown",
      "similarPlaces"
    ],
  },
}})
  
 const result = JSON.parse((response as any)?.candidates[0]?.content?.parts[0]?.text || "[]");
 

 result.images = await getImage(place)


  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}