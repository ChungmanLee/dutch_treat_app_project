import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CreateGroup } from './components/CreateGroup';
import { Route } from 'react-router-dom';
import { AddMembers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateGroup />} /> //create 그룹 전체를 랜더링할 수 있는, 담당하고 있는 컴포넌트를 생성해서 넘겨줘야 함.
        <Route path="/members" element={<AddMembers />}></Route> //2번째 페이지
        <Route path="/expense" element={<ExpenseMain />}></Route> //3번째 페이지
      </Routes>
    </BrowserRouter>
  );
}

export default App;
