// Style sheets
import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';

function Aboutreact(){
    return  <div>
                <section id="about">
                    <footer className="main-footer">
                        <div className="footer-top">
                        </div>
                        <div className="footer-main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="footer-col">
                                            <h4 className="footer-title">About us <span className="title-under"></span></h4>
                                            <div className="footer-content">
                                                <h4>
                                                    <strong>Sadbhawna</strong> is a web portal where recovered COVID-19 patient can share their left out resources such as medicines, relief creams, supplements etc.
                                                </h4>
                                                <h4>
                                                    This website was built overnight by our Team to help others. It may contains bugs and need huge improvements. Patches are on it's way. All suggestions are Welcomed and Appreciated!</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="footer-col">
                                            <h4 className="footer-title">Other Websites <span className="title-under"></span></h4>
                                            <div className="footer-content">
                                                <ul className="tweets list-unstyled">
                                                    <li className="tweet">
                                                        <a href="https://www.mohfw.gov.in/" style={{color:"white"}}>Ministry Of Health and Family Welfare</a>
                                                    </li>
                                                    <li className="tweet">
                                                        <a href="https://www.covid19india.org/" style={{color:"white"}}>Covid-19 Tracker</a>
                                                    </li>
                                                    <li className="tweet">
                                                        <a href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf" style={{color:"white"}}>Central Helpline Number</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div className="footer-col">
                                            <h4 className="footer-title">Contact us <span className="title-under"></span></h4>
                                            <div className="footer-content">
                                                <div className="footer-form">
                                                    <div className="footer-form">
                                                        <form action="https://formspree.io/f/mwkalpjz" method="post">
                                                            <div className="form-group">
                                                                <input type="text" name="name" className="form-control" placeholder="Name" required />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="email" name="email" className="form-control" placeholder="E-mail" required />
                                                            </div>
                                                            <div className="form-group">
                                                                <textarea name="message" className="form-control" placeholder="Message" required></textarea>
                                                            </div>
                                                            <div className="form-group alerts">
                                                                <div className="alert alert-success" role="alert">
                                                                </div>
                                                                <div className="alert alert-danger" role="alert">
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="submit" className="btn btn-submit pull-right">Send message</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom">

                            <div className="container text-right">
                                Designed and Developed with ❤️ by Team Sadbhawna.
                            </div>
                        </div>
                    </footer>
                </section>
            </div>;
}

export default Aboutreact;