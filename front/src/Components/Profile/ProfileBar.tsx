import { Box, Avatar, Text, Button } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import FriendButton from "../Buttons/FriendButton";
import MessageButton from "../Buttons/MessageButton";

type BlockUserDto = {
  blockerId: number;
  blockedId: number;
};

const ProfileBar = () => {
  const { userProfile, user, blockedUsers, socket } = AppState();

  const BlockUser = async () => {
    socket.emit("blockUser", {
      blockerId: user.id,
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  const UnblockUser = () => {
    socket.emit("unblockUser", {
      blockerId: user.id,
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  return (
    <Box
      width={{ base: "100%", xl: "49%" }}
      backgroundImage="linear-gradient(teal 50%, white 0%)"
      h={{ base: "600px", xl: "48%" }}
      display="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="lg"
      justifyContent={"center"}
      mb="20px"
    >
      {userProfile && (
        <>
          <Box
            height="70%"
            display="flex"
            flexDir="column"
            alignItems="center"
            borderRadius="lg"
            justifyContent="center"
          >
            {/* <Image
            borderRadius="100%"
            width="180px"
            height="190px"
            m="10px"
            src={userProfile.imageUrl || "/defaultProfilePic.png"}
          /> */}
            <Box width="13rem" height="13rem">
              <Avatar
                shadow="xl"
                fontSize="9xl"
                bg="chakra-placeholder-color"
                color="white"
                size="full"
                cursor="pointer"
                name={user.login}
                src={user.imageUrl || "/defaultProfilePic.png"}
              />
            </Box>
            <Text fontSize="30px" color="gray.600">
              {userProfile.login}
            </Text>
          </Box>
          {userProfile.id !== user.id && (
            <Box display="flex" alignItems="center" gap="1rem">
              <MessageButton target={userProfile} icon={false} />
              <FriendButton target={userProfile} icon={false} />
              <Button
                height="35px"
                onClick={
                  blockedUsers.includes(userProfile.id)
                    ? UnblockUser
                    : BlockUser
                }
              >
                {blockedUsers.includes(userProfile.id) ? "Unblock" : "Block"}
              </Button>
              <Box>
                blockedUsers:
                {JSON.stringify(blockedUsers)}
              </Box>
            </Box>
          )}
          {/* <Box display='flex' width='40%' justifyContent={'space-around'}>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            color='gray'
            mt="100px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {Friends.length}
            </Text>
            <Text>Friends</Text>
          </Box>

          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            color='gray'
            mt="100px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {Friends.length}
            </Text>
            <Text>Games</Text>
          </Box>
          </Box> */}
        </>
      )}
    </Box>
  );
};

export default ProfileBar;
