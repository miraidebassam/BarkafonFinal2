import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MenuService } from '@core/bootstrap/menu.service';


@Component({
  selector: 'app-page-foother',
  templateUrl: './page-foother.component.html',
  styleUrls: ['./page-foother.component.scss']
})
export class PageFootherComponent implements OnInit {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input()

  get hideBreadcrumb() {
    return this._hideBreadCrumb;
  }
  set hideBreadcrumb(value: boolean) {
    this._hideBreadCrumb = coerceBooleanProperty(value);
  }
  private _hideBreadCrumb = false;

  constructor(private router: Router, private menu: MenuService) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getMenuLevel(routes);
    this.nav.unshift('home');
  }



}
