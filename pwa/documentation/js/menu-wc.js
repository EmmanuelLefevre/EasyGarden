'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">easygarden-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5570c837bd67fc9d85071c7253988c183d7a84ab721e778b5fd30ca6b34781b2fbcf317448642ea1b4b37bb34ca2b921c45f2314b4f5e4876e9437ddd060c10f"' : 'data-target="#xs-components-links-module-AppModule-5570c837bd67fc9d85071c7253988c183d7a84ab721e778b5fd30ca6b34781b2fbcf317448642ea1b4b37bb34ca2b921c45f2314b4f5e4876e9437ddd060c10f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5570c837bd67fc9d85071c7253988c183d7a84ab721e778b5fd30ca6b34781b2fbcf317448642ea1b4b37bb34ca2b921c45f2314b4f5e4876e9437ddd060c10f"' :
                                            'id="xs-components-links-module-AppModule-5570c837bd67fc9d85071c7253988c183d7a84ab721e778b5fd30ca6b34781b2fbcf317448642ea1b4b37bb34ca2b921c45f2314b4f5e4876e9437ddd060c10f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EasygardenModule.html" data-type="entity-link" >EasygardenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EasygardenModule-881131acd014fe44655fc490e8fd1dbb3bae9a8b54e42452a30718e9e1a63389d2424a06a9b1c254234e47031cb98fa50fb9ae7db3f16ae65363cb2ad843fa0b"' : 'data-target="#xs-components-links-module-EasygardenModule-881131acd014fe44655fc490e8fd1dbb3bae9a8b54e42452a30718e9e1a63389d2424a06a9b1c254234e47031cb98fa50fb9ae7db3f16ae65363cb2ad843fa0b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EasygardenModule-881131acd014fe44655fc490e8fd1dbb3bae9a8b54e42452a30718e9e1a63389d2424a06a9b1c254234e47031cb98fa50fb9ae7db3f16ae65363cb2ad843fa0b"' :
                                            'id="xs-components-links-module-EasygardenModule-881131acd014fe44655fc490e8fd1dbb3bae9a8b54e42452a30718e9e1a63389d2424a06a9b1c254234e47031cb98fa50fb9ae7db3f16ae65363cb2ad843fa0b"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EasygardenRoutingModule.html" data-type="entity-link" >EasygardenRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LawnmowerModule.html" data-type="entity-link" >LawnmowerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LawnmowerModule-080a446d4e523955d1e2e4d6ee9af6bd45a6247fa17bd04455d1d4805bdd224180c0ec42f2944bf4cbbc08218dff384dc7e69b3f3b4484f44aec18c7f6e40672"' : 'data-target="#xs-components-links-module-LawnmowerModule-080a446d4e523955d1e2e4d6ee9af6bd45a6247fa17bd04455d1d4805bdd224180c0ec42f2944bf4cbbc08218dff384dc7e69b3f3b4484f44aec18c7f6e40672"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LawnmowerModule-080a446d4e523955d1e2e4d6ee9af6bd45a6247fa17bd04455d1d4805bdd224180c0ec42f2944bf4cbbc08218dff384dc7e69b3f3b4484f44aec18c7f6e40672"' :
                                            'id="xs-components-links-module-LawnmowerModule-080a446d4e523955d1e2e4d6ee9af6bd45a6247fa17bd04455d1d4805bdd224180c0ec42f2944bf4cbbc08218dff384dc7e69b3f3b4484f44aec18c7f6e40672"' }>
                                            <li class="link">
                                                <a href="components/LawnmowerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LawnmowerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LawnmowerRoutingModule.html" data-type="entity-link" >LawnmowerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LightningModule.html" data-type="entity-link" >LightningModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LightningModule-52ccd2a5991b337c64a37d35f16f2f617be586bf433e702302a1331cbc55681678b801fce6ba4b034ce704657fafdd91afcb7a516298c3d6ba57411f43efcb0f"' : 'data-target="#xs-components-links-module-LightningModule-52ccd2a5991b337c64a37d35f16f2f617be586bf433e702302a1331cbc55681678b801fce6ba4b034ce704657fafdd91afcb7a516298c3d6ba57411f43efcb0f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LightningModule-52ccd2a5991b337c64a37d35f16f2f617be586bf433e702302a1331cbc55681678b801fce6ba4b034ce704657fafdd91afcb7a516298c3d6ba57411f43efcb0f"' :
                                            'id="xs-components-links-module-LightningModule-52ccd2a5991b337c64a37d35f16f2f617be586bf433e702302a1331cbc55681678b801fce6ba4b034ce704657fafdd91afcb7a516298c3d6ba57411f43efcb0f"' }>
                                            <li class="link">
                                                <a href="components/LightningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LightningComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LightningRoutingModule.html" data-type="entity-link" >LightningRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PoolModule.html" data-type="entity-link" >PoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PoolModule-936c40c1adb4d776b0f56924787de73a4eeba7cb7403f907bbd577442803b353271547feebaa79334148ff00b96bcdfba5f8c64f6cc6aba3030c048050a95913"' : 'data-target="#xs-components-links-module-PoolModule-936c40c1adb4d776b0f56924787de73a4eeba7cb7403f907bbd577442803b353271547feebaa79334148ff00b96bcdfba5f8c64f6cc6aba3030c048050a95913"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PoolModule-936c40c1adb4d776b0f56924787de73a4eeba7cb7403f907bbd577442803b353271547feebaa79334148ff00b96bcdfba5f8c64f6cc6aba3030c048050a95913"' :
                                            'id="xs-components-links-module-PoolModule-936c40c1adb4d776b0f56924787de73a4eeba7cb7403f907bbd577442803b353271547feebaa79334148ff00b96bcdfba5f8c64f6cc6aba3030c048050a95913"' }>
                                            <li class="link">
                                                <a href="components/PoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PoolComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PoolRoutingModule.html" data-type="entity-link" >PoolRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PortalModule.html" data-type="entity-link" >PortalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PortalModule-066d9839552cbb170b56feaa1e9c286500e451b98afb0e57b8192186a6225c42b0f010a0018d5b69b06030885ab1f9f40a3881351a919e243b71bf4eb79c79e9"' : 'data-target="#xs-components-links-module-PortalModule-066d9839552cbb170b56feaa1e9c286500e451b98afb0e57b8192186a6225c42b0f010a0018d5b69b06030885ab1f9f40a3881351a919e243b71bf4eb79c79e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PortalModule-066d9839552cbb170b56feaa1e9c286500e451b98afb0e57b8192186a6225c42b0f010a0018d5b69b06030885ab1f9f40a3881351a919e243b71bf4eb79c79e9"' :
                                            'id="xs-components-links-module-PortalModule-066d9839552cbb170b56feaa1e9c286500e451b98afb0e57b8192186a6225c42b0f010a0018d5b69b06030885ab1f9f40a3881351a919e243b71bf4eb79c79e9"' }>
                                            <li class="link">
                                                <a href="components/PortalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PortalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PortalRoutingModule.html" data-type="entity-link" >PortalRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilModule.html" data-type="entity-link" >ProfilModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfilModule-728d482d5c66450ebf8266bc69b803e36f7a87fd11ad94ea5361591094d298d5c7f332888036b397cfae5355c3500cb3a5218ae364e55d63b5367c96e3ee4aa7"' : 'data-target="#xs-components-links-module-ProfilModule-728d482d5c66450ebf8266bc69b803e36f7a87fd11ad94ea5361591094d298d5c7f332888036b397cfae5355c3500cb3a5218ae364e55d63b5367c96e3ee4aa7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilModule-728d482d5c66450ebf8266bc69b803e36f7a87fd11ad94ea5361591094d298d5c7f332888036b397cfae5355c3500cb3a5218ae364e55d63b5367c96e3ee4aa7"' :
                                            'id="xs-components-links-module-ProfilModule-728d482d5c66450ebf8266bc69b803e36f7a87fd11ad94ea5361591094d298d5c7f332888036b397cfae5355c3500cb3a5218ae364e55d63b5367c96e3ee4aa7"' }>
                                            <li class="link">
                                                <a href="components/ProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilRoutingModule.html" data-type="entity-link" >ProfilRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link" >PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublicModule-814d0634a0ef5079bf5f367824dc7d92ccf6681926dafa526584cd00a767b3ecc5b5ccddf3fdba66f45c9b16e46f4d63406edbf5933d96711d4d9b3f5ac65b93"' : 'data-target="#xs-components-links-module-PublicModule-814d0634a0ef5079bf5f367824dc7d92ccf6681926dafa526584cd00a767b3ecc5b5ccddf3fdba66f45c9b16e46f4d63406edbf5933d96711d4d9b3f5ac65b93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-814d0634a0ef5079bf5f367824dc7d92ccf6681926dafa526584cd00a767b3ecc5b5ccddf3fdba66f45c9b16e46f4d63406edbf5933d96711d4d9b3f5ac65b93"' :
                                            'id="xs-components-links-module-PublicModule-814d0634a0ef5079bf5f367824dc7d92ccf6681926dafa526584cd00a767b3ecc5b5ccddf3fdba66f45c9b16e46f4d63406edbf5933d96711d4d9b3f5ac65b93"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link" >PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WateringModule.html" data-type="entity-link" >WateringModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WateringModule-147c5bd168c29aecfa38e7a689b40740c6480702549e7868802e85d908228382972d76f103435d02496fe7fdb86970643483a0cc514751e949f3aef28cc19534"' : 'data-target="#xs-components-links-module-WateringModule-147c5bd168c29aecfa38e7a689b40740c6480702549e7868802e85d908228382972d76f103435d02496fe7fdb86970643483a0cc514751e949f3aef28cc19534"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WateringModule-147c5bd168c29aecfa38e7a689b40740c6480702549e7868802e85d908228382972d76f103435d02496fe7fdb86970643483a0cc514751e949f3aef28cc19534"' :
                                            'id="xs-components-links-module-WateringModule-147c5bd168c29aecfa38e7a689b40740c6480702549e7868802e85d908228382972d76f103435d02496fe7fdb86970643483a0cc514751e949f3aef28cc19534"' }>
                                            <li class="link">
                                                <a href="components/WateringComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WateringComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WateringRoutingModule.html" data-type="entity-link" >WateringRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiErrorService.html" data-type="entity-link" >ApiErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormValidationService.html" data-type="entity-link" >FormValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LawnmowerService.html" data-type="entity-link" >LawnmowerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LightningService.html" data-type="entity-link" >LightningService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PoolService.html" data-type="entity-link" >PoolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PortalService.html" data-type="entity-link" >PortalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WateringService.html" data-type="entity-link" >WateringService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/JwtInterceptor.html" data-type="entity-link" >JwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CredentialsModel.html" data-type="entity-link" >CredentialsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataUserModel.html" data-type="entity-link" >DataUserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataWateringModel.html" data-type="entity-link" >DataWateringModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SingleUserModel.html" data-type="entity-link" >SingleUserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SingleWateringModel.html" data-type="entity-link" >SingleWateringModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel.html" data-type="entity-link" >TokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenUserModel.html" data-type="entity-link" >TokenUserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WateringModel.html" data-type="entity-link" >WateringModel</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});