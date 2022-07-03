
import React, { useState } from 'react'
import { ArrowDownIcon,ArrowUpIcon, CalendarIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Center, ChakraProvider, Circle, Heading,
    Icon,
    Image, Link, LinkBox,
    LinkOverlay, List, ListIcon, ListItem, OrderedList, Square, Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Text, Tfoot,
    Th,
    Thead,
    Tr, UnorderedList, useClipboard,
} from '@chakra-ui/react'
import { format } from 'date-fns'

import InfoText from '../components/Navbar/InfoText'



export default function PortfolioTransactions({ address, tx, asset }) {

const [result, setResult] = useState('')
const [value, setValue] = useState('')
const { hasCopied, onCopy } = useClipboard(value)
const { hasCopied2, onCopy2 } = useClipboard('')
const { hasCopied3, onCopy3 } = useClipboard('')

  //  console.log(tx)
console.log(value)

// console.log(yeet_deeper)

const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }



return <Box alignItems={'center'} justifyContent={'center'}>

  {tx &&
  <>
<Center>
<Heading>History</Heading>
</Center>



<TableContainer>
  <Table variant='simple'  color="whatsapp" size='lg' >
    {tx && tx.map(thing => (
        <>
    <Thead key={thing}>
    <Tr >
        <Th>{format(new Date(thing?.mined_at*1000), 'LLL dd')}</Th>
        <Th></Th>
        <Th width={'200px'}></Th>

        </Tr>
     </Thead>

    <Tbody>


    <LinkBox as={Tr} _hover={{
          background: 'gray.400',
          color: 'white',
        }}>
        <Td>{thing.type === 'receive' && <Icon as={ArrowDownIcon} color='green.500' />} {thing.type === 'send' && <Icon as={ArrowUpIcon} color='green.500' />} {thing.type === 'execution' && <Icon as={CalendarIcon} color='green.500' />} {capitalizeFirst(thing.type)}<List><ListItem> {format(new Date(thing?.mined_at*1000), 'hh:mm a')}</ListItem></List></Td>
        <Td>{thing.type=== 'receive' && '+'}{thing.type=== 'send' && '-'}{(thing?.changes[0]?.value && ((thing?.changes[0]?.value)/10**thing.changes[0]?.asset?.decimals).toFixed(4))} {thing?.changes[0]?.asset.symbol}<List><ListItem >{thing.type !== 'execution' && thing.type !== 'deployment' && '$'} {thing.type !== 'execution' && thing.type !== 'deployment' && (thing?.changes[0]?.price*((thing?.changes[0]?.value)/10**thing.changes[0]?.asset?.decimals)).toFixed(2)}</ListItem></List></Td>
        <Td>{thing.type=== 'receive' && 'From:'}{thing.type!== 'receive' && 'To:'}{thing.type === 'receive' && thing.type !== 'deployment' && <List><ListItem><InfoText  backgroundColor={'#4299E1'} text={thing?.address_from} /></ListItem></List>}{thing.type !== 'receive' && thing.type !== 'deployment' && <List><ListItem><InfoText backgroundColor={'#4299E1'} text={thing?.address_to} /></ListItem></List>}{thing.type === 'deployment' && <List><ListItem><InfoText backgroundColor={'#4299E1'} text={thing?.contract} /></ListItem></List>}</Td>

        <LinkOverlay href={`https://etherscan.io/tx/${thing.hash}`} _hover={{ color: 'blue', stroke: 'blue' }}></LinkOverlay>
        </LinkBox>

    </Tbody>
    </>
        ))}
  </Table>
</TableContainer>

<Box padding={5}>
<Center>
</Center>
</Box>

</>
}





    </Box>





}
