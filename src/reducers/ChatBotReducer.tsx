import { ChatBotState, Tabs } from 'src/states/ChatBotState';
import { Action } from 'src/actions';
import { ADD_TABS, DELETE_TABS, ADD_CHAT, SAVE_CODE } from 'src/actions/ChatBotActions';
import { DEFAULT_ACTIVE_TAB_KEY, DEFAULT_CODE_VALUE } from 'src/constants';

const initialState: ChatBotState = {
  isLoading: false,
  error: null,
  chat: [],
  tabs: [
    { 
      key: DEFAULT_ACTIVE_TAB_KEY, 
      title: `${DEFAULT_ACTIVE_TAB_KEY}.js`,
      code: DEFAULT_CODE_VALUE 
    }
  ],
}

const reducer = (state: ChatBotState = initialState, action: Action) => {
  // adds new tab and also sets active tab equals new tab.
  if (action.type === ADD_TABS) {
    const { tab } = action.payload
    return {
      ...state,
      tabs: [ ...state.tabs, tab],
    }
  }

  if (action.type === DELETE_TABS) {
    const { tabKey } = action.payload;
    return {
      ...state,
      tabs: state.tabs.filter((item: Tabs) => item.key !== tabKey),
    }
  }

  if (action.type === ADD_CHAT) {
    const { chat } = action.payload;
    return {
      ...state,
      chat: [ ...state.chat, chat ]
    }
  }
  
  if (action.type === SAVE_CODE) {
    const { key, code } = action.payload;
    let newTabCode: Tabs[] = [ ... state.tabs ];
    const index: number = newTabCode.findIndex((item: Tabs) => item.key === key);
    newTabCode[index].code = code;
    return {
      ...state,
      tabs: newTabCode
    }
  }
  return state;
};

export default reducer;