import React, {Component} from 'react';
import api from '../../api';
import EditTask from '../modals/EditTask';
import AssignedList from './AssignedList'
import {Card, CardTitle, CardText, CardActions} from 'material-ui';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Face from 'material-ui/svg-icons/action/face';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import List from 'material-ui/List/List';
import moment from 'moment';
import './ProjectCard.css';
import './TaskCard.css';
import '../App.css';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTask: false,
      completed: this.props.completed,
      forMeToComplete: false,
      dataSource:[],
      searchText : ''
    };
  }

  componentDidMount() {
    this._fetchUsers()
  }

  _fetchUsers() {
    api.getAssignedUsers(this.props.id)
    .then(data => {
      this.setState({
        assignedUsers:data.body,
        count:data.body.length
      })
    })
    .then(() => {
      let {assignedUsers} = this.state;
      assignedUsers.forEach(assignedUser => {
        //Check if the user is an assignedUser to the task, if true -> show Complete button.
        if(assignedUser.id === this.props.userId) {
          this.setState({
                  forMeToComplete: true
          })
        }
      })
    })
  }

  // CHANGE TASK COMPLETION STATUS IF IT BELONGS TO USER
  _completedTask = () => {
    var newCompleted = this.state.completed ? 0 : 1;

    this.setState({
      completed: newCompleted
    })
    api.completedTasks(this.props.id, newCompleted).catch(err=>console.log(err))
  }
  
  // AUTO COMPLETE USER SEARCH BAR FOR TASK ASSIGNMENT

  //SearchText input
  handleUpdateInput (searchText) {
    this.setState({
    searchText: searchText,
    })
    this._fetchData()
  }

  //Retrieve user in search bar
  _fetchData = () => {
    api.getAutoComplete(this.state.searchText)
    .then(res => {
      this.setState({
        dataSource:res.body
      })
    })
  }
  
  //Clear searchText
  handleRequest = (searchText) => {
    this.setState( {
      searchText: '',
    })
    this._assignTask(searchText)
  }

  //Assign a user to the task and rerender assigned users
  _assignTask(searchText) {
    api.assignTask(this.props.id, searchText.userId)
    .then(() => {
      this._fetchUsers()
    })
  }

  //OPEN AND CLOSE EDIT TASK FORM
  _editTaskForm = () => {
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

  render() {
    //Display Form of retrieved user info in search bar 
    const dataSource = this.state.dataSource
    const newDataSource = dataSource.map(item => {
        return Object.assign({fullName:item.firstName+ " " +item.lastName + " " + item.email},item)});
    const dataSourceConfig = {
      text: 'fullName',
      value: 'userId'
    }

    let {id, title, description, deadline, priority} = this.props
    let {assignedUsers, count, completed , forMeToComplete} = this.state

    if(deadline) {
      var time = moment(deadline).format("DD-MM-YYYY")
    }

    let style = {
      fontSize: '1.5rem',
      padding: '0 1.2rem'
    }
    let editTaskStyle = {
      height: '44px',
      width: '44px',
      color:'#80CBC4',
      cursor:'pointer',
    }

    return (
      <div>
        <Card style={style} className="task-card">

          {/* Edit Button */}
          <CardActions>
            {this.props.isAdmin ? <EditorModeEdit style={editTaskStyle} hoverColor={'#00BFA5'} className="task-edit-button" onClick={this._editTaskForm}/> : null}
          </CardActions>
          <CardTitle title={ title } titleStyle={style} actAsExpander={true} showExpandableButton={true}/>
          <List className="task-assigned">
          {assignedUsers ? assignedUsers.map(u =>
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

          {/* AutoComplete User SearchText */}
          {this.props.isAdmin ? <AutoComplete
            floatingLabelText="Assign users"
            filter={AutoComplete.caseInsensitiveFilter}
            fullWidth={true}
            openOnFocus={false}
            dataSource={newDataSource} 
            dataSourceConfig={dataSourceConfig}
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput.bind(this)}
            onNewRequest={this.handleRequest}
          /> : null
          }
          <br/>
          <Face color="#ef5350" /><CardText style={{padding:'0', margin:'0'}} color="#ef5350"> {count} </CardText>

          {/* Complete Button */}
          <CardActions style={{padding:'1rem', fontWeight:'900'}}>
            {(forMeToComplete && completed === 1 ) ? <RaisedButton label="Task Completed" secondary={true} onClick={this._completedTask}/>
            : (forMeToComplete && completed === 0 ) ? <RaisedButton label="Complete Task" primary={true} onClick={this._completedTask}/>
            : null}
          </CardActions>
        </Card>
    
        {/* Edit Task */}
        {this.state.editTask ? <EditTask projectId={this.props.projectId} id={id} title={title}
        description={description} deadline={deadline} openForm={this.state.editTask} closeForm={this._closeTaskForm}/> : null}
      </div>
    );
  }
}
