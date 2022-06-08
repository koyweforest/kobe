import React from 'react'

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data)
      return (
        <div className="bg-white mt-3 p-2 rounded border row">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category"></span>
              <span>{data.name} ({(data.symbol).toUpperCase()})</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">
                  24hr Price Change:
              </span>
              <span>    {data.price_change_percentage_24h} %</span>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
            </div>
            <hr />

          </div>

          <div className="col-sm">

            <div className="d-flex flex-column">
            <span className="text-muted coin-data-category" >    Volume(24H):  </span>
              <span>{data.total_volume}</span>
            </div>
          </div>
        </div>
      )

  }

  return <div>{renderData()}</div>
}

export default CoinData
