import {  Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center">
        <div style={{ marginTop: -637, marginLeft: 537}} className='absolute'>
            <div>
                <img style={{width: 200, height: 'auto', borderRadius: 20, marginTop: 100, marginLeft: 45 }} src='./public/Photo/dubaothoitiet.png'  />
                <h2 className='uppercase font-bold text-xl' style={{ marginTop: 5, marginLeft: 50,color: '#111' }}>Thời tiết Đà Nẵng</h2>
            </div>
            <div>
              <Link to="/OneDay">
                <button className='text-white bg-slate-800 font-semibold ' style={{padding: 10, borderRadius: 20,marginTop: 50, marginLeft: 45 }}>Dự báo thời tiết hôm nay</button>
              </Link>
            </div>
            <div>
              <Link to="/Next3Days">
                <button className='text-white bg-slate-800 font-semibold ' style={{padding: 10, borderRadius: 20,marginTop: 20, marginLeft: 38 }}>Dự báo thời tiết 5 ngày tới</button>
              </Link>
            </div>
            <div>
              <Link to="/Search">
                <button className='text-white bg-slate-800 font-semibold ' style={{padding: 10, borderRadius: 20,marginTop: 20, marginLeft: 10 }}>Tìm kiếm thành Phố bạn muốn xem</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Home