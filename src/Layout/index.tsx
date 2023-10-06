import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
       <div className='backround bg-slate-500 relative'>
        <div style={{maxWidth: 430, height: 650}} className='iphone mx-auto relative'>
          <img src='' />
        </div>
        <div style={{width: 287, height: 602, marginTop: -637, marginLeft: 537, borderRadius: 40}} className='img mx-auto absolute truncate' >
          <img src='' />
        </div>
        <div style={{width: 287, height: 602, marginTop: -637, marginLeft: 537}} className='img mx-auto absolute' >
          <img  src='' />
        </div>
        <div className="weather">
          <Outlet />
        </div>
    </div>
    </>
  )
};

export default Layout;