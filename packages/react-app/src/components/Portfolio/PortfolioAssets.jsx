import { useState } from 'react'
import {
  ChakraProvider,
  LinkBox,
  LinkOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
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





return <ChakraProvider>

<TableContainer margin='auto'>
  <Table variant='simple'  color="whatsapp" size='lg' >
    <TableCaption placement='top'>Assets</TableCaption>
    <Thead>
    <Tr >
        <Th>Asset</Th>
        <Th>Price</Th>
        <Th>Balance</Th>
        <Th>Value</Th>
        </Tr>
     </Thead>
    <Tbody>

    {asset && asset.map(thing => (

        <LinkBox key={thing} as={Tr} _hover={{
          background: 'gray.400',
          color: 'white',
        }}>
        <Td>{ thing.asset.icon_url && <Image height={25} width={25} src={thing.asset.icon_url} /> } {!thing.asset.icon_url && <Image height={25} width={25} src={''} />} {thing.asset.name}</Td>
        <Td>${(thing.asset.price.value).toFixed(2)}</Td>
        <Td>{((thing.quantity)/(10**thing.asset.decimals)).toFixed(4)}  {thing.asset.symbol}</Td>
        <Td>${(thing.value).toFixed(2)}</Td>

        <LinkOverlay href={`#/coins/${thing.asset.symbol}`} _hover={{ color: 'blue', stroke: 'blue' }}></LinkOverlay>
        </LinkBox>

        ))}

    </Tbody>
  </Table>
</TableContainer>



</ChakraProvider>




}
