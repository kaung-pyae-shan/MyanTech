import './App.css';
import { ConfigProvider } from "antd";
import Router from './router/router';


function App() {
  return (
    <ConfigProvider>
     
        <Router/>
    
      
    </ConfigProvider>
  );
}

export default App;
