import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import ChatCard from "./chatcard";
import dynamic from "next/dynamic";
import { Loading } from "./home";
import styles from "./home.module.scss";

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

interface ChatbotSetting {
  type:
    | "input"
    | "textarea"
    | "checkbox"
    | "image_list"
    | "input_number"
    | "select";
  default: string | boolean | number;
  options?: string[];
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

interface ChatbotSettings {
  [key: string]: {
    [key: string]: ChatbotSetting;
  };
}

const StyledTextField = withStyles(() => ({
  root: {
    "& label": {
      color: "hsla(0,0%,100%,.7)",
    },
    "& label.Mui-focused": {
      color: "#7367f0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.24)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7367f0",
      },
      "&.Mui-disabled": {
        color: "rgba(255, 255, 255, 0.24)",
        borderColor: "rgba(255, 255, 255, 0.24)",
      },
    },
  },
}))(TextField);

export const ChatDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [chatbotSettings, setChatbotSettings] = useState<ChatbotSettings>({
    MAIN_SETTINGS: {
      NAME: {
        type: "input",
        default: "Default",
      },
      ID: {
        type: "input",
        default: "default",
      },
      CONTEXT: {
        type: "textarea",
        default:
          "Converse as if you were an AI assistant. Be friendly, creative.",
      },
    },
    VISUAL_SETTINGS: {
      AI_NAME: {
        type: "input",
        default: "AI:",
      },
      START_SENTENCE: {
        type: "input",
        default: "Hi! How can I help you?",
      },
      USER_NAME: {
        type: "input",
        default: "User: ",
      },
      PLACEHOLDER: {
        type: "input",
        default: "Type your message...",
      },
      SEND: {
        type: "input",
        default: "Send",
      },
      CLEAR: {
        type: "input",
        default: "Clear",
      },
      COPY_BUTTON: {
        type: "checkbox",
        default: false,
      },
      POPUP: {
        type: "checkbox",
        default: false,
      },
      FULL_SCREEN: {
        type: "checkbox",
        default: false,
      },
      COMPLIANCE_TEXT: {
        type: "input",
        default: "",
      },
      AVATAR_SELECTION: {
        type: "image_list",
        options: [
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-openai.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-1.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-2.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-3.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-4.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-5.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-robot-6.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-blue.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-red.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-traditional-1.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-traditional-2.svg",
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-traditional-3.svg",
        ],
        default:
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
      },
      CUSTOM_ICON_URL: {
        type: "input",
        default:
          "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
      },
    },
    POPUP_SETTINGS: {
      POSITION: {
        type: "select",
        default: "Bottom Right",
      },
      ICON_TEXT: {
        type: "input",
        default: "",
      },
    },
    AI_SETTINGS: {
      MODEL: {
        type: "select",
        default: "turbo",
      },
      CASUALLY_FINETUNED: {
        type: "checkbox",
        default: false,
      },
      TEMPERATURE: {
        type: "input_number",
        default: 0.8,
        step: 0.1,
        min: 0,
        max: 1,
      },
      MAXTOKENS: {
        type: "input_number",
        default: 1024,
        step: 1,
        min: 10,
        max: 2048,
      },
      MAX_MESSAGES: {
        type: "input",
        default: "10",
      },
      TEXT_INPUT_MAXLENGTH: {
        type: "input",
        default: "512",
      },
      EMBEDDING_SINDEX: {
        type: "select",
        default: "Disabled",
      },
      CONTENTA_WARE: {
        type: "checkbox",
        default: false,
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingsGroup: string,
    settingKey: string,
  ) => {
    setChatbotSettings((prevSettings) => ({
      ...prevSettings,
      [settingsGroup]: {
        ...prevSettings[settingsGroup],
        [settingKey]: {
          ...prevSettings[settingsGroup][settingKey],
          default: e.target.value,
        },
      },
    }));
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingsGroup: string,
    settingKey: string,
  ) => {
    setChatbotSettings((prevSettings) => ({
      ...prevSettings,
      [settingsGroup]: {
        ...prevSettings[settingsGroup],
        [settingKey]: {
          ...prevSettings[settingsGroup][settingKey],
          default: e.target.checked,
        },
      },
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatbotSettings((prevSettings) => ({
      ...prevSettings,
      VISUAL_SETTINGS: {
        ...prevSettings.VISUAL_SETTINGS,
        AVATAR_SELECTION: {
          ...prevSettings.VISUAL_SETTINGS.AVATAR_SELECTION,
          default: e.target.value,
        },
      },
    }));
  };

  return (
    <div className={styles["chatbotsetting"]}>
      <ChatCard handleClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "#25293c", // Changed color based on provided SCSS
            height: "100%",
          },
        }}
      >
        <Box display="flex" flexDirection="column" height="100%" padding={2}>
          <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
            {"Use Google's location service?"}
          </DialogTitle>
          <Box display="flex" flex="1" overflow="auto" gap={2}>
            <DialogContent style={{ flex: 1, backgroundColor: "#25293c" }}>
              <Box sx={{ "& > :not(style)": { m: 1 } }}>
                {Object.keys(chatbotSettings).map((settingsGroup) =>
                  Object.keys(chatbotSettings[settingsGroup]).map(
                    (settingKey) => {
                      const setting =
                        chatbotSettings[settingsGroup][settingKey];
                      if (
                        setting.type === "input" ||
                        setting.type === "input_number"
                      ) {
                        return (
                          <StyledTextField
                            key={`${settingsGroup}_${settingKey}`}
                            fullWidth
                            label={settingKey.replace("_", " ")}
                            value={setting.default.toString()}
                            onChange={(e) =>
                              handleInputChange(e, settingsGroup, settingKey)
                            }
                            variant="outlined"
                            type={
                              setting.type === "input_number"
                                ? "number"
                                : "text"
                            }
                            inputProps={
                              setting.type === "input_number"
                                ? {
                                    step: setting.step,
                                    min: setting.min,
                                    max: setting.max,
                                    sx: { color: "#fff" },
                                  }
                                : { sx: { color: "#fff" } }
                            }
                            disabled={setting.disabled}
                          />
                        );
                      } else if (setting.type === "checkbox") {
                        return (
                          <FormControlLabel
                            style={{ color: "#fff" }}
                            key={`${settingsGroup}_${settingKey}`}
                            control={
                              <Checkbox
                                checked={setting.default as boolean}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e,
                                    settingsGroup,
                                    settingKey,
                                  )
                                }
                                style={{ color: "#fff" }}
                              />
                            }
                            label={settingKey.replace("_", " ")}
                          />
                        );
                      } else {
                        return null;
                      }
                    },
                  ),
                )}
              </Box>
            </DialogContent>
            <DialogContent style={{ flex: 1, backgroundColor: "#25293c" }}>
              <Chat />
            </DialogContent>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "#7367f0" }}>
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              autoFocus
              style={{ color: "#7367f0" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};
