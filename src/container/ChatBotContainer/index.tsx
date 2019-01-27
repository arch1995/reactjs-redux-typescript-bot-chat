import { connect } from "react-redux";
import ChatBotContainer from './ChatBotContainer';
import { StoreState } from 'src/states';
import { Tabs, Chat } from 'src/states/ChatBotState';
import { addFileTabs, deleteFileTabs, setActiveTab, addChat, saveCode } from 'src/actions/ChatBotActions';

const mapStateToProps = (state: StoreState) => ({
  tabs: state.chatBotReducer.tabs,
  isLoading: state.chatBotReducer.isLoading,
  chat: state.chatBotReducer.chat,
  error: state.chatBotReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  addFileTabs: (tab: Tabs) => dispatch(addFileTabs(tab)),
  deleteFileTab: (tabKey: string) => dispatch(deleteFileTabs(tabKey)),
  setActiveTab: (tabKey: string) => dispatch(setActiveTab(tabKey)),
  addChat: (newChat: Chat) => dispatch(addChat(newChat)),
  saveCode: (key: string, code: string) => dispatch(saveCode(key, code))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotContainer)