import * as React from 'react';
import { PureComponent } from 'react';
import { Image, Menu, Segment, Button, Icon } from 'semantic-ui-react';
import _ from "lodash";
// local imports
import { Tabs } from 'src/states/ChatBotState';
import TextEditor from '../Editor';

// assets
import plus_icon from '../../assets/plus_icon.svg';
import './styles.css';
import { DEFAULT_CODE_VALUE, NEW_TAB, DEFAULT_ACTIVE_TAB_KEY } from 'src/constants';

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
  activeTab: string;
  isCodeChanged: boolean;
  tabs: Tabs[];
}

export default class ProjectTabs extends PureComponent<Props, State> {

  state: State = {
    activeTab: this.props.activeTab,
    tabs: _.cloneDeep(this.props.tabs),
    isCodeChanged: false,
  }

  findActiveIndex = (list: Tabs[], key: string = this.state.activeTab) => {
    return list.findIndex((item: Tabs) => item.key === key);
  }

  onChangeCode = (newCode: string) => {
    const { tabs } = this.props;
    let newStateObject: Tabs[] = _.cloneDeep(this.state.tabs);
    const index: number = this.findActiveIndex(newStateObject);
    newStateObject[index].code = newCode;
    if (this.state.activeTab === DEFAULT_ACTIVE_TAB_KEY) {
      const activeIndex: number = this.findActiveIndex(tabs);
      let isDirty: boolean = newCode !== tabs[activeIndex].code;
      this.setState({ isCodeChanged: isDirty, tabs: newStateObject });
    } else {
      this.setState({ tabs: newStateObject });
    }
  }

  handleMenuItemClick = (e: any, data: any) => {
    if (data.name === NEW_TAB) {
      const { tabs } = this.state;
      const tablength: number = tabs.length;
      let newStateObject: Tabs[] = _.cloneDeep(tabs)
      let tab: Tabs = { 
        key: `${tablength}`, 
        title: `${tablength}.js`,
        code: DEFAULT_CODE_VALUE
      };
      newStateObject.push(tab)
      this.setState({ tabs: newStateObject, activeTab: tab.key })
      this.props.addFileTabs(tab);
    } else {
      this.setState({ activeTab: data.name });
      this.props.setActiveTab(data.name)
    }
  }

  deleteFileTab = (tabKey: string) => {
    const { tabs } = this.state;
    let newStateObject: Tabs[] = _.cloneDeep(tabs);
    newStateObject = newStateObject.filter(item => item.key !== tabKey);
    this.setState({ tabs: newStateObject, activeTab: DEFAULT_ACTIVE_TAB_KEY });
    this.props.deleteFileTab(tabKey);
  }

  saveCode = () => {
    const { tabs } = this.state;
    const index: number = this.findActiveIndex(tabs, DEFAULT_ACTIVE_TAB_KEY);
    const newSavedCode = tabs[index].code;
    this.setState({ isCodeChanged: false });
    this.props.saveCode(this.props.activeTab, newSavedCode);
  }

  render() {
    const { isCodeChanged, tabs, activeTab } = this.state;
    const activeIndex: number = this.findActiveIndex(tabs, activeTab);
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
                <div 
                  key={index} 
                  style={isActive ? styles.activeBorderStyle : styles.inactiveBorderStyle}
                  className={'project-div'}
                >
                  <Menu.Item 
                    link={false}
                    name={item.key} 
                    active={isActive} 
                    onClick={this.handleMenuItemClick}
                    className={'project_title_item'}
                  >
                    <span className='project_title_text'>{item.title}</span>
                  </Menu.Item>
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
                </div>
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
          {
            activeIndex !== -1 &&
            <TextEditor 
              activeKey={activeTab}
              code={tabs[activeIndex].code}
              isCodeChanged={isCodeChanged}
              onChangeCode={this.onChangeCode}
            />
          }
        </Segment>
      </div>
    )
  }
}