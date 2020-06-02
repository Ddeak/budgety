import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface IPropsType {
  setSearchText: (category: string) => void;
  dateRange: number | null;
  onDateRangeChange: (range: 30 | 60 | null) => void;
}

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchField: {
    margin: '0 1rem'
  }
});

const ItemFilter = ({
  setSearchText,
  dateRange,
  onDateRangeChange
}: IPropsType) => {
  const classes = useStyles();
  const [categoryText, setCategoryText] = React.useState<string>('');

  React.useEffect(() => {
    // Debounce searchText by 600ms
    const timeout = setTimeout(() => setSearchText(categoryText), 600);
    return () => clearTimeout(timeout);
  }, [categoryText, setSearchText]);

  return (
    <div className={classes.row}>
      <TextField
        id="category-search"
        name="category-search"
        label="Category Filter"
        className={classes.searchField}
        value={categoryText}
        onChange={e => setCategoryText(e.target.value)}
      />
      <Paper square>
        <Tabs
          value={dateRange}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => onDateRangeChange(value)}
          aria-label="disabled tabs example"
        >
          <Tab value={30} label="30" />
          <Tab value={60} label="60" />
          <Tab value={null} label="All Time" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default ItemFilter;
