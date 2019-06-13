import React, { Component } from 'react';
import UserView from './UserView';

export default class UserLists extends Component{
    static defaultProps = {
        users: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data;
      }
      
      render() {
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
          user => (
            <UserView
              key={user.userId}
              user={user}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />)
        );
        return (
          <div>
            {list}    
          </div>
        );
      }
};