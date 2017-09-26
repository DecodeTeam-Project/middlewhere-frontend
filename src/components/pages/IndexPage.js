import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import CreateProjects from 'material-ui/svg-icons/file/create-new-folder';
import People from 'material-ui/svg-icons/social/people';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import RaisedButton from 'material-ui/RaisedButton';
import ImageTitle from './WorkFlowTitle.png'
import { Link } from 'react-router';
import './IndexPage.css';
import '../App.css'

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const style = {
      height: 200,
      width: 200,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    let featureIcons = {
      height: '44px',
      width: '44px',
      color:'#00BFA5',

    }

    return (
      <div className="whole">
        <header>
          <div className="header-image">
            <div><img className="workflow-title" src={ImageTitle} alt={"workflow"}/></div>
            </div>
        </header>



      <div className="index-section-one">
        <div className="index-page-row">
          <div className="index-properties">
          <Paper className="feature col-large-4 col-medium-6 col-small-12" style={style} transitionEnabled={true} zDepth={2} circle={true}>
            <CreateProjects  style={featureIcons} hoverColor={'#80CBC4'}/>
            <p className="feature-subtitle"><strong>Create Projects</strong></p>
            <p className="feature-paragraph">Organize your project into a set of tasks.</p>
          </Paper>
          </div>
          <div className="index-properties">
          <Paper className="feature col-large-4 col-medium-6 col-small-12"  style={style} transitionEnabled={true} zDepth={2} circle={true}>
            <People  style={featureIcons} hoverColor={'#80CBC4'}/>
            <p className="feature-subtitle"><strong>Assign Users</strong></p>
            <p className="feature-paragraph">Select the right person for the job.</p>
          </Paper>
          </div>
          <div className="index-properties">
          <Paper className="feature col-large-4 col-medium-6 col-small-12"  style={style} transitionEnabled={true} zDepth={2} circle={true}>
            <TrendingUp style={featureIcons} hoverColor={'#80CBC4'}/>
            <p className="feature-subtitle"><strong>Track Progress</strong></p>
            <p className="feature-paragraph">Monitor your team's work with live updates.</p>
          </Paper>
          </div>
        </div>
      </div>

        <div className="index-section-two">
          <div className="index-page-two-row" >
            <div className="index-signup col-large-6 col-medium-6 col-small-12"  style={style} >
              <p className="signup-now"><strong>Stay on Track with Workflow</strong></p>
              <Link to='/signup'> <RaisedButton label="Sign Up Now" primary={true}/></Link>
            </div>
          </div>
        </div>

        <div className="index-section-three">
          <div className="index-page-three-row" >
              <p className="middlewhere"><strong>The Team</strong></p>
          </div>
            <div className="best-team col-large-3 col-medium-3 col-small-12">
              <a href="https://github.com/armelchiza"><p className="team-images">Armel Chiza</p></a>
            </div>
            <div className="best-team col-large-3 col-medium-3 col-small-12">
              <a href="https://github.com/candicecz"><p className="team-images">Candice Czech</p></a>
            </div>
            <div className="best-team col-large-3 col-medium-3 col-small-12">
                <a href="https://github.com/rckmnz"><p className="team-images">Erick Munoz</p></a>
            </div>
            <div className="best-team col-large-3 col-medium-3 col-small-12">
              <a href="https://github.com/Jin827"><p className="team-images">Hyojin Lee</p></a>
            </div>
        </div>
      </div>
    );

  }
}
