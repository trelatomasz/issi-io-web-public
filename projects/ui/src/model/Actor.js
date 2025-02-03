export class Actor{
    constructor(name, age, sex, bio, origin) {
        this.name = name;
        if(age) {
            this.age = age;
        }
        if(sex) {
            this.sex = sex;
        }
        if(bio) {
            this.bio = bio;
        }
        if(origin) {
            this.origin = origin;
        }
    }
}