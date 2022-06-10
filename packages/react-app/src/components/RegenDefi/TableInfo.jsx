import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Image, Row, Table, Typography } from 'antd'
import styled from 'styled-components'

import { StyledButton } from '../common/StyledButton'

const { Text } = Typography
const StyledTable = styled(Table)`
  border: 2px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`

export const TableInfo = ({ data, handleModalUp }) => {


  const columns = [

    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: tokenProp => (
        <Row justify="left" align="middle">
          <div style={{ margin: 20 }}>
                  <a href={tokenProp.url} target="_blank">
            <Image src={tokenProp.icon} preview={false} height={42} width={42}/>
          </a>
          </div>
          <a href={tokenProp.url} target="_blank">
            <Text>{tokenProp.title}</Text>
          </a>
        </Row>
      ),
    },
    {
      title: 'Position (USD)',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Position (units)',
      dataIndex: 'co2',
      key: 'co2',
    },
    {
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      render: contract => (
        <Row justify="space-between" align="middle">
          <a href={contract.url} target="_blank">
            <Image src="icon/leave.svg" preview={false} height={24} />
          </a>
        </Row>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'buy',
      key: 'buy',
      render: props => handleModalUp && props.meta && props.meta === 'index' ?
      <StyledButton
        onClick={() => {
          handleModalUp(props.symbol)
        }}
        $type="primary">{props.title}
      </StyledButton>
      :
      props.symbol === 'sKLIMA'?
      <StyledButton href={`${props.url}`} target="_blank" $type="primary">{props.title}</StyledButton> :

      <Link to={`/coins/${props.symbol}`} passHref>
        <a>
          <StyledButton src="icon/leave.svg" $type="primary">{props.title}</StyledButton>
        </a>
      </Link>,
    },
  ]

  return <>{data.length > 0 && <StyledTable columns={columns} dataSource={data} pagination={false} />}</>
}
