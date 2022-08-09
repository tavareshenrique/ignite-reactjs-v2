import { ThemeProvider } from 'styled-components';

import { Button } from "./components/Button";

import { defaultThemes } from './styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultThemes} >
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
    </ThemeProvider>
  )
}