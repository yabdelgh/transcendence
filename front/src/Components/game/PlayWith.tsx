import { Box, HStack, Image, Text, useRadioGroup } from "@chakra-ui/react";
import RadioEx from "../RadioEx";

const PlayWith = ({ setOpenent }: any) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "PlayWith",
    defaultValue: "quick pairing",
    onChange: setOpenent,
  });

  return (
    <HStack
      {...getRootProps()}
      width="100%"
      height="160px"
      display="flex"
      color="gray"
      borderRadius='lg'
    >
      <RadioEx {...getRadioProps({ value: "kozmor" })}>
        <Box
          display={"flex"} width="100px" flexDir="column" alignItems={"center"} m='10px'>
          <Image
            width='70px'
            draggable={false}
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/094-robot-face-3.svg"
        />
        kozmor
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "quickPairing" })}>
        <Box
          display={"flex"} width="100px" flexDir="column" alignItems={"center"} m='10px'>
          <Image draggable={false} src={"human-target.png"} width="70px" />
          <Text>quick pairing</Text>
        </Box>
      </RadioEx>
      <RadioEx {...getRadioProps({ value: "Friend" })}>
        <Box
          display={"flex"} width="100px" flexDir="column" alignItems={"center"} m='10px'>
          <Image draggable={false} src={"human-target2.png"} width="70px" />
          <Text>Friend</Text>
        </Box>
      </RadioEx>
    </HStack>
  );
};

export default PlayWith;
