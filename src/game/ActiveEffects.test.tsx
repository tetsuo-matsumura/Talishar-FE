import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/Store';
import { createRoot } from 'react-dom/client';
import ActiveEffects from './ActiveEffects';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <ActiveEffects />
    </Provider>
  );
});
