// Style sheets
import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';

    function Scrollreact() {
        return <section id="home">
                <div id="homeCarousel" className="carousel slide carousel-home" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#homeCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#homeCarousel" data-slide-to="1"></li>
                        <li data-target="#homeCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner" role="listbox">

                        <div className="item active">
                            <img id="car-img" src="./images/slider/home-slider-1.jpg" style={{width: "100%", filter: "blur(5px)"}} alt="" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h2 className="carousel-title bounceInDown animated slow">Because they need your help.</h2>
                                    <h4 className="carousel-subtitle bounceInUp animated slow ">Do not let them down</h4>
                                    <a href="#resources" id="car-btn" className="btn btn-lg btn-secondary bounceInUp animated slow" style={{fontWeight: "bold", color: "black"}}>View Resources</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a class="left carousel-control" href="#homeCarousel" role="button" data-slide="prev">
                    <span class="fa fa-angle-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                    </a>

                    <a class="right carousel-control" href="#homeCarousel" role="button" data-slide="next">
                    <span class="fa fa-angle-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                    </a>
                </div>
            </section>     
        
    };

export default Scrollreact;