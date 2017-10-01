//EACH PROJECTCARD FORM
import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import api from '../../api';
import EditProject from '../modals/EditProject'
import {Card, CardText, CardActions, CardMedia, CardTitle, LinearProgress} from 'material-ui';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Avatar from 'material-ui/Avatar';
import './ProjectCard.css';
import '../App.css';

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priority:0,
      editProject: false
    };
  }

    componentDidMount() {
      this._fetchTasks()
      this._fetchAvatar()
    }

    _fetchAvatar = () => {
      api.getUserAvatar(this.props.projectAdmin)
      .then((data)=>{
        this.setState({
          avatarUrl: data.body.avatarUrl
        })
      })
    }

    _fetchTasks = () => {
      api.getTasks(this.props.id)
      .then(res => {
        this.setState({
          numberOfTasks: res.body.length,
          lowPriorities: res.body
          })
      })
      .then(data => {
        this._mappingPriorities()
      })
    }

    _mappingPriorities = () => {
      let rankPriority = this.state.lowPriorities
     
      function lowPriority(item) {
        return item.priority === "low";
      }
      var filteredLow = rankPriority.filter(lowPriority)

      function normalPriority(item) {
        return item.priority === "normal";
      }
      var filteredNormal = rankPriority.filter(normalPriority)

      function highPriority(item) {
        return item.priority === "high";
      }
      var filteredHigh = rankPriority.filter(highPriority)

  

    if (rankPriority.length === 0) {
      this.setState({
        priority:'linear-gradient(140deg, rgba(188, 188, 188,1), rgba(122, 122, 122,1)'
      })
    }
     
      else if(filteredHigh.length >= filteredLow.length && filteredHigh.length >= filteredNormal.length ){
        this.setState({
          priority:'linear-gradient(140deg, rgba(247, 111, 100,1) , rgba(254, 83, 147,1)'
        })
      }

      else if(filteredNormal.length >= filteredLow.length && filteredNormal.length > filteredHigh.length){
        this.setState({
          priority:'linear-gradient(140deg, rgba(255, 213, 79,1) , rgba(255, 152, 0,1))'
        })
      }
     
      else if(filteredLow.length > filteredNormal.length && filteredLow.length > filteredHigh.length ){
        this.setState({
          priority:'linear-gradient(140deg, rgba(37, 191, 217,1) , rgba(69, 108, 173,1)'

        })
      }
    }

    //Open Edit Project card form
    _editProjectForm = () =>{
      this.setState({
        editProject: true
      })
    }
    
    //Close Edit Project card form
    _handleFormSubmitted = () => {
      this.setState({
        editProject:false
      });
      //refetch projects data to get the new list of projects w/ the edited project (in Home.js)
      this.props.editProject()
    }

    render() {
      let editProjectStyle = {
        height: '44px',
        width: '44px',
        color:'#80CBC4',
        cursor:'pointer',
      }

      //Retrieve data of all the projects from Home.js
      let { id, progress, title, deadline, description } = this.props
      if(deadline){
        var time = moment(deadline).format("DD-MM-YYYY")
      }
      return (
        <div>
              <Card className='project-card'>
                <Link to={`/projects/${id}`}>
                    <CardMedia overlayContentStyle={{background: this.state.priority}} overlay={<CardTitle title={title} subtitleStyle={{color:"#fff",fontWeight:"500",'textShadow':"1.5px 1.5px rgba(0,0,0,0.1)", fontSize:'1rem'}} subtitle={this.state.numberOfTasks >= 0 ? `${this.state.numberOfTasks} Tasks`:`${this.state.numberOfTasks} Task`} />}></CardMedia>
                    <LinearProgress color={'#00BFA5'} mode="determinate" value={progress} />
                    <div className="project-card-relative">
                      <Avatar className='project-card-avatar' src={`${this.state.avatarUrl}`}/>
                      {deadline ? <CardText><strong>Deadline</strong><br/>{time}</CardText> : <CardText><strong>Deadline</strong><br/>No Deadline Set </CardText>}
                    </div>

                    <div className="project-card-desc">
                      <CardText className="desc-width">
                        <strong>Description</strong><br/>{description}
                      </CardText>
                    </div>
                </Link>
                {/* Edit Button */}
                <CardActions>
                  {this.props.isAdmin ? <EditorModeEdit hoverColor={'#00BFA5'}  style={editProjectStyle} className="project-edit-button" onClick={this._editProjectForm}/>:null}
                </CardActions>
              </Card>

            {this.state.editProject ? <EditProject id={id} title={title}
            description={description} deadline={deadline} openForm={this.state.editProject} closeForm={this._handleFormSubmitted}/> : null}
        </div>
      );
    }
}
