import {
  IconButton,
  Tooltip,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Brightness4, Brightness7, LogoutOutlined } from "@mui/icons-material";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import noPP from "../assets/images/noPP.png";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const Header = ({ darkMode, setDarkMode, handleLogout }: HeaderProps) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </Space>
      ),
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#16975F75" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chatroom
        </Typography>
        <Tooltip title="Change theme">
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        <span style={{ marginLeft: "20px" }}>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              size="large"
              src={
                JSON.parse(localStorage.getItem("user") || "{}").profileImg ||
                noPP
              }
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
