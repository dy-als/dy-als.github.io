import React, {Component, PropTypes} from 'react';
import CommentsItem from './CommentsItem';
import {List} from 'material-ui/List';

export default class CommentsList extends Component {
  static defaultProps = {
    data: [],
  };

  render() {
    const data = this.props.data;

    data.sort((a, b)=>{
      if (a.date > b.date)
        return -1;
      if (a.date < b.date)
        return 1;
      return 0;
    });

    return (
      <List>
        {data.map((comment, index) => {
          return (<CommentsItem key={index} date={comment.date}>{comment.text}</CommentsItem>);
        })}
      </List>);
  }
}
