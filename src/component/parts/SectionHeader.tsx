import React from 'react';

type PropsType = {
  title: string
  align: 'left' | 'center'
  theme: string
}

const SectionHeader = (props: PropsType) => {
  if(props.align === 'center') {
    return (
      <div className='flex flex-col items-center mb-[50px]'>
        <h2 className={`text-center text-3xl mb-3 ${props.theme === 'dark' ? 'text-white' : 'text-slate-600'} uppercase`}>
          {props.title}
        </h2>
        <div className='w-[75px] h-[3px] bg-yellow-500 text-center'></div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-start mb-[50px]`}>
      <h2 className={`text-center text-3xl mb-3 ${props.theme === 'dark' ? 'text-white' : 'text-slate-600'} uppercase`}>
        {props.title}
      </h2>
      <div className='w-[75px] h-[3px] bg-yellow-500 text-center'></div>
    </div>
  )
}

export default SectionHeader