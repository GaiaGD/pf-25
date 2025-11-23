interface CardProps {
  id: number;
  heading: string;
  subheading: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  motionProps?: HTMLMotionProps<"div">;
}
