import React, {Component} from 'react';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';
import Firebase  from 'firebase';
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'

const config = {
  apiKey: 'AIzaSyChmJltH2XWaFx9YbHjD0jSFiWy47mjsjY',
  authDomain: 'dy-comments.firebaseapp.com',
  databaseURL: 'https://dy-comments.firebaseio.com',
  projectId: 'dy-comments',
  storageBucket: 'dy-comments.appspot.com',
  messagingSenderId: '193212718286'
};
Firebase.initializeApp(config);

class Comments extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    }
  }

  componentWillMount() {
    this.bindAsArray(Firebase.database().ref('comments'), 'data');
  }

  handleCommentAdd(comment) {
    this.firebaseRefs['data'].push(comment);
  }

  render() {
    return (<div>
      <h1 style={{marginLeft:16}}>Анонимные комментарии</h1>
      <CommentsList data={this.state.data}/>
      <CommentsForm handleCommentAdd={this.handleCommentAdd.bind(this)}/>
    </div>);
  }
}

reactMixin(Comments.prototype, ReactFireMixin);

export default Comments;
