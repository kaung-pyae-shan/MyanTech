import React from 'react'

const GeneralCard = ({title, value, bg, icon, children}) => {
  return (
    <div className={`${bg} px-5 py-5 text-white rounded-xl`}>
      <div className="flex items-center gap-3 text-xl">
        {icon}
        <h3 className='font-bold '>{title}</h3>
      </div>
      <hr className='' />
      <p>{value}</p>
      {children}
    </div>
  )
}

export default GeneralCard
