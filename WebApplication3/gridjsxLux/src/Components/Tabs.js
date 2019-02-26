
import React from 'react';
import GridPoc from './GridCrudPoc';
//import {Tabs, Tab} from 'react-bootstrap-tabs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class ControlledTabs extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'Grid1',
      };
    }
  
    render() {
      return (
        // <Tabs

        //   id="controlled-tab-example"
        //   activeKey={this.state.key}
        //   onSelect={key => this.setState({ key })}
        // >
        //   <Tab eventKey="Grid1" title="GRID1">
        //     <GridPoc />
        //   </Tab>
        //   <Tab eventKey="Grid2" title="GRID2">
        //     <GridPoc />
        //   </Tab>
          
        // </Tabs>


/* <div className="row">
            <section>
                <Tabs style={{border:'2px solid green'}} headerStyle={{fontWeight: 'bold'}} activeHeaderStyle={{color:'blue'}} contentStyle={{backgroundColor:'lightgoldenrodyellow'}}>
                    <Tab label="Grid1" style={{color:'red', border:'2px solid green'}}><GridPoc />
                    </Tab>
                    <Tab label="Grid2"><GridPoc />
                    </Tab>                                     
                </Tabs>
            </section>
        </div> */

    <Tabs>
    <TabList>
      <Tab>Grid 1</Tab>
      <Tab>Grid 2</Tab>
    </TabList>
 
    <TabPanel>
      <h2><GridPoc /></h2>
    </TabPanel>
    <TabPanel>
      <h2><GridPoc /></h2>
    </TabPanel>
    </Tabs>
      );
    }
  }
  


  export default ControlledTabs;