const HomePage = (props)=>{
    return (
    <div  id="home_container">
      <div class="test_text">
        Home Page
      </div>

      <button onClick={props.click} id="home_button">
        Click to Dex!
      </button>
    </div>
  )

}

export default HomePage