import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolver.service';
import { AuthGuard, SharedModule } from '../shared';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleCommentComponent } from './article-comment.component';

const articleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'article/:slug',
        component: ArticleComponent,
        canActivate: [AuthGuard],
        resolve: {
            article: ArticleResolver
        }    
    }
]);

@NgModule({
    imports: [
        articleRouting,
        SharedModule
    ],
    declarations: [
        ArticleComponent,
        MarkdownPipe,
        ArticleCommentComponent,
    ],
    providers: [ArticleResolver]
})

export class ArticleModule {}