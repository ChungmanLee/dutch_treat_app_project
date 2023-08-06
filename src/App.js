import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CreateGroup } from './components/CreateGroup';
import { AddMembers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from "./routes"

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path = "/" element={<Navigate to = {ROUTES.CREATE_GROUP} />} />
        <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup />} /*a component which can render all*//> 
        <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />}/*second page*/></Route> 
        <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain />}/*third page*/></Route> 
      </Routes>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
