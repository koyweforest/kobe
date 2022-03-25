import React, { useState } from 'react'

const CalculatorContext = React.createContext({
  email: undefined,
  setEmail: () => undefined,
  country: 'Chile',// hay que usar el país determinado por IP
  setCountry: () => undefined,
  advanced: false,
  setAdvanced: () => undefined,
  accessToken: undefined,
  setToken: () => undefined,
})

export const CalculatorProvider = ({ children }) => {
  const [email, setEmail] = useState(null)
  const [country, setCountry] = useState('Chile')
  const [advanced, setAdvanced] = useState(true)
  const [accessToken, setToken] = useState(null)

  const value = {
    email,
    setEmail,
    country,
    setCountry,
    advanced,
    setAdvanced,
    accessToken,
    setToken,
  }

  return(
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export default CalculatorContext
