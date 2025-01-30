import {useState} from "react";

import {Movie} from "../model/Movie.js";
import {Actor} from "../model/Actor";

export default function ActorForm(props) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [origin, setOrigin] = useState('');
    const [bio, setBio] = useState('');


    function addActor(event) {
        event.preventDefault();
        if (name.length < 2) {
            return alert('Name too short');
        }
        props.onActorSubmit(new Actor(name, age, sex, bio, origin));
        setName('');
        setAge('');
        setSex('');
        setOrigin('');
        setBio('');
    }

    return <form onSubmit={addActor}>

        <div className="row">
            <div className="column">
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                <em>Name</em>
            </div>
            <div className="column">
                <input type="number" value={age} onChange={(event) => setAge(event.target.value)}/>
                <em>Age</em>
            </div>
            <div className="column">
                <select value={sex} onChange={(event) => setSex(event.target.value)}>
                    <option value="">Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <em>Sex</em>
            </div>
            <div className="column">
                <input type="text" value={origin} onChange={(event) => setOrigin(event.target.value)}/>
                <em>Origin</em>
            </div>
            <div className="column">
                <input type="text" value={bio} onChange={(event) => setBio(event.target.value)}/>
                <em>Bio</em>
            </div>
            <div className="column">
                <button>{props.buttonName}</button>
            </div>
        </div>
    </form>;
}