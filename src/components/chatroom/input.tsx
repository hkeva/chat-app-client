import { Box, Button, TextField } from "@mui/material";

interface ChatRoomSendInputProps {
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

const ChatRoomSendInput = ({
  onMessageChange,
  onSendMessage,
}: ChatRoomSendInputProps) => {
  return (
    <Box display="flex">
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Type a message..."
        onChange={onMessageChange}
      />
      <Button
        variant="contained"
        onClick={onSendMessage}
        sx={{ ml: 1, backgroundColor: "#16975F75" }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatRoomSendInput;
