"use client";

import  React,{useEffect} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSearchSection from "@/components/AnimatedSearch";

gsap.registerPlugin(ScrambleTextPlugin,ScrollTrigger);

import { useState } from "react";
import {
  Search,
  MapPin,
  Heart,
  Star,
 MoveUpRight,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSec from "@/components/HeroSec";
import { Input } from "@/components/ui/input";

interface Card {
  img:string,
  name:string,
  desc:string,
  stars:number,
  cost:number
}

const Card1: Card[] = [
  {
    name: "Hemis National Park",
    img: "https://ak-d.tripcdn.com/images/0HJ3412000handxcyE175_C_1200_800_Q70.jpg?proc=source%2ftrip",
    desc: "Hemis National Park, Ladakh, offers surreal high-altitude landscapes, elusive snow leopards, and dramatic monasteries perched on mountain ridges. It's a dream for wildlife lovers and spiritual seekers.",
    stars: 4.7,
    cost: 28000,
  },
  {
    name: "Great Himalayan National Park",
    img: "https://tse1.mm.bing.net/th/id/OIP.qe3uQD2RqsWta8Mpe4o6TAHaD4?pid=Api&P=0&h=180",
    desc: "Great Himalayan National Park in Himachal Pradesh is a UNESCO site known for dense forests, alpine meadows, and untouched trails. Ideal for nature trekking and spotting rare Himalayan species.",
    stars: 4.6,
    cost: 24000,
  },
  {
    name: "Khangchendzonga National Park",
    img: "https://tse4.mm.bing.net/th/id/OIP.99kjdv5to_TF9cdxcXq8ZgHaE8?pid=Api&P=0&h=180",
    desc: "Khangchendzonga National Park in Sikkim is a majestic wilderness with pristine glaciers, sacred lakes, and a backdrop of the world’s third-highest peak. A deeply mystical and raw Himalayan experience.",
    stars: 4.8,
    cost: 30000,
  },
  {
    name: "Valley of Flowers National Park",
    img: "https://trippymania.com/wp-content/uploads/2021/07/flower-valey-1.jpg",
    desc: "Valley of Flowers National Park in Uttarakhand bursts into color during monsoon with countless alpine flowers carpeting the valley — a fairy-tale trek for nature lovers and photographers.",
    stars: 4.9,
    cost: 22000,
  },
  {
    name: "Pin Valley National Park",
    img: "https://travelmagicmoments.com/wp-content/uploads/2023/10/1PinValley-e1698744047501.jpg",
    desc: "Pin Valley National Park in Spiti Valley is stark and serene, with barren slopes, glacial rivers, and rare fauna like ibex and snow leopards. A raw, peaceful escape into high-altitude desert terrain.",
    stars: 4.5,
    cost: 26000,
  },
  {
    name: "Kedarnath Wildlife Sanctuary",
    img: "https://tse2.mm.bing.net/th/id/OIP.eEYqT_-GvHm7QFU1YwhxPAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Kedarnath Wildlife Sanctuary, Uttarakhand, offers rich biodiversity, spiritual vibes, and Himalayan views along its scenic trekking routes. A great mix of pilgrimage and wildlife trekking.",
    stars: 4.6,
    cost: 21000,
  }
];

const Card2: Card[] = [
  {
    name: "Svalbard, Norway",
    img: "https://www.pexels.com/photo/breathtaking-view-of-arctic-glaciers-in-svalbard-5858000/",
    desc: "Vast glaciers, icy fjords, and haunting Arctic silence define Svalbard’s wilderness. Encounter polar bears, Arctic foxes, and midnight sun vistas in one of Earth’s last true wild frontiers.",
    stars: 5,
    cost: 7000,
  },
  {
    name: "Lofoten Islands, Norway",
    img: "https://www.thesmoothescape.com/wp-content/uploads/2023/06/lofoten-islands-beaches.jpg",
    desc: "Dramatic peaks rise over shimmering turquoise beaches in the Lofoten Islands. Rugged Arctic cliffs, scenic fishing villages, and ethereal light combine for an unforgettable landscape.",
    stars: 4.7,
    cost: 3750,
  },
  {
    name: "Lofoten Secluded Beach",
    img: "https://www.cntraveler.com/supersize/2025/06/lofotens-vibrant-landscape.jpg",
    desc: "Secluded beaches of powder-white sand meet teal water framed by rugged mountains in Lofoten. Perfect for peaceful walks, vibrant marine life, and scenic serenity.",
    stars: 4.5,
    cost: 3250,
  },
  {
    name: "Tuamotu Archipelago, French Polynesia",
    img: "https://kandooadventures.com/assets/images/svalbard-iceberg-cruise.jpg",
    desc: "A luminous Arctic lagoon fringed with icebergs in shades of blue and green. Diving, kayaking, and glacier encounters combine into a diver’s dreamscape.",
    stars: 5,
    cost: 5750,
  },
  {
    name: "San Blas Islands, Panama",
    img: "https://shuttersafari.com/wp-content/uploads/2024/10/lofoten-skagsanden-beach.jpg",
    desc: "Tiny, postcard-perfect islands with sky‑blue shallows and palms swaying—an authentic experience with local culture and endless island‑hopping solitude.",
    stars: 4,
    cost: 2250,
  },
  {
    name: "Fraser Island, Australia",
    img: "https://gofjords.com/wp-content/uploads/2017/06/lofoten-ramberg-beach.jpg",
    desc: "The world’s largest sand island towering over 75‑Mile‑Beach style coastlines: clear, calm waters and dazzling white sands often almost empty.",
    stars: 4,
    cost: 3750,
  }
];



export default function TravelDiscoveryLanding() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [type1, setType1] = useState<boolean>(true);
  const [type2, setType2] = useState<boolean>(true);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Redirect or block
      window.location.href = "/No-Mob"; // or show alert, blank screen, etc.
    }
  }, []);

  useGSAP(()=>{
    
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger the search functionality
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      {/* Hero Section */}
      <HeroSec />
      {/* How It Works */}
      <section className="py-20 px-4 min-h-screen bg-gradient-to-r from-emerald-100 via-blue-100 to-amber-100 flex flex-col justify-center items-center gap-15">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to your perfect journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Search",
              description:
                "Describe your dream item using natural language or search specific places",
              icon: Search,
              color: "emerald",
            },
            {
              step: "02",
              title: "Discover",
              description:
                "Browse curated suggestions that match your travel style and preferences",
              icon: MapPin,
              color: "blue",
            },
            {
              step: "03",
              title: "Dive In",
              description:
                "Get detailed information about costs, seasons, and how to reach your item",
              icon: Heart,
              color: "amber",
            },
          ].map((item, index) => (
            <div>
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${item.color}-100 flex items-center justify-center`}
              >
                <item.icon
                  className={`w-10 h-10 relative left-45 text-${item.color}-600`}
                />
              </div>
              <div className={`text-6xl font-bold text-${item.color}-200 mb-4`}>
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <AnimatedSearchSection/>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">FREELive</h3>
              <p className="text-gray-400">Find places that match your soul</p>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FREELive. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
    </div>
  );
}
