(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{pjpW:function(e,t,i){"use strict";i.r(t),i.d(t,"ClientsModule",function(){return J});var l=i("PCNd"),n=i("ofXK"),o=i("AytR"),a=i("3Pt+"),r=i("fXoL"),c=i("tk/3");let s=(()=>{class e{constructor(e,t){this.http=e,this.fb=t,this.url=o.a.baseUrlDefault,this.baseUrl=o.a.baseUrlDefault,this.form=this.fb.group({id:["",a.x.required],nom:["",a.x.required],prenom:["",a.x.required],type_client:["",a.x.required],adresse:["",a.x.required],nif:[""],telephone:["",a.x.required],email:["",a.x.required],foto:["",a.x.required],etat:["",a.x.required],date_creation:["",a.x.required],date_modification:["",a.x.required]})}ajouterClient(e){return this.http.post(`${this.url}/client/add`,e)}getAllClients(){return this.http.get(this.url+"/client/all")}clientsListe(){return this.http.get(this.url+"/client/all")}getTotalClients(){return this.http.get(this.url+"/client/count-clients")}sevaFiles(e){return this.http.post(`${this.url}/file/upload`,e,{reportProgress:!0,observe:"events"})}readFiles(e){return this.http.get(`${this.url}/file/download/${e}`,{reportProgress:!0,observe:"events",responseType:"blob"})}clientModifier(e){return this.http.put(this.baseUrl+"/client/client-update/"+e.id,e)}deleteClient(e){return this.http.delete(this.baseUrl+"/client/client-delete/"+e.id)}inicializerFormGroup(){this.form.setValue({id:"",nom:"",prenom:"",type_client:"",adresse:"",nif:"",telephone:"",email:"",foto:"",etat:"",date_creation:"",date_modification:""})}}return e.\u0275fac=function(t){return new(t||e)(r.dc(c.c),r.dc(a.f))},e.\u0275prov=r.Pb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var d=i("+0xr"),b=i("M9IT"),m=i("Dh3D"),u=i("P8pP"),h=i("0IaG"),p=i("kmnG"),f=i("qFsG"),g=i("d3UM"),C=i("FKr1"),Z=i("bTqV"),Y=i("NFeN");let x=(()=>{class e{constructor(e,t,i,l){this.fb=e,this.clientService=t,this.dialogRefUpdate=i,this.notif=l,this.fileAttr="Choose File",this.dataLoading=!0,this.filenames=[],this.fileStatus={status:"",requestType:"",percent:0}}ngOnInit(){this.clientFormAddNew=this.fb.group({nom:[""],prenom:[""],type_client:[""],adresse:[""],nif:[""],telephone:[""],email:[""],foto:[""],etat:[""],data_creation:[""],data_modification:[""]}),this.dossierFormAddNew=this.fb.group({id_client:[""],nom_contrat:[""],lieu_execution_contrat:[""],data_signature:[""],duree_contrat:[""],date_fin_contrat:[""],type_contrat:[""],sout_typologie_contrat:[""],reference_contrat:[""],priece_jointe:[""],date_alerte:[""],emails_alerter:[""],nom_document:[""],objet__document:[""],date_notification:[""],statut:[""]})}loadClients(){this.clientService.clientsListe().subscribe(e=>this.handlerClients(e),e=>this.handlerClientsError(e))}handlerClients(e){console.log(e),this.dataLoading=!1,this.dataSource=new d.o(e),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}handlerClientsError(e){console.error(e)}ajouteClient(){this.clientService.ajouterClient(this.clientFormAddNew.value).subscribe(e=>{console.log("New User : "+e.message),this.notif.showSuccess("Utilisateur ajoute avec succes !!"),this.onClose(),this.loadClients()},e=>{console.log("DDDDDDDDDDDDDDDD : "+JSON.stringify(e)),this.notif.showError(JSON.stringify(e.message))}),this.loadClients()}onClose(){this.dialogRefUpdate.close()}uploadFiles(e){const t=new FormData;if(0!==e.length){for(const i of e)t.append("file",i,i.name);this.clientService.sevaFiles(t).subscribe(e=>{console.log(e),this.reportProgress(e)})}}downloadFile(e){this.clientService.readFiles(e).subscribe(e=>{console.log(e),this.reportProgress(e)},e=>{console.log(e)})}reportProgress(e){switch(e.type){case c.f.UploadProgress:this.updateStatus(e.loaded,e.total,"Uploading");break;case c.f.DownloadProgress:this.updateStatus(e.loaded,e.total,"Downlaoding");break;case c.f.ResponseHeader:console.log("Header returned",e);break;case c.f.Response:if(e.body instanceof Array)for(const t of e.body)this.filenames.unshift(t);else console.log("Download the file...");break;default:console.log(e)}}updateStatus(e,t,i){this.fileStatus.status="progress",this.fileStatus.requestType=i,this.fileStatus.percent=Math.round(100*e/t)}}return e.\u0275fac=function(t){return new(t||e)(r.Tb(a.f),r.Tb(s),r.Tb(h.h),r.Tb(u.a))},e.\u0275cmp=r.Nb({type:e,selectors:[["app-add-client"]],viewQuery:function(e,t){if(1&e&&(r.Wc(b.a,3),r.Wc(m.a,3)),2&e){let e;r.Dc(e=r.ic())&&(t.paginator=e.first),r.Dc(e=r.ic())&&(t.sort=e.first)}},decls:42,vars:2,consts:[[1,"per-form",3,"formGroup"],["appearance","fill",1,"width-75",2,"margin-left","5px","width","32%"],["formControlName","nom","matInput","","placeholder","Entrer le nom du client","maxlength","50","name","nom"],["formControlName","prenom","matInput","","placeholder","Entrer le prenom du client","maxlength","50","name","prenom"],["type","nif","mask","","formControlName","nif","matInput","","placeholder","Entrer le NIF du client","maxlength","50","name","nif"],["formControlName","adresse","matInput","","placeholder","Entrer l'adresse du client","maxlength","50","name","adresse"],["type","telephone","mask","","formControlName","telephone","matInput","","placeholder","Entrer le telephone du client","maxlength","50","name","telephone"],["formControlName","email","matInput","","placeholder","Entrer l'email du client","maxlength","50","name","email"],["formControlName","etat","panelClass","my-select-panel-class","name","etat"],["value","true"],["value","false"],[2,"margin-bottom","10px","margin-top","5px","float","right"],["mat-raised-button","",3,"disabled","click"]],template:function(e,t){1&e&&(r.Zb(0,"h2"),r.Sc(1,"Informations du client"),r.Yb(),r.Zb(2,"form",0),r.Zb(3,"mat-form-field",1),r.Zb(4,"mat-label"),r.Sc(5,"Nom du client"),r.Yb(),r.Ub(6,"input",2),r.Yb(),r.Zb(7,"mat-form-field",1),r.Zb(8,"mat-label"),r.Sc(9,"Prenom du client"),r.Yb(),r.Ub(10,"input",3),r.Yb(),r.Zb(11,"mat-form-field",1),r.Zb(12,"mat-label"),r.Sc(13,"NIF du client"),r.Yb(),r.Ub(14,"input",4),r.Yb(),r.Ub(15,"br"),r.Zb(16,"mat-form-field",1),r.Zb(17,"mat-label"),r.Sc(18,"Adresse du client"),r.Yb(),r.Ub(19,"input",5),r.Yb(),r.Zb(20,"mat-form-field",1),r.Zb(21,"mat-label"),r.Sc(22,"Telephone du client"),r.Yb(),r.Ub(23,"input",6),r.Yb(),r.Zb(24,"mat-form-field",1),r.Zb(25,"mat-label"),r.Sc(26,"Email du client"),r.Yb(),r.Ub(27,"input",7),r.Yb(),r.Ub(28,"br"),r.Zb(29,"mat-form-field",1),r.Zb(30,"mat-label"),r.Sc(31,"Selectionner l'etat"),r.Yb(),r.Zb(32,"mat-select",8),r.Zb(33,"mat-option",9),r.Sc(34,"Activer"),r.Yb(),r.Zb(35,"mat-option",10),r.Sc(36,"Desactvier"),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.Zb(37,"div",11),r.Zb(38,"button",12),r.hc("click",function(){return t.ajouteClient()}),r.Zb(39,"mat-icon"),r.Sc(40,"add_circle_outline"),r.Yb(),r.Sc(41," Enregistrer le donnees "),r.Yb(),r.Yb()),2&e&&(r.Gb(2),r.uc("formGroup",t.clientFormAddNew),r.Gb(36),r.uc("disabled",t.clientFormAddNew.invalid))},directives:[a.y,a.r,a.k,p.c,p.g,a.d,f.b,a.q,a.i,a.m,g.a,C.o,Z.b,Y.a],styles:[".st-mod[_ngcontent-%COMP%]{margin:10px;width:100%!important}.screen[_ngcontent-%COMP%]{margin:2px;width:100%;height:35px;background-color:#f06d06;color:#fff;border-radius:15px;border:1px solid #000}.backSeats[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin:10px;padding:10px;color:#fff;border:4px solid #000;background-color:#4caf50}.leftFloat[_ngcontent-%COMP%]{float:left;text-align:left;left:0}.rightFloat[_ngcontent-%COMP%]{float:right;text-align:right;right:0}#uploadFile[_ngcontent-%COMP%]{top:0;left:0;width:100%;z-index:9;opacity:0;height:100%;cursor:pointer;position:absolute}.pointer[_ngcontent-%COMP%]{cursor:pointer;text-align:center;margin-top:5px;margin-left:5px;vertical-align:middle}.file-name[_ngcontent-%COMP%], .file-select-button[_ngcontent-%COMP%]{display:inline-block;margin:8px}.matero-content[_ngcontent-%COMP%]{padding:5px}"]}),e})();var S=i("tyNb"),v=i("O7m7"),w=i("F20z");let y=(()=>{class e{constructor(e,t,i,l,n,o){this.fb=e,this.notifService=t,this.dialogRefUpdate=i,this.profil=l,this.clientService=n,this.client=o}ngOnInit(){this.allProfiles(),this.clientFormDetail=this.fb.group({id:[this.client.id,a.x.required],nom:[this.client.nom,a.x.required],prenom:[this.client.prenom,a.x.required],type_client:[this.client.type_client,a.x.required],adresse:[this.client.adresse,a.x.required],nif:[this.client.nif,a.x.required],telephone:[this.client.telephone],email:[this.client.email,a.x.required],foto:[this.client.foto,a.x.required],etat:[this.client.etat,a.x.required]})}allProfiles(){return this.profil.listProfiles().subscribe(e=>{this.roles=e})}onClose(){this.clientFormDetail.reset(),this.dialogRefUpdate.close()}}return e.\u0275fac=function(t){return new(t||e)(r.Tb(a.f),r.Tb(v.a),r.Tb(h.h),r.Tb(w.a),r.Tb(s),r.Tb(h.a))},e.\u0275cmp=r.Nb({type:e,selectors:[["app-detail-client"]],decls:43,vars:1,consts:[["mat-dialog-title",""],[1,"per-form",3,"formGroup"],["appearance","fill",1,"width-75",2,"margin-left","5px","width","49%"],["formControlName","nom","matInput","","placeholder","Entrer le nom du client","maxlength","50","name","nom","readonly",""],["formControlName","prenom","matInput","","placeholder","Entrer le prenom du client","maxlength","50","name","prenom","readonly",""],["formControlName","type_client","matInput","","maxlength","50","name","type_client","readonly",""],["type","tel","mask","","formControlName","adresse","matInput","","placeholder","Entrer l'adresse' du client","maxlength","50","name","adresse","readonly",""],["type","tel","mask","","formControlName","nif","matInput","","placeholder","Entrer le NIF du client","maxlength","50","name","nif","readonly",""],["type","tel","mask","","formControlName","telephone","matInput","","placeholder","Entrer le telephone du client","maxlength","50","name","telephone","readonly",""],["type","email","mask","","formControlName","email","matInput","","placeholder","Entrer l'email' du client","maxlength","50","name","email","readonly",""],["type","etat","mask","","formControlName","etat","matInput","","maxlength","50","name","etat","readonly",""],["mat-button","","mat-dialog-close","",3,"click"]],template:function(e,t){1&e&&(r.Zb(0,"h2",0),r.Sc(1,"D\xe9tails du Client"),r.Yb(),r.Zb(2,"mat-dialog-content"),r.Zb(3,"form",1),r.Zb(4,"mat-form-field",2),r.Zb(5,"mat-label"),r.Sc(6,"Nom du client"),r.Yb(),r.Ub(7,"input",3),r.Yb(),r.Zb(8,"mat-form-field",2),r.Zb(9,"mat-label"),r.Sc(10,"Prenom du client"),r.Yb(),r.Ub(11,"input",4),r.Yb(),r.Ub(12,"br"),r.Zb(13,"mat-form-field",2),r.Zb(14,"mat-label"),r.Sc(15,"Type du client"),r.Yb(),r.Ub(16,"input",5),r.Yb(),r.Zb(17,"mat-form-field",2),r.Zb(18,"mat-label"),r.Sc(19,"L'adresse du client"),r.Yb(),r.Ub(20,"input",6),r.Yb(),r.Ub(21,"br"),r.Zb(22,"mat-form-field",2),r.Zb(23,"mat-label"),r.Sc(24,"Le NIF du client"),r.Yb(),r.Ub(25,"input",7),r.Yb(),r.Zb(26,"mat-form-field",2),r.Zb(27,"mat-label"),r.Sc(28,"Le telephone du client"),r.Yb(),r.Ub(29,"input",8),r.Yb(),r.Ub(30,"br"),r.Zb(31,"mat-form-field",2),r.Zb(32,"mat-label"),r.Sc(33,"L'email du client"),r.Yb(),r.Ub(34,"input",9),r.Yb(),r.Zb(35,"mat-form-field",2),r.Zb(36,"mat-label"),r.Sc(37,"Etat du client"),r.Yb(),r.Ub(38,"input",10),r.Yb(),r.Ub(39,"br"),r.Yb(),r.Zb(40,"mat-dialog-actions"),r.Zb(41,"button",11),r.hc("click",function(){return t.onClose()}),r.Sc(42,"Fermer"),r.Yb(),r.Yb(),r.Yb()),2&e&&(r.Gb(3),r.uc("formGroup",t.clientFormDetail))},directives:[h.i,h.f,a.y,a.r,a.k,p.c,p.g,a.d,f.b,a.q,a.i,a.m,h.c,Z.b,h.d],styles:[""]}),e})();var U=i("2zjr");let k=(()=>{class e{constructor(e,t,i,l,n,o,a){this.fb=e,this.notifService=t,this.dialogRefUpdate=i,this.profil=l,this.clientService=n,this.client=o,this.notif=a}ngOnInit(){this.allProfiles(),this.clientFormUpdate=this.fb.group({id:[this.client.id,a.x.required],nom:[this.client.nom,a.x.required],prenom:[this.client.prenom,a.x.required],type_client:[this.client.type_client,a.x.required],adresse:[this.client.adresse,a.x.required],nif:[this.client.nif,a.x.required],telephone:[this.client.telephone],email:[this.client.email,a.x.required],foto:[this.client.foto,a.x.required],etat:[this.client.etat,a.x.required]})}modifierClient(){this.clientService.clientModifier(this.clientFormUpdate.value).subscribe(e=>{null!==e&&(this.notif.showSuccess("Modification effectu\xe9 avec succ\xe8s!!!"),console.log("Modification effectu\xe9 avec succ\xe8s!!!"))}),this.onClose()}allProfiles(){return this.profil.listProfiles().subscribe(e=>{this.roles=e})}onClose(){this.clientFormUpdate.reset(),this.dialogRefUpdate.close()}}return e.\u0275fac=function(t){return new(t||e)(r.Tb(a.f),r.Tb(v.a),r.Tb(h.h),r.Tb(w.a),r.Tb(U.a),r.Tb(h.a),r.Tb(u.a))},e.\u0275cmp=r.Nb({type:e,selectors:[["app-update-client"]],decls:46,vars:1,consts:[["mat-dialog-title",""],[1,"per-form",3,"formGroup"],["appearance","fill",1,"width-75",2,"margin-left","5px","width","49%"],["formControlName","nom","matInput","","placeholder","Entrer le nom du client","maxlength","50","name","nom"],["formControlName","prenom","matInput","","placeholder","Entrer le prenom du client","maxlength","50","name","prenom"],["type","tel","mask","","formControlName","adresse","matInput","","placeholder","Entrer l'adresse' du client","maxlength","50","name","adresse"],["type","tel","mask","","formControlName","nif","matInput","","placeholder","Entrer le NIF du client","maxlength","50","name","nif"],["type","tel","mask","","formControlName","telephone","matInput","","placeholder","Entrer le telephone du client","maxlength","50","name","telephone"],["type","email","mask","","formControlName","email","matInput","","placeholder","Entrer l'email' du client","maxlength","50","name","email"],["formControlName","etat","panelClass","my-select-panel-class"],["value","true"],["value","false"],["mat-button","","mat-dialog-close","",3,"click"],["mat-button","","color","primary",3,"click"]],template:function(e,t){1&e&&(r.Zb(0,"h2",0),r.Sc(1,"Modifier ce Client"),r.Yb(),r.Zb(2,"mat-dialog-content"),r.Zb(3,"form",1),r.Zb(4,"mat-form-field",2),r.Zb(5,"mat-label"),r.Sc(6,"Nom du client"),r.Yb(),r.Ub(7,"input",3),r.Yb(),r.Zb(8,"mat-form-field",2),r.Zb(9,"mat-label"),r.Sc(10,"Prenom du client"),r.Yb(),r.Ub(11,"input",4),r.Yb(),r.Ub(12,"br"),r.Zb(13,"mat-form-field",2),r.Zb(14,"mat-label"),r.Sc(15,"L'adresse du client"),r.Yb(),r.Ub(16,"input",5),r.Yb(),r.Zb(17,"mat-form-field",2),r.Zb(18,"mat-label"),r.Sc(19,"Le NIF du client"),r.Yb(),r.Ub(20,"input",6),r.Yb(),r.Ub(21,"br"),r.Zb(22,"mat-form-field",2),r.Zb(23,"mat-label"),r.Sc(24,"Le telephone du client"),r.Yb(),r.Ub(25,"input",7),r.Yb(),r.Zb(26,"mat-form-field",2),r.Zb(27,"mat-label"),r.Sc(28,"Le telephone du client"),r.Yb(),r.Ub(29,"input",8),r.Yb(),r.Ub(30,"br"),r.Zb(31,"mat-form-field",2),r.Zb(32,"mat-label"),r.Sc(33,"Selectionner l'etat du client"),r.Yb(),r.Zb(34,"mat-select",9),r.Zb(35,"mat-option",10),r.Sc(36,"Activer"),r.Yb(),r.Zb(37,"mat-option",11),r.Sc(38,"Desactiver"),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.Zb(39,"mat-dialog-actions"),r.Zb(40,"button",12),r.hc("click",function(){return t.onClose()}),r.Sc(41,"Annuler"),r.Yb(),r.Zb(42,"button",13),r.hc("click",function(){return t.modifierClient()}),r.Zb(43,"mat-icon"),r.Sc(44,"how_to_reg"),r.Yb(),r.Sc(45," Update "),r.Yb(),r.Yb(),r.Yb()),2&e&&(r.Gb(3),r.uc("formGroup",t.clientFormUpdate))},directives:[h.i,h.f,a.y,a.r,a.k,p.c,p.g,a.d,f.b,a.q,a.i,a.m,g.a,C.o,h.c,Z.b,h.d,Y.a],styles:[""]}),e})();var D=i("EUZL"),_=i("ibTr"),N=i("tgey"),F=i("Wp6s"),M=i("XiUz");function I(e,t){1&e&&(r.Zb(0,"th",39),r.Sc(1,"Nom"),r.Yb())}function T(e,t){if(1&e&&(r.Zb(0,"td",40),r.Sc(1),r.Yb()),2&e){const e=t.$implicit;r.Gb(1),r.Uc(" ",e.nom,"")}}function q(e,t){1&e&&(r.Zb(0,"th",39),r.Sc(1,"Prenom"),r.Yb())}function E(e,t){if(1&e&&(r.Zb(0,"td",41),r.Sc(1),r.Yb()),2&e){const e=t.$implicit;r.Gb(1),r.Tc(e.prenom)}}function z(e,t){1&e&&(r.Zb(0,"th",39),r.Sc(1,"Adresse"),r.Yb())}function P(e,t){if(1&e&&(r.Zb(0,"td",42),r.Sc(1),r.Yb()),2&e){const e=t.$implicit;r.Gb(1),r.Uc("",e.adresse," ")}}function G(e,t){1&e&&(r.Zb(0,"th",39),r.Sc(1,"NIF "),r.Yb())}function L(e,t){if(1&e&&(r.Zb(0,"td",43),r.Sc(1),r.Yb()),2&e){const e=t.$implicit;r.Gb(1),r.Tc(e.nif)}}function A(e,t){1&e&&(r.Zb(0,"th",39),r.Sc(1,"Email"),r.Yb())}function O(e,t){if(1&e&&(r.Zb(0,"td",44),r.Sc(1),r.Yb()),2&e){const e=t.$implicit;r.Gb(1),r.Tc(e.email)}}function R(e,t){1&e&&(r.Zb(0,"th",45),r.Sc(1,"Action"),r.Yb())}function Q(e,t){if(1&e){const e=r.ac();r.Zb(0,"th",46),r.Zb(1,"button",47),r.hc("click",function(){r.Hc(e);const i=t.$implicit;return r.lc().updateHoldClient(i)}),r.Zb(2,"mat-icon"),r.Sc(3,"create"),r.Yb(),r.Yb(),r.Zb(4,"button",47),r.hc("click",function(){r.Hc(e);const i=t.$implicit;return r.lc().deleteClient(i)}),r.Zb(5,"mat-icon"),r.Sc(6,"delete"),r.Yb(),r.Yb(),r.Zb(7,"button",47),r.hc("click",function(){r.Hc(e);const i=t.$implicit;return r.lc().detailClient(i)}),r.kc(),r.Zb(8,"svg",48),r.Zb(9,"g",49),r.Zb(10,"g",12),r.Ub(11,"path",50),r.Ub(12,"path",51),r.Zb(13,"g",52),r.Ub(14,"path",53),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.Yb()}}function j(e,t){1&e&&r.Ub(0,"tr",54)}function X(e,t){1&e&&r.Ub(0,"tr",55)}const W=function(){return[5,10,20,35,100]},$=[{path:"client",component:(()=>{class e{constructor(e,t,i){this.clientService=e,this.dialog=t,this.excelService=i,this.displayedColumns=["nom","prenom","adresse","nif","email","action"],this.dataLoading=!0,this.title="angular-app",this.fileName="ListClients.xlsx",this.doFilter=e=>{this.dataSource.filter=e.trim().toLocaleLowerCase(),console.log("this.dataSource.data :::::::::",this.dataSource.data),console.log("this.dataSource.filteredData :::::::::",this.dataSource.filteredData),this.dataClient=this.dataSource.filteredData}}ngOnInit(){this.loadClients()}exportAsXLSX(){console.log("Data :",this.dataClient),this.excelService.exportAsExcel(this.dataClient,"client_data")}loadClients(){return this.clientService.getAllClients().subscribe(e=>{this.handlerClient(e)},e=>this.handlerClientError(e))}loadTotalClients(){return this.clientService.getTotalClients()}handlerClientLoad(e){this.dataLoading=!1,this.dataSource=new d.o(e)}handlerClientError(e){console.log("Error : "+e)}handlerClient(e){console.log(e),this.dataClient=e,this.dataLoading=!1,this.dataSource=new d.o(e),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}createNewClient(){console.log(this.loadTotalClients()),this.clientService.inicializerFormGroup();const e=new h.e;e.disableClose=!1,e.autoFocus=!0,e.width="650px",this.dialog.open(x,e).afterClosed().subscribe(()=>{this.loadClients()})}updateHoldClient(e){this.clientService.inicializerFormGroup(),this.dialog.open(k,{width:"650px",data:e,disableClose:!1,autoFocus:!0}).afterClosed().subscribe(e=>{this.loadClients()})}detailClient(e){this.clientService.inicializerFormGroup(),this.dialog.open(y,{width:"650px",data:e,disableClose:!1,autoFocus:!0}).afterClosed().subscribe(e=>{})}deleteClient(e){confirm("Vous etes sur de vouloir supprimer ce client ?")&&(this.clientService.deleteClient(e).subscribe(e=>{console.log(e),this.loadClients()},e=>{console.log(e)}),console.log("Client supprime!"))}exportExcel(){let e=document.getElementById("excel-table");const t=D.utils.table_to_sheet(e),i=D.utils.book_new();D.utils.book_append_sheet(i,t,"Sheet1"),D.writeFile(i,this.fileName)}}return e.\u0275fac=function(t){return new(t||e)(r.Tb(s),r.Tb(h.b),r.Tb(_.a))},e.\u0275cmp=r.Nb({type:e,selectors:[["app-client"]],viewQuery:function(e,t){if(1&e&&(r.Wc(b.a,3),r.Wc(m.a,3)),2&e){let e;r.Dc(e=r.ic())&&(t.paginator=e.first),r.Dc(e=r.ic())&&(t.sort=e.first)}},decls:63,vars:7,consts:[[1,"route-content"],[1,"dshcard",2,"background-color","rgb(250, 143, 82)"],[1,"srn-dhb",2,"background-color","rgb(250, 143, 82)"],[2,"margin-bottom","10px"],[2,"margin-bottom","10px","margin-top","5px"],["mat-raised-button","",3,"click"],["fxLayout","","fxLayoutAlign","center center"],["fxFlex","50%"],["matInput","","type","text","placeholder","Rechercher",3,"keyup"],["fxLayoutAlign","end start"],["mat-icon-button","","id","btnXlsRpt",3,"click"],["xmlns","http://www.w3.org/2000/svg","x","0px","y","0px","width","28","height","30","viewBox","0 0 172 172",2,"fill","#000000"],["fill","none","fill-rule","nonzero","stroke","none","stroke-width","1","stroke-linecap","butt","stroke-linejoin","miter","stroke-miterlimit","10","stroke-dasharray","","stroke-dashoffset","0","font-family","none","font-weight","none","font-size","none","text-anchor","none",2,"mix-blend-mode","normal"],["d","M0,172v-172h172v172z","fill","#ffffff"],["d","M143.33333,161.25h-114.66667v-150.5h78.83333l35.83333,35.83333z","fill","#0c7238"],["d","M137.95833,50.16667h-34.04167v-34.04167z","fill","#dcedc8"],["d","M143.33333,161.25v-57.33333h-17.91667v25.08333h-17.91667v9.675l18.06,22.575z","fill","#43a047"],["d","M172,136.16667h-57.33333l28.66667,35.83333z","fill","#455a64"],["d","M132.58333,111.08333h21.5v43h-21.5z","fill","#455a64"],["d","M61.95942,60.91667h13.68117l11.10117,21.5215l11.72825,-21.5215h12.77817l-17.6085,28.66667l18.00983,28.66667h-13.4805l-12.09733,-22.532l-12.04358,22.532h-13.68117l18.30725,-28.77058z","fill","#ffffff"],[1,"example-container","mat-elevation-z8"],["mat-table","","matSort","","id","excel-table",3,"dataSource"],["matColumnDef","nom"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","","style","width: 10%;",4,"matCellDef"],["matColumnDef","prenom"],["mat-cell","","style","width: 12%;",4,"matCellDef"],["matColumnDef","adresse"],["mat-cell","","style","width: 14%;",4,"matCellDef"],["matColumnDef","nif"],["mat-cell","","style","width: 7%;",4,"matCellDef"],["matColumnDef","email"],["mat-cell","","style","width: 20%;",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","action-link","style","width: 5%;",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell","",2,"width","10%"],["mat-cell","",2,"width","12%"],["mat-cell","",2,"width","14%"],["mat-cell","",2,"width","7%"],["mat-cell","",2,"width","20%"],["mat-header-cell",""],["mat-cell","",1,"action-link",2,"width","5%"],["mat-icon-button","",3,"click"],["xmlns","http://www.w3.org/2000/svg","x","0px","y","0px","width","24","height","24","viewBox","0 0 172 172",2,"fill","#000000"],["transform",""],["d","M0,172v-172h172v172z","fill","none"],["d","M86,157.38c-39.42209,0 -71.38,-31.95791 -71.38,-71.38v0c0,-39.42209 31.95791,-71.38 71.38,-71.38h0c39.42209,0 71.38,31.95791 71.38,71.38v0c0,39.42209 -31.95791,71.38 -71.38,71.38z"],["fill","#000000"],["d","M43.41521,42.11374c-3.52018,0 -6.45386,2.93368 -6.45386,6.45386v12.90772c0,3.52018 2.93368,6.45386 6.45386,6.45386h12.90772c3.52018,0 6.45386,-2.93368 6.45386,-6.45386v-12.90772c0,-3.52018 -2.93368,-6.45386 -6.45386,-6.45386zM44.70598,49.85837h10.32618v10.32618h-10.32618zM74.39375,52.43992c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018zM110.53538,52.43992c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018zM43.41521,73.09228c-3.52018,0 -6.45386,2.93368 -6.45386,6.45386v12.90772c0,3.52018 2.93368,6.45386 6.45386,6.45386h12.90772c3.52018,0 6.45386,-2.93368 6.45386,-6.45386v-12.90772c0,-3.52018 -2.93368,-6.45386 -6.45386,-6.45386zM44.70598,80.83691h10.32618v10.32618h-10.32618zM74.39375,83.41846c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018zM110.53538,83.41846c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018zM43.41521,104.07081c-3.52018,0 -6.45386,2.93368 -6.45386,6.45386v12.90772c0,3.52018 2.93368,6.45386 6.45386,6.45386h12.90772c3.52018,0 6.45386,-2.93368 6.45386,-6.45386v-12.90772c0,-3.52018 -2.93368,-6.45386 -6.45386,-6.45386zM44.70598,111.81545h10.32618v10.32618h-10.32618zM74.39375,114.39699c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018zM110.53538,114.39699c-1.3965,-0.01975 -2.69545,0.71396 -3.39946,1.92018c-0.70401,1.20622 -0.70401,2.69806 0,3.90428c0.70401,1.20622 2.00296,1.93993 3.39946,1.92018h20.65236c1.3965,0.01975 2.69545,-0.71396 3.39946,-1.92018c0.70401,-1.20622 0.70401,-2.69806 0,-3.90428c-0.70401,-1.20622 -2.00296,-1.93993 -3.39946,-1.92018z"],["mat-header-row",""],["mat-row",""]],template:function(e,t){1&e&&(r.Ub(0,"page-header"),r.Zb(1,"div",0),r.Zb(2,"mat-card",1),r.Zb(3,"div",2),r.Sc(4," GESTION DES PARTENAIRES "),r.Yb(),r.Yb(),r.Ub(5,"div",3),r.Zb(6,"div"),r.Zb(7,"div",4),r.Zb(8,"button",5),r.hc("click",function(){return t.createNewClient()}),r.Zb(9,"mat-icon"),r.Sc(10,"add_circle_outline"),r.Yb(),r.Sc(11," Ajouter un nouvel partenaire "),r.Yb(),r.Yb(),r.Zb(12,"div",6),r.Zb(13,"mat-form-field",7),r.Zb(14,"input",8),r.hc("keyup",function(e){return t.doFilter(e.target.value)}),r.Yb(),r.Yb(),r.Yb(),r.Zb(15,"div",9),r.Zb(16,"button",10),r.hc("click",function(){return t.exportAsXLSX()}),r.kc(),r.Zb(17,"svg",11),r.Zb(18,"g",12),r.Ub(19,"path",13),r.Zb(20,"g"),r.Ub(21,"path",14),r.Ub(22,"path",15),r.Ub(23,"path",16),r.Ub(24,"path",17),r.Ub(25,"path",18),r.Ub(26,"path",19),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.Yb(),r.jc(),r.Zb(27,"div",20),r.Zb(28,"table",21),r.Xb(29,22),r.Zb(30,"tr"),r.Qc(31,I,2,0,"th",23),r.Yb(),r.Zb(32,"tr"),r.Qc(33,T,2,1,"td",24),r.Yb(),r.Wb(),r.Xb(34,25),r.Zb(35,"tr"),r.Qc(36,q,2,0,"th",23),r.Yb(),r.Zb(37,"tr"),r.Qc(38,E,2,1,"td",26),r.Yb(),r.Wb(),r.Xb(39,27),r.Zb(40,"tr"),r.Qc(41,z,2,0,"th",23),r.Yb(),r.Zb(42,"tr"),r.Qc(43,P,2,1,"td",28),r.Yb(),r.Wb(),r.Xb(44,29),r.Zb(45,"tr"),r.Qc(46,G,2,0,"th",23),r.Yb(),r.Zb(47,"tr"),r.Qc(48,L,2,1,"td",30),r.Yb(),r.Wb(),r.Xb(49,31),r.Zb(50,"tr"),r.Qc(51,A,2,0,"th",23),r.Yb(),r.Zb(52,"tr"),r.Qc(53,O,2,1,"td",32),r.Yb(),r.Wb(),r.Xb(54,33),r.Zb(55,"tr"),r.Qc(56,R,2,0,"th",34),r.Yb(),r.Zb(57,"tr"),r.Qc(58,Q,15,0,"th",35),r.Yb(),r.Wb(),r.Qc(59,j,1,0,"tr",36),r.Qc(60,X,1,0,"tr",37),r.Yb(),r.Yb(),r.Ub(61,"mat-paginator",38),r.Ub(62,"br"),r.Yb(),r.Yb()),2&e&&(r.Gb(6),r.Nc("visibility",t.dataLoading?"hidden":"visible"),r.Gb(22),r.uc("dataSource",t.dataSource),r.Gb(31),r.uc("matHeaderRowDef",t.displayedColumns),r.Gb(1),r.uc("matRowDefColumns",t.displayedColumns),r.Gb(1),r.uc("pageSizeOptions",r.wc(6,W)))},directives:[N.a,F.a,Z.b,Y.a,M.c,M.b,p.c,M.a,f.b,d.n,m.a,d.c,d.i,d.b,d.k,d.m,b.a,d.h,m.b,d.a,d.j,d.l],encapsulation:2}),e})()},{path:"add-client",component:x}];let H=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Rb({type:e}),e.\u0275inj=r.Qb({imports:[[S.i.forChild($)],S.i]}),e})(),J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Rb({type:e}),e.\u0275inj=r.Qb({imports:[[n.c,H,l.a]]}),e})()}}]);