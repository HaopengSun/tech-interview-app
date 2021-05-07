import { useHistory } from "react-router-dom"

const Home = props => {
  const history = useHistory()
  const handleClick = function(){
    history.push('./dashboard');
  }
  return <section className="Home">
    <h1>Welcome to tech interview app</h1>
    <button type="button" onClick={handleClick}>Log in as an interviewer</button>
    <h2>If you are a candidate, please use the link provided by the potential employers</h2>
  </section>
}

export default Home