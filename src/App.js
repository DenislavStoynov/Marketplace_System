import './App.css';
import React, { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './components/Signup/SignUp';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import { LoggedContextProvider } from './ctx/LoggedContext';
import { TotalProductsContextProvider } from './ctx/TotalProductsContext';


function App() {
  const [userList, setUserList] = useState([]);
  const [database, setDataBase] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);

  // const getAsd = (product) => {
  //   setTotalProducts(prevProduct => prevProduct.filter(p => p.id !== 0));
  //   console.log(product);
  // };

  const updateProductsList = (list) => {
    return list.map(item => {
      if (item.products) {
        return item.products.map(product => {
          setTotalProducts(prevProduct => [...prevProduct, product])
        })
      }
    })
  };

  useEffect(() => {
    const initialUserList = async () => {
      const response = await fetch('https://market-place-31e77-default-rtdb.firebaseio.com/users.json');
      const data = await response.json();
      setUserList(Object.values(data));
      updateProductsList(Object.values(data));
      setDataBase(data);
    };

    (async () => {
      await initialUserList();
    })();
  }, [])

  return (
    <LoggedContextProvider>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/homepage" />
            </Route>
            <Route path="/homepage">
              <Homepage totalProducts={totalProducts} setTotalProducts={setTotalProducts} userList={userList} />
            </Route>
            <Route path="/signup">
              <SignUp userList={userList} setUserList={setUserList} setDataBase={setDataBase} />
            </Route>
            <Route path="/login">
              <Login userList={userList} database={database} />
            </Route>
            <Route path="/dashboard">
              <Dashboard setTotalProducts={setTotalProducts} />
            </Route>
          </Switch>
        </main>
      </div>
    </LoggedContextProvider>
  );
}

export default App;
