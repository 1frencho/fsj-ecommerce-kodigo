import { type HTMLMotionProps, motion } from 'framer-motion';

const animations: Record<string, HTMLMotionProps<'div'>> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, // Suavizar la transición
  },
  slideFade: {
    initial: { y: -16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, // Suavizar la transición
  },
};

type PageProps = HTMLMotionProps<'div'> & {
  animation?: 'fade' | 'slideFade';
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
};

export const MotionDiv = ({
  animation = 'fade',
  children,
  className,
}: PageProps) => {
  return (
    <motion.div
      className={className}
      {...animations[animation]}
      // Without styles:
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
};
