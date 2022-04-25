import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router, 
  Route, 
  Routes, 
  Navigate, 
  Link,
  Outlet,
  useParams,
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/app" element={<Navigate replace to="/learn" />}/>
        <Route path="/learn" element={<Learn />}>
          <Route path="course" element={<Courses />}>
            <Route path=":courseid" element={<CourseId/>}/>
          </Route>
          <Route path="bundle" element={<Bundle />}/>
        </Route>
        <Route path="/dashboard" element={<DashBoard />}/>
    </Routes>
  </Router>
);

function Home(){
  return(
    <div>
      <h1>Home Route</h1>
    </div>
  )
}

function Learn(){
  return(
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link to="/learn/course">Courses</Link> |
      <Link to="/learn/bundle">Bundle</Link>
      <Outlet />
    </div>
  )
}

function Courses(){
  const CourseList = ["React", "Angular", "JAVA", "DSA"];
  const randomCourseName = CourseList[Math.floor(Math.random()* CourseList.length)];
  return(
    <div>
      <h1>Courses</h1>
      <p>More Test</p>
      <NavLink style={({isActive}) => {
        return{
          backgroundColor: isActive ? "violet" : "yellow"
        }
      }}
      to={`/learn/course/${randomCourseName}`}>
        {randomCourseName}
      </NavLink> | 
      <NavLink to={`/learn/course/tests`}>
          tests
      </NavLink>
      <Outlet/>
    </div>
  )
}

function Bundle(){
  return(
    <div>
      <h1>Bundle</h1>
    </div>
  )
}

function CourseId(){
  const navigate = useNavigate();
  const {courseid} = useParams();
  return(
    <div>
      <h1>URL Params is : { courseid }</h1>
      <button
      onClick={()=> {
        navigate("/DashBoard" , { state: "299" })
      }}
      >Price</button>
    </div>
  )
}

function DashBoard(){
  const location = useLocation();
  return(
    <div>
      <h1>Info that I got here is:- {location.state}</h1>
    </div>
  )
}