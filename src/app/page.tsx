'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion';

import styles from "./page.module.scss";

import { cards } from "../../cards.json";

import Card from "./components/Card/Card";
import Nav from "./components/Nav/Nav";
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
        }, 1500);


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
        }, 1500);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const bringBackCard = (link: string) => {
    
    const cardToBringBack = thrownCardsRef.current.find(card => card.link === link);
    if (!cardToBringBack) return;

    isScrollingRef.current = true;
    setIsScrolling(true);
    setThrownCards(thrownCardsRef.current.filter(card => card.link !== link));
    setActiveCards([cardToBringBack, ...activeCardsRef.current]);

    setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
    }, 1500);
  }

  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Nav bringBackCard={bringBackCard} items={thrownCards.map(card => ({ label: card.heading, link: card.link }))} />

        <AnimatePresence>
        {
          activeCards.map((card, index) => (
            <Card
              key={card.id}
              link={card.link}
              heading={card.heading}
              subheading={card.subheading}
              id={card.id}
              motionProps={{
                initial: { 
                  y: "-100vh",
                  x: `-50%`,
                  rotate: index * 2 - activeCards.length
                },
                animate: {
                  y: `-50%`,
                  x: `-50%`,
                  zIndex: activeCards.length - index,
                  transition: {
                    duration: 0.5,
                    ease: "easeIn",
                  }
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
