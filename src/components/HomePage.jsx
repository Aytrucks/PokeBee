const HomePage = (props)=>{
    return (
    <div>
      <div id="test_text">
        Home Page
      </div>

      <button onClick={props.click}>
        Click to Dex!
      </button>
    </div>
  )

}

export default HomePage