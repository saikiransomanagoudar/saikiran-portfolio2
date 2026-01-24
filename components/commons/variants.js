export const slideFromLeftVariants = {
  hidden: {x: -50, opacity: 0},
  visible: {
    x: 0,
    opacity: 1,
    transition: {duration: 0.5, ease: 'easeOut'},
  },
}

export const textVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {duration: 0.5, ease: 'easeOut'},
  },
}
