import React, {useState} from 'react'
import './footer.css'

class Footer extends React.Component {
  constructor(){
    super()
    this.state = {
      isActive : true,
    }
  }
  handleClick = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
    console.log(this.state.isActive)};

  render() {
    return (
      <footer className="footer-main-cont">
        <div>
        <img className='scan-logo' src={require('./footer_scan.png')}/>
        </div>
        <div>
          <div className='footer-text'>
            <p>г. Москва, ул. Зои И Александра Космодемьянских, 26/21</p>
            <p>+7 945 111 05 12</p>
            <p>office@scan.ru</p>
          </div>
          <div className='copyright'>
            <p>Copyright. 2024</p>
          </div>
        </div>
      </footer>
  )};
}

export default Footer;