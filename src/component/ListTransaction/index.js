import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { CallReceived, CompareArrows } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  bgAvatar:(type) => {
      return ({
          backgroundColor: type === 'deposit' ? '#23B684': '#E74C3C',
      });
  }
}));

export default function ListTransaction({topten = [], data = []}) {
  const classes = useStyles();

  let transaction = [];

  console.log('topten', topten);

  return (
    <List className={classes.root}>
        {
            topten.length > 0 ? topten.map((id,index) => {
                transaction =  data[id];
                return(
            <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: transaction?.type_transaction == 'deposit' ? '#23B684': '#E74C3C' }}>
                  {transaction?.type_transaction == 'deposit' ? <CallReceived/> : <CompareArrows/> }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={transaction?.type_transaction} secondary={moment(transaction?.updated_at).format('LL')} />
            </ListItem>)
            }) : (null)
        }
    </List>
  );
}
