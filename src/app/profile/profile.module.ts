import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared'; 
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';


const profileRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'profile/:username',
        component: ProfileComponent,
        resolve: {
            profile: ProfileResolver
        },
        children: [
            {
                path: '',
                component: ProfileArticlesComponent
            },
            {
                path: 'favorites',
                component: ProfileFavoritesComponent
            }
        ]

    }
]);

@NgModule({
    imports: [
        profileRouting,
        SharedModule
    ],
    exports: [RouterModule],
    declarations: [
        ProfileComponent,
        ProfileArticlesComponent,
        ProfileFavoritesComponent

    ],
    providers: [ProfileResolver]
})

export class ProfileModule {}