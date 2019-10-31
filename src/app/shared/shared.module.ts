import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './layout/list-errors/list-errors.component';
import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './layout/article-helpers';
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { FollowButtonComponent, FavoriteButtonComponent } from './buttons'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ListErrorsComponent, 
    ShowAuthedDirective, 
    FollowButtonComponent, 
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ListErrorsComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticlePreviewComponent
  ]
})
export class SharedModule {}
