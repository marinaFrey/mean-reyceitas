import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelScreenComponent } from './admin-panel-screen.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { DatabaseManagementComponent } from './database-management/database-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MaterialModule } from '../shared/material/material.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminPanelScreenComponent,
    TagEditorComponent,
    DatabaseManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule { }
