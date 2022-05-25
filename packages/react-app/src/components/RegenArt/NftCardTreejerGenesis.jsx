/* eslint-disable max-lines-per-function */
import React, { useState } from 'react'
import { Button, Card, Col, Image, Row, Select, Space, Typography } from 'antd'
import styled from 'styled-components'

import ConnectButton from '../common/ConnectButton'
import { StyledButton } from '../common/StyledButton'

const { Text, Title, Paragraph } = Typography
const { Option } = Select
const { utils } = require('ethers')

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: '100%';
  align-items: flex-end;
  height: 65px;
  gap: 10px;
  margin-bottom: 0;
`

const NftCardTreejerGenesis = ({ title, mintPrice, address, buying, handleMint, approving, isTokenAmountApproved, handleApproveToken }) => {
  return (
    <Card className="card-regen-art">
      <Row gutter={[24, 8]} wrap>
        {/* Left side */}
        <Col
          span={24}
          md={9}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Space direction="vertical" align="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Image width={'16.688rem'} height={'16.688rem'} preview={false} src={'/icon/treejerGenesis.svg'} />
            <Title level={5}>{title}</Title>
          </Space>
        </Col>
        {/* right side */}
        <Col span={24} md={15}>
          <Row>
            <Col
              style={{
                minHeight: '16.688rem',
              }}
            >
              <Space direction="vertical" size={'large'}>
                <Space size={'large'} wrap>
                  <Text>Price: {mintPrice && utils.formatEther(mintPrice)} WETH</Text>
                  {/* <Text style={{ marginLeft: 10 }}>-20 CO2 tons / tree</Text> */}
                </Space>
                <Space direction="vertical">
                  <Paragraph>
                    Treejer Genesis Trees
                    <br />
                    <br />
                    Genesis collection refers to the first 10,000 Treejer trees being planted via its Protocol.
                    <br />
                    This collection helps fund the project after their token-free investment by UNICEF Innovation Fund.
                    <br />
                    Genesis trees will be planted in 10 countries in Latin America, Africa and Middle East. The price
                    started at 0.03 WETH, and has increased every 100 trees being sold. You can see the current price above.
                    <br />
                    70% of funds from Genesis Trees will be allocated to Treejer&apos;s treasury, the rest to reforestation.
                    <br />
                    <br />
                    <small>
                      Find out more about the Genesis collection at{' '}
                      <a href="https://blog.treejer.com/announcing-the-launch-of-treejer-protocol-with-genesis-trees/" target="_blank">
                        Treejer
                      </a>.
                    </small>
                  </Paragraph>
                </Space>
              </Space>
            </Col>
          </Row>
          <ButtonsContainer>
            <Col flex={1}>
              <Text>Amount</Text>
              <Select disabled style={{ width: '100%' }} defaultValue="1">
                <Option value="1">1</Option>
              </Select>
            </Col>
            {!address ? <ConnectButton /> :
            <>
              <StyledButton loading={approving} $type="primary" disabled={isTokenAmountApproved} onClick={handleApproveToken}>
                Approve WETH
              </StyledButton>
              <StyledButton $type="primary" disabled={!isTokenAmountApproved} loading={buying} onClick={handleMint}>
                MINT
              </StyledButton>
            </>
            }
          </ButtonsContainer>
        </Col>
      </Row>
    </Card>
  )
}

export default NftCardTreejerGenesis
