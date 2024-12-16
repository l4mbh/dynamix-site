import { Card, CardContent, CardHeader } from '@mui/material';
import './App.css';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Card>
        <CardHeader>
          Header
        </CardHeader>
        <CardContent>
          Content
        </CardContent>
      </Card>
    </>
  );
}

export default App;
