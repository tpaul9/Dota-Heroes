import Nav from './Nav'
import './About.css';
function About() {
    return (
        <div className="about">
            <Nav />
            <div className="content">
                <p>This is a short project I created to gain experience with React JS to create the front-end of a web application. As you can see, this is a simple multi-page application.</p>
                <p>Data is sourced from the <a target="_blank" href="https://docs.opendota.com/" >Open Dota API</a>. After creating some custom fields for the data, it is passed into the React component library <a target="_blank"href="https://material-table.com/#/">Material Table</a>.</p>
                <p>The goal is to be able to lookup and compare hero stats at a glance, which is not easy to do inside the Dota 2 game client.</p>
            </div>
        </div>
    );
}
export default About;