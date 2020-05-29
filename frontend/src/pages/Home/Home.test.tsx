import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home Page Rendering', () => {
  it('renders the Home page', () => {
    render(<Home />);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
