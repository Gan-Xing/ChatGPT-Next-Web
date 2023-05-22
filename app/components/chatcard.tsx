import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import SvgIcon from "@mui/material/SvgIcon";
import { mdiPlus } from "@mdi/js";

interface ChatCardProps {
  handleClick: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ handleClick }) => (
  <CardActionArea onClick={handleClick}>
    <Card
      sx={{
        maxWidth: 345,
        height: 92,
        backgroundColor: "#2f3349",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgIcon
        sx={{
          fontSize: 40,
          color: "white",
        }}
      >
        <path d={mdiPlus} />
      </SvgIcon>
    </Card>
  </CardActionArea>
);

export default ChatCard;
