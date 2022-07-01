import { useState } from 'react'
import { Image, List } from 'antd'
import { format } from 'date-fns'









export default function PortfolioAssets({ address, asset }) {

const [result, setResult] = useState('')

  //  console.log(tx)
/*
const yeet = tx?.map(console => (
    console?.changes
))

// console.log(yeet)

const yeet_deeper = tx?.map((console, i) => (
    (console?.changes[0]?.value)/10**18
))

// console.log(yeet_deeper)
*/

console.log(asset)





return <div>


    {asset && asset.map(thing => (

        <List key={thing}>
          { thing.asset.icon_url && <Image height={45} width={45} src={thing.asset.icon_url} /> } {!thing.asset.icon_url && <Image height={45} width={45} src={''} />} || Token Symbol: {thing.asset.symbol} || Token Name: {thing.asset.name} || ValueUSD: ${(thing.value).toFixed(2)} || Coin Price: ${(thing.asset.price.value).toFixed(2)} || #ofCoins: {((thing.quantity)/(10**thing.asset.decimals)).toFixed(2)}

        </List>

    ))}
    <hr></hr>


</div>




}
