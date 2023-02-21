import { Component, OnInit } from '@angular/core';

import { TokenService } from '../../../_services/auth/token.service';
import { DecodedTokenService } from 'src/app/_services/service/decoded-token.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private snackbarService: SnackbarService,
              private decodedTokenService: DecodedTokenService) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.snackbarService.showNotification(`A bientôt ${this.decodedTokenService.firstNameDecoded()} 
                                          ${this.decodedTokenService.lastNameDecoded()}.`, 'logIn-logOut')
    this.tokenService.clearToken()
  }

}
