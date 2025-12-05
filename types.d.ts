
interface CardLink {
  heading: string;
  link: string;
}

interface CardProps extends CardLink {
  id: number;
  subheading?: string[];
  motionProps?: HTMLMotionProps<"div">;
}

interface NavProps {
  thrownCards: CardLink[];
  allCards: CardLink[];
  bringBackCard: (link: string) => void;
}