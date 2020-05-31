import * as React from 'react';

import TextField from '@material-ui/core/TextField';

interface IPropsType {
  setSearchText: (category: string) => void;
}

const ItemFilter = ({ setSearchText }: IPropsType) => {
  const [categoryText, setCategoryText] = React.useState<string>('');

  React.useEffect(() => {
    // Debounce searchText by 600ms
    const timeout = setTimeout(() => setSearchText(categoryText), 600);
    return () => clearTimeout(timeout);
  }, [categoryText, setSearchText]);

  return (
    <TextField
      id="category-search"
      name="category-search"
      label="Category"
      value={categoryText}
      onChange={e => setCategoryText(e.target.value)}
    />
  );
};

export default ItemFilter;
