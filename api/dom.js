/*prettydiff.com api.topcoms: true*/
/*jslint nomen: true */
/*global edition, document, localStorage, window, prettydiff, XMLHttpRequest, location, ActiveXObject, FileReader*/
var exports = "",
    _gaq = _gaq || [],
    pd = {};

(function () {
    "use strict";

    //test for localStorage and assign the result of the test
    pd.ls = (typeof localStorage === "object" && localStorage !== null && typeof localStorage.getItem === "function" && typeof localStorage.hasOwnProperty === "function") ? true : false;

    //test for support of the file api
    pd.fs = (typeof FileReader === "function" && typeof new FileReader().readAsText === "function") ? true : false;

    pd.bounce = true;
    pd.$$ = function (x) {
        if (document.getElementById === undefined) {
            return;
        }
        return document.getElementById(x);
    };

    //o Stores a reference to everything that is needed from the DOM
    pd.o = {
        ao: pd.$$("addOptions"),
        an: pd.$$("additional_no"),
        ay: pd.$$("additional_yes"),
        ba: pd.$$("beau-tab"),
        bb: pd.$$("modebeautify"),
        bc: pd.$$("beau-char"),
        bd: pd.$$("Beautify"),
        bf: pd.$$("bforce_indent-no"),
        bg: pd.$$("bforce_indent-yes"),
        bi: pd.$$("beautyinput"),
        bl: pd.$$("baselabel"),
        bn: pd.$$("beau-line"),
        bo: pd.$$("baseText"),
        bq: pd.$$("beau-quan"),
        bs: pd.$$("beau-space"),
        bt: pd.$$("diffBase"),
        bx: pd.$$("beautyoutput"),
        bw: pd.$$("beau-other"),
        bz: pd.$$("bo"),
        cd: pd.$$("conditionald-no"),
        ce: pd.$$("conditionald-yes"),
        cf: pd.$$("conditionalm-no"),
        cg: pd.$$("conditionalm-yes"),
        ch: pd.$$("csvchar"),
        ci: pd.$$("codeInput"),
        cn: 4,
        cs: pd.$$("colorScheme"),
        cz: " ",
        da: pd.$$("diff-tab"),
        db: pd.$$("diffbeautify"),
        dc: pd.$$("diff-char"),
        dd: pd.$$("modediff"),
        df: pd.$$("dforce_indent-no"),
        dg: pd.$$("dforce_indent-yes"),
        dh: pd.$$("diffcommentsy"),
        di: pd.$$("diffcommentsn"),
        dm: pd.$$("diffscolony"),
        dn: pd.$$("diffscolonn"),
        dp: pd.$$("diffwide"),
        dq: pd.$$("diff-quan"),
        dr: pd.$$("diffquotey"),
        ds: pd.$$("diff-space"),
        dt: pd.$$("difftall"),
        du: pd.$$("diffcontentn"),
        dw: pd.$$("diff-other"),
        dx: pd.$$("diffcontenty"),
        dy: pd.$$("diffquoten"),
        dz: pd.$$("diff-line"),
        hd: pd.$$("htmld-yes"),
        he: pd.$$("htmld-no"),
        hm: pd.$$("htmlm-yes"),
        hn: pd.$$("htmlm-no"),
        hy: pd.$$("html-yes"),
        hz: pd.$$("html-no"),
        id: pd.$$("inscriptd-yes"),
        ie: pd.$$("inscriptd-no"),
        is: pd.$$("inscript-yes"),
        it: pd.$$("inscript-no"),
        iy: pd.$$("incomment-yes"),
        iz: pd.$$("incomment-no"),
        jd: pd.$$("jsindentd-all"),
        je: pd.$$("jsindentd-knr"),
        js: pd.$$("jsindent-all"),
        jt: pd.$$("jsindent-knr"),
        la: pd.$$("language"),
        mb: pd.$$("topcoms-no"),
        mc: pd.$$("topcoms-yes"),
        md: pd.$$("Minify"),
        mi: pd.$$("minifyinput"),
        ml: pd.$$("minifyinputlines"),
        mm: pd.$$("modeminify"),
        mn: pd.$$("minifywindiff"),
        mo: pd.$$("minifyoutputsize"),
        mr: pd.$$("minifywinratiosize"),
        ms: pd.$$("minifyinputsize"),
        mt: pd.$$("minifyratiosize"),
        mu: pd.$$("minifyunixdiff"),
        mw: pd.$$("minifywinsize"),
        mx: pd.$$("minifyoutput"),
        nl: pd.$$("newlabel"),
        nt: pd.$$("diffNew"),
        nx: pd.$$("newText"),
        nz: pd.$$("no"),
        op: pd.$$("options"),
        ps: pd.$$("diff-save"),
        re: pd.$$("diffreport"),
        rf: pd.$$("diffreportbody"),
        rg: pd.$$("beaureport"),
        rh: pd.$$("beaureportbody"),
        ri: pd.$$("minreport"),
        rj: pd.$$("minreportbody"),
        rk: pd.$$("statreport"),
        rl: pd.$$("statreportbody"),
        sh: pd.$$("hideOptions"),
        to: pd.$$("top"),
        wb: document.getElementsByTagName("body")[0],
        wc: pd.$$("beau-wrap"),
        wd: pd.$$("diff-wrap"),
        bcv: "",
        css: {
            core: "body{font-family:\"Arial\";font-size:10px}h1{float:left;font-size:2em;margin:0 .5em .5em 0}h2{background:#fff;border-style:solid;border-width:.075em;float:left;font-size:1.8em;font-weight:bold;margin:0 .5em .5em 0;padding:0 .2em}p{clear:both;font-size:1.2em;margin:0 0 1em}table.diff{border-collapse:collapse}table.diff tbody{font-family:'Courier New',Courier,'Lucida Console',monospace;font-size:1.1em}table.diff tbody th{font-family:verdana,arial,'Bitstream Vera Sans',helvetica,sans-serif;font-weight:normal;padding:.5em .6em 0 2.4em;text-align:right;vertical-align:top}table.diff thead{font-family:Verdana;text-align:left}table.diff thead{border-bottom-style:solid;border-bottom-width:.1em}table.diff thead th{border-left-style:solid;border-left-width:.1em;padding-left:2em}table.diff tbody td{letter-spacing:.1em;padding:.5em .5em 0;vertical-align:top;white-space:pre}table.diff tbody td em{font-style:normal;margin:0 -.09em;padding:.05em 0}table.diff th.author{border-top-style:solid;border-top-width:.1em;padding:.4em;text-align:right}table.diff .replace em,table.diff .delete em,table.diff .insert em,table.diff .skip,table.diff tbody th,table.diff{border-style:solid;border-width:.1em}@media print{p,ul{display:none}div{width:100%}html td{font-size:.8em;white-space:normal}}",
            sdefault: "body.default button{background:#dfd;border-color:#030;box-shadow:0 .1em .2em rgba(0,32,0,0.75);color:#030}.default a{color:#f00}.default button:hover{background:#f6fff6}.default button:active{background:#030;color:#dfd}.default #title_text{background:#fff;border-color:#000;box-shadow:0 .15em .3em rgba(0,0,0,0.5);color:#000}.default #introduction h2{border-color:#f00;color:#c00}.default h1 svg{border-color:#600;box-shadow:0 .2em .4em rgba(0,0,0,0.5)}.default h2,.default h3{border-color:#000}.default fieldset{border-color:#caa}.default legend{border-color:#fee;color:#966}.default .button button{background:url(\"images/green.png\") repeat-x 0 100%#dfd}.default .button button:hover{background:#f6fff6}.default .button button:active{background:#030;color:#efe}.default .box{background:#ccc;border-color:#006;box-shadow:0 .4em .8em rgba(0,0,64,0.75)}.default .box button{box-shadow:0 .1em .2em rgba(0,0,64,0.5)}.default .box button.resize{background:#ddf;border-color:#006;color:#006}.default .box button.minimize{background:#ddf;border-color:#006;color:#006}.default .box button.minimize:hover,.default .box button.resize:hover{background:#99f}.default .box button.save{background:#ddf;border-color:#006;color:#006}.default .box button.save:hover{background:#99f}.default .box h3.heading{background:#eef;border-color:#006}.default .box h3.heading:hover{background:#ccf}.default .box .body{background:#d8dde8;border-color:#006;box-shadow:0 0 .4em rgba(0,64,0,0.75)}.default .options{background:url(\"images/backred.gif\") #fee repeat-x 100% 100%;border-color:#600;box-shadow:0 .2em .4em rgba(64,0,0,0.5)}.default .options h2{border-color:#600;box-shadow:0 .1em .2em rgba(102,0,0,0.75)}.default #Beautify h2,.default #Minify h2,.default #diffBase h2,.default #diffNew h2{border-color:#006;box-shadow:0 .1em .2em rgba(0,0,64,0.5)}.default #option_comment{background:#fee;border-color:#600}.default #top em{color:#00f}.default #update{background:#fff;border-color:#000;box-shadow:0 .1em .2em rgba(0,0,0,0.5)}.default .wide,.default .tall,.default #diffBase,.default #diffNew{background:url(\"images/backblue.gif\") #eef repeat-x 100% 100%;border-color:#006;box-shadow:0 .2em .4em rgba(0,0,64,0.5)}.default .file input,.default .labeltext input{border-color:#006}#webtool.default input.unchecked{background:#eef8ff;color:#000}.default .options input[type=text],.default .options select{border-color:#933}.default #beautyoutput,.default #minifyoutput{background:#ddd}.default #diffoutput p em,.default #diffoutput li em{color:#c00}.default .analysis .bad{background-color:#e99;color:#400}.default .analysis .good{background-color:#9e9;color:#040}.default #doc .analysis thead th,.default #doc .analysis th[colspan]{background:#eef}.default div input{border-color:#933}.default textarea{border-color:#339}.default textarea:hover{background:#eef8ff}.default table.diff{border-color:#bbc}.default table.diff tbody th{background:#eed;border-color:#bbc;color:#886}.default table.diff thead{background:#efefef;border-bottom-color:#bbc}.default table.diff thead th{border-left-color:#bbc}.default table.diff .empty{background-color:#ddd}.default table.diff .replace{background-color:#fd8}.default table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.default table.diff .delete{background-color:#e99}.default table.diff .delete em{background-color:#fdd;border-color:#700;color:#600}.default table.diff .equal{background-color:#fff}.default table.diff .skip{background-color:#efefef;border-color:#aaa #bbc #aaa #aaa}.default table.diff .insert{background-color:#9e9}.default table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.default #doc table,.default .box .body table{background:#fff;border-color:#669}.default #doc strong,.default .box .body strong{color:#c00}.default .box .body em,.default .box .body #doc em{color:#090}.default table.diff th.author{background:#efefef;border-top-color:#bbc}.default #thirdparties img,.default #diffoutput #thirdparties{border-color:#687888}.default #diffoutput #thirdparties{background:#c8d8e8}.default #doc div,#doc.default div{background:#eef;border-color:#669}.default #doc ol,#doc.default ol{background:#fff;border-color:#669}.default #doc div div,#doc.default div div{background:#fff;border-color:#966}.default #doc table,#doc.default table{background:#fff;border-color:#669}.default #doc th,#doc.default th{background:#fed;border-left-color:#669;border-top-color:#669}.default #doc tr:hover,#doc.default tr:hover{background:#fed}.default #doc em,#doc.default em{color:#060}.default #doc div:hover,#doc.default div:hover{background:#def}.default #doc div div:hover,#doc.default div div:hover,#doc.default div ol:hover{background:#fed}.default #pdsamples li{background:#eef;border-color:#006}.default #pdsamples li div{background:url(\"images/backred.gif\") repeat-x 100% 100%#fee;border-color:#600}.default #pdsamples li div a{color:#009}.default #pdsamples li p a{color:#900}",
            scoffee: "html .coffee,body.coffee{background:#dcb;color:#321}.coffee a{color:#900}.coffee button{background:#654;border-color:#321;box-shadow:0 .1em .2em rgba(32,0,0,0.75);color:#fed}.coffee button:hover,.coffee button:active{background:#fed;color:#654}.coffee #update,.coffee #title_text{background:#fff8ee;border-color:#600;box-shadow:0 .15em .3em rgba(32,0,0,0.5);color:#321}.coffee #introduction h2{color:#f00}.coffee h1 svg{border-color:#600;box-shadow:0 .2em .4em rgba(0,0,0,0.5)}.coffee h2,.coffee h3{border-color:#600}.coffee fieldset{background:#dcb;border-color:#654}.coffee legend{background:#fed;border-color:#654}.coffee .box{background:#ccc;border-color:#654;box-shadow:0 .4em .8em rgba(64,0,0,0.75)}.coffee .box button{border-color:#600;box-shadow:0 .1em .2em rgba(64,0,0,0.5);color:#600}.coffee .box button.minimize:hover,.coffee .box button.resize:hover,.coffee .box button.save:hover,.coffee .box button.maximize:hover{background:#654;color:#fed}.coffee .box button.resize{background:#c96}.coffee .box button.minimize{background:#eda}.coffee .box button.save{background:#db0}.coffee .box button.maximize{background:#dd8}.coffee .box h3.heading{background:#987;border-color:#600;color:#fed}.coffee .box h3.heading:hover{background:#654}.coffee .box .body{background:#fed;border-color:#654;box-shadow:0 .4em .8em rgba(64,0,0,0.75)}.coffee .options{background:#fed;border-color:#600;box-shadow:0 .4em .8em rgba(64,0,0,0.5)}.coffee .options h2{border-color:#600;box-shadow:0 .1em .2em rgba(64,0,0,0.75)}.coffee #Beautify h2,.coffee #Minify h2,.coffee #diffBase h2,.coffee #diffNew h2{border-color:#600;box-shadow:0 .1em .2em rgba(64,0,0,0.5)}.coffee #option_comment{border-color:#600;box-shadow:0 .1em .2em rgba(64,0,0,0.5);color:#600}.coffee #top em{color:#f00}.coffee .wide,.coffee .tall,.coffee #diffBase,.coffee #diffNew{background:#fed;border-color:#600;box-shadow:0 .2em .4em rgba(64,0,0,0.5)}.coffee .file input,.coffee .labeltext input{border-color:#600}#webtool.coffee input.unchecked{background:#cba;color:#000}.coffee .options input[type=text],.coffee .options select{border-color:#933}.coffee #beautyoutput,.coffee #minifyoutput{background:#dcb}.coffee #diffoutput p em,.coffee #diffoutput li em{color:#900}.coffee .analysis .bad{background-color:#eb9;color:#400}.coffee .analysis .good{background-color:#be9;color:#040}.coffee #doc .analysis thead th,.coffee #doc .analysis th[colspan]{background:#dcb}.coffee div input{border-color:#933}.coffee textarea{background:#fff8ee;border-color:#a66}.coffee textarea:hover{background:#fff}.coffee table.diff{border-color:#966}.coffee table.diff tbody th{background:#edc;border-color:#966;color:#633}.coffee table.diff thead{background:#cba;border-bottom-color:#966}.coffee table.diff thead th{border-left-color:#966}.coffee table.diff .empty{background-color:#ddd}.coffee table.diff .replace{background-color:#fda}.coffee table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.coffee table.diff .delete{background-color:#ebb}.coffee table.diff .delete em{background-color:#fee;border-color:#700;color:#600}.coffee table.diff .equal{background-color:#fff8ee}.coffee table.diff .skip{background-color:#eee;border-color:#966}.coffee table.diff .insert{background-color:#cec}.coffee table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.coffee #doc table,.coffee .box .body table{background:#fff8ee;border-color:#966}.coffee #doc strong,.coffee .box .body strong{color:#900}.coffee #doc em,.coffee .box .body em,.coffee .box .body #doc em{color:#262}.coffee table.diff th.author{background:#cba;border-top-color:#966}.coffee #diffoutput #thirdparties{background:#edc;border-color:#600}.coffee #doc div,#doc.coffee div{background:#edc;border-color:#966}.coffee #doc ol,#doc.coffee ol{background:#fff8ee;border-color:#966}.coffee #doc div div,#doc.coffee div div{background:#fff;border-color:#966}.coffee #doc table,#doc.coffee table{background:#fff8ee;border-color:#966}.coffee #doc th,#doc.coffee th{background:#eed;border-left-color:#966;border-top-color:#966}.coffee #doc tr:hover,#doc.coffee tr:hover{background:#fed}.coffee #doc div:hover,#doc.coffee div:hover{background:#dcb}.coffee #doc div div:hover,#doc.coffee div div:hover,#doc.coffee div ol:hover{background:#dcb}.coffee #pdsamples li{background:#fed;border-color:#600}.coffee #pdsamples li div{background:#dcb;border-color:#654}.coffee #pdsamples li div a{color:#900}.coffee #pdsamples li p a{color:#900}",
            sdark: "body.dark{background:#333;color:#eee}.dark a{color:#9cf}.dark h2{background:#def;border-color:#006;color:#036}.dark table.diff{border-color:#036}.dark table.diff tbody th{background:#369;border-color:#036;color:#def}.dark table.diff tbody td{border-color:#036}.dark table.diff thead{background:#036;border-bottom-color:#036;color:#def}.dark table.diff thead th{border-left-color:#abc}.dark table.diff .empty{background-color:#456}.dark table.diff .replace{background-color:#468;color:#def}.dark table.diff .replace em{background-color:#dff;border-color:#036;color:#036}.dark table.diff .delete{background-color:#600;color:#fbb}.dark table.diff .delete em{background-color:#fbb;border-color:#600;color:#600}.dark table.diff .equal{background-color:#024;color:#def}.dark table.diff .skip{background-color:#333;border-color:#036}.dark table.diff .insert{background-color:#696;color:#dfd}.dark table.diff .insert em{background-color:#efc;border-color:#060;color:#050}.dark table.diff th.author{background:#036;border-bottom-color:#036;color:#def}",
            scanvas: "html .canvas,body.canvas{background:#e8e8e8;color:#666}.canvas a{color:#450}.canvas button{background:#d8d8cf;border-color:#664;box-shadow:0 .1em .2em rgba(128,128,92,0.75);color:#664;text-shadow:.05em .05em .1em #999}.canvas button:hover,.canvas button:active{background:#ffe}.canvas #update,.canvas #title_text{background:#f8f8ee;box-shadow:0 .1em .2em rgba(128,128,92,0.75);color:#464}.canvas h1 svg{border-color:#664;box-shadow:0 .1em .2em rgba(128,128,92,0.75)}.canvas h2,.canvas h3{background:#f8f8ef;border-color:#664;box-shadow:0 .1em .2em rgba(128,128,92,0.75);text-shadow:none}.canvas .wide,.canvas .tall,.canvas #diffBase,.canvas #diffNew{background:#d8d8cf;border-color:#664;box-shadow:0 .2em .4em rgba(128,128,92,0.5);color:#444}.canvas .wide label,.canvas .tall label,.canvas #diffBase label,.canvas #diffNew label{text-shadow:.05em .05em .1em #aaa}.canvas .options{background:#d8d8cf;border-color:#664;box-shadow:0 .2em .4em rgba(128,128,92,0.5);color:#444;text-shadow:.05em .05em .1em #999}.canvas fieldset{background:#e8e8e8;border-color:#664}.canvas legend{background:#f8f8ef;border-color:#664}.canvas .box{background:#ccc;border-color:#664}.canvas .box .body{background:#e8e8e8;border-color:#664;box-shadow:0 .2em .4em rgba(128,128,92,0.75);color:#666}.canvas .box button{box-shadow:0 .1em .2em rgba(128,128,92,0.75)}.canvas .box button.resize{background:#cfcfd8;border-color:#446;color:#446}.canvas .box button.resize:hover{background:#bbf;border-color:#228;color:#228}.canvas .box button.save{background:#d8cfcf;border-color:#644;color:#644}.canvas .box button.save:hover{background:#fcc;border-color:#822;color:#822}.canvas .box button.minimize{background:#cfcfd8;border-color:#446;color:#446}.canvas .box button.minimize:hover{background:#bbf;border-color:#228;color:#228}.canvas .box button.maximize{background:#cfd8cf;border-color:#464;color:#464}.canvas .box button.maximize:hover{background:#cfc;border-color:#282;color:#282}.canvas .box h3.heading:hover{background:#d8d8cf}.canvas #option_comment{background:#e8e8e8;border-color:#664;color:#444}.canvas #top em{color:#fcc}#webtool.canvas input.unchecked{background:#ccc;color:#333}.canvas input,.canvas select{box-shadow:.1em .1em .2em #999}.canvas .file input,.canvas .labeltext input,.canvas .options input[type=text],.canvas .options select{background:#f8f8f8;border-color:#664}.canvas #beautyoutput,.canvas #minifyoutput{background:#ccc}.canvas #diffoutput p em,.canvas #diffoutput li em{color:#050}.canvas #doc .analysis thead th,.canvas #doc .analysis th[colspan]{background:#c8c8bf}.canvas textarea{background:#f8f8ef;border-color:#664}.canvas textarea:hover{background:#e8e8e8}.canvas table.diff{border-color:#664}.canvas table.diff tbody th{background:#c8c8bf;border-color:#664}.canvas table.diff tbody td{background:#f8f8ef;border-color:#664}.canvas table.diff thead{background:#c8c8bf;border-bottom-color:#664;color:#664}.canvas table.diff thead th{border-left-color:#664}.canvas .analysis .bad{background-color:#ecb;color:#744}.canvas .analysis .good{background-color:#cdb;color:#474}.canvas table.diff .empty{background-color:#ccc}.canvas table.diff .replace{background-color:#dda;color:#660}.canvas table.diff .replace em{background-color:#ffd;border-color:#664;color:#880}.canvas table.diff .delete{background-color:#da9;color:#600}.canvas table.diff .delete em{background-color:#fbc;border-color:#600;color:#933}.canvas table.diff .equal{background-color:#f8f8ef;color:#666}.canvas table.diff .skip{background-color:#eee;border-color:#664}.canvas table.diff .insert{background-color:#bd9;color:#040}.canvas table.diff .insert em{background-color:#efc;border-color:#060;color:#464}.canvas table.diff th.author{background:#f8f8ef;border-bottom-color:#664;color:#666}.canvas #doc table,.canvas .box .body table{background:#f8f8ef;border-color:#664;color:#666}.canvas #doc strong,.canvas .box .body strong{color:#933}.canvas #doc em,.canvas .box .body em,.canvas .box .body #doc em{color:#472}.canvas #diffoutput #thirdparties{background:#c8c8bf;border-color:#664}.canvas #diffoutput #thirdparties a{color:#664}#doc.canvas{color:#444}.canvas #doc div,#doc.canvas div{background:#c8c8bf;border-color:#664}.canvas #doc ol,#doc.canvas ol{background:#e8e8e8;border-color:#664}.canvas #doc div div,#doc.canvas div div{background:#e8e8e8;border-color:#664}.canvas #doc table,#doc.canvas table{background:#f8f8ef;border-color:#664}.canvas #doc th,#doc.canvas th{background:#c8c8bf;border-left-color:#664;border-top-color:#664}.canvas #doc tr:hover,#doc.canvas tr:hover{background:#c8c8bf}.canvas #doc td,#doc.canvas td{border-color:#664}.canvas #doc div:hover,#doc.canvas div:hover{background:#d8d8cf}.canvas #doc div div:hover,#doc.canvas div div:hover,#doc.canvas div ol:hover{background:#f8f8ef}.canvas #pdsamples li{background:#d8d8cf;border-color:#664}.canvas #pdsamples li div{background:#e8e8e8;border-color:#664}.canvas #pdsamples li div a{color:#664}.canvas #pdsamples li p a{color:#450}",
            sshadow: "html .shadow,body.shadow{background:#222;color:#eee}.shadow a{color:#f60}.shadow a:hover{color:#c30}.shadow button{background:#630;border-color:#600;box-shadow:0 .2em .4em rgba(0,0,0,1);color:#f90;text-shadow:.1em .1em .1em #000}.shadow button:hover,.shadow button:active{background:#300;border-color:#c00;color:#fc0;text-shadow:.1em .1em .1em rgba(0,0,0,.5)}.shadow #title_text{border-color:#222}.shadow #update{background:#ddd;border-color:#000;color:#222}.shadow h1 svg{border-color:#222;box-shadow:.2em .2em .4em #000}.shadow h2,.shadow h3{background-color:#666;border-color:#666;box-shadow:none;color:#ddd;padding-left:0;text-shadow:none}.shadow .wide,.shadow .tall,.shadow #diffBase,.shadow #diffNew{background:#666;border-color:#999;color:#ddd}.shadow .wide label,.shadow .tall label,.shadow #diffBase label,.shadow #diffNew label{text-shadow:.1em .1em .1em #333}.shadow textarea{background:#333;border-color:#000;color:#ddd}.shadow textarea:hover{background:#000}.shadow .options{background:#666;border-color:#999;color:#ddd;text-shadow:.1em .1em .2em #333}.shadow fieldset{background:#333;border-color:#999}.shadow legend{background:#eee;border-color:#333;box-shadow:0 .1em .2em rgba(0,0,0,0.75);color:#222;text-shadow:none}.shadow .box{background:#000;border-color:#999;box-shadow:.6em .6em .8em rgba(0,0,0,.75)}.shadow .box .body{background:#333;border-color:#999;color:#ddd}.shadow .box h3{background:#ccc;border-color:#333;box-shadow:.2em .2em .8em #000;color:#222}.shadow .box button{box-shadow:0 .1em .2em rgba(0,0,0,0.75);text-shadow:.1em .1em .1em rgba(0,0,0,.5)}.shadow .box button.resize{background:#bbf;border-color:#446;color:#446}.shadow .box button.resize:hover{background:#ddf;border-color:#228;color:#228}.shadow .box button.save{background:#d99;border-color:#300;color:#300}.shadow .box button.save:hover{background:#fcc;border-color:#822;color:#822}.shadow .box button.minimize{background:#bbf;border-color:#006;color:#006}.shadow .box button.minimize:hover{background:#eef;border-color:#228;color:#228}.shadow .box button.maximize{background:#9c9;border-color:#030;color:#030}.shadow .box button.maximize:hover{background:#cfc;border-color:#060;color:#060}.shadow .box h3.heading:hover{background:#222;border-color:#ddd;color:#ddd}.shadow #option_comment{background:#333;border-color:#999;color:#ddd}.shadow #option_comment,.shadow input,.shadow select{box-shadow:.1em .1em .2em #000}.shadow input[disabled]{box-shadow:none}.shadow #top em{color:#684}#webtool.shadow input.unchecked{background:#666;color:#ddd}.shadow .file input,.shadow .labeltext input,.shadow .options input[type=text],.shadow .options select{background:#333;border-color:#999;color:#ddd}.shadow .options fieldset span input[type=text]{background:#222;border-color:#333}.shadow #beautyoutput,.shadow #minifyoutput{background:#555;color:#eee}.shadow table.diff tbody th{background:#bbb;border-color:#999;color:#333}.shadow #doc .analysis th[colspan],.shadow table.diff thead,.shadow table.diff thead th,.shadow #doc .analysis thead th{background:#555;border-color:#999;color:#ddd}.shadow table.diff tbody td{background:#666;border-color:#999;color:#ddd}.shadow .analysis .bad{background-color:#400;color:#c66}.shadow .analysis .good{background-color:#040;color:#6a6}.shadow table.diff .empty{background-color:#999}.shadow table.diff .replace{background-color:#664;color:#bb8}.shadow table.diff .replace em{background-color:#440;border-color:#220;color:#cc9}.shadow table.diff .delete{background-color:#300;color:#c66}.shadow table.diff .delete em{background-color:#700;border-color:#c66;color:#f99}.shadow table.diff .equal{background-color:#333;color:#ddd}.shadow table.diff .skip{background-color:#000;border-color:#999}.shadow table.diff .insert{background-color:#040;color:#6c6}.shadow table.diff .insert em{background-color:#363;border-color:#6c0;color:#cfc}.shadow table.diff th.author{background:#555;border-bottom-color:#999;color:#ddd}.shadow table td{border-color:#999}.shadow table.diff,.shadow #doc table,.shadow .box .body table{background:#333;border-color:#999;color:#ddd}.shadow #doc strong,.shadow .box .body strong{color:#b33}.shadow #doc em,.shadow .box .body em,.shadow .box .body #doc em,.shadow #diffoutput p em,.shadow #diffoutput li em{color:#684}.shadow #diffoutput #thirdparties{background:#666;border-color:#999}.shadow #diffoutput #thirdparties a{box-shadow:0 .2em .4em rgba(0,0,0,1);color:#000}#doc.shadow{color:#ddd}#doc.shadow h3 a{color:#00c}.shadow #doc div,#doc.shadow div{background:#666;border-color:#999}.shadow #doc ol,#doc.shadow ol{background:#333;border-color:#999}.shadow #doc div div,#doc.shadow div div{background:#333;border-color:#999}.shadow #doc table,#doc.shadow table{background:#333;border-color:#999}.shadow #doc th,#doc.shadow th{background:#bbb;border-left-color:#999;border-top-color:#999;color:#333}.shadow #doc tr:hover,#doc.shadow tr:hover{background:#555}.shadow #doc div:hover,#doc.shadow div:hover{background:#777}.shadow #doc div div:hover,#doc.shadow div div:hover,#doc.shadow div ol:hover{background:#444}.shadow #textreport{background:#222}.shadow #pdsamples li{background:#666;border-color:#999}.shadow #pdsamples li div{background:#333;border-color:#999}.shadow #pdsamples li div a{color:#789}.shadow #pdsamples li p a{color:#9cf}",
            swhite: "html .white,body.white{color:#333}body.white button{background:#eee;border-color:#222;box-shadow:0 .1em .2em rgba(64,64,64,0.75);color:#666;text-shadow:.05em .05em .1em #ccc}.white button:hover,.white button:active{background:#999;color:#eee;text-shadow:.1em .1em .1em #333}.white a{color:#009}.white #title_text{border-color:#fff;color:#333}.white #introduction h2{border-color:#333;color:#333}.white h1 svg{background:#eee;border-color:#333;box-shadow:0 .2em .4em rgba(0,0,0,0.5)}.white h2,.white h3{background:#eee;border-color:#eee;box-shadow:none;padding-left:0;text-shadow:none}.white fieldset{background:#ddd;border-color:#333}.white legend{background:#fff;border-color:#333;color:#333;text-shadow:none}.white .box{background:#666;border-color:#333;box-shadow:0 .4em .8em rgba(64,64,64,0.75)}.white .box button{box-shadow:0 .1em .2em rgba(0,0,0,0.75);text-shadow:.1em .1em .1em rgba(0,0,0,.5)}.white .box button.resize{background:#bbf;border-color:#446;color:#446}.white .box button.resize:hover{background:#ddf;border-color:#228;color:#228}.white .box button.save{background:#d99;border-color:#300;color:#300}.white .box button.save:hover{background:#fcc;border-color:#822;color:#822}.white .box button.minimize{background:#bbf;border-color:#006;color:#006}.white .box button.minimize:hover{background:#eef;border-color:#228;color:#228}.white .box button.maximize{background:#9c9;border-color:#030;color:#030}.white .box button.maximize:hover{background:#cfc;border-color:#060;color:#060}.white .box h3.heading{background:#ddd;border-color:#222;box-shadow:.2em .2em .4em #666}.white .box h3.heading:hover{background:#333;color:#eee}.white .box .body{background:#eee;border-color:#222;box-shadow:0 0 .4em rgba(64,64,64,0.75)}.white .options{background:#eee;border-color:#333;box-shadow:0 .2em .4em rgba(64,64,64,0.5);text-shadow:.05em .05em .1em #ccc}.white .options h2,.white #Beautify h2,.white #Minify h2,.white #diffBase h2,.white #diffNew h2{background:#eee;border-color:#eee;box-shadow:none;text-shadow:none}.white #option_comment{background:#ddd;border-color:#333}.white #top em{color:#00f}.white #update{background:#eee;border-color:#333;box-shadow:0 .1em .2em rgba(64,64,64,0.5)}.white .wide,.white .tall,.white #diffBase,.white #diffNew{background:#eee;border-color:#333;box-shadow:0 .2em .4em rgba(64,64,64,0.5)}.white .file input,.white .labeltext input{border-color:#fff}#webtool.white input.unchecked{background:#ccc;color:#666}.white .options input[type=text],.white .options select{border-color:#333}.white #beautyoutput,.white #minifyoutput{background:#ddd}.white #diffoutput p em,.white #diffoutput li em{color:#c00}.white .analysis .bad{background-color:#ebb;color:#400}.white .analysis .good{background-color:#cec;color:#040}.white #doc .analysis thead th,.white #doc .analysis th[colspan]{background:#eef}.white div input{border-color:#333}.white textarea{border-color:#333}.white textarea:hover{background:#eef8ff}.white table.diff{border-color:#333}.white table.diff tbody th{background:#eed;border-color:#bbc;color:#886}.white table.diff thead{background:#ddd;border-bottom-color:#333}.white table.diff thead th{border-left-color:#333}.white table.diff .empty{background-color:#ddd}.white table.diff .replace{background-color:#fea}.white table.diff .replace em{background-color:#ffd;border-color:#963;color:#630}.white table.diff .delete{background-color:#fbb}.white table.diff .delete em{background-color:#fdd;border-color:#700;color:#600}.white table.diff .equal{background-color:#fff}.white table.diff .skip{background-color:#efefef;border-color:#aaa #bbc #aaa #aaa}.white table.diff .insert{background-color:#bfb}.white table.diff .insert em{background-color:#efc;border-color:#070;color:#050}.white table.diff th.author{background:#efefef;border-top-color:#bbc}.white #doc table,.white .box .body table{background:#fff;border-color:#333}.white #doc strong,.white .box .body strong{color:#c00}.white .box .body em,.white .box .body #doc em{color:#090}.white #thirdparties img,.white #diffoutput #thirdparties{border-color:#333}.white #thirdparties img{box-shadow:.2em .2em .4em #999}.white #diffoutput #thirdparties{background:#eee}.white #doc div,#doc.white div{background:#ddd;border-color:#333}.white #doc ol,#doc.white ol{background:#eee;border-color:#333}.white #doc div div,#doc.white div div{background:#eee;border-color:#333}.white #doc table,#doc.white table{background:#fff;border-color:#333}.white #doc th,#doc.white th{background:#ddd;border-left-color:#333;border-top-color:#333}.white #doc tr:hover,#doc.white tr:hover{background:#ddd}.white #doc em,#doc.white em{color:#060}.white #doc div:hover,#doc.white div:hover{background:#ccc}.white #doc div div:hover,#doc.white div div:hover,#doc.white div ol:hover{background:#fff}.white #pdsamples li{background:#eee;border-color:#333}.white #pdsamples li div{background:#ddd;border-color:#333}.white #pdsamples li div a{color:#47a}.white #pdsamples li p a{color:#009}"
        },
        dcv: "",
        dqp: pd.$$("diffquanp"),
        dqt: pd.$$("difftypep"),
        bops: pd.$$("beauops"),
        csvp: pd.$$("csvcharp"),
        disp: pd.$$("displayOps"),
        dops: pd.$$("diffops"),
        mops: pd.$$("miniops"),
        stat: {
            visit: 0,
            usage: 0,
            fdate: "",
            avday: "1",
            diff: 0,
            beau: 0,
            minn: 0,
            markup: 0,
            js: 0,
            css: 0,
            csv: 0,
            text: 0,
            pdate: "",
            large: 0
        },
        stjs: pd.$$("stjs"),
        color: "shadow",
        stcss: pd.$$("stcss"),
        stcsv: pd.$$("stcsv"),
        inline: pd.$$("inline"),
        option: pd.$$("option_comment"),
        pdlogo: pd.$$("pdlogo"),
        stbeau: pd.$$("stbeau"),
        sideby: pd.$$("sidebyside"),
        stdiff: pd.$$("stdiff"),
        stminn: pd.$$("stminn"),
        sttext: pd.$$("sttext"),
        update: pd.$$("update"),
        zindex: 10,
        context: pd.$$("contextSize"),
        stavday: pd.$$("stavday"),
        stcouse: pd.$$("stcouse"),
        stfdate: pd.$$("stfdate"),
        stlarge: pd.$$("stlarge"),
        slength: {
            bi: 0,
            mi: 0,
            bo: 0,
            nx: 0
        },
        stusage: pd.$$("stusage"),
        stvisit: pd.$$("stvisit"),
        stmarkup: pd.$$("stmarkup")
    };

    //recycle bundles arguments in preparation for executing prettydiff
    pd.recycle = function (e) {
        var c = "",
            api = {},
            output = [],
            domain = /^(https?:\/\/|file:\/\/\/)/,
            event = e || window.event,
            pstyle = {};

        //do not execute from alt, home, end, or arrow keys
        if (typeof event === "object" && event.type === "keyup" && (event.altKey || event.keyCode === 18 || event.keyCode === 35 || event.keyCode === 36 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
            return;
        }
        if (pd.ls) {
            pd.o.stat.usage += 1;
            pd.o.stusage.innerHTML = pd.o.stat.usage;
        }

        //set defaults for all arguments
        api.comments = "indent";
        api.content = false;
        api.diff = "";
        api.diffview = "sidebyside";
        api.force_indent = false;
        api.html = false;
        api.insize = 4;
        api.indent = "";
        api.lang = "auto";
        api.mode = "beautify";
        api.quote = false;
        api.semicolon = false;
        api.style = "indent";
        api.topcoms = false;
        api.conditional = false;

        //gather updated dom nodes
        pd.o.bb = pd.$$("modebeautify");
        pd.o.jd = pd.$$("jsindentd-all");
        pd.o.js = pd.$$("jsindent-all");
        pd.o.ch = pd.$$("csvchar");
        pd.o.dd = pd.$$("modediff");
        pd.o.la = pd.$$("language");
        pd.o.mm = pd.$$("modeminify");
        pd.o.dx = pd.$$("diffcontenty");
        pd.o.sh = pd.$$("hideOptions");
        pd.o.la = pd.$$("language");
        api.lang = pd.o.la[pd.o.la.selectedIndex].value;
        api.csvchar = pd.o.ch.value;

        //determine operations based upon mode of operations
        if (pd.o.bb.checked) {
            pd.o.hy = pd.$$("html-yes");
            pd.o.ba = pd.$$("beau-tab");
            pd.o.bn = pd.$$("beau-line");
            pd.o.bw = pd.$$("beau-other");
            pd.o.bc = pd.$$("beau-char");
            pd.o.bi = pd.$$("beautyinput");
            pd.o.bq = pd.$$("beau-quan");
            pd.o.wc = pd.$$("beau-wrap");
            pd.o.is = pd.$$("inscript-yes");
            pd.o.iz = pd.$$("incomment-no");
            pd.o.bg = pd.$$("bforce_indent-yes");
            pd.o.bx.value = "";
            api.wrap = pd.o.wc.value;
            if (pd.o.bg.checked) {
                api.force_indent = true;
            }
            if (pd.o.ba.checked) {
                pd.o.cz = "\t";
            } else if (pd.o.bn.checked) {
                pd.o.cz = "\n";
            } else if (pd.o.bw.checked) {
                pd.o.cz = pd.o.bc.value;
                if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                    pd.o.cz = pd.o.cz.replace("&", "&amp;");
                }
            } else {
                pd.o.cz = " ";
            }
            api.inchar = pd.o.cz;
            if (!isNaN(pd.o.bq.value)) {
                pd.o.cn = Number(pd.o.bq.value);
                api.insize = pd.o.cn;
            }
            if (pd.o.it.checked) {
                api.style = "noindent";
            }
            if (pd.o.hy.checked) {
                api.html = "html-yes";
            }
            if (pd.o.iz.checked) {
                api.comments = "noindent";
            }
            if (pd.o.js.checked) {
                api.indent = "allman";
            }
            api.source = pd.o.bi.value;
            api.mode = "beautify";
        } else if (pd.o.mm.checked) {
            pd.o.hm = pd.$$("htmlm-yes");
            pd.o.mc = pd.$$("topcoms-yes");
            pd.o.mi = pd.$$("minifyinput");
            pd.o.mx.value = "";
            if (pd.o.hm.checked) {
                api.html = "html-yes";
            }
            if (pd.o.mc.checked) {
                api.topcoms = true;
            }
            if (pd.o.cg.checked) {
                api.conditional = true;
            }
            api.source = pd.o.mi.value;
            api.mode = "minify";
        } else if (pd.o.dd) {
            pd.o.context = pd.$$("contextSize");
            c = pd.o.context.value;
            pd.o.inline = pd.$$("inline");
            pd.o.bl = pd.$$("baselabel");
            pd.o.nl = pd.$$("newlabel");
            pd.o.hd = pd.$$("htmld-yes");
            pd.o.bo = pd.$$("baseText");
            pd.o.nx = pd.$$("newText");
            pd.o.dh = pd.$$("diffcommentsy");
            pd.o.dn = pd.$$("diffscolonn");
            pd.o.dy = pd.$$("diffquoten");
            pd.o.da = pd.$$("diff-tab");
            pd.o.dw = pd.$$("diff-other");
            pd.o.dz = pd.$$("diff-line");
            pd.o.dc = pd.$$("diff-char");
            pd.o.dq = pd.$$("diff-quan");
            pd.o.wd = pd.$$("diff-wrap");
            pd.o.du = pd.$$("diffcontentn");
            pd.o.id = pd.$$("inscriptd-yes");
            pd.o.ps = pd.$$("diff-save");
            pd.o.dg = pd.$$("dforce_indent-yes");
            api.difflabel = pd.o.nl.value;
            api.sourcelabel = pd.o.bl.value;
            api.wrap = pd.o.wd.value;
            if (pd.o.dg.checked) {
                api.force_indent = true;
            }
            if (pd.o.dh.checked) {
                api.diffcomments = true;
            }
            if (pd.o.du.checked) {
                api.content = true;
            }
            if (pd.o.da.checked) {
                pd.o.cz = "\t";
            } else if (pd.o.dz.checked) {
                pd.o.cz = "\n";
            } else if (pd.o.dw.checked.checked) {
                pd.o.cz = pd.o.dc.value;
                if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                    pd.o.cz = pd.o.cz.replace("&", "&amp;");
                }
            } else {
                pd.o.cz = " ";
            }
            if (pd.o.ce.checked) {
                api.conditional = true;
            }
            api.inchar = pd.o.cz;
            if (!isNaN(pd.o.dq.value)) {
                pd.o.cn = Number(pd.o.dq.value);
                api.insize = pd.o.cn;
            }
            if (!pd.o.id.checked) {
                api.style = "noindent";
            }
            if (pd.o.hd.checked) {
                api.html = "html-yes";
            }
            if (pd.o.dy.checked) {
                api.quote = true;
            }
            if (pd.o.dn.checked) {
                api.semicolon = true;
            }
            if (pd.o.inline.checked) {
                api.diffview = "inline";
            }
            if ((/^([0-9]+)$/).test(c) && (c === "0" || c.charAt(0) !== "0")) {
                api.context = Number(c);
            } else {
                pd.o.context.value = "";
                api.context = "";
            }
            if (pd.o.jd.checked) {
                api.indent = "allman";
            }
            if (pd.o.bo.value === "" || pd.o.bo.value === "Error: source code is missing.") {
                pd.o.bo.value = "Error: source code is missing.";
                return;
            }
            if (pd.o.nx.value === "" || pd.o.nx.value === "Error: diff code is missing.") {
                pd.o.nx.value = "Error: diff code is missing.";
                return;
            }
            api.source = pd.o.bo.value;
            api.diff = pd.o.nx.value;
            api.mode = "diff";
            if (domain.test(api.diff) && (typeof XMLHttpRequest === "function" || typeof ActiveXObject === "function")) {
                (function () {
                    var a = (api.diff.indexOf("file:///") === 0) ? api.diff.split(":///")[1] : api.diff.split("://")[1],
                        b = a ? a.indexOf("/") : 0,
                        c,
                        xhr = (typeof XMLHttpRequest === "function") ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    if (location && location.href) {
                        c = location.href.split("://")[0];
                    }
                    if (!a || c !== api.diff.split("://")[0]) {
                        return;
                    }
                    if (b !== 0 && b !== -1) {
                        xhr.open("GET", "proxy.php?x=" + api.diff.replace(/(\s*)$/, "").replace(/%26/g, "&").replace(/%3F/, "?"), false);
                        xhr.send();
                        if (xhr.status === 200 || xhr.status === 0) {
                            api.diff = xhr.responseText;
                        }
                    }
                }());
            }
        }
        if (domain.test(api.source) && (typeof XMLHttpRequest === "function" || typeof ActiveXObject === "function")) {
            (function () {
                var a = (api.source.indexOf("file:///") === 0) ? api.source.split(":///")[1] : api.source.split("://")[1],
                    b = a ? a.indexOf("/") : 0,
                    c,
                    xhr = (typeof XMLHttpRequest === "function") ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                if (location && location.href) {
                    c = location.href.split("://")[0];
                }
                if (!a || c !== api.source.split("://")[0]) {
                    return;
                }
                if (b !== 0 && b !== -1) {
                    xhr.open("GET", "proxy.php?x=" + api.source.replace(/(\s*)$/, "").replace(/%26/g, "&").replace(/%3F/, "?"), false);
                    xhr.send();
                    if (xhr.status === 200 || xhr.status === 0) {
                        api.source = xhr.responseText;
                    }
                }
            }());
        }

        //this is where prettydiff is executed
        output = prettydiff(api);
        pd.o.zindex += 1;
        if (pd.o.bb.checked) {
            pd.o.bx.value = output[0];
            if (pd.o.sh.innerHTML.replace(/\s+/g, " ") === "Maximize Inputs") {
                pd.o.rh.innerHTML = output[1];
                pd.o.rg.style.zIndex = pd.o.zindex;
                pd.o.rg.style.display = "block";
            }
            if (pd.ls) {
                pd.o.stat.beau += 1;
                pd.o.stbeau.innerHTML = pd.o.stat.beau;
            }
        } else if (pd.o.dd && pd.o.dd.checked) {
            if (/^(<p><strong>Error:<\/strong> Please try using the option labeled ((&lt;)|<)em((&gt;)|>)Plain Text \(diff only\)((&lt;)|<)\/em((&gt;)|>)\.)/.test(output[0])) {
                pd.o.rf.innerHTML = "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (diff only)</em>. <span style='display:block'>The input does not appear to be markup, CSS, or JavaScript.</span></p>";
            } else if (pd.o.ps && pd.o.ps.checked) {
                pstyle.layout = "";
                pstyle.cdefault = "";
                pstyle.coffee = "";
                output[2] = output[1] + "<p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a &quot;.html&quot; file.</p><textarea rows='40' cols='80' id='textreport'>";
                output[0] = "<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool</title><meta name='robots' content='index, follow'/> <meta name='DC.title' content='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://prettydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' content='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' content='text/css'/><style type='text/css'>" + pd.o.css.core + pd.o.css["s" + pd.o.color] + "</style></head><body class='" + pd.o.color + "'><h1><a href='http://prettydiff.com/'>Pretty Diff - The difference tool</a></h1>" + output[1] + "<p>Accessibility note. &lt;em&gt; tags in the output represent character differences per lines compared.</p>" + output[0] + "</body></html>";
                pd.o.rf.innerHTML = output[2] + output[0].replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;") + "</textarea>";
            } else {
                pd.o.rf.innerHTML = output[1] + output[0];
            }
            pd.top(pd.o.re);
            pd.o.re.style.display = "block";
            if (pd.o.re.getElementsByTagName("p")[0].style.display === "none") {
                pd.minimize(pd.o.re.getElementsByTagName("button")[1]);
            }
            pd.o.re.style.right = "auto";
            if (pd.ls) {
                pd.o.stat.diff += 1;
                pd.o.stdiff.innerHTML = pd.o.stat.diff;
            }
        } else if (pd.o.mm.checked) {
            pd.o.mx.value = output[0];
            if (pd.o.sh.innerHTML.replace(/\s+/g, " ") === "Maximize Inputs") {
                pd.o.rj.innerHTML = output[1];
                pd.o.ri.style.zIndex = pd.o.zindex;
                pd.o.ri.style.display = "block";
            }
            if (pd.ls) {
                pd.o.stat.minn += 1;
                pd.o.stminn.innerHTML = pd.o.stat.minn;
            }
        }
        if (pd.ls) {
            (function () {
                var stat = [],
                    lang = "",
                    lango = {},
                    langv = pd.o.la[pd.o.la.selectedIndex].value,
                    size = 0,
                    codesize = 0;
                if (api.mode === "beautify") {
                    codesize = api.source.length + pd.o.slength.mi + pd.o.slength.bo + pd.o.slength.nx;
                    if (api.source.length < 2096000 && codesize < 4800000) {
                        localStorage.setItem("bi", api.source);
                        pd.o.slength.bi = api.source.length;
                    } else {
                        localStorage.setItem("bi", "");
                        pd.o.slength.bi = 0;
                    }
                } else if (api.mode === "minify") {
                    codesize = pd.o.slength.bi + api.source.length + pd.o.slength.bo + pd.o.slength.nx;
                    if (api.source.length < 2096000 && codesize < 4800000) {
                        localStorage.setItem("mi", api.source);
                        pd.o.slength.mi = api.source.length;
                    } else {
                        localStorage.setItem("mi", "");
                        pd.o.slength.mi = 0;
                    }
                } else if (api.mode === "diff") {
                    codesize = pd.o.slength.bi + pd.o.slength.mi + api.source.length + api.diff.length;
                    if (api.source.length < 2096000 && api.diff.length < 2096000 && codesize < 4800000) {
                        localStorage.setItem("bo", api.source);
                        localStorage.setItem("nx", api.diff);
                        localStorage.setItem("bl", api.sourcelabel);
                        localStorage.setItem("nl", api.difflabel);
                        pd.o.slength.bo = api.source.length;
                        pd.o.slength.nx = api.diff.length;
                    } else {
                        localStorage.setItem("bo", "");
                        localStorage.setItem("nx", "");
                        localStorage.setItem("bl", "");
                        localStorage.setItem("nl", "");
                        pd.o.slength.bo = 0;
                        pd.o.slength.nx = 0;
                    }
                }
                if (langv === "auto" && typeof output[1] === "string") {
                    lango = (/Language set to <strong>auto<\/strong>\. Presumed language is <em>\w+<\/em>\./).exec(output[1]);
                    if (lango !== null) {
                        lang = lango.toString();
                        lang = lang.substring(lang.indexOf("<em>") + 4, lang.indexOf("</em>"));
                        if (lang === "JavaScript" || lang === "JSON") {
                            pd.o.stat.js += 1;
                            pd.o.stjs.innerHTML = pd.o.stat.js;
                        } else if (lang === "CSS") {
                            pd.o.stat.css += 1;
                            pd.o.stcss.innerHTML = pd.o.stat.css;
                        } else if (lang === "HTML" || lang === "markup") {
                            pd.o.stat.markup += 1;
                            pd.o.stmarkup.innerHTML = pd.o.stat.markup;
                        }
                    }
                } else if (langv === "csv") {
                    pd.o.stat.csv += 1;
                    pd.o.stcsv.innerHTML = pd.o.stat.csv;
                } else if (langv === "text") {
                    pd.o.stat.text += 1;
                    pd.o.sttext.innerHTML = pd.o.stat.text;
                } else if (langv === "javascript") {
                    pd.o.stat.js += 1;
                    pd.o.stjs.innerHTML = pd.o.stat.js;
                } else if (langv === "markup" || langv === "html") {
                    pd.o.stat.markup += 1;
                    pd.o.stmarkup.innerHTML = pd.o.stat.markup;
                } else if (langv === "css") {
                    pd.o.stat.css += 1;
                    pd.o.stcss.innerHTML = pd.o.stat.css;
                }
                if (api.mode === "diff" && api.diff.length > api.source.length) {
                    size = api.diff.length;
                } else {
                    size = api.source.length;
                }
                if (size > pd.o.stat.large) {
                    pd.o.stat.large = size;
                    pd.o.stlarge.innerHTML = size;
                }
                stat.push(pd.o.stat.visit);
                stat.push(pd.o.stat.usage);
                stat.push(pd.o.stat.fdate);
                stat.push(pd.o.stat.avday);
                stat.push(pd.o.stat.diff);
                stat.push(pd.o.stat.beau);
                stat.push(pd.o.stat.minn);
                stat.push(pd.o.stat.markup);
                stat.push(pd.o.stat.js);
                stat.push(pd.o.stat.css);
                stat.push(pd.o.stat.csv);
                stat.push(pd.o.stat.text);
                stat.push(pd.o.stat.large);
                stat.push(pd.o.stat.pdate);
                localStorage.setItem("statdata", stat.join("|"));
            }());
        }
    };

    //stores position information of floating report windows without
    //looking to localStorage each and every time
    pd.position = {
        diffreport: {},
        beaureport: {},
        minreport: {},
        statreport: {}
    };

    //stores option information without looking into localStorage each
    //and every time
    pd.optionString = [];

    //stores webtool information without looking into localStorage each
    //and every time
    pd.webtool = [];

    //intelligently raise the z-index of the report windows
    pd.top = function (x) {
        var a = pd.o.zindex,
            b = [Number(pd.o.re.style.zIndex), Number(pd.o.rg.style.zIndex), Number(pd.o.ri.style.zIndex), Number(pd.o.rk.style.zIndex)],
            c = Math.max(a, b[0], b[1], b[2], b[3]) + 1;
        pd.o.zindex = c;
        x.style.zIndex = c;
    };

    //read from files if the W3C File API is supported
    pd.file = function (a, b) {
        var c = function () {},
            d = function () {},
            f = {},
            g = [],
            h = 0,
            i = 0;
        pd.o.dd = pd.$$("modediff");
        if (pd.fs && a[0] !== null && typeof a[0] === "object") {
            if (b.nodeName === "input") {
                b = b.parentNode.parentNode.getElementsByTagName("textarea")[0];
            }
            c = function (e) {
                var event = e || window.event;
                g.push(event.target.result);
                if (i === h) {
                    b.value = g.join("\n\n");
                    if (!pd.o.dd.checked) {
                        pd.recycle();
                    }
                }
            };
            d = function (e) {
                var event = e || window.event;
                b.value = "Error reading file: " + a[i].name + "\n\nThis is the browser's descriptiong: " + event.target.error.name;
                h = -1;
            };
            h = a.length;
            for (i = 0; i < h; i += 1) {
                f = new FileReader();
                f.onload = c;
                f.onerror = d;
                f.readAsText(a[i], "UTF-8");
            }
        }
    };

    pd.filenull = function (e) {
        var event = e || window.event;
        event.stopPropagation();
        event.preventDefault();
    };

    pd.filedrop = function (e) {
        var event = e || window.event,
            files = event.target.files || event.dataTransfer.files;
        event.stopPropagation();
        event.preventDefault();
        pd.file(files, this);
    };

    //change the color scheme of the web UI
    pd.colorScheme = function (x) {
        var a = x.selectedIndex,
            b = x.getElementsByTagName("option"),
            c = b[a].innerHTML.toLowerCase().replace(/\s+/g, ""),
            d = "";
        pd.o.wb.className = c;
        pd.o.color = c;
        if (pd.o.pdlogo !== null) {
            switch (c) {
            case "default":
                d = "234";
                break;
            case "coffee":
                d = "654";
                break;
            case "dark":
                d = "8ad";
                break;
            case "canvas":
                d = "664";
                break;
            case "shadow":
                d = "999";
                break;
            case "white":
                d = "666";
                break;
            default:
                d = "000";
                break;
            }
            pd.o.pdlogo.style.borderColor = "#" + d;
            pd.o.pdlogo.getElementsByTagName("g")[0].setAttribute("fill", "#" + d);
        }
        pd.options("colorScheme");
    };

    //minimize report windows to the default size and location
    pd.minimize = function (x) {
        var a = x.parentNode,
            b = a.parentNode,
            c = b.getElementsByTagName("div")[0],
            d = b.getElementsByTagName("h3")[0],
            f = b.getAttribute("id"),
            test = (b === pd.o.re) ? true : false,
            g = (test) ? a.getElementsByTagName("button")[1] : a.getElementsByTagName("button")[0],
            h = (test) ? a.getElementsByTagName("button")[2] : a.getElementsByTagName("button")[1];

        //shrink
        if (x.innerHTML === "\u035f") {
            if (!pd.position[f]) {
                pd.position[f] = {};
            }
            if (h.innerHTML === "\u2191") {
                pd.position[f].top = (b.offsetTop / 10);
                pd.position[f].left = (b.offsetLeft / 10);
                pd.position[f].height = (c.clientHeight / 10) - 3.7;
                pd.position[f].width = (c.clientWidth / 10) - 0.4;
            } else {
                h.innerHTML = "\u2191";
            }
            g.innerHTML = "\u2191";
            b.style.left = "auto";
            a.style.display = "none";
            b.style.borderWidth = "0em";
            b.style.top = "auto";
            b.style.zIndex = "2";
            if (b === pd.o.re) {
                b.style.right = "57.8em";
            } else if (b === pd.o.rg) {
                b.style.right = "38.8em";
            } else if (b === pd.o.ri) {
                b.style.right = "19.8em";
            } else if (b === pd.o.rk) {
                b.style.right = ".8em";
            }
            if (pd.o.zindex > 2) {
                pd.o.zindex -= 3;
                a.style.zIndex = pd.o.zindex;
            }
            c.style.display = "none";
            d.style.borderLeftStyle = "solid";
            d.style.borderTopStyle = "solid";
            d.style.cursor = "pointer";
            d.style.width = "17em";
            d.style.margin = "0em 0em -3.2em 0.1em";
            x.innerHTML = "\u2191";

            //grow
        } else {
            pd.top(b);
            g.innerHTML = "\u2191";
            a.style.display = "block";
            b.style.borderWidth = ".1em";
            c.style.display = "block";
            d.style.cursor = "move";
            d.style.borderLeftStyle = "none";
            d.style.borderTopStyle = "none";
            d.style.margin = "0.1em 1.7em -3.2em 0.1em";
            if (pd.position && pd.position[f] && pd.position[f].top) {
                b.style.right = "auto";
                b.style.top = pd.position[f].top + "em";
                b.style.left = pd.position[f].left + "em";
                if (b === pd.o.re) {
                    d.style.width = (pd.position[f].width - 9.71) + "em";
                } else {
                    d.style.width = (pd.position[f].width - 6.71) + "em";
                }
                c.style.width = pd.position[f].width + "em";
                c.style.height = pd.position[f].height + "em";
            } else {
                b.style.left = (b.offsetLeft / 10) + "em";
                if (b === pd.o.re) {
                    d.style.width = "65.24em";
                } else {
                    d.style.width = "68.24em";
                }
                b.style.right = "auto";
                c.width = "75em";
            }
            x.innerHTML = "\u035f";
        }
        pd.options(b);
    };

    //maximize report window to available browser window
    pd.maximize = function (x) {
        var a = x.parentNode.parentNode,
            b = a.getElementsByTagName("h3")[0],
            c = a.getElementsByTagName("div")[0],
            d = (document.body.parentNode.scrollTop > document.body.scrollTop) ? document.body.parentNode.scrollTop : document.body.scrollTop,
            e = (document.body.parentNode.scrollLeft > document.body.scrollLeft) ? document.body.parentNode.scrollLeft : document.body.scrollLeft,
            f = a.getAttribute("id"),
            g = x.parentNode.getElementsByTagName("button"),
            h = g[g.length - 1];
        pd.top(a);
        if (x.innerHTML === "\u2191") {
            x.innerHTML = "\u2193";
            x.setAttribute("title", "Return this dialogue to its prior size and location.");
            pd.position[f] = {};
            pd.position[f].top = (a.offsetTop / 10);
            pd.position[f].left = (a.offsetLeft / 10);
            pd.position[f].height = (c.clientHeight / 10) - 3.7;
            pd.position[f].width = (c.clientWidth / 10) - 0.4;
            pd.position[f].zindex = a.style.zIndex;
            a.style.top = (d / 10) + "em";
            a.style.left = (e / 10) + "em";
            if (window.innerHeight) {
                c.style.height = ((window.innerHeight / 10) - 5.5) + "em";
                if (a === pd.o.re) {
                    b.style.width = ((window.innerWidth / 10) - 13.76) + "em";
                } else {
                    b.style.width = ((window.innerWidth / 10) - 10.76) + "em";
                }
                c.style.width = ((window.innerWidth / 10) - 4.1) + "em";
            } else {
                c.style.height = ((window.screen.availHeight / 10) - 21) + "em";
                if (a === pd.o.re) {
                    b.style.width = ((window.screen.availWidth / 10) - 17.76) + "em";
                } else {
                    b.style.width = ((window.screen.availWidth / 10) - 14.76) + "em";
                }
                c.style.width = ((window.screen.availWidth / 10) - 5.1) + "em";
            }
            h.style.display = "none";
        } else {
            x.innerHTML = "\u2191";
            x.setAttribute("title", "Maximize this dialogue to the browser window.");
            if (pd.position && pd.position[f] && pd.position[f].top) {
                a.style.top = pd.position[f].top + "em";
                a.style.left = pd.position[f].left + "em";
                if (a === pd.o.re) {
                    b.style.width = (pd.position[f].width - 9.76) + "em";
                } else {
                    b.style.width = (pd.position[f].width - 6.76) + "em";
                }
                c.style.width = pd.position[f].width + "em";
                c.style.height = pd.position[f].height + "em";
            }
            a.style.zIndex = pd.position[f].zindex;
            h.style.display = "block";
            pd.options(a);
        }
    };

    //resize report window to custom width and height on drag
    pd.resize = function (e, x) {
        var a = x.parentNode.parentNode,
            b = a.getElementsByTagName("div")[0],
            c = a.getElementsByTagName("h3")[0],
            bx = b.clientWidth,
            by = b.clientHeight,
            drop = function (g) {
                document.onmousemove = null;
                bx = b.clientWidth;
                by = b.clientHeight;
                g = null;
                pd.options(a);
                document.onmouseup = null;
            },
            boxsize = function (f) {
                f = f || window.event;
                b.style.width = ((bx + ((f.clientX - 4) - b.mouseX)) / 10) + "em";
                if (a === pd.o.re) {
                    c.style.width = (((bx + (f.clientX - b.mouseX)) / 10) - 10.24) + "em";
                } else {
                    c.style.width = (((bx + (f.clientX - b.mouseX)) / 10) - 7.24) + "em";
                }
                b.style.height = ((by + ((f.clientY - 36) - b.mouseY)) / 10) + "em";
                document.onmouseup = drop;
            };
        pd.top(a);
        e = e || window.event;
        b.mouseX = e.clientX;
        b.mouseY = e.clientY;
        document.onmousemove = boxsize;
        document.onmousedown = null;
    };

    //toggle between parsed html diff report and raw text representation
    pd.save = function (x) {
        var a = pd.o.rf.innerHTML,
            b = [],
            c = "",
            d = [],
            e = {},
            f = 0,
            g = {};
        
        //added support for Firefox and Opera because they support long
        //URIs.  This extra support allows for local file creation.
        if (x.nodeName.toLowerCase() === "a") {
            if (a === "" || (/Please try using the option labeled ((&lt;)|<)em((&gt;)|>)Plain Text \(diff only\)((&lt;)|<)\/em((&gt;)|>)\./.test(a) && !/table class\=("|')diff("|')/.test(a))) {
                return false;
            }
            c = "<table";
            d = a.split(c);
            b.push("<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool</title><meta name='robots' content='index, follow'/> <meta name='DC.title' content='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://prettydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' content='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' content='text/css'/><style type='text/css'>" + pd.o.css.core + pd.o.css["s" + pd.o.color] + "</style></head><body class='" + pd.o.color + "'><h1><a href='http://prettydiff.com/'>Pretty Diff - The difference tool</a></h1><div id='doc'>");
            b.push(d[0]);
            b.push("<p>Accessibility note. &lt;em&gt; tags in the output represent character differences per lines compared.</p></div>");
            b.push(c);
            b.push(d[1]);
            b.push("</body></html>");
            x.setAttribute("href", "data:text/prettydiff;charset=utf-8," + encodeURIComponent(b.join("")));
            
            //prompt to save file created above.  below is the creation
            //of the modal with instructions about file extension.
            e = pd.o.wb.lastChild;
            if (e.nodeType > 1 || e.nodeName.toLowerCase() === "script") {
                do {
                    e = e.previousSibling;
                } while (e.nodeType > 1 || e.nodeName.toLowerCase() === "script");
            }
            f = e.offsetTop + e.clientHeight + 20;
            e = document.createElement("div");
            e.setAttribute("onclick", "this.parentNode.removeChild(this)");
            e.setAttribute("id", "modalSave");
            g = document.createElement("span");
            g.style.width = (pd.o.wb.clientWidth + 10) + "px";
            g.style.height = f + "px";
            e.appendChild(g);
            g = document.createElement("p");
            g.innerHTML = "Just rename the file extension from '<strong>.part</strong>' to '<strong>.xhtml</strong>'. <em>Click anywhere to close this reminder.</em>";
            e.appendChild(g);
            pd.o.wb.appendChild(e);
            g.style.left = (((pd.o.wb.clientWidth + 10) - g.clientWidth) / 2) + "px";
            return;
        } else {
            //Webkit and IE get the old functionality of a textarea with
            //HTML text content to copy and paste into a text file.
            pd.top(pd.o.re);
            if (/Please try using the option labeled ((&lt;)|<)em((&gt;)|>)Plain Text \(diff only\)((&lt;)|<)\/em((&gt;)|>)\./.test(a) && !/table class\=("|')diff("|')/.test(a)) {
                pd.o.rf.innerHTML = "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (diff only)</em>. <span style='display:block'>The input does not appear to be markup, CSS, or JavaScript.</span></p>";
                return;
            }
            if (x.innerHTML === "S") {
                pd.o.ps.checked = true;
                if (a !== "") {
                    c = "<table";
                    d = a.split(c);
                    c = c + d[1];
                    a = d[0];
                    b.push(a);
                    b.push(" <p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a &quot;.html&quot; file.</p> <textarea rows='40' cols='80' id='textreport'>");
                    b.push("&lt;?xml version='1.0' encoding='UTF-8' ?&gt;&lt;!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'&gt;&lt;html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'&gt;&lt;head&gt;&lt;title&gt;Pretty Diff - The difference tool&lt;/title&gt;&lt;meta name='robots' content='index, follow'/&gt; &lt;meta name='DC.title' content='Pretty Diff - The difference tool'/&gt; &lt;link rel='canonical' href='http://prettydiff.com/' type='application/xhtml+xml'/&gt;&lt;meta http-equiv='Content-Type' content='application/xhtml+xml;charset=UTF-8'/&gt;&lt;meta http-equiv='Content-Style-Type' content='text/css'/&gt;&lt;style type='text/css'&gt;" + pd.o.css.core + pd.o.css["s" + pd.o.color] + "&lt;/style&gt;&lt;/head&gt;&lt;body class='" + pd.o.color + "'&gt;&lt;h1&gt;&lt;a href='http://prettydiff.com/'&gt;Pretty Diff - The difference tool&lt;/a&gt;&lt;/h1&gt;&lt;div id='doc'&gt;");
                    b.push(a.replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;"));
                    b.push("&lt;p&gt;Accessibility note. &amp;lt;em&amp;gt; tags in the output represent character differences per lines compared.&lt;/p&gt;&lt;/div&gt;");
                    b.push(c.replace(/\&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;"));
                    b.push("&lt;/body&gt;&lt;/html&gt;</textarea>");
                }
                x.innerHTML = "H";
                x.setAttribute("title", "Convert diff report to an HTML table.");
            } else {
                pd.o.ps.checked = false;
                c = "<p>This is the generated diff output. Please copy the text output, paste into a text file, and save as a \".html\" file.</p>";
                if (a !== "") {
                    a = a.replace(/ xmlns\="http:\/\/www\.w3\.org\/1999\/xhtml"/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                    d = a.split(c);
                    b.push(d[0]);
                    c = (d[1].indexOf("table class=\"diff\"") === -1) ? "table class='diff'" : "table class=\"diff\"";
                    d[1] = d[1].substring(d[1].indexOf(c) + c.length, d[1].length);
                    d[1] = "<table class=\"diff\"" + (d[1].substring(0, d[1].length - 25));
                    b.push(d[1]);
                }
                x.innerHTML = "S";
                x.setAttribute("title", "Convert diff report to text that can be saved.");
            }
            pd.o.rf.innerHTML = b.join("");
            pd.options(x.parentNode);
        }
    };

    //basic drag and drop for the report windows
    pd.grab = function (e, x) {
        var a = x.parentNode,
            b = a.getElementsByTagName("p")[0].style.display,
            c = {},
            d = a.lastChild,
            h = a.firstChild,
            i = 0,
            j = navigator.userAgent,
            ax = a.offsetLeft,
            ay = a.offsetTop,
            drop = function (g) {
                document.onmousemove = null;
                ax = a.offsetLeft;
                ay = a.offsetTop;
                g = null;
                pd.options(a);
                document.onmouseup = null;
                d.style.opacity = "1";
                a.style.height = "auto";
                h.style.top = "100%";
            },
            boxmove = function (f) {
                f = f || window.event;
                a.style.right = "auto";
                a.style.left = ((ax + (f.clientX - a.mouseX)) / 10) + "em";
                a.style.top = ((ay + (f.clientY - a.mouseY)) / 10) + "em";
                document.onmouseup = drop;
            };
        if (b === "none") {
            if (a === pd.o.re) {
                c = a.getElementsByTagName("button")[1];
            } else {
                c = a.getElementsByTagName("button")[0];
            }
            a.style.left = "auto";
            pd.minimize(c);
            return;
        }
        pd.top(a);
        if (d.nodeType !== 1) {
            do {
                d = d.previousSibling;
            } while (d.nodeType !== 1);
        }
        if (h.nodeType !== 1) {
            do {
                h = h.nextSibling;
            } while (h.nodeType !== 1);
        }
        h = h.lastChild;
        if (h.nodeType !== 1) {
            do {
                h = h.previousSibling;
            } while (h.nodeType !== 1);
        }
        d.style.opacity = ".5";
        if (j.indexOf("Opera") > -1 && j.indexOf("Presto") > 0) {
            d.style.cssFloat = "right";
        }
        i = a.clientHeight;
        h.style.top = (i / 20) + "0em";
        a.style.height = ".1em";
        e = e || window.event;
        a.mouseX = e.clientX;
        a.mouseY = e.clientY;
        document.onmousemove = boxmove;
        document.onmousedown = null;
        pd.options(a);
    };

    //shows and hides the additional options
    pd.additional = function (x) {
        if (x === pd.o.an) {
            pd.o.ao.style.display = "none";
        } else if (x === pd.o.ay) {
            pd.o.ao.style.display = "block";
        }
        pd.options(x);
    };

    //resizes the pretty diff comment onmouseover
    pd.comment = function (e, x) {
        var a = Math.floor(pd.o.wb.clientWidth / 13),
            b = 0,
            event = e || window.event;
        if (x.nodeName.toLowerCase() === "p") {
            if (event.type === "mouseover") {
                event.type = "mouseout";
            }
            x = pd.o.option;
        }
        if (event.type === "mouseover") {
            b = x.value.length;
            x.style.height = Math.ceil((b / 1.6) / a) + ".5em";
            x.style.marginBottom = "-" + Math.ceil((b / 1.6) / a) + ".5em";
            x.style.paddingTop = "1em";
            x.style.position = "relative";
            x.style.width = (a - 4.7) + "em";
            x.style.zIndex = "5";
        } else {
            x.style.height = "2.5em";
            x.style.marginBottom = "-1.5em";
            x.style.paddingTop = "0em";
            x.style.position = "static";
            x.style.width = "100%";
            x.style.zIndex = "1";
        }
    };

    //toggle between tool modes and vertical/horizontal orientation of
    //textareas
    pd.prettyvis = function (a) {
        var b = "",
            c = 0,
            d = [],
            optioncheck = function () {
                var a = 0,
                    b = [];
                b = pd.o.la.getElementsByTagName("option");
                for (a = b.length - 1; a > -1; a -= 1) {
                    if (b[a].value === "text") {
                        if (pd.o.la.selectedIndex === a) {
                            pd.o.la.selectedIndex = 0;
                        }
                        b[a].disabled = true;
                    }
                }
            };
        b = pd.o.la[pd.o.la.selectedIndex].value;
        if (a === pd.o.bb) {
            optioncheck();
            if (pd.o.bi.value === "" && pd.o.mi.value !== "") {
                pd.o.bi.value = pd.o.mi.value;
            } else if (pd.o.bi.value === "" && pd.o.bo.value !== "") {
                pd.o.bi.value = pd.o.bo.value;
            }
            pd.o.bd.style.display = "block";
            pd.o.md.style.display = "none";
            if (pd.o.bt) {
                pd.o.bt.style.display = "none";
            }
            if (pd.o.nt) {
                pd.o.nt.style.display = "none";
            }
            if (pd.o.dops) {
                pd.o.dops.style.display = "none";
            }
            pd.o.mops.style.display = "none";
            if (b === "csv") {
                pd.o.bops.style.display = "none";
            } else {
                pd.o.bops.style.display = "block";
            }
        } else if (a === pd.o.mm) {
            optioncheck();
            if (pd.o.mi.value === "" && pd.o.bi.value !== "") {
                pd.o.mi.value = pd.o.bi.value;
            } else if (pd.o.mi.value === "" && pd.o.bo.value !== "") {
                pd.o.mi.value = pd.o.bo.value;
            }
            if (b === "text" || b === "csv") {
                pd.o.mops.style.display = "none";
            } else {
                pd.o.mops.style.display = "block";
            }
            pd.o.md.style.display = "block";
            pd.o.bd.style.display = "none";
            if (pd.o.bt) {
                pd.o.bt.style.display = "none";
            }
            if (pd.o.nt) {
                pd.o.nt.style.display = "none";
            }
            if (pd.o.dops) {
                pd.o.dops.style.display = "none";
            }
            pd.o.bops.style.display = "none";
        } else if (a === pd.o.dd) {
            d = pd.o.la.getElementsByTagName("option");
            for (c = d.length - 1; c > -1; c -= 1) {
                d[c].disabled = false;
            }
            if (pd.o.bo.value === "" && pd.o.bi.value !== "") {
                pd.o.bo.value = pd.o.bi.value;
            } else if (pd.o.bo.value === "" && pd.o.mi.value !== "") {
                pd.o.bo.value = pd.o.mi.value;
            }
            pd.o.bt.style.display = "block";
            pd.o.nt.style.display = "block";
            pd.o.bd.style.display = "none";
            pd.o.md.style.display = "none";
            pd.o.dops.style.display = "block";
            pd.o.bops.style.display = "none";
            pd.o.mops.style.display = "none";
            if (b === "csv" || b === "text") {
                pd.o.dqp.style.display = "none";
                pd.o.dqt.style.display = "none";
                pd.o.db.style.display = "none";
            } else {
                pd.o.dqp.style.display = "block";
                pd.o.dqt.style.display = "block";
                pd.o.db.style.display = "block";
            }
        } else if (a === pd.o.dp) {
            pd.o.mi.removeAttribute("style");
            pd.o.mx.removeAttribute("style");
            pd.o.bi.removeAttribute("style");
            pd.o.bx.removeAttribute("style");
            pd.o.bo.removeAttribute("style");
            pd.o.nx.removeAttribute("style");
            pd.o.bt.className = "wide";
            pd.o.nt.className = "wide";
            pd.o.bd.className = "wide";
            pd.o.md.className = "wide";
        } else if (a === pd.o.dt) {
            pd.o.mi.removeAttribute("style");
            pd.o.mx.removeAttribute("style");
            pd.o.bi.removeAttribute("style");
            pd.o.bx.removeAttribute("style");
            pd.o.bo.removeAttribute("style");
            pd.o.nx.removeAttribute("style");
            pd.o.bt.className = "difftall";
            pd.o.nt.className = "difftall";
            pd.o.bd.className = "tall";
            pd.o.md.className = "tall";
        }
        pd.options(a);
    };

    //alters available options depending upon language selection
    pd.codeOps = function (x) {
        var a = "";
        pd.o.bb = pd.$$("modebeautify");
        pd.o.dd = pd.$$("modediff");
        pd.o.mm = pd.$$("modeminify");
        pd.o.la = pd.$$("language");
        pd.o.ay = pd.$$("additional_yes");
        if (pd.o.ay.checked) {
            pd.o.ao.style.display = "block";
        }
        a = pd.o.la[pd.o.la.selectedIndex].value;
        if (pd.o.dd.checked) {
            pd.o.mops.style.display = "none";
            pd.o.bops.style.display = "none";
            if (a === "text" || a === "csv") {
                pd.o.dqp.style.display = "none";
                pd.o.dqt.style.display = "none";
                pd.o.db.style.display = "none";
            } else {
                pd.o.dqp.style.display = "block";
                pd.o.dqt.style.display = "block";
                pd.o.db.style.display = "block";
            }
        } else if (pd.o.bb.checked) {
            pd.o.mops.style.display = "none";
            pd.o.dops.style.display = "none";
            if (a === "csv") {
                pd.o.bops.style.display = "none";
            } else {
                pd.o.bops.style.display = "block";
            }
        } else if (pd.o.mm.checked) {
            pd.o.bops.style.display = "none";
            pd.o.dops.style.display = "none";
            if (a === "csv") {
                pd.o.mops.style.display = "none";
                pd.o.ao.style.display = "none";
            } else {
                pd.o.mops.style.display = "block";
            }
        }
        if (a === "csv") {
            pd.o.csvp.style.display = "block";
        } else {
            pd.o.csvp.style.display = "none";
        }
        if (a === "csv" || a === "text") {
            pd.o.db.style.display = "none";
        } else {
            pd.o.db.style.display = "block";
        }
        if (a === "html") {
            pd.o.hd.checked = true;
            pd.o.hm.checked = true;
            pd.o.hy.checked = true;
        } else {
            pd.o.he.checked = true;
            pd.o.hn.checked = true;
            pd.o.hz.checked = true;
        }
        pd.options(x);
    };

    //provides interaction to simulate a text input into a radio button
    //set with appropriate accessbility response
    pd.indentchar = function (x) {
        pd.o.bc = pd.$$("beau-char");
        pd.o.dc = pd.$$("diff-char");
        if (pd.o.bb.checked && x === pd.o.bc) {
            pd.o.bw.checked = true;
        } else if (pd.o.dd.checked && x === pd.o.dc) {
            pd.o.dw.checked = true;
        }
        if (pd.o.bb.checked && pd.o.bw.checked) {
            pd.o.bc.className = "checked";
            if (pd.o.bc.value === "Click me for custom input") {
                pd.o.bc.value = "";
            }
        } else if (pd.o.bb.checked) {
            if (pd.o.bc.value === "") {
                pd.o.bc.value = "Click me for custom input";
            }
            pd.o.bc.className = "unchecked";
        } else if (pd.o.dd.checked && pd.o.dw.checked) {
            pd.o.dc.className = "checked";
            if (pd.o.dc.value === "Click me for custom input") {
                pd.o.dc.value = "";
            }
        } else if (pd.o.dd.checked) {
            if (pd.o.dc.value === "") {
                pd.o.dc.value = "Click me for custom input";
            }
            pd.o.dc.className = "unchecked";
        }
        if (pd.o.bcv !== "") {
            pd.o.bc.value = pd.o.bcv;
        }
        if (pd.o.dcv !== "") {
            pd.o.dc.value = pd.o.dcv;
        }
        if (x !== pd.o.bc && x !== pd.o.dc) {
            pd.options(x);
        }
    };

    //store tool changes into localStorage in effort to maintain state
    pd.options = function (x) {
        var a = {},
            b = 0,
            c = "";
        if (!pd.ls) {
            return;
        }
        if (localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
            pd.webtool = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");
        }
        if (localStorage.hasOwnProperty("optionString") && localStorage.getItem("optionString") !== null) {
            pd.optionString = localStorage.getItem("optionString").replace(/prettydiffper/g, "%").split("prettydiffcsep");
        }
        pd.o.bb = pd.$$("modebeautify");
        pd.o.dd = pd.$$("modediff");
        pd.o.mm = pd.$$("modeminify");
        pd.o.dp = pd.$$("diffwide");
        pd.o.sh = pd.$$("hideOptions");
        pd.o.ps = pd.$$("diff-save");
        if (x === pd.o.la) {
            pd.optionString[0] = "api.lang: " + x.selectedIndex;
        } else if (x === pd.o.bb) {
            pd.optionString[1] = "api.mode: beautify";
        } else if (x === pd.o.mm) {
            pd.optionString[1] = "api.mode: minify";
        } else if (x === pd.o.dd) {
            pd.optionString[1] = "api.mode: diff";
        } else if (x === pd.o.ch) {
            pd.optionString[2] = "api.csvchar: \"" + pd.o.ch.value + "\"";
        } else if (x === pd.o.bq && pd.o.bb.checked && pd.o.bq.value !== "" && !isNaN(Number(pd.o.bq.value))) {
            pd.optionString[3] = "api.insize: " + pd.o.bq.value;
        } else if (x === pd.o.dq && pd.o.dd.checked && pd.o.dq.value !== "" && !isNaN(Number(pd.o.dq.value))) {
            pd.optionString[3] = "api.insize: " + pd.o.dq.value;
        } else if (x === pd.o.bc && pd.o.bb.checked && pd.o.bw.checked) {
            pd.o.cz = pd.o.bc.value;
            if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                pd.o.cz = pd.o.cz.replace("&", "&amp;");
            }
            pd.optionString[4] = "api.inchar: \"" + pd.o.cz + "\"";
            pd.o.bcv = pd.o.cz;
        } else if (x === pd.o.bw && pd.o.bb.checked) {
            pd.o.cz = pd.o.bc.value;
            if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                pd.o.cz = pd.o.cz.replace("&", "&amp;");
            }
            pd.optionString[4] = "api.inchar: \"" + pd.o.cz + "\"";
        } else if (x === pd.o.bs && pd.o.bb.checked) {
            pd.optionString[4] = "api.inchar: \" \"";
        } else if (x === pd.o.ba && pd.o.bb.checked) {
            pd.optionString[4] = "api.inchar: \"\\t\"";
        } else if (x === pd.o.bn && pd.o.bb.checked) {
            pd.optionString[4] = "api.inchar: \"\\n\"";
        } else if (x === pd.o.dc && pd.o.dd.checked && pd.o.dw.checked) {
            pd.o.cz = pd.o.dc.value;
            if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                pd.o.cz = pd.o.cz.replace("&", "&amp;");
            }
            pd.optionString[4] = "api.inchar: \"" + pd.o.cz + "\"";
            pd.o.dcv = pd.o.cz;
        } else if (x === pd.o.dw && pd.o.dd.checked) {
            pd.o.cz = pd.o.dc.value;
            if ((/^&/).test(pd.o.cz) && !(/;$/).test(pd.o.cz)) {
                pd.o.cz = pd.o.cz.replace("&", "&amp;");
            }
            pd.optionString[4] = "api.inchar: \"" + pd.o.cz + "\"";
        } else if (x === pd.o.ds && pd.o.dd.checked) {
            pd.optionString[4] = "api.inchar: \" \"";
        } else if (x === pd.o.da && pd.o.dd.checked) {
            pd.optionString[4] = "api.inchar: \"\\t\"";
        } else if (x === pd.o.dz && pd.o.dd.checked) {
            pd.optionString[4] = "api.inchar: \"\\n\"";
        } else if (x === pd.o.iy && pd.o.bb.checked) {
            pd.optionString[5] = "api.comments: indent";
        } else if (x === pd.o.iz && pd.o.bb.checked) {
            pd.optionString[5] = "api.comments: noindent";
        } else if (x === pd.o.js && pd.o.bb.checked) {
            pd.optionString[6] = "api.indent: allman";
        } else if (x === pd.o.jt && pd.o.bb.checked) {
            pd.optionString[6] = "api.indent: knr";
        } else if (x === pd.o.jd && pd.o.dd.checked) {
            pd.optionString[6] = "api.indent: allman";
        } else if (x === pd.o.je && pd.o.dd.checked) {
            pd.optionString[6] = "api.indent: knr";
        } else if (x === pd.o.is && pd.o.bb.checked) {
            pd.optionString[7] = "api.style: indent";
        } else if (x === pd.o.it && pd.o.bb.checked) {
            pd.optionString[7] = "api.stylet: noindent";
        } else if (x === pd.o.id && pd.o.dd.checked) {
            pd.optionString[7] = "api.style: indent";
        } else if (x === pd.o.ie && pd.o.dd.checked) {
            pd.optionString[7] = "api.style: noindent";
        } else if (x === pd.o.hy && pd.o.bb.checked) {
            pd.optionString[8] = "api.html: html-yes";
        } else if (x === pd.o.hz && pd.o.bb.checked) {
            pd.optionString[8] = "api.html: html-no";
        } else if (x === pd.o.hm && pd.o.mm.checked) {
            pd.optionString[8] = "api.html: html-yes";
        } else if (x === pd.o.hn && pd.o.mm.checked) {
            pd.optionString[8] = "api.html: html-no";
        } else if (x === pd.o.hd && pd.o.dd.checked) {
            pd.optionString[8] = "api.html: html-yes";
        } else if (x === pd.o.he && pd.o.dd.checked) {
            pd.optionString[8] = "api.html: html-no";
        } else if (x === pd.o.context) {
            c = pd.o.context.value;
            if ((/^([0-9]+)$/).test(c) && (c === "0" || c.charAt(0) !== "0")) {
                pd.optionString[9] = "api.context: " + c;
            } else {
                pd.optionString[9] = "api.context: \"\"";
            }
        } else if (x === pd.o.du) {
            pd.optionString[10] = "api.content: true";
        } else if (x === pd.o.dx) {
            pd.optionString[10] = "api.content: false";
        } else if (x === pd.o.dr) {
            pd.optionString[11] = "api.quote: false";
        } else if (x === pd.o.dy) {
            pd.optionString[11] = "api.quote: true";
        } else if (x === pd.o.dm) {
            pd.optionString[12] = "api.semicolon: false";
        } else if (x === pd.o.dn) {
            pd.optionString[12] = "api.semicolon: true";
        } else if (x === pd.o.inline) {
            pd.optionString[13] = "api.diffview: inline";
        } else if (x === pd.o.sideby) {
            pd.optionString[13] = "api.diffview: sidebyside";
        } else if (x === pd.o.mb) {
            pd.optionString[14] = "api.topcoms: false";
        } else if (x === pd.o.mc) {
            pd.optionString[14] = "api.topcoms: true";
        } else if (x === pd.o.bg || x === pd.o.dg) {
            pd.optionString[15] = "api.force_indent: true";
        } else if (x === pd.o.bf || x === pd.o.df) {
            pd.optionString[15] = "api.force_indent: false";
        } else if (x === pd.o.ce || x === pd.o.cg) {
            pd.optionString[16] = "api.conditional: true";
        } else if (x === pd.o.cd || x === pd.o.cf) {
            pd.optionString[16] = "api.conditional: false";
        } else if (x === pd.o.dh) {
            pd.optionString[17] = "api.diffcomments: true";
        } else if (x === pd.o.di) {
            pd.optionString[17] = "api.diffcomments: false";
        } else if (x === pd.o.wc && !isNaN(pd.o.wc.value)) {
            pd.optionString[18] = "api.wrap: " + pd.o.wc.value;
        } else if (x === pd.o.wd && !isNaN(pd.o.wd.value)) {
            pd.optionString[18] = "api.wrap: " + pd.o.wd.value;
        } else if (x === pd.o.re) {
            pd.o.re = pd.$$("diffreport");
            pd.o.rf = pd.$$("diffreportbody");
            if (pd.o.rf.style.display === "none") {
                pd.webtool[4] = "diffreportmin: 1";
            } else {
                pd.webtool[3] = "diffreportzindex: " + pd.o.re.style.zIndex;
                pd.webtool[4] = "diffreportmin: 0";
                pd.webtool[5] = "diffreportleft: " + pd.o.re.offsetLeft;
                pd.webtool[6] = "diffreporttop: " + pd.o.re.offsetTop;
                pd.webtool[7] = "diffreportwidth: " + ((pd.o.rf.clientWidth / 10) - 0.3);
                pd.webtool[8] = "diffreportheight: " + ((pd.o.rf.clientHeight / 10) - 3.6);
            }
        } else if (x === pd.o.rg) {
            pd.o.rg = pd.$$("beaureport");
            pd.o.rh = pd.$$("beaureportbody");
            if (pd.o.rh.style.display === "none") {
                pd.webtool[10] = "beaureportmin: 1";
            } else {
                pd.webtool[9] = "beaureportzindex: " + pd.o.rg.style.zIndex;
                pd.webtool[10] = "beaureportmin: 0";
                pd.webtool[11] = "beaureportleft: " + pd.o.rg.offsetLeft;
                pd.webtool[12] = "beaureporttop: " + pd.o.rg.offsetTop;
                pd.webtool[13] = "beaureportwidth: " + ((pd.o.rh.clientWidth / 10) - 0.3);
                pd.webtool[14] = "beaureportheight: " + ((pd.o.rh.clientHeight / 10) - 3.6);
            }
        } else if (x === pd.o.ri) {
            pd.o.ri = pd.$$("minreport");
            pd.o.rj = pd.$$("minreportbody");
            if (pd.o.rj.style.display === "none") {
                pd.webtool[16] = "minnreportmin: 1";
            } else {
                pd.webtool[15] = "minnreportzindex: " + pd.o.ri.style.zIndex;
                pd.webtool[16] = "minnreportmin: 0";
                pd.webtool[17] = "minnreportleft: " + pd.o.ri.offsetLeft;
                pd.webtool[18] = "minnreporttop: " + pd.o.ri.offsetTop;
                pd.webtool[19] = "minnreportwidth: " + ((pd.o.rj.clientWidth / 10) - 0.3);
                pd.webtool[20] = "minnreportheight: " + ((pd.o.rj.clientHeight / 10) - 3.6);
            }
        } else if (x === pd.o.rk) {
            pd.o.rk = pd.$$("statreport");
            pd.o.rl = pd.$$("statreportbody");
            if (pd.o.rl.style.display === "none") {
                pd.webtool[22] = "statreportmin: 1";
            } else {
                pd.webtool[21] = "statreportzindex: " + pd.o.rk.style.zIndex;
                pd.webtool[22] = "statreportmin: 0";
                pd.webtool[23] = "statreportleft: " + pd.o.rk.offsetLeft;
                pd.webtool[24] = "statreporttop: " + pd.o.rk.offsetTop;
                pd.webtool[25] = "statreportwidth: " + ((pd.o.rl.clientWidth / 10) - 0.3);
                pd.webtool[26] = "statreportheight: " + ((pd.o.rl.clientHeight / 10) - 3.6);
            }
        } else if (x === pd.o.an) {
            pd.webtool[27] = "additional: no";
        } else if (x === pd.o.ay) {
            pd.webtool[27] = "additional: yes";
        } else if (x === "colorScheme") {
            pd.webtool[28] = "colorScheme: " + pd.o.color;
        }
        if (typeof pd.webtool[28] !== "string") {
            pd.webtool[28] = "colorScheme: shadow";
        } else if (typeof pd.webtool[4] !== "string") {
            pd.o.re = pd.$$("diffreport");
            pd.o.rf = pd.$$("diffreportbody");
            if (pd.o.rf.style.display === "none") {
                pd.webtool[4] = "diffreportmin: 1";
            } else {
                pd.webtool[3] = "diffreportzindex: " + pd.o.re.style.zIndex;
                pd.webtool[4] = "diffreportmin: 0";
                pd.webtool[5] = "diffreportleft: " + pd.o.re.offsetLeft;
                pd.webtool[6] = "diffreporttop: " + pd.o.re.offsetTop;
                pd.webtool[7] = "diffreportwidth: " + ((pd.o.rf.clientWidth / 10) - 0.3);
                pd.webtool[8] = "diffreportheight: " + ((pd.o.rf.clientHeight / 10) - 3.6);
            }
        } else if (typeof pd.webtool[10] !== "string") {
            pd.o.rg = pd.$$("beaureport");
            pd.o.rh = pd.$$("beaureportbody");
            if (pd.o.rh.style.display === "none") {
                pd.webtool[10] = "beaureportmin: 1";
            } else {
                pd.webtool[9] = "beaureportzindex: " + pd.o.rg.style.zIndex;
                pd.webtool[10] = "beaureportmin: 0";
                pd.webtool[11] = "beaureportleft: " + pd.o.rg.offsetLeft;
                pd.webtool[12] = "beaureporttop: " + pd.o.rg.offsetTop;
                pd.webtool[13] = "beaureportwidth: " + ((pd.o.rh.clientWidth / 10) - 0.3);
                pd.webtool[14] = "beaureportheight: " + ((pd.o.rh.clientHeight / 10) - 3.6);
            }
        } else if (typeof pd.webtool[16] !== "string") {
            pd.o.ri = pd.$$("minreport");
            pd.o.rj = pd.$$("minreportbody");
            if (pd.o.rj.style.display === "none") {
                pd.webtool[16] = "minnreportmin: 1";
            } else {
                pd.webtool[15] = "minnreportzindex: " + pd.o.ri.style.zIndex;
                pd.webtool[16] = "minnreportmin: 0";
                pd.webtool[17] = "minnreportleft: " + pd.o.ri.offsetLeft;
                pd.webtool[18] = "minnreporttop: " + pd.o.ri.offsetTop;
                pd.webtool[19] = "minnreportwidth: " + ((pd.o.rj.clientWidth / 10) - 0.3);
                pd.webtool[20] = "minnreportheight: " + ((pd.o.rj.clientHeight / 10) - 3.6);
            }
        } else if (typeof pd.webtool[22] !== "string") {
            pd.o.rk = pd.$$("statreport");
            pd.o.rl = pd.$$("statreportbody");
            if (pd.o.rl.style.display === "none") {
                pd.webtool[22] = "statreportmin: 1";
            } else {
                pd.webtool[21] = "statreportzindex: " + pd.o.rk.style.zIndex;
                pd.webtool[22] = "statreportmin: 0";
                pd.webtool[23] = "statreportleft: " + pd.o.rk.offsetLeft;
                pd.webtool[24] = "statreporttop: " + pd.o.rk.offsetTop;
                pd.webtool[25] = "statreportwidth: " + ((pd.o.rl.clientWidth / 10) - 0.3);
                pd.webtool[26] = "statreportheight: " + ((pd.o.rl.clientHeight / 10) - 3.6);
            }
        }
        if (pd.o.sh) {
            if (pd.o.sh.innerHTML.replace(/\s+/g, " ") === "Normal view") {
                pd.webtool[0] = "showhide: hide";
            } else {
                pd.webtool[0] = "showhide: show";
            }
        }
        if (x === pd.o.dt || !pd.o.dp || !pd.o.dp.checked) {
            pd.webtool[1] = "display: vertical";
        } else if (x === pd.o.dp || pd.o.dp.checked) {
            pd.webtool[1] = "display: horizontal";
        }
        if (pd.o.ps) {
            a = pd.o.re.getElementsByTagName("button")[0];
            if ((x === pd.o.ps && pd.o.ps.checked) || pd.o.ps.checked) {
                pd.webtool[2] = "diffsave: true";
                a.innerHTML = "H";
                a.setAttribute("title", "Convert diff report to text that can be saved.");
            } else if (x === pd.o.ps || !pd.o.ps.checked) {
                pd.webtool[2] = "diffsave: false";
                a.innerHTML = "S";
                a.setAttribute("title", "Convert diff report to an HTML table.");
            }
        }
        for (b = 0; b < 18; b += 1) {
            if (typeof pd.optionString[b] !== "string" || pd.optionString[b] === "") {
                pd.optionString[b] = "pdempty";
            }
        }
        if (pd.o.option !== null) {
            if (pd.optionString[4] === "api.inchar: \"&nbsp;\"") {
                pd.optionString[4] = "api.inchar: \" \"";
            }
            if (typeof pd.o.option.innerHTML === "string") {
                pd.o.option.innerHTML = ("/*prettydiff.com " + (pd.optionString.join(", ").replace(/pdempty(\, )?/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */")).replace(/^(\/\*prettydiff\.com (\, )+)/, "/*prettydiff.com ").replace(/(\,\s+\,\s+)+/g, ", ");
            }
            if (typeof pd.o.option.value === "string") {
                pd.o.option.value = ("/*prettydiff.com " + (pd.optionString.join(", ").replace(/pdempty(\, )?/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */")).replace(/^(\/\*prettydiff\.com (\, )+)/, "/*prettydiff.com ").replace(/(\,\s+\,\s+)+/g, ", ");
            }
        }
        if (pd.optionString[0] === "" || pd.optionString[0] === undefined) {
            if (pd.o.bb.checked) {
                pd.optionString[0] = "api.mode: beautify";
            } else if (pd.o.mm.checked) {
                pd.optionString[0] = "api.mode: minify";
            } else {
                pd.optionString[0] = "api.mode: diff";
            }
            localStorage.setItem("optionString", pd.optionString.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
            pd.optionString[0] = "";
        } else {
            localStorage.setItem("optionString", pd.optionString.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
        }

        //IMPORTANT the index for this loop must be one less than the
        //length on the parsed webtool storage. This limit prevents
        //excessive writing to the array which is corrupted each time
        //pd.options is executed
        for (b = 0; b < 28; b += 1) {
            if (pd.webtool[b] === "" || (typeof pd.webtool[b] === "string" && pd.webtool[b].indexOf("colorScheme") > -1)) {
                pd.webtool[b] = "pdempty";
            }
        }
        localStorage.setItem("webtool", pd.webtool.join("prettydiffcsep").replace(/(prettydiffcsep)+/g, "prettydiffcsep").replace(/%/g, "prettydiffper"));
    };

    pd.fixminreport = function () {
        var a = {},
            b = {},
            c = {},
            d = {};
        pd.o.re = pd.$$("diffreport");
        pd.o.rf = pd.$$("diffreportbody");
        pd.o.rg = pd.$$("beaureport");
        pd.o.rh = pd.$$("beaureportbody");
        pd.o.ri = pd.$$("minreport");
        pd.o.rj = pd.$$("minreportbody");
        a = pd.o.re.getElementsByTagName("h3")[0];
        b = pd.o.rg.getElementsByTagName("h3")[0];
        c = pd.o.ri.getElementsByTagName("h3")[0];
        if (pd.ls) {
            pd.o.rk = pd.$$("statreport");
            pd.o.rl = pd.$$("statreportbody");
            d = pd.o.rk.getElementsByTagName("h3")[0];
        }
        if (pd.o.rf.style.display === "none" && (a.style.width === "17em" || a.style.width === "")) {
            pd.o.re.style.right = "57.8em";
            pd.o.re.style.top = "auto";
            pd.o.re.style.left = "auto";
        }
        if (pd.o.rh.style.display === "none" && (b.style.width === "17em" || b.style.width === "")) {
            pd.o.rg.style.right = "38.8em";
            pd.o.rg.style.top = "auto";
            pd.o.rg.style.left = "auto";
        }
        if (pd.o.rj.style.display === "none" && (c.style.width === "17em" || c.style.width === "")) {
            pd.o.ri.style.right = "19.8em";
            pd.o.ri.style.top = "auto";
            pd.o.ri.style.left = "auto";
        }
        if (pd.ls && pd.o.rl.style.display === "none" && (d.style.width === "17em" || d.style.width === "")) {
            pd.o.rk.style.right = ".8em";
            pd.o.rk.style.top = "auto";
            pd.o.rk.style.left = "auto";
        }
    };

    //maximize textareas and hide options
    pd.hideOptions = function (x) {
        var a = "";
        if (!pd.o.dt) {
            return;
        }
        pd.o.bb = pd.$$("modebeautify");
        pd.o.dd = pd.$$("modediff");
        pd.o.mm = pd.$$("modeminify");
        pd.o.la = pd.$$("language");
        pd.o.dt = pd.$$("difftall");
        pd.o.ay = pd.$$("additional_yes");
        a = pd.o.la[pd.o.la.selectedIndex].value;
        if (x.innerHTML.replace(/\s+/g, " ") === "Maximize Inputs") {
            pd.o.op.style.display = "none";
            pd.o.bops.style.display = "none";
            pd.o.dops.style.display = "none";
            pd.o.mops.style.display = "none";
            pd.o.to.style.display = "none";
            pd.o.bd.className = "tall";
            pd.o.md.className = "tall";
            pd.o.bt.className = "difftall";
            pd.o.nt.className = "difftall";
            pd.o.bi.style.marginBottom = "1em";
            pd.o.mi.style.marginBottom = "1em";
            if (window.innerHeight) {
                pd.o.bi.style.height = ((Math.floor(window.innerHeight / 1.2) - 175) / 10) + "em";
                pd.o.mi.style.height = ((Math.floor(window.innerHeight / 1.2) - 175) / 10) + "em";
                pd.o.bx.style.height = ((Math.floor(window.innerHeight / 1.2) - 150) / 10) + "em";
                pd.o.mx.style.height = ((Math.floor(window.innerHeight / 1.2) - 150) / 10) + "em";
                pd.o.bo.style.height = ((Math.floor(window.innerHeight / 1.2) - 190) / 10) + "em";
                pd.o.nx.style.height = ((Math.floor(window.innerHeight / 1.2) - 190) / 10) + "em";
            } else {
                pd.o.bi.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                pd.o.mi.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                pd.o.bx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                pd.o.mx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 250) / 10) + "em";
                pd.o.bo.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 275) / 10) + "em";
                pd.o.nx.style.height = ((Math.floor(window.screen.availHeight / 1.2) - 275) / 10) + "em";
            }
            pd.o.disp.className = "maximized";
            x.innerHTML = "Normal view";
            pd.o.re.style.display = "none";
            pd.o.rg.style.display = "none";
            pd.o.ri.style.display = "none";
            pd.o.rk.style.display = "none";
            pd.o.ao.style.display = "none";
            pd.o.ci.style.margin = "0px";
        } else if (x.innerHTML === "Normal view") {
            pd.o.op.style.display = "block";
            if (pd.o.bb.checked && a !== "csv" && a !== "text") {
                pd.o.bops.style.display = "block";
            } else if (pd.o.dd.checked) {
                pd.o.dops.style.display = "block";
            } else if (pd.o.mm.checked && a !== "csv" && a !== "text") {
                pd.o.mops.style.display = "block";
            }
            pd.o.bi.style.height = "";
            pd.o.mi.style.height = "";
            pd.o.bx.style.height = "";
            pd.o.mx.style.height = "";
            pd.o.bo.style.height = "";
            pd.o.nx.style.height = "";
            pd.o.bi.style.margin = "0em";
            pd.o.mi.style.margin = "0em";
            if (typeof pd.position.diffreport === "object" && typeof pd.position.diffreport.display === "string" && pd.position.diffreport.display !== "none") {
                pd.o.re.style.display = "block";
            } else {
                pd.o.re.style.display = "none";
            }
            if (typeof pd.position.beaureport === "object" && typeof pd.position.beaureport.display === "string" && pd.position.diffreport.display !== "none") {
                pd.o.rg.style.display = "block";
            } else {
                pd.o.rg.style.display = "none";
            }
            if (typeof pd.position.minreport === "object" && typeof pd.position.minreport.display === "string" && pd.position.minreport.display !== "none") {
                pd.o.ri.style.display = "block";
            } else {
                pd.o.ri.style.display = "none";
            }
            if (typeof pd.position.statreport === "object" && typeof pd.position.statreport.display === "string" && pd.position.statreport.display !== "none") {
                pd.o.rk.style.display = "block";
            } else {
                pd.o.rk.style.display = "none";
            }
            if (pd.o.ay.checked) {
                pd.o.ao.style.display = "block";
            }
            if (!pd.o.dt.checked) {
                pd.o.bd.className = "wide";
                pd.o.md.className = "wide";
                pd.o.bt.className = "wide";
                pd.o.nt.className = "wide";
            }
            pd.o.to.style.display = "block";
            pd.o.disp.className = "default";
            x.innerHTML = "Maximize Inputs";
            pd.o.re.style.display = "block";
            pd.o.rg.style.display = "block";
            pd.o.ri.style.display = "block";
            pd.o.rk.style.display = "block";
            pd.o.ci.style.margin = "0 0 0 22.5em";
            pd.fixminreport();
        }
        pd.options(x);
        return false;
    };

    //reset tool to default configuration
    pd.reset = function () {
        var a = pd.o.re.getElementsByTagName("button"),
            b = 0,
            c = [];
        c = pd.o.la.getElementsByTagName("option");
        pd.o.la.selectedIndex = 0;
        for (b = c.length - 1; b > -1; b -= 1) {
            if (c[b].value === "text") {
                c[b].disabled = true;
            }
        }
        pd.optionString = [];
        pd.webtool = [];
        a[0].innerHTML = "S";
        a[1].innerHTML = "\u2191";
        pd.o.rf.style.display = "none";
        pd.o.re.style.display = "block";
        pd.o.re.style.left = "auto";
        pd.o.re.style.right = "59em";
        pd.o.re.style.zIndex = "2";
        pd.o.re.getElementsByTagName("p")[0].style.display = "none";
        pd.o.re.getElementsByTagName("h3")[0].style.width = "17em";
        pd.o.rh.style.display = "none";
        pd.o.rg.style.display = "block";
        pd.o.rg.style.left = "auto";
        pd.o.rg.style.right = "40em";
        pd.o.rg.style.zIndex = "2";
        pd.o.rg.getElementsByTagName("p")[0].style.display = "none";
        pd.o.rg.getElementsByTagName("h3")[0].style.width = "17em";
        pd.o.rj.style.display = "none";
        pd.o.ri.style.display = "block";
        pd.o.ri.style.left = "auto";
        pd.o.ri.style.right = "1";
        pd.o.ri.style.zIndex = "2";
        pd.o.ri.getElementsByTagName("p")[0].style.display = "none";
        pd.o.ri.getElementsByTagName("h3")[0].style.width = "17em";
        pd.o.rl.style.display = "none";
        pd.o.cs.selectedIndex = 0;
        pd.o.wb.className = "shadow";
        if (!pd.ls) {
            pd.o.rk.style.display = "none";
        } else {
            pd.o.rk.style.display = "block";
            pd.o.rk.style.left = "auto";
            pd.o.rk.style.right = "2em";
            pd.o.rk.style.zIndex = "2";
            pd.o.rk.getElementsByTagName("p")[0].style.display = "none";
            pd.o.rk.getElementsByTagName("h3")[0].style.width = "17em";
        }
        pd.o.bi.style.height = "";
        pd.o.mi.style.height = "";
        pd.o.bx.style.height = "";
        pd.o.mx.style.height = "";
        pd.o.disp.className = "default";
        pd.o.to.style.display = "block";
        pd.o.op.style.display = "block";
        if (pd.o.dops) {
            pd.o.dops.style.display = "block";
            pd.o.bops.style.display = "none";
        } else {
            pd.o.bops.style.display = "block";
        }
        if (pd.o.bt && pd.o.nt) {
            pd.o.bt.style.display = "block";
            pd.o.nt.style.display = "block";
            pd.o.bd.style.display = "none";
        } else {
            pd.o.bd.style.display = "block";
        }
        pd.o.mops.style.display = "none";
        pd.o.csvp.style.display = "none";
        pd.o.md.style.display = "none";
        if (pd.o.bt) {
            pd.o.bt.className = "difftall";
        }
        if (pd.o.nt) {
            pd.o.nt.className = "difftall";
        }
        pd.o.bd.className = "tall";
        pd.o.md.className = "tall";
        pd.o.option.value = "/*prettydiff.com */";
        pd.o.bq.value = "4";
        pd.o.bc.value = "Click me for custom input";
        pd.o.bc.style.color = "#888";
        pd.o.bs.checked = true;
        pd.o.is.checked = true;
        pd.o.hz.checked = true;
        pd.o.mb.checked = true;
        pd.o.hn.checked = true;
        pd.o.jt.checked = true;
        pd.o.bf.checked = true;
        pd.o.cd.checked = true;
        pd.o.cf.checked = true;
        pd.o.dh.checked = true;
        pd.o.wc.value = "72";
        pd.o.wd.value = "72";
        if (pd.o.bo) {
            pd.o.bo.style.height = "";
        }
        if (pd.o.nx) {
            pd.o.nx.style.height = "";
        }
        if (pd.o.dd) {
            pd.o.dd.checked = true;
        } else {
            pd.o.bb.checked = true;
        }
        if (pd.o.dt) {
            pd.o.dt.checked = true;
        }
        if (pd.o.sh) {
            pd.o.sh.innerHTML = "Maximize Inputs";
        }
        if (pd.o.ds) {
            pd.o.ds.checked = true;
        }
        if (pd.o.dc) {
            pd.o.dc.value = "Click me for custom input";
            pd.o.dc.style.color = "#888";
        }
        if (pd.o.je) {
            pd.o.je.checked = true;
        }
        if (pd.o.ps) {
            pd.o.ps.checked = false;
        }
        if (pd.o.context) {
            pd.o.context.value = "";
        }
        if (pd.o.dq) {
            pd.o.dq.value = "4";
        }
        if (pd.o.dx) {
            pd.o.dx.checked = true;
        }
        if (pd.o.dr) {
            pd.o.dr.checked = true;
        }
        if (pd.o.dm) {
            pd.o.dm.checked = true;
        }
        if (pd.o.sideby) {
            pd.o.sideby.checked = true;
        }
        if (pd.o.he) {
            pd.o.he.checked = true;
        }
        if (pd.o.id) {
            pd.o.id.checked = true;
        }
        if (pd.o.df) {
            pd.o.df.checked = true;
        }
        if (pd.ls && localStorage.hasOwnProperty("webtool")) {
            delete localStorage.webtool;
        }
        if (pd.ls && localStorage.hasOwnProperty("optionString")) {
            delete localStorage.optionString;
        }
        pd.fixminreport();
    };

    pd.reload = function () {};
    //alter tool on page load in reflection to saved state
    (function () {
        var a = [],
            b = 0,
            c = 0,
            d = [],
            f = "",
            g = 0,
            h = "",
            i = {},
            j = new Date(),
            k = "",
            l = 0,
            m = [],
            n = {},
            bm = false,
            dm = false,
            mm = false,
            sm = false,
            bma = true,
            dma = true,
            mma = true,
            sma = true,
            source = true,
            diff = true,
            html = false,
            mode = "",
            stat = [],
            lang = "",
            page = pd.o.wb.getAttribute("id");
        
        //supply limited functionality for the pd.save function if not
        //firefox or opera.
        if (navigator && navigator.userAgent.indexOf("Firefox") === -1 && navigator.userAgent.indexOf("Opera") === -1) {
            i = pd.o.re.getElementsByTagName("a")[0];
            n = i.getElementsByTagName("button")[0];
            n.setAttribute("onclick", "pd.save(this);");
            i.removeChild(n);
            i.parentNode.insertBefore(n, i);
            i.parentNode.removeChild(i);
        }
        if (page === "webtool") {
            pd.o.wb.onkeypress = function (event) {
                var a = event || window.event,
                    b = a.srcElement || a.target;
                if (a.keyCode === 8) {
                    if (b.nodeName === "textarea" || (b.nodeName === "input" && (b.getAttribute("type") === "text" || b.getAttribute("type") === "password"))) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };
            pd.o.update.innerHTML = (function () {
                var a = String(edition.latest),
                    b = [a.charAt(0) + a.charAt(1), a.charAt(2) + a.charAt(3), a.charAt(4) + a.charAt(5)],
                    c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                if (b[1].charAt(0) === "0") {
                    b[1] = Number(b[1]);
                }
                if (b[2].charAt(0) === "0") {
                    b[2] = b[2].substr(1);
                }
                b[1] -= 1;
                return "Updated: " + b[2] + " " + c[b[1]] + " 20" + b[0];
            }());
            pd.o.bc = pd.$$("beau-char");
            pd.o.dc = pd.$$("diff-char");
            pd.o.re.style.zIndex = "2";
            pd.o.rg.style.zIndex = "2";
            pd.o.ri.style.zIndex = "2";
            pd.o.rk.style.zIndex = "2";
            if (!pd.fs) {
                document.getElementById("diffbasefile").disabled = true;
                document.getElementById("diffnewfile").disabled = true;
                document.getElementById("beautyfile").disabled = true;
                document.getElementById("minifyfile").disabled = true;
            }
            if (pd.ls && (localStorage.hasOwnProperty("optionString") || localStorage.hasOwnProperty("webtool") || localStorage.hasOwnProperty("statdata"))) {
                if (localStorage.hasOwnProperty("optionString") && localStorage.getItem("optionString") !== null) {
                    pd.o.option.innerHTML = "/*prettydiff.com " + (localStorage.getItem("optionString").replace(/prettydiffper/g, "%").replace(/(prettydiffcsep)+/g, ", ").replace(/\,\s+pdempty/g, "").replace(/(\,\s+\,\s+)+/g, ", ") + " */").replace(/((\,? )+\*\/)$/, " */");
                    a = localStorage.getItem("optionString").replace(/prettydiffper/g, "%").split("prettydiffcsep");
                    c = a.length;
                    for (b = 0; b < c; b += 1) {
                        d = a[b].split(": ");
                        if (typeof d[1] === "string") {
                            f = d[1].charAt(0);
                            g = d[1].length - 1;
                            h = d[1].charAt(d[1].length - 2);
                            if ((f === "\"" || f === "'") && f === d[1].charAt(g) && h !== "\\") {
                                d[1] = d[1].substring(1, g);
                            }
                            if (d[0] === "api.mode") {
                                if (mode === "minify" || d[1] === "minify") {
                                    m = pd.o.la.getElementsByTagName("option");
                                    for (l = m.length - 1; l > -1; l -= 1) {
                                        if (m[l].value === "text") {
                                            m[l].disabled = true;
                                        }
                                    }
                                    pd.o.mm.checked = true;
                                    if (pd.o.bt) {
                                        pd.o.bt.style.display = "none";
                                    }
                                    if (pd.o.nt) {
                                        pd.o.nt.style.display = "none";
                                    }
                                    pd.o.md.style.display = "block";
                                    pd.o.bops.style.display = "none";
                                    if (pd.o.dops) {
                                        pd.o.dops.style.display = "none";
                                    }
                                    if (lang === "text") {
                                        lang = "auto";
                                        pd.o.la.selectedIndex = 0;
                                    }
                                    if (lang === "text" || lang === "csv") {
                                        pd.o.mops.style.display = "none";
                                    } else {
                                        pd.o.mops.style.display = "block";
                                    }
                                } else if (mode === "beautify" || d[1] === "beautify") {
                                    m = pd.o.la.getElementsByTagName("option");
                                    for (l = m.length - 1; l > -1; l -= 1) {
                                        if (m[l].value === "text") {
                                            m[l].disabled = true;
                                        }
                                    }
                                    pd.o.bb.checked = true;
                                    if (pd.o.bt) {
                                        pd.o.bt.style.display = "none";
                                    }
                                    if (pd.o.nt) {
                                        pd.o.nt.style.display = "none";
                                    }
                                    pd.o.bd.style.display = "block";
                                    if (pd.o.dops) {
                                        pd.o.dops.style.display = "none";
                                    }
                                    pd.o.mops.style.display = "none";
                                    if (lang === "text") {
                                        lang = "auto";
                                        pd.o.la.selectedIndex = 0;
                                    }
                                    if (lang === "text" || lang === "csv") {
                                        pd.o.bops.style.display = "none";
                                    } else {
                                        pd.o.bops.style.display = "block";
                                    }
                                } else if (pd.o.dd && (mode === "diff" || mode === "" || !d[1] || d[1] === "diff" || d[1] === "")) {
                                    m = pd.o.la.getElementsByTagName("option");
                                    for (l = m.length - 1; l > -1; l -= 1) {
                                        m[l].disabled = false;
                                    }
                                    pd.o.dd.checked = true;
                                    pd.o.bd.style.display = "none";
                                    pd.o.md.style.display = "none";
                                    pd.o.bt.style.display = "block";
                                    pd.o.nt.style.display = "block";
                                    pd.o.dops.style.display = "block";
                                    pd.o.bops.style.display = "none";
                                    pd.o.mops.style.display = "none";
                                    if (lang === "text" || lang === "csv") {
                                        pd.o.db.style.display = "none";
                                    } else {
                                        pd.o.db.style.display = "block";
                                    }
                                }
                            } else if (d[0] === "api.lang") {
                                pd.o.la.selectedIndex = d[1];
                                lang = pd.o.la[pd.o.la.selectedIndex].value;
                                if (lang === "csv" || (pd.o.dd.checked && lang === "text")) {
                                    pd.o.db.style.display = "none";
                                    pd.o.bops.style.display = "none";
                                    pd.o.mops.style.display = "none";
                                    if (pd.o.dops && pd.o.dd.checked) {
                                        pd.o.dops.style.display = "block";
                                    }
                                }
                                if (lang === "html") {
                                    pd.o.hd.checked = true;
                                    pd.o.hm.checked = true;
                                    pd.o.hy.checked = true;
                                } else {
                                    pd.o.he.checked = true;
                                    pd.o.hn.checked = true;
                                    pd.o.hz.checked = true;
                                }
                            } else if (d[0] === "api.csvchar") {
                                pd.o.ch.value = d[1];
                            } else if (d[0] === "api.insize") {
                                pd.o.bq.value = d[1];
                                if (pd.o.dq) {
                                    pd.o.dq.value = d[1];
                                }
                            } else if (d[0] === "api.inchar") {
                                if (d[1] === " ") {
                                    if (pd.o.ds) {
                                        pd.o.ds.checked = true;
                                    }
                                    if (pd.o.dc) {
                                        pd.o.dc.value = "Click me for custom input";
                                        pd.o.dc.className = "unchecked";
                                    }
                                    pd.o.bs.checked = true;
                                    pd.o.bc.value = "Click me for custom input";
                                    pd.o.bc.className = "unchecked";
                                } else if (d[1] === "\\t") {
                                    if (pd.o.da) {
                                        pd.o.da.checked = true;
                                    }
                                    if (pd.o.dc) {
                                        pd.o.dc.value = "Click me for custom input";
                                        pd.o.dc.className = "unchecked";
                                    }
                                    pd.o.ba.checked = true;
                                    pd.o.bc.value = "Click me for custom input";
                                    pd.o.bc.className = "unchecked";
                                } else if (d[1] === "\\n") {
                                    if (pd.o.dz) {
                                        pd.o.dz.checked = true;
                                    }
                                    if (pd.o.dc) {
                                        pd.o.dc.value = "Click me for custom input";
                                        pd.o.dc.className = "unchecked";
                                    }
                                    pd.o.bn.checked = true;
                                    pd.o.bc.value = "Click me for custom input";
                                    pd.o.bc.className = "unchecked";
                                } else {
                                    if (pd.o.dw) {
                                        pd.o.dw.checked = true;
                                    }
                                    if (pd.o.dc) {
                                        pd.o.dc.value = d[1];
                                        pd.o.dc.className = "checked";
                                    }
                                    pd.o.bw.checked = true;
                                    pd.o.bc.value = d[1];
                                    pd.o.bc.className = "checked";
                                }
                            } else if (d[0] === "api.comments" && d[1] === "noindent") {
                                pd.o.iz.checked = true;
                            } else if (d[0] === "api.indent" && d[1] === "allman") {
                                pd.o.jd.checked = true;
                                pd.o.js.checked = true;
                            } else if (d[0] === "api.style" && d[1] === "noindent") {
                                pd.o.ie.checked = true;
                                pd.o.it.checked = true;
                            } else if (d[0] === "api.html" && d[1] === "html-yes") {
                                pd.o.hd.checked = true;
                                pd.o.hm.checked = true;
                                pd.o.hy.checked = true;
                            } else if (d[0] === "api.context" && ((/^([0-9]+)$/).test(d[1]) && (d[1] === "0" || d[1].charAt(0) !== "0"))) {
                                pd.o.context.value = d[1];
                            } else if (d[0] === "api.content" && d[1] === "true") {
                                pd.o.du.checked = true;
                            } else if (d[0] === "api.quote" && d[1] === "true") {
                                pd.o.dy.checked = true;
                            } else if (d[0] === "api.semicolon" && d[1] === "true") {
                                pd.o.dn.checked = true;
                            } else if (d[0] === "api.diffview" && d[1] === "inline") {
                                pd.o.inline.checked = true;
                            } else if (d[0] === "api.topcoms" && d[1] === "true") {
                                pd.o.mc.checked = true;
                            } else if (d[0] === "api.conditional" && d[1] === "true") {
                                pd.o.ce.checked = true;
                                pd.o.cg.checked = true;
                            } else if (d[0] === "api.diffcomments" && d[1] === "true") {
                                pd.o.dh.checked = true;
                            } else if (d[0] === "api.wrap" && !isNaN(d[1])) {
                                pd.o.wc.value = d[1];
                                pd.o.wd.value = d[1];
                            }
                        }
                    }
                }
                if (localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
                    a = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");
                    c = a.length;
                    for (b = 0; b < c; b += 1) {
                        d = a[b].split(": ");
                        if (typeof d[1] === "string") {
                            if (d[0] === "colorScheme") {
                                pd.o.wb.className = d[1];
                                pd.o.color = d[1];
                                m = pd.o.cs.getElementsByTagName("option");
                                g = m.length;
                                for (l = 0; l < g; l += 1) {
                                    if (m[l].innerHTML.replace(/\s+/g, "").toLowerCase() === d[1]) {
                                        pd.o.cs.selectedIndex = l;
                                        break;
                                    }
                                }
                                pd.colorScheme(pd.o.cs);
                            } else if (d[0] === "showhide" && d[1] === "hide") {
                                pd.hideOptions(pd.o.sh);
                            } else if (d[0] === "additional" && d[1] === "yes" && lang !== "csv") {
                                pd.o.ao.style.display = "block";
                                pd.o.ay.checked = true;
                            } else if (pd.o.dp && d[0] === "display" && d[1] === "horizontal") {
                                pd.o.dp.checked = true;
                                pd.o.bt.className = "wide";
                                pd.o.nt.className = "wide";
                                pd.o.bd.className = "wide";
                                pd.o.md.className = "wide";
                            } else if (d[0] === "diffsave" && d[1] === "true") {
                                pd.o.ps.checked = true;
                                i = pd.o.re.getElementsByTagName("button")[0];
                                i.innerHTML = "H";
                                i.setAttribute("title", "Convert diff report to text that can be saved.");
                            } else if (d[0] === "api.force_indent" && d[1] === "true") {
                                pd.o.bg.checked = true;
                                pd.o.dg.checked = true;
                            } else if (d[0].indexOf("report") === 4) {
                                if (d[0].indexOf("diff") === 0) {
                                    dm = true;
                                    if (d[0] === "diffreportleft") {
                                        pd.o.re.style.left = (d[1] / 10) + "em";
                                        pd.position.diffreport.left = (d[1] / 10);
                                    } else if (d[0] === "diffreporttop") {
                                        pd.o.re.style.top = (d[1] / 10) + "em";
                                        pd.position.diffreport.top = (d[1] / 10);
                                    } else if (d[0] === "diffreportwidth") {
                                        pd.o.rf.style.width = d[1] + "em";
                                        pd.position.diffreport.width = d[1];
                                        pd.o.re.getElementsByTagName("h3")[0].style.width = (d[1] - 9.76) + "em";
                                    } else if (d[0] === "diffreportheight") {
                                        pd.o.rf.style.height = d[1] + "em";
                                        pd.position.diffreport.height = d[1];
                                    } else if (d[0] === "diffreportmin" && d[1] === "1") {
                                        dma = false;
                                    } else if (d[0] === "diffreportzindex") {
                                        pd.o.re.style.zIndex = d[1];
                                        pd.position.diffreport.zindex = d[1];
                                    }
                                } else if (d[0].indexOf("beau") === 0) {
                                    bm = true;
                                    if (d[0] === "beaureportleft") {
                                        pd.o.rg.style.left = (d[1] / 10) + "em";
                                        pd.position.beaureport.left = (d[1] / 10);
                                    } else if (d[0] === "beaureporttop") {
                                        pd.o.rg.style.top = (d[1] / 10) + "em";
                                        pd.position.beaureport.top = (d[1] / 10);
                                    } else if (d[0] === "beaureportwidth") {
                                        pd.o.rh.style.width = d[1] + "em";
                                        pd.position.beaureport.width = d[1];
                                        pd.o.rg.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                    } else if (d[0] === "beaureportheight") {
                                        pd.o.rh.style.height = d[1] + "em";
                                        pd.position.beaureport.height = d[1];
                                    } else if (d[0] === "beaureportmin" && d[1] === "1") {
                                        bma = false;
                                    } else if (d[0] === "beaureportzindex") {
                                        pd.o.rg.style.zIndex = d[1];
                                        pd.position.beaureport.zindex = d[1];
                                    }
                                } else if (d[0].indexOf("minn") === 0) {
                                    mm = true;
                                    if (d[0] === "minnreportleft") {
                                        pd.o.ri.style.left = (d[1] / 10) + "em";
                                        pd.position.minreport.left = (d[1] / 10);
                                    } else if (d[0] === "minnreporttop") {
                                        pd.o.ri.style.top = (d[1] / 10) + "em";
                                        pd.position.minreport.top = (d[1] / 10);
                                    } else if (d[0] === "minnreportwidth") {
                                        pd.o.rj.style.width = d[1] + "em";
                                        pd.position.minreport.width = d[1];
                                        pd.o.ri.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                    } else if (d[0] === "minnreportheight") {
                                        pd.o.rj.style.height = d[1] + "em";
                                        pd.position.minreport.height = d[1];
                                    } else if (d[0] === "minnreportmin" && d[1] === "1") {
                                        mma = false;
                                    } else if (d[0] === "minnreportzindex") {
                                        pd.o.ri.style.zIndex = d[1];
                                        pd.position.minreport.zindex = d[1];
                                    }
                                } else if (d[0].indexOf("stat") === 0) {
                                    sm = true;
                                    if (d[0] === "statreportleft") {
                                        pd.o.rk.style.left = (d[1] / 10) + "em";
                                        pd.position.statreport.left = (d[1] / 10);
                                    } else if (d[0] === "statreporttop") {
                                        pd.o.rk.style.top = (d[1] / 10) + "em";
                                        pd.position.statreport.top = (d[1] / 10);
                                    } else if (d[0] === "statreportwidth") {
                                        pd.o.rl.style.width = d[1] + "em";
                                        pd.position.statreport.width = d[1];
                                        pd.o.rk.getElementsByTagName("h3")[0].style.width = (d[1] - 6.76) + "em";
                                    } else if (d[0] === "statreportheight") {
                                        pd.o.rl.style.height = d[1] + "em";
                                        pd.position.statreport.height = d[1];
                                    } else if (d[0] === "statreportmin" && d[1] === "1") {
                                        sma = false;
                                    } else if (d[0] === "statreportzindex") {
                                        pd.o.rk.style.zIndex = d[1];
                                        pd.position.statreport.zindex = d[1];
                                    }
                                }
                            }
                        }
                    }
                    if (dm && dma) {
                        pd.o.re.style.right = "auto";
                        pd.o.re.style.borderWidth = "0.1em";
                        pd.o.re.getElementsByTagName("p")[0].style.display = "block";
                        pd.o.re.getElementsByTagName("p")[0].getElementsByTagName("button")[1].innerHTML = "\u035f";
                        pd.o.rf.style.display = "block";
                    } else if (dm) {
                        pd.o.re.getElementsByTagName("p")[0].style.display = "none";
                        pd.o.re.getElementsByTagName("h3")[0].style.width = "17em";
                        pd.o.re.style.left = "auto";
                        pd.o.re.style.top = "auto";
                        pd.o.re.style.borderWidth = "0em";
                        pd.o.rf.style.display = "none";
                    }
                    if (bm && bma) {
                        pd.o.rg.style.right = "auto";
                        pd.o.rg.style.borderWidth = "0.1em";
                        pd.o.rg.getElementsByTagName("p")[0].style.display = "block";
                        pd.o.rg.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                        pd.o.rh.style.display = "block";
                    } else if (bm) {
                        pd.o.rg.getElementsByTagName("p")[0].style.display = "none";
                        pd.o.rg.getElementsByTagName("h3")[0].style.width = "17em";
                        pd.o.rg.style.left = "auto";
                        pd.o.rg.style.top = "auto";
                        pd.o.rg.style.borderWidth = "0em";
                        pd.o.rh.style.display = "none";
                    }
                    if (mm && mma) {
                        pd.o.ri.style.right = "auto";
                        pd.o.ri.style.borderWidth = "0.1em";
                        pd.o.ri.getElementsByTagName("p")[0].style.display = "block";
                        pd.o.ri.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                        pd.o.rj.style.display = "block";
                    } else if (mm) {
                        pd.o.ri.getElementsByTagName("p")[0].style.display = "none";
                        pd.o.ri.getElementsByTagName("h3")[0].style.width = "17em";
                        pd.o.ri.style.left = "auto";
                        pd.o.ri.style.top = "auto";
                        pd.o.ri.style.borderWidth = "0em";
                        pd.o.rj.style.display = "none";
                    }
                    if (sm && sma) {
                        pd.o.rk.style.right = "auto";
                        pd.o.rk.style.borderWidth = "0.1em";
                        pd.o.rk.getElementsByTagName("p")[0].style.display = "block";
                        pd.o.rk.getElementsByTagName("p")[0].getElementsByTagName("button")[0].innerHTML = "\u035f";
                        pd.o.rl.style.display = "block";
                    } else if (sm) {
                        pd.o.rk.getElementsByTagName("p")[0].style.display = "none";
                        pd.o.rk.getElementsByTagName("h3")[0].style.width = "17em";
                        pd.o.rk.style.left = "auto";
                        pd.o.rk.style.top = "auto";
                        pd.o.rk.style.borderWidth = "0em";
                        pd.o.rl.style.display = "none";
                    }
                }
                if (localStorage.hasOwnProperty("statdata") && localStorage.getItem("statdata") !== null) {
                    stat = localStorage.getItem("statdata").split("|");
                    pd.o.stat.visit = Number(stat[0]) + 1;
                    stat[0] = pd.o.stat.visit.toString();
                    pd.o.stvisit.innerHTML = stat[0];
                    i = new Date();
                    if (stat[2] === "") {
                        stat[2] = i.toDateString();
                    }
                    k = (Date.parse(i) - Date.parse(stat[2]));
                    if (k < 86400000) {
                        k = 1;
                    } else {
                        k = Number((k / 86400000).toFixed(0));
                    }
                    stat[3] = (pd.o.stat.visit / k).toFixed(2);
                    pd.o.stat.avday = stat[3];
                    localStorage.setItem("statdata", stat.join("|"));
                    pd.o.stat.usage = Number(stat[1]);
                    pd.o.stat.fdate = stat[2];
                    pd.o.stat.diff = Number(stat[4]);
                    pd.o.stat.beau = Number(stat[5]);
                    pd.o.stat.minn = Number(stat[6]);
                    pd.o.stat.markup = Number(stat[7]);
                    pd.o.stat.js = Number(stat[8]);
                    pd.o.stat.css = Number(stat[9]);
                    pd.o.stat.csv = Number(stat[10]);
                    pd.o.stat.text = Number(stat[11]);
                    pd.o.stat.pdate = k;
                    pd.o.stat.large = Number(stat[13]);
                    pd.o.stusage.innerHTML = stat[1];
                    pd.o.stfdate.innerHTML = stat[2];
                    pd.o.stavday.innerHTML = stat[3];
                    pd.o.stdiff.innerHTML = stat[4];
                    pd.o.stbeau.innerHTML = stat[5];
                    pd.o.stminn.innerHTML = stat[6];
                    pd.o.stmarkup.innerHTML = stat[7];
                    pd.o.stjs.innerHTML = stat[8];
                    pd.o.stcss.innerHTML = stat[9];
                    pd.o.stcsv.innerHTML = stat[10];
                    pd.o.sttext.innerHTML = stat[11];
                    pd.o.stlarge.innerHTML = stat[12];
                } else {
                    k = j.toLocaleDateString();
                    pd.o.stfdate.innerHTML = k;
                    pd.o.stat.fdate = k;
                    stat = [1, 0, k, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    if (localStorage.hasOwnProperty("pageCount") && localStorage.getItem("pageCount") !== null) {
                        l = Number(localStorage.getItem("pageCount")) + 1;
                        pd.o.stvisit.innerHTML = l;
                        pd.o.stat.visit = l;
                        stat[0] = l;
                    } else {
                        pd.o.stat.visit = 1;
                    }
                    pd.o.stat.usage = 0;
                    pd.o.stat.avday = 1;
                    pd.o.stat.diff = 0;
                    pd.o.stat.beau = 0;
                    pd.o.stat.minn = 0;
                    pd.o.stat.markup = 0;
                    pd.o.stat.js = 0;
                    pd.o.stat.css = 0;
                    pd.o.stat.csv = 0;
                    pd.o.stat.text = 0;
                    pd.o.stat.large = 0;
                    localStorage.setItem("statdata", stat.join("|"));
                }
                if (lang === "csv") {
                    pd.o.csvp.style.display = "block";
                }
                if (lang === "text" || lang === "csv") {
                    pd.o.db.style.display = "none";
                }
                if (pd.o.sh.innerHTML === "Normal view") {
                    pd.o.ao.style.display = "none";
                }
            }
            if (location && location.href && location.href.indexOf("?") !== -1) {
                d = location.href.split("?")[1].split("&");
                c = d.length;
                for (b = 0; b < c; b += 1) {
                    if (d[b].indexOf("m=") === 0) {
                        f = d[b].toLowerCase().substr(2);
                        if (f === "beautify") {
                            pd.o.bb.click();
                        } else if (f === "minify") {
                            pd.o.mm.click();
                        } else if (pd.o.dd && f === "diff") {
                            pd.o.dd.click();
                        }
                    } else if (d[b].indexOf("s=") === 0) {
                        source = d[b].substr(2);
                        pd.o.bi.value = source;
                        pd.o.mi.value = source;
                        if (pd.o.bo) {
                            pd.o.bo.value = source;
                        }
                    } else if (d[b].indexOf("d=") === 0) {
                        diff = d[b].substr(2);
                        pd.o.nx.value = diff;
                    } else if (d[b].toLowerCase() === "html") {
                        html = true;
                    } else if (d[b].indexOf("l=") === 0) {
                        f = d[b].toLowerCase().substr(2);
                        if (f === "auto") {
                            pd.codeOps();
                            lang = "auto";
                        } else if (f === "javascript" || f === "js" || f === "json") {
                            pd.codeOps();
                            lang = "javascript";
                            f = lang;
                        } else if (f === "html") {
                            pd.codeOps();
                            pd.o.hd.checked = true;
                            pd.o.hm.checked = true;
                            pd.o.hy.checked = true;
                            lang = "markup";
                            f = lang;
                        } else if (f === "markup" || f === "xml" || f === "sgml" || f === "jstl") {
                            pd.codeOps();
                            pd.o.he.checked = true;
                            pd.o.hn.checked = true;
                            pd.o.hz.checked = true;
                            lang = "markup";
                        } else if (f === "css" || f === "scss") {
                            pd.codeOps();
                            lang = "css";
                        } else if (f === "csv") {
                            pd.codeOps();
                            lang = "csv";
                        } else if (f === "text") {
                            pd.o.dd.click();
                            lang = "text";
                        } else {
                            lang = "javascript";
                        }
                        m = pd.o.la.getElementsByTagName("option");
                        for (l = m.length - 1; l > -1; l -= 1) {
                            if (f === "text") {
                                m[l].disabled = false;
                            }
                            if (m[l].value === f) {
                                pd.o.la.selectedIndex = l;
                            }
                        }
                    } else if (d[b].indexOf("c=") === 0) {
                        f = d[b].toLowerCase().substr(2);
                        a = pd.o.cs.getElementsByTagName("option");
                        for (g = a.length - 1; g > -1; g -= 1) {
                            h = a[g].innerHTML.toLowerCase().replace(/\s+/g, "");
                            if (f === h) {
                                pd.o.cs.selectedIndex = g;
                                pd.o.wb.className = h;
                                break;
                            }
                        }
                    }
                }
            }
            if (pd.o.bc.value !== "" && pd.o.bc.value !== "Click me for custom input") {
                pd.o.bcv = pd.o.bc.value;
            }
            if (pd.o.dc && pd.o.dc.value !== "" && pd.o.dc.value !== "Click me for custom input") {
                pd.o.dcv = pd.o.dc.value;
            }
            if (html) {
                pd.o.hd.checked = true;
                pd.o.hm.checked = true;
                pd.o.hy.checked = true;
            }
            if (source !== true && (pd.o.bb.checked || pd.o.mm.checked || (pd.o.dd.checked && diff !== true))) {
                pd.recycle();
                return;
            }
            if (pd.ls) {
                if (localStorage.hasOwnProperty("bi") && localStorage.getItem("bi") !== null) {
                    pd.o.bi.value = localStorage.getItem("bi");
                    pd.o.slength.bi = pd.o.bi.value.length;
                }
                if (localStorage.hasOwnProperty("mi") && localStorage.getItem("mi") !== null) {
                    pd.o.mi.value = localStorage.getItem("mi");
                    pd.o.slength.mi = pd.o.mi.value.length;
                }
                if (pd.o.bo && localStorage.hasOwnProperty("bo") && localStorage.getItem("bo") !== null) {
                    pd.o.bo.value = localStorage.getItem("bo");
                    pd.o.slength.bo = pd.o.bo.value.length;
                }
                if (pd.o.nx && localStorage.hasOwnProperty("nx") && localStorage.getItem("nx") !== null) {
                    pd.o.nx.value = localStorage.getItem("nx");
                    pd.o.slength.nx = pd.o.nx.value.length;
                }
                if (pd.o.bl && localStorage.hasOwnProperty("bl") && localStorage.getItem("bl") !== null) {
                    pd.o.bl.value = localStorage.getItem("bl");
                }
                if (pd.o.nl && localStorage.hasOwnProperty("nl") && localStorage.getItem("ni") !== null) {
                    pd.o.nl.value = localStorage.getItem("nl");
                }
                if (pd.fs) {
                    pd.o.bi.ondragover = pd.filenull;
                    pd.o.mi.ondragover = pd.filenull;
                    pd.o.bo.ondragover = pd.filenull;
                    pd.o.nx.ondragover = pd.filenull;
                    pd.o.bi.ondragleave = pd.filenull;
                    pd.o.mi.ondragleave = pd.filenull;
                    pd.o.bo.ondragleave = pd.filenull;
                    pd.o.nx.ondragleave = pd.filenull;
                    pd.o.bi.ondrop = pd.filedrop;
                    pd.o.mi.ondrop = pd.filedrop;
                    pd.o.bo.ondrop = pd.filedrop;
                    pd.o.nx.ondrop = pd.filedrop;
                }
            }
            pd.fixminreport();
            if (typeof window.onresize === "object" || typeof window.onresize === "function") {
                window.onresize = pd.fixminreport;
            }
            pd.o.wb.style.display = "block";
        } else if (pd.ls && localStorage.hasOwnProperty("webtool") && localStorage.getItem("webtool") !== null) {
            a = localStorage.getItem("webtool").replace(/prettydiffper/g, "%").split("prettydiffcsep");console.log(a);
            c = a.length;
            for (b = 0; b < c; b += 1) {
                d = a[b].split(": ");
                if (typeof d[1] === "string") {
                    if (d[0] === "colorScheme") {
                        pd.o.wb.className = d[1];
                        pd.o.color = d[1];
                        m = pd.o.cs.getElementsByTagName("option");
                        g = m.length;
                        for (l = 0; l < g; l += 1) {
                            if (m[l].innerHTML.replace(/\s+/g, "").toLowerCase() === d[1]) {
                                pd.o.cs.selectedIndex = l;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (page === "doc") {
            (function () {
                var a = document.getElementById("components").getElementsByTagName("tbody")[0],
                    b = a.getElementsByTagName("tr"),
                    c = {},
                    d = 0,
                    e = b.length,
                    f = [],
                    g = [],
                    h = [],
                    date = 0,
                    conversion = function (x) {
                        var a = String(x),
                            b = [a.charAt(0) + a.charAt(1), a.charAt(2) + a.charAt(3), a.charAt(4) + a.charAt(5)],
                            c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        if (b[1].charAt(0) === "0") {
                            b[1] = Number(b[1]);
                        }
                        b[1] -= 1;
                        return b[2] + " " + c[b[1]] + " 20" + b[0];
                    };
                for (d = 0; d < e; d += 1) {
                    c = b[d].getElementsByTagName("td")[3];
                    switch (b[d].getElementsByTagName("a")[0].innerHTML) {
                    case "charDecoder.js":
                        date = edition.charDecoder;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "cleanCSS.js":
                        date = edition.cleanCSS;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "csvbeauty.js":
                        date = edition.csvbeauty;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "csvmin.js":
                        date = edition.csvmin;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "diffview.css":
                        date = edition.css;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "diffview.js":
                        date = edition.diffview;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "documentation.xhtml":
                        date = edition.documentation;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "dom.js":
                        date = edition.api.dom;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "fulljsmin.js":
                        date = edition.jsmin;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "jspretty.js":
                        date = edition.jspretty;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "markup_beauty.js":
                        date = edition.markup_beauty;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "markupmin.js":
                        date = edition.markupmin;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "node-local.js":
                        date = edition.api.nodeLocal;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "node-service.js":
                        date = edition.api.nodeService;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "prettydiff.com.xhtml":
                        date = edition.webtool;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "prettydiff.js":
                        date = edition.prettydiff;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    case "prettydiff.wsf":
                        date = edition.api.wsh;
                        c.innerHTML = conversion(date);
                        f.push(date);
                        g.push([date, b[d].innerHTML]);
                        break;
                    }
                }
                e = g.length;
                g = g.sort(function (a, b) {
                    return a[1] === b[1];
                }).reverse().sort(function (a, b) {
                    return a[0] - b[0];
                });
                for (d = g.length - 1; d > -1; d -= 1) {
                    h.push("<tr>");
                    h.push(g[d][1]);
                    h.push("</tr>");
                }
                a.innerHTML = h.join("");
            }());
        }
    }());
    
}());
if (!(/^(file:\/\/)/).test(location.href)) {
    _gaq.push(["_setAccount", "UA-27834630-1"]);
    _gaq.push(["_trackPageview"]);
    if (pd.bounce) {
        pd.o.wb.onclick = function () {
            "use strict";
            _gaq.push(["_trackEvent", "Logging", "NoBounce", "NoBounce", null, false]);
        };
        pd.bounce = false;
    }
    (function () {
        "use strict";
        var ga = document.createElement("script"),
            s = document.getElementsByTagName("script")[0];
        ga.setAttribute("type", s.getAttribute("type"));
        ga.setAttribute("async", true);
        ga.setAttribute("src", ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js");
        s.parentNode.insertBefore(ga, s);
        window.onerror = function (message, file, line) {
            var mode = (function () {
                    if (pd.$$("modebeautify").checked) {
                        return "beautify";
                    }
                    if (pd.$$("modeminify").checked) {
                        return "minify";
                    }
                    return "diff";
                }()),
                sFormattedMessage = "";
            if (message === "prettydiff is not defined" && pd.ls) {
                if (mode === "minify") {
                    localStorage.setItem("mi", "");
                } else if (mode === "beautify") {
                    localStorage.setItem("bi", "");
                } else {
                    localStorage.setItem("bo", "");
                    localStorage.setItem("nx", "");
                }
            }
            if (line > 0) {
                sFormattedMessage = "[" + file + " (" + line + ")] " + message + " " + mode + " " + pd.o.la[pd.o.la.selectedIndex].value;
                _gaq.push(["_trackEvent", "Exceptions", "Application", sFormattedMessage, null, true]);
            }
        };
    }());
}