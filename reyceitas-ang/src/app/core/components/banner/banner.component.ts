import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPE_LIST_ROUTE } from '@constants/routes.constant';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchRecipe() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([RECIPE_LIST_ROUTE], {queryParams: {search: this.searchTerm}}))
  }

}
