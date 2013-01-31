YUI.add("juicer",function(e){var c=function(){var f=[].slice.call(arguments);f.push(c.options);if(f[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)){f[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm,function(i,j){var g=document;var h=g&&g.getElementById(j);f[0]=h?(h.value||h.innerHTML):i;});}if(arguments.length==1){return c.compile.apply(c,f);}if(arguments.length>=2){return c.to_html.apply(c,f);}};var d={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(f){return d.escapehash[f];},escaping:function(f){return typeof(f)!=="string"?f:f.replace(/[&<>"]/igm,this.escapereplace);},detection:function(f){return typeof(f)==="undefined"?"":f;}};var b=function(f){if(typeof(console)!=="undefined"){if(console.warn){console.warn(f);return;}if(console.log){console.log(f);return;}}throw (f);};var a=function(j,g){j=j!==Object(j)?{}:j;if(j.__proto__){j.__proto__=g;return j;}var h=function(){};var k=Object.create?Object.create(g):new (h.prototype=g,h);for(var f in j){if(j.hasOwnProperty(f)){k[f]=j[f];}}return k;};c.__cache={};c.version="0.6.5-stable";c.settings={};c.tags={operationOpen:"{@",operationClose:"}",interpolateOpen:"\\${",interpolateClose:"}",noneencodeOpen:"\\$\\${",noneencodeClose:"}",commentOpen:"\\{#",commentClose:"\\}"};c.options={cache:true,strip:true,errorhandling:true,detection:true,_method:a({__escapehtml:d,__throw:b,__juicer:c},{})};c.tagInit=function(){var g=c.tags.operationOpen+"each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?"+c.tags.operationClose;var i=c.tags.operationOpen+"\\/each"+c.tags.operationClose;var j=c.tags.operationOpen+"if\\s*([^}]*?)"+c.tags.operationClose;var k=c.tags.operationOpen+"\\/if"+c.tags.operationClose;var o=c.tags.operationOpen+"else"+c.tags.operationClose;var p=c.tags.operationOpen+"else if\\s*([^}]*?)"+c.tags.operationClose;var l=c.tags.interpolateOpen+"([\\s\\S]+?)"+c.tags.interpolateClose;var m=c.tags.noneencodeOpen+"([\\s\\S]+?)"+c.tags.noneencodeClose;var n=c.tags.commentOpen+"[^}]*?"+c.tags.commentClose;var h=c.tags.operationOpen+"each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)"+c.tags.operationClose;var f=c.tags.operationOpen+"include\\s*([^}]*?)\\s*,\\s*([^}]*?)"+c.tags.operationClose;c.settings.forstart=new RegExp(g,"igm");c.settings.forend=new RegExp(i,"igm");c.settings.ifstart=new RegExp(j,"igm");c.settings.ifend=new RegExp(k,"igm");c.settings.elsestart=new RegExp(o,"igm");c.settings.elseifstart=new RegExp(p,"igm");c.settings.interpolate=new RegExp(l,"igm");c.settings.noneencode=new RegExp(m,"igm");c.settings.inlinecomment=new RegExp(n,"igm");c.settings.rangestart=new RegExp(h,"igm");c.settings.include=new RegExp(f,"igm");};c.tagInit();c.set=function(g,k){var j=this;var f=function(i){return i.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm,function(m){return"\\"+m;});};var l=function(m,n){var i=m.match(/^tag::(.*)$/i);if(i){j.tags[i[1]]=f(n);j.tagInit();return;}j.options[m]=n;};if(arguments.length===2){l(g,k);return;}if(g===Object(g)){for(var h in g){if(g.hasOwnProperty(h)){l(h,g[h]);}}}};c.register=function(h,g){var f=this.options._method;if(f.hasOwnProperty(h)){return false;}return f[h]=g;};c.unregister=function(g){var f=this.options._method;if(f.hasOwnProperty(g)){return delete f[g];}};c.template=function(f){var g=this;this.options=f;this.__interpolate=function(h,m,j){var i=h.split("|"),l=i[0]||"",k;if(i.length>1){h=i.shift();k=i.shift().split(",");l="_method."+k.shift()+".call({}, "+[h].concat(k)+")";}return"<%= "+(m?"_method.__escapehtml.escaping":"")+"("+(!j||j.detection!==false?"_method.__escapehtml.detection":"")+"("+l+")) %>";};this.__removeShell=function(i,h){var j=0;i=i.replace(c.settings.forstart,function(o,l,n,m){var n=n||"value",m=m&&m.substr(1);var k="i"+j++;return"<% ~function() {for(var "+k+" in "+l+") {if("+l+".hasOwnProperty("+k+")) {var "+n+"="+l+"["+k+"];"+(m?("var "+m+"="+k+";"):"")+" %>";}).replace(c.settings.forend,"<% }}}(); %>").replace(c.settings.ifstart,function(k,l){return"<% if("+l+") { %>";}).replace(c.settings.ifend,"<% } %>").replace(c.settings.elsestart,function(k){return"<% } else { %>";}).replace(c.settings.elseifstart,function(k,l){return"<% } else if("+l+") { %>";}).replace(c.settings.noneencode,function(l,k){return g.__interpolate(k,false,h);}).replace(c.settings.interpolate,function(l,k){return g.__interpolate(k,true,h);}).replace(c.settings.inlinecomment,"").replace(c.settings.rangestart,function(n,m,o,l){var k="j"+j++;return"<% ~function() {for(var "+k+"="+o+";"+k+"<"+l+";"+k+"++) {{var "+m+"="+k+"; %>";}).replace(c.settings.include,function(m,k,l){return"<%= _method.__juicer("+k+", "+l+"); %>";});if(!h||h.errorhandling!==false){i="<% try { %>"+i;i+='<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';}return i;};this.__toNative=function(i,h){return this.__convert(i,!h||h.strip);};this.__lexicalAnalyze=function(l){var k=[];var p=[];var o="";var h=["if","each","_","_method","console","break","case","catch","continue","debugger","default","delete","do","finally","for","function","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","null","typeof","class","enum","export","extends","import","super","implements","interface","let","package","private","protected","public","static","yield","const","arguments","true","false","undefined","NaN"];var n=function(s,r){if(Array.prototype.indexOf&&s.indexOf===Array.prototype.indexOf){return s.indexOf(r);}for(var q=0;q<s.length;q++){if(s[q]===r){return q;}}return -1;};var j=function(q,i){i=i.match(/\w+/igm)[0];if(n(k,i)===-1&&n(h,i)===-1&&n(p,i)===-1){if(typeof(window)!=="undefined"&&typeof(window[i])==="function"&&window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)){return q;}if(typeof(global)!=="undefined"&&typeof(global[i])==="function"&&global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)){return q;}if(typeof(c.options._method[i])==="function"||c.options._method.hasOwnProperty(i)){p.push(i);return q;}k.push(i);}return q;};l.replace(c.settings.forstart,j).replace(c.settings.interpolate,j).replace(c.settings.ifstart,j).replace(c.settings.elseifstart,j).replace(c.settings.include,j).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)]\s*([A-Za-z_]+)/igm,j);for(var m=0;m<k.length;m++){o+="var "+k[m]+"=_."+k[m]+";";}for(var m=0;m<p.length;m++){o+="var "+p[m]+"=_method."+p[m]+";";}return"<% "+o+" %>";};this.__convert=function(i,j){var h=[].join("");h+="'use strict';";h+="var _=_||{};";h+="var _out='';_out+='";if(j!==false){h+=i.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;";return h;}h+=i.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";return h;};this.parse=function(i,h){var j=this;if(!h||h.loose!==false){i=this.__lexicalAnalyze(i)+i;}i=this.__removeShell(i,h);i=this.__toNative(i,h);this._render=new Function("_, _method",i);this.render=function(l,k){if(!k||k!==g.options._method){k=a(k,g.options._method);}return j._render.call(this,l,k);};return this;};};c.compile=function(g,f){if(!f||f!==this.options){f=a(f,this.options);}try{var h=this.__cache[g]?this.__cache[g]:new this.template(this.options).parse(g,f);if(!f||f.cache!==false){this.__cache[g]=h;}return h;}catch(i){b("Juicer Compile Exception: "+i.message);return{render:function(){}};}};c.to_html=function(g,h,f){if(!f||f!==this.options){f=a(f,this.options);}return this.compile(g,f).render(h,f._method);};e.juicer=c;},"0.6.4-stable");