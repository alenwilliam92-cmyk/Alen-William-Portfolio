import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../data/portfolioData';

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-bg/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl flex flex-col cursor-default"
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stroke/60 bg-surface/80">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest font-mono">
                  {item.category}
                </span>
                <h3 className="text-lg font-light text-text-primary">
                  {item.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary hover:border-white/20 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
