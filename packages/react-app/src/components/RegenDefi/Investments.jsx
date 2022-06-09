/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Card, Col, Image, List, Row, Typography } from 'antd'
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

import { usePriceHistory } from '../../hooks/useCoingeckoAPI'
import { useAccountTransactions, useOldBalance } from '../../hooks/usePolyscanAPI'
import sushiTokenList from '../../sushiTL.json'

const { Title: TypoTitle } = Typography
const { utils, BigNumber } = require('ethers')

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const Investments = ({ address, contracts }) => {
  const transactions = useAccountTransactions(address)
  const nctTxs = useOldBalance(address,'0xD838290e877E0188a4A44700463419ED96c16107')
  const bctTxs = useOldBalance(address,'0x2F800Db0fdb5223b3C3f354886d907A671414A7F')
  const mco2txs = useOldBalance(address,'0xAa7DbD1598251f856C12f63557A4C4397c253Cea')
  const klimaTxs = useOldBalance(address,'0x4e78011ce80ee02d2c3e649fb657e45898257815')
  const sklimaTxs = useOldBalance(address,'0xb0C22d8D350C67420f06F48936654f567C73E8C8')
  const cbtcTxs = useOldBalance(address,'0x7958e9fa5cf56aebedd820df4299e733f7e8e5dd')
  const cnbedTxs = useOldBalance(address,'0x0765425b334d7db1f374d03f4261ac191172bef7')

  // const nctPrice = usePriceHistory('0xD838290e877E0188a4A44700463419ED96c16107',30,'daily')
  // const bctPrice = usePriceHistory('0x2F800Db0fdb5223b3C3f354886d907A671414A7F',30,'daily')
  // const mco2Price = usePriceHistory('0xAa7DbD1598251f856C12f63557A4C4397c253Cea',30,'daily')
  // const klimaPrice = usePriceHistory('0x4e78011ce80ee02d2c3e649fb657e45898257815',30,'daily')
  // const sklimaPrice = usePriceHistory('0xb0C22d8D350C67420f06F48936654f567C73E8C8',30,'daily')

  const wethAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
  const wbtcAddress = '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'
  const dfiAddress = '0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369'
  const priceHistory = []

  priceHistory[wethAddress] = usePriceHistory(wethAddress,30,'daily')
  priceHistory[wbtcAddress] = usePriceHistory(wbtcAddress,30,'daily')
  priceHistory[dfiAddress] = usePriceHistory(dfiAddress,30,'daily')

  // console.log(nctPrice)

  const getDatesBetween = pastDays => {
    const dates = []
    const endDate = new Date()
    const currentDate = new Date(new Date().setDate(endDate.getDate()-pastDays))

    while (currentDate < endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    dates.push(endDate)

    return dates
  }

  useEffect(() => {
    const calculateBalances = () => {
      const dates = getDatesBetween(30)
      const portfolio = []

      if(nctTxs && bctTxs && mco2txs && klimaTxs && sklimaTxs && cbtcTxs && cnbedTxs) {
        const nctBalance = {}
        const bctBalance = {}
        const mco2Balance = {}
        const klimaBalance = {}
        const sklimaBalance = {}
        const cbtcBalance = {}
        const cnbedBalance = {}

        dates.forEach(date => {
          nctBalance[date.getTime()] = 0
          bctBalance[date.getTime()] = 0
          mco2Balance[date.getTime()] = 0
          klimaBalance[date.getTime()] = 0
          sklimaBalance[date.getTime()] = 0
          cbtcBalance[date.getTime()] = 0
          cnbedBalance[date.getTime()] = 0

          nctTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              nctBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          bctTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              bctBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          mco2txs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              mco2Balance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          klimaTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              klimaBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          sklimaTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              sklimaBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          cbtcTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              cbtcBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
          cnbedTxs.forEach(tx => {
            if(tx.timeStamp*1000 <= date.getTime())
              cnbedBalance[date.getTime()] += (address.toLowerCase() === tx.from.toLowerCase() ? (-1) : (1)) * Number(utils.formatUnits(tx.value,tx.tokenDecimal))
          })
        })
        console.log(nctBalance)
      }


      const newChartData = {
        labels: dates,
        datasets: [
          {
            label: 'CBTC',
            data: portfolio,
            borderColor: '#3f9c49',
            backgroundColor: '#3f9c49',
          },
        ],
      }

    }

    calculateBalances()
  },[transactions,nctTxs,bctTxs,mco2txs,klimaTxs,sklimaTxs,cbtcTxs,cnbedTxs])

  return (
    <Row justify="center" className="mb-md">
      {address && transactions && <List
        header={<TypoTitle level={4}>Recent Transactions</TypoTitle>}
        style={{ width: '100%' }}
        dataSource={transactions.slice(0,5)}
        renderItem={item => {
          const token = sushiTokenList.find(tok => {
            return  tok.address.toLowerCase() === item.contractAddress
          })

          return (
            <List.Item key={`${item.timeStamp+item.nonce}`}>
              <Image src={token?token.logoURI:'./icon/eth.svg'} preview={false} width={13} height={13} />
              <a href={`https://polygonscan.com/tx/${item.hash}`} target='_blank'>
                {address.toLowerCase() === item.from.toLowerCase() ? 'Sent ': 'Received '}
              </a>
              {(item.value/10**item.tokenDecimal).toFixed(2)} {item.tokenSymbol}
              {address.toLowerCase() === item.from.toLowerCase() ? ' to ':' from '}
              {address.toLowerCase() === item.from.toLowerCase() ? (item.to.length > 11 ? `${item.to.slice(0, 6)}...${item.to.substr(-3)}` : item.to) : (item.from.length > 11 ? `${item.from.slice(0, 6)}...${item.from.substr(-3)}` : item.from)}
              {' on '}{(new Date(item.timeStamp*1000)).toDateString()}
            </List.Item>
          )
        }}
      />}
    </Row>
  )
}

export default Investments
