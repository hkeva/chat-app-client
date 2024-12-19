import { Box, Typography } from "@mui/material";

interface ChatroomBodyProps {
  messages: string[];
}

const ChatroomBody = ({ messages }: ChatroomBodyProps) => {
  return (
    <Box display="flex" flexGrow={1} overflow="hidden">
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={2}
        sx={{ overflow: "auto" }}
      >
        <Box flexGrow={1} overflow="auto" mb={2}>
          {messages.length === 0 ? (
            <Typography color="text.secondary">No messages yet.</Typography>
          ) : (
            messages.map((msg, index) => (
              <Typography key={index} variant="body1">
                {msg}
              </Typography>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatroomBody;
