import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "./pages/Login";
import Users from "./pages/admin/Users";
import Project from "./pages/admin/Project";
import Members from "./pages/admin/Members";
import Dashboard from "./pages/admin/Dashboard";
import DashboardUser from "./pages/user/Dashboard";
import FormDialog from "./components/admin/FormAddUser";
import { blue } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditUser from "./components/admin/FormEditUser"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Home from "./pages/user/Home";
// import Board from "./pages/user/Board";
import UserLayout from "./layout/UserLayout";
import Sidebar from "./components/user/Sidebar";
import UserDashboard from "./pages/user/Dashboard";
import Board from "./pages/user/Kanban";
// import Loading from "./pages/Loading";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});


const userTheme = createTheme({
  palette: { mode: "dark" },
});

function App() {

  return (
    <>
      <ThemeProvider theme={userTheme}>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/admin" element={<Dashboard />}></Route>
              <Route path="/admin/users" element={<Users />}></Route>
              <Route path="/admin/users/edit/:id" element={<EditUser />}></Route>
              <Route path="/admin/projects" element={<Project />}></Route>
              <Route path="/admin/members" element={<Members />}></Route>
              {/* <Route path="/loading" element={<Loading />}></Route> */}
                <Route theme={userTheme} path="board/:id" element={<Board />}></Route>
              {/* <Route path="/dashboard" element={<DashboardUser />}></Route> */}
              <Route theme={userTheme} path='/dashboard' element={<UserDashboard />}>
                <Route index element={<Home />} />
                <Route path='boards' element={<Home />} />
                {/* <Route path='boards/:boardId' element={<Board />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
