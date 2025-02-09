import './App.css';
import { ConfigProvider } from "antd";
import Router from './router/router';


function App() {
  return (

    <ConfigProvider
    theme={{
    
      token: {
        // Seed Token
        colorPrimary: '',
        borderRadius: 2,

        // Alias Token
      },
    }}
    >

    <ConfigProvider>

        <Router/>
    
      
    </ConfigProvider>
  );
}

export default App;
