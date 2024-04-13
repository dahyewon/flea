import ShapeImage from '@/components/atoms/ShapeImage'
import Text from '@/components/atoms/Text'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'

interface UserProfileProps {
  variant?: 'normal' | 'small'
  username: string
  profileImageUrl: string
  numberOfProducts: number
  description?: string
}

const UserProfile = ({
  variant = 'normal',
  username,
  profileImageUrl,
  numberOfProducts,
  description,
}: UserProfileProps) => {
  const profileBoxSize = variant === 'small' ?  '100px' : '120px'
  const profileImageSize = variant === 'small' ? 100 : 120

  return (
    <Flex>
      <Box minWidth={profileBoxSize}>
        <ShapeImage
          shape="circle"
          quality="85"
          src={profileImageUrl}
          alt={username}
          height={profileImageSize}
          width={profileImageSize}
        />
      </Box>
      <Box padding={1}>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Text
              as="p"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              marginBottom={1}
            >
              {username}
            </Text>
            <Text marginBottom={1} marginTop={0} as="p">
              {numberOfProducts}개 제품 게시 완료
            </Text>
            {variant === 'normal' && (
              <Text margin={0} as="p">
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default UserProfile