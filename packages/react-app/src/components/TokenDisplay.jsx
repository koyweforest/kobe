import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { Button } from 'antd'

import sushiTokenList from '../sushiTL.json'

const TokenDisplay = ({ data }) => {

  const [asset, setAsset] = useState({})
  const symbol = useParams()

  useEffect(() => {
    const GetAsset= async () => {
      const _asset = sushiTokenList.find(token => {
        return token.symbol === symbol.id
      })

      setAsset(_asset)
    }

    GetAsset()
  }, [symbol])

  const renderData = () => {
    if (data && asset)
      return (
        <div className="bg-white mt-3 p-2 rounded border row">
          <div className="col-sm">
            <div style={{ justify: 'left', marginBottom: '1%' }}className="d-flex flex-column">
              <span className="text-muted coin-data-category"></span>
              <h1>
                <span>
                  <img
                    src={asset.logoURI}
                    width={35}
                    height={35}
                  />
                  {asset.name}
                </span>
              </h1>
            </div>
            <div style={{ marginTop: '5%' }} className="d-flex flex-column">
              <h2>
                <span className="text-muted coin-data-category"></span>
                <span>{asset.description}</span>
              </h2>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
            </div>
          </div>
          <div className="col-sm">
            <div style= {{ fontSize: 'large', align: 'start', marginTop: '1%', marginBottom: '5%' }}className="d-flex flex-column">
              <span className="text-muted coin-data-category" ></span>
              <span>{asset.subdescription}</span>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <hr/>
              Explorer
              <Button type='link' href={`https://polygonscan.com/token/${asset.poly}`}> PolygonScan </Button>
            <hr/>
              Website
              <Button type='link' href={`${asset.website}`} > {asset.website} </Button>
            <hr/>
          </div>
        </div>
      )
  }

  return <div>{renderData()}</div>
}

export default TokenDisplay
