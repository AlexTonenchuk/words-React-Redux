import '@testing-library/jest-dom/extend-expect'; 
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';


interface Props {
  children?: ReactNode
}

export function renderWithProviders(
  ui: JSX.Element,
  {
    preloadedState={},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: Props) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}