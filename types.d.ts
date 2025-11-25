interface CardProps {
  id: number;
  link: string;
  heading: string;
  subheading: string;
  motionProps?: HTMLMotionProps<"div">;
}

interface NavProps {
  items: { label: string; link: string }[];
  bringBackCard: (link: string) => void;
}