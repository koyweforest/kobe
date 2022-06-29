import Blockie from '../Blockie'

export default function PortfolioOverfiew({ address, info }) {


return <div>
    <Blockie address={address} scale={15}/>
    <hr></hr>
    {address}
<hr></hr>
    PortfolioBeans
    <hr></hr>
    Total ${(info?.total_value)?.toFixed(2)}
    <hr></hr>
    {(info?.relative_change_24h)?.toFixed(2)}% (${info?.absolute_change_24h?.toFixed(2)})


</div>
}


