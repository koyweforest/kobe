/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Card, Row } from 'antd'

import PortfolioAssets from '../components/Portfolio/PortfolioAssets'
import PortfolioChart from '../components/Portfolio/PortfolioChart'
import PortfolioOverfiew from '../components/Portfolio/PortfolioOverview'
import PortfolioTransactions from '../components/Portfolio/PortfolioTransactions'
import { NetworkContext } from '../contexts/NetworkContext'
import PortfolioFullTransactions from '../pages/PortfolioFullHistory'

const Portfolio = () => {
    const [infoResponse, SetinfoResponse] = useState('')
    const [chartsResponse, SetChartsResponse] = useState('')
    const [txResponse, SetTxResponse] = useState('')
    const [coinData, setCoinData] = useState({})
    const [assetResponse, SetAssetResponse] = useState('')

    const [activeTabKey1, setActiveTabKey1] = useState('Chart')
    const [activeTabKey2, setActiveTabKey2] = useState('History')

    const tabListNoTitle = [
      {
        key: 'Chart',
        tab: 'Chart',
      },
      {
        key: 'History',
        tab: 'History',
      },
      /* {
        key: 'Swap',
        tab: 'Swap',
      }, */
    ]


    const onTab1Change = key => {
      setActiveTabKey1(key)
    }

    const onTab2Change = key => {
      setActiveTabKey2(key)
    }

    /*
    const onTab3Change = key => {
      setActiveTabKey3(key)
    }

*/

    const [timeResponse, setTimeResponse] = useState({})

    const { address } = useContext(NetworkContext)


    const io = require('socket.io-client')

    const BASE_URL = 'wss://api-v4.zerion.io/'

    function verify(request, response) {
      const keys = ['address', 'currency']

      return keys.every(key => request.payload[key] === response.meta[key])
    }

    const addressSocket = {
      namespace: 'address',
      socket: io(`${BASE_URL}address`, {
        transports: ['websocket'],
        timeout: 60000,
        query: {
          api_token: 'Koywe.GynkRjhNDcaaC5u1b5GgnkONbvbKCV9v',
        },
      }),
    }

    const assetSocket = {
        namespace: 'asset',
        socket: io(`${BASE_URL}asset`, {
          transports: ['websocket'],
          timeout: 60000,
          query: {
            api_token: 'Koywe.GynkRjhNDcaaC5u1b5GgnkONbvbKCV9v',
          },
        }),
      }

    useEffect(() => {

    function get(socketNamespace, requestBody) {
      return new Promise(resolve => {
        const { socket, namespace } = socketNamespace

        function handleReceive(data) {
          if (verify(requestBody, data)) {
            unsubscribe()
            resolve(data)
          }
        }

        const model = requestBody.scope[0]

        function unsubscribe() {
          socket.off(`received ${namespace} ${model}`, handleReceive)
          socket.emit('unsubscribe', requestBody)
        }

        socket.emit('get', requestBody)
        socket.on(`received ${namespace} ${model}`, handleReceive)
      })
    }

    const info_response = get(addressSocket, {
      scope: ['portfolio'],
      payload: {
        address: address?.toLowerCase(),
        currency: 'usd',
        portfolio_fields: 'all',
      },
    }).then(response => {
      //  console.log(response?.payload.portfolio)
      SetinfoResponse(response?.payload.portfolio)
    })

    const formatData = data => {
        return data?.map(el => {
          return {
            x: el[0]*1000,
            y: el[1].toFixed(2),
          }
        })
      }


    const chart_response = interval => get(addressSocket, {
        scope: ['charts'],
        payload: {
          address: address?.toLowerCase(),
          currency: 'usd',
          charts_type: `${interval}`,
        },
      }).then(response => {
          return formatData(response?.payload.charts.others)
      })


      const GetCoinData = async () => {

        setCoinData({
            hours: await (chart_response('h')),
            days: await (chart_response('d')),
            weeks: await (chart_response('w')),
            months: await (chart_response('m')),
            years: await (chart_response('y')),
        })

    }

    GetCoinData()


const tx_response = get(addressSocket, {
    scope: ['transactions'],
    payload: {
      address: address?.toLowerCase(),
      currency: 'usd',
      asset_types: 'Polygon',
    },
  }).then(response => {
      // console.log(('txns', response?.payload))
    SetTxResponse((response?.payload.transactions))
  })

  const asset_response = get(addressSocket, {
    scope: ['positions'],
    payload: {
      address: address?.toLowerCase(),
      currency: 'usd',
    },
  }).then(response => {
      // console.log(('txns', response?.payload))
    SetAssetResponse((response?.payload.positions.positions))
  })
}, [address])





console.log(txResponse)

const contentListNoTitle = {
  Chart:

<Box display={'inline-flex'}>
    <Box  className='yeetchart' float={'left'}>
  <PortfolioChart address={address} data={coinData}
  />
    </Box>
<Box marginLeft={'3%'}>  <PortfolioTransactions address={address} tx={txResponse}
  /></Box>
    </Box>
,
  History:
  <PortfolioFullTransactions address={address} tx={txResponse} asset={assetResponse}/>,
  Swap:
    <>
    </>,
}




    return (
        <div>


            {address &&
            <PortfolioOverfiew address={address} info={infoResponse}
            />}

<Card
      style={{
        width: '100%',
        textAlign: 'center',
      }}

      tabList={tabListNoTitle}
      activeTabKey={activeTabKey1}
      onTabChange={key => {
        onTab1Change(key)
      }}
    >
      {contentListNoTitle[activeTabKey1]}
    </Card>

            {assetResponse &&
            <PortfolioAssets address={address} asset={assetResponse}
            />}






        </div>
        )


}

  export default Portfolio

