import './App.css';
import React, { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './components/Signup/SignUp';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import { LoggedContextProvider } from './ctx/LoggedContext';
import { CartListContextProvider } from './ctx/CartListContext';
import CartPopUp from './components/CartPopUp/CartPopUp';
import Checkout from './components/Checkout/Checkout';

function App() {
  const [userList, setUserList] = useState([]);
  const [database, setDataBase] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <CartListContextProvider>
      <LoggedContextProvider>
        <div className="App">
          <header>
            <Header setIsCartOpen={setIsCartOpen} />
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
              <Route path="/checkout">
                <Checkout setIsCartOpen={setIsCartOpen} />
              </Route>
            </Switch>
          </main>
          {isCartOpen && <CartPopUp setIsCartOpen={setIsCartOpen} />}
        </div>
      </LoggedContextProvider>
    </CartListContextProvider>
  );
}

export default App;
