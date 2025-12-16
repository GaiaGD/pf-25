
interface CardLink {
  heading: string;
  link: string;
}

interface EmptyDeckProps {
  bringBackAllCards: () => void;
  emptyDeck?: boolean;
}

interface CardProps extends CardLink {
  index?: number;
  id: number;
  subheading?: string[];
  motionProps?: HTMLMotionProps<"div">;
}

interface NavProps {
  thrownCards: CardLink[];
  allCards: CardLink[];
  bringBackCard: (link: string) => void;
}