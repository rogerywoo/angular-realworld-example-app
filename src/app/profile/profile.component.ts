import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile } from '../shared';

@Component({
    selector: 'profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
    profile: Profile;
    currentUser: User;
    isUser: boolean;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}
  
    ngOnInit() {
        // Subscribe to data resolved from profile-resolver.
        this.route.data.subscribe(
            (data: {profile: Profile}) => {
                this.profile = data.profile;
            }
        );
 
        // let that = this;

        // this.route.data.subscribe(function(data: {profile: Profile}) {
        //     that.profile = data.profile;
        //     return;
        //});
      // Load the current user's data
        this.userService.currentUser.subscribe(
            (userData: User) => {
                this.currentUser = userData;
                this.isUser = (this.currentUser.username === this.profile.username);
            }
        );
    }
  
    // we'll be using this method in the next chapter for adding in following functionality :)
    onToggleFollowing(following: boolean) {
        this.profile.following = following;
    }
  
}