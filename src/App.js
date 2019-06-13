import React, {Component} from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserView from './components/UserView_original';
import UserLists from './components/UserLists';

class App extends Component {

  state = { users: [] }

  fetchAll()
  {
    fetch('/api/users')
        .then(res => res.json())
        .then(users => this.setState({ users }))
        .then(console.log(this.state));
  }

  
  componentDidMount() 
  {
    this.fetchAll();
  }

  handleCreate = (data) => {
    
    console.log("handleCreate() in App.js", data);

    fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response.json());
            if (response.status >= 400) 
            {
              throw new Error("Bad response from server");
            }
            console.log("create - response:", response);
            this.fetchAll();
            return response.json();
        }).then((data) => {   
            console.log("create - data:", data);      
        }).catch((err) => {
            console.log(err);
        });
  };

  handleRemove = (id) => {

    console.log("handleRemove() in App.js", id);

    fetch('/api/users/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then((response) => {
          if (response.status >= 400) 
          {
          throw new Error("Bad response from server");
          }
          console.log("delete - response:", response);
          this.fetchAll();
      }).then((data) => {   
          console.log("delete - data:", data);      
      }).catch((err) => {
          console.log(err);
      });
  };

  handleUpdate = (userId, data) => {

    console.log("handleUpdate() in App.js", dataObj);

    var dataObj = {...data};

    fetch('/api/users/' + userId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj)
    }).then((response) => {
        if (response.status >= 400) 
        {
          throw new Error("Bad response from server");
        }
        console.log("update - response:", response);
        this.fetchAll();
        return response.json();
    }).then((data) => {   
        console.log("update - data:", data);      
    }).catch((err) => {
        console.log(err);
    });
  };

  render() 
  {
    const { users } = this.state; 
    console.log(users); 
    var divStyle = {'text-align': 'center'}
    return (
      <div>
        <div style={divStyle}>Noogle.Ca User Registration</div>
        <br/>
        <UserForm
            onCreate={this.handleCreate}
        />
        <hr />
        <center>
          <h1>Users of Noogle.Ca</h1>
        </center>
        <UserLists
            data={users}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
