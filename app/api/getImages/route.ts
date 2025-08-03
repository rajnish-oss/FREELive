import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await Promise.all(data.dest.map((place:string) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/images",
      headers: {
        "X-API-KEY": process.env.X_API_KEY,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ q: place }),
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        const data = response.data.images
          .map((img: any) => img.imageUrl)
          .slice(0, 10);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

   
   return makeRequest().then((image) => {
        const body = {place: place, image: image}
        return body
    })
  }));


  return NextResponse.json(res);
}
