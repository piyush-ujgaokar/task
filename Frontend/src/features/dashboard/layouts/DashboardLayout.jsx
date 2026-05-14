import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const DashboardLayout = ({children}) => {

  return (
    <div className="flex">
      <Sidebar />

      {/* MAIN */}

      <div className="flex-1">
        <Navbar />
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout