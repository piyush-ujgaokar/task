const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/40 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{value}</p>
    </div>
  )
}

export default StatsCard