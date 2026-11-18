import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Public website layout: Navbar on top, current page below.
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
