
interface CardLink {
  heading: string;
  link: string;
}

interface EmptyDeckProps {
  bringBackAllCards: () => void;
  emptyDeck?: boolean;
}

interface CardProps extends CardLink {
  ref?: React.Ref<HTMLDivElement>;
  index?: number;
  id: number;
  link: string;
  subheading?: string[];
  motionProps?: HTMLMotionProps<"div">;
}

interface NavProps {
  thrownCards: CardLink[];
  allCards: CardLink[];
  bringBackCard: (link: string) => void;
}