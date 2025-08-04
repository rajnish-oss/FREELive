import React from "react";
import { Goldman, Gochi_Hand } from "next/font/google";

const goldman = Goldman({
  weight: "400",
  subsets:["latin"]
});
const Gochi = Gochi_Hand({
  weight: "400",
  subsets:["latin"]
});

const HeroSec = () => {
  return (
    <div>
      <section
        className="relative bg-cover min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url("/heroImg3.png")` }}
      >
        <nav
          className={`flex justify-between items-center text-[#BAE0E0] ${goldman.className} absolute top-0 w-full px-10 py-8`}
        >
          <span className="text-3xl">LIVEFree</span>
          <span className="flex justify-between items-center text-2xl w-1/2 cursor-pointer">
            <p className="hover:text-[#466666]"> Home</p>
            <p className="hover:text-[#466666]"> Features</p>
            <p className="hover:text-[#466666]"> About</p>
            <link className="bg-[#215015] text-[#BAE0E0] items-center align-middle text-3xl py-2 px-4 rounded-xl hover:bg-[#BAE0E0] hover:text-[#215015]" href="/main">
              Get Started
            </link>
          </span>
        </nav>
        <div className="h-full w-full flex justify-between relative top-30 ">
          <div className={`${goldman.className} text-8xl text-[#A6FFF2] mx-15`}>
            <svg
              height="20"
              width="350"
              xmlns="http://www.w3.org/2000/svg"
              className="relative right-42 top-50"
              style={{ rotate: "90deg" }}
            >
              <line
                x1="0"
                y1="10"
                x2="319"
                y2="10"
                style={{
                  strokeWidth: "8px",
                  stroke: "#A6FFF2",
                }}
              />
            </svg>
            <svg
              height="20"
              width="800"
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-80 left-1"
            >
              <line
                x1="0"
                y1="10"
                x2="750"
                y2="10"
                style={{
                  strokeWidth: "8px",
                  stroke: "#A6FFF2",
                }}
              />
            </svg>
            <div className="flex flex-col justify-start items-center">
              <p>Travel Where</p>
              <p>Your VIBE</p>
              <p>Takes You</p>
            </div>
            <span className="inline-block h-8 w-8 absolute left-190 bottom-4 bg-[#A6FFF2] rounded-full"></span>
          </div>
          <div
            className={`${Gochi.className} w-100 text-[#BAE0E0] text-xl relative top-55 mx-10`}
          >
            Not your usual travel site. Search how you feel — “foggy hills,”
            “sunlit towns,” or just “Italy.” Get destinations that match your
            vibe, with guides and AI-curated suggestions.
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSec;
