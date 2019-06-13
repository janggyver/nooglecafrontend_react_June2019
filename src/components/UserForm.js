import React, {Component} from 'react';

class UserForm extends Component {

    state = {
        userEmail: '',
        userPassword: '',
        // userId: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); //페이지 리로딩 방지
        
        //빈입력 방지
        if(this.state.userEmail === '' || this.state.userPassword === ''){
            alert("Empty content is not allowed. Please fill out input box.");
            var emptyAlert = "Please fill out input box.";
            return;
        }
        //상태값을 onCreate를 통해 부모에게 전달
        this.props.onCreate(this.state);

        //상태 초기화
        this.setState({
            userEmail: '',
            userPassword: '',
            // userId: ''
        });

    }


    render(){
        var formStyle = { 'text-align': 'center'}
        return(
            <form onSubmit = {this.handleSubmit} style = {formStyle}>
                <div>
                    <input 
                        type = 'text'
                        placeholder = 'user email address'
                        name = 'userEmail'
                        onChange = {this.handleChange}
                        value = {this.state.userEmail}
                    />
                </div>
                <br />
                <div>
                    <input  
                            type='password'                  
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="userPassword" 
                            /*rows="15" cols="75" */ >
                    </input>
                </div>
                <div>
                    <button type="submit">회원 등록</button>
                </div>
            </form>
        )
    };
}


export default UserForm;