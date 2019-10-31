import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Article, ArticleListConfig } from '../models';

import { ApiService } from './api.service';

@Injectable()
export class ArticlesService {
    constructor (
        private apiService: ApiService
    ) {}

    get(slug): Observable<Article> {
        return this.apiService.get('/articles/' + slug)
               .map(data => data.article);
    }
    
    save(article): Observable<Article> {
        // If we're updating an existing article
        if (article.slug) {
          return this.apiService.put('/articles/' + article.slug, {article: article})
                 .map(data => data.article);
    
        // Otherwise, create a new article
        } else {
          return this.apiService.post('/articles/', {article: article})
                 .map(data => data.article);
        }
    }

    destroy(slug) {
        return this.apiService.delete('/articles/' + slug);
    }

    favorite(slug): Observable<Article> {
        return this.apiService.post('/articles/' + slug + '/favorite');
    }

    unfavorite(slug): Observable<Article> {
        return this.apiService.delete('/articles/' + slug + '/favorite');
    }

    
    query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
        // Convert any filters over to Angular's URLSearchParams
        let httpParams = new HttpParams()

        Object.keys(config.filters).forEach((key) => {
            httpParams = httpParams.append(key, config.filters[key] );
        });
    
        return this.apiService
            .get( '/articles' + ((config.type === 'feed') ? '/feed' : ''), httpParams)
            .map(data => data);
    }
}