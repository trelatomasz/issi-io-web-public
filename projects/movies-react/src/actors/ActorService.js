export default class ActorService {
    constructor() {

    }

    async getActors() {
        const response = await fetch(`/actors`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch actors");
        }
    }

    async deleteActor(actor) {

        const response = await fetch('/actors/' + actor.id, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Failed to delete an actor");
        }

    }

    async addActor(actor) {
        const response = await fetch('/actors', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to delete actors");
        }

    }

}