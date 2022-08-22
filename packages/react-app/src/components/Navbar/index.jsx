import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PropertySafetyFilled } from '@ant-design/icons'
import { Col, Menu, Row } from 'antd'
import styled from 'styled-components'

import { NetworkContext } from '../../contexts/NetworkContext'
import { WalletContext } from '../../contexts/WalletContext'
import { StyledButton } from '../common/StyledButton'

import Balance from './Balance'
import KoyweSubMenu from './KoyweSubMenu'
import NetworkSelect from './NetworkSelect'
import Wallet from './Wallet'

const Logo = styled.div`
  float: left;
  width: 8.463rem;
  height: 5.625rem;
  margin: 0.313rem 0 0.313rem 0;
  background: url(${({ url }) => url});
`

const Index = ({ navbarRef, NETWORKCHECK }) => {
  const router = useHistory()
  const [path, setPath] = useState(router.pathname)
  const { isPledged } = useContext(WalletContext)
  const { disconnectWallet, userSigner, mainnetProvider, address, connectToWallet, web3Modal, injectedProvider } = useContext(NetworkContext)

  useEffect(() => {
    setPath(router.pathname)
  }, [router.pathname])

  const handleMenu = url => {
    router.push(url)
  }



  return (
    <Row ref={navbarRef} className="menu-row" justify="space-between">
      <Col>
        <Logo url="/icon/logo.svg" />
      </Col>
      <Col style={{ display: 'flex' }}>
        <Menu mode="horizontal" defaultSelectedKeys={[path]} selectedKeys={[path]} disabledOverflow className="menu">
          <Menu.Item className="menu-item" key="/dashboard" onClick={() => handleMenu('/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item className="menu-item" key="/regen-art" onClick={() => handleMenu('/regen-art')}>
            Regen art
          </Menu.Item>
          <Menu.Item className="menu-item" key="/regen-defi" onClick={() => handleMenu('/regen-defi')}>
            Regen defi
          </Menu.Item>
        </Menu>
      </Col>
      <Col className="menu-data">
        <Row gutter={10} justify="center" align="middle">
          <Col>
            <NetworkSelect NETWORKCHECK={NETWORKCHECK} />
          </Col>
          <Col>
            <Balance />
          </Col>
          <Col >
            <Wallet isPledged={isPledged} provider={userSigner} address={address} ensProvider={mainnetProvider}  />
          </Col>
          {userSigner && (
            <Col>
            {injectedProvider ? (
      <StyledButton $type="secondary" onClick={() => disconnectWallet()} style={{ marginTop: 1.6 }}>
      Logout
    </StyledButton>
  ) : (
<StyledButton $type="secondary" style={{ marginTop: '4px' }} onClick={() => connectToWallet()}>
    Connect
  </StyledButton>
  )}

            </Col>
          )}
        </Row>
      </Col>
      <Col style={{ display: 'flex' }}>
        <KoyweSubMenu path={path} handleMenu={handleMenu} />
      </Col>
    </Row>
  )
}

export default Index

