import {Link} from 'react-router-dom';
import './home.css';
import {Button} from "@chakra-ui/react";

const Home = () => {
  return (
      <div id='home'>
          <div className='container'>
              <section className='main'>
                  <div className='hero-title'>
                      Collect feedbacks <br/>
                      with ease!
                  </div>
                  <div className='hero-subtitle'>
                      Send a link, copy-paste some code and... done
                  </div>
                  <div className='cta-button'>
                      <Button size={'lg'}>Get Started</Button>
                  </div>
              </section>
          </div>
      </div>
  )
}

export default Home;