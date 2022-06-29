import React, { useContext, useState } from 'react'

import PortfolioChart from '../components/Portfolio/PortfolioChart'
import PortfolioOverfiew from '../components/Portfolio/PortfolioOverview'
import { NetworkContext } from '../contexts/NetworkContext'

const Portfolio = () => {
    const [infoResponse, SetinfoResponse] = useState('')
    const [chartsResponse, SetChartsResponse] = useState('')

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
        console.log(response?.payload.portfolio)
      SetinfoResponse(response?.payload.portfolio)
    })



    const chart_response = get(addressSocket, {
        scope: ['charts'],
        payload: {
          address: address?.toLowerCase(),
          currency: 'usd',
        },
      }).then(response => {
        console.log(formatData(response?.payload.charts.others))
        SetChartsResponse(formatData(response?.payload.charts.others))
      })

      const formatData = data => {
        return data?.map(el => {
          return {
            x: el[0],
            y: el[1].toFixed(2),
          }
        })
      }
/* */



    return (
        <div>
            {address}
            <PortfolioOverfiew address={address} info={infoResponse} />
            <PortfolioChart address={address} data={chartsResponse} />

        </div>
        )


}

  export default Portfolio

