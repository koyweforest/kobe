import { Box, Button, Editable, EditableInput, EditablePreview, Flex, Heading, Input, Text, useClipboard } from '@chakra-ui/react'

import Blockie from '../Blockie'

export default function PortfolioOverfiew({ address, info }) {
    const { hasCopied, onCopy } = useClipboard(address)

return <Box padding={10} width={'max-content'} textAlign={'right'}>
    <Box float='left' width={'max-content'}>
     <Blockie address={address} scale={13}/>
     </Box>
<Box marginLeft={125} width={'425px'} textAlign={'left'}>
    <Heading isTruncated>
        {`${address}`.substring(0,6)}...{`${address}`.substring(38)}<Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : '⎘'}
        </Button></Heading>

    <Heading>${(info?.total_value)?.toFixed(2)}</Heading>

    <Text>{(info?.relative_change_24h)?.toFixed(2)}% (${info?.absolute_change_24h?.toFixed(2)})</Text>

</Box>

</Box>
}


