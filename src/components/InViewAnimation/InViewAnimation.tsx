import { FC, PropsWithChildren, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const variants: Variants = {
    scaleVisible: { opacity: 1, scale: 1 },
    scaleHidden: { opacity: 0, scale: 0 },
    opacityVisible: { opacity: 1 },
    opacityHidden: { opacity: 0 },
    translateLeftVisible: { opacity: 1, translateX: 0 },
    translateLeftHidden: { opacity: 0, translateX: 50 },
    translateTopVisible: { opacity: 1, translateY: 0 },
    translateTopHidden: { opacity: 0, translateY: 50 },
}

type AnimationVariant = 'scale' | 'opacity' | 'translateLeft' | 'translateTop';

type Props = PropsWithChildren & {
    variant: AnimationVariant;
    duration?: number;
    delay?: number;
    className?: string;
}

export const InViewAnimation: FC<Props> = ({ variant, duration, delay, className, children }) => {
    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start(getVisibleName());
        } 
    }, [control, inView]);

    const getVisibleName = () => {
        return variant + 'Visible';
    }

    const getHiddenName = () => {
        return variant + 'Hidden';
    }
    
    return (
        <motion.div
            ref={ref}
            animate={control}
            variants={variants}
            className={className}
            initial={getHiddenName()}
            transition={{ delay: delay ?? 0, duration: duration ?? 0.5 }}
        >
            {children}
        </motion.div>
    );
}
