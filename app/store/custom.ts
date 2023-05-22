import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

export const DEFAULT_CUSTOM_CONFIG = {
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
  avatarSelection:
    "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
  customIconUrl:
    "http://127.0.0.1:8084/wp-content/plugins/ai-engine/images/chat-color-green.svg",
  position: "Bottom Right",
  temperature: 0.8,
  maxTokens: 1024,
  maxMessages: "10",
  textInputMaxLength: 8,
  embeddingSIndex: true,
};

export type CustomConfig = typeof DEFAULT_CUSTOM_CONFIG;

export type CustomConfigStore = CustomConfig & {
  reset: () => void;
  update: (updater: (config: CustomConfig) => void) => void;
};

export const useCustomConfig = create<CustomConfigStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CUSTOM_CONFIG,

      reset() {
        set(() => ({ ...DEFAULT_CUSTOM_CONFIG }));
      },

      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      },
    }),
    {
      name: StoreKey.Custom,
      version: 1,
      migrate(persistedState, version) {
        if (version === 2) return persistedState as any;

        const state = persistedState as CustomConfig;
        if (version < 1) {
          state.embeddingSIndex = false;
        }
        return state;
      },
    },
  ),
);
