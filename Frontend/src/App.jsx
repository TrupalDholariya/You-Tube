import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from './store/slices/userSlice'
import Header from './Components/Header/Header'
import Left_Header from './Components/Left_Header/Left_Header'

function App() {
  const dispatch = useDispatch();
  const { initialized, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  if (!initialized && loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#121212] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Left_Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App
