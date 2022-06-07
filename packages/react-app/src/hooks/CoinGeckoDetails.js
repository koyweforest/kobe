import { useEffect, useState } from 'react'

import coinGecko from '../components/coingecko'
import sushiTokenList from '../sushiTL.json'


const { utils, BigNumber } = require('ethers')

export const useDetailHistory = symbol => {
  const [detail, setDetails] = useState()

  const asset = sushiTokenList.find(token => {
    return token.symbol === symbol
  })

  useEffect(() => {


    const getEvents = async () => {
      try{
        const _detail = await coinGecko.get('/coins/markets/', {
            params: {
              vs_currency: 'usd',
              ids: asset.coingeckoId,
            },
          })

        setDetails(_detail)

      } catch(e) {
        console.log(`Error getting Polygonscan Details. ${e}`)
      }
    }

    getEvents()
  }, [asset])

  return detail
}
