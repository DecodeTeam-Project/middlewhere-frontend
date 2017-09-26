import React, {Component} from 'react';
import api from '../../api';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './CreateTask.css';

export default class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:'',
      value:'normal'
    };
  }


  _handleChange = (e, date) => {
    this.setState({date: date})
  }

  _handleInput = (e) => {
    e.preventDefault()
    this.setState({
      inputValue: e.target.value
    })
  }

  _handlePriority = (event, index, value) => this.setState({value});
  

  _handleClose = () => {
    this.props.closeForm()
  }

  
  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }
 
  _fetchData = () =>{
    if(!this.refs.title.getValue()){
      this.setState({titleError: "Title is required"})
    }
    else(
      api.editTasks(
      this.props.projectId,
      this.props.id,
      this.refs.title.getValue(),
      this.refs.description.getValue(),
      this.state.date ? this.state.date.toISOString().substring(0, 10) : '',
      this.state.value,
      localStorage.token)
    .then(res => {
      this.props.closeForm();
    })
    .catch(error=> console.log(error))
    )
  }

  _clearErrorState = () => {
    if(this.refs.title.getValue()){
      this.setState({titleError: ""})
    }
  }

  render(){
    const actions = [
      < FlatButton label="Cancel" primary={true} onClick={this._handleClose} />,
      < FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={(e) => this._handleClick(e)} />
    ];

    return (
      <div className="createNewProject">
        <div>
            <Dialog
              title="Edit Task"
              paperClassName="dialogPaper"
              actions={actions}
              modal={false}
              open={this.props.openForm}
              onRequestClose={this._handleClose} >
              <TextField floatingLabelText="Title: " defaultValue={this.props.title} type="text" ref="title" maxLength='100' errorText={this.state.titleError} onChange={this._clearErrorState}/>
              <DatePicker hintText="Deadline" mode="landscape" ref="deadline" onChange={(e, date) => this._handleChange(e, date)}/>
              <TextField floatingLabelText="Description: " defaultValue={this.props.description}  multiLine={true} type="text" ref="description" maxLength="140" onInput={e => this._handleInput(e)} />
              {140 - this.state.inputValue.length}
              <SelectField
                  floatingLabelText="Priority"
                  onChange={this._handlePriority}
                  value={this.state.value}
                  autoWidth={true}
                >
                  <MenuItem value={"low"} primaryText="Low" />
                  <MenuItem value={"normal"} primaryText="Normal" />
                  <MenuItem value={"high"} primaryText="High" />
                </SelectField>
            </Dialog>
        </div>
    </div>
    );
  }

}
