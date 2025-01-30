import './App.css';
import "milligram";
import ActorsSection from "./actors/ActorsSection";
import MoviesSection from "./movies/MoviesSection";

function App() {
    // Whole component is rendered
    console.log("Component App is regenerated");

    return (
        <div className="container">

            <MoviesSection/>
            <hr/>
            <ActorsSection/>

        </div>
    );
}

export default App;
