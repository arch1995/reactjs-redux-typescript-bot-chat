import * as React from 'react';
import { PureComponent } from 'react';
import { Segment } from 'semantic-ui-react';
import { Scrollbars } from "react-custom-scrollbars";
import { BeatLoader }  from "react-spinners";

import user_icon from '../../assets/user_icon.png';
import bot from '../../assets/bot.png';
import './styles.css';
import { Chat } from 'src/states/ChatBotState';

interface Props {
  chat: Chat[];
  loading: boolean;
}

interface State {

}

const BotReplyLoader = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className={`message-div chat-left`}>
      <img src={bot} className="Bot" />
      <BeatLoader
        color={'#C0C0C0'}
      />
    </div>
  )
}

const MessageComponent = ({ isBotSender, message }) => {
  const floated: string = isBotSender ? 'chat-left' : 'chat-right';
  const imgSrc = isBotSender ? bot : user_icon;

  return (
    <div className={`message-div ${floated}`}>
      <img src={imgSrc} className="Bot" />
      <div className='message-box'>
        <span className="message-text">{message}</span>
      </div>
    </div>
  );
}

export default class ChatBox extends PureComponent<Props, State> {

  private _scrollRef: any = null;

  componentDidUpdate() {
    if (this._scrollRef) {
      this._scrollRef.scrollToBottom();
    }
  }
  render() {
    const { chat, loading } = this.props;
    return (
      <Segment 
        className={'chat-segment'}
      >
        <Scrollbars 
          ref={e => this._scrollRef = e} 
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: '100%' }}
        >
          {
            chat.length > 0 &&
            chat.map((item: Chat, index: number) => {
              return (
                <MessageComponent
                  key={index}
                  isBotSender={item.isBotSender}
                  message={item.message}
                />
              )  
            })
          } 
          <BotReplyLoader loading={loading} />
        </Scrollbars>
      </Segment>
    )
  }
}