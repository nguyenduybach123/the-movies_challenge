// Core
import { FC } from 'react';
import { motion } from 'framer-motion';

// App
import { BaseSpinner } from './Spinner';
import { cn } from '../utils/utils';

// Component
const Loading: FC<{ className?: string }> = ({ className }) => {
    // Template
    return (
        <div className={cn(className, 'flex justify-center items-center w-screen h-screen')}>
            <motion.div className="flex flex-col justify-center items-center">
                <BaseSpinner width={50} height={50} />
                <motion.h1
                    className="mt-8 [text-shadow:_0_4px_8px_#FF0000] text-white text-2xl text-center font-semibold tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
                    LOADING
                </motion.h1>
            </motion.div>
        </div>
    );
};

export default Loading;
