import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { createRoot } from 'react-dom/client';
import GraveyardZone from './GraveyardZone';

it('renders without crashing isPlayer true', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <GraveyardZone isPlayer DisplayRow="" />
    </Provider>
  );
});

it('renders without crashing isPlayer false', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <GraveyardZone isPlayer={false} DisplayRow="" />
    </Provider>
  );
});
