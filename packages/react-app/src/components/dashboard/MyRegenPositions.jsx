import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'

import { WalletContext } from '../../contexts/WalletContext'
import { createTableData } from '../../helpers/createTableData'
import { StyledButton } from '../common/StyledButton'

import { TableInfo } from './TableInfo'

const { Title } = Typography
const MyRegenPositions = () => {
  const [showAll, setShowAll] = useState(false)
  const { USDPrices, walletBalance } = useContext(WalletContext)
  const {
    polygonBCTBalance: BTC,
    polygonMCO2Balance: MCO2,
    polygonNCTBalance: NCT,
    polygonKlimaBalance: KLIMA,
    polygonSKlimaBalance: sKLIMA,
  } = walletBalance
  const [tableData, setTableData] = React.useState([])

  useEffect(() => {
    if (USDPrices && BTC && MCO2 && NCT && KLIMA && sKLIMA) {
      const tableData = createTableData(USDPrices, BTC, MCO2, NCT, KLIMA, sKLIMA)

      setTableData(tableData)
    }
  }, [USDPrices, BTC, MCO2, NCT, KLIMA, sKLIMA])

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Your regen positions</Title>
          <TableInfo data={showAll ? tableData : tableData.slice(0, 3)} />
        </Col>
      </Row>
      <Row justify="center" className="my-md">
        <StyledButton $type="primary" onClick={() => setShowAll(showAll => !showAll)}>
          {!showAll ? 'See all my tokens' : 'Hidden my tokens'}
        </StyledButton>
      </Row>
    </>
  )
}

export default MyRegenPositions