import { Avatar, AvatarBadge, Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { HiArrowRightOnRectangle, HiOutlineChatBubbleLeftRight, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineMegaphone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('token')

type Noti = {
  noti?: number
  chat?: number
  article?: number
  online?: boolean
  userId?: string
  avatar?: string
}

type IconCompProps = {
  count: number | undefined,
  icon: IconType
}

type ServerData = {
  notis?: []
  userId?: string
  avatar?: string
}

const IconComp: FC<IconCompProps> = ({ count, icon: Icon }): React.ReactNode => {
  return (
    <Box width={'full'} pos={'relative'} bg={'teal.300'} h={10} alignItems={'center'} display={'flex'} justifyContent={'center'} rounded={'full'} color={'white'}>
      <Text fontSize={24} >
        <Icon />
      </Text>
      {count! > 0 && <Text pos={'absolute'} top={-1} right={-1} bg={'red'} h={'16px'} fontSize={'12px'} w={'16px'} display={'flex'} justifyContent={'center'} alignItems={'center'} rounded={'full'}>{count}</Text>}
    </Box>
  )
}

const index = (): React.ReactNode => {
  const navigate = useNavigate()
  const [notis, setNotis] = useState<Noti>({ online: true })
  useEffect(() => {
    loadData()
    const tiemTrack = setInterval(loadData, 1000 * 10)
    return (): void => {
      clearTimeout(tiemTrack)
    }
  }, [])

  const loadData = async (): Promise<void> => {
    try {
      const { data } = await axios.get<ServerData>('/app-noti', {
        headers: {
          Authorization: token
        }
      })
      const notiCount = data.notis?.length
      setNotis({
        noti: notiCount,
        chat: notiCount,
        article: notiCount,
        userId: data.userId,
        online: true
      })
    } catch (err) {
      console.error(err)
      setNotis((prev) => ({
        ...prev,
        online: false
      }))
    }
  }

  const onLogout = (): void => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
  return (
    <VStack h={'100vh'} justifyContent={'space-between'} rounded={'md'} p={2} gap={1} pos={'relative'}>
      <VStack>
        <Avatar w={16} bg={'gray'} src={notis.avatar ? 'http://192.168.143.26:6004/api/v1/download/' + notis.avatar : undefined}>
          <AvatarBadge boxSize='1em' right={1} bottom={1} borderColor={'white'} borderWidth={2} bg={notis?.online ? 'green.500' : 'red.500'} rounded={'full'} />
        </Avatar>
        <Text>{notis.userId || 'Unknow'}</Text>
      </VStack>
      <HStack w={'full'}>
        <IconComp count={notis?.noti} icon={HiOutlineMegaphone} />
        <IconComp count={notis?.noti} icon={HiOutlineChatBubbleOvalLeftEllipsis} />
        <IconComp count={notis?.noti} icon={HiOutlineChatBubbleLeftRight} />
      </HStack>
      <IconButton icon={<HiArrowRightOnRectangle />} onClick={onLogout} size={'sm'} fontSize={16} aria-label={""} isRound pos={'absolute'} top={0} right={1} variant={'outline'} />
    </VStack>
  )
}

export default index