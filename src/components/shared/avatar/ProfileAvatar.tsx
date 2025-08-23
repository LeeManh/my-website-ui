import { useAuth } from "@/contexts/AuthContext";
import { Avatar, Dropdown, MenuProps } from "antd";
import { LogOut, Settings, User } from "lucide-react";
import { useMemo } from "react";

enum ProfileMenu {
  PROFILE = "profile",
  SETTINGS = "settings",
  LOGOUT = "logout",
}

export const ProfileAvatar = () => {
  const { logout } = useAuth();

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: ProfileMenu.PROFILE,
        label: "Profile",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: ProfileMenu.SETTINGS,
        label: "Settings",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        type: "divider",
      },
      {
        key: ProfileMenu.LOGOUT,
        label: "Logout",
        icon: <LogOut className="w-4 h-4" />,
        className: "!text-red-500",
      },
    ],
    []
  );

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === ProfileMenu.LOGOUT) logout();
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]} overlayClassName="w-50">
      <Avatar
        size="default"
        alt=""
        src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="flex-shrink-0 cursor-pointer"
      />
    </Dropdown>
  );
};
