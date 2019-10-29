import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { SharedModule } from '../shared'; 

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: []
})
export class EditorModule {}