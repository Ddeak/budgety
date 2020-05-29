import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

import { IItem } from '../../../types/item';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '35rem'
  }
});

interface IPropsType {
  createItem: (item: IItem) => void;
}

const AddItem = ({ createItem }: IPropsType) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<IItem>();

  return (
    <form onSubmit={handleSubmit(createItem)} className={classes.container}>
      <FormControl error={!!errors.name}>
        <TextField
          id="item-name"
          name="name"
          label="Name"
          inputRef={register({ required: true })}
        />
        {errors.name && <FormHelperText>Required</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors.category}>
        <TextField
          id="item-category"
          name="category"
          label="Category"
          inputRef={register({ required: true })}
        />
        {errors.category && <FormHelperText>Required</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors.price}>
        <TextField
          id="item-price"
          name="price"
          label="Price"
          inputRef={register({ required: true })}
        />
        {errors.price && <FormHelperText>Required</FormHelperText>}
      </FormControl>
    </form>
  );
};

export default AddItem;
