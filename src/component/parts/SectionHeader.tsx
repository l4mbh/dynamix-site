type PropsType = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: string
}

const SectionHeader = (props: PropsType) => {
  if(props.align === 'center') {
    return (
      <div className='flex flex-col font-bold items-center uppercase mb-5 tracking-widest '>
        <h2 className={`text-center text-4xl ${props.theme === 'dark' ? 'text-white' : 'text-black'} uppercase`}>
          {props.title}
        </h2>
        <p className='text-center font-normal tracking-widest'>{props.subtitle}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col font-bold items-start uppercase mb-5 tracking-widest`}>
      <h2 className={`text-center text-4xl ${props.theme === 'dark' ? 'text-white' : 'text-black'} uppercase`}>
        {props.title}
      </h2>
      <p className='text-center font-normal tracking-widest'>{props.subtitle}</p>
    </div>
  )
}

export default SectionHeader