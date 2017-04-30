import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class CommentsForm extends Component {

  constructor() {
    super();

    this.state = {
      errorText: '',
      textValue: '',
    }
  }

  handleClick() {
    const text = this.text.getValue();

    if (text.trim() === '') {
      this.setState({
        errorText: 'Напишите хоть что-нибудь',
      })
    } else {
      this.setState({
        errorText: '',
      });

      this.props.handleCommentAdd({date: +new Date(), text: text});
      this.clearInput();
    }

  }

  handleInputChange(event) {
    this.setState({
      textValue: event.target.value,
    })
  }

  clearInput() {
    this.setState({
      textValue: '',
    })
  }

  render() {
    return (
      <form style={{marginLeft:16}}>
        <div>
          <TextField
            style={{width:500}}
            floatingLabelText="Введите ваш комментарий"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            errorText= {this.state.errorText}
            multiLine={true}
            rows={1}
            rowsMax={4}
            value={this.state.textValue}
            onChange={this.handleInputChange.bind(this)}
            ref={(text) => this.text = text}
          />
        </div>
        <RaisedButton
          style={{marginTop:10}}
          label="Отправить"
          onClick={this.handleClick.bind(this)} />
      </form>
    );
  }
}
