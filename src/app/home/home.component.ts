import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../shared';
import { TagsService } from '../shared/services/tags.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    errors: Object = {};
    isAuthenticated: boolean
    listConfig: ArticleListConfig = new ArticleListConfig();
    tags: Array<string> = [];
    tagsLoaded: boolean = false;
    
    constructor(
        private router: Router,
        private tagsService: TagsService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
            this.isAuthenticated = authenticated;
    
            // set the article list accordingly
            if (authenticated) {
                this.setListTo('feed');
            } else {
                this.setListTo('all');
            }
            }
        );

        this.tagsService.getAll()
            .subscribe(tags => {
            this.tags = tags;
            this.tagsLoaded = true;
        });
    }
  
    setListTo(type: string = '', filters: Object = {}) {
        // If feed is requested but user is not authenticated, redirect to login
        if (type === 'feed' && !this.isAuthenticated) {
            this.router.navigateByUrl('/login');
        return;
        }

        // Otherwise, set the list object
        this.listConfig = {type:type, filters:filters};
    }
}
