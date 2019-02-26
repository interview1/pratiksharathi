import React from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, PagingState, IntegratedPaging,CustomPaging, SortingState ,IntegratedSorting } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

const Url = "http://localhost:52638/api";
class GridPoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [

        { name: 'employeeName', title: 'Name' },
        { name: 'designation', title: 'Designation' }
      ],
      rows: [],
      count: 0,
      deletecount: 0,
      pageSize: 5,
      pageSizes: [5, 10, 20],
      currentPage: 0,
      totalCount: 0,
     // sorting: [{ columnName: 'employeeName', direction: 'asc' }],
      SortingName : 'employeeName',
      Sortingdirection : 'asc'
    };

    this.commitChanges = this.commitChanges.bind(this);
   this.changeSorting = this.changeSorting.bind(this);
   this.changeCurrentPage = this.changeCurrentPage.bind(this);
   this.changePageSize = this.changePageSize.bind(this);
  }
  
  componentDidMount() {

    this.loadData();
  }
  

  loadData()
  {
    
  let Sname=this.state.SortingName;
   let Sdir=this.state.Sortingdirection;
    fetch(Url+"/Employee?sortName=" + Sname +"&sortDirection=" + Sdir +"&pageNo="+this.state.currentPage+"&pageSize="+this.state.pageSize)
      .then(response => response.json())
      .then(response =>
         this.setState({
           rows: response[0].emp,
           totalCount: response[0].totalCount
         }, ()=> console.log(this.state))
     
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error }));
  }

  changeSorting(sorting) {
    

    this.setState({SortingName : sorting[0].columnName, Sortingdirection:sorting[0].direction},()=>this.loadData())
   
   // this.forceUpdate();


  }
  // componentDidUpdate()
  // {
  //   if(this.state.SortingName !== "employeeName" && this.state.Sortingdirection !=='asc')
  //   {
  //     this.loadData();
  //   }
  // }



  commitChanges({ added, changed, deleted, editingRowIds }) {
    let { rows } = this.state;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].employeeId + 1 : 0;

      rows = [
        ...rows,
        ...added.map((row, index) => ({
          employeeId: startingAddedId + index,
          ...row,
        })),
      ];
      var empName = rows[rows.length - 1].employeeName;
      var empDes = rows[rows.length - 1].designation;

      fetch(Url+"/EmployeeSave?employeeName=" + empName + "&designation=" + empDes + "&id=" + 0 + "&flag=" + 0)
        .then(response => response.json())
        .then(response =>
          this.setState({
            count: response
          },()=>this.loadData())
        )
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error }));

    }
    if (changed) {
      let index = Object.keys(changed);
      
      if(changed[index].employeeName){
        rows[index].employeeName = changed[index].employeeName
      }
      if(changed[index].designation){
        rows[index].designation = changed[index].designation
      }
      //rows = rows.map(row => (changed[row.employeeId - 1] ? { ...row, ...changed[row.employeeId - 1] } : row));
      
      
        
        fetch(Url+"/EmployeeSave?employeeName=" + rows[index].employeeName + "&designation=" + rows[index].designation + "&id=" + rows[index].employeeId + "&flag=" + 1)
          .then(response => response.json())
          .then(response =>
            this.setState({
              count: response
            },()=>this.loadData())
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error }));
      

    }
    if (deleted) {

      let deleteid = rows[deleted[0]].employeeId;
      rows = rows.filter(row => row.employeeId != deleteid);
      fetch(Url+"/EmployeeDelete?id=" + deleteid)
        .then(response => response.json())
        .then(response =>
          this.setState({
            deletecount: response
          },()=>this.loadData())
        )
        // // // Catch any errors we hit and update the app
        .catch(error => this.setState({ error }));

    }

    this.setState({ rows });
  }

  changeCurrentPage(currentPage){ this.setState({ currentPage:currentPage },()=>this.loadData())
};
  changePageSize(pageSize){ this.setState({ pageSize:pageSize},()=>this.loadData())
};

  render() {
    const { rows, columns } = this.state;
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={rows.Emp}
        >
          <EditingState
            onCommitChanges={this.commitChanges}

          />
          <PagingState
            currentPage={this.state.currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={this.state.pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <PagingPanel
            pageSizes={this.state.pageSizes}
          />
      
          <SortingState
          sorting={this.state.sorting}
          onSortingChange = {this.changeSorting}
          />
          <CustomPaging
            totalCount={this.state.totalCount}
          />
          <Table />
          <TableHeaderRow showSortingControls/>
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
        </Grid>
      </Paper>
    );
  }
}

export default GridPoc;