import { FC, PropsWithChildren } from 'react';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';


const variants: Variants = {
    scaleVisible: { opacity: 1, scale: 1 },
    scaleHidden: { opacity: 0, scale: 0.8 },
    opacityVisible: { opacity: 1 },
    opacityHidden: { opacity: 0 },
    translateLeftVisible: { opacity: 1, x: 0 },
    translateLeftHidden: { opacity: 0, x: 50 },
    translateTopVisible: { opacity: 1, y: 0 },
    translateTopHidden: { opacity: 0, y: 50 },
}

type AnimationVariant = 'scale' | 'opacity' | 'translateLeft' | 'translateTop';

type Props = PropsWithChildren & HTMLMotionProps<"div"> & {
    variant: AnimationVariant;
    duration?: number;
    delay?: number;
    className?: string;
    isAnimationDisabled?: boolean;
}

export const InViewAnimation: FC<Props> = ({
    variant, duration, delay, className, isAnimationDisabled, children, ...props
}) => {
    const getVisibleName = () => {
        if (isAnimationDisabled) return '';
        return variant + 'Visible';
    }

    const getHiddenName = () => {
        if (isAnimationDisabled) return '';
        return variant + 'Hidden';
    }
    
    return (
        <motion.div
            variants={variants}
            className={className}
            initial={getHiddenName()}
            whileInView={getVisibleName()}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: delay ?? 0, duration: duration ?? 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
