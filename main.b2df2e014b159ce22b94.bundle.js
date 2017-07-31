webpackJsonp([1],{0:function(e,t){},1:function(e,t){},3:function(e,t,n){e.exports=n("cDNt")},"6kpM":function(e,t,n){"use strict";var s=n("/oeL"),a=n("koeK"),r=(n.n(a),n("nVvX")),o=(n.n(r),n("OGkG")),i=(n.n(o),n("xrDH")),c=(n.n(i),n("XKz0"));n.d(t,"a",function(){return p});var d=this&&this.__decorate||function(e,t,n,s){var a,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,s);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(o=(r<3?a(o):r>3?a(t,n,o):a(t,n))||o);return r>3&&o&&Object.defineProperty(t,n,o),o},l=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},p=function(){function e(e){this.http=e,this.Transaction=r.Transaction,this.Address=r.Address,this.PATHS={BIP45:["m/45'/2147483647/0","m/45'/2147483647/1"],BIP44:{testnet:["m/44'/1'/0'/0","m/44'/1'/0'/1"],livenet:["m/44'/0'/0'/0","m/44'/0'/0'/1"]}}}return e.prototype.fromBackup=function(e,t,n,s){if(!e.backup)return null;try{JSON.parse(e.backup)}catch(e){throw new Error("JSON invalid. Please copy only the text within (and including) the { } brackets around it.")}var r;try{r=a.decrypt(e.password,e.backup)}catch(e){throw new Error("Incorrect backup password")}if(r=JSON.parse(r),!r.n)throw new Error("Backup format not recognized. If you are using a Copay Beta backup and version is older than 0.10, please see: https://github.com/bitpay/copay/issues/4730#issuecomment-244522614");if(r.m!=t||r.n!=n)throw new Error("The wallet configuration (m-n) does not match with values provided.");if(r.network!=s)throw new Error("Incorrect network.");if(!r.xPrivKeyEncrypted&&!r.xPrivKey)throw new Error("The backup does not have a private key");var o=r.xPrivKey;if(r.xPrivKeyEncrypted)try{o=a.decrypt(e.xPrivPass,r.xPrivKeyEncrypted)}catch(e){throw new Error("Can not decrypt private key")}return{walletId:r.walletId,copayerId:r.copayerId,xPriv:o,derivationStrategy:r.derivationStrategy||"BIP45",addressType:r.addressType||"P2SH",m:t,n:n,network:s,from:"backup"}},e.prototype.fromMnemonic=function(e,t,n,s){if(!e.backup)return null;var a,r=e.backup,i=e.password;try{a=new o(r).toHDPrivateKey(i,s).toString()}catch(e){throw new Error("Mnemonic wallet seed is not valid.")}return{xPriv:a,derivationStrategy:"BIP44",addressType:1==n?"P2PKH":"P2SH",m:t,n:n,network:s,from:"mnemonic"}},e.prototype.buildWallet=function(e){var t;if(e=i.compact(e),0==e.length)throw new Error("No data provided");if(1!=i.uniq(i.map(e,"from")).length)throw new Error("Mixed backup sources not supported");if(t=i.pick(e[0],["walletId","derivationStrategy","addressType","m","n","network","from"]),t.copayers=i.map(e,function(e){if(e.walletId!=t.walletId)throw new Error("Backups do not belong to the same wallets.");return{copayerId:e.copayerId,xPriv:e.xPriv}}),"backup"==t.from&&i.uniq(i.compact(i.map(t.copayers,"copayerId"))).length!=t.copayers.length)throw new Error("Some of the backups belong to the same copayers");return console.log("Recovering wallet",t),t},e.prototype.getWallet=function(e,t,n,s){var a=this,r=i.map(e,function(e){return"{"==e.backup.charAt(0)?a.fromBackup(e,t,n,s):a.fromMnemonic(e,t,n,s)});return this.buildWallet(r)},e.prototype.scanWallet=function(e,t,n,s){var a;n("Getting addresses... GAP:"+t),this.getActiveAddresses(e,t,n,function(e,t){if(n("Active addresses:"+JSON.stringify(t)),e)return s(e);a=i.flatten(i.map(t,"utxo"));var r={addresses:t,balance:i.sumBy(a,"amount")};return s(null,r)})},e.prototype.getPaths=function(e){return"BIP45"==e.derivationStrategy?this.PATHS[e.derivationStrategy]:"BIP44"==e.derivationStrategy?this.PATHS[e.derivationStrategy][e.network]:void 0},e.prototype.getHdDerivations=function(e){function t(e,t,n){var s=r.HDPrivateKey(e);return n?s.deriveChild(t):s.deriveNonCompliantChild(t)}function n(e){return 1==e.length?e[0]:function(e,t){for(var n=[],s=0;s<e.length;s++)for(var a=0;a<t.length;a++)n.push(i.flatten([e[s],t[a]]));return n}(e[0],n(i.tail(e)))}var s=i.map(e.copayers,"xPriv"),a=[];return i.each(this.getPaths(e),function(e){var r=n(i.map(s,function(n,s){var a=t(n,e,!0),r=t(n,e,!1),o=[];return o.push({copayer:s+1,path:e,compliant:!0,key:a}),a.toString()!=r.toString()&&o.push({copayer:s+1,path:e,compliant:!1,key:r}),o}));a=a.concat(r)}),a},e.prototype.getActiveAddresses=function(e,t,n,s){function a(e){if(e>=l.length)return s(null,d);o=0,r(l[e],0,function(t,n){if(t)return s(t);a(e+1)})}function r(s,a,l){if(o>t)return l();var p=c.generateAddress(e,s,a);c.getAddressData(p,e.network,function(e,t){if(e)return l(e);i.isEmpty(t)?o++:(n("Address is Active!"),console.log("#Active address:",t),d.push(t),o=0),n("inactiveCount:"+o),r(s,a+1,l)})}var o,c=this,d=[],l=this.getHdDerivations(e);a(0)},e.prototype.generateAddress=function(e,t,n){var s=[],a=[];i.each([].concat(t),function(e){var t=r.HDPrivateKey(e.key),o=t.deriveChild(n).privateKey;s.push(o),a.push(o.publicKey)});var o;if("P2SH"==e.addressType)o=r.Address.createMultisig(a,e.m,e.network);else{if("P2PKH"!=e.addressType)throw new Error("Address type not supported");o=this.Address.fromPublicKey(a[0],e.network)}return{addressObject:o,pubKeys:a,privKeys:s,info:t,index:n}},e.prototype.getAddressData=function(e,t,n){var s=this;this.checkAddress(e.addressObject,t).then(function(a){a.subscribe(function(a){s.checkUtxos(e.addressObject,t).then(function(t){t.subscribe(function(t){var s={address:a.addrStr,balance:a.balance,unconfirmedBalance:a.unconfirmedBalance,utxo:t,privKeys:e.privKeys,pubKeys:e.pubKeys,info:e.info,index:e.index,isActive:a.unconfirmedTxApperances+a.txApperances>0};return s.isActive?n(null,s):n()})})})})},e.prototype.checkAddress=function(e,t){var n=this;return"testnet"==t?new Promise(function(t){t(n.http.get("https://test-insight.bitpay.com/api/addr/"+e+"?noTxList=1"))}):new Promise(function(t){t(n.http.get("https://insight.bitpay.com/api/addr/"+e+"?noTxList=1"))})},e.prototype.checkUtxos=function(e,t){var n=this;return"testnet"==t?new Promise(function(t){t(n.http.get("https://test-insight.bitpay.com/api/addr/"+e+"/utxo?noCache=1"))}):new Promise(function(t){t(n.http.get("https://insight.bitpay.com/api/addr/"+e+"/utxo?noCache=1"))})},e.prototype.createRawTx=function(e,t,n,s){if(!e||!this.Address.isValid(e))throw new Error("Please enter a valid address.");var a=parseInt((1e8*t.balance-1e8*s).toFixed(0));if(a<=0)throw new Error("Funds are insufficient to complete the transaction");try{new this.Address(e,n.network)}catch(e){throw new Error("Incorrect destination address network")}try{var r=[],o=new this.Transaction;i.each(t.addresses,function(e){e.utxo.length>0&&i.each(e.utxo,function(t){"P2SH"==n.addressType?o.from(t,e.pubKeys,n.m):o.from(t),r=r.concat(e.privKeys.slice(0,n.m))})}),o.to(e,a),o.sign(i.uniq(r));var c=o.serialize();return console.log("Raw transaction: ",c),c}catch(e){throw console.log(e),new Error("Could not build tx: "+e)}},e.prototype.txBroadcast=function(e,t){var n=this;return"testnet"==t?new Promise(function(t){t(n.http.post("https://test-insight.bitpay.com/api/tx/send",{rawtx:e}))}):new Promise(function(t){t(n.http.post("https://insight.bitpay.com/api/tx/send",{rawtx:e}))})},e}();p=d([n.i(s.c)(),l("design:paramtypes",["function"==typeof(u=void 0!==c.b&&c.b)&&u||Object])],p);var u},W675:function(e,t,n){t=e.exports=n("rP7Y")(!1),t.push([e.i,"",""]),e.exports=e.exports.toString()},"aR8+":function(e,t,n){"use strict";var s=n("fc+i"),a=n("/oeL"),r=n("bm2B"),o=n("XKz0"),i=n("wQAS");n.d(t,"a",function(){return d});var c=this&&this.__decorate||function(e,t,n,s){var a,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,s);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(o=(r<3?a(o):r>3?a(t,n,o):a(t,n))||o);return r>3&&o&&Object.defineProperty(t,n,o),o},d=function(){function e(){}return e}();d=c([n.i(a.b)({declarations:[i.a],imports:[s.a,r.a,o.a],providers:[],bootstrap:[i.a]})],d)},cDNt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("/oeL"),a=n("Qa4U"),r=n("aR8+");n("p5Ee").a.production&&n.i(s.a)(),n.i(a.a)().bootstrapModule(r.a)},efyd:function(e,t){e.exports='<div class="header">\n  <div class="header-content">\n    <img class="bitpay-logo" src="assets/img/bitpay-logo-negative.svg" alt="Bitpay">\n    <div class="header-center">\n      <h3 class="header-title">Recovery Tool</h3>\n      <div class="repository-link">\n        <a href="https://github.com/bitpay/copay-recovery" target="blank">\n          <img src="assets/img/github.png" alt="Github">\n        </a>\n      </div>\n    </div>\n    <img class="copay-logo" src="assets/img/copay-logo-negative.svg" alt="Copay">\n  </div>\n</div>\n<div [hidden]="!showLoadingSpinner" class="no-clickable-background">\n  <div class="loading-message">\n    <h4>Please wait</h4>\n    <h4>This process could take several minutes</h4>\n  </div>\n</div>\n<div class="container">\n\n  <div [hidden]="!successMessage" class="alert alert-success">{{successMessage}}</div>\n  <div [hidden]="!errorMessage" class="alert alert-danger">{{errorMessage}}</div>\n  <div [hidden]="!statusMessage" class="alert alert-info">{{statusMessage}}</div>\n\n  <form #processInputsForm="ngForm" (ngSubmit)="processInputs()" *ngIf="beforeScan">\n\n    <div class="card">\n      <div class="card-block">\n        <h4 class="card-title">WALLET CONFIGURATION</h4>\n        <div class="row">\n          <div class="form-group col-sm-6">\n            <label for="signaturesNumber">Required number of signatures</label>\n            <select class="form-control" id="signaturesNumber" name="signaturesNumber" [(ngModel)]="signaturesNumber">\n            <option *ngFor="let option of availableOptions" [ngValue]="option">{{option}}</option>\n          </select>\n          </div>\n\n          <div class="form-group col-sm-6">\n            <label for="copayersNumber">Total number of Copayers</label>\n            <select class="form-control" id="copayersNumber" name="copayersNumber" [(ngModel)]="copayersNumber" (ngModelChange)="updateCopayersForm($event)">\n            <option *ngFor="let option of availableOptions" [ngValue]="option">{{option}}</option>\n          </select>\n          </div>\n\n          <div class="form-group col-sm-6">\n            <label for="network">Network</label>\n            <select class="form-control" id="network" name="network" [(ngModel)]="network">\n            <option *ngFor="let network of availableNetworks" [ngValue]="network">{{network}}</option>\n          </select>\n          </div>\n\n          <div class="form-group col-sm-6">\n            <label for="addressGap">Address Gap</label><small> (Usually does not need to be changed)</small>\n            <input type="number" class="form-control" id="addressGap" name="addressGap" [(ngModel)]="addressGap" required>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="card" *ngFor="let copayer of copayers">\n      <div class="card-block">\n        <h6 class="card-title">Backup for copayer {{copayer}}:</h6>\n        <div class="row">\n          <div class="form-group col-sm-6">\n            <label for="dataBackUp">Recovery phrase (mnemonic) or File/Text backup</label>\n            <input type="text" class="form-control" id="dataBackUp" name="dataBackUp" [(ngModel)]="data.backUp[copayer]" required>\n          </div>\n\n          <div class="form-group col-sm-6">\n            <label for="contentFile">Or upload a File/Text backup:</label>\n            <input type="file" class="form-control-file" id="contentFile" name="contentFile" accept=".json, .txt" aria-describedby="contentFileHelp"\n              (change)="fileChangeEvent($event, copayer)">\n            <small id="fileHelp" class="form-text text-muted">Extensions accepted: .json and .txt</small>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label for="dataPass">Backup password:</label><small> (in case you have one)</small>\n          <input type="password" class="form-control" id="dataPass" name="dataPass" [(ngModel)]="data.pass[copayer]">\n        </div>\n\n        <div class="form-group">\n          <label for="dataPassX">Encrypted private key password</label><small> (spending password)</small>\n          <input type="password" class="form-control" id="dataPassX" name="dataPassX" [(ngModel)]="data.passX[copayer]">\n        </div>\n      </div>\n    </div>\n\n    <button type="submit" [disabled]="!processInputsForm.form.valid  || showLoadingSpinner" class="btn btn-primary btn-lg btn-block">Scan wallet</button>\n  </form>\n\n  <form #sendFundsForm="ngForm" (ngSubmit)="sendFunds(destinationAddress)" *ngIf="!beforeScan">\n\n    <div class="card">\n      <div class="card-block">\n        <h6 class="card-title">{{totalBalance}}</h6>\n        <div class="input-group">\n          <div class="input-group-addon">Destination Address:</div>\n          <input type="text" class="form-control" id="destinationAddress" name="destinationAddress" [(ngModel)]="destinationAddress"\n            required>\n        </div>\n      </div>\n    </div>\n    <button type="submit" [disabled]="!sendFundsForm.form.valid || showLoadingSpinner" class="btn btn-primary btn-lg btn-block">Transfer</button>\n    <button type="button" (click)="ngOnInit()" class="btn btn-outline-primary btn-lg btn-block">Go back</button>\n  </form>\n\n  <div [hidden]="!showLoadingSpinner">\n    <div class="s1">\n      <div class="s b sb1"></div>\n      <div class="s b sb2"></div>\n      <div class="s b sb3"></div>\n      <div class="s b sb4"></div>\n    </div>\n    <div class="s2">\n      <div class="s b sb5"></div>\n      <div class="s b sb6"></div>\n      <div class="s b sb7"></div>\n      <div class="s b sb8"></div>\n    </div>\n    <div class="bigcon">\n      <div class="big b"></div>\n    </div>\n  </div>\n\n</div>\n'},n7du:function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="n7du"},p5Ee:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var s={production:!1}},wQAS:function(e,t,n){"use strict";var s=n("/oeL"),a=n("xrDH"),r=(n.n(a),n("6kpM"));n.d(t,"a",function(){return c});var o=this&&this.__decorate||function(e,t,n,s){var a,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,s);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(o=(r<3?a(o):r>3?a(t,n,o):a(t,n))||o);return r>3&&o&&Object.defineProperty(t,n,o),o},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(){function e(e){this.RecoveryService=e,this.copayers=[1],this.addressGap=20,this.data={backUp:[],pass:[],passX:[],gap:this.addressGap},this.availableOptions=[1,2,3,4,5,6],this.availableNetworks=["livenet","testnet"],this.fee=1e-4,this.signaturesNumber=this.availableOptions[0],this.copayersNumber=this.availableOptions[0],this.network=this.availableNetworks[0],this.statusMessage=null,this.successMessage=null,this.errorMessage=null,this.showLoadingSpinner=!1}return e.prototype.ngOnInit=function(){this.beforeScan=!0,this.destinationAddress="",this.hideMessage()},e.prototype.updateCopayersForm=function(){this.copayers=a.map(a.range(1,this.copayersNumber+1),function(e){return e})},e.prototype.processInputs=function(){var e=this;this.hideMessage();var t=this;this.showLoadingSpinner=!0,this.beforeScan=!0;var n=a.map(a.range(1,this.copayersNumber+1),function(e){return{backup:t.data.backUp[e]||"",password:t.data.pass[e]||"",xPrivPass:t.data.passX[e]||""}});try{this.wallet=this.RecoveryService.getWallet(n,this.signaturesNumber,this.copayersNumber,this.network)}catch(e){return this.showLoadingSpinner=!1,this.showMessage(e.message,3)}this.showMessage("Scanning funds...",1);var s=function(e){console.log("Report:",e)},r=+this.addressGap;r=r||20,this.RecoveryService.scanWallet(this.wallet,r,s,function(t,n){if(t)return e.showMessage(t,3);e.scanResults=n,console.log("## Total balance:",e.scanResults.balance.toFixed(8)+" BTC"),e.showMessage("Search completed",2),e.showLoadingSpinner=!1,e.beforeScan=!1,e.totalBalance="Available balance: "+e.scanResults.balance.toFixed(8)+" BTC",e.scanResults.balance-e.fee<=0&&(e.totalBalance+=". Insufficents funds.")})},e.prototype.fileChangeEvent=function(e,t){this.readThis(e.target,t)},e.prototype.readThis=function(e,t){var n=this,s=e.files[0],a=new FileReader;a.readAsText(s),a.onloadend=function(e){n.data.backUp[t]=a.result}},e.prototype.sendFunds=function(e){var t,n=this;this.showLoadingSpinner=!0;try{t=this.RecoveryService.createRawTx(e,this.scanResults,this.wallet,this.fee)}catch(e){return this.showMessage(e.message,3)}this.RecoveryService.txBroadcast(t,this.network).then(function(t){t.subscribe(function(t){n.showMessage((n.scanResults.balance-n.fee).toFixed(8)+" BTC sent to address: "+e,2),console.log("Transaction complete. "+(n.scanResults.balance-n.fee)+" BTC sent to address: "+e)})}).catch(function(e){n.showMessage("Could not broadcast transaction. Please, try later.",3)})},e.prototype.hideMessage=function(){this.statusMessage=null,this.successMessage=null,this.errorMessage=null},e.prototype.showMessage=function(e,t){1==t?(this.statusMessage=e,this.successMessage=null,this.errorMessage=null):2==t?(this.successMessage=e,this.statusMessage=null,this.errorMessage=null,this.showLoadingSpinner=!1):3==t&&(this.errorMessage=e,this.statusMessage=null,this.successMessage=null,this.showLoadingSpinner=!1)},e}();c=o([n.i(s._5)({selector:"app-root",template:n("efyd"),styles:[n("W675")],providers:[r.a]}),i("design:paramtypes",["function"==typeof(d=void 0!==r.a&&r.a)&&d||Object])],c);var d}},[3]);