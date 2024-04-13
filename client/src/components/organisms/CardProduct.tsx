import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'

const RemoveText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

interface CartProductProps {
  id: number
  imageUrl: string
  title: string
  price: number
  onBuyButtonClick?: (id: number) => void
  onRemoveButtonClick?: (id: number) => void
}

const CartProduct = ({
  id,
  imageUrl,
  title,
  price,
  onBuyButtonClick,
  onRemoveButtonClick,
}: CartProductProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Box width="120px" height="120px">
          <Link href={`/products/${id}`} passHref>
            <Image
              quality="85"
              src={imageUrl}
              alt={title}
              height={120}
              width={120}
              objectFit="cover"
            />
          </Link>
        </Box>
        <Box padding={1}>
          <Flex
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text
                fontWeight="bold"
                variant="mediumLarge"
                marginTop={0}
                marginBottom={1}
                as="p"
              >
                {title}
              </Text>
              <Text margin={0} as="p">
                {price}원
              </Text>
            </Box>
            <Flex marginTop={{ base: 2, md: 0 }}>
              <Button
                width={{ base: '100px', md: '200px' }}
                onClick={() => onBuyButtonClick && onBuyButtonClick(id)}
              >
                구입
              </Button>
              <Button
                marginLeft={1}
                width={{ base: '100px', md: '200px'}}
                display={{ base: 'block', md: 'none' }}
                variant="danger"
                onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
              >
                삭제
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Box display={{ base: 'none', md: 'block' }}>
        <RemoveText
          color="danger"
          onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
        >
          카트에서 삭제
        </RemoveText>
      </Box>
    </Flex>
  )
}

export default CartProduct