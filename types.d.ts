interface CardProps {
  id: number;
  heading: string;
  subheading: string;
  motionProps?: HTMLMotionProps<"div">;
  onExit?: () => void;
}
