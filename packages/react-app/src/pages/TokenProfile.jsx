/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { Button, Col, Row, Space, Typography } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useGasPrice } from 'eth-hooks'

import CoinData from '../components/CoinData'
import ConnectButton from '../components/common/ConnectButton'
import HistoryChart from '../components/PriceChart'
import BuySetModal from '../components/RegenDefi/BuySetModal'
import MyRegenPositionsFull from '../components/RegenDefi/MyRegenPositionsFull'
import SimpleRamp from '../components/RegenDefi/SimpleRamp'
import SwapModal from '../components/RegenDefi/SwapModal'
import Swap from '../components/Swap'
import { IndexContext } from '../contexts/IndexContext'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'
import { getFightData } from '../helpers/dashboardData'
import { useCoingeckoAPI, usePriceHistory } from '../hooks/useCoingeckoAPI'
import tokenList from '../sushiTL.json'



const TokenProfile = () => {

    const coinId = useParams()



    const { contracts, USDPrices, walletBalance, isPledged, isLoadingBalances, writeContracts } = useContext(WalletContext)
    const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance, polygonKlimaBalance, polygonSKlimaBalance, polygonCNBEDBalance, polygonCBTCBalance, polygonWethBalance  } = walletBalance
    const { address, isLoadingAccount, injectedProvider, userSigner } = useContext(NetworkContext)
    const { setObject, indexContextDetails, indexUSDPrices } = useContext(IndexContext)


  const [balance,setBalance] = useState(0)
  const [currentSet,setCurrentSet] = useState(null)
  const [gasSet,setGasSet] = useState()
  const [indexModalUp, setIndexModalUp] = useState(false)
  const [swapModalUp, setSwapModalUp] = useState(false)
  const [swapping, setSwapping] = useState(false)

  const [coinData, setCoinData] = useState({})

const days = usePriceHistory(coinId.id, 1, 'daily')
const week = usePriceHistory(coinId.id, 14, 'week')
const year= usePriceHistory(coinId.id, 'max', 'year')

  useEffect(() => {

    const GetCoinData = async () => {

        setCoinData({
          day: formatData(days.prices),
          week: formatData(week.prices),
          year: formatData(year.prices) })

    }

    GetCoinData()
  }, [days, week, year])

  console.log(coinData)

  const formatData = data => {
    return data.map(el => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      }
    })
  }



return (
    <Row justify="center" className="mb-md">
      {!isLoadingAccount && address && injectedProvider &&
      <Swap
        selectedProvider={injectedProvider}
        tokenList={tokenList}
        linkTokenOut={coinId.id}
      />
}
<HistoryChart data={coinData} />
<CoinData />


</Row>
)
}

export default TokenProfile

