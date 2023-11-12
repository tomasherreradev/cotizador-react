
function Button(props, fn) {
  return (
    <button
          type='button'
          className='h-10 w-10 flex items-center justify-center font-bold text-white text-2xl bg-lime-400 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500'
          onClick={props.fn}
    >{props.tipo}</button>
  )
}

export default Button