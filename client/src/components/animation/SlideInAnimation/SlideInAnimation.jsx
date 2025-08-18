import React from 'react';
import { motion } from 'framer-motion';

const directions = {
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } },
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } },
};

const SlideInAnimation = ({ children, direction = 'left', once = true, delay = 0 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.3 }}
            variants={{
                hidden: { ...directions[direction].hidden },
                visible: {
                    ...directions[direction].visible,
                    transition: { ...directions[direction].visible.transition, delay },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export default SlideInAnimation;
