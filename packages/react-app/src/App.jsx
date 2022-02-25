/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useCallback, useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { Button, Card, Input, Steps } from 'antd'
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'
import { useEventListener } from 'eth-hooks/events/useEventListener'

import { MainLayout } from './components/layouts/MainLayout'
import externalContracts from './contracts/external_contracts'
// contracts
import deployedContracts from './contracts/hardhat_contracts.json'
import DebugPage from './pages/DebugPage'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Pledge from './pages/Pledge'
import Ranking from './pages/Ranking'
import ReFi from './pages/ReFi'
import RegenArt from './pages/RegenArt'
import { TokenBalance } from './components'
import { ALCHEMY_KEY, HOOK_OPTIONS, NETWORKS } from './constants'
import { Transactor, Web3ModalSetup } from './helpers'
import { useStaticJsonRPC } from './hooks'

import 'antd/dist/antd.css'
import './styles/index.css'

const { ethers } = require('ethers')
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/scaffold-eth/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Alchemy.com & Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

// / 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.polygon // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
const polyNetwork = NETWORKS.polygon

// 😬 Sorry for all the console logging
const DEBUG = false
const NETWORKCHECK = true
const USE_BURNER_WALLET = false // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false

const web3Modal = Web3ModalSetup()

// 🛰 providers
const providers = [
  'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  'https://rpc.scaffoldeth.io:48544',
]

const App = () => {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, 'mainnet', 'rinkeby']

  const [injectedProvider, setInjectedProvider] = useState()
  const [address, setAddress] = useState()
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0])
  const location = useLocation()

  const targetNetwork = NETWORKS[selectedNetwork]

  // 🔭 block explorer URL
  const { blockExplorer } = targetNetwork

  // load all your providers
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ])
  const mainnetProvider = useStaticJsonRPC(providers)

  // Provider for Polygon Network
  const polyProviderUrl = polyNetwork.rpcUrl
  const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl)

  if (DEBUG) console.log(`Using ${selectedNetwork} network`)

  // 🛰 providers
  if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum')

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider()

    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect === 'function')
      await injectedProvider.provider.disconnect()

    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider)

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, 'fast')
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET)
  const userSigner = userProviderAndSigner.signer

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress()

        setAddress(newAddress)
      }
    }

    getAddress()
  }, [userSigner])

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice)

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address, HOOK_OPTIONS)

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address, HOOK_OPTIONS)
  const yourMaticBalance = useBalance(polyProvider, address, HOOK_OPTIONS)

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} }

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig)

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId)

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig)
  const polyContracts = useContractLoader(polyProvider, contractConfig)

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`)
  })

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(
    mainnetContracts,
    'DAI',
    'balanceOf',
    ['0x34aA3F359A9D614239015126635CE7732c18fDF3'],
    HOOK_OPTIONS,
  )

  // Polybalances
  const myPolyMCO2Balance = useContractReader(polyContracts, 'PMCO2', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyBCTBalance = useContractReader(polyContracts, 'PBCT', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyNCTBalance = useContractReader(polyContracts, 'NCT', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolySKlimaBalance = useContractReader(polyContracts, 'sKLIMA', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyWethBalance = useContractReader(polyContracts, 'WETH', 'balanceOf', [address], HOOK_OPTIONS)

  // const koyweTokenBalance = useContractReader(readContracts, "KoyweToken", "balanceOf", [address]);

  // keep track of contract balance to know how much has been staked total:
  const kpledgeContractBalance = useBalance(
    localProvider,
    readContracts && readContracts.KoywePledge ? readContracts.KoywePledge.address : null,
    HOOK_OPTIONS,
  )

  if (DEBUG) console.log('💵 kpledgeContractBalance', kpledgeContractBalance)

  // ** keep track of a variable from the contract in the local React state:
  const pledged = useContractReader(readContracts, 'KoywePledge', 'isPledged', [address], HOOK_OPTIONS)

  console.log('💸 pledged:', pledged)

  // ** keep track of a variable from the contract in the local React state:
  const tonsPledged =
    useContractReader(readContracts, 'KoywePledge', 'getCommitment', [address], HOOK_OPTIONS) / 10 ** 9

  console.log('💸 tons pledged:', tonsPledged ? tonsPledged.toString() : '...')

  // ** 📟 Listen for broadcast events
  const pledgeEvents = useEventListener(readContracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  console.log('📟 pledge events:', pledgeEvents)

  const CO2TokenBalance = useContractReader(readContracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

  console.log('🏵 CO2TokenBalance:', CO2TokenBalance ? ethers.utils.formatEther(CO2TokenBalance) : '...')

  const [tonsCommitted, setTonsCommitted] = useState()
  const [pledging, setPledging] = useState()
  const [dripping, setDripping] = useState()

  let pledgeDisplay = ''

  if (pledged)
    pledgeDisplay = (
      <div style={{ padding: 64, backgroundColor: '#eeffef', fontWeight: 'bolder' }}>
        🌳🌳 - You have pledged to save the planet, you&apos;re now a part of the Koywe forest - 🌳🌳
        <p>Move on to step 3: the Forest</p>
      </div>
    )

  let pledgeButton = (
    <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
      <Input
        style={{ textAlign: 'center' }}
        placeholder={'annual CO2e tons committed'}
        value={tonsCommitted}
        onChange={e => {
          setTonsCommitted(e.target.value)
        }}
      />
      <Button
        type={pledged ? 'success' : 'primary'}
        size={'large'}
        loading={pledging}
        onClick={async () => {
          setPledging(true)
          await tx(writeContracts.KoywePledge.newPledge(tonsCommitted * 10 ** 9))
          setPledging(false)
        }}
      >
        🌱 Pledge On-Chain 🌱
      </Button>
    </div>
  )

  if (pledged)
    pledgeButton = (
      <div>
        <p>You are now a part of something bigger: a forest.</p>
        <Link to="/journey">
          <Button size={'large'}>🌱 Grow the Forest 🌱</Button>
        </Link>
      </div>
    )

  const millisToDate = function(milliseconds) {
    const date = new Date(milliseconds)

    return date.toString()
  }

  let pledgeBanner = ''

  if (pledged)
    pledgeBanner = (
      <div style={{ zIndex: -1, position: 'absolute', right: 300, top: 32, padding: 16, color: targetNetwork.color }}>
        🌳 PLEDGED 🌳
      </div>
    )

  let dripBalance = ''

  if (pledged)
    if (CO2TokenBalance === 0)
      dripBalance = (
        <Button
          type={CO2TokenBalance > 0 ? 'success' : 'primary'}
          size={'large'}
          loading={dripping}
          onClick={async () => {
            setDripping(true)
            await tx(writeContracts.CO2TokenContract.startDripping(address))
            setDripping(false)
          }}
        >
          💧 Start Dripping your CO2e 💧
        </Button>
      )
    else
      dripBalance = (
        <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
          <Card title="🔥 Your CO2e Tons🔥">
            <div style={{ padding: 8 }}>
              <TokenBalance balance={CO2TokenBalance} fontSize={64} /> CO2e Tons emitted since pledging; the share of
              the problem you own
            </div>
          </Card>
        </div>
      )

  const { Step } = Steps

  const [prices, setPrices] = useState(null)

  // read prices from coingecko
  useEffect(() => {
    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=toucan-protocol-base-carbon-tonne,moss-carbon-credit,klima-dao,staked-klima&vs_currencies=usd',
      )
      const data = await response.json()

      // store the data into our prices variable
      setPrices(data)
    }

    getData()
  }, [])

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      yourMaticBalance &&
      readContracts &&
      writeContracts &&
      polyContracts &&
      mainnetContracts
    ) {
      console.log('_____________________________________ 🏗 scaffold-eth _____________________________________')
      console.log('🌎 mainnetProvider', mainnetProvider)
      console.log('🌎 polyProvider', polyProvider)
      console.log('🏠 localChainId', localChainId)
      console.log('👩‍💼 selected address:', address)
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId)
      console.log('💵 yourLocalBalance', yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : '...')
      console.log('💵 yourMainnetBalance', yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : '...')
      console.log('💵 yourMaticBalance', yourMaticBalance ? ethers.utils.formatEther(yourMaticBalance) : '...')
      console.log('📝 readContracts', readContracts)
      console.log('📝 polyContracts', polyContracts)
      console.log('🌍 DAI contract on mainnet:', mainnetContracts)
      console.log(
        '💵 yourMainnetDAIBalance',
        myMainnetDAIBalance ? ethers.utils.formatEther(myMainnetDAIBalance) : '...',
      )
      console.log('💵 yourPolyMCO2Balance', myPolyMCO2Balance ? ethers.utils.formatEther(myPolyMCO2Balance) : '...')
      console.log('💵 yourPolyBCTBalance', myPolyBCTBalance ? ethers.utils.formatEther(myPolyBCTBalance) : '...')
      console.log('💵 myPolySKlimaBalance', myPolySKlimaBalance ? ethers.utils.formatEther(myPolySKlimaBalance) : '...')
      console.log('💵 myPolyWethBalance', myPolyWethBalance ? ethers.utils.formatEther(myPolyWethBalance) : '...')
      console.log('🔐 writeContracts', writeContracts)
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts,
  ])

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()

    setInjectedProvider(new ethers.providers.Web3Provider(provider))

    provider.on('chainChanged', chainId => {
      console.log(`chain changed to ${chainId}! updating providers`)
      setInjectedProvider(new ethers.providers.Web3Provider(provider))
    })

    provider.on('accountsChanged', () => {
      console.log(`account changed!`)
      setInjectedProvider(new ethers.providers.Web3Provider(provider))
    })

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason)
      logoutOfWeb3Modal()
    })
    // eslint-disable-next-line
  }, [setInjectedProvider])

  useEffect(() => {
    if (web3Modal.cachedProvider) loadWeb3Modal()
  }, [loadWeb3Modal])

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf('local') !== -1

  return (
    <MainLayout
      NETWORKCHECK={NETWORKCHECK}
      localChainId={localChainId}
      selectedChainId={selectedChainId}
      targetNetwork={targetNetwork}
      setSelectedNetwork={setSelectedNetwork}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      useBurner={USE_BURNER_WALLET}
      address={address}
      localProvider={localProvider}
      userSigner={userSigner}
      mainnetProvider={mainnetProvider}
      price={price}
      web3Modal={web3Modal}
      loadWeb3Modal={loadWeb3Modal}
      blockExplorer={blockExplorer}
      yourLocalBalance={yourLocalBalance}
    >
      <Switch>
        <Route exact path="/">
          <Home
            myPolyBCTBalance={myPolyBCTBalance}
            myPolyNCTBalance={myPolyNCTBalance}
            myPolyMCO2Balance={myPolyMCO2Balance}
            prices={prices}
            address={address}
            tonsPledged={tonsPledged}
            CO2TokenBalance={CO2TokenBalance}
            polyContracts={polyContracts}
            readContracts={readContracts}
          />
        </Route>
        <Route exact path="/ranking">
          <Ranking
            pledgeEvents={pledgeEvents}
            mainnetProvider={mainnetProvider}
            readContracts={readContracts}
            polyContracts={polyContracts}
          />
        </Route>
        <Route exact path="/rart">
          <RegenArt address={address} />
        </Route>
        <Route exact path="/pledge">
          <Pledge
            pledgeDisplay={pledgeDisplay}
            tonsPledged={tonsPledged}
            tonsCommitted={tonsCommitted}
            pledgeButton={pledgeButton}
          />
        </Route>
        <Route exact path="/journey">
          <Journey dripBalance={dripBalance} />
        </Route>
        <Route path="/refi">
          <ReFi
            address={address}
            readContracts={readContracts}
            writeContracts={writeContracts}
            polyContracts={polyContracts}
            tx={tx}
            price={price}
          />
        </Route>
        <Route exact path="/debug">
          <DebugPage />
        </Route>
      </Switch>
    </MainLayout>
  )
}

export default App
