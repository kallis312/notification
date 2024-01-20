import { Box, Button, Flex, Grid, GridItem, IconButton, VStack } from "@chakra-ui/react";
import { HiOutlineChatBubbleLeftRight, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineCog6Tooth, HiOutlineMegaphone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";


const index = () => {
  const navigate = useNavigate()
  return (
    <VStack h={'100vh'} justifyContent={'space-between'} rounded={'md'} p={1} gap={1}>
      <Button onClick={() => { navigate('/dashboard') }} w={'full'} colorScheme={'teal'} variant={'outline'} fontSize={24} h={'full'} aria-label={""} justifyContent={'space-between'} ><Box rounded={'full'} bg={'teal.300'} p={2} color={'white'}><HiOutlineMegaphone /></Box><Box fontSize={32}>23</Box></Button>
      <Button onClick={() => { navigate('/dashboard') }} w={'full'} colorScheme={'teal'} variant={'outline'} fontSize={24} h={'full'} aria-label={""} justifyContent={'space-between'}><Box rounded={'full'} bg={'teal.300'} p={2} color={'white'}><HiOutlineChatBubbleOvalLeftEllipsis /></Box><Box fontSize={32}>😆</Box></Button>
      <Button onClick={() => { navigate('/dashboard') }} w={'full'} colorScheme={'teal'} variant={'outline'} fontSize={24} h={'full'} aria-label={""} justifyContent={'space-between'}><Box rounded={'full'} bg={'teal.300'} p={2} color={'white'}><HiOutlineChatBubbleLeftRight /></Box><Box fontSize={32}>😆</Box></Button>
    </VStack>
  )
}

export default index