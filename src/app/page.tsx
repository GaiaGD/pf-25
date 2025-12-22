'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion';

import styles from "./page.module.scss";

import { cards } from "../../cards.json";

import Card from "./components/Card/Card";
import Nav from "./components/Nav/Nav";
import EmptyDeck from "./components/EmptyDeck/EmptyDeck";

import { useThreeLiquidMetal } from "@/app/utils/Canvas"


export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null);

  useThreeLiquidMetal(containerRef);


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


// Handle scroll to throw/bring back cards
  useEffect(() => {

    let startY = 0

    const handlePointerDown = (e: PointerEvent) => {
      startY = e.clientY;
      if (e.target instanceof Element) {
        e.target.setPointerCapture(e.pointerId);
      }
    }

    const handlePointerUp = (e: PointerEvent) => {
      const deltaY = startY - e.clientY;
      const minDistance = 50; // Minimum distance to consider as a scroll

      if (Math.abs(deltaY) < minDistance) return;

      if (deltaY > 0 && activeCardsRef.current.length > 0) {
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
      } else if (deltaY < 0 && thrownCardsRef.current.length > 0) {
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

    }


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

    containerRef.current?.addEventListener('pointerdown', handlePointerDown);
    containerRef.current?.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('wheel', handleWheel)
      containerRef.current?.removeEventListener('pointerdown', handlePointerDown);
      containerRef.current?.removeEventListener('pointerup', handlePointerUp);
    };
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

  const bringBackAllCards = () => {
    isScrollingRef.current = true;
    setIsScrolling(true);
    setActiveCards([...cards]);
    setThrownCards([]);

    setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
    }, 1500);
  }

  
  return (
    <div className={styles.page}>
      <main ref={containerRef} className={styles.main}>
        <Nav bringBackCard={bringBackCard} thrownCards={thrownCards.map(card => ({ heading: card.heading, link: card.link }))} allCards={cards.map(card => ({ heading: card.heading, link: card.link }))} />

        <AnimatePresence>
        {
          activeCards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              link={card.link}
              heading={card.heading}
              subheading={card.subheading}
              id={card.id}
              motionProps={{
                initial: { 
                  y: "-150vh",
                  x: `-50%`,
                  // rotate: (activeCards.length + index) - activeCards.length
                },
                animate: {
                  y: `-50%`,
                  x: `-50%`,
                  zIndex: activeCards.length - index,
                  transition: {
                    duration: 0.5,
                    ease: "circInOut",
                  }
                },
                exit: {
                  y: "-150vh",
                  x: `-50%`,
                  transition: {
                    duration: 0.5,
                    ease: "circInOut",
                  },
                },
                transition: {
                  duration: 0.5,
                  ease: "circInOut",
                }
              }}
            />
          ))
        }
        </AnimatePresence>

        <EmptyDeck bringBackAllCards={bringBackAllCards} emptyDeck={activeCards.length === 0} />

      </main>
    </div>
  );
}
