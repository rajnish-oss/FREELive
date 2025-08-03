"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, IndianRupee, MoveUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const searchData = [
  {
    query: "enter your imagination",
    results: [],
  },
  {
    query: "long white beach and sky blue ocean",
    results: [
      {
        id: 4,
        name: "Maldives",
        desc: "Private overwater villas surrounded by turquoise lagoons",
        img: "https://www.fodors.com/wp-content/uploads/2019/01/Maldives2.gif",
        stars: 4.9,
        cost: "85,000",
      },
      {
        id: 5,
        name: "Seychelles",
        desc: "Pristine beaches with granite boulders and crystal clear waters",
        img: "https://tse4.mm.bing.net/th/id/OIP.2xkLCSRB1gFF4sYLqWroiAHaEo?pid=Api&P=0&h=180",
        stars: 4.8,
        cost: "75,000",
      },
      {
        id: 6,
        name: "Whitehaven Beach",
        desc: "Pure silica sand beach in the heart of the Great Barrier Reef",
        img: "https://www.orangesmile.com/extreme/img/main/whitehaven-beach_1.jpg",
        stars: 4.7,
        cost: "55,000",
      },
    ],
  },
  {
    query: "mountain covered with snow and wooden houses with warm light",
    results: [
      {
        id: 7,
        name: "Zermatt, Switzerland",
        desc: "Charming alpine village beneath the iconic Matterhorn peak",
        img: "https://www.myswitzerland.com/-/media/st/gadmin/images/village/winter/dorf_zermatt_winter_28413.jpg",
        stars: 4.9,
        cost: "70,000",
      },
      {
        id: 8,
        name: "Hallstatt, Austria",
        desc: "Fairy-tale lakeside town with traditional wooden architecture",
        img: "https://cdn.audleytravel.com/5237/3740/79/15988493-hallstatt-perched-on-lake-hallstatt.jpg",
        stars: 4.8,
        cost: "50,000",
      },
      {
        id: 9,
        name: "Banff, Canada",
        desc: "Mountain wilderness with cozy lodges and stunning lake views",
        img: "https://rare-gallery.com/uploads/posts/4503561-nature-landscape-mountains-canada-banff-banff-national-park-winter-pine-trees-snow-forest-lights-valley-village-tunnel-mountain.jpg",
        stars: 4.6,
        cost: "60,000",
      },
    ],
  },
]

export default function AnimatedSearchSection() {
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showResults, setShowResults] = useState(false)

  const currentSearch = searchData[currentSearchIndex]
  const targetText = currentSearch.query

useEffect(() => {
  if (isTyping && typedText.length < targetText.length) {
    const timeout = setTimeout(() => {
      setTypedText(targetText.slice(0, typedText.length + 1))
    }, 80)
    return () => clearTimeout(timeout)
  }

  if (!isTyping && showResults) {
    // Move to next search after a delay
    const timeout = setTimeout(() => {
      setShowResults(false)
      setTypedText("")
      setCurrentSearchIndex((prev) => (prev + 1) % searchData.length)
      setIsTyping(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }

  if (isTyping && typedText.length === targetText.length) {
    setIsTyping(false)
    setShowResults(true)
  }
}, [typedText, targetText, isTyping, showResults])


  return (
    <section className="py-20 min-h-screen px-4">
      <div className="flex w-full justify-center items-center">
        <div className="relative w-1/2">
          <Input
            className="w-full bg-white/5 placeholder:text-lg placeholder:px-5 placeholder:text-gray-700 ml-10 focus-visible:ring-2 focus-visible:ring-blue-300 rounded-full shadow-lg focus-visible:shadow-2xl h-15 font-bold text-black pr-16"
            value={typedText}
            placeholder={!typedText ? "Start typing to explore..." : ""}
            readOnly
          />
          {isTyping && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              <div className="w-0.5 h-5 bg-blue-500 animate-pulse" />
            </div>
          )}
        </div>

        <svg
          className="relative right-13"
          height={28}
          aria-labelledby="title desc"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
        >
          <defs>
            <linearGradient id="gradientStroke" x1="0" y1="0" x2="100%" y2="0">
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

      <div
        className={`grid grid-cols-3 gap-10 mt-20 transition-all duration-700 ${
          showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {showResults &&
          currentSearch.results.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ${
                showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 h-130">
                <div className="relative bottom-7 h-fit">
                  <img src={item.img || "/placeholder.svg"} className="w-full h-70 object-cover" alt={item.name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{item.stars}</span>
                  </div>
                  <div className="absolute flex items-center bottom-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-medium">
                    <IndianRupee className="h-4" />
                    {item.cost}
                  </div>
                </div>
                <CardContent className="p-6 relative bottom-10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-500 font-medium">{item.name}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
                <Button className="bg-emerald-600/90 relative bottom-18 w-40 left-70">
                  <MoveUpRight />
                  Know More
                </Button>
              </Card>
            </div>
          ))}
      </div>

      {/* Search Progress Indicator */}
      {!showResults && <div className="flex justify-center space-x-3 mt-12">
        {searchData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSearchIndex
                ? "bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-400 scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>}
    </section>
  )
}
