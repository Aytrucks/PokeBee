import { motion } from "framer-motion"

const HomePage = (props)=>{
    return (
    <motion.div
    initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 0.25 }} // Set animation speed
    >
    <div  id="home_container">
      <div className="test_text">
        Home Page
      </div>

      <button onClick={props.click} id="home_button">
        Click to Dex!
      </button>
    </div>
    </motion.div>
  )

}

export default HomePage