import { Box, Button, Text } from "@chakra-ui/react"
import Lottie from "react-lottie";
import { AppState } from "../../Context/AppProvider";
import  animationData from './loadingPong.json'

const WaitAGame = () => {
  const { socket, user, setUser} = AppState();

  const defaultOptions = {
     loop: true,
     autoplay: true,
     animationData: animationData,
     rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
     },
   };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
      width="100%"
      height="100vh"
      bg="#2E3035"
      mt="2px"
      ml="2px"
    >
      <Box width="50%" minW='600px'>
        <Lottie options={defaultOptions} />
      </Box>
      <Text fontSize={"40px"} mb="30px" color="gray.200">
        waiting for opponent
      </Text>
      <Button
        variant={"solid"}
        colorScheme="red"
        color="gray.200"
        width="120px"
        onClick={() => { socket.emit("cancelQuickPairing"); setUser((valu: any) => ({...user, WaitingAGame: false} ))}}
      >
        cancel
      </Button>
    </Box>
  );
}

export default WaitAGame