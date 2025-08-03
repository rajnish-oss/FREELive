import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const CRating = ({ value }: { value: number }) => {
  const [maskWidth, setMaskWidth] = useState<number>(0);

  useEffect(() => {
    // Max 5 stars, each 24px (can adjust based on actual icon size)
    const starSize = 24;
    const masked = (5 - value) * starSize;
    setMaskWidth(masked);
  }, [value]);

  return (
    <div className="relative w-fit">

      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-amber-400 w-6 h-6" />
        ))}
      </div>


      <div
        className="absolute top-0 right-0 h-full bg-white"
        style={{ width: `${maskWidth}px` }}
      />
    </div>
  );
};

export default CRating;

