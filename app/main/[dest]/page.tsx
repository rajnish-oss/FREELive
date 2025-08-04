"use client";

import { useEffect, useState, use } from "react";
import {
  Star,
  MapPin,
  Plane,
  Train,
  Car,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Sprout,
  Sun,
  LandPlot,
  Bird,
  TentTree,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Italiana, Cinzel, Merriweather_Sans } from "next/font/google";
import CRating from "@/components/ui/CRating";
import axios from "axios";

const italian = Italiana({
  weight: "400",
  subsets:["latin"]
});

const cinzel = Cinzel({
  weight: "400",
  subsets:["latin"]
});

const MW = Merriweather_Sans({
  weight: "400",
  subsets:["latin"]
});

interface ImageData {
  place: string;
  image: string[];
}

export interface DestinationData {
  name?: string;
  qoute?: string;
  images?: string[];
  location?: string;
  rating?: number;
  price?: string;
  tripDuration?: string;
  tags?: string[];
  overview?: string;
  mustSeeAttractions?: string[];
  thingsToDo?: {
    adventure?: string[];
    cultural?: string[];
    nature?: string[];
  };
  seasonsInfo?: {
    summer?: {
      months?: string;
      description?: string;
    };
    winter?: {
      months?: string;
      description?: string;
    };
    monsoon?: {
      months?: string;
      description?: string;
    };
  };
  howToReach?: {
    flight?: string;
    road?: string;
    trek?: string;
  };
  cautions?: string[];
  priceBreakdown?: {
    budget?: {
      cost?: string;
      services?: string[];
    };
    Mid_Range?: {
      cost?: string;
      services?: string[];
    };
    luxury?: {
      cost?: string;
      services?: string[];
    };
  };
  similarPlaces?: {
    name?: string;
    location?: string;
    slug?: string;
  }[];
}

export default function page({
  params,
}: {
  params: Promise<{ dest: string }>;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState<DestinationData>({});
  const [error, setError] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const [aImg, setAImg] = useState<ImageData[]>([]);
  const [spi, setSPI] = useState<ImageData[]>([]);
  const dest = use(params).dest;

  useEffect(() => {
    axios
      .post(`/api/search/${dest}`)
      .then(function (response) {
        setData(response.data);
        setLoad(false);
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  }, [dest]);

  useEffect(() => {
    axios
      .post(`/api/getImages`, {
        dest: data.mustSeeAttractions,
      })
      .then(function (response) {
        setAImg(response.data);
      });
    axios
      .post(`/api/getImages`, {
        dest: data.similarPlaces?.map((place) => place.name),
      })
      .then(function (response) {
        setSPI(response.data);
      })
  }, [data]);

  return load ? (
    <div className="h-screen w-full flex justify-center items-center">
      <img src="/load.svg" alt="" />
    </div>
  ) : (
    <div
      className={`${MW.className} min-h-screen max-w-6xl mx-auto px-4 py-8 space-y-12 bg-gradient-to-b from-sky-50 to-white`}
    >
      {/* New Split-Screen Hero Section */}
      <div className="relative h-fit flex flex-col justify-between gap-10 items-center bg-white overflow-hidden">
        {/* Navigation Bar */}
        <div className="w-full z-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="text-gray-900 font-bold text-2xl">FREELive</div>
              <nav className="hidden md:flex items-center space-x-8 text-gray-700">
                <a
                  href="/"
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  Home
                </a>
                <a
                  href="#attraction"
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  Attraction
                </a>
                <a
                  href="#cost"
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  Cost
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className={`${italian.className} text-4xl text-[#215015}`}>
            {data.name}
          </p>
          <p className={`${cinzel.className} text-2xl text-[#215015]`}>
            {data.qoute}
          </p>
        </div>

        <div className="w-3/4 flex justify-center items-center">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent className="">
              {data.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={data.name}
                    className=" h-140 w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Quick Info Block */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {data.name}, {data.location}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <CRating value={data.rating ?? 0} />
                  <span className="ml-2 text-gray-600">
                    {data.rating} (1,247 reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {data.price}
              </div>
              <div className="text-gray-600">{data.tripDuration}</div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
          </div>
        </div>
      </div>
      {/* Overview Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-12 ">
        <div className="flex justify-center items-center gap-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Overview
          </h2>
          <div className="h-35 w-2 bg-black inline-block"></div>
          <p className="text-md text-gray-700 leading-relaxed">
            {data.overview}
          </p>
        </div>
      </section>

      {/* Must-See Attractions */}
      <section id="attraction">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Must-See Attractions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.mustSeeAttractions?.map((attraction, index) => (
            <Card className="overflow-hidden rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-[0px_5px_5px_0px] border-black h-100">
              <div className="relative bottom-7 h-fit">
                <Carousel>
                  <CarouselContent>
                    {aImg
                      .filter((imgData) => attraction === imgData.place)
                      .map((imgData, index) =>
                        imgData.image.map((img, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={img}
                              alt={imgData.place}
                              className=" w-full h-85 object-cover relative bottom-4"
                            />
                          </CarouselItem>
                        ))
                      )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <CardContent className="p-6 relative bottom-20">
                {attraction}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Things to Do */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Things to Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.thingsToDo && Object.entries(data.thingsToDo)?.map(([category, items]) => (
            <Card key={category} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex gap-3">
                  {category === "adventure" ? (
                    <LandPlot />
                  ) : category === "cultural" ? (
                    <Bird />
                  ) : (
                    <TentTree />
                  )}
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {items?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Best Time to Visit */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Best Time to Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.seasonsInfo && Object.entries(data.seasonsInfo)?.map(([season, item]) => (
            <Card className={`border-2 hover:shadow-lg transition-shadow`}>
              <div className="w-full flex justify-center items-center ">
                {season === "summer" ? (
                  <Sun className="w-20 h-20 p-5 rounded-2xl bg-amber-400/40 fill-amber-400" />
                ) : season === "winter" ? (
                  <Snowflake className="w-20 h-20 p-5 rounded-2xl bg-sky-500/40 fill-sky-500" />
                ) : (
                  <Sprout className="w-20 h-20 p-5 rounded-2xl bg-green-400/40 fill-green-400" />
                )}
              </div>

              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {season}
                </h3>
                <div className="text-sm font-medium text-gray-600 mb-3">
                  {item.months}
                </div>
                <p className="text-sm text-gray-700">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Reach */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          How to Reach
        </h2>

        <div className="bg-white rounded-2xl flex flex-col gap-5 shadow-lg p-6 md:p-8">
          <div className="flex items-start space-x-4">
            <div className="bg-sky-100 p-3 rounded-full">
              <Plane className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">By Air</h3>
              <p className="text-gray-600 text-sm">{data.howToReach && data?.howToReach.flight}</p>
            </div>

            <div className="bg-sky-100 p-3 rounded-full">
              <Train className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">By Road</h3>
              <p className="text-gray-600 text-sm">{ data.howToReach && data?.howToReach.road}</p>
            </div>

            <div className="bg-sky-100 p-3 rounded-full">
              <Car className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">By Foot</h3>
              <p className="text-gray-600 text-sm">{data.howToReach && data?.howToReach.trek}</p>
            </div>
          </div>

          <a className="md:w-60 w-60 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 flex justify-center items-center" href={`https://www.google.com/maps/search/?api=1&query=${dest}`}  target="_blank" rel="noopener noreferrer" >
            <MapPin className="w-4 h-4 mr-2" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>

      {/* Cautions & Tips */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Important Tips & Cautions
        </h2>
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <ul className="space-y-2 mt-2 text-lg">
              {data.cautions?.map((caution, index) => (
                <li key={index}>{caution}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      {/* Price Breakdown */}
      <section id="cost" >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Price Breakdown ({data.tripDuration})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.priceBreakdown && Object.entries( data?.priceBreakdown)?.map(
            ([key, tier]: [string, any]) => (
              <Card
                key={key}
                className="border-2 border-green-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">{key}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">
                    {tier.cost}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2 text-sm">
                    {tier.services?.map((service: string, index: number) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Similar Places */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Similar Places You Might Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.similarPlaces?.map((places, index) => (
            <Card className="overflow-hidden rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-100">
              <div className="relative bottom-7 h-fit">
                <Carousel>
                  <CarouselContent>
                    {spi
                      .filter((data) => places.name === data.place)
                      .map((data, index) =>
                        data.image.map((img, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={img}
                              alt={data.place}
                              className=" w-full h-85 object-cover relative bottom-4"
                            />
                          </CarouselItem>
                        ))
                      )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <CardContent className="flex flex-col gap-1 p-6 text-gray-700 relative bottom-20">
              <h3 className="font-semibold text-gray-900">{places.name}</h3>
              <span className="flex gap-3 text-sm">
                <MapPin /> {places.location}
              </span>
               
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
