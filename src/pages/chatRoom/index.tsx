import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import Header from "../../components/header";
import ChatroomBody from "../../components/chatroom/chatroomBody";
import ChatRoomSendInput from "../../components/chatroom/input";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiService";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.id) {
      try {
        await logoutUser(user.id);
        localStorage.removeItem("user");
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      console.error("No user id found in localStorage.");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogout={handleLogout}
        />

        <ChatroomBody messages={messages} />

        <div className="p-30-20">
          <ChatRoomSendInput
            onMessageChange={handleMessageChange}
            onSendMessage={handleSendMessage}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ChatRoom;
