import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { getJson } from "serpapi";
import  axios  from "axios";

const ai = new GoogleGenAI({});

interface Item {
  place: string;
  info: {
    desc: string;
    cost: string;
    rating: string;
    bestFrom: string;
  };
  images?: string[];
}

// Helper to wrap SerpAPI image search in a Promise
// function fetchImages(place: string): Promise<string[]> {
  // return new Promise((resolve, reject) => {
  //   getJson(
  //     {
  //       api_key: process.env.SERP_API_KEY,
  //       engine: "google",
  //       q: place,
  //       google_domain: "google.com",
  //       gl: "us",
  //       hl: "en",
  //       tbm: "isch", // image search
  //       num: 10,
  //     },
  //     (json) => {
  //       try {
  //         const images = json.images_results
  //           ?.slice(0, 4) // get top 4
  //           ?.map((img: any) => img.original) || [];
  //         resolve(images);
  //       } catch (err) {
  //         resolve([]); // fallback to empty array
  //       }
  //     }
  //   );
  // });
// }

function getImage(place: string){
     
  let config = {
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
    const data = response.data.images.map((img: any) => img.imageUrl).slice(0, 4);
    return data
  }
  catch (error) {
    console.log(error);
  }
}

 return makeRequest();
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.searchQuery) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  // Step 1: Ask Gemini for place suggestions
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are a travel expert.

A traveler is looking for places that match this query: "${data.searchQuery}".

Suggest 21 unique travel destinations from around the world that match the query, If its a particular place suggest popular places from there. For each destination, return:

- "place": The name of the destination.
- "info": An object containing:
  - "desc": A vivid and concise description of why this place fits the query.
  - "cost": An estimated cost range (in dollar) to visit.
  - "rating": A rating from 1.0 to 5.0 (based on traveler popularity or experience).
  - "bestFrom": The best months or seasons to visit (e.g., "March to June").

Respond only in JSON format. No extra text or explanation.

Return an array of objects. Each object should have "place" and "info" properties, and info should have "desc", "cost", "rating", and "bestFrom" properties.
`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            place: { type: Type.STRING },
            info: {
              type: Type.OBJECT,
              properties: {
                desc: { type: Type.STRING },
                cost: { type: Type.STRING },
                rating: { type: Type.STRING },
                bestFrom: { type: Type.STRING },
              },
              propertyOrdering: ["desc", "cost", "rating", "bestFrom"],
            },
          },
          propertyOrdering: ["place", "info"],
        },
      },
    },
  });

  const result: Item[] = JSON.parse((response as any)?.candidates[0]?.content?.parts[0]?.text || "[]");

  const finalData: Item[] = await Promise.all(
    result.map(async (item) => {
      const images = await getImage(item.place);
      return {
        ...item,
        images,
      };
    })
  );


  return NextResponse.json(finalData, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
9