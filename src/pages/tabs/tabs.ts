import { SettingsPage } from './../settings/settings';
import { AccountsPage } from './../accounts/accounts';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AccountsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
