import React from 'react';
import { createRoot } from 'react-dom/client';

// interface WelcomeProps {
//   name: string;
// }

const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};

const element = <Welcome name="Sara" />;
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(element);
