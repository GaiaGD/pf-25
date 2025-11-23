'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';



import { cards } from "../../cards.json";
import Card from "./components/Card/Card";

export default function Home() {

  // states

  const [activeCards, setActiveCards] = useState<CardProps[]>(cards);
  const [thrownCards, setThrownCards] = useState<CardProps[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);


  // refs
  const activeCardsRef = useRef(activeCards);
  const thrownCardsRef = useRef(thrownCards);

  // Keep refs in sync with state
  useEffect(() => {
    activeCardsRef.current = activeCards;
    thrownCardsRef.current = thrownCards;
  }, [activeCards, thrownCards]);



  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      if (e.deltaY > 0 && activeCardsRef.current.length > 0) {
        // Scrolling down - throw top card out
        setIsScrolling(true);
        const [topCard, ...rest] = activeCardsRef.current;
        setActiveCards(rest);
        setThrownCards([...thrownCardsRef.current, topCard]);
        
        setTimeout(() => setIsScrolling(false), 600);
      } else if (e.deltaY < 0 && thrownCardsRef.current.length > 0) {
        // Scrolling up - bring back last thrown card
        setIsScrolling(true);
        const lastThrown = thrownCardsRef.current[thrownCardsRef.current.length - 1];
        setThrownCards(thrownCardsRef.current.slice(0, -1));
        setActiveCards([lastThrown, ...activeCardsRef.current]);
        
        setTimeout(() => setIsScrolling(false), 600);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrolling]);



  console.log(cards);

  
  return (
    <div className="page">
      <main className="main">

        {
          activeCards.map((item, index) => (
            <Card 
              key={index} 
              heading={item.heading} 
              subheading={item.subheading} 
            />
          ))
        }

      </main>
    </div>
  );
}
