import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TagsService } from './shared/services/tags.service';

import {
  SharedModule,
  HeaderComponent,
  FooterComponent,
  UserService,
  ApiService,
  JwtService,
  AuthGuard,
  ProfilesService,
  ArticlesService,
  CommentsService,
  
} from './shared';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { CoreModule } from './core/core.module';
import { EditorModule } from './editor/editor.module';
import { ArticleModule } from './article/article.module';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    rootRouting,
    AuthModule,
    SettingsModule,
    ProfileModule,
    CoreModule,
    EditorModule,
    ArticleModule
  ],
  providers: [UserService, ApiService, JwtService, AuthGuard, ProfilesService, ArticlesService, CommentsService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
