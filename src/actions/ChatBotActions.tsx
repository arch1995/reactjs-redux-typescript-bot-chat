import { Action } from '.';
import { Tabs, Chat } from 'src/states/ChatBotState';

export const ADD_TABS = 'ADD_TABS';
export const DELETE_TABS = 'DELETE_TABS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'
export const ADD_CHAT = 'ADD_CHAT';
export const SAVE_CODE = 'SAVE_CODE';

export const addFileTabs = (tab: Tabs): Action => {
  const action: Action = {
    type: ADD_TABS,
    payload: { tab }
  }
  return action;
}

export const deleteFileTabs = (tabKey: string): Action => {
  const action: Action = {
    type: DELETE_TABS,
    payload: { tabKey }
  }
  return action;
}

export const setActiveTab = (tabKey: string): Action => {
  const action: Action = {
    type: SET_ACTIVE_TAB,
    payload: { tabKey }
  }
  return action;
}

export const addChat = (newChat: Chat) => {
  const action: Action = {
    type: ADD_CHAT,
    payload: { chat: newChat }
  };
  return action;
}

export const saveCode = (key: string, code: string) => {
  const action: Action = {
    type: SAVE_CODE,
    payload: { key, code }
  };
  return action;
}