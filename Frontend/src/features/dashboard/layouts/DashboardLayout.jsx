import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const DashboardLayout = ({children}) => {

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout