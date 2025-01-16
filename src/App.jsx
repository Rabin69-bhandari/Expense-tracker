import { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Contact from './component/contact';
import Feedback from './component/Feedback';
import About from './component/About';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/contact',
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: '/feedback',
      element: (
        <>
          <Navbar />
          <Feedback />
        </>
      ),
    },
  ]);

  const [cat, setcat] = useState('');
  const [Category, setCategory] = useState([]);
  const [amt, setamt] = useState(0);
  const [Amount, setAmount] = useState([]);
  const [dt, setdt] = useState('');
  const [datesas, setdatesas] = useState([]);
  const [total, settotal] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCategory = JSON.parse(localStorage.getItem('Category')) || [];
    const savedAmount = JSON.parse(localStorage.getItem('Amount')) || [];
    const savedDates = JSON.parse(localStorage.getItem('datesas')) || [];

    setCategory(savedCategory);
    setAmount(savedAmount);
    setdatesas(savedDates);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('Category', JSON.stringify(Category));
    localStorage.setItem('Amount', JSON.stringify(Amount));
    localStorage.setItem('datesas', JSON.stringify(datesas));
  }, [Category, Amount, datesas]);

  const handlecategory = (e) => {
    let checkval = e.target.value;
    if (checkval === 'none' || checkval === '') {
      alert('Please choose a correct category');
    } else {
      setcat(checkval);
    }
  };

  const handleamount = (e) => {
    let checkval = parseInt(e.target.value);

    if (checkval < 0) {
      alert('Entered amount is negative');
    } else {
      setamt(checkval);
    }
  };

  const handledate = (e) => {
    setdt(e.target.value);
  };

  const handleclick = () => {
    if (cat === '') {
      alert('Your category is not defined');
    } else {
      setCategory([...Category, cat]);
      setAmount([...Amount, amt]);
      setdatesas([...datesas, dt]);
      setcat('');
      setamt(0);
      setdt('');
    }
  };

  const currentdate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setdt(formattedDate);
  };

  const Total = () => {
    const mytotal = Amount.reduce((a, b) => a + b, 0);
    settotal(mytotal);
  };

  const deleteli = (e) => {
    const index = parseInt(e.target.value, 10);
    const newCategory = [...Category];
    newCategory.splice(index, 1);

    const newAmount = [...Amount];
    newAmount.splice(index+1, 1);

    const newDatesas = [...datesas];
    newDatesas.splice(index, 1);

    setCategory(newCategory);
    setAmount(newAmount);
    setdatesas(newDatesas);
  };

  const editli = (e) => {
    const index = parseInt(e.target.value, 10);

    setcat(Category[index]);
    setamt(Amount[index]);
    setdt(datesas[index]);

    const newCategory = [...Category];
    newCategory.splice(index, 1);

    const newAmount = [...Amount];
    newAmount.splice(index+1, 1);

    const newDatesas = [...datesas];
    newDatesas.splice(index, 1);

    setCategory(newCategory);
    setAmount(newAmount);
    setdatesas(newDatesas);
  };

  return (
    <>
      <RouterProvider router={router} />
      <div className="containter w-2/6 h-[600px] mx-auto my-3 bg-gray-400 rounded-xl flex flex-col items-center">
        <h1 className="text-2xl text-white font-bold border-b-2 p-3 border-slate-900 w-full text-center">
          Expense Tracker
        </h1>
        <div className="box h-1/2 w-full relative">
          <div className="uppersection py-5 p-3 w-full flex flex-col gap-5 border-b-2">
            <div className="w-full flex">
              <label htmlFor="Catgory" className="text-white w-full text-xl">
                Enter Expenses on:
              </label>
              <select
                className="w-[400px] px-4 py-2 rounded-xl"
                value={cat}
                onChange={(e) => {
                  handlecategory(e);
                }}
              >
                <option value="none">Select your expenses type</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Extra">Extra</option>
              </select>
            </div>
            <div className="w-full flex">
              <label htmlFor="" className="text-white w-full text-xl">
                Amount:
              </label>
              <input
                className="w-[400px] px-4 py-2 rounded-xl"
                value={amt}
                onChange={(e) => {
                  handleamount(e);
                }}
                type="number"
              />
            </div>
            <div className="w-full flex px-2">
              <label htmlFor="" className="text-white w-full text-xl">
                Date-time:
              </label>
              <div className="w-1/2 flex px-3">
                <input
                  className="w-[185px] py-2 px-2 rounded-l-lg"
                  onChange={(e) => {
                    handledate(e);
                  }}
                  value={dt}
                  type="datetime"
                  placeholder="YYYY-MM-DD"
                />
                <button
                  onClick={currentdate}
                  className="py-2 px-2 text-center rounded-r-lg bg-white"
                >
                  <CiCalendarDate />
                </button>
              </div>
            </div>
            <button
              onClick={handleclick}
              className="bg-slate-900 text-white rounded-lg px-6 py-2"
            >
              Add
            </button>
          </div>
          <div className="downsection h-[90%] overflow-y-auto flex flex-col gap-2 px-2 py-1 ">
            {Category.length === 0 ? (
              <div className="text-xl text-white font-bold w-full text-center">
                No Expenses to show
              </div>
            ) : (
              Category.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="upperdown p-3 bg-cyan-700 text-white w-full rounded flex gap-2"
                  >
                    <div className="textdetails w-full">
                      <ul>
                        <li className="flex flex-col text-lg">
                          <span>
                            {Category[index]} : Rs {Amount[index+1]}
                          </span>
                          <span>Date : {datesas[index]}</span>{' '}
                        </li>
                      </ul>
                    </div>
                    <div className="buttons flex gap-5">
                      <button
                        onClick={(e) => {
                          editli(e);
                        }}
                        className="bg-orange-400 hover:bg-slate-900 text-white rounded-lg h-[70%] my-auto px-8 text-center"
                        value={index}
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          deleteli(e);
                        }}
                        className="bg-orange-400 hover:bg-slate-900 text-white rounded-lg h-[70%] my-auto px-8"
                        value={index}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <footer
            onClick={Total}
            className="px-3 absolute bottom-[-260px] text-xl bg-slate-900 w-full text-white"
          >
            <button className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg h-[70%] my-auto px-8 text-center">
              Calculate total:
            </button>{' '}
            Your Total is : <span>{total}</span>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
