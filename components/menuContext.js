// MenuContext.js
import {useState, createContext, useContext} from 'react'

// Create the context
const MenuContext = createContext()

// Create a provider component
export const MenuProvider = ({children}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [direction, setDirection] = useState('top')

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  return (
    <MenuContext.Provider
      value={{menuOpen, toggleMenu, direction, setDirection}}
    >
      {children}
    </MenuContext.Provider>
  )
}

// Hook to use the menu context
export const useMenu = () => useContext(MenuContext)
