(function(){"use strict";var t={594:function(t,e,a){var r=a(9242),s=a(3396);function n(t,e,a,r,n,o){const i=(0,s.up)("MainHeader"),c=(0,s.up)("MainContent");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(i),(0,s.Wm)(c,{"list-game-filename":a.listGameFilename},null,8,["list-game-filename"])],64)}var o=a(7139);const i={class:"title"},c={class:"title-game-name"},u={class:"title-instruction"};function d(t,e,a,r,n,d){return(0,s.wg)(),(0,s.iD)("header",i,[(0,s._)("div",c,(0,o.zw)(n.titleGameName),1),(0,s._)("div",u,(0,o.zw)(n.titleInstruction),1)])}var l={data(){return{titleGameName:"TH Guess Game",titleInstruction:"Place all cards in the right place on each stage"}}},h=a(89);const m=(0,h.Z)(l,[["render",d],["__scopeId","data-v-1671c8b5"]]);var f=m;const p={class:"main-content"},g={class:"bottom-field"},C=["disabled"],w=["disabled"];function b(t,e,a,r,n,o){const i=(0,s.up)("DataGameInformation"),c=(0,s.up)("GuessTable"),u=(0,s.up)("UnsortedCardsBox");return(0,s.wg)(),(0,s.iD)("div",p,[(0,s.Wm)(i,{"list-game-filename":a.listGameFilename,onUpdateData:o.updateData,ref:"mainTopContent"},null,8,["list-game-filename","onUpdateData"]),(0,s.Wm)(c,{"game-informations":n.gameInformations,ref:"guessTable"},null,8,["game-informations"]),(0,s.Wm)(u,{ref:"unsortedCardsBox"},null,512),(0,s._)("div",g,[(0,s._)("button",{class:"btn btn--secondary btn--large",type:"button",onClick:e[0]||(e[0]=(...t)=>o.actionReset&&o.actionReset(...t))},"Reset"),(0,s._)("button",{class:"btn btn--secondary btn--large",type:"button",disabled:o.disableButton,onClick:e[1]||(e[1]=(...t)=>o.actionQuickFill&&o.actionQuickFill(...t))},"Quick fill",8,C),(0,s._)("button",{class:"btn btn--primary btn--large",type:"button",disabled:o.disableButton,onClick:e[2]||(e[2]=(...t)=>o.actionSubmit&&o.actionSubmit(...t))},"Submit",8,w)])])}const v={class:"main-top-container"},y={class:"main-top-container--left"},S={class:"main-top-container--right"};function D(t,e,a,r,n,o){const i=(0,s.up)("LoadDataGame"),c=(0,s.up)("GameStatus");return(0,s.wg)(),(0,s.iD)("div",v,[(0,s._)("div",y,[(0,s.Wm)(i,{"list-game-filename":a.listGameFilename,onUpdateData:o.updateData,ref:"loadGameData"},null,8,["list-game-filename","onUpdateData"])]),(0,s._)("div",S,[(0,s.Wm)(c,{ref:"gameStatus"},null,512)])])}const I=t=>((0,s.dD)("data-v-2cad8906"),t=t(),(0,s.Cn)(),t),_={class:"select-game"},N=I((()=>(0,s._)("label",{class:"select-game--label",for:"load-game-informations"},"Select a game ",-1))),R=["value"];function k(t,e,a,n,i,c){return(0,s.wg)(),(0,s.iD)("div",_,[N,(0,s.wy)((0,s._)("select",{class:"select-game--select",id:"load-game-informations",name:"game-infos","onUpdate:modelValue":e[0]||(e[0]=t=>i.selectedGameInfos=t)},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.listGameFilename,((t,e)=>((0,s.wg)(),(0,s.iD)("option",{value:t},(0,o.zw)(t.name),9,R)))),256))],512),[[r.bM,i.selectedGameInfos]]),(0,s._)("button",{class:"btn btn--primary btn--load",type:"button",onClick:e[1]||(e[1]=(...t)=>c.load&&c.load(...t))},"Load")])}var A=a(5449),$=a.n(A);function O(t){return fetch(t).then((e=>{if(e.ok)return e.text();throw new Error(`file not found: ${t}`)})).then((t=>$().parse(t)))}function V(){return O("game-informations/list-th-game.yaml")}function G(t){return O(`game-informations/${t}`)}var M={emits:["updateData"],props:{listGameFilename:{type:Array,required:!0}},data(){return{selectedGameInfos:this.listGameFilename[0]}},methods:{load(){const{filename:t,name:e}=this.selectedGameInfos;G(t).then((t=>{this.$emit("updateData",e,t)}))}}};const T=(0,h.Z)(M,[["render",k],["__scopeId","data-v-2cad8906"]]);var L=T;const E={class:"game-status-container"},x={class:"correct-cards"},q={class:"correct-cards--label"},z={class:"correct-cards--value"},j={class:"try-count"},F={class:"try-count--label"},Y={class:"try-count--value"};function U(t,e,a,r,n,i){return(0,s.wg)(),(0,s.iD)("div",E,[(0,s._)("div",x,[(0,s._)("span",q,(0,o.zw)(i.correctCardsLabel)+":",1),(0,s._)("span",z,(0,o.zw)(n.correctCards)+" / "+(0,o.zw)(n.totalCards),1)]),(0,s._)("div",j,[(0,s._)("span",F,(0,o.zw)(i.tryCountLabel)+":",1),(0,s._)("span",Y,(0,o.zw)(n.tryCount),1)])])}var B={data(){return{correctCards:0,totalCards:0,tryCount:0}},computed:{correctCardsLabel(){return this.correctCards>1?"Correct cards":"Correct card"},tryCountLabel(){return this.tryCount>1?"Tries":"Try"}},methods:{reset(){this.tryCount=0},setCorrectCards(t){this.correctCards=t},initTotalCards(t){this.correctCards=0,this.totalCards=t},incrementTryCount(){this.tryCount++}}};const H=(0,h.Z)(B,[["render",U],["__scopeId","data-v-5a9417ee"]]);var Z=H,P={emits:["updateData"],components:{LoadDataGame:L,GameStatus:Z},props:{listGameFilename:{type:Array,required:!0}},data(){return{selectedGameInfos:this.listGameFilename[0]}},methods:{async initialLoad(){await this.$refs.loadGameData.load()},updateData(t,e){this.$emit("updateData",t,e)},reset(){this.$refs.gameStatus.reset()},setCorrectCards(t){this.$refs.gameStatus.setCorrectCards(t)},initTotalCards(t){this.$refs.gameStatus.initTotalCards(t)},incrementTryCount(){this.$refs.gameStatus.incrementTryCount()}}};const K=(0,h.Z)(P,[["render",D],["__scopeId","data-v-5ea0bae4"]]);var W=K;const J=t=>((0,s.dD)("data-v-91098704"),t=t(),(0,s.Cn)(),t),Q={colspan:"6"},X=J((()=>(0,s._)("tr",null,[(0,s._)("th",{width:"85",rowspan:"2"},"Stages"),(0,s._)("th",{colspan:"3"},"Characters"),(0,s._)("th",{colspan:"2"},"Musics")],-1))),tt=J((()=>(0,s._)("tr",null,[(0,s._)("th",{width:"150"},"Names"),(0,s._)("th",{width:"150"},"Species"),(0,s._)("th",{width:"150"},"Abilities"),(0,s._)("th",{width:"180"},"Names"),(0,s._)("th",{width:"80"},"Audios")],-1)));function et(t,e,a,r,n,i){const c=(0,s.up)("GuessStageGroupRow");return a.gameInformations?((0,s.wg)(),(0,s.iD)("table",{key:0,class:(0,o.C_)(["guess-table",i.tableClass])},[(0,s._)("thead",null,[(0,s._)("tr",null,[(0,s._)("th",Q,(0,o.zw)(n.gameNumber),1)]),X,tt]),(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.stagesInformations,(t=>((0,s.wg)(),(0,s.j4)(c,{"stage-informations":t,ref_for:!0,ref:"guessStageGroupRows"},null,8,["stage-informations"])))),256))])],2)):(0,s.kq)("",!0)}function at(t,e,a,r,n,o){const i=(0,s.up)("GuessStageRow");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(i,{type:"stage",name:o.stageData.name,characters:o.stageData.characters,musics:o.stageData.musics,"character-order":o.stageData.characterOrder,"music-order":o.stageData.musicOrder,ref:"stageLevelRows"},null,8,["name","characters","musics","character-order","music-order"]),(0,s.Wm)(i,{type:"boss",name:o.bossStageData.name,characters:o.bossStageData.characters,musics:o.bossStageData.musics,"character-order":o.bossStageData.characterOrder,"music-order":o.bossStageData.musicOrder,ref:"bossStageLevelRows"},null,8,["name","characters","musics","character-order","music-order"])],64)}const rt=["rowspan"],st={key:0},nt={key:1};function ot(t,e,a,r,n,i){const c=(0,s.up)("GuessCharacterRow"),u=(0,s.up)("GuessMusicRow");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("tr",null,[(0,s._)("th",{rowspan:i.stageRowspan},(0,o.zw)(i.stageName),9,rt),i.row1.character?((0,s.wg)(),(0,s.j4)(c,{key:0,character:i.row1.character,"row-size":i.characterRowSize,order:i.orderCharacter1,ref:"characterRow"},null,8,["character","row-size","order"])):((0,s.wg)(),(0,s.j4)(c,{key:1})),(0,s.Wm)(u,{music:i.row1.music,"row-size":i.musicRowSize,order:i.orderMusic1,ref:"musicRow"},null,8,["music","row-size","order"])]),i.hasRow2?((0,s.wg)(),(0,s.iD)("tr",st,[i.characterRowSize?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[i.row2.character?((0,s.wg)(),(0,s.j4)(c,{key:0,character:i.row2.character,order:i.orderCharacter2,ref:"characterRow2"},null,8,["character","order"])):((0,s.wg)(),(0,s.j4)(c,{key:1}))],64)),i.musicRowSize?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[i.row2.music?((0,s.wg)(),(0,s.j4)(u,{key:0,music:i.row2.music,order:i.orderMusic2,ref:"musicRow2"},null,8,["music","order"])):((0,s.wg)(),(0,s.j4)(u,{key:1}))],64))])):(0,s.kq)("",!0),i.hasRow3?((0,s.wg)(),(0,s.iD)("tr",nt,[i.characterRowSize?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[i.row3.character?((0,s.wg)(),(0,s.j4)(c,{key:0,character:i.row3.character,order:i.orderCharacter3,ref:"characterRow3"},null,8,["character","order"])):((0,s.wg)(),(0,s.j4)(c,{key:1}))],64)),i.musicRowSize?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[i.row3.music?((0,s.wg)(),(0,s.j4)(u,{key:0,music:i.row3.music,order:i.orderMusic3,ref:"musicRow3"},null,8,["music","order"])):((0,s.wg)(),(0,s.j4)(u,{key:1}))],64))])):(0,s.kq)("",!0)],64)}function it(t,e,a,r,n,o){const i=(0,s.up)("GuessCell");return(0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.CHARACTERS_INFO_CARD,(({dataName:t})=>((0,s.wg)(),(0,s.j4)(i,{"has-data":o.hasCharacter,"data-name":t,"row-size":a.rowSize,order:a.order,ref_for:!0,ref:t},null,8,["has-data","data-name","row-size","order"])))),256)}const ct=["rowspan"],ut={key:1,class:"no-card"},dt={key:1,class:"empty-cell"};function lt(t,e,a,r,n,i){const c=(0,s.up)("InfoCard");return a.hasData?((0,s.wg)(),(0,s.iD)("td",{key:0,class:(0,o.C_)(i.tableCellClass),rowspan:i.rowspan,onDragover:e[0]||(e[0]=(...t)=>i.handleDragOver&&i.handleDragOver(...t)),onDrop:e[1]||(e[1]=(...t)=>i.handleDrop&&i.handleDrop(...t))},[n.currentInfoCard?((0,s.wg)(),(0,s.j4)(c,{key:0,info:n.currentInfoCard,"initial-container":this},null,8,["info"])):((0,s.wg)(),(0,s.iD)("div",ut,[(0,s._)("span",null,"= "+(0,o.zw)(a.order)+" =",1)]))],42,ct)):((0,s.wg)(),(0,s.iD)("td",dt))}const ht=["draggable"],mt={key:0,class:"info-card--text"},ft={key:2,class:"info-card--text"};function pt(t,e,a,r,n,i){const c=(0,s.up)("AudioPlayer");return(0,s.wg)(),(0,s.iD)("div",{class:"info-card",draggable:i.isDraggable,onDragstart:e[0]||(e[0]=(...t)=>i.handleDragStart&&i.handleDragStart(...t)),onDragend:e[1]||(e[1]=(...t)=>i.handleDragEnd&&i.handleDragEnd(...t))},[i.isText?((0,s.wg)(),(0,s.iD)("div",mt,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.infoText,(t=>((0,s.wg)(),(0,s.iD)("p",null,(0,o.zw)(t),1)))),256))])):i.isAudio?((0,s.wg)(),(0,s.j4)(c,{key:1,"music-url":a.info.value,"card-id":a.info.id},null,8,["music-url","card-id"])):((0,s.wg)(),(0,s.iD)("div",ft,"x"))],40,ht)}let gt=null,Ct=null;function wt(t){gt=t}function bt(t){Ct=t}function vt(t){gt.setDraggedDataName(t)}function yt(t,e,a){Ct.removeInfoCard(t),Ct.setInfoCard(e),a.setInfoCard(t),Ct=null}const St=t=>((0,s.dD)("data-v-837c57fe"),t=t(),(0,s.Cn)(),t),Dt={class:"video-container"},It={key:1,class:"play-button play-button--disabled"},_t=St((()=>(0,s._)("div",{class:"play-button__center-icon"},[(0,s._)("div",{class:"button-icon loading-icon"})],-1))),Nt=[_t],Rt={class:"play-button__center-icon"},kt={class:"play-button__left-icon"},At=St((()=>(0,s._)("div",{class:"button-icon reset-icon"},null,-1))),$t=[At],Ot={class:"card-id"};function Vt(t,e,a,r,n,i){const c=(0,s.up)("Youtube");return(0,s.wg)(),(0,s.iD)("div",Dt,[i.hasActiveVideo?((0,s.wg)(),(0,s.j4)(c,{key:0,src:a.musicUrl,style:(0,o.j5)(i.youtubeStyle),width:"70",height:"50",ref:"youtube",onReady:i.youtubeReady,onStateChange:i.youtubeStateChange},null,8,["src","style","onReady","onStateChange"])):(0,s.kq)("",!0),i.hasDisabledButton?((0,s.wg)(),(0,s.iD)("div",It,Nt)):i.hasSingleButton?((0,s.wg)(),(0,s.iD)("div",{key:2,class:"play-button",onClick:e[0]||(e[0]=(...t)=>i.actionButton&&i.actionButton(...t))},[(0,s._)("div",Rt,[(0,s._)("div",{class:(0,o.C_)(["button-icon",n.state.iconName])},null,2)])])):((0,s.wg)(),(0,s.iD)("div",{key:3,class:"play-button",onClick:e[2]||(e[2]=(...t)=>i.actionButton&&i.actionButton(...t))},[(0,s._)("div",kt,[(0,s._)("div",{class:(0,o.C_)(["button-icon",n.state.iconName])},null,2)]),(0,s._)("div",{class:"play-button__right-icon",onClick:e[1]||(e[1]=(...t)=>i.resetVideo&&i.resetVideo(...t))},$t)])),(0,s._)("div",Ot,(0,o.zw)(a.cardId),1)])}var Gt=a(2722),Mt=a.n(Gt);const Tt=!0,Lt={FIRST_PLAY:{id:"first-play",iconName:"play-icon",action(t,e){e.startLoadingYoutubeVideo()},nextState(){return Lt.LOADING}},LOADING:{id:"loading",iconName:"loading-icon",action(){},nextState(){return Lt.LOADING}},PLAY:{id:"play",iconName:"play-icon",action(t){t?.playVideo()},nextState(){return Lt.PAUSE}},PAUSE:{id:"pause",iconName:"pause-icon",action(t){t?.pauseVideo()},nextState(){return Lt.PLAY}},RESET:{id:"reset",iconName:"reset-icon",action(t){t?.seekTo(0)},nextState(t){return t}}};var Et={components:{Youtube:Mt()},props:{musicUrl:{type:String,required:!0},cardId:{type:Number,required:!0}},data(){return{STATE:Lt,showYoutube:!1,state:Lt.FIRST_PLAY,videoChanged:!1}},computed:{youtubeStyle(){return{display:"none"}},hasDisabledButton(){return!Tt},hasSingleButton(){return this.state.id===Lt.FIRST_PLAY.id||this.state.id===Lt.LOADING.id},hasActiveVideo(){return Tt&&this.showYoutube}},methods:{startLoadingYoutubeVideo(){this.showYoutube=!0},applyAction(t){this.showYoutube=!0,t.action(this.$refs.youtube,this),this.state=t.nextState(this.state)},actionButton(){this.applyAction(this.state)},resetVideo(t){t.preventDefault(),t.stopPropagation(),this.applyAction(Lt.RESET)},youtubeReady(){this.state=Lt.PLAY,this.$refs.youtube.setLoop(!0),this.actionButton()},youtubeStateChange(){this.videoChanged&&(this.videoChanged=!1,this.$refs.youtube.pauseVideo())}},watch:{musicUrl(){this.videoChanged=!0}}};const xt=(0,h.Z)(Et,[["render",Vt],["__scopeId","data-v-837c57fe"]]);var qt=xt,zt={components:{AudioPlayer:qt},props:{info:{type:Object,required:!0},initialContainer:{type:Object,required:!0}},computed:{isText(){return"text"===this.info.type},isAudio(){return"audio"===this.info.type},isDraggable(){return!this.initialContainer?.isValid??!0},infoText(){return this.info.value.split("\n").filter((t=>t))}},methods:{handleDragStart(t){const e={dragStartUid:this.$parent.$.uid,info:this.info},a=`${this.$parent.$.uid},${this.info.dataName}`;t.dataTransfer.setData("text/plain",JSON.stringify(e)),t.dataTransfer.setData(a,null),bt(this.initialContainer),vt(this.info.dataName)},handleDragEnd(){vt(null)}}};const jt=(0,h.Z)(zt,[["render",pt],["__scopeId","data-v-1c2d41c2"]]);var Ft=jt;const Yt={UNCHECKED:0,INVALID:1,VALID:2};var Ut={components:{InfoCard:Ft},props:{hasData:{type:Boolean,required:!0},dataName:{type:String,required:!0},rowSize:{type:Number,default:NaN},order:{type:String,default:""}},data(){return{currentInfoCard:null,checkState:Yt.UNCHECKED}},computed:{tableCellClass(){return{[this.dataName]:null!==this.dataName,valid:this.checkState===Yt.VALID,invalid:this.checkState===Yt.INVALID}},currentValue(){return this.currentInfoCard?.value},hasInfoCard(){return null!==this.currentInfoCard},isValid(){return this.checkState===Yt.VALID},rowspan(){return Number.isNaN(this.rowSize)?void 0:this.rowSize}},methods:{resetContent(){this.currentInfoCard=null,this.checkState=Yt.UNCHECKED},setInfoCard(t){if(null!==t&&t.dataName!==this.dataName)throw new Error(`cannot add info card with different type (got ${t.dataName} but expected ${this.dataName})`);this.currentInfoCard=t,this.checkState=Yt.UNCHECKED},removeInfoCard(){this.resetContent()},updateValidateStatus(t){return this.checkState=t,!(t!==Yt.VALID)},handleDragOver(t){t.preventDefault();let e=this.checkState!==Yt.VALID;if(e){const[,a]=t.dataTransfer.types,[r,s]=a.split(",");e=r!=this.$.uid,e&&(e=s===this.dataName.toLowerCase())}t.dataTransfer.dropEffect=e?"move":"none"},handleDrop(t){t.preventDefault();const e=t.dataTransfer.getData("text/plain");try{const{info:t}=JSON.parse(e);yt(t,this.currentInfoCard,this)}catch(a){console.error(`invalid drop data in cell: ${e}`)}}}};const Bt=(0,h.Z)(Ut,[["render",lt],["__scopeId","data-v-4d4ab3aa"]]);var Ht=Bt;const Zt=[/^https:\/\/www\.youtube\.com\/watch\?v=.{11}$/],Pt=[{type:"text",name:"name",dataName:"characterName",hasValidData(){return!0},valueFromData(t){return t.name}},{type:"text",name:"species",dataName:"characterSpecies",hasValidData(){return!0},valueFromData(t){return t.species}},{type:"text",name:"abilities",dataName:"characterAbilities",hasValidData(){return!0},valueFromData(t){return t.abilities}}],Kt=[{type:"text",name:"name",dataName:"musicName",hasValidData(){return!0},valueFromData(t){return t.name}},{type:"audio",name:"url",dataName:"musicUrl",cellName:"urlCell",hasValidData(t){return Zt.some((e=>e.test(t.url)))},valueFromData(t){return t.url}}],Wt=Pt.map((({dataName:t})=>t)),Jt=Kt.map((({dataName:t})=>t));var Qt={components:{GuessCell:Ht},props:{character:{type:Object},rowSize:{type:Number,default:NaN},order:{type:String,default:""}},data(){return{CHARACTERS_INFO_CARD:Pt}},computed:{hasCharacter(){return void 0!==this.character}},methods:{getCurrentValue(){const t={};return Pt.forEach((({name:e,dataName:a})=>{t[e]=this.$refs[a][0].currentValue})),t},hasAllInfoCardSet(){return Pt.map((({dataName:t})=>this.$refs[t][0].hasInfoCard)).every((t=>t))},resetContent(){Pt.forEach((({dataName:t})=>{this.$refs[t][0].resetContent()}))},quickSetInfoCard(t){if(null===t)throw new Error("quick set character: info card cannot be null");let e=!1;const a=this.$refs[t.dataName][0];return a.hasInfoCard||(a.setInfoCard(t),e=!0),e},updateValidateStatus(t){return Pt.map((({name:e,dataName:a})=>this.$refs[a][0].updateValidateStatus(t[e]))).reduce(((t,e)=>t+e))}}};const Xt=(0,h.Z)(Qt,[["render",it]]);var te=Xt;function ee(t,e,a,r,n,o){const i=(0,s.up)("GuessCell");return(0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.MUSICS_INFO_CARD,(({dataName:t})=>((0,s.wg)(),(0,s.j4)(i,{"has-data":o.hasMusic,"data-name":t,"row-size":a.rowSize,order:a.order,ref_for:!0,ref:t},null,8,["has-data","data-name","row-size","order"])))),256)}var ae={components:{GuessCell:Ht},props:{music:{type:Object},rowSize:{type:Number,default:NaN},order:{type:String,default:""}},data(){return{MUSICS_INFO_CARD:Kt}},computed:{hasMusic(){return void 0!==this.music}},methods:{getCurrentValue(){const t={};return Kt.forEach((({name:e,dataName:a})=>{t[e]=this.$refs[a][0].currentValue})),t},hasAllInfoCardSet(){return Kt.map((({dataName:t})=>this.$refs[t][0].hasInfoCard)).every((t=>t))},resetContent(){Kt.forEach((({dataName:t})=>{this.$refs[t][0].resetContent()}))},quickSetInfoCard(t){if(null===t)throw new Error("quick set music: info card cannot be null");let e=!1;const a=this.$refs[t.dataName][0];return a.hasInfoCard||(a.setInfoCard(t),e=!0),e},updateValidateStatus(t){return Kt.map((({name:e,dataName:a})=>this.$refs[a][0].updateValidateStatus(t[e]))).reduce(((t,e)=>t+e))}}};const re=(0,h.Z)(ae,[["render",ee]]);var se=re,ne={components:{GuessCharacterRow:te,GuessMusicRow:se},props:{type:{type:String,required:!0},name:{type:String,required:!0},characters:{type:Array,default:()=>[]},musics:{type:Array,default:()=>[]},characterOrder:{type:Boolean,default:!1},musicOrder:{type:Boolean,default:!1}},data(){return{fixedCharacters:[]}},computed:{stageName(){return this.name},hasCharacter(){return this.characters.length>=1},hasCharacterOrder(){return this.characterOrder||1===this.characters.length},hasMusicOrder(){return this.musicOrder||1===this.musics.length},stageRowspan(){const t=this.characters.length,e=this.musics.length;return t>e&&t>=2?t:e>t&&e>=2?e:void 0},characterRowSize(){return 1===this.characters.length&&this.musics.length>=2?this.musics.length:void 0},musicRowSize(){return this.characters.length>=2&&1===this.musics.length?this.characters.length:void 0},row1(){return{character:this.characters?.[0],music:this.musics[0]}},row2(){return{character:this.characters?.[1],music:this.musics?.[1]}},hasRow2(){return this.row2.character||this.row2.music},row3(){return{character:this.characters?.[2],music:this.musics?.[2]}},hasRow3(){return this.row3.character||this.row3.music},orderCharacter1(){return this.characters.length>=2&&this.characterOrder?"1":""},orderCharacter2(){return this.characterOrder?"2":""},orderCharacter3(){return this.characterOrder?"3":""},orderMusic1(){return this.musicOrder?"1":""},orderMusic2(){return this.musicOrder?"2":""},orderMusic3(){return this.musicOrder?"3":""}},methods:{getCharactersRows(){const{characterRow:t,characterRow2:e,characterRow3:a}=this.$refs;return[t,e,a].filter((t=>t))},getMusicsRows(){const{musicRow:t,musicRow2:e,musicRow3:a}=this.$refs;return[t,e,a].filter((t=>t))},getCurrentCharactersValues(){return this.getCharactersRows().map((t=>t.getCurrentValue()))},getCurrentMusicsValues(){return this.getMusicsRows().map((t=>t.getCurrentValue()))},resetContent(){const t=this.getCharactersRows();this.fixedCharacters=Array(t.length),t.forEach((t=>t.resetContent())),this.getMusicsRows().forEach((t=>t.resetContent()))},hasAllInfoCardSet(){return this.hasAllInfoCardSetOnCharactersRows()&&this.hasAllInfoCardSetOnMusicsRows()},hasAllInfoCardSetOnCharactersRows(){return this.getCharactersRows().every(this.hasAllInfoCardSetOnCharacterRow)},hasAllInfoCardSetOnCharacterRow(t){return t?.hasAllInfoCardSet()??!0},hasAllInfoCardSetOnMusicsRows(){return this.getMusicsRows().every(this.hasAllInfoCardSetOnMusicRow)},hasAllInfoCardSetOnMusicRow(t){return t?.hasAllInfoCardSet()??!0},quickSetInfoCard(t){if(null===t)throw new Error("quick set stage: info card cannot be null");let e=!1;const{dataName:a}=t;if(Wt.includes(a)){const a=this.getCharactersRows(),r=a.length;let s=0;while(!e&&s<r){const r=a[s];this.hasAllInfoCardSetOnCharacterRow(r)||(e=r.quickSetInfoCard(t)),s++}}else if(Jt.includes(a)){const a=this.getMusicsRows(),r=a.length;let s=0;while(!e&&s<r){const r=a[s];this.hasAllInfoCardSetOnMusicRow(r)||(e=r.quickSetInfoCard(t)),s++}}return e},hasMatchedContent(){return this.hasMatchedCharacters()&&this.hasMatchedMusic()},hasMatchedCharacters(){if(!this.hasCharacter)return!0;const t=this.getCurrentCharactersValues(),e=[...this.characters];this.hasCharacterOrder||(t.sort(oe),e.sort(oe));const a=t.every(((t,a)=>{const r=ce(t,e[a]);return r}));return a},hasMatchedMusic(){const t=this.getCurrentMusicsValues(),e=[...this.musics];this.hasMusicOrder||(t.sort(ie),e.sort(ie));const a=t.every(((t,a)=>{const r=ue(t,e[a]);return r}));return a},updateValidateStatus(){let t=0,e=0;if(this.hasCharacter){const e=this.getCharactersRows();if(this.hasCharacterOrder)t=e.map(((t,e)=>this.updateValidateCharacterStatus(t,this.characters[e]))).reduce(((t,e)=>t+e));else{const a=[...this.characters];t=e.map((t=>{let e=0;const r=t.getCurrentValue(),s=a.findIndex((t=>t.name===r.name));if(-1!==s){const r=a[s];e=this.updateValidateCharacterStatus(t,r),a.splice(s,1)}else e=this.updateValidateCharacterStatus(t,null);return e})).reduce(((t,e)=>t+e))}}const a=this.getMusicsRows();if(this.hasMusicOrder)e=a.map(((t,e)=>this.updateValidateMusicStatus(t,this.musics[e]))).reduce(((t,e)=>t+e));else{const t=[...this.musics];e=a.map((e=>{let a=0;const r=e.getCurrentValue(),s=t.findIndex((t=>t.name===r.name));if(-1!==s){const r=t[s];a=this.updateValidateMusicStatus(e,r),t.splice(s,1)}else a=this.updateValidateMusicStatus(e,null);return a})).reduce(((t,e)=>t+e))}return t+e},updateValidateCharacterStatus(t,e){return le(t,e,Pt)},updateValidateMusicStatus(t,e){return le(t,e,Kt)}}};function oe(t,e){return t.name<e.name?-1:t.name>e.name?1:t.species<e.species?-1:t.species>e.species?1:0}function ie(t,e){return t.name<e.name?-1:t.name>e.name?1:t.url<t.url?-1:t.url>t.url?1:0}function ce(t,e){return de(t,e,Pt)}function ue(t,e){return de(t,e,Kt)}function de(t,e,a){return a.map((({name:a})=>t[a]===e[a])).every((t=>t))}function le(t,e,a){const r=t.getCurrentValue(),s={};return a.forEach((({name:t})=>{s[t]=he(r,e,t)})),t.updateValidateStatus(s)}function he(t,e,a){const r=t?.[a],s=e?.[a];return void 0===r?Yt.UNCHECKED:r===s?Yt.VALID:Yt.INVALID}const me=(0,h.Z)(ne,[["render",ot],["__scopeId","data-v-5d3aa880"]]);var fe=me,pe={components:{GuessStageRow:fe},props:{stageInformations:{type:Object,required:!0}},computed:{stageData(){return this.stageInformations.stage},bossStageData(){return this.stageInformations.boss}},methods:{resetContent(){this.$refs.stageLevelRows.resetContent(),this.$refs.bossStageLevelRows.resetContent()},hasAllInfoCardSet(){return this.$refs.stageLevelRows.hasAllInfoCardSet()&&this.$refs.bossStageLevelRows.hasAllInfoCardSet()},quickSetInfoCard(t){if(null===t)throw new Error("cannot quick set a null info card");let e=!1;const{stageLevelRows:a,bossStageLevelRows:r}=this.$refs;return a.hasAllInfoCardSet()||(e=a.quickSetInfoCard(t)),e||r.hasAllInfoCardSet()||(e=r.quickSetInfoCard(t)),e},hasMatchedContent(){const t=this.$refs.stageLevelRows.hasMatchedContent(),e=this.$refs.bossStageLevelRows.hasMatchedContent();return t&&e},updateValidateStatus(){const t=this.$refs.stageLevelRows.updateValidateStatus(),e=this.$refs.bossStageLevelRows.updateValidateStatus();return t+e}}};const ge=(0,h.Z)(pe,[["render",at]]);var Ce=ge,we={components:{GuessStageGroupRow:Ce},props:{gameInformations:{type:Object,default:void 0}},data(){return{gameNumber:void 0,currenDraggedDataName:null}},mounted(){wt(this)},computed:{tableClass(){return{[this.currenDraggedDataName]:null!==this.currenDraggedDataName}},stagesInformations(){return this.gameInformations.stages}},methods:{setGameNumber(t){this.gameNumber=t},setDraggedDataName(t){this.currenDraggedDataName=t},resetContent(){this.$refs.guessStageGroupRows?.forEach((t=>t.resetContent()))},quickSetInfoCard(t){if(null===t)throw new Error("cannot quick set no info card");let e=!1;const{guessStageGroupRows:a}=this.$refs,r=a.length;let s=0;while(!e&&s<r){const r=a[s];r.hasAllInfoCardSet()||(e=r.quickSetInfoCard(t)),s++}return e},hasMatchedContent(){const{guessStageGroupRows:t}=this.$refs;return t.every((t=>t.hasMatchedContent()))},updateValidateStatus(){return this.$refs.guessStageGroupRows.map((t=>t.updateValidateStatus())).reduce(((t,e)=>t+e),0)}}};const be=(0,h.Z)(we,[["render",et],["__scopeId","data-v-91098704"]]);var ve=be;function ye(t,e,a,r,n,o){const i=(0,s.up)("InfoCard");return(0,s.wg)(),(0,s.iD)("div",{class:"unsorted-cards-box-container",onDragover:e[0]||(e[0]=(...t)=>o.handleDragOver&&o.handleDragOver(...t)),onDrop:e[1]||(e[1]=(...t)=>o.handleDrop&&o.handleDrop(...t))},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.unsortedCards,(t=>((0,s.wg)(),(0,s.j4)(i,{info:t,"initial-container":this},null,8,["info"])))),256))],32)}a(7658);var Se=a(4528),De={components:{InfoCard:Ft},data(){return{unsortedCards:[],totalCards:0,initialNbCards:0,randomIds:[]}},computed:{isValid(){return!1}},methods:{initUnsortedCards(t){let e=!0;this.unsortedCards=[],this.totalCards=0;const{stages:a}=t;this.initRandomIds(a);for(let r of a){const{stage:t,boss:a}=r;e=this.addStageInfo(t)&this.addStageInfo(a)}return this.unsortedCards=(0,Se.Z)(this.unsortedCards),this.initialNbCards=this.unsortedCards.length,e},initRandomIds(t){this.randomIds=[];const e=(2*t.length+1)*(Pt.length+Kt.length+1);for(let a=1;a<=e;a++)this.randomIds.push(a);this.randomIds=(0,Se.Z)(this.randomIds)},addStageInfo({characters:t,musics:e}){let a=!0;if(void 0!==t)for(let r of t)Pt.forEach((({type:t,name:e,dataName:s,hasValidData:n,valueFromData:o})=>{n(r)?this.unsortedCards.push({dataName:s,type:t,value:o(r),id:this.randomIds[this.totalCards++]}):(a=!1,console.error(`character "${r.name}" has an invalid ${e}`))}));for(let r of e)Kt.forEach((({type:t,name:e,dataName:s,hasValidData:n,valueFromData:o})=>{n(r)?this.unsortedCards.push({dataName:s,type:t,value:o(r),id:this.randomIds[this.totalCards++]}):(a=!1,console.error(`music "${r.name}" has an invalid ${e}`))}));return a},handleDragOver(t){t.preventDefault();let e=!1;const[,a]=t.dataTransfer.types,[r,s]=a.split(",");e=r!=this.$.uid,e&&(e=s?.length>0),t.dataTransfer.dropEffect=e?"move":"none"},handleDrop(t){t.preventDefault();const e=t.dataTransfer.getData("text/plain");try{const{info:t}=JSON.parse(e);yt(t,null,this)}catch(a){console.error(`invalid drop data in box: ${e}`)}},setInfoCard(t){null!==t&&this.unsortedCards.push(t)},removeInfoCard(t){const e=this.unsortedCards.findIndex((e=>e.id===t.id));if(-1===e)throw new Error(`card not found: ${JSON.stringify(t)}`);this.unsortedCards.splice(e,1)},hasSetSomeCardsInGuessTable(){return this.unsortedCards.length<this.initialNbCards},hasSetAllCardsInGuessTable(){return 0===this.unsortedCards.length},getUnsortedCardsLength(){return this.unsortedCards.length},sendCardsToGuessTable(t){this.unsortedCards.forEach((e=>{const a=t.quickSetInfoCard(e);if(!a)throw new Error("should have set the info card")})),this.unsortedCards=[]}}};const Ie=(0,h.Z)(De,[["render",ye],["__scopeId","data-v-29365f31"]]);var _e=Ie,Ne={components:{DataGameInformation:W,GuessTable:ve,UnsortedCardsBox:_e},props:{listGameFilename:{type:Array,required:!0}},data(){return{gameNumber:void 0,gameInformations:void 0,hasMatchedContent:!1,ccc:0}},mounted(){this.$refs.mainTopContent.initialLoad()},computed:{disableButton(){return this.hasMatchedContent}},methods:{reset(){this.hasMatchedContent=!1;const t=this.$refs.unsortedCardsBox.initUnsortedCards(this.gameInformations);if(t){const{totalCards:t}=this.$refs.unsortedCardsBox;this.$refs.mainTopContent.reset(),this.$refs.mainTopContent.initTotalCards(t),this.$refs.guessTable.setGameNumber(this.gameNumber),this.$refs.guessTable.resetContent()}else console.error("failed loading data in the file")},updateData(t,e){this.gameNumber=t,this.gameInformations=e,this.actionReset()},actionReset(){let t=!0;this.hasMatchedContent?t=!0:this.$refs.unsortedCardsBox.hasSetSomeCardsInGuessTable()&&(t=window.confirm("Are you sure to reset?")),t&&this.reset()},actionQuickFill(){this.$refs.unsortedCardsBox.sendCardsToGuessTable(this.$refs.guessTable)},actionSubmit(){const{unsortedCardsBox:t}=this.$refs;if(this.hasMatchedContent)console.error("should not reach here");else if(t.hasSetAllCardsInGuessTable())this.validateSubmission()&&setTimeout((()=>{alert("All cards has been set successfully!")}),100);else{const e=t.getUnsortedCardsLength();alert(`All cards must be set before submitting (${e} left)`)}},validateSubmission(){const{mainTopContent:t,guessTable:e}=this.$refs;t.incrementTryCount();const a=e.updateValidateStatus();return this.hasMatchedContent=e.hasMatchedContent(),t.setCorrectCards(a),this.hasMatchedContent}}};const Re=(0,h.Z)(Ne,[["render",b],["__scopeId","data-v-797d7bd8"]]);var ke=Re,Ae={name:"App",components:{MainHeader:f,MainContent:ke},props:{listGameFilename:{type:Array,required:!0}}};const $e=(0,h.Z)(Ae,[["render",n]]);var Oe=$e;V().then((t=>({listGameFilename:t}))).then((t=>{(0,r.ri)(Oe,t).mount("#app")}))}},e={};function a(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,a),n.exports}a.m=t,function(){var t=[];a.O=function(e,r,s,n){if(!r){var o=1/0;for(d=0;d<t.length;d++){r=t[d][0],s=t[d][1],n=t[d][2];for(var i=!0,c=0;c<r.length;c++)(!1&n||o>=n)&&Object.keys(a.O).every((function(t){return a.O[t](r[c])}))?r.splice(c--,1):(i=!1,n<o&&(o=n));if(i){t.splice(d--,1);var u=s();void 0!==u&&(e=u)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[r,s,n]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={826:0};a.O.j=function(e){return 0===t[e]};var e=function(e,r){var s,n,o=r[0],i=r[1],c=r[2],u=0;if(o.some((function(e){return 0!==t[e]}))){for(s in i)a.o(i,s)&&(a.m[s]=i[s]);if(c)var d=c(a)}for(e&&e(r);u<o.length;u++)n=o[u],a.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return a.O(d)},r=self["webpackChunktouhou_character_info_guess"]=self["webpackChunktouhou_character_info_guess"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(594)}));r=a.O(r)})();
//# sourceMappingURL=index.e0cc6bf6.js.map