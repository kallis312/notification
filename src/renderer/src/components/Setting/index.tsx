import { HStack, IconButton } from "@chakra-ui/react"
import { HiArrowLeft } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

const index = () => {

  const navigate = useNavigate()
  return (
    <HStack p={2}>
      <HStack>
        <IconButton size={'xs'} icon={<HiArrowLeft />} colorScheme={'teal'} variant={'outline'} isRound onClick={() => { navigate('/dashboard') }} aria-label={""} />
      </HStack>
    </HStack>
  )
}

export default index