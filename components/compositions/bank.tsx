import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Bank } from '../../typings/model';
import CardMedia from '@material-ui/core/CardMedia';

import config from '../../lib/config';

const styles = {
  card: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

interface bankProps {
  bank: Bank,
  classes: any
}

function BankCard(props: bankProps) {
  const { classes,bank } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
            className={classes.media}
            image={config.server + bank.image}
            title="Contemplative Reptile"
          />
        <CardContent>
          <Typography>
            {bank.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(BankCard);