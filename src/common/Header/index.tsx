import * as React from 'react';
import { PureComponent } from 'react';
import { Segment, Grid, Menu, GridColumn, Icon } from 'semantic-ui-react';

import './styles.css';

interface Props {

}

interface State {

}

export const styles = {
  header: { 
    borderRadius: '0px', 
    minHeight: 60, 
    padding: '0.5em 0em', 
  }
}

export default class HeaderComponent extends PureComponent<Props, State> {
  render() {
    return (
      <div className={'main_header'}>
        <Segment clearing={true} className={'header-segment'}>
          <Grid verticalAlign={'middle'} columns={3}>
            <Grid.Row>
              <Grid.Column floated={'left'} textAlign={'left'}>
                <span className="AI-playground">AI playground</span>
              </Grid.Column>
              <GridColumn />
              <Grid.Column floated={'right'} textAlign={'justified'}>
                <Menu secondary={true} floated={'right'}>
                  <Menu.Item className={'Learn-AI'}>Learn</Menu.Item>
                  <Menu.Item className={'Docs'}> Docs</Menu.Item>
                  <Menu.Item>
                    <Menu.Item className={'Account'}>Account</Menu.Item>
                    <Icon size={'large'} name={'angle down'} color={'grey'} />
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}