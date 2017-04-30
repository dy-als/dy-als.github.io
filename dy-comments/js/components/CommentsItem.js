import React from 'react';
import getDate from '../helpers/getDate';
import {ListItem} from 'material-ui/List';

export default function CommentsItem(props) {
  return (
    <ListItem secondaryText={getDate(props.date)}>
      <span
        dangerouslySetInnerHTML={{__html: props.children.toString()}}/>
    </ListItem>
  );
}
