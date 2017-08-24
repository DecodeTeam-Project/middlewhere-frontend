import React, {Component} from 'react';
import EditTask from '../modals/EditTask';
// import CompleteButton from './CompleteButton'
import api from '../../api';
import './TaskCard.css';
import {Card, CardHeader, CardTitle, CardText, CardActions, LinearProgress, FlatButton} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Face from 'material-ui/svg-icons/action/face';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AssignedList from './AssignedList'
import {pinkA200, cyan500} from 'material-ui/styles/colors';
import {cyan800} from 'material-ui/styles/colors';
import List from 'material-ui/List/List';
import './TaskCard.css';
import './ProjectCard.css';
import '../App.css';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTask:false,
      completed: 0,
      open: false,
      dataSource:[],
      searchText : '',

    };
  }

  componentDidMount(){
    this._fetchUsers();
  }

  fetchData = () => {
    api.getAutoComplete(this.state.searchText)
    .then(res => {
      this.setState({
        dataSource:res.body,
      })
    })
  }


  _completedTask = () => {
    if (this.state.completed) {
      this.setState({
        completed: 0
      })
    } else {
      this.setState({
        completed: 1
      })
    }
    api.completedTasks(this.props.id, this.state.completed, localStorage.token).catch(err=>console.log(err))
  }

  _editTaskForm = () =>{
      this.setState({
        editTask: true
      })
    }

    _closeTaskForm = () => {
      this.setState({
        editTask:false
      })
        this.props.ReRenderProject();
    }

    handleUpdateInput (searchText) {
      this.setState({
      searchText: searchText,
     })
     this.fetchData()
   }

    handleRequest = (searchText) => {
      this.setState( {
        searchText: '',
      })
      this._assignTask(searchText)
    }

    _assignTask(searchText){
      api.assignTask(this.props.id, searchText.userId)
      .then(() => {
        this._fetchUsers()
      })
    }

    _fetchUsers(taskId){
      api.getAssignedUsers(this.props.id)
      .then(data => {
        // console.log(data,"DDAATTA")
        this.setState({
          assignedUsers:data.body,
          count:data.body.length
        })
      })
    }



  render() {

    const dataSource = this.state.dataSource
    const newDataSource = dataSource.map(item => {
        return Object.assign({fullName:item.firstName+ " " +item.lastName + " " + item.email},item)});
    const dataSourceConfig =   {
      text: 'fullName',
      value: 'userId'
  }


    let { id, title, description, deadline, priority} = this.props
    let { assignedUsers, count, completed } = this.state
    if(deadline) {
      var time = moment(deadline).format("DD-MM-YYYY")
    }
    let style = {
      fontSize: '1.25rem',
    }
    let editTaskStyle = {
      height: '44px',
      width: '44px',
      color:'rgba(100, 181, 246,0.4)',
      cursor:'pointer'
    }

    return (
      <div>
            <Card className="task-card">
              <CardActions>
                {this.props.isAdmin ? <EditorModeEdit style={editTaskStyle} className="task-edit-button" onClick={this._editTaskForm}/>:null}
              </CardActions>
                <CardTitle title={ title } titleStyle={style} actAsExpander={true} showExpandableButton={true}/>
                <List
                expandable={true}>
                { assignedUsers ? assignedUsers.map(u =>

                    <AssignedList
                      key={u.id}
                      id={u.id}
                      firstName={u.firstName}
                      lastName={u.lastName}
                      email={u.email}
                      avatarUrl={u.avatarUrl}
                    />

                ) : <h4>No assigned users </h4>}
                </List>
                <CardText expandable={true}> <strong> Task Description </strong>  <br/>  { description } </CardText>
                {deadline ? <CardText expandable={true}> <strong>Deadline </strong> <br/> { time } </CardText> : null}

                {priority ? <CardText expandable={true} > {priority} priority </CardText> : null}

                { this.props.isAdmin ? <AutoComplete
                    floatingLabelText="Team Members"
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={false}
                    dataSource={newDataSource}
                    dataSourceConfig={dataSourceConfig}
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.handleRequest}
                /> : null
              }
                <br/>

                <Face color="#ef5350" /><CardText color="#ef5350"> {count}</CardText>

              <CardActions>
                  <RaisedButton label="Complete Task" secondary={true} onClick={this._completedTask}/>
                  {/* {completed === 0 ? <RaisedButton label="Task Completed" secondary={true} onClick={this._completedTask}/> : <RaisedButton label="Complete Task" secondary={true} onClick={this._completedTask}/>}  */}
              </CardActions>

            </Card>

          {this.state.editTask ? <EditTask projectId={this.props.projectId} id={id} title={title}
          description={description} deadline={deadline} closeForm={this._closeTaskForm}/> : null}
      </div>

    );
  }

}
//  <FloatingActionButton className="editButton" mini={true} zDepth={0} onClick={this._editTaskForm}><EditorModeEdit/></FloatingActionButton> :null}
