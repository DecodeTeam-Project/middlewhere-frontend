import React, {Component} from 'react';
import EditTask from '../modals/EditTask';
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
import {pinkA200} from 'material-ui/styles/colors';
import List from 'material-ui/List/List';
import './TaskCard.css';
import './ProjectCard.css';
import '../App.css';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTask:false,
      completed: 1,
      open: false,
      dataSource:[],
      searchText : '',
      assignedUsers:[]
    };
  }
  componentDidMount(){
    this._fetchAvatar();
  }

  fetchData = () => {
    api.getAutoComplete(this.state.searchText)
    .then(res => {
      console.log(res.body, 'resss')
      this.setState({
        dataSource:res.body,
      })
    })
  }


  _completedTask = () => {
    if (!this.state.completed) {
      this.setState({
        completed: 1
      })
    } else {
      this.setState({
        completed: 0
      })
    }
    api.completedTasks(this.props.id, this.state.completed, localStorage.token).then(console.log)
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
      this.setState( { searchText: '' })
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
        console.log(data)
        this.setState({
          assignedUsers:data.body
        })
      })
    }

    _fetchAvatar(taskId){
      api.getAssignedUsers(this.props.id)
      .then(data => {
        console.log(data)
        this.setState({
          assignedUsers:data.body
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
    let { assignedUsers } = this.state
    if(deadline) {
      var time = moment(deadline).format("DD-MM-YYYY")
    }

    return (
      <div>
            <Card className="task-card">
                <CardTitle title={ title }  actAsExpander={true} showExpandableButton={true}/>
                {deadline ? <CardText expandable={true}> <strong>Deadline </strong> <br/> { time } </CardText> : null}
                <CardText expandable={true}> <strong>Description </strong>  <br/>  { description } </CardText>
                {priority ? <CardText expandable={true} > {priority} priority </CardText> : null}


                <AutoComplete
                    floatingLabelText="Team Members"
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={false}
                    dataSource={newDataSource}
                    dataSourceConfig={dataSourceConfig}
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.handleRequest}
                />
                <br/>
                <Face color={pinkA200} />

                { assignedUsers ? assignedUsers.map(u =>
                  <List>
                    <AssignedList
                      key={u.id}
                      id={u.id}
                      firstName={u.firstName}
                      lastName={u.lastName}
                      email={u.email}
                      avatarUrl={u.avatarUrl}
                    />
                  </List>
                ) : <h4>No assigned users </h4>}

              <CardActions>
               {this.props.isAdmin ? <FloatingActionButton mini={true} zDepth={0} onClick={this._editTaskForm}><EditorModeEdit/></FloatingActionButton> :null}
               {this.props.isAdmin ? <RaisedButton label="Complete Task" secondary={true} onClick={this._completedTask}/> :null}
             </CardActions>

            </Card>

          {this.state.editTask ? <EditTask projectId={this.props.projectId} id={id} title={title}
          description={description} deadline={deadline} closeForm={this._closeTaskForm}/> : null}
      </div>

    );
  }

}
