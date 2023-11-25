import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Signup from './components/signUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/logIn';
import {AddProduct, ProductList, UpdateProduct} from './components/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
   
      <Routes> 
        <Route element = {<PrivateComponent/>}>
        <Route path='/' element = {<h1>Successfull logged in</h1>}>  </Route>
        <Route path='/products' element ={<ProductList/>} >  </Route>
      <Route path='/add' element = {<AddProduct/>}>  </Route>
     <Route path='/update/:id' element = {<UpdateProduct/>}>  </Route>
     <Route path='/logout' element = {<h1>Logged out</h1>}>  </Route>
       <Route path='/profile' element = {<h1>Show the Profile</h1>}>  </Route>
       <Route path='/a' element = {<h1>already logged in</h1>}>  </Route>
       </Route>
       <Route path = '/signup' element= {<Signup/>}></Route>
       <Route path = '/login' element= {<Login/>}></Route>
       </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  );
}

export default App;
