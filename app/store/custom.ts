import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

export interface CustomConfigTypeBase {
  [key: string]: boolean | string | number | undefined;
  customSet: boolean;
  searchId: string;
  customUrl: string;
  needCode: boolean;
  hideUserApiKey: boolean;
  enableGPT4: boolean;
  botName: string;
  botId: string;
  context: string;
  aiName: string;
  startSentence: string;
  userName: string;
  placeholder: string;
  sendText: string;
  clearText: string;
  showAction: boolean;
  popup: boolean;
  avatarSelection: string;
  customIconUrl: string;
  position: string;
  temperature: number;
  maxTokens: number;
  presence_penalty: number;
  maxMessages: number;
  textInputMaxLength: number;
  systemContext: string;
}

export const DEFAULT_CUSTOM_CONFIG: CustomConfigTypeBase = {
  customSet: true,
  searchId: "6edd07f4-0be2-4c8c-9a41-f3ff0c0fe26c",
  customUrl: "http://127.0.0.1:8084/wp-json/aigc/v1/aigc/context",
  needCode: true,
  hideUserApiKey: true,
  enableGPT4: true,
  botName: "12",
  botId: "12",
  context: "Converse as if you were an AI assistant. Be friendly, creative.",
  aiName: "AI:",
  startSentence: "Hi! How can I help you?",
  userName: "User: ",
  placeholder: "Type your message...",
  popup: false,
  sendText: "",
  clearText: "",
  showAction: true,
  avatarSelection:
    "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
  customIconUrl:
    "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
  position: "Bottom Right",
  temperature: 0.8,
  maxTokens: 1024,
  presence_penalty: 0,
  maxMessages: 10,
  textInputMaxLength: 8,
  systemContext:
    "Converse as if you were an AI assistant. Be friendly, creative.",
};

export interface CustomConfigFunctions {
  reset: () => void;
  update: (updater: (config: CustomConfigTypeBase) => void) => void;
}

export type CustomConfigStore = CustomConfigTypeBase & CustomConfigFunctions;

export const useCustomConfig = create(
  persist(
    (set, get) => ({
      ...DEFAULT_CUSTOM_CONFIG,
      update(updater: (config: CustomConfigTypeBase) => void) {
        const currentConfig = {
          ...DEFAULT_CUSTOM_CONFIG,
          ...(get() as CustomConfigTypeBase),
        };
        updater(currentConfig);
        set(currentConfig);
      },
    }),
    {
      name: StoreKey.Custom,
      version: 1,
      migrate(persistedState, version) {
        if (version === 2) return persistedState as any;
        const state = persistedState as CustomConfigTypeBase;
        if (version < 1) {
          state.embeddingSIndex = false;
        }
        return state;
      },
    },
  ),
);

(useCustomConfig.getState() as CustomConfigStore).reset = () => {
  useCustomConfig.setState({ ...DEFAULT_CUSTOM_CONFIG });
};
