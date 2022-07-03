
import React, { useState } from 'react'
import { CalendarIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Center, Circle, Heading,
    Icon,
    Image, Link, List, ListIcon, ListItem, OrderedList, Square, Text, UnorderedList,
} from '@chakra-ui/react'
import { format } from 'date-fns'




export default function PortfolioTransactions({ address, tx }) {

const [result, setResult] = useState('')

  //  console.log(tx)

// console.log(yeet_deeper)

const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }



return <Box width={'max-content'} padding={'5px'}>

{tx &&
  <>
<Center>
<Heading>History</Heading>
</Center>

    {tx && tx.slice(0,5).map(thing => (


<List textAlign={'left'} padding={3} key={thing.id}>
<ListItem>
    {thing?.changes[0]?.asset.icon_url &&
    <ListIcon as={Image} src={`${thing?.changes[0]?.asset.icon_url}`}/>
    }
    {!thing?.changes[0]?.asset.icon_url &&
    <ListIcon as={CalendarIcon} color='green.500'/>}
    {capitalizeFirst(thing.type)} {(thing?.changes[0]?.value && ((thing?.changes[0]?.value)/10**18).toFixed(4))} {thing?.changes[0]?.asset.symbol}
    <List padding={1}>
        <ListItem>{format(new Date(thing.mined_at*1000), 'LLL dd')}</ListItem></List>
</ListItem>

</List>


    ))}
</>
}



    </Box>





}
