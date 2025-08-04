"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DM_Serif_Display } from "next/font/google";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Heart,
  Star,
  MoveUpRight,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";


const DM = DM_Serif_Display({
  weight: "400",
  subsets:["latin"]
});

interface Item {
  place: string;
  info: {
    desc: string;
    cost: string;
    rating: string;
    bestFrom: string;
  };
  images: string[];
}

const page = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<Item[]>([]);
  const [resultMode, setResultMode] = useState<boolean>(false);
  const [error,setError] = useState<boolean>(false)
  const [place,setPlace] = useState<string>('')
  const router = useRouter()

  console.log(data);

  data.map((item) => {
    {
      console.log(item.info.cost);
    }
  });

  const handleClick = (dest: string) => {
   router.push(`/main/${dest}`)
  }


  const handleSearch = () => {
    axios
      .post("/api/search", {
        searchQuery: input,
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        setError(true)
        console.log(error)
      });
    setResultMode(true);
  };

  return (
    <div>
      <header
        className={`flex flex-col ${
          resultMode ? "h-40 " : "min-h-screen"
        } justify-center items-center backdrop-blur-2xl gap-15`}
        style={{
          background: resultMode
            ? "linear-gradient(to bottom right, #d1fae5, #dbeafe, #fde68a)"
            : "url('/mainImg.png')",
        }}
      >
        <div
          className={`${DM.className} ${
            resultMode ? "hidden" : "flex"
          } flex-col justify-center items-center text-6xl gap-3`}
        >
          <div className="bg-[url('/night.png')] bg-contain bg-clip-text text-transparent text-center">
            Let your wanderlust speak . . .
          </div>
          <div className="bg-[url('/night.png')] bg-contain bg-clip-text text-transparent text-center">
            Don't search, express.
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full">
          <Input
            className={`w-1/2 bg-white/5 ${
              resultMode ? "bg-white/55" : "bg-transparent"
            } placeholder:px-5 ml-10 focus-visible:ring-2 focus-visible:ring-orange-200 rounded-full shadow-lg focus-visible:shadow-2xl h-15 font-bold text-black`}
            onKeyDown={(e)=> e.key === 'Enter' ? handleSearch() : null}
            onChange={(e) => setInput(e.target.value)}
          />
          <svg
            className="relative right-13 bg-black rounded-full p-[8px_4px_4px_8px] hover:bg-black/45"
            height={38}
            aria-labelledby="title desc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7"
            
            onClick={() => handleSearch()}
          >
            <defs>
              <linearGradient
                id="gradientStroke"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
              >
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#fdba74" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#gradientStroke)" strokeWidth="2">
              <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>
        </div>
      </header>
      {resultMode ? (
        <main className="grid grid-cols-3 gap-10 mt-20 m-10">
          {data.length > 1
            ? data.map((item) => (
                <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 h-fit">
                  <div className="relative bottom-7 h-fit">
                    <Carousel>
                      <CarouselContent>
                        {item.images.map((image, index) => (
                          <CarouselItem>
                            <img 
                            src={image}
                             alt={item.place}
                             className="w-full h-70 object-cover"
                             />
                          </CarouselItem>
                        ))}   
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">
                        {item.info.rating}
                      </span>
                    </div>
                    <div className="absolute flex items-center bottom-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-medium">
                      {item.info.cost}
                    </div>
                  </div>
                  <CardContent className="p-6 relative bottom-10">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-gray-500 font-medium">
                        {item.place}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.info.desc}
                    </p>
                    {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm text-emerald-600 font-medium">Best: {item.season}</span>
                      <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
                    </div> */}
                  </CardContent>

                  <Button className="bg-emerald-600/90 relative bottom-11 w-40 left-70" onClick={()=>handleClick(item.place)}>
                    <MoveUpRight />
                    Know More
                  </Button>
                </Card>
              ))
            : error ? 
            <div className="w-full flex justify-center items-center flex-col absolute left-0">
              <img src="/OIP.jpg" alt="" />
              <p>Something Went wrong</p>
              <p>try again after sometime</p>
            </div>
             : [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border-0 h-[520px] flex flex-col"
                >
                  <div className="relative bottom-7">
                    <Skeleton className="w-full h-[280px] rounded-t-2xl" />
                  </div>

                  <div className="p-6 relative bottom-10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded-full bg-emerald-600" />
                      <Skeleton className="w-24 h-4 rounded bg-gradient-to-br from-emerald-100 via-blue-100 to-amber-100" />
                    </div>

                    <Skeleton className="h-4 w-full rounded bg-gradient-to-br from-emerald-100 via-blue-100 to-amber-100" />
                    <Skeleton className="h-4 w-[90%] rounded bg-gradient-to-br from-emerald-100 via-blue-100 to-amber-100" />
                    <Skeleton className="h-4 w-[70%] rounded bg-gradient-to-br from-emerald-100 via-blue-100 to-amber-100" />
                  </div>

                  <div className="px-6 pb-4 relative left-1/2">
                    <Skeleton className="h-10 w-40 bg-emerald-500/70" />
                  </div>
                </div>
              ))}
        </main>
      ) : null}
    </div>
  );
};

export default page;
