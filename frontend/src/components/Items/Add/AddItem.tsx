import * as React from 'react';

import { useForm } from 'react-hook-form';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

import { IItem } from '../../../types/item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '7rem',
      margin: theme.spacing(1),
      width: '50vw'
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      margin: theme.spacing(1),
      width: '100%'
    },
    input: {
      margin: '0 2rem 0 1rem'
    }
  })
);

interface IPropsType {
  createItem: (item: IItem) => void;
}

const AddItem = ({ createItem }: IPropsType) => {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset } = useForm<IItem>();

  const onValidForm = (data: IItem) => {
    reset();
    createItem(data);
  };

  return (
    <Paper className={classes.container}>
      <form onSubmit={handleSubmit(onValidForm)} className={classes.form}>
        <FormControl error={!!errors.name}>
          <TextField
            id="item-name"
            name="name"
            label="Name"
            className={classes.input}
            inputRef={register({ required: true })}
          />
          {errors.name && <FormHelperText>Required</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.category}>
          <TextField
            id="item-category"
            name="category"
            label="Category"
            className={classes.input}
            inputRef={register({ required: true, maxLength: 30 })}
          />
          {errors.category && <FormHelperText>Required</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.price}>
          <TextField
            id="item-price"
            name="price"
            label="Price"
            className={classes.input}
            type="number"
            inputProps={{ step: 0.01 }}
            inputRef={register({ required: true })}
          />
          {errors.price && <FormHelperText>Required</FormHelperText>}
        </FormControl>

        <Button
          title="Add Item"
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default AddItem;
