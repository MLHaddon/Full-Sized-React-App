import placeholder from './300x200.png';

function Profile() {
  return (
    <>
      <div className="container">
        <hr />
        <div className="row">
          <div className="col-6">
            <h1>Michael Lee Haddon II</h1>
          </div>
          <div className="col-6">
            <p className="text-right"><a href="">Download my Resume</a></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="media">
              <img className="mr-3" src={placeholder} alt="Generic placeholder image"></img>
              <div className="media-body">
                <h5 className="mt-0">Web Developer</h5>
                <div className="text-body font-weight-bolder text-lg-center" style={{fontSize: "1.25em"}}>
                  Progressive critical thinker. Six years leadership and management experience serving in the US armed forces. Able to collaborate resourcefully in order to provide practical and innovative solutions.
                </div>
                <div className="text-body text-md-center">
                  Entry level programmer with military experience seeking Full time employment with a reputable company. Organized and effective with meticulous attention to detail. Able to strive independently with problem-solving skills, and effectively pair/group program in agile sprints. Very driven and committed towards career goals. Passionate and motivated to achieve a successful developer career and I'm excited to get my foot in the door and work with a great team.
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="row justify-content-md-around m-1">
              <address>
                <strong>Michael Lee Haddon II</strong><br />
                4100 North Street<br />
                Nacogdoches, TX 75965<br />
                <abbr title="Phone">Cell Phone: <br />(Text First)<br /></abbr> (972) 741-7848 <br />
                <a href="mailto:#">haddon.mike2@outlook.com</a>
              </address>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h2>Education</h2>
            <hr />
            <div className="row">
              <div className="col-6">
                <h4>Galvanize/Hack Reactor Immersive</h4>
              </div>
              <div className="col-6">
                <h5 className="text-right"><span aria-hidden="true"></span> Nov 2019 - May 2020</h5>
              </div>
            </div>
            <ul>
              <li>Implemented CS core concepts and data structures with JavaScript and Node.js.</li>
              <li>Built verious applications in Reactjs using React-Router and Hooks.</li>
              <li>Defined and utilized working models of computer science fundamentals such as single-core capabilities and working with JavaScript with a local node server as a runtime.</li>
              <li>Built scalable, responsive Web and unit-testing applications through Node.js, Reactjs and axios, and Various dbm's and middleware.</li>
              <li>Performed in group and pair programming sprints, utilizing various softwares such as twillo, github and zoom to streamline workflow.</li>
              <li>Built and deployed full-stack serviced web applications through AWS and cloud services.</li>
            </ul>
            <div className="row">
              <div className="col-6">
                <h4>Coding Dojo Fast-Paced Immersive</h4>
              </div>
              <div className="col-6">
                <h5 className="text-right"><span aria-hidden="true"></span> Sept 2020 - May 2021</h5>
              </div>
            </div>
            <ul>
              <li>Built and deployed several Full Stack Web Applications in several different languages within a fast-paced agile-lifecycle.</li>
              <li>Provided Front-End / Back-End Structure, Middle-Ware, Authorization, Web-sockets etc within various different lifecycles.</li>
              <li>built exception handling and security services to improve application functionality.</li>
              <li>Developed new UI functionality for RESTful, responsive, multithreaded and single threaded user-facing applications.</li>
              <li>Created RESTful APIs for increased scalability of applications.</li>
            </ul>
          </div>
          <div className="col-md-6 col-sm-12">
            <h2>Skill Set</h2>
            <hr />
            <div className="progress mt-4">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{width: "85%"}}> HTML</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}> CSS</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}> JAVASCRIPT</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-info" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}> React/Nodejs</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width: "70%"}}> MongoDB Atlas/Compass</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: "50%"}}> PYTHON</div>
            </div>
            <div className="progress mt-4">
              <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: "50%"}}> C++</div>
            </div>
          </div>
        </div>
        <hr />
        <h2>Portfolio</h2>
        <hr />
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
          </div>
          <div className="row text-center">
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
            <div className="col-sm-4 col-12 p-0"><img className="img-thumbnail"  src={placeholder} alt=""></img></div>
          </div>
        </div>
        <hr />
        <h2>Contact</h2>
        <hr />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8  col-12 jumbotron">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Name"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" aria-describedby="emailHelp"></input>
                  <span id="emailHelp" className="form-text text-muted" style={{display: "none"}}>Please enter a valid e-mail address.</span>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea rows="10" cols="100" className="form-control" id="message" name="message" placeholder="Message" aria-describedby="messageHelp"></textarea>
                  <span id="messageHelp" className="form-text text-muted" style={{display: "none"}}>Please enter a message.</span>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
        <footer className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>Copyright © MyWebsite. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Profile;