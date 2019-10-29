export class User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;

    constructor (obj? : any){
        this.email = obj && obj.email;
        this.token = obj && obj.token;
        this.username = obj && obj.username;
        this.bio = obj && obj.bio;
        this.image = obj && obj.image;        
      }

}