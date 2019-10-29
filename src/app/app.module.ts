import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {
  SharedModule,
  HeaderComponent,
  FooterComponent,
  UserService,
  ApiService,
  JwtService,
  AuthGuard,
  ProfilesService,
  ArticlesService
} from './shared';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { CoreModule } from './core/core.module';
import { EditorModule } from './editor/editor.module';

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
    EditorModule
  ],
  providers: [UserService, ApiService, JwtService, AuthGuard, ProfilesService, ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
