
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

const yeet = tx?.map(console => (
    console?.changes
))

// console.log(yeet)

const yeet_deeper = tx?.map((console, i) => (
    (console?.changes[0]?.value)/10**18
))

// console.log(yeet_deeper)

const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }



return <Box alignItems={'center'} justifyContent={'center'} float={'right'} border={'4px solid'} width={'max-content'}>
<Center>
<Heading>History</Heading>
</Center>

    {tx && tx.slice(0,5).map(thing => (


<List padding={3} key={thing.id}>
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

<hr></hr>
<Box padding={5}>
<Center>
<Button width={'75%'}>
    <Link href={'#/portfolio/history'}>
        See All
    </Link>
</Button>
</Center>
</Box>


    </Box>




}
