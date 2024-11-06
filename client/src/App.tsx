import React from 'react';
import { Button, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Hello, Makedle!
      </Typography>
      <Button variant="contained" color="primary">
        I dont do anything
      </Button>
    </div>
  );
};

export default App;
