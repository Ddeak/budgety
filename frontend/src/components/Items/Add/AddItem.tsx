import * as React from 'react';

import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { IItem } from '../../../types/item';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: '5rem'
  },
  input: {
    margin: '0 0.5rem'
  }
});

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
    <form onSubmit={handleSubmit(onValidForm)} className={classes.container}>
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
          inputRef={register({ required: true })}
        />
        {errors.price && <FormHelperText>Required</FormHelperText>}
      </FormControl>

      <IconButton
        title="Add Item"
        type="submit"
        color="primary"
        data-testid="iconButton"
      >
        <AddIcon />
      </IconButton>
    </form>
  );
};

export default AddItem;
