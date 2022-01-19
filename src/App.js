import React from 'react';
import './App.css';
import "./index.css";
import Axios from "axios";





const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);


class Card extends React.Component {
  render() {
    const profile = this.props;
    return(
      <div className = "github-profile">
        <div className = "info">
          <div className = "id">Employee ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profile.data.id}</div>
          <div className = "name">Employee Name: &nbsp;&nbsp;&nbsp;&nbsp;{profile.data.employee_name}</div>
          <div className = "salary">Employee Salary: &nbsp;&nbsp;&nbsp;{profile.data.employee_salary}</div>
          <div className = "age">Employee Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profile.data.employee_age}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: '' };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await
    Axios.get(`http://dummy.restapiexample.com/api/v1/employee/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };
  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <input type = "text" 
        value = {this.state.userName} 
        onChange={  event => 
          this.setState({userName: event.target.value})}
        placeholder = "Employee Id"
        required />
        <button> Add Profile</button>
      </form>
      );
  }
} 


class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState(prevState =>({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {
    return (
      <div>
        <div className = "header">{this.props.title}</div>
        <Form onSubmit = {this.addNewProfile}/>
        <CardList profiles = {this.state.profiles} />
      </div>
    );
  }
}


export default App;
