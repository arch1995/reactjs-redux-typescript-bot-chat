import * as React from 'react';
import { Component } from 'react';
import safeEval from "safe-eval";

import ChatBot from 'src/components/ChatBot';
import { Chat, Tabs } from 'src/states/ChatBotState';
import { DEFAULT_ACTIVE_TAB_KEY } from 'src/constants';
import * as moment from 'moment';
import CampK12 from 'src/helpers/Campk12Translator';

interface Props {
  error: any;
  tabs: Tabs[];
  chat: Chat[];
  addFileTabs: (tab: Tabs) => void;
  deleteFileTab: (tabKey: string) => void;
  setActiveTab: (tabKey: string) => void;
  saveCode: (key: string, code: string) => void;
  addChat: (newChat: Chat) => void;
}

interface State {
  loading: boolean;
  activeTab: string;
}

export default class ChatBotContainer extends Component<Props, State> {

  state: State = {
    loading: false,
    activeTab: DEFAULT_ACTIVE_TAB_KEY
  }

  addFileTabs = (tab: Tabs) => {
    this.setState({ activeTab: tab.key });
    this.props.addFileTabs(tab)
  };

  deleteFileTabs = (tabKey: string) => {
    this.setState({ activeTab: DEFAULT_ACTIVE_TAB_KEY })
    this.props.deleteFileTab(tabKey);
  }

  setActiveTab = (tabKey: string) => {
    console.log("NEw_TAB_key", tabKey)
    this.setState({ activeTab: tabKey });
  }

  addChat = async(newChat: Chat) => {
    console.log("newChat", newChat);
    const { tabs } = this.props;
    
    this.setState({ loading: true });

    this.props.addChat(newChat);
    const index: number = tabs.findIndex((item: Tabs) => item.key === DEFAULT_ACTIVE_TAB_KEY);
    const EvaluatedCode: string = `(${tabs[index].code})`;

    const EvaluatedResult = safeEval(EvaluatedCode, { CampK12 });
    let result = await EvaluatedResult(newChat.message).then((mes: string) => mes);
    let botReply: Chat = { 
      isBotSender: true, 
      createdAt: moment().format('YYYY-MM-DD'),
      message: result 
    }
    this.props.addChat(botReply);
    this.setState({ loading: false });
  }

  saveCode = (key: string, code: string) => {
    this.props.saveCode(key, code);
  }

  render() {
    const { chat, tabs } = this.props;
    const { activeTab, loading } = this.state;
    return (
      <ChatBot
        chat={chat}
        tabs={tabs} 
        activeTab={activeTab}
        loading={loading}
        addFileTabs={this.addFileTabs}
        deleteFileTab={this.deleteFileTabs}
        setActiveTab={this.setActiveTab}
        addChat={this.addChat}
        saveCode={this.saveCode}
      />
    )
  }
}