import { useState } from 'react'
import { List } from 'antd'
import { format } from 'date-fns'









export default function PortfolioTransactions({ address, tx }) {

const [result, setResult] = useState('')

  //  console.log(tx)

const yeet = tx?.map(console => (
    console?.changes
))

// console.log(yeet)

const yeet_deeper = tx?.map((console, i) => (
    (console?.changes[0]?.value)/10**18
))

// console.log(yeet_deeper)








return <div>


    {tx && tx.map(thing => (

        <List key={thing.id}>  {thing.type} {(thing?.changes[0]?.value && ((thing?.changes[0]?.value)/10**18))} {thing?.changes[0]?.asset.symbol}

        || {(thing.type !=='send') && (thing.type !== 'execution') && thing.address_from} {(thing.type !=='receive') && thing.address_to} || Time: {format(new Date(thing.mined_at*1000), 'yyyy-MM-dd hh:mm:ss')}

        </List>

    ))}
    <hr></hr>


</div>




}
