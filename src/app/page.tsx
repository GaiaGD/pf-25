'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion';

import styles from "./page.module.scss";

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
  const isScrollingRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    activeCardsRef.current = activeCards;
    thrownCardsRef.current = thrownCards;
  }, [activeCards, thrownCards]);



  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;



      if (e.deltaY > 0 && activeCardsRef.current.length > 0) {
        // Scrolling down - throw top card out
        isScrollingRef.current = true;
        setIsScrolling(true);
        const [topCard, ...rest] = activeCardsRef.current;
        setActiveCards(rest);
        setThrownCards([...thrownCardsRef.current, topCard]);
        
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsScrolling(false);
        }, 2000);




      } else if (e.deltaY < 0 && thrownCardsRef.current.length > 0) {
        // Scrolling up - bring back last thrown card
        isScrollingRef.current = true;
        setIsScrolling(true);
        const lastThrown = thrownCardsRef.current[thrownCardsRef.current.length - 1];
        setThrownCards(thrownCardsRef.current.slice(0, -1));
        setActiveCards([lastThrown, ...activeCardsRef.current]);
        
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsScrolling(false);
        }, 2000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AnimatePresence>
        {
          activeCards.map((card, index) => (
            <Card
              key={card.id}
              heading={card.heading}
              subheading={card.subheading}
              id={card.id}
              motionProps={{
                initial: { 
                  y: "-100vh",
                  x: `-50%`,
                },
                animate: {
                  y: `-50%`,
                  x: `-50%`,
                  zIndex: activeCards.length - index,
                },
                exit: {
                  y: "-100vh",
                  x: `-50%`,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                },
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                }
              }}
            />
          ))
        }
        </AnimatePresence>
      </main>
    </div>
  );
}
