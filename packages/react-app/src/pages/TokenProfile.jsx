/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { Card, Row } from 'antd'

import CoinData from '../components/CoinData'
import HistoryChart from '../components/PriceChart'
import Swap from '../components/Swap'
import TokenDisplay from '../components/TokenDisplay'
import { IndexContext } from '../contexts/IndexContext'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { useDetailHistory } from '../hooks/CoinGeckoDetails'
import { usePriceHistory } from '../hooks/useCoingeckoAPI'
import tokenList from '../sushiTL.json'




const TokenProfile = () => {

    const coinId = useParams()

    // console.log(coinId.id)



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
  const [coinLink, setCoinLink] = useState()


  const [activeTabKey1, setActiveTabKey1] = useState('Chart')
  const [activeTabKey2, setActiveTabKey2] = useState('app')
  const [activeTabKey3, setActiveTabKey3] = useState('swap')

const days = usePriceHistory(coinId.id, 1, 'min')
const week = usePriceHistory(coinId.id, 14, 'hr')
const year= usePriceHistory(coinId.id, 365, '24hr')
const detail= useDetailHistory(coinId.id)

 // console.log(detail)

 const tabListNoTitle = [
  {
    key: 'Chart',
    tab: 'Chart',
  },
  {
    key: 'Info',
    tab: 'Info',
  },
  {
    key: 'Swap',
    tab: 'Swap',
  },
]

const contentListNoTitle = {
  Chart:
  <HistoryChart data={coinData} />,
  Info: <TokenDisplay data={coinData.detail} />,
  Swap:
    <><Swap
      selectedProvider={injectedProvider}
      tokenList={tokenList}
      linkTokenOut={coinLink} /><CoinData data={coinData.detail} /></>,



}

const onTab1Change = key => {
  setActiveTabKey1(key)
}

const onTab2Change = key => {
  setActiveTabKey2(key)
}

const onTab3Change = key => {
  setActiveTabKey3(key)
}

  useEffect(() => {

    const GetCoinData = async () => {

        setCoinData({
          day: formatData(days?.prices),
          week: formatData(week?.prices),
          year: formatData(year?.prices),
          detail: detail?.data[0],
        })

    }

    GetCoinData()
  }, [coinId.id, detail, days, week, year])



  const formatData = data => {
    return data?.map(el => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      }
    })
  }

  useEffect(() => {

    const GetCoinLink = async () => {

        setCoinLink(coinId.id)

    }

    GetCoinLink()
  }, [coinId.id, coinId])




return (

    <Row justify="space-around" className="mb-md">


<Card
        style={{
          width: '100%',
        }}

        tabList={tabListNoTitle}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key)
        }}
      >
        {contentListNoTitle[activeTabKey1]}
      </Card>





</Row>

)
}

export default TokenProfile

