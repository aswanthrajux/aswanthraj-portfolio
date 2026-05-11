import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  style?: React.CSSProperties
}

const directionMap = {
  up:    { y: 28, x: 0 },
  down:  { y: -28, x: 0 },
  left:  { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none:  { y: 0, x: 0 },
}

export function FadeIn({ children, delay = 0, direction = 'up', className, style }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
