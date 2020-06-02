import { ITEMS_QUERY, DELETE_ITEM_MUTATION, ADD_ITEM_MUTATION } from './item';

export const mocks = [
  {
    request: {
      query: ITEMS_QUERY,
      variables: { category: '', days: 30 }
    },
    result: {
      data: {
        getItems: [
          {
            _id: '1',
            name: 'name1',
            category: 'category1',
            price: '1.00'
          }
        ]
      }
    }
  },
  {
    request: {
      query: ITEMS_QUERY,
      variables: {
        category: '',
        days: 30,
        deleteItem: {
          _id: '1'
        }
      }
    },
    result: {
      data: {
        getItems: []
      }
    }
  },
  {
    request: {
      query: ITEMS_QUERY,
      variables: {
        category: '',
        days: 30,
        saveItem: {
          _id: '2',
          name: 'newItem',
          category: 'newCategory',
          price: '3.50'
        }
      }
    },
    result: {
      data: {
        getItems: [
          {
            _id: '1',
            name: 'name1',
            category: 'category1',
            price: '1.00'
          },
          {
            _id: '2',
            name: 'newItem',
            category: 'newCategory',
            price: '3.50'
          }
        ]
      }
    }
  },
  {
    request: {
      query: DELETE_ITEM_MUTATION,
      variables: { _id: '1' }
    },
    result: {
      data: {
        deleteItem: {
          _id: '1'
        }
      }
    }
  },
  {
    request: {
      query: ADD_ITEM_MUTATION,
      variables: { name: 'newItem', category: 'newCategory', price: '3.50' }
    },
    result: {
      data: {
        saveItem: {
          _id: '2',
          name: 'newItem',
          category: 'newCategory',
          price: '3.50'
        }
      }
    }
  }
];
