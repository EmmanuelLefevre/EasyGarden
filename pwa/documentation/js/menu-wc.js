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
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                <a href="modules/AddEntityModule.html" data-type="entity-link" >AddEntityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddEntityModule-d7d46e2741e3b141bb8b02f8d747acb703d2ebe16ad1b4c379657924a240fb70f19111c0f8bf80cd262ef6b0f6a274a84081a7f3813e5cd1e70fc1ad6a8c9c13"' : 'data-target="#xs-components-links-module-AddEntityModule-d7d46e2741e3b141bb8b02f8d747acb703d2ebe16ad1b4c379657924a240fb70f19111c0f8bf80cd262ef6b0f6a274a84081a7f3813e5cd1e70fc1ad6a8c9c13"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddEntityModule-d7d46e2741e3b141bb8b02f8d747acb703d2ebe16ad1b4c379657924a240fb70f19111c0f8bf80cd262ef6b0f6a274a84081a7f3813e5cd1e70fc1ad6a8c9c13"' :
                                            'id="xs-components-links-module-AddEntityModule-d7d46e2741e3b141bb8b02f8d747acb703d2ebe16ad1b4c379657924a240fb70f19111c0f8bf80cd262ef6b0f6a274a84081a7f3813e5cd1e70fc1ad6a8c9c13"' }>
                                            <li class="link">
                                                <a href="components/AddEntityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddEntityComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-edbfea8651b3c87aa6d27f405566914fe339782c10143d65066dd41a76b55ceef3b09fa79bafba655f15880bfb47af91451e67da872ff31051971ab95521ce52"' : 'data-target="#xs-components-links-module-AppModule-edbfea8651b3c87aa6d27f405566914fe339782c10143d65066dd41a76b55ceef3b09fa79bafba655f15880bfb47af91451e67da872ff31051971ab95521ce52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-edbfea8651b3c87aa6d27f405566914fe339782c10143d65066dd41a76b55ceef3b09fa79bafba655f15880bfb47af91451e67da872ff31051971ab95521ce52"' :
                                            'id="xs-components-links-module-AppModule-edbfea8651b3c87aa6d27f405566914fe339782c10143d65066dd41a76b55ceef3b09fa79bafba655f15880bfb47af91451e67da872ff31051971ab95521ce52"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Error404Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404Component</a>
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
                                <a href="modules/CloseFormButtonModule.html" data-type="entity-link" >CloseFormButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CloseFormButtonModule-84ee113a1351a0b8389bbfd30e2b1c6ee747109441e6c273bebe94d52d391833e9f87f89d604ef58eb7741920771230412f1a04845993eb355444a4c57ce5500"' : 'data-target="#xs-components-links-module-CloseFormButtonModule-84ee113a1351a0b8389bbfd30e2b1c6ee747109441e6c273bebe94d52d391833e9f87f89d604ef58eb7741920771230412f1a04845993eb355444a4c57ce5500"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CloseFormButtonModule-84ee113a1351a0b8389bbfd30e2b1c6ee747109441e6c273bebe94d52d391833e9f87f89d604ef58eb7741920771230412f1a04845993eb355444a4c57ce5500"' :
                                            'id="xs-components-links-module-CloseFormButtonModule-84ee113a1351a0b8389bbfd30e2b1c6ee747109441e6c273bebe94d52d391833e9f87f89d604ef58eb7741920771230412f1a04845993eb355444a4c57ce5500"' }>
                                            <li class="link">
                                                <a href="components/CloseFormButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloseFormButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmDialogModule.html" data-type="entity-link" >ConfirmDialogModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DirectivesModule.html" data-type="entity-link" >DirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DirectivesModule-2a281336bf4bfb0eb95c27ec961d6b5d29f7ceba2df64a173d874be76baf72756250bca8cea1833ac44ced5ae8d6c6319216f89a640274ea55b3ea1af085edc6"' : 'data-target="#xs-directives-links-module-DirectivesModule-2a281336bf4bfb0eb95c27ec961d6b5d29f7ceba2df64a173d874be76baf72756250bca8cea1833ac44ced5ae8d6c6319216f89a640274ea55b3ea1af085edc6"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-2a281336bf4bfb0eb95c27ec961d6b5d29f7ceba2df64a173d874be76baf72756250bca8cea1833ac44ced5ae8d6c6319216f89a640274ea55b3ea1af085edc6"' :
                                        'id="xs-directives-links-module-DirectivesModule-2a281336bf4bfb0eb95c27ec961d6b5d29f7ceba2df64a173d874be76baf72756250bca8cea1833ac44ced5ae8d6c6319216f89a640274ea55b3ea1af085edc6"' }>
                                        <li class="link">
                                            <a href="directives/CancelSearchInputResetDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CancelSearchInputResetDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/InputFocusDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputFocusDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/InputTitleCaseDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTitleCaseDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/InputTrimDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTrimDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/InputUpperCaseDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputUpperCaseDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RemoveNgPristineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveNgPristineDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RemoveNgTouchedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveNgTouchedDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RemoveNgUntouchedDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveNgUntouchedDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RemoveNgValidDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveNgValidDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SearchInputResetDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchInputResetDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EasygardenLogoModule.html" data-type="entity-link" >EasygardenLogoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EasygardenLogoModule-bea7e5ffd1c12f1de7f6cc1637b6db0d9d47c25de13b38947a6aae46f6c6f4faaa2f380e949a325e6aa00caf00360ac6083af4b133b34f4c3bd872091119a79c"' : 'data-target="#xs-components-links-module-EasygardenLogoModule-bea7e5ffd1c12f1de7f6cc1637b6db0d9d47c25de13b38947a6aae46f6c6f4faaa2f380e949a325e6aa00caf00360ac6083af4b133b34f4c3bd872091119a79c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EasygardenLogoModule-bea7e5ffd1c12f1de7f6cc1637b6db0d9d47c25de13b38947a6aae46f6c6f4faaa2f380e949a325e6aa00caf00360ac6083af4b133b34f4c3bd872091119a79c"' :
                                            'id="xs-components-links-module-EasygardenLogoModule-bea7e5ffd1c12f1de7f6cc1637b6db0d9d47c25de13b38947a6aae46f6c6f4faaa2f380e949a325e6aa00caf00360ac6083af4b133b34f4c3bd872091119a79c"' }>
                                            <li class="link">
                                                <a href="components/EasygardenLogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EasygardenLogoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EasygardenModule.html" data-type="entity-link" >EasygardenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EasygardenModule-e538b874eb91f58220fc988ed8ad8b0f9a4b83506d4db52c3c7eb2e1257235d24ea322538ef419bba7425ab52459d08811de3acfb03a61f6317a60f5b8cdd680"' : 'data-target="#xs-components-links-module-EasygardenModule-e538b874eb91f58220fc988ed8ad8b0f9a4b83506d4db52c3c7eb2e1257235d24ea322538ef419bba7425ab52459d08811de3acfb03a61f6317a60f5b8cdd680"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EasygardenModule-e538b874eb91f58220fc988ed8ad8b0f9a4b83506d4db52c3c7eb2e1257235d24ea322538ef419bba7425ab52459d08811de3acfb03a61f6317a60f5b8cdd680"' :
                                            'id="xs-components-links-module-EasygardenModule-e538b874eb91f58220fc988ed8ad8b0f9a4b83506d4db52c3c7eb2e1257235d24ea322538ef419bba7425ab52459d08811de3acfb03a61f6317a60f5b8cdd680"' }>
                                            <li class="link">
                                                <a href="components/GardenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GardenComponent</a>
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
                                <a href="modules/EditEntityNameModule.html" data-type="entity-link" >EditEntityNameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EditEntityNameModule-e1eb3d525b1393e60f9b79bc229d49279d7aa1ea420fb96707985987bff915c325a146f2e429a6adeee2730182755b6636da73d73474e98a55c4b6a0b5a68b4d"' : 'data-target="#xs-components-links-module-EditEntityNameModule-e1eb3d525b1393e60f9b79bc229d49279d7aa1ea420fb96707985987bff915c325a146f2e429a6adeee2730182755b6636da73d73474e98a55c4b6a0b5a68b4d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditEntityNameModule-e1eb3d525b1393e60f9b79bc229d49279d7aa1ea420fb96707985987bff915c325a146f2e429a6adeee2730182755b6636da73d73474e98a55c4b6a0b5a68b4d"' :
                                            'id="xs-components-links-module-EditEntityNameModule-e1eb3d525b1393e60f9b79bc229d49279d7aa1ea420fb96707985987bff915c325a146f2e429a6adeee2730182755b6636da73d73474e98a55c4b6a0b5a68b4d"' }>
                                            <li class="link">
                                                <a href="components/EditEntityNameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditEntityNameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LawnmowerModule.html" data-type="entity-link" >LawnmowerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LawnmowerModule-4bf42e4a4ecf13dfb6bc6574e05d8e2995b8b61b32729e1606c7d2608d9a7ab467b29ac8a2c5e20230c5e0f3d3fef1b3589e4ef194f4ac2100ec52e90dfabfa0"' : 'data-target="#xs-components-links-module-LawnmowerModule-4bf42e4a4ecf13dfb6bc6574e05d8e2995b8b61b32729e1606c7d2608d9a7ab467b29ac8a2c5e20230c5e0f3d3fef1b3589e4ef194f4ac2100ec52e90dfabfa0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LawnmowerModule-4bf42e4a4ecf13dfb6bc6574e05d8e2995b8b61b32729e1606c7d2608d9a7ab467b29ac8a2c5e20230c5e0f3d3fef1b3589e4ef194f4ac2100ec52e90dfabfa0"' :
                                            'id="xs-components-links-module-LawnmowerModule-4bf42e4a4ecf13dfb6bc6574e05d8e2995b8b61b32729e1606c7d2608d9a7ab467b29ac8a2c5e20230c5e0f3d3fef1b3589e4ef194f4ac2100ec52e90dfabfa0"' }>
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
                                            'data-target="#components-links-module-LightningModule-350db0c5522deadfd1d5628f3bdab384a4b251382ad53dbca055c5bb78ab5963feea4282d647c5711cfb61634c54595e80388294fe17135e4ceadc9ebc3925ba"' : 'data-target="#xs-components-links-module-LightningModule-350db0c5522deadfd1d5628f3bdab384a4b251382ad53dbca055c5bb78ab5963feea4282d647c5711cfb61634c54595e80388294fe17135e4ceadc9ebc3925ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LightningModule-350db0c5522deadfd1d5628f3bdab384a4b251382ad53dbca055c5bb78ab5963feea4282d647c5711cfb61634c54595e80388294fe17135e4ceadc9ebc3925ba"' :
                                            'id="xs-components-links-module-LightningModule-350db0c5522deadfd1d5628f3bdab384a4b251382ad53dbca055c5bb78ab5963feea4282d647c5711cfb61634c54595e80388294fe17135e4ceadc9ebc3925ba"' }>
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
                                <a href="modules/MainPipeModule.html" data-type="entity-link" >MainPipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-MainPipeModule-f19aeda572896db90bcb18964965dbbd955cd1de4de7d1e74d549b11e6b0c275530b8a4f6a2179ae6d43ed40982a58841a0d290b7f414c1dbe38dd6f6eb04bad"' : 'data-target="#xs-pipes-links-module-MainPipeModule-f19aeda572896db90bcb18964965dbbd955cd1de4de7d1e74d549b11e6b0c275530b8a4f6a2179ae6d43ed40982a58841a0d290b7f414c1dbe38dd6f6eb04bad"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-MainPipeModule-f19aeda572896db90bcb18964965dbbd955cd1de4de7d1e74d549b11e6b0c275530b8a4f6a2179ae6d43ed40982a58841a0d290b7f414c1dbe38dd6f6eb04bad"' :
                                            'id="xs-pipes-links-module-MainPipeModule-f19aeda572896db90bcb18964965dbbd955cd1de4de7d1e74d549b11e6b0c275530b8a4f6a2179ae6d43ed40982a58841a0d290b7f414c1dbe38dd6f6eb04bad"' }>
                                            <li class="link">
                                                <a href="pipes/PresenceSensorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PresenceSensorPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PoolModule.html" data-type="entity-link" >PoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PoolModule-56ac668cd5c0d26cb0caeea29573cb701f02e0fcc720495a3a9958e3a09fc07c8aeeef82a02c15900024dea1075f611697c8d73a71c7c3f3c692237a36b12690"' : 'data-target="#xs-components-links-module-PoolModule-56ac668cd5c0d26cb0caeea29573cb701f02e0fcc720495a3a9958e3a09fc07c8aeeef82a02c15900024dea1075f611697c8d73a71c7c3f3c692237a36b12690"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PoolModule-56ac668cd5c0d26cb0caeea29573cb701f02e0fcc720495a3a9958e3a09fc07c8aeeef82a02c15900024dea1075f611697c8d73a71c7c3f3c692237a36b12690"' :
                                            'id="xs-components-links-module-PoolModule-56ac668cd5c0d26cb0caeea29573cb701f02e0fcc720495a3a9958e3a09fc07c8aeeef82a02c15900024dea1075f611697c8d73a71c7c3f3c692237a36b12690"' }>
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
                                            'data-target="#components-links-module-PortalModule-0026fe9a7107c1d66258e20e029d9a338aa8a88e529f70e5246b6e447b00b7ded4dd60650a8bcaee593a068f2f78bd61f92bf7cf5458ba2431e0113b7b53eeb2"' : 'data-target="#xs-components-links-module-PortalModule-0026fe9a7107c1d66258e20e029d9a338aa8a88e529f70e5246b6e447b00b7ded4dd60650a8bcaee593a068f2f78bd61f92bf7cf5458ba2431e0113b7b53eeb2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PortalModule-0026fe9a7107c1d66258e20e029d9a338aa8a88e529f70e5246b6e447b00b7ded4dd60650a8bcaee593a068f2f78bd61f92bf7cf5458ba2431e0113b7b53eeb2"' :
                                            'id="xs-components-links-module-PortalModule-0026fe9a7107c1d66258e20e029d9a338aa8a88e529f70e5246b6e447b00b7ded4dd60650a8bcaee593a068f2f78bd61f92bf7cf5458ba2431e0113b7b53eeb2"' }>
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
                                            'data-target="#components-links-module-ProfilModule-b832964645cd754e65d06fb29e24a0347f024580fc4469151631c1a0239f030456354117e0b3c29ddce371cc9eeda37c5519014ea83d05ea3440919ae1ae6a90"' : 'data-target="#xs-components-links-module-ProfilModule-b832964645cd754e65d06fb29e24a0347f024580fc4469151631c1a0239f030456354117e0b3c29ddce371cc9eeda37c5519014ea83d05ea3440919ae1ae6a90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilModule-b832964645cd754e65d06fb29e24a0347f024580fc4469151631c1a0239f030456354117e0b3c29ddce371cc9eeda37c5519014ea83d05ea3440919ae1ae6a90"' :
                                            'id="xs-components-links-module-ProfilModule-b832964645cd754e65d06fb29e24a0347f024580fc4469151631c1a0239f030456354117e0b3c29ddce371cc9eeda37c5519014ea83d05ea3440919ae1ae6a90"' }>
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
                                <a href="modules/PublicComponentsModule.html" data-type="entity-link" >PublicComponentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link" >PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublicModule-9830dbd79f2eb006c5c3ce22f254452e8bb65406d356a461d30521c5061fa9d64fdffce1673096faa47e2023305e62de086e9ef21aedb7529483fa62a74374c0"' : 'data-target="#xs-components-links-module-PublicModule-9830dbd79f2eb006c5c3ce22f254452e8bb65406d356a461d30521c5061fa9d64fdffce1673096faa47e2023305e62de086e9ef21aedb7529483fa62a74374c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-9830dbd79f2eb006c5c3ce22f254452e8bb65406d356a461d30521c5061fa9d64fdffce1673096faa47e2023305e62de086e9ef21aedb7529483fa62a74374c0"' :
                                            'id="xs-components-links-module-PublicModule-9830dbd79f2eb006c5c3ce22f254452e8bb65406d356a461d30521c5061fa9d64fdffce1673096faa47e2023305e62de086e9ef21aedb7529483fa62a74374c0"' }>
                                            <li class="link">
                                                <a href="components/ForgottenPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgottenPasswordComponent</a>
                                            </li>
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
                                            'data-target="#components-links-module-WateringModule-7b82de4b741cfd6bdea22266c553a4eb278da32bbd75d40c9b02e76cc01c98dbbd2ac2e539d9cd9869f994084e50ba4896eae97e051eeaa65f7cbbc23913c72a"' : 'data-target="#xs-components-links-module-WateringModule-7b82de4b741cfd6bdea22266c553a4eb278da32bbd75d40c9b02e76cc01c98dbbd2ac2e539d9cd9869f994084e50ba4896eae97e051eeaa65f7cbbc23913c72a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WateringModule-7b82de4b741cfd6bdea22266c553a4eb278da32bbd75d40c9b02e76cc01c98dbbd2ac2e539d9cd9869f994084e50ba4896eae97e051eeaa65f7cbbc23913c72a"' :
                                            'id="xs-components-links-module-WateringModule-7b82de4b741cfd6bdea22266c553a4eb278da32bbd75d40c9b02e76cc01c98dbbd2ac2e539d9cd9869f994084e50ba4896eae97e051eeaa65f7cbbc23913c72a"' }>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ActivatedAccountComponent.html" data-type="entity-link" >ActivatedAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SnackbarComponent.html" data-type="entity-link" >SnackbarComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/IConfirmDialog.html" data-type="entity-link" >IConfirmDialog</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISnackbar.html" data-type="entity-link" >ISnackbar</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DecodedTokenService.html" data-type="entity-link" >DecodedTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormErrorMessageService.html" data-type="entity-link" >FormErrorMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormValidationService.html" data-type="entity-link" >FormValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GardenFilterService.html" data-type="entity-link" >GardenFilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GardenService.html" data-type="entity-link" >GardenService</a>
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
                                    <a href="injectables/ProfilService.html" data-type="entity-link" >ProfilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link" >RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService.html" data-type="entity-link" >SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFormInputValueService.html" data-type="entity-link" >SharedFormInputValueService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
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
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
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
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/GardenResolver.html" data-type="entity-link" >GardenResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LawnmowerResolver.html" data-type="entity-link" >LawnmowerResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LightningResolver.html" data-type="entity-link" >LightningResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PoolResolver.html" data-type="entity-link" >PoolResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PortalResolver.html" data-type="entity-link" >PortalResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/WateringResolver.html" data-type="entity-link" >WateringResolver</a>
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
                                <a href="interfaces/IAdd.html" data-type="entity-link" >IAdd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddLawnmower.html" data-type="entity-link" >IAddLawnmower</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddLightning.html" data-type="entity-link" >IAddLightning</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddPool.html" data-type="entity-link" >IAddPool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddPortal.html" data-type="entity-link" >IAddPortal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddWatering.html" data-type="entity-link" >IAddWatering</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICredentials.html" data-type="entity-link" >ICredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataGarden.html" data-type="entity-link" >IDataGarden</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataLawnmower.html" data-type="entity-link" >IDataLawnmower</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataLightning.html" data-type="entity-link" >IDataLightning</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataPool.html" data-type="entity-link" >IDataPool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataPortal.html" data-type="entity-link" >IDataPortal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataUser.html" data-type="entity-link" >IDataUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataWatering.html" data-type="entity-link" >IDataWatering</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGarden.html" data-type="entity-link" >IGarden</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGardenFilter.html" data-type="entity-link" >IGardenFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILawnmower.html" data-type="entity-link" >ILawnmower</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILawnmowerFilter.html" data-type="entity-link" >ILawnmowerFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILightning.html" data-type="entity-link" >ILightning</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILightningFilter.html" data-type="entity-link" >ILightningFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IName.html" data-type="entity-link" >IName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPasswordErrors.html" data-type="entity-link" >IPasswordErrors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPool.html" data-type="entity-link" >IPool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPoolFilter.html" data-type="entity-link" >IPoolFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPortal.html" data-type="entity-link" >IPortal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPortalFilter.html" data-type="entity-link" >IPortalFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToken.html" data-type="entity-link" >IToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWatering.html" data-type="entity-link" >IWatering</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWateringFilter.html" data-type="entity-link" >IWateringFilter</a>
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