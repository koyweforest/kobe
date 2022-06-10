import React from 'react'

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data)
      return (
        <div >
          <div>
            <div>
              <span></span>
              <span>{data.name} ({(data.symbol).toUpperCase()})</span>
            </div>
            <hr />
            <div>
              <span>
                  24hr Price Change:
              </span>
              <span>    {data.price_change_percentage_24h} %</span>
            </div>
          </div>

          <div>
            <div>
            </div>
            <hr />

          </div>

          <div className="col-sm">

            <div>
            <span>    Volume(24H):  </span>
              <span>${data.total_volume}</span>
            </div>
          </div>
        </div>
      )

  }

  return <div>{renderData()}</div>
}

export default CoinData
