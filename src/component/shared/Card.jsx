
function Card({children}) {
  return (
    <div className="border border-black w-[180px] lg:w-[280px] my-[10px] text-center rounded-lg shadow-xl pb-[10px]">
        {children}
    </div>
  )
}

export default Card