import * as React from 'react';
import { PureComponent } from 'react';
import { Image, Menu, Segment, Button, Icon } from 'semantic-ui-react';

// local imports
import { Tabs } from 'src/states/ChatBotState';
import TextEditor from '../Editor';

// assets
import plus_icon from '../../assets/plus_icon.svg';
import './styles.css';
import { DEFAULT_CODE_VALUE, NEW_TAB } from 'src/constants';

export const styles = {
  segment: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    padding: 0
  },
  borderStyle: {
    borderRadius: '4px',
    borderColor: '#2b2b2b',
  },
  inactiveBorderStyle: {
    borderColor: '#2b2b2b',
  },
  activeBorderStyle: {
    borderColor: '#14626c'
  },
  buttonStyle: {
    padding: 0,
    backgroundColor: 'transparent'
  }
}

interface Props {
  activeTab: string;
  tabs: Tabs[];
  addFileTabs: (tab: Tabs) => void;
  deleteFileTab: (tabKey: string) => void;
  setActiveTab: (tabKey: string) => void;
  saveCode: (key: string, code: string) => void;
}

interface State {
  isCodeChanged: boolean;
  newSavedCode: string;
}

export default class ProjectTabs extends PureComponent<Props, State> {

  state: State = {
    isCodeChanged: false,
    newSavedCode: ''
  }

  onChangeCode = (newCode: string, value: boolean) => {
    this.setState({ newSavedCode: newCode, isCodeChanged: value });
  }

  handleMenuItemClick = (e: any, data: any) => {
    if (data.name === NEW_TAB) {
      const { tabs } = this.props;
      const tablength: number = tabs.length;
      let tab: Tabs = { 
        key: `${tablength}`, 
        title: `${tablength}.js`,
        code: DEFAULT_CODE_VALUE
      };
      this.props.addFileTabs(tab);
    } else {
      this.props.setActiveTab(data.name)
    }
  }

  deleteFileTab = (tabKey: string) => {
    this.props.deleteFileTab(tabKey);
  }

  saveCode = () => {
    const { newSavedCode } = this.state;
    this.setState({ isCodeChanged: false });
    this.props.saveCode(this.props.activeTab, newSavedCode);
  }

  render() {
    const { activeTab, tabs } = this.props;
    const { isCodeChanged } = this.state;
    const activeIndex: number = tabs.findIndex((item: Tabs) => item.key === activeTab);
    return (
      <div>
        <Menu 
          attached='top' 
          tabular={true} 
          style={styles.borderStyle}
          className={'project_menu'}
        >
          {
            tabs.map((item, index) => {
              const isActive: boolean = item.key === activeTab
              return (
                <Menu.Item 
                  key={index}
                  link={false}
                  name={item.key} 
                  active={isActive} 
                  onClick={this.handleMenuItemClick}
                  style={isActive ? styles.activeBorderStyle : styles.inactiveBorderStyle}
                  className={'project_title_item'}
                >
                  <span className='project_title_text'>{item.title}</span>
                  {
                    index > 0 && isActive &&
                    <Button 
                      compact={true}
                      circular={true}
                      icon={true} 
                      style={styles.buttonStyle}
                      onClick={() => this.deleteFileTab(item.key)}
                    >
                      <Icon name="close" color={'grey'} />
                    </Button>
                  }
                </Menu.Item>
              )
            })
          }
          <Menu.Menu>
            <Menu.Item
              name={NEW_TAB}
              active={false}
              onClick={this.handleMenuItemClick}
            >
              <Image as={'img'} src={plus_icon} />
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button
                compact={true}
                disabled={!isCodeChanged}
                active={isCodeChanged} 
                onClick={this.saveCode}
                className={'Apply-Changes-Button'}
              >
                <Icon name='refresh' className='refresh' color={'grey'} />
                <span className="Apply-Changes">Apply Changes</span>
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment 
          attached='bottom' 
          className={'ui six wide segment'}
          style={{ ...styles.segment , ...styles.borderStyle }}
        >
          <TextEditor 
            activeKey={activeTab}
            isCodeChanged={isCodeChanged}
            onChangeCode={this.onChangeCode}
            defaultCode={tabs[activeIndex].code}
          />
        </Segment>
      </div>
    )
  }
}