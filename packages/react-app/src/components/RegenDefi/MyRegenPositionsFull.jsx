import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'

import { IndexContext } from '../../contexts/IndexContext'
import { WalletContext } from '../../contexts/WalletContext'
import { createTableData } from '../../helpers/createTableData'
import { StyledButton } from '../common/StyledButton'

import { TableInfo } from './TableInfo'

const { Title } = Typography
const MyRegenPositions = ({ handleModalUp }) => {
  const [showAll, setShowAll] = useState(false)
  const { USDPrices, walletBalance } = useContext(WalletContext)
  const { indexUSDPrices } = useContext(IndexContext)
  const [tableData, setTableData] = React.useState([])



  useEffect(() => {
    if (USDPrices && indexUSDPrices && walletBalance) {
      const tableData = createTableData(USDPrices, walletBalance, indexUSDPrices)

      setTableData(tableData)
    }
  }, [USDPrices, walletBalance, indexUSDPrices])

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Your regen positions</Title>
          <TableInfo data={showAll || tableData.length < 10 ? tableData : tableData.slice(0, 3)} handleModalUp={handleModalUp} />
        </Col>
      </Row>
      {tableData.length >= 10 && <Row justify="center" className="my-md">
        <StyledButton $type="primary" onClick={() => setShowAll(showAll => !showAll)}>
          {!showAll ? 'See all my tokens' : 'Hide some tokens'}
        </StyledButton>
      </Row>}
    </>
  )
}

export default MyRegenPositions
