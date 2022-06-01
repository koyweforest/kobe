import { useEffect, useState } from 'react'

import sushiTokenList from '../sushiTL.json'

const { utils, BigNumber } = require('ethers')

export const usePriceHistory = (symbol, days, interval) => {
  const [prices, setPrices] = useState()

  const asset = sushiTokenList.find(token => {
    return token.symbol === symbol
  })

  useEffect(() => {
    const urlData = `https://api.coingecko.com/api/v3/coins/${asset.coingeckoId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}
    `

    const getEvents = async () => {
      try{
        const response = await fetch(
          urlData,
        )
        const data = await response.json()

        setPrices(data)

      } catch(e) {
        console.log(`Error getting Polygonscan Transactions. ${e}`)
      }
    }

    getEvents()
  }, [asset, days, interval])

  return prices
}
