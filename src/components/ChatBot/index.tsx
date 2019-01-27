import * as React from 'react';
import { PureComponent } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import * as moment from 'moment';

import ProjectTabs from 'src/common/ProjectTabs';
import { Tabs, Chat } from 'src/states/ChatBotState';
import './styles.css';
import ChatBox from 'src/common/Chat';

interface Props {
  activeTab: string;
  tabs: Tabs[];
  chat: Chat[];
  loading: boolean;
  addFileTabs: (tab: Tabs) => void;
  deleteFileTab: (tabKey: string) => void;
  setActiveTab: (tabKey: string) => void;
  addChat: (chat: Chat) => void;
  saveCode: (key: string, code: string) => void;
}

interface State {
  message: string
}

export default class ChatBot extends PureComponent<Props, State> {

  state: State = {
    message: ''
  }

  addFileTabs = (tab: Tabs) => {
    this.props.addFileTabs(tab)
  };

  deleteFileTabs = (tabKey: string) => {
    this.props.deleteFileTab(tabKey);
  }

  setActiveTab = (tabKey: string) => {
    this.props.setActiveTab(tabKey);
  }

  onChange = (event: any, data: any) => {
    this.setState({ message: event.target.value });
  }

  onKeyDown = (event: any) => {
    const { message } = this.state;
    if (event.keyCode === 13) {
      event.preventDefault();
      let newChat: Chat = {
        message,
        isBotSender: false,
        createdAt: moment().format('YYYY-MM-DD')
      }
      this.setState({ message: '' });
      this.props.addChat(newChat);
    }
  }

  saveCode = (key: string, code: string) => {
    this.props.saveCode(key, code);
  }

  render() {
    const { activeTab, tabs, chat, loading } = this.props;
    return (
      <div>
        <Grid columns={2} relaxed={'very'} stackable={true}>
          <Grid.Row divided={true}>
            <Grid.Column floated={'left'} className={'ui eight wide'}>
              <ProjectTabs 
                activeTab={activeTab}
                tabs={tabs}
                addFileTabs={this.addFileTabs}
                deleteFileTab={this.deleteFileTabs}
                setActiveTab={this.setActiveTab}
                saveCode={this.saveCode}
              />
            </Grid.Column>
            <Grid.Column 
              verticalAlign={'middle'}
              className={'ui six wide centered chat-box'}
            >
              <ChatBox
                chat={chat} 
                loading={loading}
              />
              <Input
                value={this.state.message}
                placeholder={'Type message here...'}
                className={'chat-input'}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}