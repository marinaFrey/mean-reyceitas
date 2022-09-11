import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroupEditorComponent } from './user-group-editor/user-group-editor.component';

@Component({
  selector: 'app-admin-panel-screen',
  templateUrl: './admin-panel-screen.component.html',
  styleUrls: ['./admin-panel-screen.component.scss']
})
export class AdminPanelScreenComponent implements OnInit {

  @ViewChild('groupEditor') groupEditor!: UserGroupEditorComponent;

  constructor() { }

  ngOnInit(): void {
  }

  saveAll(): void {
    this.groupEditor?.submit();
  }

}
