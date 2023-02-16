import { Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { AppState } from "../../Context/AppProvider";
import FriendButton from "../Buttons/FriendButton";
import MessageButton from "../Buttons/MessageButton";

type BlockUserDto = {
  blockedId: number;
};

const ProfileBar = () => {
  const { userProfile, user, blockedUsers, socket, setUserProfile } =
    AppState();

  const BlockUser = async () => {
    socket.emit("blockUser", {
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  const UnblockUser = () => {
    socket.emit("unblockUser", {
      blockedId: userProfile.id,
    } as BlockUserDto);
  };

  const isBlocked = (): boolean =>
    blockedUsers.some(
      (u) => u.blockedId === user.id || u.blockerId === user.id
    );

  useEffect(() => {
    if (userProfile.id === user.id) setUserProfile(user);
  }, [user]);

  return (
    <Box
      backgroundImage="linear-gradient(teal 50%, white 0%)"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
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
            <Box width="13rem" height="13rem">
              <Avatar
                shadow="xl"
                fontSize="9xl"
                bg="chakra-placeholder-color"
                color="white"
                size="full"
                cursor="pointer"
                name={userProfile.login}
                src={userProfile.imageUrl || "/defaultProfilePic.png"}
              />
            </Box>
            <Text fontSize="30px" color="gray.600">
              {userProfile.login}
            </Text>
          </Box>
          {userProfile.id !== user.id && (
            <Box display="flex" alignItems="center" gap="1rem">
              {!isBlocked() && (
                <>
                  <MessageButton target={userProfile} icon={false} />
                  <FriendButton target={userProfile} icon={false} />
                </>
              )}
              <Button
                height="35px"
                onClick={
                  blockedUsers.find(
                    (blockedUser) => blockedUser.blockedId === userProfile.id
                  )
                    ? UnblockUser
                    : BlockUser
                }
              >
                {blockedUsers.find(
                  (blockedUser) => blockedUser.blockedId === userProfile.id
                )
                  ? "Unblock"
                  : "Block"}
              </Button>
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
