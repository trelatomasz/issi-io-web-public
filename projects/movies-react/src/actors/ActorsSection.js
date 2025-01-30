import ActorForm from "../actors/ActorForm";
import ActorsList from "../actors/ActorList";
import ActorService from "./ActorService";
import {useEffect, useState} from "react";

export default function ActorsSection(props) {

    const actorService = new ActorService();
    const [addingActor, setAddingActor] = useState(false);
    const [actors, setActors] = useState([]);
    useEffect(() => {
        actorService.getActors().then(actors => setActors(actors))
    }, []);

    return <div>

        <ActorsList actors={actors} onDeleteActor={(actor) => {
            actorService.deleteActor(actor).then(() => {
                setActors(actors.filter(m => m.id !== actor.id))
            })
        }}/>
        {
            addingActor
                ? <>
                    <button onClick={() => setAddingActor(false)}>Hide actor</button>
                    <ActorForm onActorSubmit={(actor) => {
                        actorService.addActor(actor).then(newActor => setActors([...actors, newActor]));
                    }} buttonName="Add actor"/>
                </>
                : <button onClick={() => setAddingActor(true)}>Add an actor</button>
        }
    </div>
};
