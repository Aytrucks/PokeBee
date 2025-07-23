const BattlePage = (props) => {
    return (
    <>
        <div>
            <div id="test_text">
            Dex
        </div>
        <button id="test_btn" onClick={props.click}>
            Back to Home
        </button>
        </div>
      
      <div className="pokebox">
        <img src="../src/assets/bulbapedia_ivysaur.png" id="pika"/>
      </div>
      <div className="test_input">
        <input className="textbox"/>
      </div>
    </>
  )

}

export default BattlePage