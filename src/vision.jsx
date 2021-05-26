// Style sheets
import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';

import * as Icon from 'react-bootstrap-icons';

function Visionreact(){
    return  <div>
                <section id="vision">
                    <div className="row" >
                        <div className="col-lg-4 vision-box">
                            <Icon.Eye size={80}/>
                            <h3>VISION</h3>
                            <h5>We Care About Others!</h5>
                            <hr></hr>
                            <p>To utilize left out resources of recovered COVID-19
                            patient. It may be medicines, relief creams etc.</p>
                        </div>

                        <div className="col-lg-4 vision-box">
                            <Icon.Bullseye size={80}/>
                            <h3>MISSION</h3>
                            <h5>We Fight Together for Others!</h5>
                            <hr></hr>
                            <p>
                            To help out needy or poor people or anyone
                            who is in emergency situation. A small helping hand
                            may save someone's life.
                            </p>
                        </div>

                        <div className="col-lg-4 vision-box ">
                            <Icon.PeopleFill size={80}/>
                            <h3>HELP & SUPPORT</h3>
                            <h5>We Stand Together For Others! </h5>
                            <hr></hr>
                            <p>Great opportunities to help others seldom come,
                            but small ones surround us every day.</p>
                        </div>
                    </div>
                </section>
            </div>;

};

export default Visionreact;