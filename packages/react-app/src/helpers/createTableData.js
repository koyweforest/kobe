const { utils } = require('ethers')

// eslint-disable-next-line max-params
export const createTableData = (USDPrices, BTC, MCO2, NCT) => {
  const MCO2formated = utils.formatUnits(MCO2, 18)
  const BTCformated = utils.formatUnits(BTC, 18)
  const NCTformated = utils.formatUnits(NCT, 18)

  const MCO2BalanceUSD = MCO2formated * USDPrices['moss-carbon-credit']?.usd || 0
  const BCTBalanceUSD = BTCformated * USDPrices['toucan-protocol-base-carbon-tonne']?.usd || 0
  const NCTBalanceUSD = NCTformated * USDPrices['klima-dao']?.usd || 0

  const tableData = [
    {
      key: '1',
      token: {
        title: 'Moss CO2 Token',
        icon: 'icon/moss.svg',
      },
      position: `$${MCO2BalanceUSD.toFixed(2)}`,
      co2: Number(MCO2formated).toFixed(2),
      description: 'Moss Certified CO2 Token',
    },
    {
      key: '2',
      token: {
        title: 'Toucan CO2 Tokens',
        icon: 'icon/toucan.svg',
      },
      position: `$${BCTBalanceUSD.toFixed(2)}`,
      co2: Number(BTCformated).toFixed(2),
      description: 'Toucan vera standard credits bridged to blockchain.',
    },
    {
      key: '3',
      token: {
        title: 'Koywe CO2 Tokens',
        icon: 'icon/koywe.svg',
      },
      position: `$${NCTBalanceUSD.toFixed(2)}`,
      co2: Number(NCTformated).toFixed(2),
      description: 'Koywe certified CO2 Tokens.',
    },
  ]

  return tableData
}
