import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { TokenService } from '../../../_services/auth/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {

  constructor(private decodedTokenService: DecodedTokenService,
              private router: Router,
              private snackbarService: SnackbarService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.snackbarService.showNotification(`A bientôt ${this.decodedTokenService.firstNameDecoded()}
                                          ${this.decodedTokenService.lastNameDecoded()}.`, 'logIn-logOut');
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }

}
