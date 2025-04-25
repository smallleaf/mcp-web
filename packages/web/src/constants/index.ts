import type { IConversations, IMessage } from '@/db/interface'

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
  AI = 'assistant',
}

export const DEFAULT_TITLE = 'Untitled'
export const DEFAULT_SYSTEM_MESSAGE = '您好，我是您的智能导购助手，您可以输入您想要的商品，和素材，我会为您提供相关的商品和素材。'

export const ANT_CHAT_STRUCTURE = {
  type: 'Ant Chat',
  version: '1',
  modelConfig: {},
  conversations: [] as IConversations[],
  messages: [] as IMessage[],
  exportTime: -1,
}

export type AntChatFileStructure = typeof ANT_CHAT_STRUCTURE

export const ANT_CHAT_FILE_TYPE = { description: 'ant chat files', appcept: { 'text/plain': ['.antchat'] } }

export const TITLE_PROMPT = `Based on the chat history, give this conversation a name.
Keep it short - 10 characters max, no quotes.
Use 简体中文.
Just provide the name, nothing else.

Here's the conversation:
--------------------------------
pGqat5J/L@~U
--------------------------------
Name this conversation in 10 characters or less.
Use 简体中文.
Only give the name, nothing else.
The name is:
`
