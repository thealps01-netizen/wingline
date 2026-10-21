import{host as Qd,usePluginI18n as Oy}from"@hermes/plugin-sdk";import{jsx as $h,jsxs as By}from"react/jsx-runtime";import{useCallback as Vh,useEffect as Ri,useLayoutEffect as zy,useMemo as hi,useRef as Ii,useState as vn}from"react";var Ru=0,qc=1,Iu=2;var xo=1,Pu=2,cs=3,ir=0,Ln=1,Jn=2,Mi=0,hs=1,Yc=2,Zc=3,Jc=4,Lu=5;var Tr=100,Nu=101,Du=102,Uu=103,Fu=104,ku=200,Ou=201,Bu=202,zu=203,Kc=204,jc=205,Vu=206,Gu=207,Hu=208,Wu=209,Xu=210,$u=211,qu=212,Yu=213,Zu=214,ga=0,xa=1,ya=2,Jr=3,_a=4,va=5,wa=6,ba=7,Qc=0,Ju=1,Ku=2,oi=0,eh=1,th=2,nh=3,ih=4,rh=5,sh=6,oh=7;var ah=300,rr=301,Ar=302,nl=303,il=304,yo=306,Ma=1e3,yi=1001,Sa=1002,yn=1003,ju=1004;var _o=1005;var Sn=1006,rl=1007;var sr=1008;var qn=1009,lh=1010,ch=1011,us=1012,sl=1013,ai=1014,li=1015,ci=1016,ol=1017,al=1018,ds=1020,hh=35902,uh=35899,dh=1021,fh=1022,Kn=1023,_i=1026,or=1027,ph=1028,ll=1029,ar=1030,cl=1031;var hl=1033,vo=33776,wo=33777,bo=33778,Mo=33779,ul=35840,dl=35841,fl=35842,pl=35843,ml=36196,gl=37492,xl=37496,yl=37488,_l=37489,So=37490,vl=37491,wl=37808,bl=37809,Ml=37810,Sl=37811,El=37812,Tl=37813,Al=37814,Cl=37815,Rl=37816,Il=37817,Pl=37818,Ll=37819,Nl=37820,Dl=37821,Ul=36492,Fl=36494,kl=36495,Ol=36283,Bl=36284,Eo=36285,zl=36286;var Gs=2300,Ea=2301,fa=2302,Fc=2303,kc=2400,Oc=2401,Bc=2402;var Qu=3200;var mh=0,ed=1,zi="",Wn="srgb",Hs="srgb-linear",Ws="linear",Xt="srgb";var pa=7680;var td=519,nd=512,id=513,rd=514,Vl=515,sd=516,od=517,Gl=518,ad=519,ld=35044;var gh="300 es",ri=2e3,Xs=2001;function vf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function wf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function $s(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function cd(){let n=$s("canvas");return n.style.display="block",n}var jh={},Kr=null;function xh(...n){let e="THREE."+n.shift();Kr?Kr("log",e,...n):console.log(e,...n)}function hd(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function xt(...n){n=hd(n);let e="THREE."+n.shift();if(Kr)Kr("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function wt(...n){n=hd(n);let e="THREE."+n.shift();if(Kr)Kr("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function _r(...n){let e=n.join(" ");e in jh||(jh[e]=!0,xt(...n))}function ud(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var dd={[ga]:xa,[ya]:wa,[_a]:ba,[Jr]:va,[xa]:ga,[wa]:ya,[ba]:_a,[va]:Jr},vi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ma=Math.PI/180,Ta=180/Math.PI;function fs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]+"-"+En[e&255]+En[e>>8&255]+"-"+En[e>>16&15|64]+En[e>>24&255]+"-"+En[t&63|128]+En[t>>8&255]+"-"+En[t>>16&255]+En[t>>24&255]+En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]).toLowerCase()}function Lt(n,e,t){return Math.max(e,Math.min(t,n))}function bf(n,e){return(n%e+e)%e}function hc(n,e,t){return(1-t)*n+t*e}function Ns(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ve=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Lt(this.x,e.x,t.x),this.y=Lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Lt(this.x,e,t),this.y=Lt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],h=i[r+2],d=i[r+3],u=s[o+0],f=s[o+1],p=s[o+2],w=s[o+3];if(d!==w||c!==u||l!==f||h!==p){let g=c*u+l*f+h*p+d*w;g<0&&(u=-u,f=-f,p=-p,w=-w,g=-g);let m=1-a;if(g<.9995){let S=Math.acos(g),U=Math.sin(S);m=Math.sin(m*S)/U,a=Math.sin(a*S)/U,c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+w*a}else{c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+w*a;let S=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=S,l*=S,h*=S,d*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],h=i[r+3],d=s[o],u=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+h*d+c*f-l*u,e[t+1]=c*p+h*u+l*d-a*f,e[t+2]=l*p+h*f+a*u-c*d,e[t+3]=h*p-a*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(r/2),d=a(s/2),u=c(i/2),f=c(r/2),p=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:xt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-i*l,this._z=s*h+o*l+i*c-r*a,this._w=o*h-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),h=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*h,this.y=i+c*h+a*l-s*d,this.z=r+c*d+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Lt(this.x,e.x,t.x),this.y=Lt(this.y,e.y,t.y),this.z=Lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Lt(this.x,e,t),this.y=Lt(this.y,e,t),this.z=Lt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new $,Qh=new Pn,Mt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],p=i[8],w=r[0],g=r[3],m=r[6],S=r[1],U=r[4],v=r[7],R=r[2],I=r[5],O=r[8];return s[0]=o*w+a*S+c*R,s[3]=o*g+a*U+c*I,s[6]=o*m+a*v+c*O,s[1]=l*w+h*S+d*R,s[4]=l*g+h*U+d*I,s[7]=l*m+h*v+d*O,s[2]=u*w+f*S+p*R,s[5]=u*g+f*U+p*I,s[8]=u*m+f*v+p*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*s*h+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,u=a*c-h*s,f=l*s-o*c,p=t*d+i*u+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/p;return e[0]=d*w,e[1]=(r*l-h*i)*w,e[2]=(a*i-r*o)*w,e[3]=u*w,e[4]=(h*t-r*c)*w,e[5]=(r*s-a*t)*w,e[6]=f*w,e[7]=(i*c-l*t)*w,e[8]=(o*t-i*s)*w,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return _r("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dc.makeScale(e,t)),this}rotate(e){return _r("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dc.makeRotation(-e)),this}translate(e,t){return _r("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dc=new Mt,eu=new Mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tu=new Mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mf(){let n={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Xt&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Xt&&(r.r=Zr(r.r),r.g=Zr(r.g),r.b=Zr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===zi?Ws:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return _r("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return _r("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Hs]:{primaries:e,whitePoint:i,transfer:Ws,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:e,whitePoint:i,transfer:Xt,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),n}var Dt=Mf();function Oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Fr,Aa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fr===void 0&&(Fr=$s("canvas")),Fr.width=e.width,Fr.height=e.height;let r=Fr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Fr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=$s("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Oi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Oi(t[i]/255)*255):t[i]=Oi(t[i]);return{data:t,width:e.width,height:e.height}}else return xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Sf=0,jr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(fc(r[o].image)):s.push(fc(r[o]))}else s=fc(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function fc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Aa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(xt("Texture: Unable to serialize Texture."),{})}var Ef=0,pc=new $,Fn=class n extends vi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=yi,r=yi,s=Sn,o=sr,a=Kn,c=qn,l=n.DEFAULT_ANISOTROPY,h=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=fs(),this.name="",this.source=new jr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(pc).x}get height(){return this.source.getSize(pc).y}get depth(){return this.source.getSize(pc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){xt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){xt(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ma:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ma:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=ah;Fn.DEFAULT_ANISOTROPY=1;var jt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],w=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-w)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+w)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let U=(l+1)/2,v=(f+1)/2,R=(m+1)/2,I=(h+u)/4,O=(d+w)/4,_=(p+g)/4;return U>v&&U>R?U<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(U),r=I/i,s=O/i):v>R?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=I/r,s=_/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=O/s,r=_/s),this.set(i,r,s,t),this}let S=Math.sqrt((g-p)*(g-p)+(d-w)*(d-w)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(d-w)/S,this.z=(u-h)/S,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Lt(this.x,e.x,t.x),this.y=Lt(this.y,e.y,t.y),this.z=Lt(this.z,e.z,t.z),this.w=Lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Lt(this.x,e,t),this.y=Lt(this.y,e,t),this.z=Lt(this.z,e,t),this.w=Lt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ca=class extends vi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Fn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new jr(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},kn=class extends Ca{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},qs=class extends Fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ra=class extends Fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Yt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,h,d,u,f,p,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,h,d,u,f,p,w,g)}set(e,t,i,r,s,o,a,c,l,h,d,u,f,p,w,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=w,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/kr.setFromMatrixColumn(e,0).length(),s=1/kr.setFromMatrixColumn(e,1).length(),o=1/kr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=o*h,f=o*d,p=a*h,w=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+p*l,t[5]=u-w*l,t[9]=-a*c,t[2]=w-u*l,t[6]=p+f*l,t[10]=o*c}else if(e.order==="YXZ"){let u=c*h,f=c*d,p=l*h,w=l*d;t[0]=u+w*a,t[4]=p*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=w+u*a,t[10]=o*c}else if(e.order==="ZXY"){let u=c*h,f=c*d,p=l*h,w=l*d;t[0]=u-w*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=w-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let u=o*h,f=o*d,p=a*h,w=a*d;t[0]=c*h,t[4]=p*l-f,t[8]=u*l+w,t[1]=c*d,t[5]=w*l+u,t[9]=f*l-p,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let u=o*c,f=o*l,p=a*c,w=a*l;t[0]=c*h,t[4]=w-u*d,t[8]=p*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*d+p,t[10]=u-w*d}else if(e.order==="XZY"){let u=o*c,f=o*l,p=a*c,w=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+w,t[5]=o*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*h,t[10]=w*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tf,e,Af)}lookAt(e,t,i){let r=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),Xi.crossVectors(i,Gn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),Xi.crossVectors(i,Gn)),Xi.normalize(),Bo.crossVectors(Gn,Xi),r[0]=Xi.x,r[4]=Bo.x,r[8]=Gn.x,r[1]=Xi.y,r[5]=Bo.y,r[9]=Gn.y,r[2]=Xi.z,r[6]=Bo.z,r[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],p=i[2],w=i[6],g=i[10],m=i[14],S=i[3],U=i[7],v=i[11],R=i[15],I=r[0],O=r[4],_=r[8],b=r[12],F=r[1],G=r[5],J=r[9],ne=r[13],q=r[2],K=r[6],ie=r[10],le=r[14],ve=r[3],ce=r[7],_e=r[11],Se=r[15];return s[0]=o*I+a*F+c*q+l*ve,s[4]=o*O+a*G+c*K+l*ce,s[8]=o*_+a*J+c*ie+l*_e,s[12]=o*b+a*ne+c*le+l*Se,s[1]=h*I+d*F+u*q+f*ve,s[5]=h*O+d*G+u*K+f*ce,s[9]=h*_+d*J+u*ie+f*_e,s[13]=h*b+d*ne+u*le+f*Se,s[2]=p*I+w*F+g*q+m*ve,s[6]=p*O+w*G+g*K+m*ce,s[10]=p*_+w*J+g*ie+m*_e,s[14]=p*b+w*ne+g*le+m*Se,s[3]=S*I+U*F+v*q+R*ve,s[7]=S*O+U*G+v*K+R*ce,s[11]=S*_+U*J+v*ie+R*_e,s[15]=S*b+U*ne+v*le+R*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],w=e[7],g=e[11],m=e[15],S=c*f-l*u,U=a*f-l*d,v=a*u-c*d,R=o*f-l*h,I=o*u-c*h,O=o*d-a*h;return t*(w*S-g*U+m*v)-i*(p*S-g*R+m*I)+r*(p*U-w*R+m*O)-s*(p*v-w*I+g*O)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-i*(s*h-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],w=e[13],g=e[14],m=e[15],S=t*a-i*o,U=t*c-r*o,v=t*l-s*o,R=i*c-r*a,I=i*l-s*a,O=r*l-s*c,_=h*w-d*p,b=h*g-u*p,F=h*m-f*p,G=d*g-u*w,J=d*m-f*w,ne=u*m-f*g,q=S*ne-U*J+v*G+R*F-I*b+O*_;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let K=1/q;return e[0]=(a*ne-c*J+l*G)*K,e[1]=(r*J-i*ne-s*G)*K,e[2]=(w*O-g*I+m*R)*K,e[3]=(u*I-d*O-f*R)*K,e[4]=(c*F-o*ne-l*b)*K,e[5]=(t*ne-r*F+s*b)*K,e[6]=(g*v-p*O-m*U)*K,e[7]=(h*O-u*v+f*U)*K,e[8]=(o*J-a*F+l*_)*K,e[9]=(i*F-t*J-s*_)*K,e[10]=(p*I-w*v+m*S)*K,e[11]=(d*v-h*I-f*S)*K,e[12]=(a*b-o*G-c*_)*K,e[13]=(t*G-i*b+r*_)*K,e[14]=(w*U-p*R-g*S)*K,e[15]=(h*R-d*U+u*S)*K,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+i,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,d=a+a,u=s*l,f=s*h,p=s*d,w=o*h,g=o*d,m=a*d,S=c*l,U=c*h,v=c*d,R=i.x,I=i.y,O=i.z;return r[0]=(1-(w+m))*R,r[1]=(f+v)*R,r[2]=(p-U)*R,r[3]=0,r[4]=(f-v)*I,r[5]=(1-(u+m))*I,r[6]=(g+S)*I,r[7]=0,r[8]=(p+U)*O,r[9]=(g-S)*O,r[10]=(1-(u+w))*O,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=kr.set(r[0],r[1],r[2]).length(),a=kr.set(r[4],r[5],r[6]).length(),c=kr.set(r[8],r[9],r[10]).length();s<0&&(o=-o),ei.copy(this);let l=1/o,h=1/a,d=1/c;return ei.elements[0]*=l,ei.elements[1]*=l,ei.elements[2]*=l,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,t.setFromRotationMatrix(ei),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=ri,c=!1){let l=this.elements,h=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r),p,w;if(c)p=s/(o-s),w=o*s/(o-s);else if(a===ri)p=-(o+s)/(o-s),w=-2*o*s/(o-s);else if(a===Xs)p=-o/(o-s),w=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=w,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ri,c=!1){let l=this.elements,h=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),f=-(i+r)/(i-r),p,w;if(c)p=1/(o-s),w=o/(o-s);else if(a===ri)p=-2/(o-s),w=-(o+s)/(o-s);else if(a===Xs)p=-1/(o-s),w=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=w,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},kr=new $,ei=new Yt,Tf=new $(0,0,0),Af=new $(1,1,1),Xi=new $,Bo=new $,Gn=new $,nu=new Yt,iu=new Pn,wi=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return iu.setFromEuler(this),this.setFromQuaternion(iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wi.DEFAULT_ORDER="XYZ";var Ys=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cf=0,ru=new $,Or=new Pn,Li=new Yt,zo=new $,Ds=new $,Rf=new $,If=new Pn,su=new $(1,0,0),ou=new $(0,1,0),au=new $(0,0,1),lu={type:"added"},Pf={type:"removed"},Br={type:"childadded",child:null},mc={type:"childremoved",child:null},On=class n extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new $,t=new wi,i=new Pn,r=new $(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Mt}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ys,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Or.setFromAxisAngle(e,t),this.quaternion.multiply(Or),this}rotateOnWorldAxis(e,t){return Or.setFromAxisAngle(e,t),this.quaternion.premultiply(Or),this}rotateX(e){return this.rotateOnAxis(su,e)}rotateY(e){return this.rotateOnAxis(ou,e)}rotateZ(e){return this.rotateOnAxis(au,e)}translateOnAxis(e,t){return ru.copy(e).applyQuaternion(this.quaternion),this.position.add(ru.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(su,e)}translateY(e){return this.translateOnAxis(ou,e)}translateZ(e){return this.translateOnAxis(au,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?zo.copy(e):zo.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Ds,zo,this.up):Li.lookAt(zo,Ds,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),Or.setFromRotationMatrix(Li),this.quaternion.premultiply(Or.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lu),Br.child=e,this.dispatchEvent(Br),Br.child=null):wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pf),mc.child=e,this.dispatchEvent(mc),mc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lu),Br.child=e,this.dispatchEvent(Br),Br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,Rf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,If,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=r,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};On.DEFAULT_UP=new $(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var si=class extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}},Lf={type:"move"},Qr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new si,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new si,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new si,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let w of e.hand.values()){let g=t.getJointPose(w,i),m=this._getHandJoint(l,w);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lf)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new si;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Vo={h:0,s:0,l:0};function gc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Pt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Dt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Dt.workingColorSpace){if(e=bf(e,1),t=Lt(t,0,1),i=Lt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=gc(o,s,e+1/3),this.g=gc(o,s,e),this.b=gc(o,s,e-1/3)}return Dt.colorSpaceToWorking(this,r),this}setStyle(e,t=Wn){function i(s){s!==void 0&&parseFloat(s)<1&&xt("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:xt("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);xt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wn){let i=fd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):xt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Zr(e.r),this.g=Zr(e.g),this.b=Zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wn){return Dt.workingToColorSpace(Tn.copy(this),e),Math.round(Lt(Tn.r*255,0,255))*65536+Math.round(Lt(Tn.g*255,0,255))*256+Math.round(Lt(Tn.b*255,0,255))}getHexString(e=Wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(Tn.copy(this),t);let i=Tn.r,r=Tn.g,s=Tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=Wn){Dt.workingToColorSpace(Tn.copy(this),e);let t=Tn.r,i=Tn.g,r=Tn.b;return e!==Wn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(Vo);let i=hc($i.h,Vo.h,t),r=hc($i.s,Vo.s,t),s=hc($i.l,Vo.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tn=new Pt;Pt.NAMES=fd;var es=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Pt(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},vr=class extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ti=new $,Ni=new $,xc=new $,Di=new $,zr=new $,Vr=new $,cu=new $,yc=new $,_c=new $,vc=new $,wc=new jt,bc=new jt,Mc=new jt,ki=class n{constructor(e=new $,t=new $,i=new $){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ti.subVectors(e,t),r.cross(ti);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){ti.subVectors(r,t),Ni.subVectors(i,t),xc.subVectors(e,t);let o=ti.dot(ti),a=ti.dot(Ni),c=ti.dot(xc),l=Ni.dot(Ni),h=Ni.dot(xc),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,p=(o*h-a*c)*u;return s.set(1-f-p,p,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Di.x),c.addScaledVector(o,Di.y),c.addScaledVector(a,Di.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return wc.setScalar(0),bc.setScalar(0),Mc.setScalar(0),wc.fromBufferAttribute(e,t),bc.fromBufferAttribute(e,i),Mc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(wc,s.x),o.addScaledVector(bc,s.y),o.addScaledVector(Mc,s.z),o}static isFrontFacing(e,t,i,r){return ti.subVectors(i,t),Ni.subVectors(e,t),ti.cross(Ni).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ti.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;zr.subVectors(r,i),Vr.subVectors(s,i),yc.subVectors(e,i);let c=zr.dot(yc),l=Vr.dot(yc);if(c<=0&&l<=0)return t.copy(i);_c.subVectors(e,r);let h=zr.dot(_c),d=Vr.dot(_c);if(h>=0&&d<=h)return t.copy(r);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(zr,o);vc.subVectors(e,s);let f=zr.dot(vc),p=Vr.dot(vc);if(p>=0&&f<=p)return t.copy(s);let w=f*l-c*p;if(w<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(i).addScaledVector(Vr,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return cu.subVectors(s,r),a=(d-h)/(d-h+(f-p)),t.copy(r).addScaledVector(cu,a);let m=1/(g+w+u);return o=w*m,a=u*m,t.copy(i).addScaledVector(zr,o).addScaledVector(Vr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ji=class{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ni):ni.fromBufferAttribute(s,o),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Go.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Go.copy(i.boundingBox)),Go.applyMatrix4(e.matrixWorld),this.union(Go)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),Ho.subVectors(this.max,Us),Gr.subVectors(e.a,Us),Hr.subVectors(e.b,Us),Wr.subVectors(e.c,Us),qi.subVectors(Hr,Gr),Yi.subVectors(Wr,Hr),pr.subVectors(Gr,Wr);let t=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-pr.z,pr.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,pr.z,0,-pr.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-pr.y,pr.x,0];return!Sc(t,Gr,Hr,Wr,Ho)||(t=[1,0,0,0,1,0,0,0,1],!Sc(t,Gr,Hr,Wr,Ho))?!1:(Wo.crossVectors(qi,Yi),t=[Wo.x,Wo.y,Wo.z],Sc(t,Gr,Hr,Wr,Ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ui=[new $,new $,new $,new $,new $,new $,new $,new $],ni=new $,Go=new Ji,Gr=new $,Hr=new $,Wr=new $,qi=new $,Yi=new $,pr=new $,Us=new $,Ho=new $,Wo=new $,mr=new $;function Sc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){mr.fromArray(n,s);let a=r.x*Math.abs(mr.x)+r.y*Math.abs(mr.y)+r.z*Math.abs(mr.z),c=e.dot(mr),l=t.dot(mr),h=i.dot(mr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var un=new $,Xo=new Ve,Nf=0,An=class extends vi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ld,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xo.fromBufferAttribute(this,t),Xo.applyMatrix3(e),this.setXY(t,Xo.x,Xo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.applyMatrix3(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ns(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Un(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ns(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ns(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ns(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ns(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),r=Un(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),r=Un(r,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Zs=class extends An{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Js=class extends An{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ft=class extends An{constructor(e,t,i){super(new Float32Array(e),t,i)}},Df=new Ji,Fs=new $,Ec=new $,Ki=class{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Df.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);let t=Fs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Fs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(Ec)),this.expandByPoint(Fs.copy(e.center).sub(Ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Uf=0,Zn=new Yt,Tc=new On,Xr=new $,Hn=new Ji,ks=new Ji,xn=new $,Kt=class n extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vf(e)?Js:Zs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Mt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,i){return Zn.makeTranslation(e,t,i),this.applyMatrix4(Zn),this}scale(e,t,i){return Zn.makeScale(e,t,i),this.applyMatrix4(Zn),this}lookAt(e){return Tc.lookAt(e),Tc.updateMatrix(),this.applyMatrix4(Tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xr).negate(),this.translate(Xr.x,Xr.y,Xr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ft(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){let i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(xn.addVectors(Hn.min,ks.min),Hn.expandByPoint(xn),xn.addVectors(Hn.max,ks.max),Hn.expandByPoint(xn)):(Hn.expandByPoint(ks.min),Hn.expandByPoint(ks.max))}Hn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)xn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(xn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xn.fromBufferAttribute(a,l),c&&(Xr.fromBufferAttribute(e,l),xn.add(Xr)),r=Math.max(r,i.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new An(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new $,c[_]=new $;let l=new $,h=new $,d=new $,u=new Ve,f=new Ve,p=new Ve,w=new $,g=new $;function m(_,b,F){l.fromBufferAttribute(i,_),h.fromBufferAttribute(i,b),d.fromBufferAttribute(i,F),u.fromBufferAttribute(s,_),f.fromBufferAttribute(s,b),p.fromBufferAttribute(s,F),h.sub(l),d.sub(l),f.sub(u),p.sub(u);let G=1/(f.x*p.y-p.x*f.y);isFinite(G)&&(w.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(G),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(G),a[_].add(w),a[b].add(w),a[F].add(w),c[_].add(g),c[b].add(g),c[F].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,b=S.length;_<b;++_){let F=S[_],G=F.start,J=F.count;for(let ne=G,q=G+J;ne<q;ne+=3)m(e.getX(ne+0),e.getX(ne+1),e.getX(ne+2))}let U=new $,v=new $,R=new $,I=new $;function O(_){R.fromBufferAttribute(r,_),I.copy(R);let b=a[_];U.copy(b),U.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(I,b);let G=v.dot(c[_])<0?-1:1;o.setXYZW(_,U.x,U.y,U.z,G)}for(let _=0,b=S.length;_<b;++_){let F=S[_],G=F.start,J=F.count;for(let ne=G,q=G+J;ne<q;ne+=3)O(e.getX(ne+0)),O(e.getX(ne+1)),O(e.getX(ne+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let r=new $,s=new $,o=new $,a=new $,c=new $,l=new $,h=new $,d=new $;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),w=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,w),o.fromBufferAttribute(t,g),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,w),l.fromBufferAttribute(i,g),a.add(h),c.add(h),l.add(h),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(w,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)xn.fromBufferAttribute(e,t),xn.normalize(),e.setXYZ(t,xn.x,xn.y,xn.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,p=0;for(let w=0,g=c.length;w<g;w++){a.isInterleavedBufferAttribute?f=c[w]*a.data.stride+a.offset:f=c[w]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new An(u,h,d)}if(this.index===null)return xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=e(u,i);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ac=new $,Ff=new $,kf=new Mt,ii=class{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Ac.subVectors(i,t).cross(Ff.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Ac),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||kf.getNormalMatrix(e),r=this.coplanarPoint(Ac).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Of=0,Bi=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=hs,this.side=ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kc,this.blendDst=jc,this.blendEquation=Tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pa,this.stencilZFail=pa,this.stencilZPass=pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){xt(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){xt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Pt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ii().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ve().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Fi=new $,Cc=new $,$o=new $,qo=new $,ts=class{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Cc.copy(e).add(t).multiplyScalar(.5),$o.copy(t).sub(e).normalize(),qo.copy(this.origin).sub(Cc);let s=e.distanceTo(t)*.5,o=-this.direction.dot($o),a=qo.dot(this.direction),c=-qo.dot($o),l=qo.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*c-a,u=o*a-c,p=s*h,d>=0)if(u>=-p)if(u<=p){let w=1/h;d*=w,u*=w,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Cc).addScaledVector($o,u),f}intersectSphere(e,t){if(e.radius<0)return null;Fi.subVectors(e.center,this.origin);let i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,i,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,d=e.x-o.x,u=e.y-o.y,f=e.z-o.z,p=t.x-o.x,w=t.y-o.y,g=t.z-o.z,m=i.x-o.x,S=i.y-o.y,U=i.z-o.z,v=Math.abs(c),R=Math.abs(l),I=Math.abs(h),O,_,b,F,G,J,ne,q,K,ie,le,ve;if(v>=R&&v>=I?(b=c,J=d,K=p,ve=m,c>=0?(O=l,_=h,F=u,G=f,ne=w,q=g,ie=S,le=U):(O=h,_=l,F=f,G=u,ne=g,q=w,ie=U,le=S)):R>=I?(b=l,J=u,K=w,ve=S,l>=0?(O=h,_=c,F=f,G=d,ne=g,q=p,ie=U,le=m):(O=c,_=h,F=d,G=f,ne=p,q=g,ie=m,le=U)):(b=h,J=f,K=g,ve=U,h>=0?(O=c,_=l,F=d,G=u,ne=p,q=w,ie=m,le=S):(O=l,_=c,F=u,G=d,ne=w,q=p,ie=S,le=m)),b===0)return null;let ce=O/b,_e=_/b,Se=1/b,et=F-ce*J,ye=G-_e*J,oe=ne-ce*K,Ae=q-_e*K,He=ie-ce*ve,ue=le-_e*ve,ge=He*Ae-ue*oe,V=et*ue-ye*He,we=oe*ye-Ae*et;if(r){if(ge<0||V<0||we<0)return null}else if((ge<0||V<0||we<0)&&(ge>0||V>0||we>0))return null;let Ce=ge+V+we;if(Ce===0)return null;let ke=Se*(ge*J+V*K+we*ve);return(Ce>0?ke<0:ke>0)?null:this.at(ke/Ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wr=class extends Bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},hu=new Yt,gr=new ts,Yo=new Ki,uu=new $,Zo=new $,Jo=new $,Ko=new $,Rc=new $,jo=new $,du=new $,Qo=new $,_n=class extends On{constructor(e=new Kt,t=new wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){jo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=a[c],d=s[c];h!==0&&(Rc.fromBufferAttribute(d,e),o?jo.addScaledVector(Rc,h):jo.addScaledVector(Rc.sub(t),h))}t.add(jo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Yo.copy(i.boundingSphere),Yo.applyMatrix4(s),gr.copy(e.ray).recast(e.near),!(Yo.containsPoint(gr.origin)===!1&&(gr.intersectSphere(Yo,uu)===null||gr.origin.distanceToSquared(uu)>(e.far-e.near)**2))&&(hu.copy(s).invert(),gr.copy(e.ray).applyMatrix4(hu),!(i.boundingBox!==null&&gr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,gr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,w=u.length;p<w;p++){let g=u[p],m=o[g.materialIndex],S=Math.max(g.start,f.start),U=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=S,R=U;v<R;v+=3){let I=a.getX(v),O=a.getX(v+1),_=a.getX(v+2);r=ea(this,m,e,i,l,h,d,I,O,_),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,f.start),w=Math.min(a.count,f.start+f.count);for(let g=p,m=w;g<m;g+=3){let S=a.getX(g),U=a.getX(g+1),v=a.getX(g+2);r=ea(this,o,e,i,l,h,d,S,U,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,w=u.length;p<w;p++){let g=u[p],m=o[g.materialIndex],S=Math.max(g.start,f.start),U=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let v=S,R=U;v<R;v+=3){let I=v,O=v+1,_=v+2;r=ea(this,m,e,i,l,h,d,I,O,_),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,f.start),w=Math.min(c.count,f.start+f.count);for(let g=p,m=w;g<m;g+=3){let S=g,U=g+1,v=g+2;r=ea(this,o,e,i,l,h,d,S,U,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Bf(n,e,t,i,r,s,o,a){let c;if(e.side===Ln?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===ir,a),c===null)return null;Qo.copy(a),Qo.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Qo);return l<t.near||l>t.far?null:{distance:l,point:Qo.clone(),object:n}}function ea(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Zo),n.getVertexPosition(c,Jo),n.getVertexPosition(l,Ko);let h=Bf(n,e,t,i,Zo,Jo,Ko,du);if(h){let d=new $;ki.getBarycoord(du,Zo,Jo,Ko,d),r&&(h.uv=ki.getInterpolatedAttribute(r,a,c,l,d,new Ve)),s&&(h.uv1=ki.getInterpolatedAttribute(s,a,c,l,d,new Ve)),o&&(h.normal=ki.getInterpolatedAttribute(o,a,c,l,d,new $),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new $,materialIndex:0};ki.getNormal(Zo,Jo,Ko,u.normal),h.face=u,h.barycoord=d}return h}var Ia=class extends Fn{constructor(e=null,t=1,i=1,r,s,o,a,c,l=yn,h=yn,d,u){super(null,o,a,c,l,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xr=new Ki,zf=new Ve(.5,.5),ta=new $,Ks=class{constructor(e=new ii,t=new ii,i=new ii,r=new ii,s=new ii,o=new ii){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ri,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],f=s[7],p=s[8],w=s[9],g=s[10],m=s[11],S=s[12],U=s[13],v=s[14],R=s[15];if(r[0].setComponents(l-o,f-h,m-p,R-S).normalize(),r[1].setComponents(l+o,f+h,m+p,R+S).normalize(),r[2].setComponents(l+a,f+d,m+w,R+U).normalize(),r[3].setComponents(l-a,f-d,m-w,R-U).normalize(),i)r[4].setComponents(c,u,g,v).normalize(),r[5].setComponents(l-c,f-u,m-g,R-v).normalize();else if(r[4].setComponents(l-c,f-u,m-g,R-v).normalize(),t===ri)r[5].setComponents(l+c,f+u,m+g,R+v).normalize();else if(t===Xs)r[5].setComponents(c,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xr)}intersectsSprite(e){xr.center.set(0,0,0);let t=zf.distanceTo(e.center);return xr.radius=.7071067811865476+t,xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(xr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(ta.x=r.normal.x>0?e.max.x:e.min.x,ta.y=r.normal.y>0?e.max.y:e.min.y,ta.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ta)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var br=class extends Bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pa=new $,La=new $,fu=new Yt,Os=new ts,na=new Ki,Ic=new $,pu=new $,ns=class extends On{constructor(e=new Kt,t=new br){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Pa.fromBufferAttribute(t,r-1),La.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Pa.distanceTo(La);e.setAttribute("lineDistance",new Ft(i,1))}else xt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(r),na.radius+=s,e.ray.intersectsSphere(na)===!1)return;fu.copy(r).invert(),Os.copy(e.ray).applyMatrix4(fu);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let w=f,g=p-1;w<g;w+=l){let m=h.getX(w),S=h.getX(w+1),U=ia(this,e,Os,c,m,S,w);U&&t.push(U)}if(this.isLineLoop){let w=h.getX(p-1),g=h.getX(f),m=ia(this,e,Os,c,w,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let w=f,g=p-1;w<g;w+=l){let m=ia(this,e,Os,c,w,w+1,w);m&&t.push(m)}if(this.isLineLoop){let w=ia(this,e,Os,c,p-1,f,p-1);w&&t.push(w)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ia(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(Pa.fromBufferAttribute(a,r),La.fromBufferAttribute(a,s),t.distanceSqToSegment(Pa,La,Ic,pu)>i)return;Ic.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Ic);if(!(l<e.near||l>e.far))return{distance:l,point:pu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var mu=new $,gu=new $,js=class extends ns{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)mu.fromBufferAttribute(t,r),gu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+mu.distanceTo(gu);e.setAttribute("lineDistance",new Ft(i,1))}else xt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var is=class extends Bi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xu=new Yt,zc=new ts,ra=new Ki,sa=new $,Qs=class extends On{constructor(e=new Kt,t=new is){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ra.copy(i.boundingSphere),ra.applyMatrix4(r),ra.radius+=s,e.ray.intersectsSphere(ra)===!1)return;xu.copy(r).invert(),zc.copy(e.ray).applyMatrix4(xu);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=u,w=f;p<w;p++){let g=l.getX(p);sa.fromBufferAttribute(d,g),yu(sa,g,c,r,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,w=f;p<w;p++)sa.fromBufferAttribute(d,p),yu(sa,p,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function yu(n,e,t,i,r,s,o){let a=zc.distanceSqToPoint(n);if(a<t){let c=new $;zc.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var eo=class extends Fn{constructor(e=[],t=rr,i,r,s,o,a,c,l,h){super(e,t,i,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var ji=class extends Fn{constructor(e,t,i=ai,r,s,o,a=yn,c=yn,l,h=_i,d=1){if(h!==_i&&h!==or)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,r,s,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Na=class extends ji{constructor(e,t=ai,i=rr,r,s,o=yn,a=yn,c,l=_i){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},to=class extends Fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Qi=class n extends Kt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,i,t,e,o,s,0),p("z","y","x",1,-1,i,t,-e,o,s,1),p("x","z","y",1,1,e,i,t,r,o,2),p("x","z","y",1,-1,e,i,-t,r,o,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(d,2));function p(w,g,m,S,U,v,R,I,O,_,b){let F=v/O,G=R/_,J=v/2,ne=R/2,q=I/2,K=O+1,ie=_+1,le=0,ve=0,ce=new $;for(let _e=0;_e<ie;_e++){let Se=_e*G-ne;for(let et=0;et<K;et++){let ye=et*F-J;ce[w]=ye*S,ce[g]=Se*U,ce[m]=q,l.push(ce.x,ce.y,ce.z),ce[w]=0,ce[g]=0,ce[m]=I>0?1:-1,h.push(ce.x,ce.y,ce.z),d.push(et/O),d.push(1-_e/_),le+=1}}for(let _e=0;_e<_;_e++)for(let Se=0;Se<O;Se++){let et=u+Se+K*_e,ye=u+Se+K*(_e+1),oe=u+(Se+1)+K*(_e+1),Ae=u+(Se+1)+K*_e;c.push(et,ye,Ae),c.push(ye,oe,Ae),ve+=6}a.addGroup(f,ve,b),f+=ve,u+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var rs=class n extends Kt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],f=[],p=0,w=[],g=i/2,m=0;S(),o===!1&&(e>0&&U(!0),t>0&&U(!1)),this.setIndex(h),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(f,2));function S(){let v=new $,R=new $,I=0,O=(t-e)/i;for(let _=0;_<=s;_++){let b=[],F=_/s,G=F*(t-e)+e;for(let J=0;J<=r;J++){let ne=J/r,q=ne*c+a,K=Math.sin(q),ie=Math.cos(q);R.x=G*K,R.y=-F*i+g,R.z=G*ie,d.push(R.x,R.y,R.z),v.set(K,O,ie).normalize(),u.push(v.x,v.y,v.z),f.push(ne,1-F),b.push(p++)}w.push(b)}for(let _=0;_<r;_++)for(let b=0;b<s;b++){let F=w[b][_],G=w[b+1][_],J=w[b+1][_+1],ne=w[b][_+1];(e>0||b!==0)&&(h.push(F,G,ne),I+=3),(t>0||b!==s-1)&&(h.push(G,J,ne),I+=3)}l.addGroup(m,I,0),m+=I}function U(v){let R=p,I=new Ve,O=new $,_=0,b=v===!0?e:t,F=v===!0?1:-1;for(let J=1;J<=r;J++)d.push(0,g*F,0),u.push(0,F,0),f.push(.5,.5),p++;let G=p;for(let J=0;J<=r;J++){let q=J/r*c+a,K=Math.cos(q),ie=Math.sin(q);O.x=b*ie,O.y=g*F,O.z=b*K,d.push(O.x,O.y,O.z),u.push(0,F,0),I.x=K*.5+.5,I.y=ie*.5*F+.5,f.push(I.x,I.y),p++}for(let J=0;J<r;J++){let ne=R+J,q=G+J;v===!0?h.push(q,q+1,ne):h.push(q+1,q,ne),_+=3}l.addGroup(m,_,v===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},bi=class n extends rs{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Da=class n extends Kt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],o=[];a(r),l(i),h(),this.setAttribute("position",new Ft(s,3)),this.setAttribute("normal",new Ft(s.slice(),3)),this.setAttribute("uv",new Ft(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let U=new $,v=new $,R=new $;for(let I=0;I<t.length;I+=3)f(t[I+0],U),f(t[I+1],v),f(t[I+2],R),c(U,v,R,S)}function c(S,U,v,R){let I=R+1,O=[];for(let _=0;_<=I;_++){O[_]=[];let b=S.clone().lerp(v,_/I),F=U.clone().lerp(v,_/I),G=I-_;for(let J=0;J<=G;J++)J===0&&_===I?O[_][J]=b:O[_][J]=b.clone().lerp(F,J/G)}for(let _=0;_<I;_++)for(let b=0;b<2*(I-_)-1;b++){let F=Math.floor(b/2);b%2===0?(u(O[_][F+1]),u(O[_+1][F]),u(O[_][F])):(u(O[_][F+1]),u(O[_+1][F+1]),u(O[_+1][F]))}}function l(S){let U=new $;for(let v=0;v<s.length;v+=3)U.x=s[v+0],U.y=s[v+1],U.z=s[v+2],U.normalize().multiplyScalar(S),s[v+0]=U.x,s[v+1]=U.y,s[v+2]=U.z}function h(){let S=new $;for(let U=0;U<s.length;U+=3){S.x=s[U+0],S.y=s[U+1],S.z=s[U+2];let v=g(S)/2/Math.PI+.5,R=m(S)/Math.PI+.5;o.push(v,1-R)}p(),d()}function d(){for(let S=0;S<o.length;S+=6){let U=o[S+0],v=o[S+2],R=o[S+4],I=Math.max(U,v,R),O=Math.min(U,v,R);I>.9&&O<.1&&(U<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),R<.2&&(o[S+4]+=1))}}function u(S){s.push(S.x,S.y,S.z)}function f(S,U){let v=S*3;U.x=e[v+0],U.y=e[v+1],U.z=e[v+2]}function p(){let S=new $,U=new $,v=new $,R=new $,I=new Ve,O=new Ve,_=new Ve;for(let b=0,F=0;b<s.length;b+=9,F+=6){S.set(s[b+0],s[b+1],s[b+2]),U.set(s[b+3],s[b+4],s[b+5]),v.set(s[b+6],s[b+7],s[b+8]),I.set(o[F+0],o[F+1]),O.set(o[F+2],o[F+3]),_.set(o[F+4],o[F+5]),R.copy(S).add(U).add(v).divideScalar(3);let G=g(R);w(I,F+0,S,G),w(O,F+2,U,G),w(_,F+4,v,G)}}function w(S,U,v,R){R<0&&S.x===1&&(o[U]=S.x-1),v.x===0&&v.z===0&&(o[U]=R/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var oa=new $,aa=new $,Pc=new $,la=new ki,ss=class extends Kt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(ma*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<c;p+=3){o?(l[0]=o.getX(p),l[1]=o.getX(p+1),l[2]=o.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:w,b:g,c:m}=la;if(w.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),la.getNormal(Pc),d[0]=`${Math.round(w.x*r)},${Math.round(w.y*r)},${Math.round(w.z*r)}`,d[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){let U=(S+1)%3,v=d[S],R=d[U],I=la[h[S]],O=la[h[U]],_=`${v}_${R}`,b=`${R}_${v}`;b in u&&u[b]?(Pc.dot(u[b].normal)<=s&&(f.push(I.x,I.y,I.z),f.push(O.x,O.y,O.z)),u[b]=null):_ in u||(u[_]={index0:l[S],index1:l[U],normal:Pc.clone()})}}for(let p in u)if(u[p]){let{index0:w,index1:g}=u[p];oa.fromBufferAttribute(a,w),aa.fromBufferAttribute(a,g),f.push(oa.x,oa.y,oa.z),f.push(aa.x,aa.y,aa.z)}this.setAttribute("position",new Ft(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){xt("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(s-1);let h=i[r],u=i[r+1]-h,f=(o-h)/u;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new Ve:new $);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new $,r=[],s=[],o=[],a=new $,c=new Yt;for(let f=0;f<=e;f++){let p=f/e;r[f]=this.getTangentAt(p,new $)}s[0]=new $,o[0]=new $;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),u<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Lt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Lt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(r[p],f*p)),o[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},os=class extends Xn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new Ve){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ua=class extends os{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function yh(){let n=0,e=0,t=0,i=0;function r(s,o,a,c){n=s,e=a,t=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,d){let u=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,r(o,a,u,f)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var _u=new $,vu=new $,Lc=new yh,Nc=new yh,Dc=new yh,Fa=class extends Xn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new $){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(vu.subVectors(r[0],r[1]).add(r[0]),l=vu);let d=r[a%s],u=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(_u.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=_u),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),f),w=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);w<1e-4&&(w=1),p<1e-4&&(p=w),g<1e-4&&(g=w),Lc.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,w,g),Nc.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,w,g),Dc.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,w,g)}else this.curveType==="catmullrom"&&(Lc.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Nc.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Dc.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return i.set(Lc.calc(c),Nc.calc(c),Dc.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new $().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function wu(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,c=n*a;return(2*t-2*i+s+o)*c+(-3*t+3*i-2*s-o)*a+s*n+t}function Vf(n,e){let t=1-n;return t*t*e}function Gf(n,e){return 2*(1-n)*n*e}function Hf(n,e){return n*n*e}function zs(n,e,t,i){return Vf(n,e)+Gf(n,t)+Hf(n,i)}function Wf(n,e){let t=1-n;return t*t*t*e}function Xf(n,e){let t=1-n;return 3*t*t*n*e}function $f(n,e){return 3*(1-n)*n*n*e}function qf(n,e){return n*n*n*e}function Vs(n,e,t,i,r){return Wf(n,e)+Xf(n,t)+$f(n,i)+qf(n,r)}var no=class extends Xn{constructor(e=new Ve,t=new Ve,i=new Ve,r=new Ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ve){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Vs(e,r.x,s.x,o.x,a.x),Vs(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ka=class extends Xn{constructor(e=new $,t=new $,i=new $,r=new $){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new $){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Vs(e,r.x,s.x,o.x,a.x),Vs(e,r.y,s.y,o.y,a.y),Vs(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},io=class extends Xn{constructor(e=new Ve,t=new Ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ve){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends Xn{constructor(e=new $,t=new $){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new $){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new $){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ro=class extends Xn{constructor(e=new Ve,t=new Ve,i=new Ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ve){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(zs(e,r.x,s.x,o.x),zs(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends Xn{constructor(e=new $,t=new $,i=new $){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new $){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(zs(e,r.x,s.x,o.x),zs(e,r.y,s.y,o.y),zs(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},so=class extends Xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ve){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(wu(a,c.x,l.x,h.x,d.x),wu(a,c.y,l.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Ve().fromArray(r))}return this}},Vc=Object.freeze({__proto__:null,ArcCurve:Ua,CatmullRomCurve3:Fa,CubicBezierCurve:no,CubicBezierCurve3:ka,EllipseCurve:os,LineCurve:io,LineCurve3:Oa,QuadraticBezierCurve:ro,QuadraticBezierCurve3:Ba,SplineCurve:so}),za=class extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vc[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Vc[r.type]().fromJSON(r))}return this}},oo=class extends za{constructor(e){super(),this.type="Path",this.currentPoint=new Ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new io(this.currentPoint.clone(),new Ve(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new ro(this.currentPoint.clone(),new Ve(e,t),new Ve(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){let a=new no(this.currentPoint.clone(),new Ve(e,t),new Ve(i,r),new Ve(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new so(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,r,s,o,a,c),this}absellipse(e,t,i,r,s,o,a,c){let l=new os(e,t,i,r,s,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},as=class extends oo{constructor(e){super(e),this.uuid=fs(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new oo().fromJSON(r))}return this}};function Yf(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=pd(n,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(i&&(s=Qf(n,e,s,t)),n.length>80*t){a=n[0],c=n[1];let h=a,d=c;for(let u=t;u<r;u+=t){let f=n[u],p=n[u+1];f<a&&(a=f),p<c&&(c=p),f>h&&(h=f),p>d&&(d=p)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return ao(s,o,t,a,c,l,0),o}function pd(n,e,t,i,r){let s;if(r===hp(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=bu(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=bu(o/i|0,n[o],n[o+1],s);return s&&ls(s,s.next)&&(co(s),s=s.next),s}function Mr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ls(t,t.next)||on(t.prev,t,t.next)===0)){if(co(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ao(n,e,t,i,r,s,o){if(!n)return;!o&&s&&rp(n,i,r,s);let a=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(s?Jf(n,i,r,s):Zf(n)){e.push(c.i,n.i,l.i),co(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=Kf(Mr(n),e),ao(n,e,t,i,r,s,2)):o===2&&jf(n,e,t,i,r,s):ao(Mr(n),e,t,i,r,s,1);break}}}function Zf(n){let e=n.prev,t=n,i=n.next;if(on(e,t,i)>=0)return!1;let r=e.x,s=t.x,o=i.x,a=e.y,c=t.y,l=i.y,h=Math.min(r,s,o),d=Math.min(a,c,l),u=Math.max(r,s,o),f=Math.max(a,c,l),p=i.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Bs(r,a,s,c,o,l,p.x,p.y)&&on(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Jf(n,e,t,i){let r=n.prev,s=n,o=n.next;if(on(r,s,o)>=0)return!1;let a=r.x,c=s.x,l=o.x,h=r.y,d=s.y,u=o.y,f=Math.min(a,c,l),p=Math.min(h,d,u),w=Math.max(a,c,l),g=Math.max(h,d,u),m=Gc(f,p,e,t,i),S=Gc(w,g,e,t,i),U=n.prevZ,v=n.nextZ;for(;U&&U.z>=m&&v&&v.z<=S;){if(U.x>=f&&U.x<=w&&U.y>=p&&U.y<=g&&U!==r&&U!==o&&Bs(a,h,c,d,l,u,U.x,U.y)&&on(U.prev,U,U.next)>=0||(U=U.prevZ,v.x>=f&&v.x<=w&&v.y>=p&&v.y<=g&&v!==r&&v!==o&&Bs(a,h,c,d,l,u,v.x,v.y)&&on(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;U&&U.z>=m;){if(U.x>=f&&U.x<=w&&U.y>=p&&U.y<=g&&U!==r&&U!==o&&Bs(a,h,c,d,l,u,U.x,U.y)&&on(U.prev,U,U.next)>=0)return!1;U=U.prevZ}for(;v&&v.z<=S;){if(v.x>=f&&v.x<=w&&v.y>=p&&v.y<=g&&v!==r&&v!==o&&Bs(a,h,c,d,l,u,v.x,v.y)&&on(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Kf(n,e){let t=n;do{let i=t.prev,r=t.next.next;!ls(i,r)&&gd(i,t,t.next,r)&&lo(i,r)&&lo(r,i)&&(e.push(i.i,t.i,r.i),co(t),co(t.next),t=n=r),t=t.next}while(t!==n);return Mr(t)}function jf(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ap(o,a)){let c=xd(o,a);o=Mr(o,o.next),c=Mr(c,c.next),ao(o,e,t,i,r,s,0),ao(c,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Qf(n,e,t,i){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*i,c=s<o-1?e[s+1]*i:n.length,l=pd(n,a,c,i,!1);l===l.next&&(l.steiner=!0),r.push(op(l))}r.sort(ep);for(let s=0;s<r.length;s++)t=tp(r[s],t);return t}function ep(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function tp(n,e){let t=np(n,e);if(!t)return e;let i=xd(t,n);return Mr(i,i.next),Mr(t,t.next)}function np(n,e){let t=e,i=n.x,r=n.y,s=-1/0,o;if(ls(n,t))return t;do{if(ls(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>s&&(s=d,o=t.x<t.next.x?t:t.next,d===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(i>=t.x&&t.x>=c&&i!==t.x&&md(r<l?i:s,r,c,l,r<l?s:i,r,t.x,t.y)){let d=Math.abs(r-t.y)/(i-t.x);lo(t,n)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&ip(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function ip(n,e){return on(n.prev,n,e.prev)<0&&on(e.next,n,n.next)<0}function rp(n,e,t,i){let r=n;do r.z===0&&(r.z=Gc(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,sp(r)}function sp(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function Gc(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function op(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function md(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Bs(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&md(n,e,t,i,r,s,o,a)}function ap(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!lp(n,e)&&(lo(n,e)&&lo(e,n)&&cp(n,e)&&(on(n.prev,n,e.prev)||on(n,e.prev,e))||ls(n,e)&&on(n.prev,n,n.next)>0&&on(e.prev,e,e.next)>0)}function on(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ls(n,e){return n.x===e.x&&n.y===e.y}function gd(n,e,t,i){let r=ha(on(n,e,t)),s=ha(on(n,e,i)),o=ha(on(t,i,n)),a=ha(on(t,i,e));return!!(r!==s&&o!==a||r===0&&ca(n,t,e)||s===0&&ca(n,i,e)||o===0&&ca(t,n,i)||a===0&&ca(t,e,i))}function ca(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ha(n){return n>0?1:n<0?-1:0}function lp(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&gd(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function lo(n,e){return on(n.prev,n,n.next)<0?on(n,e,n.next)>=0&&on(n,n.prev,e)>=0:on(n,e,n.prev)<0||on(n,n.next,e)<0}function cp(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function xd(n,e){let t=Hc(n.i,n.x,n.y),i=Hc(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function bu(n,e,t,i){let r=Hc(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function co(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Hc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hp(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}var Wc=class{static triangulate(e,t,i=2){return Yf(e,t,i)}},yr=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];Mu(e),Su(i,e);let o=e.length;t.forEach(Mu);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,Su(i,t[c]);let a=Wc.triangulate(i,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}};function Mu(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Su(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var ho=class n extends Kt{constructor(e=new as([new Ve(.5,.5),new Ve(-.5,.5),new Ve(-.5,-.5),new Ve(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new Ft(r,3)),this.setAttribute("uv",new Ft(s,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,w=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:up,U,v=!1,R,I,O,_;if(m){U=m.getSpacedPoints(h),v=!0,u=!1;let xe=m.isCatmullRomCurve3?m.closed:!1;R=m.computeFrenetFrames(h,xe),I=new $,O=new $,_=new $}u||(g=0,f=0,p=0,w=0);let b=a.extractPoints(l),F=b.shape,G=b.holes;if(!yr.isClockWise(F)){F=F.reverse();for(let xe=0,Ee=G.length;xe<Ee;xe++){let Ie=G[xe];yr.isClockWise(Ie)&&(G[xe]=Ie.reverse())}}function ne(xe){let Ie=10000000000000001e-36,Pe=xe[0];for(let ze=1;ze<=xe.length;ze++){let ct=ze%xe.length,nt=xe[ct],ht=nt.x-Pe.x,mt=nt.y-Pe.y,X=ht*ht+mt*mt,At=Math.max(Math.abs(nt.x),Math.abs(nt.y),Math.abs(Pe.x),Math.abs(Pe.y)),he=Ie*At*At;if(X<=he){xe.splice(ct,1),ze--;continue}Pe=nt}}ne(F),G.forEach(ne);let q=G.length,K=F;for(let xe=0;xe<q;xe++){let Ee=G[xe];F=F.concat(Ee)}function ie(xe,Ee,Ie){return Ee||wt("ExtrudeGeometry: vec does not exist"),xe.clone().addScaledVector(Ee,Ie)}let le=F.length;function ve(xe,Ee,Ie){let Pe,ze,ct,nt=xe.x-Ee.x,ht=xe.y-Ee.y,mt=Ie.x-xe.x,X=Ie.y-xe.y,At=nt*nt+ht*ht,he=nt*X-ht*mt;if(Math.abs(he)>Number.EPSILON){let C=Math.sqrt(At),x=Math.sqrt(mt*mt+X*X),ee=Ee.x-ht/C,se=Ee.y+nt/C,me=Ie.x-X/x,Ne=Ie.y+mt/x,Fe=((me-ee)*X-(Ne-se)*mt)/(nt*X-ht*mt);Pe=ee+nt*Fe-xe.x,ze=se+ht*Fe-xe.y;let de=Pe*Pe+ze*ze;if(de<=2)return new Ve(Pe,ze);ct=Math.sqrt(de/2)}else{let C=!1;nt>Number.EPSILON?mt>Number.EPSILON&&(C=!0):nt<-Number.EPSILON?mt<-Number.EPSILON&&(C=!0):Math.sign(ht)===Math.sign(X)&&(C=!0),C?(Pe=-ht,ze=nt,ct=Math.sqrt(At)):(Pe=nt,ze=ht,ct=Math.sqrt(At/2))}return new Ve(Pe/ct,ze/ct)}let ce=[];for(let xe=0,Ee=K.length,Ie=Ee-1,Pe=xe+1;xe<Ee;xe++,Ie++,Pe++)Ie===Ee&&(Ie=0),Pe===Ee&&(Pe=0),ce[xe]=ve(K[xe],K[Ie],K[Pe]);let _e=[],Se,et=ce.concat();for(let xe=0,Ee=q;xe<Ee;xe++){let Ie=G[xe];Se=[];for(let Pe=0,ze=Ie.length,ct=ze-1,nt=Pe+1;Pe<ze;Pe++,ct++,nt++)ct===ze&&(ct=0),nt===ze&&(nt=0),Se[Pe]=ve(Ie[Pe],Ie[ct],Ie[nt]);_e.push(Se),et=et.concat(Se)}let ye;if(g===0)ye=yr.triangulateShape(K,G);else{let xe=[],Ee=[];for(let Ie=0;Ie<g;Ie++){let Pe=Ie/g,ze=f*Math.cos(Pe*Math.PI/2),ct=p*Math.sin(Pe*Math.PI/2)+w;for(let nt=0,ht=K.length;nt<ht;nt++){let mt=ie(K[nt],ce[nt],ct);V(mt.x,mt.y,-ze),Pe===0&&xe.push(mt)}for(let nt=0,ht=q;nt<ht;nt++){let mt=G[nt];Se=_e[nt];let X=[];for(let At=0,he=mt.length;At<he;At++){let C=ie(mt[At],Se[At],ct);V(C.x,C.y,-ze),Pe===0&&X.push(C)}Pe===0&&Ee.push(X)}}ye=yr.triangulateShape(xe,Ee)}let oe=ye.length,Ae=p+w;for(let xe=0;xe<le;xe++){let Ee=u?ie(F[xe],et[xe],Ae):F[xe];v?(O.copy(R.normals[0]).multiplyScalar(Ee.x),I.copy(R.binormals[0]).multiplyScalar(Ee.y),_.copy(U[0]).add(O).add(I),V(_.x,_.y,_.z)):V(Ee.x,Ee.y,0)}for(let xe=1;xe<=h;xe++)for(let Ee=0;Ee<le;Ee++){let Ie=u?ie(F[Ee],et[Ee],Ae):F[Ee];v?(O.copy(R.normals[xe]).multiplyScalar(Ie.x),I.copy(R.binormals[xe]).multiplyScalar(Ie.y),_.copy(U[xe]).add(O).add(I),V(_.x,_.y,_.z)):V(Ie.x,Ie.y,d/h*xe)}for(let xe=g-1;xe>=0;xe--){let Ee=xe/g,Ie=f*Math.cos(Ee*Math.PI/2),Pe=p*Math.sin(Ee*Math.PI/2)+w;for(let ze=0,ct=K.length;ze<ct;ze++){let nt=ie(K[ze],ce[ze],Pe);V(nt.x,nt.y,d+Ie)}for(let ze=0,ct=G.length;ze<ct;ze++){let nt=G[ze];Se=_e[ze];for(let ht=0,mt=nt.length;ht<mt;ht++){let X=ie(nt[ht],Se[ht],Pe);v?V(X.x,X.y+U[h-1].y,U[h-1].x+Ie):V(X.x,X.y,d+Ie)}}}He(),ue();function He(){let xe=r.length/3;if(u){let Ee=0,Ie=le*Ee;for(let Pe=0;Pe<oe;Pe++){let ze=ye[Pe];we(ze[2]+Ie,ze[1]+Ie,ze[0]+Ie)}Ee=h+g*2,Ie=le*Ee;for(let Pe=0;Pe<oe;Pe++){let ze=ye[Pe];we(ze[0]+Ie,ze[1]+Ie,ze[2]+Ie)}}else{for(let Ee=0;Ee<oe;Ee++){let Ie=ye[Ee];we(Ie[2],Ie[1],Ie[0])}for(let Ee=0;Ee<oe;Ee++){let Ie=ye[Ee];we(Ie[0]+le*h,Ie[1]+le*h,Ie[2]+le*h)}}i.addGroup(xe,r.length/3-xe,0)}function ue(){let xe=r.length/3,Ee=0;ge(K,Ee),Ee+=K.length;for(let Ie=0,Pe=G.length;Ie<Pe;Ie++){let ze=G[Ie];ge(ze,Ee),Ee+=ze.length}i.addGroup(xe,r.length/3-xe,1)}function ge(xe,Ee){let Ie=xe.length;for(;--Ie>=0;){let Pe=Ie,ze=Ie-1;ze<0&&(ze=xe.length-1);for(let ct=0,nt=h+g*2;ct<nt;ct++){let ht=le*ct,mt=le*(ct+1),X=Ee+Pe+ht,At=Ee+ze+ht,he=Ee+ze+mt,C=Ee+Pe+mt;Ce(X,At,he,C)}}}function V(xe,Ee,Ie){c.push(xe),c.push(Ee),c.push(Ie)}function we(xe,Ee,Ie){ke(xe),ke(Ee),ke(Ie);let Pe=r.length/3,ze=S.generateTopUV(i,r,Pe-3,Pe-2,Pe-1);lt(ze[0]),lt(ze[1]),lt(ze[2])}function Ce(xe,Ee,Ie,Pe){ke(xe),ke(Ee),ke(Pe),ke(Ee),ke(Ie),ke(Pe);let ze=r.length/3,ct=S.generateSideWallUV(i,r,ze-6,ze-3,ze-2,ze-1);lt(ct[0]),lt(ct[1]),lt(ct[3]),lt(ct[1]),lt(ct[2]),lt(ct[3])}function ke(xe){r.push(c[xe*3+0]),r.push(c[xe*3+1]),r.push(c[xe*3+2])}function lt(xe){s.push(xe.x),s.push(xe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return dp(t,i,e)}static fromJSON(e,t){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Vc[r.type]().fromJSON(r)),new n(i,e.options)}},up={generateTopUV:function(n,e,t,i,r){let s=e[t*3],o=e[t*3+1],a=e[i*3],c=e[i*3+1],l=e[r*3],h=e[r*3+1];return[new Ve(s,o),new Ve(a,c),new Ve(l,h)]},generateSideWallUV:function(n,e,t,i,r,s){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[i*3],h=e[i*3+1],d=e[i*3+2],u=e[r*3],f=e[r*3+1],p=e[r*3+2],w=e[s*3],g=e[s*3+1],m=e[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new Ve(o,1-c),new Ve(l,1-d),new Ve(u,1-p),new Ve(w,1-m)]:[new Ve(a,1-c),new Ve(h,1-d),new Ve(f,1-p),new Ve(g,1-m)]}};function dp(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var uo=class n extends Da{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var Sr=class n extends Kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,h=c+1,d=e/a,u=t/c,f=[],p=[],w=[],g=[];for(let m=0;m<h;m++){let S=m*u-o;for(let U=0;U<l;U++){let v=U*d-s;p.push(v,-S,0),w.push(0,0,1),g.push(U/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<a;S++){let U=S+l*m,v=S+l*(m+1),R=S+1+l*(m+1),I=S+1+l*m;f.push(U,v,I),f.push(v,R,I)}this.setIndex(f),this.setAttribute("position",new Ft(p,3)),this.setAttribute("normal",new Ft(w,3)),this.setAttribute("uv",new Ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},fo=class n extends Kt{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);let a=[],c=[],l=[],h=[],d=e,u=(t-e)/r,f=new $,p=new Ve;for(let w=0;w<=r;w++){for(let g=0;g<=i;g++){let m=s+g/i*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let w=0;w<r;w++){let g=w*(i+1);for(let m=0;m<i;m++){let S=m+g,U=S,v=S+i+1,R=S+i+2,I=S+1;a.push(U,v,I),a.push(v,R,I)}}this.setIndex(a),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Er=class n extends Kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new $,u=new $,f=[],p=[],w=[],g=[];for(let m=0;m<=i;m++){let S=[],U=m/i,v=o+U*a,R=e*Math.cos(v),I=Math.sqrt(e*e-R*R),O=0;m===0&&o===0?O=.5/t:m===i&&c===Math.PI&&(O=-.5/t);for(let _=0;_<=t;_++){let b=_/t,F=r+b*s;d.x=-I*Math.cos(F),d.y=R,d.z=I*Math.sin(F),p.push(d.x,d.y,d.z),u.copy(d).normalize(),w.push(u.x,u.y,u.z),g.push(b+O,1-U),S.push(l++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<t;S++){let U=h[m][S+1],v=h[m][S],R=h[m+1][S],I=h[m+1][S+1];(m!==0||o>0)&&f.push(U,v,I),(m!==i-1||c<Math.PI)&&f.push(v,R,I)}this.setIndex(f),this.setAttribute("position",new Ft(p,3)),this.setAttribute("normal",new Ft(w,3)),this.setAttribute("uv",new Ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Cr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Eu(r))r.isRenderTargetTexture?(xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Eu(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Rn(n){let e={};for(let t=0;t<n.length;t++){let i=Cr(n[t]);for(let r in i)e[r]=i[r]}return e}function Eu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function fp(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function _h(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}var Hl={clone:Cr,merge:Rn},pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Cn=class extends Bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cr(e.uniforms),this.uniformsGroups=fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Pt().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"v3":this.uniforms[i].value=new $().fromArray(r.value);break;case"v4":this.uniforms[i].value=new jt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Mt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Yt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Va=class extends Cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ga=class extends Bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ha=class extends Bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function $r(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Uc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var er=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wa=class extends er{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kc,endingEnd:kc}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Oc:s=e,a=2*t-i;break;case Bc:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Oc:o=e,c=2*i-t;break;case Bc:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(i-t)/(r-t),w=p*p,g=w*p,m=-u*g+2*u*w-u*p,S=(1+u)*g+(-1.5-2*u)*w+(-.5+u)*p+1,U=(-1-f)*g+(1.5+f)*w+.5*p,v=f*g-f*w;for(let R=0;R!==a;++R)s[R]=m*o[h+R]+S*o[l+R]+U*o[c+R]+v*o[d+R];return s}},Xa=class extends er{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(i-t)/(r-t),d=1-h;for(let u=0;u!==a;++u)s[u]=o[l+u]*d+o[c+u]*h;return s}},$a=class extends er{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},qa=class extends er{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(i-t)/(r-t),w=1-p;for(let g=0;g!==a;++g)s[g]=o[l+g]*w+o[c+g]*p;return s}let u=a*2,f=e-1;for(let p=0;p!==a;++p){let w=o[l+p],g=o[c+p],m=f*u+p*2,S=d[m],U=d[m+1],v=e*u+p*2,R=h[v],I=h[v+1],O=xp(i,t,S,R,r);s[p]=yd(O,w,U,I,g)}return s}};function yd(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function gp(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function xp(n,e,t,i,r){let s=(n-e)/(r-e);for(let o=0;o<8;o++){let a=yd(s,e,t,i,r)-n;if(Math.abs(a)<1e-10)break;let c=gp(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var $n=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$r(t,this.TimeBufferType),this.values=$r(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:$r(e.times,Array),values:$r(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Uc(e.settings)&&(i.settings={inTangents:$r(e.settings.inTangents,Array),outTangents:$r(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new $a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new qa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Gs:t=this.InterpolantFactoryMethodDiscrete;break;case Ea:t=this.InterpolantFactoryMethodLinear;break;case fa:t=this.InterpolantFactoryMethodSmooth;break;case Fc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return xt("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gs;case this.InterpolantFactoryMethodLinear:return Ea;case this.InterpolantFactoryMethodSmooth:return fa;case this.InterpolantFactoryMethodBezier:return Fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Uc(this.settings)&&(Tu(this.settings.inTangents,e),Tu(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(wt("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(wt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){wt("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){wt("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&wf(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){wt("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===fa,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,u=d-i,f=d+i;for(let p=0;p!==i;++p){let w=t[d+p];if(w!==t[u+p]||w!==t[f+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,u=o*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Uc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Tu(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}$n.prototype.ValueTypeName="";$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=Ea;var tr=class extends $n{constructor(e,t,i){super(e,t,i)}};tr.prototype.ValueTypeName="bool";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=Gs;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ya=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};Ya.prototype.ValueTypeName="color";var Za=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};Za.prototype.ValueTypeName="number";var Ja=class extends er{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let h=l+a;l!==h;l+=4)Pn.slerpFlat(s,0,o,l-a,o,l,c);return s}},po=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}};po.prototype.ValueTypeName="quaternion";po.prototype.InterpolantFactoryMethodSmooth=void 0;var nr=class extends $n{constructor(e,t,i){super(e,t,i)}};nr.prototype.ValueTypeName="string";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=Gs;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends $n{constructor(e,t,i,r){super(e,t,i,r)}};Ka.prototype.ValueTypeName="vector";var ja=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],p=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_d=new ja,Qa=class{constructor(e){this.manager=e!==void 0?e:_d,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Qa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ua=new $,da=new Pn,xi=new $,mo=class extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ua,da,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,da,xi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ua,da,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,da,xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Zi=new $,Au=new Ve,Cu=new Ve,Mn=class extends mo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ta*2*Math.atan(Math.tan(ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z)}getViewSize(e,t){return this.getViewBounds(e,Au,Cu),t.subVectors(Cu,Au)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ma*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var go=class extends mo{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var qr=-90,Yr=1,el=class extends On{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Mn(qr,Yr,e,t);r.layers=this.layers,this.add(r);let s=new Mn(qr,Yr,e,t);s.layers=this.layers,this.add(s);let o=new Mn(qr,Yr,e,t);o.layers=this.layers,this.add(o);let a=new Mn(qr,Yr,e,t);a.layers=this.layers,this.add(a);let c=new Mn(qr,Yr,e,t);c.layers=this.layers,this.add(c);let l=new Mn(qr,Yr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},tl=class extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var vh="\\[\\]\\.:\\/",yp=new RegExp("["+vh+"]","g"),wh="[^"+vh+"]",_p="[^"+vh.replace("\\.","")+"]",vp=/((?:WC+[\/:])*)/.source.replace("WC",wh),wp=/(WCOD+)?/.source.replace("WCOD",_p),bp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wh),Mp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wh),Sp=new RegExp("^"+vp+wp+bp+Mp+"$"),Ep=["material","materials","bones","map"],Xc=class{constructor(e,t,i){let r=i||Qt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Qt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(yp,"")}static parseTrackName(e){let t=Sp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Ep.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){wt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){wt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){wt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){wt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){wt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;wt("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Qt.Composite=Xc;Qt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qt.prototype.GetterByBindingType=[Qt.prototype._getValue_direct,Qt.prototype._getValue_array,Qt.prototype._getValue_arrayElement,Qt.prototype._getValue_toArray];Qt.prototype.SetterByBindingTypeAndVersioning=[[Qt.prototype._setValue_direct,Qt.prototype._setValue_direct_setNeedsUpdate,Qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_array,Qt.prototype._setValue_array_setNeedsUpdate,Qt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_arrayElement,Qt.prototype._setValue_arrayElement_setNeedsUpdate,Qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qt.prototype._setValue_fromArray,Qt.prototype._setValue_fromArray_setNeedsUpdate,Qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var k_=new Float32Array(1);var $c=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function bh(n,e,t,i){let r=Tp(i);switch(t){case dh:return n*e;case ph:return n*e/r.components*r.byteLength;case ll:return n*e/r.components*r.byteLength;case ar:return n*e*2/r.components*r.byteLength;case cl:return n*e*2/r.components*r.byteLength;case fh:return n*e*3/r.components*r.byteLength;case Kn:return n*e*4/r.components*r.byteLength;case hl:return n*e*4/r.components*r.byteLength;case vo:case wo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bo:case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case dl:case pl:return Math.max(n,16)*Math.max(e,8)/4;case ul:case fl:return Math.max(n,8)*Math.max(e,8)/2;case ml:case gl:case yl:case _l:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xl:case So:case vl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case El:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Al:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Rl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Il:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Dl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ul:case Fl:case kl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ol:case Bl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Eo:case zl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tp(n){switch(n){case qn:case lh:return{byteLength:1,components:1};case us:case ch:case ci:return{byteLength:2,components:1};case ol:case al:return{byteLength:2,components:4};case ai:case sl:case li:return{byteLength:4,components:1};case hh:case uh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Vd(){let n=null,e=!1,t=null,i=null;function r(s,o){i=n.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Dp(n){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let h=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],w=d[f];w.start<=p.start+p.count+1?p.count=Math.max(p.count,w.start+w.count-p.start):(++u,d[u]=w)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let w=d[f];n.bufferSubData(l,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$p=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ym=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_m=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Am=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Um=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,km=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Om=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$m=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_g=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ig=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ug=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,e0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,n0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,i0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,o0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,f0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,p0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Rt={alphahash_fragment:Up,alphahash_pars_fragment:Fp,alphamap_fragment:kp,alphamap_pars_fragment:Op,alphatest_fragment:Bp,alphatest_pars_fragment:zp,aomap_fragment:Vp,aomap_pars_fragment:Gp,batching_pars_vertex:Hp,batching_vertex:Wp,begin_vertex:Xp,beginnormal_vertex:$p,bsdfs:qp,iridescence_fragment:Yp,bumpmap_pars_fragment:Zp,clipping_planes_fragment:Jp,clipping_planes_pars_fragment:Kp,clipping_planes_pars_vertex:jp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:rm,cube_uv_reflection_fragment:sm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:lm,emissivemap_fragment:cm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:fm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Am,envmap_vertex:xm,fog_vertex:ym,fog_pars_vertex:_m,fog_fragment:vm,fog_pars_fragment:wm,gradientmap_pars_fragment:bm,lightmap_pars_fragment:Mm,lights_lambert_fragment:Sm,lights_lambert_pars_fragment:Em,lights_pars_begin:Tm,lights_toon_fragment:Cm,lights_toon_pars_fragment:Rm,lights_phong_fragment:Im,lights_phong_pars_fragment:Pm,lights_physical_fragment:Lm,lights_physical_pars_fragment:Nm,lights_fragment_begin:Dm,lights_fragment_maps:Um,lights_fragment_end:Fm,lightprobes_pars_fragment:km,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:Bm,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:Vm,map_fragment:Gm,map_pars_fragment:Hm,map_particle_fragment:Wm,map_particle_pars_fragment:Xm,metalnessmap_fragment:$m,metalnessmap_pars_fragment:qm,morphinstance_vertex:Ym,morphcolor_vertex:Zm,morphnormal_vertex:Jm,morphtarget_pars_vertex:Km,morphtarget_vertex:jm,normal_fragment_begin:Qm,normal_fragment_maps:eg,normal_pars_fragment:tg,normal_pars_vertex:ng,normal_vertex:ig,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:ag,iridescence_pars_fragment:lg,opaque_fragment:cg,packing:hg,premultiplied_alpha_fragment:ug,project_vertex:dg,dithering_fragment:fg,dithering_pars_fragment:pg,roughnessmap_fragment:mg,roughnessmap_pars_fragment:gg,shadowmap_pars_fragment:xg,shadowmap_pars_vertex:yg,shadowmap_vertex:_g,shadowmask_pars_fragment:vg,skinbase_vertex:wg,skinning_pars_vertex:bg,skinning_vertex:Mg,skinnormal_vertex:Sg,specularmap_fragment:Eg,specularmap_pars_fragment:Tg,tonemapping_fragment:Ag,tonemapping_pars_fragment:Cg,transmission_fragment:Rg,transmission_pars_fragment:Ig,uv_pars_fragment:Pg,uv_pars_vertex:Lg,uv_vertex:Ng,worldpos_vertex:Dg,background_vert:Ug,background_frag:Fg,backgroundCube_vert:kg,backgroundCube_frag:Og,cube_vert:Bg,cube_frag:zg,depth_vert:Vg,depth_frag:Gg,distance_vert:Hg,distance_frag:Wg,equirect_vert:Xg,equirect_frag:$g,linedashed_vert:qg,linedashed_frag:Yg,meshbasic_vert:Zg,meshbasic_frag:Jg,meshlambert_vert:Kg,meshlambert_frag:jg,meshmatcap_vert:Qg,meshmatcap_frag:e0,meshnormal_vert:t0,meshnormal_frag:n0,meshphong_vert:i0,meshphong_frag:r0,meshphysical_vert:s0,meshphysical_frag:o0,meshtoon_vert:a0,meshtoon_frag:l0,points_vert:c0,points_frag:h0,shadow_vert:u0,shadow_frag:d0,sprite_vert:f0,sprite_frag:p0},Ye={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},envMapRotation:{value:new Mt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},Ei={basic:{uniforms:Rn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Rt.meshbasic_vert,fragmentShader:Rt.meshbasic_frag},lambert:{uniforms:Rn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)},envMapIntensity:{value:1}}]),vertexShader:Rt.meshlambert_vert,fragmentShader:Rt.meshlambert_frag},phong:{uniforms:Rn([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Rt.meshphong_vert,fragmentShader:Rt.meshphong_frag},standard:{uniforms:Rn([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Rt.meshphysical_vert,fragmentShader:Rt.meshphysical_frag},toon:{uniforms:Rn([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Rt.meshtoon_vert,fragmentShader:Rt.meshtoon_frag},matcap:{uniforms:Rn([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Rt.meshmatcap_vert,fragmentShader:Rt.meshmatcap_frag},points:{uniforms:Rn([Ye.points,Ye.fog]),vertexShader:Rt.points_vert,fragmentShader:Rt.points_frag},dashed:{uniforms:Rn([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Rt.linedashed_vert,fragmentShader:Rt.linedashed_frag},depth:{uniforms:Rn([Ye.common,Ye.displacementmap]),vertexShader:Rt.depth_vert,fragmentShader:Rt.depth_frag},normal:{uniforms:Rn([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Rt.meshnormal_vert,fragmentShader:Rt.meshnormal_frag},sprite:{uniforms:Rn([Ye.sprite,Ye.fog]),vertexShader:Rt.sprite_vert,fragmentShader:Rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Rt.background_vert,fragmentShader:Rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Mt}},vertexShader:Rt.backgroundCube_vert,fragmentShader:Rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Rt.cube_vert,fragmentShader:Rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Rt.equirect_vert,fragmentShader:Rt.equirect_frag},distance:{uniforms:Rn([Ye.common,Ye.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Rt.distance_vert,fragmentShader:Rt.distance_frag},shadow:{uniforms:Rn([Ye.lights,Ye.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Rt.shadow_vert,fragmentShader:Rt.shadow_frag}};Ei.physical={uniforms:Rn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:Rt.meshphysical_vert,fragmentShader:Rt.meshphysical_frag};var Wl={r:0,b:0,g:0},m0=new Yt,Gd=new Mt;Gd.set(-1,0,0,0,1,0,0,0,1);function g0(n,e,t,i,r,s){let o=new Pt(0),a=r===!0?0:1,c,l,h=null,d=0,u=null;function f(S){let U=S.isScene===!0?S.background:null;if(U&&U.isTexture){let v=S.backgroundBlurriness>0;U=e.get(U,v)}return U}function p(S){let U=!1,v=f(S);v===null?g(o,a):v&&v.isColor&&(g(v,1),U=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||U)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function w(S,U){let v=f(U);v&&(v.isCubeTexture||v.mapping===yo)?(l===void 0&&(l=new _n(new Qi(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:Cr(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,I,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(m0.makeRotationFromEuler(U.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Gd),l.material.toneMapped=Dt.getTransfer(v.colorSpace)!==Xt,(h!==v||d!==v.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new _n(new Sr(2,2),new Cn({name:"BackgroundMaterial",uniforms:Cr(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:ir,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,c.material.toneMapped=Dt.getTransfer(v.colorSpace)!==Xt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,U){S.getRGB(Wl,_h(n)),t.buffers.color.setClear(Wl.r,Wl.g,Wl.b,U,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,U=1){o.set(S),a=U,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,g(o,a)},render:p,addToRenderList:w,dispose:m}}function x0(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null),s=r,o=!1;function a(G,J,ne,q,K){let ie=!1,le=d(G,q,ne,J);s!==le&&(s=le,l(s.object)),ie=f(G,q,ne,K),ie&&p(G,q,ne,K),K!==null&&e.update(K,n.ELEMENT_ARRAY_BUFFER),(ie||o)&&(o=!1,v(G,J,ne,q),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return n.createVertexArray()}function l(G){return n.bindVertexArray(G)}function h(G){return n.deleteVertexArray(G)}function d(G,J,ne,q){let K=q.wireframe===!0,ie=i[J.id];ie===void 0&&(ie={},i[J.id]=ie);let le=G.isInstancedMesh===!0?G.id:0,ve=ie[le];ve===void 0&&(ve={},ie[le]=ve);let ce=ve[ne.id];ce===void 0&&(ce={},ve[ne.id]=ce);let _e=ce[K];return _e===void 0&&(_e=u(c()),ce[K]=_e),_e}function u(G){let J=[],ne=[],q=[];for(let K=0;K<t;K++)J[K]=0,ne[K]=0,q[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:ne,attributeDivisors:q,object:G,attributes:{},index:null}}function f(G,J,ne,q){let K=s.attributes,ie=J.attributes,le=0,ve=ne.getAttributes();for(let ce in ve)if(ve[ce].location>=0){let Se=K[ce],et=ie[ce];if(et===void 0&&(ce==="instanceMatrix"&&G.instanceMatrix&&(et=G.instanceMatrix),ce==="instanceColor"&&G.instanceColor&&(et=G.instanceColor)),Se===void 0||Se.attribute!==et||et&&Se.data!==et.data)return!0;le++}return s.attributesNum!==le||s.index!==q}function p(G,J,ne,q){let K={},ie=J.attributes,le=0,ve=ne.getAttributes();for(let ce in ve)if(ve[ce].location>=0){let Se=ie[ce];Se===void 0&&(ce==="instanceMatrix"&&G.instanceMatrix&&(Se=G.instanceMatrix),ce==="instanceColor"&&G.instanceColor&&(Se=G.instanceColor));let et={};et.attribute=Se,Se&&Se.data&&(et.data=Se.data),K[ce]=et,le++}s.attributes=K,s.attributesNum=le,s.index=q}function w(){let G=s.newAttributes;for(let J=0,ne=G.length;J<ne;J++)G[J]=0}function g(G){m(G,0)}function m(G,J){let ne=s.newAttributes,q=s.enabledAttributes,K=s.attributeDivisors;ne[G]=1,q[G]===0&&(n.enableVertexAttribArray(G),q[G]=1),K[G]!==J&&(n.vertexAttribDivisor(G,J),K[G]=J)}function S(){let G=s.newAttributes,J=s.enabledAttributes;for(let ne=0,q=J.length;ne<q;ne++)J[ne]!==G[ne]&&(n.disableVertexAttribArray(ne),J[ne]=0)}function U(G,J,ne,q,K,ie,le){le===!0?n.vertexAttribIPointer(G,J,ne,K,ie):n.vertexAttribPointer(G,J,ne,q,K,ie)}function v(G,J,ne,q){w();let K=q.attributes,ie=ne.getAttributes(),le=J.defaultAttributeValues;for(let ve in ie){let ce=ie[ve];if(ce.location>=0){let _e=K[ve];if(_e===void 0&&(ve==="instanceMatrix"&&G.instanceMatrix&&(_e=G.instanceMatrix),ve==="instanceColor"&&G.instanceColor&&(_e=G.instanceColor)),_e!==void 0){let Se=_e.normalized,et=_e.itemSize,ye=e.get(_e);if(ye===void 0)continue;let oe=ye.buffer,Ae=ye.type,He=ye.bytesPerElement,ue=Ae===n.INT||Ae===n.UNSIGNED_INT||_e.gpuType===sl;if(_e.isInterleavedBufferAttribute){let ge=_e.data,V=ge.stride,we=_e.offset;if(ge.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ce.locationSize;Ce++)m(ce.location+Ce,ge.meshPerAttribute);G.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ce=0;Ce<ce.locationSize;Ce++)g(ce.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let Ce=0;Ce<ce.locationSize;Ce++)U(ce.location+Ce,et/ce.locationSize,Ae,Se,V*He,(we+et/ce.locationSize*Ce)*He,ue)}else{if(_e.isInstancedBufferAttribute){for(let ge=0;ge<ce.locationSize;ge++)m(ce.location+ge,_e.meshPerAttribute);G.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ge=0;ge<ce.locationSize;ge++)g(ce.location+ge);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let ge=0;ge<ce.locationSize;ge++)U(ce.location+ge,et/ce.locationSize,Ae,Se,et*He,et/ce.locationSize*ge*He,ue)}}else if(le!==void 0){let Se=le[ve];if(Se!==void 0)switch(Se.length){case 2:n.vertexAttrib2fv(ce.location,Se);break;case 3:n.vertexAttrib3fv(ce.location,Se);break;case 4:n.vertexAttrib4fv(ce.location,Se);break;default:n.vertexAttrib1fv(ce.location,Se)}}}}S()}function R(){b();for(let G in i){let J=i[G];for(let ne in J){let q=J[ne];for(let K in q){let ie=q[K];for(let le in ie)h(ie[le].object),delete ie[le];delete q[K]}}delete i[G]}}function I(G){if(i[G.id]===void 0)return;let J=i[G.id];for(let ne in J){let q=J[ne];for(let K in q){let ie=q[K];for(let le in ie)h(ie[le].object),delete ie[le];delete q[K]}}delete i[G.id]}function O(G){for(let J in i){let ne=i[J];for(let q in ne){let K=ne[q];if(K[G.id]===void 0)continue;let ie=K[G.id];for(let le in ie)h(ie[le].object),delete ie[le];delete K[G.id]}}}function _(G){for(let J in i){let ne=i[J],q=G.isInstancedMesh===!0?G.id:0,K=ne[q];if(K!==void 0){for(let ie in K){let le=K[ie];for(let ve in le)h(le[ve].object),delete le[ve];delete K[ie]}delete ne[q],Object.keys(ne).length===0&&delete i[J]}}}function b(){F(),o=!0,s!==r&&(s=r,l(s.object))}function F(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:F,dispose:R,releaseStatesOfGeometry:I,releaseStatesOfObject:_,releaseStatesOfProgram:O,initAttributes:w,enableAttribute:g,disableUnusedAttributes:S}}function y0(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function _0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let O=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(O){return!(O!==Kn&&i.convert(O)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(O){let _=O===ci&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==qn&&O!==li&&!_&&i.convert(O)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(O){if(O==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(xt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),U=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),I=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:w,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:U,maxFragmentUniforms:v,maxSamples:R,samples:I}}function v0(n){let e=this,t=null,i=0,r=!1,s=!1,o=new ii,a=new Mt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||r;return r=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,w=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||p===null||p.length===0||s&&!g)s?h(null):l();else{let S=s?0:i,U=S*4,v=m.clippingState||null;c.value=v,v=h(p,u,U,f);for(let R=0;R!==U;++R)v[R]=t[R];m.clippingState=v,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,p){let w=d!==null?d.length:0,g=null;if(w!==0){if(g=c.value,p!==!0||g===null){let m=f+w*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let U=0,v=f;U!==w;++U,v+=4)o.copy(d[U]).applyMatrix4(S,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}var ms=4,w0=6,b0=20,M0=256,To=new go,vd=new Pt,Mh=null,Sh=0,Eh=0,Th=!1,S0=new $,Rr=new $,$l=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=S0}=s;Mh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mh,Sh,Eh),this._renderer.xr.enabled=Th,e.scissorTest=!1,ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rr||e.mapping===Ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:ci,format:Kn,colorSpace:Hs,depthBuffer:!1},r=wd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wd(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=E0(s)),this._blurMaterial=A0(s,e,t),this._ggxMaterial=T0(s,e,t)}return r}_compileMaterial(e){let t=new _n(new Kt,e);this._renderer.compile(t,To)}_sceneToCubeUV(e,t,i,r,s){let c=new Mn(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(vd),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _n(new Qi,new wr({name:"PMREM.Background",side:Ln,depthWrite:!1,depthTest:!1})));let w=this._backgroundBox,g=w.material,m=!1,S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(vd),m=!0);for(let U=0;U<6;U++){let v=U%3;v===0?(c.up.set(0,l[U],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[U],s.y,s.z)):v===1?(c.up.set(0,0,l[U]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[U],s.z)):(c.up.set(0,l[U],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[U]));let R=this._cubeSize;ps(r,v*R,U>2?R:0,R,R),d.setRenderTarget(r),m&&d.render(w,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===rr||e.mapping===Ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Md()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;ps(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,To)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:p}=this,w=this._sizeLods[i],g=3*w*(i>p-ms?i-p+ms:0),m=4*(this._cubeSize-w);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=p-t,ps(s,g,m,3*w,2*w),r.setRenderTarget(s),r.render(a,To),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=p-i,ps(e,g,m,3*w,2*w),r.setRenderTarget(e),r.render(a,To)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,o),this._blurPass(s,e,i,i,o)}_blurPass(e,t,i,r,s){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[r];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[r],d=3*h*(r>this._lodMax-ms?r-this._lodMax+ms:0),u=4*(this._cubeSize-h);ps(t,d,u,3*h,2*h),o.setRenderTarget(t),o.render(c,To)}};function E0(n){let e=[],t=[],i=n,r=n-ms+1+w0;for(let s=0;s<r;s++){let o=Math.pow(2,i);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,p=new Float32Array(f*u*d),w=new Float32Array(f*u*d);for(let m=0;m<d;m++){let S=m%3*2/3-1,U=m>2?0:-1,v=[S,U,0,S+2/3,U,0,S+2/3,U+1,0,S,U,0,S+2/3,U+1,0,S,U+1,0];p.set(v,f*u*m);for(let R=0;R<u;R++){let I=h[R*2]*2-1,O=h[R*2+1]*2-1;m===0?Rr.set(1,O,I):m===1?Rr.set(-I,1,-O):m===2?Rr.set(-I,O,1):m===3?Rr.set(-1,O,-I):m===4?Rr.set(-I,-1,O):Rr.set(I,O,-1),Rr.toArray(w,(m*u+R)*f)}}let g=new Kt;g.setAttribute("position",new An(p,f)),g.setAttribute("outputDirection",new An(w,f)),t.push(new _n(g,null)),i>ms&&i--}return{lodMeshes:t,sizeLods:e}}function wd(n,e,t){let i=new kn(n,e,t);return i.texture.mapping=yo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ps(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function T0(n,e,t){return new Cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:M0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function A0(n,e,t){return new Cn({name:"SphericalGaussianBlur",defines:{SAMPLES:b0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function bd(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Md(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Zl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ql=class extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new eo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qi(5,5,5),s=new Cn({name:"CubemapFromEquirect",uniforms:Cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ln,blending:Mi});s.uniforms.tEquirect.value=t;let o=new _n(r,s),a=t.minFilter;return t.minFilter===sr&&(t.minFilter=Sn),new el(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function C0(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?o(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===nl||f===il)if(e.has(u)){let p=e.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let w=new ql(p.height);return w.fromEquirectangularTexture(n,u),e.set(u,w),u.addEventListener("dispose",l),a(w.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===nl||f===il,w=f===rr||f===Ar;if(p||w){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new $l(n)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let S=u.image;return p&&S&&S.height>0||w&&S&&c(S)?(i===null&&(i=new $l(n)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===nl?u.mapping=rr:f===il&&(u.mapping=Ar),u}function c(u){let f=0,p=6;for(let w=0;w<p;w++)u[w]!==void 0&&f++;return f===p}function l(u){let f=u.target;f.removeEventListener("dispose",l);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function R0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&_r("WebGLRenderer: "+i+" extension not supported."),r}}}function I0(n,e,t,i){let r={},s=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete r[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)e.update(u[f],n.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,p=d.attributes.position,w=0;if(p===void 0)return;if(f!==null){let S=f.array;w=f.version;for(let U=0,v=S.length;U<v;U+=3){let R=S[U+0],I=S[U+1],O=S[U+2];u.push(R,I,I,O,O,R)}}else{let S=p.array;w=p.version;for(let U=0,v=S.length/3-1;U<v;U+=3){let R=U+0,I=U+1,O=U+2;u.push(R,I,I,O,O,R)}}let g=new(p.count>=65535?Js:Zs)(u,1);g.version=w;let m=s.get(d);m&&e.remove(m),s.set(d,g)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function P0(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,u){n.drawElements(i,u,s,d*o),t.update(u,i,1)}function l(d,u,f){f!==0&&(n.drawElementsInstanced(i,u,s,d*o,f),t.update(u,i,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,f);let w=0;for(let g=0;g<f;g++)w+=u[g];t.update(w,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function L0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:wt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function N0(n,e,t){let i=new WeakMap,r=new jt;function s(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(a);if(u===void 0||u.count!==d){let b=function(){O.dispose(),i.delete(a),a.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,w=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],U=0;f===!0&&(U=1),p===!0&&(U=2),w===!0&&(U=3);let v=a.attributes.position.count*U,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let I=new Float32Array(v*R*4*d),O=new qs(I,v,R,d);O.type=li,O.needsUpdate=!0;let _=U*4;for(let F=0;F<d;F++){let G=g[F],J=m[F],ne=S[F],q=v*R*4*F;for(let K=0;K<G.count;K++){let ie=K*_;f===!0&&(r.fromBufferAttribute(G,K),I[q+ie+0]=r.x,I[q+ie+1]=r.y,I[q+ie+2]=r.z,I[q+ie+3]=0),p===!0&&(r.fromBufferAttribute(J,K),I[q+ie+4]=r.x,I[q+ie+5]=r.y,I[q+ie+6]=r.z,I[q+ie+7]=0),w===!0&&(r.fromBufferAttribute(ne,K),I[q+ie+8]=r.x,I[q+ie+9]=r.y,I[q+ie+10]=r.z,I[q+ie+11]=ne.itemSize===4?r.w:1)}}u={count:d,texture:O,size:new Ve(v,R)},i.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let w=0;w<l.length;w++)f+=l[w];let p=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function D0(n,e,t,i,r){let s=new WeakMap;function o(l){let h=r.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function a(){s=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var U0={[eh]:"LINEAR_TONE_MAPPING",[th]:"REINHARD_TONE_MAPPING",[nh]:"CINEON_TONE_MAPPING",[ih]:"ACES_FILMIC_TONE_MAPPING",[sh]:"AGX_TONE_MAPPING",[oh]:"NEUTRAL_TONE_MAPPING",[rh]:"CUSTOM_TONE_MAPPING"};function F0(n,e,t,i,r,s){let o=new kn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Kt;l.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ft([0,2,0,0,2,0],2));let h=new Va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new _n(l,h),u=new go(-1,1,1,-1,0,1),f=null,p=null,w=!1,g,m=null,S=[],U=!1;this.setSize=function(v,R){o.setSize(v,R),a!==null&&a.setSize(v,R),c!==null&&c.setSize(v,R);for(let I=0;I<S.length;I++){let O=S[I];O.setSize&&O.setSize(v,R)}},this.setEffects=function(v){S=v,U=S.length>0&&S[0].isRenderPass===!0;let R=o.width,I=o.height;S.length>0&&a===null&&(a=new kn(R,I,{type:ci,depthBuffer:!1,stencilBuffer:!1}),c=new kn(R,I,{type:ci,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<S.length;O++){let _=S[O];_.setSize&&_.setSize(R,I)}},this.begin=function(v,R){if(w||v.toneMapping===oi&&S.length===0)return!1;if(m=R,R!==null){let I=R.width,O=R.height;(o.width!==I||o.height!==O)&&this.setSize(I,O)}return U===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=oi,!0},this.hasRenderPass=function(){return U},this.end=function(v,R){v.toneMapping=g,w=!0;let I=o,O=a;for(let _=0;_<S.length;_++){let b=S[_];b.enabled!==!1&&(b.render(v,O,I,R),b.needsSwap!==!1&&(I=O,O=O===a?c:a))}if(f!==v.outputColorSpace||p!==v.toneMapping){f=v.outputColorSpace,p=v.toneMapping,h.defines={},Dt.getTransfer(f)===Xt&&(h.defines.SRGB_TRANSFER="");let _=U0[p];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=I.texture,v.setRenderTarget(m),v.render(d,u),m=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Hd=new Fn,Rh=new ji(1,1),Wd=new qs,Xd=new Ra,$d=new eo,Sd=[],Ed=[],Td=new Float32Array(16),Ad=new Float32Array(9),Cd=new Float32Array(4);function xs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Sd[r];if(s===void 0&&(s=new Float32Array(r),Sd[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function fn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function pn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Jl(n,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function k0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function O0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;n.uniform2fv(this.addr,e),pn(t,e)}}function B0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(fn(t,e))return;n.uniform3fv(this.addr,e),pn(t,e)}}function z0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;n.uniform4fv(this.addr,e),pn(t,e)}}function V0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(fn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,i))return;Cd.set(i),n.uniformMatrix2fv(this.addr,!1,Cd),pn(t,i)}}function G0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(fn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,i))return;Ad.set(i),n.uniformMatrix3fv(this.addr,!1,Ad),pn(t,i)}}function H0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(fn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),pn(t,e)}else{if(fn(t,i))return;Td.set(i),n.uniformMatrix4fv(this.addr,!1,Td),pn(t,i)}}function W0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function X0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;n.uniform2iv(this.addr,e),pn(t,e)}}function $0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;n.uniform3iv(this.addr,e),pn(t,e)}}function q0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;n.uniform4iv(this.addr,e),pn(t,e)}}function Y0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Z0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;n.uniform2uiv(this.addr,e),pn(t,e)}}function J0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;n.uniform3uiv(this.addr,e),pn(t,e)}}function K0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;n.uniform4uiv(this.addr,e),pn(t,e)}}function j0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Rh.compareFunction=t.isReversedDepthBuffer()?Gl:Vl,s=Rh):s=Hd,t.setTexture2D(e||s,r)}function Q0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Xd,r)}function ex(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$d,r)}function tx(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Wd,r)}function nx(n){switch(n){case 5126:return k0;case 35664:return O0;case 35665:return B0;case 35666:return z0;case 35674:return V0;case 35675:return G0;case 35676:return H0;case 5124:case 35670:return W0;case 35667:case 35671:return X0;case 35668:case 35672:return $0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return Z0;case 36295:return J0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return tx}}function ix(n,e){n.uniform1fv(this.addr,e)}function rx(n,e){let t=xs(e,this.size,2);n.uniform2fv(this.addr,t)}function sx(n,e){let t=xs(e,this.size,3);n.uniform3fv(this.addr,t)}function ox(n,e){let t=xs(e,this.size,4);n.uniform4fv(this.addr,t)}function ax(n,e){let t=xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function lx(n,e){let t=xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function cx(n,e){let t=xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function hx(n,e){n.uniform1iv(this.addr,e)}function ux(n,e){n.uniform2iv(this.addr,e)}function dx(n,e){n.uniform3iv(this.addr,e)}function fx(n,e){n.uniform4iv(this.addr,e)}function px(n,e){n.uniform1uiv(this.addr,e)}function mx(n,e){n.uniform2uiv(this.addr,e)}function gx(n,e){n.uniform3uiv(this.addr,e)}function xx(n,e){n.uniform4uiv(this.addr,e)}function yx(n,e,t){let i=this.cache,r=e.length,s=Jl(t,r);fn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=Rh:o=Hd;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function _x(n,e,t){let i=this.cache,r=e.length,s=Jl(t,r);fn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Xd,s[o])}function vx(n,e,t){let i=this.cache,r=e.length,s=Jl(t,r);fn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||$d,s[o])}function wx(n,e,t){let i=this.cache,r=e.length,s=Jl(t,r);fn(i,s)||(n.uniform1iv(this.addr,s),pn(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Wd,s[o])}function bx(n){switch(n){case 5126:return ix;case 35664:return rx;case 35665:return sx;case 35666:return ox;case 35674:return ax;case 35675:return lx;case 35676:return cx;case 5124:case 35670:return hx;case 35667:case 35671:return ux;case 35668:case 35672:return dx;case 35669:case 35673:return fx;case 5125:return px;case 36294:return mx;case 36295:return gx;case 36296:return xx;case 35678:case 36198:case 36298:case 36306:case 35682:return yx;case 35679:case 36299:case 36307:return _x;case 35680:case 36300:case 36308:case 36293:return vx;case 36289:case 36303:case 36311:case 36292:return wx}}var Ih=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=nx(t.type)}},Ph=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bx(t.type)}},Lh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},Ah=/(\w+)(\])?(\[|\.)?/g;function Rd(n,e){n.seq.push(e),n.map[e.id]=e}function Mx(n,e,t){let i=n.name,r=i.length;for(Ah.lastIndex=0;;){let s=Ah.exec(i),o=Ah.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Rd(t,l===void 0?new Ih(a,n,e):new Ph(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Lh(a),Rd(t,d)),t=d}}}var gs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Mx(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Id(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Sx=37297,Ex=0;function Tx(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Pd=new Mt;function Ax(n){Dt._getMatrix(Pd,Dt.workingColorSpace,n);let e=`mat3( ${Pd.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(n)){case Ws:return[e,"LinearTransferOETF"];case Xt:return[e,"sRGBTransferOETF"];default:return xt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ld(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Tx(n.getShaderSource(e),a)}else return s}function Cx(n,e){let t=Ax(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Rx={[eh]:"Linear",[th]:"Reinhard",[nh]:"Cineon",[ih]:"ACESFilmic",[sh]:"AgX",[oh]:"Neutral",[rh]:"Custom"};function Ix(n,e){let t=Rx[e];return t===void 0?(xt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xl=new $;function Px(){Dt.getLuminanceCoefficients(Xl);let n=Xl.x.toFixed(4),e=Xl.y.toFixed(4),t=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Co).join(`
`)}function Nx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Dx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Co(n){return n!==""}function Nd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ux=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(n){return n.replace(Ux,kx)}var Fx=new Map;function kx(n,e){let t=Rt[e];if(t===void 0){let i=Fx.get(e);if(i!==void 0)t=Rt[i],xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Nh(t)}var Ox=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ud(n){return n.replace(Ox,Bx)}function Bx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Fd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var zx={[xo]:"SHADOWMAP_TYPE_PCF",[cs]:"SHADOWMAP_TYPE_VSM"};function Vx(n){return zx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gx={[rr]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE",[yo]:"ENVMAP_TYPE_CUBE_UV"};function Hx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Gx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Wx={[Ar]:"ENVMAP_MODE_REFRACTION"};function Xx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Wx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $x={[Qc]:"ENVMAP_BLENDING_MULTIPLY",[Ju]:"ENVMAP_BLENDING_MIX",[Ku]:"ENVMAP_BLENDING_ADD"};function qx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":$x[n.combine]||"ENVMAP_BLENDING_NONE"}function Yx(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Zx(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Vx(t),l=Hx(t),h=Xx(t),d=qx(t),u=Yx(t),f=Lx(t),p=Nx(s),w=r.createProgram(),g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Co).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Co).join(`
`),m.length>0&&(m+=`
`)):(g=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Co).join(`
`),m=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?Rt.tonemapping_pars_fragment:"",t.toneMapping!==oi?Ix("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Rt.colorspace_pars_fragment,Cx("linearToOutputTexel",t.outputColorSpace),Px(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Co).join(`
`)),o=Nh(o),o=Nd(o,t),o=Dd(o,t),a=Nh(a),a=Nd(a,t),a=Dd(a,t),o=Ud(o),a=Ud(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let U=S+g+o,v=S+m+a,R=Id(r,r.VERTEX_SHADER,U),I=Id(r,r.FRAGMENT_SHADER,v);r.attachShader(w,R),r.attachShader(w,I),t.index0AttributeName!==void 0?r.bindAttribLocation(w,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function O(G){if(n.debug.checkShaderErrors){let J=r.getProgramInfoLog(w)||"",ne=r.getShaderInfoLog(R)||"",q=r.getShaderInfoLog(I)||"",K=J.trim(),ie=ne.trim(),le=q.trim(),ve=!0,ce=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(ve=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,w,R,I);else{let _e=Ld(r,R,"vertex"),Se=Ld(r,I,"fragment");wt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+K+`
`+_e+`
`+Se)}else K!==""?xt("WebGLProgram: Program Info Log:",K):(ie===""||le==="")&&(ce=!1);ce&&(G.diagnostics={runnable:ve,programLog:K,vertexShader:{log:ie,prefix:g},fragmentShader:{log:le,prefix:m}})}r.deleteShader(R),r.deleteShader(I),_=new gs(r,w),b=Dx(r,w)}let _;this.getUniforms=function(){return _===void 0&&O(this),_};let b;this.getAttributes=function(){return b===void 0&&O(this),b};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(w,Sx)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ex++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=R,this.fragmentShader=I,this}var Jx=0,Dh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Uh(e),t.set(e,i)),i}},Uh=class{constructor(e){this.id=Jx++,this.code=e,this.usedTimes=0}};function Kx(n){return n===ar||n===So||n===Eo}function jx(n,e,t,i,r,s){let o=new Ys,a=new Dh,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function w(_,b,F,G,J,ne){let q=G.fog,K=J.geometry,ie=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?G.environment:null,le=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ve=e.get(_.envMap||ie,le),ce=ve&&ve.mapping===yo?ve.image.height:null,_e=f[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&xt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let Se=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,et=Se!==void 0?Se.length:0,ye=0;K.morphAttributes.position!==void 0&&(ye=1),K.morphAttributes.normal!==void 0&&(ye=2),K.morphAttributes.color!==void 0&&(ye=3);let oe,Ae,He,ue;if(_e){let Bt=Ei[_e];oe=Bt.vertexShader,Ae=Bt.fragmentShader}else{oe=_.vertexShader,Ae=_.fragmentShader;let Bt=a.getVertexShaderStage(_),Ut=a.getFragmentShaderStage(_);a.update(_,Bt,Ut),He=Bt.id,ue=Ut.id}let ge=n.getRenderTarget(),V=n.state.buffers.depth.getReversed(),we=J.isInstancedMesh===!0,Ce=J.isBatchedMesh===!0,ke=!!_.map,lt=!!_.matcap,xe=!!ve,Ee=!!_.aoMap,Ie=!!_.lightMap,Pe=!!_.bumpMap&&_.wireframe===!1,ze=!!_.normalMap,ct=!!_.displacementMap,nt=!!_.emissiveMap,ht=!!_.metalnessMap,mt=!!_.roughnessMap,X=_.anisotropy>0,At=_.clearcoat>0,he=_.dispersion>0,C=_.retroreflectivity>0,x=_.iridescence>0,ee=_.sheen>0,se=_.transmission>0,me=X&&!!_.anisotropyMap,Ne=At&&!!_.clearcoatMap,Fe=At&&!!_.clearcoatNormalMap,de=At&&!!_.clearcoatRoughnessMap,fe=x&&!!_.iridescenceMap,Ue=x&&!!_.iridescenceThicknessMap,Je=ee&&!!_.sheenColorMap,Ge=ee&&!!_.sheenRoughnessMap,Oe=!!_.specularMap,tt=!!_.specularColorMap,ft=!!_.specularIntensityMap,bt=se&&!!_.transmissionMap,j=se&&!!_.thicknessMap,Be=!!_.gradientMap,Te=!!_.alphaMap,Xe=_.alphaTest>0,Ke=!!_.alphaHash,Re=!!_.extensions,ut=oi;_.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(ut=n.toneMapping);let at={shaderID:_e,shaderType:_.type,shaderName:_.name,vertexShader:oe,fragmentShader:Ae,defines:_.defines,customVertexShaderID:He,customFragmentShaderID:ue,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Ce,batchingColor:Ce&&J._colorsTexture!==null,instancing:we,instancingColor:we&&J.instanceColor!==null,instancingMorph:we&&J.morphTexture!==null,outputColorSpace:ge===null?n.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ke,matcap:lt,envMap:xe,envMapMode:xe&&ve.mapping,envMapCubeUVHeight:ce,aoMap:Ee,lightMap:Ie,bumpMap:Pe,normalMap:ze,displacementMap:ct,emissiveMap:nt,normalMapObjectSpace:ze&&_.normalMapType===ed,normalMapTangentSpace:ze&&_.normalMapType===mh,packedNormalMap:ze&&_.normalMapType===mh&&Kx(_.normalMap.format),metalnessMap:ht,roughnessMap:mt,anisotropy:X,anisotropyMap:me,clearcoat:At,clearcoatMap:Ne,clearcoatNormalMap:Fe,clearcoatRoughnessMap:de,dispersion:he,retroreflection:C,iridescence:x,iridescenceMap:fe,iridescenceThicknessMap:Ue,sheen:ee,sheenColorMap:Je,sheenRoughnessMap:Ge,specularMap:Oe,specularColorMap:tt,specularIntensityMap:ft,transmission:se,transmissionMap:bt,thicknessMap:j,gradientMap:Be,opaque:_.transparent===!1&&_.blending===hs&&_.alphaToCoverage===!1,alphaMap:Te,alphaTest:Xe,alphaHash:Ke,combine:_.combine,mapUv:ke&&p(_.map.channel),aoMapUv:Ee&&p(_.aoMap.channel),lightMapUv:Ie&&p(_.lightMap.channel),bumpMapUv:Pe&&p(_.bumpMap.channel),normalMapUv:ze&&p(_.normalMap.channel),displacementMapUv:ct&&p(_.displacementMap.channel),emissiveMapUv:nt&&p(_.emissiveMap.channel),metalnessMapUv:ht&&p(_.metalnessMap.channel),roughnessMapUv:mt&&p(_.roughnessMap.channel),anisotropyMapUv:me&&p(_.anisotropyMap.channel),clearcoatMapUv:Ne&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&p(_.sheenRoughnessMap.channel),specularMapUv:Oe&&p(_.specularMap.channel),specularColorMapUv:tt&&p(_.specularColorMap.channel),specularIntensityMapUv:ft&&p(_.specularIntensityMap.channel),transmissionMapUv:bt&&p(_.transmissionMap.channel),thicknessMapUv:j&&p(_.thicknessMap.channel),alphaMapUv:Te&&p(_.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ze||X),vertexNormals:!!K.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!K.attributes.uv&&(ke||Te),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||K.attributes.normal===void 0&&ze===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:V,skinning:J.isSkinnedMesh===!0,hasPositionAttribute:K.attributes.position!==void 0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:ye,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:ne.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:ut,decodeVideoTexture:ke&&_.map.isVideoTexture===!0&&Dt.getTransfer(_.map.colorSpace)===Xt,decodeVideoTextureEmissive:nt&&_.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(_.emissiveMap.colorSpace)===Xt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Jn,flipSided:_.side===Ln,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Re&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&_.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function g(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let F in _.defines)b.push(F),b.push(_.defines[F]);return _.isRawShaderMaterial===!1&&(m(b,_),S(b,_),b.push(n.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function S(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function U(_){let b=f[_.type],F;if(b){let G=Ei[b];F=Hl.clone(G.uniforms)}else F=_.uniforms;return F}function v(_,b){let F=h.get(b);return F!==void 0?++F.usedTimes:(F=new Zx(n,b,_,r),l.push(F),h.set(b,F)),F}function R(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function I(_){a.remove(_)}function O(){a.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:U,acquireProgram:v,releaseProgram:R,releaseShaderCache:I,programs:l,dispose:O}}function Qx(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ey(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function kd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Od(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,w,g,m){let S=n[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:w,renderOrder:u.renderOrder,z:g,group:m},n[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=p,S.materialVariant=o(u),S.groupOrder=w,S.renderOrder=u.renderOrder,S.z=g,S.group=m),e++,S}function c(u,f,p,w,g,m,S){S.reversedDepth===!0&&(g=-g);let U=a(u,f,p,w,g,m);p.transmission>0?i.push(U):p.transparent===!0?r.push(U):t.push(U)}function l(u,f,p,w,g,m){let S=a(u,f,p,w,g,m);p.transmission>0?i.unshift(S):p.transparent===!0?r.unshift(S):t.unshift(S)}function h(u,f){t.length>1&&t.sort(u||ey),i.length>1&&i.sort(f||kd),r.length>1&&r.sort(f||kd)}function d(){for(let u=e,f=n.length;u<f;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:h}}function ty(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Od,n.set(i,[o])):r>=s.length?(o=new Od,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function ny(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new $,color:new Pt};break;case"SpotLight":t={position:new $,direction:new $,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":t={color:new Pt,position:new $,halfWidth:new $,halfHeight:new $};break}return n[e.id]=t,t}}}function iy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var ry=0;function sy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function oy(n){let e=new ny,t=iy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new $);let r=new $,s=new Yt,o=new Yt;function a(l){let h=0,d=0,u=0;for(let J=0;J<9;J++)i.probe[J].set(0,0,0);let f=0,p=0,w=0,g=0,m=0,S=0,U=0,v=0,R=0,I=0,O=0,_=0,b=0,F=0;l.sort(sy);for(let J=0,ne=l.length;J<ne;J++){let q=l[J],K=q.color,ie=q.intensity,le=q.distance,ve=null;if(q.shadow&&q.shadow.map&&(q.shadow.map.texture.format===ar?ve=q.shadow.map.texture:ve=q.shadow.map.depthTexture||q.shadow.map.texture),q.isAmbientLight)h+=K.r*ie,d+=K.g*ie,u+=K.b*ie;else if(q.isLightProbe){for(let ce=0;ce<9;ce++)i.probe[ce].addScaledVector(q.sh.coefficients[ce],ie);F++}else if(q.isSunLight){let ce=e.get(q);if(ce.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){let _e=q.shadow,Se=t.get(q);Se.shadowIntensity=_e.intensity,Se.shadowBias=_e.bias,Se.shadowNormalBias=_e.normalBias,Se.shadowRadius=_e.radius,Se.shadowMapSize.copy(_e.mapSize).multiply(_e.getFrameExtents()),i.sunShadow[p]=Se,i.sunShadowMap[p]=ve;let et=_e.getViewportCount();for(let ye=0;ye<et;ye++)i.sunShadowMatrix[w+ye]=_e.getMatrix(ye),i.sunShadowCascade[w+ye]=_e._cascadeData[ye];w+=et,p++}i.sun[f]=ce,f++}else if(q.isDirectionalLight){let ce=e.get(q);if(ce.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){let _e=q.shadow,Se=t.get(q);Se.shadowIntensity=_e.intensity,Se.shadowBias=_e.bias,Se.shadowNormalBias=_e.normalBias,Se.shadowRadius=_e.radius,Se.shadowMapSize=_e.mapSize,i.directionalShadow[g]=Se,i.directionalShadowMap[g]=ve,i.directionalShadowMatrix[g]=q.shadow.matrix,R++}i.directional[g]=ce,g++}else if(q.isSpotLight){let ce=e.get(q);ce.position.setFromMatrixPosition(q.matrixWorld),ce.color.copy(K).multiplyScalar(ie),ce.distance=le,ce.coneCos=Math.cos(q.angle),ce.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),ce.decay=q.decay,i.spot[S]=ce;let _e=q.shadow;if(q.map&&(i.spotLightMap[_]=q.map,_++,_e.updateMatrices(q),q.castShadow&&b++),i.spotLightMatrix[S]=_e.matrix,q.castShadow){let Se=t.get(q);Se.shadowIntensity=_e.intensity,Se.shadowBias=_e.bias,Se.shadowNormalBias=_e.normalBias,Se.shadowRadius=_e.radius,Se.shadowMapSize=_e.mapSize,i.spotShadow[S]=Se,i.spotShadowMap[S]=ve,O++}S++}else if(q.isRectAreaLight){let ce=e.get(q);ce.color.copy(K).multiplyScalar(ie),ce.halfWidth.set(q.width*.5,0,0),ce.halfHeight.set(0,q.height*.5,0),i.rectArea[U]=ce,U++}else if(q.isPointLight){let ce=e.get(q);if(ce.color.copy(q.color).multiplyScalar(q.intensity),ce.distance=q.distance,ce.decay=q.decay,q.castShadow){let _e=q.shadow,Se=t.get(q);Se.shadowIntensity=_e.intensity,Se.shadowBias=_e.bias,Se.shadowNormalBias=_e.normalBias,Se.shadowRadius=_e.radius,Se.shadowMapSize=_e.mapSize,Se.shadowCameraNear=_e.camera.near,Se.shadowCameraFar=_e.camera.far,i.pointShadow[m]=Se,i.pointShadowMap[m]=ve,i.pointShadowMatrix[m]=q.shadow.matrix,I++}i.point[m]=ce,m++}else if(q.isHemisphereLight){let ce=e.get(q);ce.skyColor.copy(q.color).multiplyScalar(ie),ce.groundColor.copy(q.groundColor).multiplyScalar(ie),i.hemi[v]=ce,v++}}U>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ye.LTC_FLOAT_1,i.rectAreaLTC2=Ye.LTC_FLOAT_2):(i.rectAreaLTC1=Ye.LTC_HALF_1,i.rectAreaLTC2=Ye.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let G=i.hash;(G.sunLength!==f||G.directionalLength!==g||G.pointLength!==m||G.spotLength!==S||G.rectAreaLength!==U||G.hemiLength!==v||G.numSunShadows!==p||G.numDirectionalShadows!==R||G.numPointShadows!==I||G.numSpotShadows!==O||G.numSpotMaps!==_||G.numLightProbes!==F)&&(i.sun.length=f,i.directional.length=g,i.spot.length=S,i.rectArea.length=U,i.point.length=m,i.hemi.length=v,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=w,i.sunShadowCascade.length=w,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=I,i.pointShadowMap.length=I,i.pointShadowMatrix.length=I,i.spotShadow.length=O,i.spotShadowMap.length=O,i.spotLightMatrix.length=O+_-b,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=F,G.sunLength=f,G.directionalLength=g,G.pointLength=m,G.spotLength=S,G.rectAreaLength=U,G.hemiLength=v,G.numSunShadows=p,G.numDirectionalShadows=R,G.numPointShadows=I,G.numSpotShadows=O,G.numSpotMaps=_,G.numLightProbes=F,i.version=ry++)}function c(l,h){let d=0,u=0,f=0,p=0,w=0,g=0,m=h.matrixWorldInverse;for(let S=0,U=l.length;S<U;S++){let v=l[S];if(v.isSunLight){let R=i.sun[d];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(m),d++}else if(v.isDirectionalLight){let R=i.directional[u];R.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),u++}else if(v.isSpotLight){let R=i.spot[p];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let R=i.rectArea[w];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),R.halfWidth.set(v.width*.5,0,0),R.halfHeight.set(0,v.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),w++}else if(v.isPointLight){let R=i.point[f];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let R=i.hemi[g];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:i}}function Bd(n){let e=new oy(n),t=[],i=[],r=[];function s(u){d.camera=u,t.length=0,i.length=0,r.length=0}function o(u){t.push(u)}function a(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function ay(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Bd(n),e.set(r,[a])):s>=o.length?(a=new Bd(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var ly=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,hy=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],uy=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],zd=new Yt,Ao=new $,Ch=new $;function dy(n,e,t){let i=new Ks,r=new Ve,s=new Ve,o=new jt,a=new Ga,c=new Ha,l={},h=t.maxTextureSize,d={[ir]:Ln,[Ln]:ir,[Jn]:Jn},u=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:ly,fragmentShader:cy}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new Kt;p.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new _n(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xo;let m=this.type;this.render=function(I,O,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||I.length===0)return;this.type===Pu&&(xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=xo);let b=n.getRenderTarget(),F=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),J=n.state;J.setBlending(Mi),J.buffers.depth.getReversed()===!0?J.buffers.color.setClear(0,0,0,0):J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);let ne=m!==this.type;ne&&O.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(K=>K.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,K=I.length;q<K;q++){let ie=I[q],le=ie.shadow;if(le===void 0){xt("WebGLShadowMap:",ie,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;r.copy(le.mapSize);let ve=le.getFrameExtents();r.multiply(ve),s.copy(le.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ve.x),r.x=s.x*ve.x,le.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ve.y),r.y=s.y*ve.y,le.mapSize.y=s.y));let ce=n.state.buffers.depth.getReversed();if(le.camera._reversedDepth=ce,le.map===null||ne===!0){if(le.map!==null&&(le.map.depthTexture!==null&&(le.map.depthTexture.dispose(),le.map.depthTexture=null),le.map.dispose()),this.type===cs){if(ie.isPointLight){xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}le.map=new kn(r.x,r.y,{format:ar,type:ci,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),le.map.texture.name=ie.name+".shadowMap",le.map.depthTexture=new ji(r.x,r.y,li),le.map.depthTexture.name=ie.name+".shadowMapDepth",le.map.depthTexture.format=_i,le.map.depthTexture.compareFunction=null,le.map.depthTexture.minFilter=yn,le.map.depthTexture.magFilter=yn}else ie.isPointLight?(le.map=new ql(r.x),le.map.depthTexture=new Na(r.x,ai)):(le.map=new kn(r.x,r.y),le.map.depthTexture=new ji(r.x,r.y,ai)),le.map.depthTexture.name=ie.name+".shadowMap",le.map.depthTexture.format=_i,this.type===xo?(le.map.depthTexture.compareFunction=ce?Gl:Vl,le.map.depthTexture.minFilter=Sn,le.map.depthTexture.magFilter=Sn):(le.map.depthTexture.compareFunction=null,le.map.depthTexture.minFilter=yn,le.map.depthTexture.magFilter=yn);le.camera.updateProjectionMatrix()}le.map.isWebGLCubeRenderTarget!==!0&&(le.map.width!==r.x||le.map.height!==r.y)&&le.map.setSize(r.x,r.y);let _e=le.map.isWebGLCubeRenderTarget?6:le.getViewportCount();ie.isPointLight!==!0&&le.updateMatrices(ie,_);for(let Se=0;Se<_e;Se++){let et=le.getCamera(Se);if(ie.isPointLight){let ye=le.camera,oe=le.matrix,Ae=ie.distance||ye.far;Ae!==ye.far&&(ye.far=Ae,ye.updateProjectionMatrix()),Ao.setFromMatrixPosition(ie.matrixWorld),ye.position.copy(Ao),Ch.copy(ye.position),Ch.add(hy[Se]),ye.up.copy(uy[Se]),ye.lookAt(Ch),ye.updateMatrixWorld(),oe.makeTranslation(-Ao.x,-Ao.y,-Ao.z),zd.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),le._frustum.setFromProjectionMatrix(zd,ye.coordinateSystem,ye.reversedDepth)}if(le.map.isWebGLCubeRenderTarget)n.setRenderTarget(le.map,Se),n.clear();else{Se===0&&(n.setRenderTarget(le.map),n.clear());let ye=le.getViewport(Se);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),J.viewport(o)}i=le.getFrustum(Se),v(O,_,et,ie,this.type)}le.isPointLightShadow!==!0&&this.type===cs&&S(le,_),le.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(b,F,G)};function S(I,O){let _=e.update(w);u.defines.VSM_SAMPLES!==I.blurSamples&&(u.defines.VSM_SAMPLES=I.blurSamples,f.defines.VSM_SAMPLES=I.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),I.mapPass===null?I.mapPass=new kn(r.x,r.y,{format:ar,type:ci}):(I.mapPass.width!==I.map.width||I.mapPass.height!==I.map.height)&&I.mapPass.setSize(I.map.width,I.map.height),u.uniforms.shadow_pass.value=I.map.depthTexture,u.uniforms.resolution.value.set(I.map.width,I.map.height),u.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(O,null,_,u,w,null),f.uniforms.shadow_pass.value=I.mapPass.texture,f.uniforms.resolution.value.set(I.map.width,I.map.height),f.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(O,null,_,f,w,null)}function U(I,O,_,b){let F=null,G=_.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(G!==void 0)F=G;else if(F=_.isPointLight===!0?c:a,n.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){let J=F.uuid,ne=O.uuid,q=l[J];q===void 0&&(q={},l[J]=q);let K=q[ne];K===void 0&&(K=F.clone(),q[ne]=K,O.addEventListener("dispose",R)),F=K}if(F.visible=O.visible,F.wireframe=O.wireframe,b===cs?F.side=O.shadowSide!==null?O.shadowSide:O.side:F.side=O.shadowSide!==null?O.shadowSide:d[O.side],F.alphaMap=O.alphaMap,F.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,F.map=O.map,F.clipShadows=O.clipShadows,F.clippingPlanes=O.clippingPlanes,F.clipIntersection=O.clipIntersection,F.displacementMap=O.displacementMap,F.displacementScale=O.displacementScale,F.displacementBias=O.displacementBias,F.wireframeLinewidth=O.wireframeLinewidth,F.linewidth=O.linewidth,_.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let J=n.properties.get(F);J.light=_}return F}function v(I,O,_,b,F){if(I.visible===!1)return;if(I.layers.test(O.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&F===cs)&&(!I.frustumCulled||I.intersectsFrustum(i))){I.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,I.matrixWorld);let ne=e.update(I),q=I.material;if(Array.isArray(q)){let K=ne.groups;for(let ie=0,le=K.length;ie<le;ie++){let ve=K[ie],ce=q[ve.materialIndex];if(ce&&ce.visible){let _e=U(I,ce,b,F);I.onBeforeShadow(n,I,O,_,ne,_e,ve),n.renderBufferDirect(_,null,ne,_e,I,ve),I.onAfterShadow(n,I,O,_,ne,_e,ve)}}}else if(q.visible){let K=U(I,q,b,F);I.onBeforeShadow(n,I,O,_,ne,K,null),n.renderBufferDirect(_,null,ne,K,I,null),I.onAfterShadow(n,I,O,_,ne,K,null)}}let J=I.children;for(let ne=0,q=J.length;ne<q;ne++)v(J[ne],O,_,b,F)}function R(I){I.target.removeEventListener("dispose",R);for(let _ in l){let b=l[_],F=I.target.uuid;F in b&&(b[F].dispose(),delete b[F])}}}function fy(n,e){function t(){let j=!1,Be=new jt,Te=null,Xe=new jt(0,0,0,0);return{setMask:function(Ke){Te!==Ke&&!j&&(n.colorMask(Ke,Ke,Ke,Ke),Te=Ke)},setLocked:function(Ke){j=Ke},setClear:function(Ke,Re,ut,at,Bt){Bt===!0&&(Ke*=at,Re*=at,ut*=at),Be.set(Ke,Re,ut,at),Xe.equals(Be)===!1&&(n.clearColor(Ke,Re,ut,at),Xe.copy(Be))},reset:function(){j=!1,Te=null,Xe.set(-1,0,0,0)}}}function i(){let j=!1,Be=!1,Te=null,Xe=null,Ke=null;return{setReversed:function(Re){if(Be!==Re){let ut=e.get("EXT_clip_control");Re?ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.ZERO_TO_ONE_EXT):ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.NEGATIVE_ONE_TO_ONE_EXT),Be=Re;let at=Ke;Ke=null,this.setClear(at)}},getReversed:function(){return Be},setTest:function(Re){Re?ge(n.DEPTH_TEST):V(n.DEPTH_TEST)},setMask:function(Re){Te!==Re&&!j&&(n.depthMask(Re),Te=Re)},setFunc:function(Re){if(Be&&(Re=dd[Re]),Xe!==Re){switch(Re){case ga:n.depthFunc(n.NEVER);break;case xa:n.depthFunc(n.ALWAYS);break;case ya:n.depthFunc(n.LESS);break;case Jr:n.depthFunc(n.LEQUAL);break;case _a:n.depthFunc(n.EQUAL);break;case va:n.depthFunc(n.GEQUAL);break;case wa:n.depthFunc(n.GREATER);break;case ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Xe=Re}},setLocked:function(Re){j=Re},setClear:function(Re){Ke!==Re&&(Ke=Re,Be&&(Re=1-Re),n.clearDepth(Re))},reset:function(){j=!1,Te=null,Xe=null,Ke=null,Be=!1}}}function r(){let j=!1,Be=null,Te=null,Xe=null,Ke=null,Re=null,ut=null,at=null,Bt=null;return{setTest:function(Ut){j||(Ut?ge(n.STENCIL_TEST):V(n.STENCIL_TEST))},setMask:function(Ut){Be!==Ut&&!j&&(n.stencilMask(Ut),Be=Ut)},setFunc:function(Ut,Bn,zn){(Te!==Ut||Xe!==Bn||Ke!==zn)&&(n.stencilFunc(Ut,Bn,zn),Te=Ut,Xe=Bn,Ke=zn)},setOp:function(Ut,Bn,zn){(Re!==Ut||ut!==Bn||at!==zn)&&(n.stencilOp(Ut,Bn,zn),Re=Ut,ut=Bn,at=zn)},setLocked:function(Ut){j=Ut},setClear:function(Ut){Bt!==Ut&&(n.clearStencil(Ut),Bt=Ut)},reset:function(){j=!1,Be=null,Te=null,Xe=null,Ke=null,Re=null,ut=null,at=null,Bt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],w=null,g=!1,m=null,S=null,U=null,v=null,R=null,I=null,O=null,_=new Pt(0,0,0),b=0,F=!1,G=null,J=null,ne=null,q=null,K=null,ie=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),le=!1,ve=0,ce=n.getParameter(n.VERSION);ce.indexOf("WebGL")!==-1?(ve=parseFloat(/^WebGL (\d)/.exec(ce)[1]),le=ve>=1):ce.indexOf("OpenGL ES")!==-1&&(ve=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),le=ve>=2);let _e=null,Se={},et=n.getParameter(n.SCISSOR_BOX),ye=n.getParameter(n.VIEWPORT),oe=new jt().fromArray(et),Ae=new jt().fromArray(ye);function He(j,Be,Te,Xe){let Ke=new Uint8Array(4),Re=n.createTexture();n.bindTexture(j,Re),n.texParameteri(j,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(j,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ut=0;ut<Te;ut++)j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?n.texImage3D(Be,0,n.RGBA,1,1,Xe,0,n.RGBA,n.UNSIGNED_BYTE,Ke):n.texImage2D(Be+ut,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ke);return Re}let ue={};ue[n.TEXTURE_2D]=He(n.TEXTURE_2D,n.TEXTURE_2D,1),ue[n.TEXTURE_CUBE_MAP]=He(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[n.TEXTURE_2D_ARRAY]=He(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ue[n.TEXTURE_3D]=He(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ge(n.DEPTH_TEST),o.setFunc(Jr),Pe(!1),ze(qc),ge(n.CULL_FACE),Ee(Mi);function ge(j){h[j]!==!0&&(n.enable(j),h[j]=!0)}function V(j){h[j]!==!1&&(n.disable(j),h[j]=!1)}function we(j,Be){return u[j]!==Be?(n.bindFramebuffer(j,Be),u[j]=Be,j===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Be),j===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Be),!0):!1}function Ce(j,Be){let Te=p,Xe=!1;if(j){Te=f.get(Be),Te===void 0&&(Te=[],f.set(Be,Te));let Ke=j.textures;if(Te.length!==Ke.length||Te[0]!==n.COLOR_ATTACHMENT0){for(let Re=0,ut=Ke.length;Re<ut;Re++)Te[Re]=n.COLOR_ATTACHMENT0+Re;Te.length=Ke.length,Xe=!0}}else Te[0]!==n.BACK&&(Te[0]=n.BACK,Xe=!0);Xe&&n.drawBuffers(Te)}function ke(j){return w!==j?(n.useProgram(j),w=j,!0):!1}let lt={[Tr]:n.FUNC_ADD,[Nu]:n.FUNC_SUBTRACT,[Du]:n.FUNC_REVERSE_SUBTRACT};lt[Uu]=n.MIN,lt[Fu]=n.MAX;let xe={[ku]:n.ZERO,[Ou]:n.ONE,[Bu]:n.SRC_COLOR,[Kc]:n.SRC_ALPHA,[Xu]:n.SRC_ALPHA_SATURATE,[Hu]:n.DST_COLOR,[Vu]:n.DST_ALPHA,[zu]:n.ONE_MINUS_SRC_COLOR,[jc]:n.ONE_MINUS_SRC_ALPHA,[Wu]:n.ONE_MINUS_DST_COLOR,[Gu]:n.ONE_MINUS_DST_ALPHA,[$u]:n.CONSTANT_COLOR,[qu]:n.ONE_MINUS_CONSTANT_COLOR,[Yu]:n.CONSTANT_ALPHA,[Zu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ee(j,Be,Te,Xe,Ke,Re,ut,at,Bt,Ut){if(j===Mi){g===!0&&(V(n.BLEND),g=!1);return}if(g===!1&&(ge(n.BLEND),g=!0),j!==Lu){if(j!==m||Ut!==F){if((S!==Tr||R!==Tr)&&(n.blendEquation(n.FUNC_ADD),S=Tr,R=Tr),Ut)switch(j){case hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yc:n.blendFunc(n.ONE,n.ONE);break;case Zc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:wt("WebGLState: Invalid blending: ",j);break}else switch(j){case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Zc:wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jc:wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:wt("WebGLState: Invalid blending: ",j);break}U=null,v=null,I=null,O=null,_.set(0,0,0),b=0,m=j,F=Ut}return}Ke=Ke||Be,Re=Re||Te,ut=ut||Xe,(Be!==S||Ke!==R)&&(n.blendEquationSeparate(lt[Be],lt[Ke]),S=Be,R=Ke),(Te!==U||Xe!==v||Re!==I||ut!==O)&&(n.blendFuncSeparate(xe[Te],xe[Xe],xe[Re],xe[ut]),U=Te,v=Xe,I=Re,O=ut),(at.equals(_)===!1||Bt!==b)&&(n.blendColor(at.r,at.g,at.b,Bt),_.copy(at),b=Bt),m=j,F=!1}function Ie(j,Be){j.side===Jn?V(n.CULL_FACE):ge(n.CULL_FACE);let Te=j.side===Ln;Be&&(Te=!Te),Pe(Te),j.blending===hs&&j.transparent===!1?Ee(Mi):Ee(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),o.setFunc(j.depthFunc),o.setTest(j.depthTest),o.setMask(j.depthWrite),s.setMask(j.colorWrite);let Xe=j.stencilWrite;a.setTest(Xe),Xe&&(a.setMask(j.stencilWriteMask),a.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),a.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),nt(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?ge(n.SAMPLE_ALPHA_TO_COVERAGE):V(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(j){G!==j&&(j?n.frontFace(n.CW):n.frontFace(n.CCW),G=j)}function ze(j){j!==Ru?(ge(n.CULL_FACE),j!==J&&(j===qc?n.cullFace(n.BACK):j===Iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):V(n.CULL_FACE),J=j}function ct(j){j!==ne&&(le&&n.lineWidth(j),ne=j)}function nt(j,Be,Te){j?(ge(n.POLYGON_OFFSET_FILL),(q!==Be||K!==Te)&&(q=Be,K=Te,o.getReversed()&&(Be=-Be),n.polygonOffset(Be,Te))):V(n.POLYGON_OFFSET_FILL)}function ht(j){j?ge(n.SCISSOR_TEST):V(n.SCISSOR_TEST)}function mt(j){j===void 0&&(j=n.TEXTURE0+ie-1),_e!==j&&(n.activeTexture(j),_e=j)}function X(j,Be,Te){Te===void 0&&(_e===null?Te=n.TEXTURE0+ie-1:Te=_e);let Xe=Se[Te];Xe===void 0&&(Xe={type:void 0,texture:void 0},Se[Te]=Xe),(Xe.type!==j||Xe.texture!==Be)&&(_e!==Te&&(n.activeTexture(Te),_e=Te),n.bindTexture(j,Be||ue[j]),Xe.type=j,Xe.texture=Be)}function At(){let j=Se[_e];j!==void 0&&j.type!==void 0&&(n.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function he(){try{n.compressedTexImage2D(...arguments)}catch(j){wt("WebGLState:",j)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(j){wt("WebGLState:",j)}}function x(){try{n.texSubImage2D(...arguments)}catch(j){wt("WebGLState:",j)}}function ee(){try{n.texSubImage3D(...arguments)}catch(j){wt("WebGLState:",j)}}function se(){try{n.compressedTexSubImage2D(...arguments)}catch(j){wt("WebGLState:",j)}}function me(){try{n.compressedTexSubImage3D(...arguments)}catch(j){wt("WebGLState:",j)}}function Ne(){try{n.texStorage2D(...arguments)}catch(j){wt("WebGLState:",j)}}function Fe(){try{n.texStorage3D(...arguments)}catch(j){wt("WebGLState:",j)}}function de(){try{n.texImage2D(...arguments)}catch(j){wt("WebGLState:",j)}}function fe(){try{n.texImage3D(...arguments)}catch(j){wt("WebGLState:",j)}}function Ue(j){return d[j]!==void 0?d[j]:n.getParameter(j)}function Je(j,Be){d[j]!==Be&&(n.pixelStorei(j,Be),d[j]=Be)}function Ge(j){oe.equals(j)===!1&&(n.scissor(j.x,j.y,j.z,j.w),oe.copy(j))}function Oe(j){Ae.equals(j)===!1&&(n.viewport(j.x,j.y,j.z,j.w),Ae.copy(j))}function tt(j,Be){let Te=l.get(Be);Te===void 0&&(Te=new WeakMap,l.set(Be,Te));let Xe=Te.get(j);Xe===void 0&&(Xe=n.getUniformBlockIndex(Be,j.name),Te.set(j,Xe))}function ft(j,Be){let Xe=l.get(Be).get(j);c.get(Be)!==Xe&&(n.uniformBlockBinding(Be,Xe,j.__bindingPointIndex),c.set(Be,Xe))}function bt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},_e=null,Se={},u={},f=new WeakMap,p=[],w=null,g=!1,m=null,S=null,U=null,v=null,R=null,I=null,O=null,_=new Pt(0,0,0),b=0,F=!1,G=null,J=null,ne=null,q=null,K=null,oe.set(0,0,n.canvas.width,n.canvas.height),Ae.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ge,disable:V,bindFramebuffer:we,drawBuffers:Ce,useProgram:ke,setBlending:Ee,setMaterial:Ie,setFlipSided:Pe,setCullFace:ze,setLineWidth:ct,setPolygonOffset:nt,setScissorTest:ht,activeTexture:mt,bindTexture:X,unbindTexture:At,compressedTexImage2D:he,compressedTexImage3D:C,texImage2D:de,texImage3D:fe,pixelStorei:Je,getParameter:Ue,updateUBOMapping:tt,uniformBlockBinding:ft,texStorage2D:Ne,texStorage3D:Fe,texSubImage2D:x,texSubImage3D:ee,compressedTexSubImage2D:se,compressedTexSubImage3D:me,scissor:Ge,viewport:Oe,reset:bt}}function py(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ve,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(C,x){return p?new OffscreenCanvas(C,x):$s("canvas")}function g(C,x,ee){let se=1,me=he(C);if((me.width>ee||me.height>ee)&&(se=ee/Math.max(me.width,me.height)),se<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let Ne=Math.floor(se*me.width),Fe=Math.floor(se*me.height);u===void 0&&(u=w(Ne,Fe));let de=x?w(Ne,Fe):u;return de.width=Ne,de.height=Fe,de.getContext("2d").drawImage(C,0,0,Ne,Fe),xt("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+Ne+"x"+Fe+")."),de}else return"data"in C&&xt("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),C;return C}function m(C){return C.generateMipmaps}function S(C){n.generateMipmap(C)}function U(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(C,x,ee,se,me,Ne=!1){if(C!==null){if(n[C]!==void 0)return n[C];xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Fe;se&&(Fe=e.get("EXT_texture_norm16"),Fe||xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let de=x;if(x===n.RED&&(ee===n.FLOAT&&(de=n.R32F),ee===n.HALF_FLOAT&&(de=n.R16F),ee===n.UNSIGNED_BYTE&&(de=n.R8),ee===n.UNSIGNED_SHORT&&Fe&&(de=Fe.R16_EXT),ee===n.SHORT&&Fe&&(de=Fe.R16_SNORM_EXT)),x===n.RED_INTEGER&&(ee===n.UNSIGNED_BYTE&&(de=n.R8UI),ee===n.UNSIGNED_SHORT&&(de=n.R16UI),ee===n.UNSIGNED_INT&&(de=n.R32UI),ee===n.BYTE&&(de=n.R8I),ee===n.SHORT&&(de=n.R16I),ee===n.INT&&(de=n.R32I)),x===n.RG&&(ee===n.FLOAT&&(de=n.RG32F),ee===n.HALF_FLOAT&&(de=n.RG16F),ee===n.UNSIGNED_BYTE&&(de=n.RG8),ee===n.UNSIGNED_SHORT&&Fe&&(de=Fe.RG16_EXT),ee===n.SHORT&&Fe&&(de=Fe.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(ee===n.UNSIGNED_BYTE&&(de=n.RG8UI),ee===n.UNSIGNED_SHORT&&(de=n.RG16UI),ee===n.UNSIGNED_INT&&(de=n.RG32UI),ee===n.BYTE&&(de=n.RG8I),ee===n.SHORT&&(de=n.RG16I),ee===n.INT&&(de=n.RG32I)),x===n.RGB_INTEGER&&(ee===n.UNSIGNED_BYTE&&(de=n.RGB8UI),ee===n.UNSIGNED_SHORT&&(de=n.RGB16UI),ee===n.UNSIGNED_INT&&(de=n.RGB32UI),ee===n.BYTE&&(de=n.RGB8I),ee===n.SHORT&&(de=n.RGB16I),ee===n.INT&&(de=n.RGB32I)),x===n.RGBA_INTEGER&&(ee===n.UNSIGNED_BYTE&&(de=n.RGBA8UI),ee===n.UNSIGNED_SHORT&&(de=n.RGBA16UI),ee===n.UNSIGNED_INT&&(de=n.RGBA32UI),ee===n.BYTE&&(de=n.RGBA8I),ee===n.SHORT&&(de=n.RGBA16I),ee===n.INT&&(de=n.RGBA32I)),x===n.RGB&&(ee===n.UNSIGNED_SHORT&&Fe&&(de=Fe.RGB16_EXT),ee===n.SHORT&&Fe&&(de=Fe.RGB16_SNORM_EXT),ee===n.UNSIGNED_INT_5_9_9_9_REV&&(de=n.RGB9_E5),ee===n.UNSIGNED_INT_10F_11F_11F_REV&&(de=n.R11F_G11F_B10F)),x===n.RGBA){let fe=Ne?Ws:Dt.getTransfer(me);ee===n.FLOAT&&(de=n.RGBA32F),ee===n.HALF_FLOAT&&(de=n.RGBA16F),ee===n.UNSIGNED_BYTE&&(de=fe===Xt?n.SRGB8_ALPHA8:n.RGBA8),ee===n.UNSIGNED_SHORT&&Fe&&(de=Fe.RGBA16_EXT),ee===n.SHORT&&Fe&&(de=Fe.RGBA16_SNORM_EXT),ee===n.UNSIGNED_SHORT_4_4_4_4&&(de=n.RGBA4),ee===n.UNSIGNED_SHORT_5_5_5_1&&(de=n.RGB5_A1)}return(de===n.R16F||de===n.R32F||de===n.RG16F||de===n.RG32F||de===n.RGBA16F||de===n.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function R(C,x){let ee;return C?x===null||x===ai||x===ds?ee=n.DEPTH24_STENCIL8:x===li?ee=n.DEPTH32F_STENCIL8:x===us&&(ee=n.DEPTH24_STENCIL8,xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ai||x===ds?ee=n.DEPTH_COMPONENT24:x===li?ee=n.DEPTH_COMPONENT32F:x===us&&(ee=n.DEPTH_COMPONENT16),ee}function I(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==yn&&C.minFilter!==Sn?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function O(C){let x=C.target;x.removeEventListener("dispose",O),b(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(C){let x=C.target;x.removeEventListener("dispose",_),G(x)}function b(C){let x=i.get(C);if(x.__webglInit===void 0)return;let ee=C.source,se=f.get(ee);if(se){let me=se[x.__cacheKey];me.usedTimes--,me.usedTimes===0&&F(C),Object.keys(se).length===0&&f.delete(ee)}i.remove(C)}function F(C){let x=i.get(C);n.deleteTexture(x.__webglTexture);let ee=C.source,se=f.get(ee);delete se[x.__cacheKey],o.memory.textures--}function G(C){let x=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(x.__webglFramebuffer[se]))for(let me=0;me<x.__webglFramebuffer[se].length;me++)n.deleteFramebuffer(x.__webglFramebuffer[se][me]);else n.deleteFramebuffer(x.__webglFramebuffer[se]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[se])}else{if(Array.isArray(x.__webglFramebuffer))for(let se=0;se<x.__webglFramebuffer.length;se++)n.deleteFramebuffer(x.__webglFramebuffer[se]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let se=0;se<x.__webglColorRenderbuffer.length;se++)x.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[se]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let ee=C.textures;for(let se=0,me=ee.length;se<me;se++){let Ne=i.get(ee[se]);Ne.__webglTexture&&(n.deleteTexture(Ne.__webglTexture),o.memory.textures--),i.remove(ee[se])}i.remove(C)}let J=0;function ne(){J=0}function q(){return J}function K(C){J=C}function ie(){let C=J;return C>=r.maxTextures&&xt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),J+=1,C}function le(C){let x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function ve(C,x){let ee=i.get(C);if(C.isVideoTexture&&X(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&ee.__version!==C.version){let se=C.image;if(se===null)xt("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)xt("WebGLRenderer: Texture marked for update but image is incomplete");else{V(ee,C,x);return}}else C.isExternalTexture&&(ee.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture,n.TEXTURE0+x)}function ce(C,x){let ee=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&ee.__version!==C.version){V(ee,C,x);return}else C.isExternalTexture&&(ee.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,ee.__webglTexture,n.TEXTURE0+x)}function _e(C,x){let ee=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&ee.__version!==C.version){V(ee,C,x);return}t.bindTexture(n.TEXTURE_3D,ee.__webglTexture,n.TEXTURE0+x)}function Se(C,x){let ee=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&ee.__version!==C.version){we(ee,C,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture,n.TEXTURE0+x)}let et={[Ma]:n.REPEAT,[yi]:n.CLAMP_TO_EDGE,[Sa]:n.MIRRORED_REPEAT},ye={[yn]:n.NEAREST,[ju]:n.NEAREST_MIPMAP_NEAREST,[_o]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[rl]:n.LINEAR_MIPMAP_NEAREST,[sr]:n.LINEAR_MIPMAP_LINEAR},oe={[nd]:n.NEVER,[ad]:n.ALWAYS,[id]:n.LESS,[Vl]:n.LEQUAL,[rd]:n.EQUAL,[Gl]:n.GEQUAL,[sd]:n.GREATER,[od]:n.NOTEQUAL};function Ae(C,x){if(x.type===li&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Sn||x.magFilter===rl||x.magFilter===_o||x.magFilter===sr||x.minFilter===Sn||x.minFilter===rl||x.minFilter===_o||x.minFilter===sr)&&xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,et[x.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,et[x.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,et[x.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ye[x.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ye[x.minFilter]),x.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,oe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===yn||x.minFilter!==_o&&x.minFilter!==sr||x.type===li&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let ee=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function He(C,x){let ee=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",O));let se=x.source,me=f.get(se);me===void 0&&(me={},f.set(se,me));let Ne=le(x);if(Ne!==C.__cacheKey){me[Ne]===void 0&&(me[Ne]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,ee=!0),me[Ne].usedTimes++;let Fe=me[C.__cacheKey];Fe!==void 0&&(me[C.__cacheKey].usedTimes--,Fe.usedTimes===0&&F(x)),C.__cacheKey=Ne,C.__webglTexture=me[Ne].texture}return ee}function ue(C,x,ee){return Math.floor(Math.floor(C/ee)/x)}function ge(C,x,ee,se){let Ne=C.updateRanges;if(Ne.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,ee,se,x.data);else{Ne.sort((Je,Ge)=>Je.start-Ge.start);let Fe=0;for(let Je=1;Je<Ne.length;Je++){let Ge=Ne[Fe],Oe=Ne[Je],tt=Ge.start+Ge.count,ft=ue(Oe.start,x.width,4),bt=ue(Ge.start,x.width,4);Oe.start<=tt+1&&ft===bt&&ue(Oe.start+Oe.count-1,x.width,4)===ft?Ge.count=Math.max(Ge.count,Oe.start+Oe.count-Ge.start):(++Fe,Ne[Fe]=Oe)}Ne.length=Fe+1;let de=t.getParameter(n.UNPACK_ROW_LENGTH),fe=t.getParameter(n.UNPACK_SKIP_PIXELS),Ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Je=0,Ge=Ne.length;Je<Ge;Je++){let Oe=Ne[Je],tt=Math.floor(Oe.start/4),ft=Math.ceil(Oe.count/4),bt=tt%x.width,j=Math.floor(tt/x.width),Be=ft,Te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,bt),t.pixelStorei(n.UNPACK_SKIP_ROWS,j),t.texSubImage2D(n.TEXTURE_2D,0,bt,j,Be,Te,ee,se,x.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,de),t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ue)}}function V(C,x,ee){let se=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(se=n.TEXTURE_3D);let me=He(C,x),Ne=x.source;t.bindTexture(se,C.__webglTexture,n.TEXTURE0+ee);let Fe=i.get(Ne);if(Ne.version!==Fe.__version||me===!0){if(t.activeTexture(n.TEXTURE0+ee),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let Te=Dt.getPrimaries(Dt.workingColorSpace),Xe=x.colorSpace===zi?null:Dt.getPrimaries(x.colorSpace),Ke=x.colorSpace===zi||Te===Xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let fe=g(x.image,!1,r.maxTextureSize);fe=At(x,fe);let Ue=s.convert(x.format,x.colorSpace),Je=s.convert(x.type),Ge=v(x.internalFormat,Ue,Je,x.normalized,x.colorSpace,x.isVideoTexture);Ae(se,x);let Oe,tt=x.mipmaps,ft=x.isVideoTexture!==!0,bt=Fe.__version===void 0||me===!0,j=Ne.dataReady,Be=I(x,fe);if(x.isDepthTexture)Ge=R(x.format===or,x.type),bt&&(ft?t.texStorage2D(n.TEXTURE_2D,1,Ge,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ge,fe.width,fe.height,0,Ue,Je,null));else if(x.isDataTexture)if(tt.length>0){ft&&bt&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,tt[0].width,tt[0].height);for(let Te=0,Xe=tt.length;Te<Xe;Te++)Oe=tt[Te],ft?j&&t.texSubImage2D(n.TEXTURE_2D,Te,0,0,Oe.width,Oe.height,Ue,Je,Oe.data):t.texImage2D(n.TEXTURE_2D,Te,Ge,Oe.width,Oe.height,0,Ue,Je,Oe.data);x.generateMipmaps=!1}else ft?(bt&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,fe.width,fe.height),j&&ge(x,fe,Ue,Je)):t.texImage2D(n.TEXTURE_2D,0,Ge,fe.width,fe.height,0,Ue,Je,fe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ft&&bt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,Ge,tt[0].width,tt[0].height,fe.depth);for(let Te=0,Xe=tt.length;Te<Xe;Te++)if(Oe=tt[Te],x.format!==Kn)if(Ue!==null)if(ft){if(j)if(x.layerUpdates.size>0){let Ke=bh(Oe.width,Oe.height,x.format,x.type);for(let Re of x.layerUpdates){let ut=Oe.data.subarray(Re*Ke/Oe.data.BYTES_PER_ELEMENT,(Re+1)*Ke/Oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Te,0,0,Re,Oe.width,Oe.height,1,Ue,ut)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Te,0,0,0,Oe.width,Oe.height,fe.depth,Ue,Oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Te,Ge,Oe.width,Oe.height,fe.depth,0,Oe.data,0,0);else xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?j&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Te,0,0,0,Oe.width,Oe.height,fe.depth,Ue,Je,Oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Te,Ge,Oe.width,Oe.height,fe.depth,0,Ue,Je,Oe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ft&&bt&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,tt[0].width,tt[0].height);for(let Te=0,Xe=tt.length;Te<Xe;Te++)Oe=tt[Te],x.format!==Kn?Ue!==null?ft?j&&t.compressedTexSubImage2D(n.TEXTURE_2D,Te,0,0,Oe.width,Oe.height,Ue,Oe.data):t.compressedTexImage2D(n.TEXTURE_2D,Te,Ge,Oe.width,Oe.height,0,Oe.data):xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?j&&t.texSubImage2D(n.TEXTURE_2D,Te,0,0,Oe.width,Oe.height,Ue,Je,Oe.data):t.texImage2D(n.TEXTURE_2D,Te,Ge,Oe.width,Oe.height,0,Ue,Je,Oe.data)}else if(x.isDataArrayTexture)if(ft){if(bt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,Ge,fe.width,fe.height,fe.depth),j)if(x.layerUpdates.size>0){let Te=bh(fe.width,fe.height,x.format,x.type);for(let Xe of x.layerUpdates){let Ke=fe.data.subarray(Xe*Te/fe.data.BYTES_PER_ELEMENT,(Xe+1)*Te/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Xe,fe.width,fe.height,1,Ue,Je,Ke)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ue,Je,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ge,fe.width,fe.height,fe.depth,0,Ue,Je,fe.data);else if(x.isData3DTexture)ft?(bt&&t.texStorage3D(n.TEXTURE_3D,Be,Ge,fe.width,fe.height,fe.depth),j&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ue,Je,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ge,fe.width,fe.height,fe.depth,0,Ue,Je,fe.data);else if(x.isFramebufferTexture){if(bt)if(ft)t.texStorage2D(n.TEXTURE_2D,Be,Ge,fe.width,fe.height);else{let Te=fe.width,Xe=fe.height;for(let Ke=0;Ke<Be;Ke++)t.texImage2D(n.TEXTURE_2D,Ke,Ge,Te,Xe,0,Ue,Je,null),Te>>=1,Xe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){let Te=n.canvas;if(Te.hasAttribute("layoutsubtree")||Te.setAttribute("layoutsubtree","true"),fe.parentNode!==Te){Te.appendChild(fe),d.add(x),Te.onpaint=Xe=>{let Ke=Xe.changedElements;for(let Re of d)Ke.includes(Re.image)&&(Re.needsUpdate=!0)},Te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,fe);else{let Ke=n.RGBA,Re=n.RGBA,ut=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ke,Re,ut,fe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(tt.length>0){if(ft&&bt){let Te=he(tt[0]);t.texStorage2D(n.TEXTURE_2D,Be,Ge,Te.width,Te.height)}for(let Te=0,Xe=tt.length;Te<Xe;Te++)Oe=tt[Te],ft?j&&t.texSubImage2D(n.TEXTURE_2D,Te,0,0,Ue,Je,Oe):t.texImage2D(n.TEXTURE_2D,Te,Ge,Ue,Je,Oe);x.generateMipmaps=!1}else if(ft){if(bt){let Te=he(fe);t.texStorage2D(n.TEXTURE_2D,Be,Ge,Te.width,Te.height)}j&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ue,Je,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ge,Ue,Je,fe);m(x)&&S(se),Fe.__version=Ne.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function we(C,x,ee){if(x.image.length!==6)return;let se=He(C,x),me=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+ee);let Ne=i.get(me);if(me.version!==Ne.__version||se===!0){t.activeTexture(n.TEXTURE0+ee);let Fe=Dt.getPrimaries(Dt.workingColorSpace),de=x.colorSpace===zi?null:Dt.getPrimaries(x.colorSpace),fe=x.colorSpace===zi||Fe===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let Ue=x.isCompressedTexture||x.image[0].isCompressedTexture,Je=x.image[0]&&x.image[0].isDataTexture,Ge=[];for(let Re=0;Re<6;Re++)!Ue&&!Je?Ge[Re]=g(x.image[Re],!0,r.maxCubemapSize):Ge[Re]=Je?x.image[Re].image:x.image[Re],Ge[Re]=At(x,Ge[Re]);let Oe=Ge[0],tt=s.convert(x.format,x.colorSpace),ft=s.convert(x.type),bt=v(x.internalFormat,tt,ft,x.normalized,x.colorSpace),j=x.isVideoTexture!==!0,Be=Ne.__version===void 0||se===!0,Te=me.dataReady,Xe=I(x,Oe);Ae(n.TEXTURE_CUBE_MAP,x);let Ke;if(Ue){j&&Be&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Xe,bt,Oe.width,Oe.height);for(let Re=0;Re<6;Re++){Ke=Ge[Re].mipmaps;for(let ut=0;ut<Ke.length;ut++){let at=Ke[ut];x.format!==Kn?tt!==null?j?Te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut,0,0,at.width,at.height,tt,at.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut,bt,at.width,at.height,0,at.data):xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?Te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut,0,0,at.width,at.height,tt,ft,at.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut,bt,at.width,at.height,0,tt,ft,at.data)}}}else{if(Ke=x.mipmaps,j&&Be){Ke.length>0&&Xe++;let Re=he(Ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Xe,bt,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(Je){j?Te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ge[Re].width,Ge[Re].height,tt,ft,Ge[Re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,bt,Ge[Re].width,Ge[Re].height,0,tt,ft,Ge[Re].data);for(let ut=0;ut<Ke.length;ut++){let Bt=Ke[ut].image[Re].image;j?Te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut+1,0,0,Bt.width,Bt.height,tt,ft,Bt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut+1,bt,Bt.width,Bt.height,0,tt,ft,Bt.data)}}else{j?Te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,tt,ft,Ge[Re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,bt,tt,ft,Ge[Re]);for(let ut=0;ut<Ke.length;ut++){let at=Ke[ut];j?Te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut+1,0,0,tt,ft,at.image[Re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Re,ut+1,bt,tt,ft,at.image[Re])}}}m(x)&&S(n.TEXTURE_CUBE_MAP),Ne.__version=me.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Ce(C,x,ee,se,me,Ne){let Fe=s.convert(ee.format,ee.colorSpace),de=s.convert(ee.type),fe=v(ee.internalFormat,Fe,de,ee.normalized,ee.colorSpace),Ue=i.get(x),Je=i.get(ee);if(Je.__renderTarget=x,!Ue.__hasExternalTextures){let Ge=Math.max(1,x.width>>Ne),Oe=Math.max(1,x.height>>Ne);me===n.TEXTURE_3D||me===n.TEXTURE_2D_ARRAY?t.texImage3D(me,Ne,fe,Ge,Oe,x.depth,0,Fe,de,null):t.texImage2D(me,Ne,fe,Ge,Oe,0,Fe,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),mt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,me,Je.__webglTexture,0,ht(x)):(me===n.TEXTURE_2D||me>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,me,Je.__webglTexture,Ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(C,x,ee){if(n.bindRenderbuffer(n.RENDERBUFFER,C),x.depthBuffer){let se=x.depthTexture,me=se&&se.isDepthTexture?se.type:null,Ne=R(x.stencilBuffer,me),Fe=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;mt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht(x),Ne,x.width,x.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht(x),Ne,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Ne,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Fe,n.RENDERBUFFER,C)}else{let se=x.textures;for(let me=0;me<se.length;me++){let Ne=se[me],Fe=s.convert(Ne.format,Ne.colorSpace),de=s.convert(Ne.type),fe=v(Ne.internalFormat,Fe,de,Ne.normalized,Ne.colorSpace);mt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht(x),fe,x.width,x.height):ee?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht(x),fe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,fe,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function lt(C,x,ee){let se=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let me=i.get(x.depthTexture);if(me.__renderTarget=x,(!me.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),se){if(me.__webglInit===void 0&&(me.__webglInit=!0,x.depthTexture.addEventListener("dispose",O)),me.__webglTexture===void 0){me.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,me.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,x.depthTexture);let Ue=s.convert(x.depthTexture.format),Je=s.convert(x.depthTexture.type),Ge;x.depthTexture.format===_i?Ge=n.DEPTH_COMPONENT24:x.depthTexture.format===or&&(Ge=n.DEPTH24_STENCIL8);for(let Oe=0;Oe<6;Oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Ge,x.width,x.height,0,Ue,Je,null)}}else ve(x.depthTexture,0);let Ne=me.__webglTexture,Fe=ht(x),de=se?n.TEXTURE_CUBE_MAP_POSITIVE_X+ee:n.TEXTURE_2D,fe=x.depthTexture.format===or?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===_i)mt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,de,Ne,0,Fe):n.framebufferTexture2D(n.FRAMEBUFFER,fe,de,Ne,0);else if(x.depthTexture.format===or)mt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,de,Ne,0,Fe):n.framebufferTexture2D(n.FRAMEBUFFER,fe,de,Ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xe(C){let x=i.get(C),ee=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let se=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),se){let me=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,se.removeEventListener("dispose",me)};se.addEventListener("dispose",me),x.__depthDisposeCallback=me}x.__boundDepthTexture=se}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(ee)for(let se=0;se<6;se++)lt(x.__webglFramebuffer[se],C,se);else{let se=C.texture.mipmaps;se&&se.length>0?lt(x.__webglFramebuffer[0],C,0):lt(x.__webglFramebuffer,C,0)}else if(ee){x.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[se]),x.__webglDepthbuffer[se]===void 0)x.__webglDepthbuffer[se]=n.createRenderbuffer(),ke(x.__webglDepthbuffer[se],C,!1);else{let me=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=x.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,Ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,Ne)}}else{let se=C.texture.mipmaps;if(se&&se.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ke(x.__webglDepthbuffer,C,!1);else{let me=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,Ne)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(C,x,ee){let se=i.get(C);x!==void 0&&Ce(se.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),ee!==void 0&&xe(C)}function Ie(C){let x=C.texture,ee=i.get(C),se=i.get(x);C.addEventListener("dispose",_);let me=C.textures,Ne=C.isWebGLCubeRenderTarget===!0,Fe=me.length>1;if(Fe||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=x.version,o.memory.textures++),Ne){ee.__webglFramebuffer=[];for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0){ee.__webglFramebuffer[de]=[];for(let fe=0;fe<x.mipmaps.length;fe++)ee.__webglFramebuffer[de][fe]=n.createFramebuffer()}else ee.__webglFramebuffer[de]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){ee.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)ee.__webglFramebuffer[de]=n.createFramebuffer()}else ee.__webglFramebuffer=n.createFramebuffer();if(Fe)for(let de=0,fe=me.length;de<fe;de++){let Ue=i.get(me[de]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&mt(C)===!1){ee.__webglMultisampledFramebuffer=n.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let de=0;de<me.length;de++){let fe=me[de];ee.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,ee.__webglColorRenderbuffer[de]);let Ue=s.convert(fe.format,fe.colorSpace),Je=s.convert(fe.type),Ge=v(fe.internalFormat,Ue,Je,fe.normalized,fe.colorSpace,C.isXRRenderTarget===!0),Oe=ht(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,Ge,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ee.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(ee.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(ee.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Ne){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,x);for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)Ce(ee.__webglFramebuffer[de][fe],C,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,fe);else Ce(ee.__webglFramebuffer[de],C,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(x)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let de=0,fe=me.length;de<fe;de++){let Ue=me[de],Je=i.get(Ue),Ge=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ge,Je.__webglTexture),Ae(Ge,Ue),Ce(ee.__webglFramebuffer,C,Ue,n.COLOR_ATTACHMENT0+de,Ge,0),m(Ue)&&S(Ge)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(de=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,se.__webglTexture),Ae(de,x),x.mipmaps&&x.mipmaps.length>0)for(let fe=0;fe<x.mipmaps.length;fe++)Ce(ee.__webglFramebuffer[fe],C,x,n.COLOR_ATTACHMENT0,de,fe);else Ce(ee.__webglFramebuffer,C,x,n.COLOR_ATTACHMENT0,de,0);m(x)&&S(de),t.unbindTexture()}C.depthBuffer&&xe(C)}function Pe(C){let x=C.textures;for(let ee=0,se=x.length;ee<se;ee++){let me=x[ee];if(m(me)){let Ne=U(C),Fe=i.get(me).__webglTexture;t.bindTexture(Ne,Fe),S(Ne),t.unbindTexture()}}}let ze=[],ct=[];function nt(C){if(C.samples>0){if(mt(C)===!1){let x=C.textures,ee=C.width,se=C.height,me=n.COLOR_BUFFER_BIT,Ne=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Fe=i.get(C),de=x.length>1;if(de)for(let Ue=0;Ue<x.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);let fe=C.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ue=0;Ue<x.length;Ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(me|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(me|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ue]);let Je=i.get(x[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Je,0)}n.blitFramebuffer(0,0,ee,se,0,0,ee,se,me,n.NEAREST),c===!0&&(ze.length=0,ct.length=0,ze.push(n.COLOR_ATTACHMENT0+Ue),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ze.push(Ne),ct.push(Ne),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Ue=0;Ue<x.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ue]);let Je=i.get(x[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,Je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let x=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ht(C){return Math.min(r.maxSamples,C.samples)}function mt(C){let x=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function X(C){let x=o.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function At(C,x){let ee=C.colorSpace,se=C.format,me=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||ee!==Hs&&ee!==zi&&(Dt.getTransfer(ee)===Xt?(se!==Kn||me!==qn)&&xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):wt("WebGLTextures: Unsupported texture color space:",ee)),x}function he(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=ie,this.resetTextureUnits=ne,this.getTextureUnits=q,this.setTextureUnits=K,this.setTexture2D=ve,this.setTexture2DArray=ce,this.setTexture3D=_e,this.setTextureCube=Se,this.rebindTextures=Ee,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function my(n,e){function t(i,r=zi){let s,o=Dt.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===ol)return n.UNSIGNED_SHORT_4_4_4_4;if(i===al)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===uh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===lh)return n.BYTE;if(i===ch)return n.SHORT;if(i===us)return n.UNSIGNED_SHORT;if(i===sl)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===li)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===dh)return n.ALPHA;if(i===fh)return n.RGB;if(i===Kn)return n.RGBA;if(i===_i)return n.DEPTH_COMPONENT;if(i===or)return n.DEPTH_STENCIL;if(i===ph)return n.RED;if(i===ll)return n.RED_INTEGER;if(i===ar)return n.RG;if(i===cl)return n.RG_INTEGER;if(i===hl)return n.RGBA_INTEGER;if(i===vo||i===wo||i===bo||i===Mo)if(o===Xt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===vo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===vo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ul||i===dl||i===fl||i===pl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ul)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===dl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ml||i===gl||i===xl||i===yl||i===_l||i===So||i===vl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ml||i===gl)return o===Xt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===yl)return s.COMPRESSED_R11_EAC;if(i===_l)return s.COMPRESSED_SIGNED_R11_EAC;if(i===So)return s.COMPRESSED_RG11_EAC;if(i===vl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===wl||i===bl||i===Ml||i===Sl||i===El||i===Tl||i===Al||i===Cl||i===Rl||i===Il||i===Pl||i===Ll||i===Nl||i===Dl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===wl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ml)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Sl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===El)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Tl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Al)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Il)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ll)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Nl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Dl)return o===Xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ul||i===Fl||i===kl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ul)return o===Xt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===kl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ol||i===Bl||i===Eo||i===zl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ol)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Bl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Eo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ds?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var gy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Fh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new to(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Cn({vertexShader:gy,fragmentShader:xy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _n(new Sr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kh=class extends vi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null,w=typeof XRWebGLBinding<"u",g=new Fh,m={},S=t.getContextAttributes(),U=null,v=null,R=[],I=[],O=new Ve,_=null,b=null,F=new Mn;F.viewport=new jt;let G=new Mn;G.viewport=new jt;let J=[F,G],ne=new tl,q=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ue){let ge=R[ue];return ge===void 0&&(ge=new Qr,R[ue]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(ue){let ge=R[ue];return ge===void 0&&(ge=new Qr,R[ue]=ge),ge.getGripSpace()},this.getHand=function(ue){let ge=R[ue];return ge===void 0&&(ge=new Qr,R[ue]=ge),ge.getHandSpace()};function ie(ue){let ge=I.indexOf(ue.inputSource);if(ge===-1)return;let V=R[ge];V!==void 0&&(V.update(ue.inputSource,ue.frame,l||o),V.dispatchEvent({type:ue.type,data:ue.inputSource}))}function le(){r.removeEventListener("select",ie),r.removeEventListener("selectstart",ie),r.removeEventListener("selectend",ie),r.removeEventListener("squeeze",ie),r.removeEventListener("squeezestart",ie),r.removeEventListener("squeezeend",ie),r.removeEventListener("end",le),r.removeEventListener("inputsourceschange",ve);for(let ue=0;ue<R.length;ue++){let ge=I[ue];ge!==null&&(I[ue]=null,R[ue].disconnect(ge))}q=null,K=null,g.reset();for(let ue in m)delete m[ue];if(e.setRenderTarget(U),f=null,u=null,d=null,r=null,v=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(O.width,O.height,!1),b!==null){let ue=b.camera;ue.fov=b.fov,ue.zoom=b.zoom,ue.updateProjectionMatrix(),b=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ue){s=ue,i.isPresenting===!0&&xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ue){a=ue,i.isPresenting===!0&&xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ue){l=ue},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&w&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(ue){if(r=ue,r!==null){if(U=e.getRenderTarget(),r.addEventListener("select",ie),r.addEventListener("selectstart",ie),r.addEventListener("selectend",ie),r.addEventListener("squeeze",ie),r.addEventListener("squeezestart",ie),r.addEventListener("squeezeend",ie),r.addEventListener("end",le),r.addEventListener("inputsourceschange",ve),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(O),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,we=null,Ce=null;S.depth&&(Ce=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=S.stencil?or:_i,we=S.stencil?ds:ai);let ke={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(ke),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new kn(u.textureWidth,u.textureHeight,{format:Kn,type:qn,depthTexture:new ji(u.textureWidth,u.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let V={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new kn(f.framebufferWidth,f.framebufferHeight,{format:Kn,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),He.setContext(r),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ve(ue){for(let ge=0;ge<ue.removed.length;ge++){let V=ue.removed[ge],we=I.indexOf(V);we>=0&&(I[we]=null,R[we].disconnect(V))}for(let ge=0;ge<ue.added.length;ge++){let V=ue.added[ge],we=I.indexOf(V);if(we===-1){for(let ke=0;ke<R.length;ke++)if(ke>=I.length){I.push(V),we=ke;break}else if(I[ke]===null){I[ke]=V,we=ke;break}if(we===-1)break}let Ce=R[we];Ce&&Ce.connect(V)}}let ce=new $,_e=new $;function Se(ue,ge,V){ce.setFromMatrixPosition(ge.matrixWorld),_e.setFromMatrixPosition(V.matrixWorld);let we=ce.distanceTo(_e),Ce=ge.projectionMatrix.elements,ke=V.projectionMatrix.elements,lt=Ce[14]/(Ce[10]-1),xe=Ce[14]/(Ce[10]+1),Ee=(Ce[9]+1)/Ce[5],Ie=(Ce[9]-1)/Ce[5],Pe=(Ce[8]-1)/Ce[0],ze=(ke[8]+1)/ke[0],ct=lt*Pe,nt=lt*ze,ht=we/(-Pe+ze),mt=ht*-Pe;if(ge.matrixWorld.decompose(ue.position,ue.quaternion,ue.scale),ue.translateX(mt),ue.translateZ(ht),ue.matrixWorld.compose(ue.position,ue.quaternion,ue.scale),ue.matrixWorldInverse.copy(ue.matrixWorld).invert(),Ce[10]===-1)ue.projectionMatrix.copy(ge.projectionMatrix),ue.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{let X=lt+ht,At=xe+ht,he=ct-mt,C=nt+(we-mt),x=Ee*xe/At*X,ee=Ie*xe/At*X;ue.projectionMatrix.makePerspective(he,C,x,ee,X,At),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert()}}function et(ue,ge){ge===null?ue.matrixWorld.copy(ue.matrix):ue.matrixWorld.multiplyMatrices(ge.matrixWorld,ue.matrix),ue.matrixWorldInverse.copy(ue.matrixWorld).invert()}this.updateCamera=function(ue){if(r===null)return;let ge=ue.near,V=ue.far;g.texture!==null&&(g.depthNear>0&&(ge=g.depthNear),g.depthFar>0&&(V=g.depthFar)),ne.near=G.near=F.near=ge,ne.far=G.far=F.far=V,(q!==ne.near||K!==ne.far)&&(r.updateRenderState({depthNear:ne.near,depthFar:ne.far}),q=ne.near,K=ne.far),ne.layers.mask=ue.layers.mask|6,F.layers.mask=ne.layers.mask&-5,G.layers.mask=ne.layers.mask&-3;let we=ue.parent,Ce=ne.cameras;et(ne,we);for(let ke=0;ke<Ce.length;ke++)et(Ce[ke],we);Ce.length===2?Se(ne,F,G):ne.projectionMatrix.copy(F.projectionMatrix),b===null&&ue.isPerspectiveCamera&&(b={camera:ue,fov:ue.fov,zoom:ue.zoom}),ye(ue,ne,we)};function ye(ue,ge,V){V===null?ue.matrix.copy(ge.matrixWorld):(ue.matrix.copy(V.matrixWorld),ue.matrix.invert(),ue.matrix.multiply(ge.matrixWorld)),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.updateMatrixWorld(!0),ue.projectionMatrix.copy(ge.projectionMatrix),ue.projectionMatrixInverse.copy(ge.projectionMatrixInverse),ue.isPerspectiveCamera&&(ue.fov=Ta*2*Math.atan(1/ue.projectionMatrix.elements[5]),ue.zoom=1)}this.getCamera=function(){return ne},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(ue){c=ue,u!==null&&(u.fixedFoveation=ue),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ue)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(ne)},this.getCameraTexture=function(ue){return m[ue]};let oe=null;function Ae(ue,ge){if(h=ge.getViewerPose(l||o),p=ge,h!==null){let V=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let we=!1;V.length!==ne.cameras.length&&(ne.cameras.length=0,we=!0);for(let xe=0;xe<V.length;xe++){let Ee=V[xe],Ie=null;if(f!==null)Ie=f.getViewport(Ee);else{let ze=d.getViewSubImage(u,Ee);Ie=ze.viewport,xe===0&&(e.setRenderTargetTextures(v,ze.colorTexture,ze.depthStencilTexture),e.setRenderTarget(v))}let Pe=J[xe];Pe===void 0&&(Pe=new Mn,Pe.layers.enable(xe),Pe.viewport=new jt,J[xe]=Pe),Pe.matrix.fromArray(Ee.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Ee.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),xe===0&&(ne.matrix.copy(Pe.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale)),we===!0&&ne.cameras.push(Pe)}let Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){d=i.getBinding();let xe=d.getDepthInformation(V[0]);xe&&xe.isValid&&xe.texture&&g.init(xe,r.renderState)}if(Ce&&Ce.includes("camera-access")&&w){e.state.unbindTexture(),d=i.getBinding();for(let xe=0;xe<V.length;xe++){let Ee=V[xe].camera;if(Ee){let Ie=m[Ee];Ie||(Ie=new to,m[Ee]=Ie);let Pe=d.getCameraImage(Ee);Ie.sourceTexture=Pe}}}}for(let V=0;V<R.length;V++){let we=I[V],Ce=R[V];we!==null&&Ce!==void 0&&Ce.update(we,ge,l||o)}oe&&oe(ue,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),p=null}let He=new Vd;He.setAnimationLoop(Ae),this.setAnimationLoop=function(ue){oe=ue},this.dispose=function(){}}},yy=new Yt,qd=new Mt;qd.set(-1,0,0,0,1,0,0,0,1);function _y(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,_h(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,S,U,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,v)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),w(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,S,U):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ln&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ln&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let S=e.get(m),U=S.envMap,v=S.envMapRotation;U&&(g.envMap.value=U,g.envMapRotation.value.setFromMatrix4(yy.makeRotationFromEuler(v)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(qd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,S,U){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=U*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ln&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function w(g,m){let S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vy(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,R){let I=R.program;i.uniformBlockBinding(v,I)}function l(v,R){let I=r[v.id];I===void 0&&(g(v),I=h(v),r[v.id]=I,v.addEventListener("dispose",S));let O=R.program;i.updateUBOMapping(v,O);let _=e.render.frame;s[v.id]!==_&&(u(v),s[v.id]=_)}function h(v){let R=d();v.__bindingPointIndex=R;let I=n.createBuffer(),O=v.__size,_=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,I),n.bufferData(n.UNIFORM_BUFFER,O,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,I),I}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let R=r[v.id],I=v.uniforms,O=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let _=0,b=I.length;_<b;_++){let F=I[_];if(Array.isArray(F))for(let G=0,J=F.length;G<J;G++)f(F[G],_,G,O);else f(F,_,0,O)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,R,I,O){if(w(v,R,I,O)===!0){let _=v.__offset,b=v.value;if(Array.isArray(b)){let F=0;for(let G=0;G<b.length;G++){let J=b[G],ne=m(J);p(J,v.__data,F),typeof J!="number"&&typeof J!="boolean"&&!J.isMatrix3&&!ArrayBuffer.isView(J)&&(F+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(b,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,v.__data)}}function p(v,R,I){typeof v=="number"||typeof v=="boolean"?R[0]=v:v.isMatrix3?(R[0]=v.elements[0],R[1]=v.elements[1],R[2]=v.elements[2],R[3]=0,R[4]=v.elements[3],R[5]=v.elements[4],R[6]=v.elements[5],R[7]=0,R[8]=v.elements[6],R[9]=v.elements[7],R[10]=v.elements[8],R[11]=0):ArrayBuffer.isView(v)?R.set(new v.constructor(v.buffer,v.byteOffset,R.length)):v.toArray(R,I)}function w(v,R,I,O){let _=v.value,b=R+"_"+I;if(O[b]===void 0)return typeof _=="number"||typeof _=="boolean"?O[b]=_:ArrayBuffer.isView(_)?O[b]=_.slice():O[b]=_.clone(),!0;{let F=O[b];if(typeof _=="number"||typeof _=="boolean"){if(F!==_)return O[b]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(F.equals(_)===!1)return F.copy(_),!0}}return!1}function g(v){let R=v.uniforms,I=0,O=16;for(let b=0,F=R.length;b<F;b++){let G=Array.isArray(R[b])?R[b]:[R[b]];for(let J=0,ne=G.length;J<ne;J++){let q=G[J],K=Array.isArray(q.value)?q.value:[q.value];for(let ie=0,le=K.length;ie<le;ie++){let ve=K[ie],ce=m(ve),_e=I%O,Se=_e%ce.boundary,et=_e+Se;I+=Se,et!==0&&O-et<ce.storage&&(I+=O-et),q.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=I,I+=ce.storage}}}let _=I%O;return _>0&&(I+=O-_),v.__size=I,v.__cache={},this}function m(v){let R={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(R.boundary=4,R.storage=4):v.isVector2?(R.boundary=8,R.storage=8):v.isVector3||v.isColor?(R.boundary=16,R.storage=12):v.isVector4?(R.boundary=16,R.storage=16):v.isMatrix3?(R.boundary=48,R.storage=48):v.isMatrix4?(R.boundary=64,R.storage=64):v.isTexture?xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(R.boundary=16,R.storage=v.byteLength):xt("WebGLRenderer: Unsupported uniform value type.",v),R}function S(v){let R=v.target;R.removeEventListener("dispose",S);let I=o.indexOf(R.__bindingPointIndex);o.splice(I,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete s[R.id]}function U(){for(let v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:U}}var wy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Si=null;function by(){return Si===null&&(Si=new Ia(wy,16,16,ar,ci),Si.name="DFG_LUT",Si.minFilter=Sn,Si.magFilter=Sn,Si.wrapS=yi,Si.wrapT=yi,Si.generateMipmaps=!1,Si.needsUpdate=!0),Si}var Yl=class{constructor(e={}){let{canvas:t=cd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=qn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let w=f,g=new Set([hl,cl,ll]),m=new Set([qn,ai,us,ds,ol,al]),S=new Uint32Array(4),U=new Int32Array(4),v=new $,R=null,I=null,O=[],_=[],b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,G=!1,J=null,ne=null,q=null,K=null;this._outputColorSpace=Wn;let ie=0,le=0,ve=null,ce=-1,_e=null,Se=new jt,et=new jt,ye=null,oe=new Pt(0),Ae=0,He=t.width,ue=t.height,ge=1,V=null,we=null,Ce=new jt(0,0,He,ue),ke=new jt(0,0,He,ue),lt=!1,xe=new Ks,Ee=!1,Ie=!1,Pe=new Yt,ze=new $,ct=new jt,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ht=!1;function mt(){return ve===null?ge:1}let X=i;function At(T,Q){return t.getContext(T,Q)}let he,C,x,ee,se,me,Ne,Fe,de,fe,Ue,Je,Ge,Oe,tt,ft,bt,j,Be,Te,Xe,Ke,Re;try{let T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Bt,!1),t.addEventListener("webglcontextrestored",Ut,!1),t.addEventListener("webglcontextcreationerror",Bn,!1),X===null){let Q="webgl2";if(X=At(Q,T),X===null)throw At(Q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ut()}catch(T){throw t.removeEventListener("webglcontextlost",Bt,!1),t.removeEventListener("webglcontextrestored",Ut,!1),t.removeEventListener("webglcontextcreationerror",Bn,!1),wt("WebGLRenderer: "+T.message),T}function ut(){he=new R0(X),he.init(),Xe=new my(X,he),C=new _0(X,he,e,Xe),x=new fy(X,he),C.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),ne=X.createFramebuffer(),q=X.createFramebuffer(),K=X.createFramebuffer(),ee=new L0(X),se=new Qx,me=new py(X,he,x,se,C,Xe,ee),Ne=new C0(F),Fe=new Dp(X),Ke=new x0(X,Fe),de=new I0(X,Fe,ee,Ke),fe=new D0(X,de,Fe,Ke,ee),j=new N0(X,C,me),tt=new v0(se),Ue=new jx(F,Ne,he,C,Ke,tt),Je=new _y(F,se),Ge=new ty,Oe=new ay(he),bt=new g0(F,Ne,x,fe,p,c),ft=new dy(F,fe,C),Re=new vy(X,ee,C,x),Be=new y0(X,he,ee),Te=new P0(X,he,ee),ee.programs=Ue.programs,F.capabilities=C,F.extensions=he,F.properties=se,F.renderLists=Ge,F.shadowMap=ft,F.state=x,F.info=ee}w!==qn&&(b=new F0(w,t.width,t.height,a,r,s));let at=new kh(F,X);this.xr=at,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let T=he.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=he.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(T){T!==void 0&&(ge=T,this.setSize(He,ue,!1))},this.getSize=function(T){return T.set(He,ue)},this.setSize=function(T,Q,pe=!0){if(at.isPresenting){xt("WebGLRenderer: Can't change size while VR device is presenting.");return}He=T,ue=Q,t.width=Math.floor(T*ge),t.height=Math.floor(Q*ge),pe===!0&&(t.style.width=T+"px",t.style.height=Q+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,T,Q)},this.getDrawingBufferSize=function(T){return T.set(He*ge,ue*ge).floor()},this.setDrawingBufferSize=function(T,Q,pe){He=T,ue=Q,ge=pe,t.width=Math.floor(T*pe),t.height=Math.floor(Q*pe),this.setViewport(0,0,T,Q)},this.setEffects=function(T){if(w===qn){wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let Q=0;Q<T.length;Q++)if(T[Q].isOutputPass===!0){xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(Se)},this.getViewport=function(T){return T.copy(Ce)},this.setViewport=function(T,Q,pe,ae){T.isVector4?Ce.set(T.x,T.y,T.z,T.w):Ce.set(T,Q,pe,ae),x.viewport(Se.copy(Ce).multiplyScalar(ge).round())},this.getScissor=function(T){return T.copy(ke)},this.setScissor=function(T,Q,pe,ae){T.isVector4?ke.set(T.x,T.y,T.z,T.w):ke.set(T,Q,pe,ae),x.scissor(et.copy(ke).multiplyScalar(ge).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(T){x.setScissorTest(lt=T)},this.setOpaqueSort=function(T){V=T},this.setTransparentSort=function(T){we=T},this.getClearColor=function(T){return T.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(T=!0,Q=!0,pe=!0){let ae=0;if(T){let re=!1;if(ve!==null){let We=ve.texture.format;re=g.has(We)}if(re){let We=ve.texture.type,$e=m.has(We),qe=bt.getClearColor(),it=bt.getClearAlpha(),ot=qe.r,St=qe.g,Et=qe.b;$e?(S[0]=ot,S[1]=St,S[2]=Et,S[3]=it,X.clearBufferuiv(X.COLOR,0,S)):(U[0]=ot,U[1]=St,U[2]=Et,U[3]=it,X.clearBufferiv(X.COLOR,0,U))}else ae|=X.COLOR_BUFFER_BIT}Q&&(ae|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),pe&&(ae|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&X.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),J=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Bt,!1),t.removeEventListener("webglcontextrestored",Ut,!1),t.removeEventListener("webglcontextcreationerror",Bn,!1),bt.dispose(),Ge.dispose(),Oe.dispose(),se.dispose(),Ne.dispose(),fe.dispose(),Ke.dispose(),Re.dispose(),Ue.dispose(),at.dispose(),at.removeEventListener("sessionstart",Rs),at.removeEventListener("sessionend",Qn),Pi.stop()};function Bt(T){T.preventDefault(),xh("WebGLRenderer: Context Lost."),G=!0}function Ut(){xh("WebGLRenderer: Context Restored."),G=!1;let T=ee.autoReset,Q=ft.enabled,pe=ft.autoUpdate,ae=ft.needsUpdate,re=ft.type;ut(),ee.autoReset=T,ft.enabled=Q,ft.autoUpdate=pe,ft.needsUpdate=ae,ft.type=re}function Bn(T){wt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function zn(T){let Q=T.target;Q.removeEventListener("dispose",zn),oc(Q)}function oc(T){Fo(T),se.remove(T)}function Fo(T){let Q=se.get(T).programs;Q!==void 0&&(Q.forEach(function(pe){Ue.releaseProgram(pe)}),T.isShaderMaterial&&Ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,Q,pe,ae,re,We){Q===null&&(Q=nt);let $e=re.isMesh&&re.matrixWorld.determinantAffine()<0,qe=Ps(T,Q,pe,ae,re);x.setMaterial(ae,$e);let it=pe.index,ot=1;if(ae.wireframe===!0){if(it=de.getWireframeAttribute(pe),it===void 0)return;ot=2}let St=pe.drawRange,Et=pe.attributes.position,rt=St.start*ot,kt=(St.start+St.count)*ot;We!==null&&(rt=Math.max(rt,We.start*ot),kt=Math.min(kt,(We.start+We.count)*ot)),it!==null?(rt=Math.max(rt,0),kt=Math.min(kt,it.count)):Et!=null&&(rt=Math.max(rt,0),kt=Math.min(kt,Et.count));let en=kt-rt;if(en<0||en===1/0)return;Ke.setup(re,ae,qe,pe,it);let $t,Gt=Be;if(it!==null&&($t=Fe.get(it),Gt=Te,Gt.setIndex($t)),re.isMesh)ae.wireframe===!0?(x.setLineWidth(ae.wireframeLinewidth*mt()),Gt.setMode(X.LINES)):Gt.setMode(X.TRIANGLES);else if(re.isLine){let zt=ae.linewidth;zt===void 0&&(zt=1),x.setLineWidth(zt*mt()),re.isLineSegments?Gt.setMode(X.LINES):re.isLineLoop?Gt.setMode(X.LINE_LOOP):Gt.setMode(X.LINE_STRIP)}else re.isPoints?Gt.setMode(X.POINTS):re.isSprite&&Gt.setMode(X.TRIANGLES);if(re.isBatchedMesh)if(he.get("WEBGL_multi_draw"))Gt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{let zt=re._multiDrawStarts,je=re._multiDrawCounts,wn=re._multiDrawCount,Nt=it?Fe.get(it).bytesPerElement:1,bn=se.get(ae).currentProgram.getUniforms();for(let Yn=0;Yn<wn;Yn++)bn.setValue(X,"_gl_DrawID",Yn),Gt.render(zt[Yn]/Nt,je[Yn])}else if(re.isInstancedMesh)Gt.renderInstances(rt,en,re.count);else if(pe.isInstancedBufferGeometry){let zt=pe._maxInstanceCount!==void 0?pe._maxInstanceCount:1/0,je=Math.min(pe.instanceCount,zt);Gt.renderInstances(rt,en,je)}else Gt.render(rt,en)};function ko(T,Q,pe,ae){J!==null&&T.isNodeMaterial&&J.setObject(ae,T),Ee===!0&&tt.setState(T,pe,!1),T.transparent===!0&&T.side===Jn&&T.forceSinglePass===!1?(T.side=Ln,T.needsUpdate=!0,ur(T,Q,ae),T.side=ir,T.needsUpdate=!0,ur(T,Q,ae),T.side=Jn):ur(T,Q,ae)}this.compile=function(T,Q,pe=null){pe===null&&(pe=T),J!==null&&J.renderStart(T,Q,pe),I=Oe.get(pe),I.init(Q),_.push(I),pe.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(I.pushLight(re),re.castShadow&&I.pushShadow(re))}),T!==pe&&T.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(I.pushLight(re),re.castShadow&&I.pushShadow(re))}),I.setupLights(),J!==null&&J.updateLights(I.state.lightsArray),Ie=this.localClippingEnabled,Ee=tt.init(this.clippingPlanes,Ie),Ee===!0&&tt.setGlobalState(this.clippingPlanes,Q),J!==null&&ft.render(I.state.shadowsArray,pe,Q);let ae=new Set;return T.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;let We=re.material;if(We)if(Array.isArray(We))for(let $e=0;$e<We.length;$e++){let qe=We[$e];ko(qe,pe,Q,re),ae.add(qe)}else ko(We,pe,Q,re),ae.add(We)}),I=_.pop(),J!==null&&J.renderEnd(),ae},this.compileAsync=function(T,Q,pe=null){let ae=this.compile(T,Q,pe);return new Promise(re=>{function We(){if(ae.forEach(function($e){let it=se.get($e).currentProgram;(it===void 0||it.isReady())&&ae.delete($e)}),ae.size===0){re(T);return}setTimeout(We,10)}he.get("KHR_parallel_shader_compile")!==null?We():setTimeout(We,10)})};let As=null;function Cs(T){As&&As(T)}function Rs(){Pi.stop()}function Qn(){Pi.start()}let Pi=new Vd;Pi.setAnimationLoop(Cs),typeof self<"u"&&Pi.setContext(self),this.setAnimationLoop=function(T){As=T,at.setAnimationLoop(T),T===null?Pi.stop():Pi.start()},at.addEventListener("sessionstart",Rs),at.addEventListener("sessionend",Qn),this.render=function(T,Q){if(Q!==void 0&&Q.isCamera!==!0){wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;J!==null&&J.renderStart(T,Q);let pe=at.enabled===!0&&at.isPresenting===!0,ae=b!==null&&(ve===null||pe)&&b.begin(F,ve);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(Q),Q=at.getCamera()),T.isScene===!0&&T.onBeforeRender(F,T,Q,ve),I=Oe.get(T,_.length),I.init(Q),I.state.textureUnits=me.getTextureUnits(),_.push(I),Pe.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),xe.setFromProjectionMatrix(Pe,ri,Q.reversedDepth),Ie=this.localClippingEnabled,Ee=tt.init(this.clippingPlanes,Ie),R=Ge.get(T,O.length),R.init(),O.push(R),at.enabled===!0&&at.isPresenting===!0){let $e=F.xr.getDepthSensingMesh();$e!==null&&an($e,Q,-1/0,F.sortObjects)}an(T,Q,0,F.sortObjects),R.finish(),J!==null&&J.updateLights(I.state.lightsArray),F.sortObjects===!0&&R.sort(V,we),ht=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,ht&&bt.addToRenderList(R,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&tt.beginShadows();let re=I.state.shadowsArray;if(ft.render(re,T,Q),Ee===!0&&tt.endShadows(),(ae&&b.hasRenderPass())===!1){let $e=R.opaque,qe=R.transmissive;if(I.setupLights(),Q.isArrayCamera){let it=Q.cameras;if(qe.length>0)for(let ot=0,St=it.length;ot<St;ot++){let Et=it[ot];Dr($e,qe,T,Et)}ht&&bt.render(T);for(let ot=0,St=it.length;ot<St;ot++){let Et=it[ot];pi(R,T,Et,Et.viewport)}}else qe.length>0&&Dr($e,qe,T,Q),ht&&bt.render(T),pi(R,T,Q)}ve!==null&&le===0&&(me.updateMultisampleRenderTarget(ve),me.updateRenderTargetMipmap(ve)),ae&&b.end(F),T.isScene===!0&&T.onAfterRender(F,T,Q),Ke.resetDefaultState(),ce=-1,_e=null,_.pop(),_.length>0?(I=_[_.length-1],me.setTextureUnits(I.state.textureUnits),Ee===!0&&tt.setGlobalState(F.clippingPlanes,I.state.camera)):I=null,O.pop(),O.length>0?R=O[O.length-1]:R=null,J!==null&&J.renderEnd()};function an(T,Q,pe,ae){if(T.visible===!1)return;if(T.layers.test(Q.layers)){if(T.isGroup)pe=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Q);else if(T.isLightProbeGrid)I.pushLightProbeGrid(T);else if(T.isLight)I.pushLight(T),T.castShadow&&I.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(xe)){ae&&ct.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Pe);let $e=fe.update(T),qe=T.material;qe.visible&&R.push(T,$e,qe,pe,ct.z,null,Q)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(xe))){let $e=fe.update(T),qe=T.material;if(ae&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ct.copy(T.boundingSphere.center)):($e.boundingSphere===null&&$e.computeBoundingSphere(),ct.copy($e.boundingSphere.center)),ct.applyMatrix4(T.matrixWorld).applyMatrix4(Pe)),Array.isArray(qe)){let it=$e.groups;for(let ot=0,St=it.length;ot<St;ot++){let Et=it[ot],rt=qe[Et.materialIndex];rt&&rt.visible&&R.push(T,$e,rt,pe,ct.z,Et,Q)}}else qe.visible&&R.push(T,$e,qe,pe,ct.z,null,Q)}}let We=T.children;for(let $e=0,qe=We.length;$e<qe;$e++)an(We[$e],Q,pe,ae)}function pi(T,Q,pe,ae){let{opaque:re,transmissive:We,transparent:$e}=T;I.setupLightsView(pe),Ee===!0&&tt.setGlobalState(F.clippingPlanes,pe),ae&&x.viewport(Se.copy(ae)),re.length>0&&Hi(re,Q,pe),We.length>0&&Hi(We,Q,pe),$e.length>0&&Hi($e,Q,pe),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Dr(T,Q,pe,ae){if((pe.isScene===!0?pe.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[ae.id]===void 0){let rt=he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[ae.id]=new kn(1,1,{generateMipmaps:!0,type:rt?ci:qn,minFilter:sr,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}let We=I.state.transmissionRenderTarget[ae.id],$e=ae.viewport||Se;We.setSize($e.z*F.transmissionResolutionScale,$e.w*F.transmissionResolutionScale);let qe=F.getRenderTarget(),it=F.getActiveCubeFace(),ot=F.getActiveMipmapLevel();F.setRenderTarget(We),F.getClearColor(oe),Ae=F.getClearAlpha(),Ae<1&&F.setClearColor(16777215,.5),F.clear(),ht&&bt.render(pe);let St=F.toneMapping;F.toneMapping=oi;let Et=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),I.setupLightsView(ae),Ee===!0&&tt.setGlobalState(F.clippingPlanes,ae),Hi(T,pe,ae),me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We),he.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let kt=0,en=Q.length;kt<en;kt++){let $t=Q[kt],{object:Gt,geometry:zt,material:je,group:wn}=$t;if(je.side===Jn&&Gt.layers.test(ae.layers)){let Nt=je.side;je.side=Ln,je.needsUpdate=!0,Ur(Gt,pe,ae,zt,je,wn),je.side=Nt,je.needsUpdate=!0,rt=!0}}rt===!0&&(me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We))}F.setRenderTarget(qe,it,ot),F.setClearColor(oe,Ae),Et!==void 0&&(ae.viewport=Et),F.toneMapping=St}function Hi(T,Q,pe){let ae=Q.isScene===!0?Q.overrideMaterial:null;for(let re=0,We=T.length;re<We;re++){let $e=T[re],{object:qe,geometry:it,group:ot}=$e,St=$e.material;St.allowOverride===!0&&ae!==null&&(St=ae),qe.layers.test(pe.layers)&&Ur(qe,Q,pe,it,St,ot)}}function Ur(T,Q,pe,ae,re,We){J!==null&&re.isNodeMaterial&&J.setObject(T,re),T.onBeforeRender(F,Q,pe,ae,re,We),T.modelViewMatrix.multiplyMatrices(pe.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),re.onBeforeRender(F,Q,pe,ae,T,We),re.transparent===!0&&re.side===Jn&&re.forceSinglePass===!1?(re.side=Ln,re.needsUpdate=!0,F.renderBufferDirect(pe,Q,ae,re,T,We),re.side=ir,re.needsUpdate=!0,F.renderBufferDirect(pe,Q,ae,re,T,We),re.side=Jn):F.renderBufferDirect(pe,Q,ae,re,T,We),T.onAfterRender(F,Q,pe,ae,re,We)}function ur(T,Q,pe){Q.isScene!==!0&&(Q=nt);let ae=se.get(T),re=I.state.lights,We=I.state.shadowsArray,$e=re.state.version,qe=Ue.getParameters(T,re.state,We,Q,pe,I.state.lightProbeGridArray),it=Ue.getProgramCacheKey(qe),ot=ae.programs;ae.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?Q.environment:null,ae.fog=Q.fog;let St=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ae.envMap=Ne.get(T.envMap||ae.environment,St),ae.envMapRotation=ae.environment!==null&&T.envMap===null?Q.environmentRotation:T.envMapRotation,ot===void 0&&(T.addEventListener("dispose",zn),ot=new Map,ae.programs=ot);let Et=ot.get(it);if(Et!==void 0){if(ae.currentProgram===Et&&ae.lightsStateVersion===$e)return dr(T,qe),Et}else qe.uniforms=Ue.getUniforms(T),J!==null&&T.isNodeMaterial&&J.build(T,pe,qe),T.onBeforeCompile(qe,F),Et=Ue.acquireProgram(qe,it),ot.set(it,Et),ae.uniforms=qe.uniforms;let rt=ae.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(rt.clippingPlanes=tt.uniform),dr(T,qe),ae.needsLights=lc(T),ae.lightsStateVersion=$e,ae.needsLights&&(rt.ambientLightColor.value=re.state.ambient,rt.lightProbe.value=re.state.probe,rt.sunLights.value=re.state.sun,rt.sunLightShadows.value=re.state.sunShadow,rt.directionalLights.value=re.state.directional,rt.directionalLightShadows.value=re.state.directionalShadow,rt.spotLights.value=re.state.spot,rt.spotLightShadows.value=re.state.spotShadow,rt.rectAreaLights.value=re.state.rectArea,rt.ltc_1.value=re.state.rectAreaLTC1,rt.ltc_2.value=re.state.rectAreaLTC2,rt.pointLights.value=re.state.point,rt.pointLightShadows.value=re.state.pointShadow,rt.hemisphereLights.value=re.state.hemi,rt.sunShadowMatrix.value=re.state.sunShadowMatrix,rt.sunShadowCascade.value=re.state.sunShadowCascade,rt.directionalShadowMatrix.value=re.state.directionalShadowMatrix,rt.spotLightMatrix.value=re.state.spotLightMatrix,rt.spotLightMap.value=re.state.spotLightMap,rt.pointShadowMatrix.value=re.state.pointShadowMatrix),ae.lightProbeGrid=I.state.lightProbeGridArray.length>0,ae.currentProgram=Et,ae.uniformsList=null,Et}function Is(T){if(T.uniformsList===null){let Q=T.currentProgram.getUniforms();T.uniformsList=gs.seqWithValue(Q.seq,T.uniforms)}return T.uniformsList}function dr(T,Q){let pe=se.get(T);pe.outputColorSpace=Q.outputColorSpace,pe.batching=Q.batching,pe.batchingColor=Q.batchingColor,pe.instancing=Q.instancing,pe.instancingColor=Q.instancingColor,pe.instancingMorph=Q.instancingMorph,pe.skinning=Q.skinning,pe.morphTargets=Q.morphTargets,pe.morphNormals=Q.morphNormals,pe.morphColors=Q.morphColors,pe.morphTargetsCount=Q.morphTargetsCount,pe.numClippingPlanes=Q.numClippingPlanes,pe.numIntersection=Q.numClipIntersection,pe.vertexAlphas=Q.vertexAlphas,pe.vertexTangents=Q.vertexTangents,pe.toneMapping=Q.toneMapping}function ac(T,Q){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(Q.matrixWorld);for(let pe=0,ae=T.length;pe<ae;pe++){let re=T[pe];if(re.texture!==null&&re.boundingBox.containsPoint(v))return re}return null}function Ps(T,Q,pe,ae,re){Q.isScene!==!0&&(Q=nt),me.resetTextureUnits();let We=Q.fog,$e=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial?Q.environment:null,qe=ve===null?F.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Dt.workingColorSpace,it=ae.isMeshStandardMaterial||ae.isMeshLambertMaterial&&!ae.envMap||ae.isMeshPhongMaterial&&!ae.envMap,ot=Ne.get(ae.envMap||$e,it),St=ae.vertexColors===!0&&!!pe.attributes.color&&pe.attributes.color.itemSize===4,Et=!!pe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),rt=!!pe.morphAttributes.position,kt=!!pe.morphAttributes.normal,en=!!pe.morphAttributes.color,$t=oi;ae.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&($t=F.toneMapping);let Gt=pe.morphAttributes.position||pe.morphAttributes.normal||pe.morphAttributes.color,zt=Gt!==void 0?Gt.length:0,je=se.get(ae),wn=I.state.lights;if(Ee===!0&&(Ie===!0||T!==_e)){let M=T===_e&&ae.id===ce;tt.setState(ae,T,M)}let Nt=!1;ae.version===je.__version?(je.needsLights&&je.lightsStateVersion!==wn.state.version||je.outputColorSpace!==qe||re.isBatchedMesh&&je.batching===!1||!re.isBatchedMesh&&je.batching===!0||re.isBatchedMesh&&je.batchingColor===!0&&re._colorsTexture===null||re.isBatchedMesh&&je.batchingColor===!1&&re._colorsTexture!==null||re.isInstancedMesh&&je.instancing===!1||!re.isInstancedMesh&&je.instancing===!0||re.isSkinnedMesh&&je.skinning===!1||!re.isSkinnedMesh&&je.skinning===!0||re.isInstancedMesh&&je.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&je.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&je.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&je.instancingMorph===!1&&re.morphTexture!==null||je.envMap!==ot||ae.fog===!0&&je.fog!==We||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==tt.numPlanes||je.numIntersection!==tt.numIntersection)||je.vertexAlphas!==St||je.vertexTangents!==Et||je.morphTargets!==rt||je.morphNormals!==kt||je.morphColors!==en||je.toneMapping!==$t||je.morphTargetsCount!==zt||!!je.lightProbeGrid!=I.state.lightProbeGridArray.length>0)&&(Nt=!0):(Nt=!0,je.__version=ae.version);let bn=je.currentProgram;Nt===!0&&(bn=ur(ae,Q,re),J&&ae.isNodeMaterial&&J.onUpdateProgram(ae,bn,je));let Yn=!1,mi=!1,Wi=!1,Ht=bn.getUniforms(),rn=je.uniforms;if(x.useProgram(bn.program)&&(Yn=!0,mi=!0,Wi=!0),ae.id!==ce&&(ce=ae.id,mi=!0),je.needsLights){let M=ac(I.state.lightProbeGridArray,re);je.lightProbeGrid!==M&&(je.lightProbeGrid=M,mi=!0)}if(Yn||_e!==T){x.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ht.setValue(X,"projectionMatrix",T.projectionMatrix),Ht.setValue(X,"viewMatrix",T.matrixWorldInverse);let N=Ht.map.cameraPosition;N!==void 0&&N.setValue(X,ze.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&Ht.setValue(X,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Ht.setValue(X,"isOrthographic",T.isOrthographicCamera===!0),_e!==T&&(_e=T,mi=!0,Wi=!0)}if(je.needsLights&&(wn.state.sunShadowMap.length>0&&Ht.setValue(X,"sunShadowMap",wn.state.sunShadowMap,me),wn.state.directionalShadowMap.length>0&&Ht.setValue(X,"directionalShadowMap",wn.state.directionalShadowMap,me),wn.state.spotShadowMap.length>0&&Ht.setValue(X,"spotShadowMap",wn.state.spotShadowMap,me),wn.state.pointShadowMap.length>0&&Ht.setValue(X,"pointShadowMap",wn.state.pointShadowMap,me)),re.isSkinnedMesh){Ht.setOptional(X,re,"bindMatrix"),Ht.setOptional(X,re,"bindMatrixInverse");let M=re.skeleton;M&&(M.boneTexture===null&&M.computeBoneTexture(),Ht.setValue(X,"boneTexture",M.boneTexture,me))}re.isBatchedMesh&&(Ht.setOptional(X,re,"batchingTexture"),Ht.setValue(X,"batchingTexture",re._matricesTexture,me),Ht.setOptional(X,re,"batchingIdTexture"),Ht.setValue(X,"batchingIdTexture",re._indirectTexture,me),Ht.setOptional(X,re,"batchingColorTexture"),re._colorsTexture!==null&&Ht.setValue(X,"batchingColorTexture",re._colorsTexture,me));let gi=pe.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&j.update(re,pe,bn),(mi||je.receiveShadow!==re.receiveShadow)&&(je.receiveShadow=re.receiveShadow,Ht.setValue(X,"receiveShadow",re.receiveShadow)),(ae.isMeshStandardMaterial||ae.isMeshLambertMaterial||ae.isMeshPhongMaterial)&&ae.envMap===null&&Q.environment!==null&&(rn.envMapIntensity.value=Q.environmentIntensity),rn.dfgLUT!==void 0&&(rn.dfgLUT.value=by()),mi){if(Ht.setValue(X,"toneMappingExposure",F.toneMappingExposure),je.needsLights&&Oo(rn,Wi),We&&ae.fog===!0&&Je.refreshFogUniforms(rn,We),Je.refreshMaterialUniforms(rn,ae,ge,ue,I.state.transmissionRenderTarget[T.id]),je.needsLights&&je.lightProbeGrid){let M=je.lightProbeGrid;rn.probesSH.value=M.texture,rn.probesMin.value.copy(M.boundingBox.min),rn.probesMax.value.copy(M.boundingBox.max),rn.probesResolution.value.copy(M.resolution)}gs.upload(X,Is(je),rn,me)}if(ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(gs.upload(X,Is(je),rn,me),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Ht.setValue(X,"center",re.center),Ht.setValue(X,"modelViewMatrix",re.modelViewMatrix),Ht.setValue(X,"normalMatrix",re.normalMatrix),Ht.setValue(X,"modelMatrix",re.matrixWorld),ae.uniformsGroups!==void 0){let M=ae.uniformsGroups;for(let N=0,P=M.length;N<P;N++){let L=M[N];Re.update(L,bn),Re.bind(L,bn)}}return bn}function Oo(T,Q){T.ambientLightColor.needsUpdate=Q,T.lightProbe.needsUpdate=Q,T.sunLights.needsUpdate=Q,T.sunLightShadows.needsUpdate=Q,T.directionalLights.needsUpdate=Q,T.directionalLightShadows.needsUpdate=Q,T.pointLights.needsUpdate=Q,T.pointLightShadows.needsUpdate=Q,T.spotLights.needsUpdate=Q,T.spotLightShadows.needsUpdate=Q,T.rectAreaLights.needsUpdate=Q,T.hemisphereLights.needsUpdate=Q}function lc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return ve},this.setRenderTargetTextures=function(T,Q,pe){let ae=se.get(T);ae.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),se.get(T.texture).__webglTexture=Q,se.get(T.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:pe,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Q){let pe=se.get(T);pe.__webglFramebuffer=Q,pe.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(T,Q=0,pe=0){ve=T,ie=Q,le=pe;let ae=null,re=!1,We=!1;if(T){let qe=se.get(T);if(qe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(X.FRAMEBUFFER,qe.__webglFramebuffer),Se.copy(T.viewport),et.copy(T.scissor),ye=T.scissorTest,x.viewport(Se),x.scissor(et),x.setScissorTest(ye),ce=-1;return}else if(qe.__webglFramebuffer===void 0)me.setupRenderTarget(T);else if(qe.__hasExternalTextures)me.rebindTextures(T,se.get(T.texture).__webglTexture,se.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let St=T.depthTexture;if(qe.__boundDepthTexture!==St){if(St!==null&&se.has(St)&&(T.width!==St.image.width||T.height!==St.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(T)}}let it=T.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(We=!0);let ot=se.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ot[Q])?ae=ot[Q][pe]:ae=ot[Q],re=!0):T.samples>0&&me.useMultisampledRTT(T)===!1?ae=se.get(T).__webglMultisampledFramebuffer:Array.isArray(ot)?ae=ot[pe]:ae=ot,Se.copy(T.viewport),et.copy(T.scissor),ye=T.scissorTest}else Se.copy(Ce).multiplyScalar(ge).floor(),et.copy(ke).multiplyScalar(ge).floor(),ye=lt;if(pe!==0&&(ae=ne),x.bindFramebuffer(X.FRAMEBUFFER,ae)&&x.drawBuffers(T,ae),x.viewport(Se),x.scissor(et),x.setScissorTest(ye),re){let qe=se.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+Q,qe.__webglTexture,pe)}else if(We){let qe=Q;for(let it=0;it<T.textures.length;it++){let ot=se.get(T.textures[it]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+it,ot.__webglTexture,pe,qe)}}else if(T!==null&&pe!==0){let qe=se.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,qe.__webglTexture,pe)}ce=-1};function Ls(T){let Q=se.get(T);return(Q.__readFormat!==T.format||Q.__readType!==T.type)&&(Q.__readFormat=T.format,Q.__readType=T.type,Q.__formatReadable=C.textureFormatReadable(T.format),Q.__typeReadable=C.textureTypeReadable(T.type)),Q}this.readRenderTargetPixels=function(T,Q,pe,ae,re,We,$e,qe=0){if(!(T&&T.isWebGLRenderTarget)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let it=se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&$e!==void 0&&(it=it[$e]),it){x.bindFramebuffer(X.FRAMEBUFFER,it);try{let ot=T.textures[qe],St=ot.format,Et=ot.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+qe);let rt=Ls(ot);if(rt.__formatReadable===!1){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(rt.__typeReadable===!1){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=T.width-ae&&pe>=0&&pe<=T.height-re&&X.readPixels(Q,pe,ae,re,Xe.convert(St),Xe.convert(Et),We)}finally{let ot=ve!==null?se.get(ve).__webglFramebuffer:null;x.bindFramebuffer(X.FRAMEBUFFER,ot)}}},this.readRenderTargetPixelsAsync=async function(T,Q,pe,ae,re,We,$e,qe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let it=se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&$e!==void 0&&(it=it[$e]),it)if(Q>=0&&Q<=T.width-ae&&pe>=0&&pe<=T.height-re){x.bindFramebuffer(X.FRAMEBUFFER,it);let ot=T.textures[qe],St=ot.format,Et=ot.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+qe);let rt=Ls(ot);if(rt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(rt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let kt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,kt),X.bufferData(X.PIXEL_PACK_BUFFER,We.byteLength,X.STREAM_READ),X.readPixels(Q,pe,ae,re,Xe.convert(St),Xe.convert(Et),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);let en=ve!==null?se.get(ve).__webglFramebuffer:null;x.bindFramebuffer(X.FRAMEBUFFER,en);let $t=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await ud(X,$t,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,kt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,We),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(kt),X.deleteSync($t),We}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Q=null,pe=0){let ae=Math.pow(2,-pe),re=Math.floor(T.image.width*ae),We=Math.floor(T.image.height*ae),$e=Q!==null?Q.x:0,qe=Q!==null?Q.y:0;me.setTexture2D(T,0),X.copyTexSubImage2D(X.TEXTURE_2D,pe,0,0,$e,qe,re,We),x.unbindTexture()},this.copyTextureToTexture=function(T,Q,pe=null,ae=null,re=0,We=0){let $e,qe,it,ot,St,Et,rt,kt,en,$t=T.isCompressedTexture?T.mipmaps[We]:T.image;if(pe!==null)$e=pe.max.x-pe.min.x,qe=pe.max.y-pe.min.y,it=pe.isBox3?pe.max.z-pe.min.z:1,ot=pe.min.x,St=pe.min.y,Et=pe.isBox3?pe.min.z:0;else{let rn=Math.pow(2,-re);$e=Math.floor($t.width*rn),qe=Math.floor($t.height*rn),T.isDataArrayTexture?it=$t.depth:T.isData3DTexture?it=Math.floor($t.depth*rn):it=1,ot=0,St=0,Et=0}ae!==null?(rt=ae.x,kt=ae.y,en=ae.z):(rt=0,kt=0,en=0);let Gt=Xe.convert(Q.format),zt=Xe.convert(Q.type),je;Q.isData3DTexture?(me.setTexture3D(Q,0),je=X.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(me.setTexture2DArray(Q,0),je=X.TEXTURE_2D_ARRAY):(me.setTexture2D(Q,0),je=X.TEXTURE_2D),x.activeTexture(X.TEXTURE0),x.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,Q.flipY),x.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),x.pixelStorei(X.UNPACK_ALIGNMENT,Q.unpackAlignment);let wn=x.getParameter(X.UNPACK_ROW_LENGTH),Nt=x.getParameter(X.UNPACK_IMAGE_HEIGHT),bn=x.getParameter(X.UNPACK_SKIP_PIXELS),Yn=x.getParameter(X.UNPACK_SKIP_ROWS),mi=x.getParameter(X.UNPACK_SKIP_IMAGES);x.pixelStorei(X.UNPACK_ROW_LENGTH,$t.width),x.pixelStorei(X.UNPACK_IMAGE_HEIGHT,$t.height),x.pixelStorei(X.UNPACK_SKIP_PIXELS,ot),x.pixelStorei(X.UNPACK_SKIP_ROWS,St),x.pixelStorei(X.UNPACK_SKIP_IMAGES,Et);let Wi=T.isDataArrayTexture||T.isData3DTexture,Ht=Q.isDataArrayTexture||Q.isData3DTexture;if(T.isDepthTexture){let rn=se.get(T),gi=se.get(Q),M=se.get(rn.__renderTarget),N=se.get(gi.__renderTarget);x.bindFramebuffer(X.READ_FRAMEBUFFER,M.__webglFramebuffer),x.bindFramebuffer(X.DRAW_FRAMEBUFFER,N.__webglFramebuffer);for(let P=0;P<it;P++)Wi&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,se.get(T).__webglTexture,re,Et+P),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,se.get(Q).__webglTexture,We,en+P)),X.blitFramebuffer(ot,St,$e,qe,rt,kt,$e,qe,X.DEPTH_BUFFER_BIT,X.NEAREST);x.bindFramebuffer(X.READ_FRAMEBUFFER,null),x.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(re!==0||T.isRenderTargetTexture||se.has(T)){let rn=se.get(T),gi=se.get(Q);x.bindFramebuffer(X.READ_FRAMEBUFFER,q),x.bindFramebuffer(X.DRAW_FRAMEBUFFER,K);for(let M=0;M<it;M++)Wi?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,rn.__webglTexture,re,Et+M):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,rn.__webglTexture,re),Ht?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,gi.__webglTexture,We,en+M):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,gi.__webglTexture,We),re!==0?X.blitFramebuffer(ot,St,$e,qe,rt,kt,$e,qe,X.COLOR_BUFFER_BIT,X.NEAREST):Ht?X.copyTexSubImage3D(je,We,rt,kt,en+M,ot,St,$e,qe):X.copyTexSubImage2D(je,We,rt,kt,ot,St,$e,qe);x.bindFramebuffer(X.READ_FRAMEBUFFER,null),x.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Ht?T.isDataTexture||T.isData3DTexture?X.texSubImage3D(je,We,rt,kt,en,$e,qe,it,Gt,zt,$t.data):Q.isCompressedArrayTexture?X.compressedTexSubImage3D(je,We,rt,kt,en,$e,qe,it,Gt,$t.data):X.texSubImage3D(je,We,rt,kt,en,$e,qe,it,Gt,zt,$t):T.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,We,rt,kt,$e,qe,Gt,zt,$t.data):T.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,We,rt,kt,$t.width,$t.height,Gt,$t.data):X.texSubImage2D(X.TEXTURE_2D,We,rt,kt,$e,qe,Gt,zt,$t);x.pixelStorei(X.UNPACK_ROW_LENGTH,wn),x.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Nt),x.pixelStorei(X.UNPACK_SKIP_PIXELS,bn),x.pixelStorei(X.UNPACK_SKIP_ROWS,Yn),x.pixelStorei(X.UNPACK_SKIP_IMAGES,mi),We===0&&Q.generateMipmaps&&X.generateMipmap(je),x.unbindTexture()},this.initRenderTarget=function(T){se.get(T).__webglFramebuffer===void 0&&me.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?me.setTextureCube(T,0):T.isData3DTexture?me.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?me.setTexture2DArray(T,0):me.setTexture2D(T,0),x.unbindTexture()},this.resetState=function(){ie=0,le=0,ve=null,x.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}};function Zd(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,c=new Kt,l=0;for(let h=0;h<n.length;++h){let d=n[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0,d=[];for(let u=0;u<n.length;++u){let f=n[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=n[u].attributes.position.count}c.setIndex(d)}for(let h in s){let d=Yd(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let w=0;w<o[h].length;++w)f.push(o[h][w][u]);let p=Yd(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function Yd(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){let h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let o=new e(s),a=new An(o,t,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let d=c/t;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<t;p++){let w=h.getComponent(u,p);a.setComponent(u+d,p,w)}}else o.set(h.array,c);c+=h.count*t}return r!==void 0&&(a.gpuType=r),a}var Sy={bg:"#0b0b0c",ink:"#ece8de",gold:"#e0a944",red:"#ec6a84",lab:"#a3a096"},pt=Sy,nn=1180,mn=900,Ey=4,Jd=30,Po=n=>parseInt(n.slice(1),16),Kl=Po(pt.bg),st=Po(pt.ink),hn=Po(pt.gold),Ty=Po(pt.red),Nn=Po(pt.lab),Ro={done:pt.ink,work:pt.gold,fail:pt.red,wait:pt.lab},lr={done:st,work:hn,fail:Ty,wait:Nn},Oh={fail:pt.red,work:pt.gold},A={end:1/0,n:0,ms:12},Io=["planet","region","site"],Ay={planet:"board",region:"pipe",site:"task"},Cy=`
.wlw{position:relative;width:100%;height:100%;overflow:hidden;background:${pt.bg};user-select:none}
.wlw-stage{position:absolute;left:0;top:0;width:${nn}px;height:${mn}px;transform-origin:0 0;color:${pt.ink};font:12px/1.45 "Cascadia Mono","Cascadia Code",Consolas,monospace;-webkit-font-smoothing:antialiased}
.wlw-stage canvas{display:block;width:${nn}px!important;height:${mn}px!important}
.wlw .vig{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 200px ${pt.bg}bf;background:linear-gradient(${pt.bg}cc 0,transparent 11%,transparent 91%,${pt.bg}d9 100%)}
.wlw .layer{position:absolute;inset:0;pointer-events:none;visibility:hidden}
.wlw .layer.on{visibility:visible}
.wlw svg.lead{position:absolute;inset:0;overflow:visible}
.wlw .tg{position:absolute;white-space:nowrap;pointer-events:auto;cursor:pointer;outline:none}
.wlw .layer.dim .tg,.wlw .layer.dim .back{pointer-events:none}
.wlw .tg:hover .n,.wlw .tg:focus-visible .n{text-decoration:underline;text-underline-offset:3px}
.wlw .tg .n{font-size:12.5px;color:${pt.ink};text-shadow:0 0 4px ${pt.bg},0 0 10px ${pt.bg}}
.wlw .tg.r{text-align:right}
.wlw .chip{display:inline-flex;align-items:center;gap:7px;height:21px;padding:0 8px;margin-top:3px;border:1px solid ${pt.ink}52;font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;background:${pt.bg}e6}
.wlw .chip i{width:7px;height:7px;background:${pt.lab}}
.wlw .chip.work{border-color:${pt.gold};color:${pt.gold}}.wlw .chip.work i{background:${pt.gold}}
.wlw .chip.fail{border-color:${pt.red};color:${pt.red}}.wlw .chip.fail i{background:${pt.red}}
.wlw .chip.wait{color:${pt.lab}}.wlw .chip.wait i{background:none;border:1px dashed ${pt.lab}}
.wlw .tel{position:absolute;top:16px;font-size:12px;line-height:1.75;white-space:nowrap}
.wlw .tel.l{left:20px}.wlw .tel.r{right:20px;text-align:right}
.wlw .tel .k{color:${pt.lab};text-transform:uppercase;letter-spacing:.08em}
.wlw .tel b{font-weight:600;margin-left:8px}
.wlw .tel.l .k::before{content:"▸  ";color:${pt.lab}99}
.wlw .tel.r b::after{content:"  ◂";color:${pt.lab}99;font-weight:400}
.wlw .tab{position:absolute;top:18px;height:30px;display:flex;align-items:center;gap:10px;padding:0 30px 0 12px;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.wlw .tab svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.wlw .tab span{position:relative}
.wlw .tab .back{color:${pt.gold};border-right:1px solid ${pt.gold}73;padding-right:10px;text-transform:none;letter-spacing:.02em;pointer-events:auto;cursor:pointer}
.wlw .tab .back:hover{text-decoration:underline;text-underline-offset:3px}
.wlw .ticks{position:absolute;top:54px;display:flex;align-items:center;gap:8px;font-size:11.5px;white-space:nowrap}
.wlw .ticks .n{border:1px solid ${pt.ink}52;padding:0 5px;line-height:18px;background:${pt.bg}cc}
.wlw .ticks .bar{display:flex;gap:2px}.wlw .ticks .bar i{width:3px;height:12px;background:${pt.lab}}
.wlw .ticks .bar i.work{background:${pt.gold}}.wlw .ticks .bar i.fail{background:${pt.red}}
.wlw .legend{position:absolute;right:20px;bottom:14px;display:flex;gap:16px;font-size:11.5px;color:${pt.lab};text-transform:uppercase;letter-spacing:.08em}
.wlw .legend span{display:flex;align-items:center;gap:7px}.wlw .legend i{width:9px;height:9px;background:${pt.ink}}
.wlw .legend i.work{background:${pt.gold}}.wlw .legend i.fail{background:${pt.red}}.wlw .legend i.wait{background:none;border:1px dashed ${pt.ink}}
.wlw .hint{position:absolute;left:20px;bottom:14px;font-size:11.5px;color:${pt.lab}}
.wlw .beacon{position:absolute;width:0;height:0}
.wlw .beacon::before,.wlw .beacon::after{content:"";position:absolute;border:1.5px solid ${pt.red};border-radius:50%;left:-7px;top:-7px;width:14px;height:14px}
.wlw .beacon::after{left:-14px;top:-14px;width:28px;height:28px;opacity:.4}
.wlw .beacon i{position:absolute;left:-3px;top:-3px;width:6px;height:6px;border-radius:50%;background:${pt.red}}
.wlw .wlw-note{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);padding:4px 10px;font:11.5px/1.45 "Cascadia Mono","Cascadia Code",Consolas,monospace;letter-spacing:.12em;text-transform:uppercase;color:${pt.lab};background:${pt.bg}cc;border:1px solid ${pt.ink}52;pointer-events:none}
.wlw .wlw-note:empty{display:none}
`,Zt=(n,e,t)=>{let i=document.createElement(n);return e&&(i.className=e),t!=null&&(i.textContent=String(t)),i},Ry="http://www.w3.org/2000/svg",Ti=(n,e)=>{let t=document.createElementNS(Ry,n);for(let[i,r]of Object.entries(e))t.setAttribute(i,String(r));return t},Iy=(n,e,t)=>{let i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)};function Bh(n,e){let t=Zt("div",e?`tg ${e}`:"tg");n.id&&(t.dataset.id=n.id),t.tabIndex=0,t.setAttribute("role","button");let i=Zt("span",n.st==="done"?"chip":`chip ${n.st}`);return i.append(Zt("i"),String(n.chip)),t.append(Zt("div","n",n.name),i),t}function Kd(n){let e=Zt("div","beacon");return e.style.left=`${n[0]}px`,e.style.top=`${n[1]}px`,e.append(Zt("i")),e}function zh(n){let e=t=>t&&[t.id,t.st,t.label,t.chip];return JSON.stringify([n.region?.slug,n.boards.map(t=>[t.slug,t.st,t.chip,t.labeled,t.lat,t.lon]),(n.region?.pipelines||[]).map(t=>[t.key,t.place,t.st,t.label,t.chip,t.units.map(e),e(t.gate)])])}function Py(){if(typeof WebGL2RenderingContext>"u")return"no WebGL2";let n=document.createElement("canvas").getContext("webgl2");if(!n)return"no WebGL2";let e=n.getExtension("WEBGL_debug_renderer_info"),t=e?String(n.getParameter(e.UNMASKED_RENDERER_WEBGL)):"";return n.getExtension("WEBGL_lose_context")?.loseContext(),/swiftshader|llvmpipe|softpipe|software|basic render/i.test(t)?`software renderer: ${t}`:null}function Ly(n){n.traverse(e=>{e.geometry?.dispose?.();let t=e.material;for(let i of Array.isArray(t)?t:t?[t]:[])i.uniforms?.map?.value?.dispose?.(),i.dispose()})}function Ny(n,e,{tab:t,back:i,ticks:r,tl:s,tr:o,hint:a,tabCol:c}){n.textContent="";let l=(g,m)=>{let S=Zt("div",`tel ${g}`);for(let[U,v]of m){let R=Zt("div");R.append(Zt("span","k",U),Zt("b",null,v)),S.append(R)}return S},h=Zt("div","tab");if(i){let g=Zt("span","back",`◂ ${i}`);g.dataset.nav="up",g.setAttribute("role","button"),g.tabIndex=0,h.append(g)}h.append(Zt("span",null,`★ ${t}`));let d=Zt("div","ticks"),u=Zt("span","bar");for(let g of r.list)u.append(Zt("i",g==="done"?null:g));d.append(Zt("span","n",r.label),u);let f=Zt("div","legend");for(let g of["work","done","fail","wait"]){let m=Zt("span");m.append(Zt("i",g==="done"?null:g),e.legend[g]),f.append(m)}n.append(l("l",s),l("r",o),h,d,f,Zt("div","hint",a));let p=h.offsetWidth,w=Ti("svg",{viewBox:`0 0 ${p} 30`,preserveAspectRatio:"none"});w.append(Ti("path",{d:`M.5 .5H${p-16}L${p-.5} 15L${p-16} 29.5H.5Z`,fill:`${pt.bg}e6`,stroke:c})),h.prepend(w),h.style.left=`${nn/2-p/2}px`,d.style.left=`${nn/2-p/2}px`}function*Dy(n,e,t){if(A.end===1/0||!n.compileAsync)return;let i=!1;for(n.compileAsync(e,t).then(()=>{i=!0},()=>{i=!0});!i;)yield"compile"}function*Uy(n,e){let t=[];for(let i=0;i<n.length;i++)t.push(yield*e(n[i],i,n));return t}function*Fy(n,e){for(let t=0;t<n.length;t++)yield*e(n[t],t,n)}function ky(n,e){let t=n.words,i=n.layers(),r=(M,N)=>Ny(M,t,N);var s=n.renderer,o=new vr,a=null,c=null,l=0,h=0,d=17,u=()=>(d=d*16807%2147483647)/2147483647,f=(M,N)=>M+(N-M)*u(),p=(M,N,P)=>{let L=Math.min(1,Math.max(0,(P-M)/(N-M)));return L*L*(3-2*L)},w=(M,N,P)=>M+(N-M)*P;function g(M,N,P){let L=Math.imul(M|0,374761393)+Math.imul(N|0,668265263)+Math.imul(P|0,1442695041)|0;return L=Math.imul(L^L>>>13,1274126177),L^=L>>>16,(L>>>0)/4294967296}function m(M,N,P=0){let L=Math.floor(M),E=Math.floor(N),k=M-L,H=N-E,B=g(L,E,P),D=g(L+1,E,P),Z=g(L,E+1,P),Y=g(L+1,E+1,P),W=k*k*(3-2*k),z=H*H*(3-2*H);return B+(D-B)*W+(Z-B)*z+(B-D-Z+Y)*W*z}function S(M,N,P=4,L=0){let E=0,k=.5,H=1,B=0;for(let D=0;D<P;D++)E+=k*m(M*H,N*H,L+D*7),B+=k,k*=.5,H*=2.03;return E/B}function U(M,N,P=5,L=9){let E=0,k=.5,H=1,B=0;for(let D=0;D<P;D++)E+=k*(1-Math.abs(2*m(M*H,N*H,L+D*7)-1)),B+=k,k*=.5,H*=2.1;return E/B}function v(M,N,P,L,E,k){let H=E-P,B=k-L,D=Math.max(0,Math.min(1,((M-P)*H+(N-L)*B)/(H*H+B*B||1)));return Math.hypot(M-P-D*H,N-L-D*B)}function R(M,N,P){let L=1e9;for(let E=0;E<P.length-1;E++){let k=P[E],H=P[E+1];M<Math.min(k[0],H[0])-L||M>Math.max(k[0],H[0])+L||N<Math.min(k[1],H[1])-L||N>Math.max(k[1],H[1])+L||(L=Math.min(L,v(M,N,k[0],k[1],H[0],H[1])))}return L}function I(M,N=8){let P=[];for(let L=0;L<M.length-1;L++){let E=M[Math.max(0,L-1)],k=M[L],H=M[L+1],B=M[Math.min(M.length-1,L+2)];for(let D=0;D<N;D++){let Z=D/N,Y=Z*Z,W=Y*Z;P.push([0,1].map(z=>.5*(2*k[z]+(-E[z]+H[z])*Z+(2*E[z]-5*k[z]+4*H[z]-B[z])*Y+(-E[z]+3*k[z]-3*H[z]+B[z])*W)))}}return P.push(M.at(-1)),P}var O=new wr({color:Kl,side:Jn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),_=new Map,b=new Map,F=[];function G(M=st,N=.85){N=Math.round(N*100)/100;let P=M+"|"+N+"|"+l+"|"+h;return _.has(P)||_.set(P,{color:M,op:N,feat:l,zone:h,a:[]}),_.get(P).a}function J(M,N,P){let L=M+"|"+N+"|"+P+"|"+l+"|"+h;return b.has(L)||b.set(L,{color:M,size:N,op:P,feat:l,zone:h,a:[]}),b.get(L).a}function ne(M,N,P,L=0,E=0,k=0){return new Yt().compose(new $(M,N,P),new Pn().setFromEuler(new wi(E,L,k)),new $(1,1,1))}var q=(M,N)=>M.clone().multiply(N),K=(M,N)=>{let P=new $(N[0],N[1],N[2]);return M&&P.applyMatrix4(M),[P.x,P.y,P.z]};function ie(M,N,P,L=st,E=.85){G(L,E).push(...K(M,N),...K(M,P))}function le(M,N,P=st,L=.85){let E=G(P,L);for(let k=0;k<N.length-1;k++)E.push(...K(M,N[k]),...K(M,N[k+1]))}var ve=new Map,ce={ConeGeometry:["radius","height"],IcosahedronGeometry:["radius"],SphereGeometry:["radius"],CylinderGeometry:["radiusTop","radiusBottom","height"],OctahedronGeometry:["radius"],DodecahedronGeometry:["radius"]};function _e(M,N){let P=M.parameters;if(!P)return[null,[1,1,1]];let L={...P},E=[1,1,1];if(M.type==="BoxGeometry")E=[P.width,P.height,P.depth],L.width=L.height=L.depth=1;else if(ce[M.type]){let D=ce[M.type].map(Z=>P[Z]).find(Z=>Z>0)||1;E=[D,D,D];for(let Z of ce[M.type])L[Z]=+(P[Z]/D).toFixed(9)}let k=N.sc?Array.isArray(N.sc)?N.sc:[N.sc,N.sc,N.sc]:null,H=M.type==="BoxGeometry";k&&(E=E.map((D,Z)=>D*k[Z]));let B=k&&!H&&!(k[0]===k[1]&&k[1]===k[2])?k.map(D=>+(D/k[0]).toFixed(9)).join(","):"";return[M.type+JSON.stringify(L)+"|"+B+"|"+(N.thr??25),E]}function Se(M){let N=new Map;return(P,L)=>{let E=N.get(P);E||N.set(P,E=new Map);let k=E.get(L);return k===void 0&&E.set(L,k=M(P,L)),k}}var et=new WeakMap;function ye(M,N,P,L){let E=et.get(P);if(!E){E=[];for(let H=0;H<P.length-1;H+=8){let B=P.slice(H,Math.min(P.length,H+9)),D=B.map(Y=>Y[0]),Z=B.map(Y=>Y[1]);E.push({Q:B,x0:Math.min(...D),x1:Math.max(...D),z0:Math.min(...Z),z1:Math.max(...Z)})}et.set(P,E)}let k=1e9;for(let H of E){let B=Math.hypot(Math.max(0,H.x0-M,M-H.x1),Math.max(0,H.z0-N,N-H.z1));if(!(B>=L||B>=k))for(let D=0;D<H.Q.length-1;D++){let Z=H.Q[D],Y=H.Q[D+1];k=Math.min(k,v(M,N,Z[0],Z[1],Y[0],Y[1]))}}return k}function oe(M,N={}){N.sc&&M.scale(...Array.isArray(N.sc)?N.sc:[N.sc,N.sc,N.sc]);let[P,L]=_e(M,N),E=P&&ve.get(P);P&&!E&&(E=Float64Array.from(new ss(M,N.thr??25).attributes.position.array,(Y,W)=>Y/L[W%3]),ve.set(P,E));let k=N.pos||[0,0,0],H=N.rot||[0,0,0],B=ne(k[0],k[1],k[2],H[1],H[0],H[2]);N.m&&(B=q(N.m,B)),M.applyMatrix4(B);let D=E?(()=>{let Y=new Float32Array(E.length),W=new $;for(let z=0;z<Y.length;z+=3)W.set(E[z]*L[0],E[z+1]*L[1],E[z+2]*L[2]).applyMatrix4(B),Y[z]=W.x,Y[z+1]=W.y,Y[z+2]=W.z;return Y})():new ss(M,N.thr??25).attributes.position.array,Z=G(N.color??st,N.op??.9);for(let Y=0;Y<D.length;Y++)Z.push(D[Y]);if(N.fill!==!1){let Y=M.index?M.toNonIndexed():M,W=new Kt;W.setAttribute("position",Y.attributes.position),F.push(W)}return M}var Ae=(M,N,P)=>new Qi(M,N,P),He=(M,N,P,L=12,E=!1)=>new rs(M,N,P,L,1,E);function ue(M,N,P){let L=new Kt;return L.setAttribute("position",new Ft([-M/2,0,-P/2,-M/2,0,P/2,-M/2,N,0,M/2,0,-P/2,M/2,0,P/2,M/2,N,0],3)),L.setIndex([0,1,2,3,5,4,0,2,5,0,5,3,1,4,5,1,5,2,0,3,4,0,4,1]),L}function*ge(M=o){let N=0;performance.now()>A.end&&(yield 374);for(let{color:P,op:L,feat:E,zone:k,a:H}of _.values()){performance.now()>A.end&&(yield 375);let B=new Kt;B.setAttribute("position",new Ft(H,3)),M.add(new js(B,c&&(E||k)?c.lineMat(P,L,E,k):new br({color:P,transparent:L<1,opacity:L}))),N+=H.length/6}performance.now()>A.end&&(yield 380);for(let{color:P,size:L,op:E,feat:k,zone:H,a:B}of b.values()){performance.now()>A.end&&(yield 381);let D=new Kt;D.setAttribute("position",new Ft(B,3)),M.add(new Qs(D,c&&(k||H)?c.pointMat(P,L,E,k,H):new is({color:P,size:L,sizeAttenuation:!1,transparent:!0,opacity:E})))}return performance.now()>A.end&&(yield 385),F.length&&M.add(new _n(Zd(F,!1),O)),performance.now()>A.end&&(yield 386),Math.round(N)}var V=()=>0,we=new Map,Ce=12;function ke(M,N,P){for(let L=Math.floor((M-P)/Ce);L<=Math.floor((M+P)/Ce);L++)for(let E=Math.floor((N-P)/Ce);E<=Math.floor((N+P)/Ce);E++){let k=L+","+E;we.has(k)||we.set(k,[]),we.get(k).push([M,N,P])}}function lt(M,N,P=0){let L=we.get(Math.floor(M/Ce)+","+Math.floor(N/Ce));return!!L&&L.some(([E,k,H])=>Math.hypot(M-E,N-k)<H+P)}function*xe({x0:M,x1:N,z0:P,z1:L,step:E,rowK:k=1,colK:H=2,op:B=.42,colOp:D=.2,hole:Z=null,water:Y=-1e9,colSteep:W=1e9,rowSteep:z=1e9,fillR:te=1e9,fill:be=!0,cols:Le=!0,rowSkip:De=null,lodUnit:Ze=5}){let gt=Math.round((N-M)/E),_t=Math.round((L-P)/E),It=new Float32Array((gt+1)*(_t+1)*3),vt=new Float32Array((gt+1)*(_t+1));performance.now()>A.end&&(yield 404);for(let Ct=0;Ct<=_t;Ct++){performance.now()>A.end&&(yield 405);for(let Jt=0;Jt<=gt;Jt++){!(++A.n&255)&&performance.now()>A.end&&(yield 405);let Wt=M+Jt*E,Vt=P+Ct*E,tn=V(Wt,Vt),Vn=Ct*(gt+1)+Jt;vt[Vn]=tn,It[Vn*3]=Wt,It[Vn*3+1]=tn,It[Vn*3+2]=Vt}}performance.now()>A.end&&(yield 411);let Qe=(Ct,Jt)=>Z&&Ct>Z[0]&&Ct<Z[1]&&Jt>Z[2]&&Jt<Z[3],dt=[];performance.now()>A.end&&(yield 412);for(let Ct=0;Ct<_t;Ct++){performance.now()>A.end&&(yield 413);for(let Jt=0;Jt<gt;Jt++){if(!(++A.n&255)&&performance.now()>A.end&&(yield 413),Qe(M+(Jt+.5)*E,P+(Ct+.5)*E)||Math.hypot(M+(Jt+.5)*E,P+(Ct+.5)*E)>te)continue;let Wt=Ct*(gt+1)+Jt,Vt=Wt+1,tn=Wt+gt+1,Vn=tn+1;dt.push(Wt,tn,Vt,Vt,tn,Vn)}}performance.now()>A.end&&(yield 417);let yt=new Kt;performance.now()>A.end&&(yield 418),yt.setAttribute("position",new An(It,3)),performance.now()>A.end&&(yield 419),yt.setIndex(dt),performance.now()>A.end&&(yield 420),be&&o.add(new _n(yt,O)),performance.now()>A.end&&(yield 421);let Ot=G(st,B),sn=G(st,D),qt=(Ct,Jt)=>Ct.push(It[Jt*3],It[Jt*3+1],It[Jt*3+2]);performance.now()>A.end&&(yield 422);let dn=(Ct,Jt,Wt)=>{if(!c)return Wt;let Vt=Math.round((Ct+4e3)/Ze),tn=0;for(;tn<8&&Vt%2===0;)Vt/=2,tn++;let Vn=l;l=Ze*2**tn>=80?0:Ze*2**tn;let fr=G(st,Jt);return l=Vn,fr};performance.now()>A.end&&(yield 435);for(let Ct=0;Ct<=_t;Ct+=k){if(performance.now()>A.end&&(yield 436),De&&De(P+Ct*E))continue;let Jt=dn(P+Ct*E,B,Ot);for(let Wt=0;Wt<gt;Wt++){!(++A.n&255)&&performance.now()>A.end&&(yield 439);let Vt=Ct*(gt+1)+Wt;vt[Vt]<Y&&vt[Vt+1]<Y||Math.abs(vt[Vt+1]-vt[Vt])>E*z||Qe(M+(Wt+.5)*E,P+Ct*E)||(qt(Jt,Vt),qt(Jt,Vt+1))}}performance.now()>A.end&&(yield 447);for(let Ct=0;Le&&Ct<=gt;Ct+=H){performance.now()>A.end&&(yield 448);let Jt=dn(M+Ct*E,D,sn);for(let Wt=0;Wt<_t;Wt++){!(++A.n&255)&&performance.now()>A.end&&(yield 450);let Vt=Wt*(gt+1)+Ct,tn=Vt+gt+1;vt[Vt]<Y&&vt[tn]<Y||Math.abs(vt[tn]-vt[Vt])>E*W||Qe(M+Ct*E,P+(Wt+.5)*E)||(qt(Jt,Vt),qt(Jt,tn))}}}function*Ee(M,{x0:N,x1:P,z0:L,z1:E,step:k,color:H=st,op:B=.8,dy:D=.06,f:Z=V,hole:Y=null}){let W=Math.round((P-N)/k),z=Math.round((E-L)/k),te=new Float32Array((W+1)*(z+1)),be=G(H,B);performance.now()>A.end&&(yield 461);for(let Le=0;Le<=z;Le++){performance.now()>A.end&&(yield 462);for(let De=0;De<=W;De++)!(++A.n&255)&&performance.now()>A.end&&(yield 462),te[Le*(W+1)+De]=Z(N+De*k,L+Le*k)}performance.now()>A.end&&(yield 462);for(let Le of[].concat(M)){performance.now()>A.end&&(yield 463);for(let De=0;De<z;De++){!(++A.n&255)&&performance.now()>A.end&&(yield 463);for(let Ze=0;Ze<W;Ze++){if(!(++A.n&255)&&performance.now()>A.end&&(yield 463),Y){let It=N+(Ze+.5)*k,vt=L+(De+.5)*k;if(It>Y[0]&&It<Y[1]&&vt>Y[2]&&vt<Y[3])continue}let gt=[[Ze,De],[Ze+1,De],[Ze+1,De+1],[Ze,De+1]].map(([It,vt])=>[N+It*k,L+vt*k,te[vt*(W+1)+It]-Le]),_t=[];for(let It=0;It<4;It++){!(++A.n&255)&&performance.now()>A.end&&(yield 469);let vt=gt[It],Qe=gt[(It+1)%4];if(vt[2]<0!=Qe[2]<0){let dt=vt[2]/(vt[2]-Qe[2]);_t.push([vt[0]+(Qe[0]-vt[0])*dt,Le+D,vt[1]+(Qe[1]-vt[1])*dt])}}_t.length>=2&&be.push(..._t[0],..._t[1]),_t.length===4&&be.push(..._t[2],..._t[3])}}}}function*Ie(M,N,P,L,E,k=0,H=.3,B=null){let D=G(st,H);performance.now()>A.end&&(yield 481);for(let Z=0;Z<M;Z++){performance.now()>A.end&&(yield 482);let Y=f(N,P),W=f(L,E);if(B&&u()>B(Y,W)||V(Y,W)>k-1)continue;let z=f(2,9);D.push(Y,k+.02,W,Y+z,k+.02,W)}}function Pe(M,N,P,L,E=0){let k=new Sr(N-M,L-P,c?80:1,c?80:1);k.rotateX(-Math.PI/2),k.translate((M+N)/2,E,(P+L)/2),o.add(new _n(k,O))}function ze(M,{color:N=st,op:P=.7,dy:L=.25,step:E=2,minY:k=-1e9}={}){let H=[];for(let D=0;D<M.length-1;D++){let[Z,Y]=M[D],[W,z]=M[D+1],te=Math.max(1,Math.ceil(Math.hypot(W-Z,z-Y)/E));for(let be=0;be<te;be++){let Le=be/te,De=Z+(W-Z)*Le,Ze=Y+(z-Y)*Le;H.push([De,Math.max(k,V(De,Ze))+L,Ze])}}let B=M.at(-1);return H.push([B[0],Math.max(k,V(B[0],B[1]))+L,B[1]]),le(null,H,N,P),H}function ct(M,N){return M.map((P,L)=>{let E=M[Math.max(0,L-1)],k=M[Math.min(M.length-1,L+1)],H=k[0]-E[0],B=k[1]-E[1],D=Math.hypot(H,B)||1;return[P[0]-B/D*N,P[1]+H/D*N]})}function nt(M,N,P={}){let L=I(M,P.n??10);for(let E of L)ke(E[0],E[1],N/2+2.5);return ze(ct(L,N/2),P),ze(ct(L,-N/2),P),P.center&&ze(L,{...P,op:(P.op??.7)*.45}),L}function ht(M,N){let P=0,L=[];for(let H=0;H<M.length-1;H++)L.push(Math.hypot(M[H+1][0]-M[H][0],M[H+1][1]-M[H][1])),P+=L.at(-1);let E=N*P;for(let H=0;H<L.length;H++){if(E<=L[H]){let B=E/L[H];return[M[H][0]+(M[H+1][0]-M[H][0])*B,M[H][1]+(M[H+1][1]-M[H][1])*B,Math.atan2(-(M[H+1][1]-M[H][1]),M[H+1][0]-M[H][0])]}E-=L[H]}let k=M.at(-1);return[k[0],k[1],0]}function mt(M,N,P=1,L="c",E=.72){let k=V(M,N);L==="c"?(oe(new bi(1.5*P,3.4*P,6),{pos:[M,k+2.5*P,N],op:E,rot:[0,u()*3,0]}),oe(new bi(1.05*P,2.6*P,6),{pos:[M,k+4.2*P,N],op:E,rot:[0,u()*3,0]}),ie(null,[M,k,N],[M,k+.9*P,N],st,E)):(oe(new uo(1.8*P,0),{pos:[M,k+3*P,N],sc:[1,.85,1],rot:[u()*3,u()*3,0],op:E}),ie(null,[M,k,N],[M,k+1.5*P,N],st,E))}function X(M,N,P,{w:L=5,d:E=4,h:k=3,rh:H=2,color:B=st,op:D=.85,chim:Z=!1,win:Y=!0,y:W=null}={}){ke(M,N,Math.hypot(L,E)/2+1.5);let z=W??V(M,N)-.15,te=ne(M,z,N,P);if(oe(Ae(L,k,E),{m:te,pos:[0,k/2,0],color:B,op:D}),oe(ue(L+.5,H,E+.6),{m:te,pos:[0,k,0],color:B,op:D}),Y){let be=E/2+.02,Le=Math.min(.9,L*.12);for(let De=0;De<Math.max(1,Math.floor(L/2.4));De++){let Ze=-L/2+1.2+De*2.4;if(Ze+Le>L/2)break;let gt=[[Ze-Le/2,k*.45,be],[Ze+Le/2,k*.45,be],[Ze+Le/2,k*.45+Le*1.1,be],[Ze-Le/2,k*.45+Le*1.1,be],[Ze-Le/2,k*.45,be]];le(te,gt,B,D*.7)}}return Z&&oe(Ae(L*.08+.4,H*.9,L*.08+.4),{m:te,pos:[L*.28,k+H*.7,E*.12],color:B,op:D}),te}function At(M,N,[P,L,E],k=st,H=.9){oe(Ae(P,L,E),{m:M,pos:[N[0],N[1]+L/2,N[2]],color:k,op:H});let B=N[2]+E/2+.02;ie(M,[N[0]-P/2,N[1],B],[N[0]+P/2,N[1]+L,B],k,H*.5),ie(M,[N[0]+P/2,N[1],B],[N[0]-P/2,N[1]+L,B],k,H*.5)}function he(M,N=34,P=1.3){let L=J(hn,2.2,1);for(let E=0;E<N;E++){let k=new $(f(-1,1),f(-.1,1),f(-1,1)).normalize().multiplyScalar(f(.2,P));L.push(M[0]+k.x,M[1]+k.y,M[2]+k.z)}for(let E=0;E<9;E++){let k=new $(f(-1,1),f(0,1),f(-1,1)).normalize().multiplyScalar(P*1.4);ie(null,M,[M[0]+k.x,M[1]+k.y,M[2]+k.z],hn,.9)}}function C(M,N=14,P=st,L=180,E=.4){let k=J(P,1.8,E);for(let H=0;H<L;H++){let B=Math.pow(u(),.8),D=.3+B*N*.16;k.push(M[0]+f(-D,D)+B*B*N*.5,M[1]+B*N,M[2]+f(-D,D))}}function x(M,N,P,L=st,E=.7){let k=new $(...M),H=new $(...N),B=H.clone().sub(k),D=B.length(),Z=new Yt().compose(k,new Pn().setFromUnitVectors(new $(1,0,0),B.normalize()),new $(1,1,1)),Y=[[-P/2,-P/2],[P/2,-P/2],[P/2,P/2],[-P/2,P/2]];for(let[z,te]of Y)ie(Z,[0,z,te],[D,z,te],L,E);let W=Math.max(2,Math.round(D/P));for(let z=0;z<W;z++){let te=z/W*D,be=(z+1)/W*D;for(let Le=0;Le<4;Le++){let[De,Ze]=Y[Le],[gt,_t]=Y[(Le+1)%4];ie(Z,[te,De,Ze],[te,gt,_t],L,E*.8),ie(Z,z%2?[te,De,Ze]:[te,gt,_t],z%2?[be,gt,_t]:[be,De,Ze],L,E*.6)}}}function ee(M,N,P,L=st,E="stand"){let k=ne(M,V(M,N),N,P);oe(He(.3,.38,1.05,8),{m:k,pos:[0,1.32,0],color:L}),oe(new Er(.25,8,5),{m:k,pos:[0,2.1,0],color:L}),ie(k,[0,.8,-.14],[-.1,0,-.2],L),ie(k,[0,.8,.14],[.15,0,.2],L),E==="work"?(ie(k,[0,1.7,.25],[.55,1.35,.3],L),ie(k,[.55,1.35,.3],[.9,1.75,.25],L),ie(k,[.9,1.75,.25],[1,1.25,.25],L),ie(k,[0,1.7,-.25],[.6,1.2,-.2],L)):(ie(k,[0,1.7,.32],[.05,.95,.38],L),ie(k,[0,1.7,-.32],[.05,.95,-.38],L))}function se(M,N,P,L=hn,E=1){let k=ne(M,V(M,N),N,P);oe(Ae(2.6*E,.45*E,1.5*E),{m:k,pos:[0,1.05*E,0]});for(let H of[-1,1])oe(He(.6*E,.6*E,.2*E,12),{m:k,pos:[-.3*E,.6*E,H*.85*E],rot:[Math.PI/2,0,0]});return ie(k,[1.3*E,1.1*E,.45*E],[2.9*E,.8*E,.45*E]),ie(k,[1.3*E,1.1*E,-.45*E],[2.9*E,.8*E,-.45*E]),L&&At(k,[-.1*E,1.28*E,0],[1.5*E,1*E,1.05*E],L),k}var me,Ne=M=>{let N=new $(...c&&c.mapProj?c.xyz(...M):M).project(me);return[(N.x+1)/2*nn,(1-N.y)/2*mn,N.z]};function Fe(M,N,{top:P=120,bottom:L=mn-60,gap:E=50,inset:k=28}={}){let B=N.map(Z=>{let Y=Ne(Z.at),W=Y[0]<14||Y[0]>nn-14||Y[1]<14||Y[1]>mn-40;return{...Z,off:W,a0:Y,p:W?[Math.min(nn-14,Math.max(14,Y[0])),Math.min(mn-40,Math.max(14,Y[1]))]:Y}});M.textContent="";let D=Ti("svg",{class:"lead",width:nn,height:mn});M.append(D);for(let Z of["l","r"]){let Y=B.filter(te=>(te.side||(te.p[0]<nn/2?"l":"r"))===Z).sort((te,be)=>te.p[1]-be.p[1]),W=P,z=Y.map(te=>{let be=Math.max(W,Math.min(L-44,te.p[1]-30));return W=be+E,be});for(let te=z.length-1;te>=0;te--){let be=(te===z.length-1?L:z[te+1]-E+44)-44;z[te]>be&&(z[te]=be)}Y.forEach((te,be)=>{let Le=z[be],De=te.st,Ze=Z==="l"?k:nn-k,gt=Z==="l"?Ze+175:Ze-175,_t=Le+9,It=Bh(te,Z==="r"?"r":"");Z==="l"?It.style.left=`${Ze}px`:It.style.right=`${k}px`,It.style.top=`${Le}px`,M.append(It);let vt=Ti("path",{d:`M${te.p[0].toFixed(1)} ${te.p[1].toFixed(1)} L${gt} ${_t} L${Z==="l"?Ze+168:Ze-168} ${_t}`,fill:"none",stroke:Ro[De],"stroke-opacity":.55});te.off&&vt.setAttribute("stroke-dasharray","4 4"),D.append(vt,te.off?Ti("path",{d:"M0 -6 L5 3 L-5 3 Z",fill:Ro[De],transform:`translate(${te.p[0].toFixed(1)} ${te.p[1].toFixed(1)}) rotate(${(Math.atan2(te.a0[1]-te.p[1],te.a0[0]-te.p[0])*180/Math.PI+90).toFixed(1)})`}):Ti("rect",{x:(te.p[0]-3).toFixed(1),y:(te.p[1]-3).toFixed(1),width:6,height:6,fill:Ro[De]})),De==="fail"&&M.append(Kd(te.p))})}}var de=I([[-170,-1e3],[-140,-600],[-170,-420],[-95,-270],[-130,-150],[-45,-45],[40,35],[140,85],[270,115],[420,140]],10),fe=M=>235+60*Math.sin(M/130)+50*(S(M/90,3.3,3,5)-.5),Ue=(M,N)=>{let P=3+S(M/160,N/160,4,1)*14,L=S(M/90+7,N/90-3,4,2);P+=Math.max(0,L-.5)*130;let E=p(-140,-520,N)+p(-330,-520,M)*.6;if(E>0){let k=U(M/150,N/150,5,9);P+=Math.min(1,E)*(k*k*300+30)}return P},Je=[...e.region.pipelines].sort((M,N)=>M.key<N.key?-1:1),Ge=M=>{let N=2166136261;for(let P=0;P<M.length;P++)N=Math.imul(N^M.charCodeAt(P),16777619)>>>0;return N},Oe=M=>(M=Math.imul(M^M>>>16,73244475),M=Math.imul(M^M>>>16,73244475),1+((M^M>>>16)>>>0)%2147483645),tt=M=>Oe(Ge(Je[M].key)),ft=Je.map(M=>[M.label,M.usd,M.st]);if(!e.region.pipelines.length)throw new Error("world data: the open board has no pipelines");var bt=Math.max(0,Je.findIndex(M=>M.key===(e.focus||e.region.pipelines[0].key))),j=Je[bt],Be=j.place,Te=M=>M<4?"farm":M<=10?"village":"harbor",Xe=null;function Ke(){let M=ft.map(([,D])=>Te(D)),N=[],P=e.keepSites||{},L=(D,Z)=>{let Y=Ne([D,Math.max(0,Ue(D,Z)),Z]);return Y[0]>nn*.12&&Y[0]<nn*.84&&Y[1]>mn*.2&&Y[1]<mn*.84},E=(D,Z,Y)=>N.length?Math.min(...N.map(W=>Math.hypot(W.x-D,W.z-Z)-(W.foot||W.r)-Y)):1e9,k=(D,Z,Y,W)=>W==="harbor"?{x:D,z:Z,r:40,coast:!0,lv:2.2,i:Y,t:W}:{x:D,z:Z,r:W==="farm"?62:32,foot:W==="farm"?54:40,i:Y,t:W},H=D=>{throw new Error("world: no free spot for "+Je[D].key)};M.forEach((D,Z)=>{let Y=P[Je[Z].key];Array.isArray(Y)&&Y[2]==="harbor"==(D==="harbor")&&N.push(k(Y[0],Y[1],Z,D))});let B=new Set(N.map(D=>D.i));return M.forEach((D,Z)=>{if(B.has(Z)||D!=="harbor")return;let Y=null;for(let W=-320;W<=320;W+=10){let z=fe(W)-16;if(Math.abs(W-118)<60||!L(z+20,W))continue;let te=E(z,W,40);(!Y||te>Y.d)&&(Y={x:z,z:W,d:te})}Y||H(Z),N.push(k(Y.x,Y.z,Z,D))}),M.forEach((D,Z)=>{if(B.has(Z)||D==="harbor")return;d=tt(Z);let Y=D==="farm"?54:40,W=null;for(let z=0;z<3e3;z++){let te=f(-460,240),be=f(D==="farm"?-20:-420,330),Le=Ue(te,be);if(Le<4||Le>45||Math.abs(Ue(te+14,be)-Ue(te-14,be))+Math.abs(Ue(te,be+14)-Ue(te,be-14))>9||R(te,be,de)<Y+40||fe(be)-te<Y+60||!L(te,be))continue;let De=E(te,be,Y);(!W||De>W.d)&&(W={x:te,z:be,d:De})}W||H(Z),N.push(k(W.x,W.z,Z,D))}),Xe=Object.fromEntries(N.map(D=>[Je[D.i].key,[D.x,D.z,D.t]])),N.sort((D,Z)=>D.i-Z.i)}function Re(M){let N;return N=Ke(),d=17,N.forEach(L=>{L.coast||(L.lv=Math.max(4,Ue(L.x,L.z)))}),{f:(L,E)=>{let k=Ue(L,E);for(let B of N)if(!B.coast){let D=Math.hypot(L-B.x,E-B.z);D<B.r*2.2&&(k=w(B.lv,k,p(B.r,B.r*2.2,D)))}k=w(-8,k,p(-12,50,fe(E)-L));let H=ye(L,E,de,32);H<32&&(k=w(-2.5,k,p(5,30,H)));for(let B of N)if(B.coast&&k>-1){let D=Math.hypot(L-B.x,E-B.z),Z=Math.min(B.r,26);D<Z*2.2&&(k=w(B.lv,k,p(Z,Z*2.2,D)))}return k},S:N}}function ut(M,N){let P=lr[N],L=f(0,6.28),E=ne(M.x,M.lv,M.z,L);X(M.x,M.z,L,{w:22,d:12,h:8,rh:6,color:P,op:1,chim:!0,y:M.lv-.1});let k=[[0,0,15]],H=0;for(;k.length<20&&H++<800;){let D=u()*6.283,Z=f(15,M.r*1.15),Y=Math.cos(D)*Z,W=Math.sin(D)*Z;if(k.some(([te,be,Le])=>Math.hypot(te-Y,be-W)<Le+6))continue;k.push([Y,W,6]);let z=K(E,[Y,0,W]);X(z[0],z[2],L-D+(u()<.5?0:Math.PI/2),{w:f(6,9),d:f(4.8,6.4),h:f(3.4,4.6),rh:f(2.4,3.2),op:.95,chim:u()<.3})}let B=K(E,[-8,0,-16]);oe(Ae(5,18,5),{pos:[B[0],M.lv+9,B[2]],rot:[0,L,0],op:.95}),oe(new bi(4.2,8,4),{pos:[B[0],M.lv+22,B[2]],rot:[0,L+Math.PI/4,0],op:.95});for(let D=0;D<5;D++){let Z=u()*6.283,Y=M.r*f(1.5,2),W=M.x+Math.cos(Z)*Y,z=M.z+Math.sin(Z)*Y;Ut(W,z,Z+f(-.3,.3),f(14,24),f(10,18),st,.3,1,st,2.5)}if(N==="work"){let D=K(E,[6.16,14.2,1.44]);C(D,30,st,300,.45),he(K(E,[5,1,8]),30,3)}return[M.x,M.lv+22,M.z]}function at(M,N){let P=lr[N],L=ne(M.x,M.lv,M.z,0);for(let[E,k]of[[-14,46],[2,54],[18,40]])oe(Ae(k,2.4,6),{m:L,pos:[10+k/2,-.8,E],op:.9});for(let E of[-14,18]){let k=q(L,ne(30,.4,E,0));for(let[H,B]of[[-3,-3],[3,-3],[-3,3],[3,3]])oe(Ae(.6,12,.6),{m:k,pos:[H,6,B],color:P});oe(Ae(7,1,7),{m:k,pos:[0,12,0],color:P}),x(K(k,[-8,13,0]),K(k,[22,13,0]),1.4,P,.9)}Bt(q(L,ne(48,0,-5,0)),34,7,N==="work"?.5:1,P),N!=="fail"&&Bt(q(L,ne(44,0,26,0)),28,6,1,st,.7);for(let E=0;E<6;E++)oe(Ae(16,4.5,7),{m:L,pos:[-12-E%2*19,2.25,-22+Math.floor(E/2)*11],op:.85});for(let E=0;E<4;E++)for(let k=0;k<4;k++){let H=1+Math.floor(u()*3);oe(Ae(5.5,1.3*H,2.2),{m:L,pos:[2+E*6.2-9,.65*H,-20+k*2.8+26],color:N==="work"&&E===3?hn:st,op:.75})}for(let E=0;E<26;E++){let k=M.x-f(32,70),H=M.z+f(-38,38);V(k,H)<1.5||X(k,H,f(-.2,.2)+(u()<.5?0:Math.PI/2),{w:f(4,7),d:f(4,6),h:f(3,7),rh:f(1,2),op:.75})}return N==="work"&&he(K(L,[46,8,-5]),30,2.4),K(L,[30,16,-14])}function Bt(M,N,P,L,E,k=.9){let H=new as([new Ve(-N/2,-P/2),new Ve(N/2-P,-P/2),new Ve(N/2,0),new Ve(N/2-P,P/2),new Ve(-N/2,P/2)]),B=new ho(H,{depth:P*.5,bevelEnabled:!1});B.rotateX(-Math.PI/2),oe(B,{m:M,pos:[0,-P*.2,0],op:k}),oe(Ae(P*.7,P*.7,P*.9),{m:M,pos:[-N/2+P*.5,P*.3+P*.35,0],op:k}),oe(Ae(P*.35,P*.35,P*1.1),{m:M,pos:[-N/2+P*.5,P*.3+P*.87,0],op:k});let D=Math.floor((N-P*2.2)/(P*.62));for(let Z=0;Z<D;Z++)for(let Y=0;Y<3;Y++){if(Z/D>L)continue;let W=1+(Z+Y)%2;oe(Ae(P*.55,P*.18*W,P*.28),{m:M,pos:[-N/2+P*1.25+Z*P*.62,P*.3+P*.09*W,(Y-1)*P*.3],color:E===st?st:Z/D>L-.2?E:st,op:k*.85})}}function Ut(M,N,P,L,E,k=st,H=.3,B=1,D=st,Z=1e9){let Y=Math.cos(P),W=Math.sin(P),z=(te,be)=>[M+te*Y-be*W,N+te*W+be*Y];if(Z<1e9){let te=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5],[0,0],[0,-.5],[0,.5],[-.5,0],[.5,0]].map(([be,Le])=>V(...z(be*L,Le*E)));if(Math.max(...te)-Math.min(...te)>Z||Math.min(...te)<1.5)return!1}for(let te=-L/2+4;te<L/2;te+=8)for(let be=-E/2+4;be<E/2;be+=8)ke(...z(te,be),6);ze([z(-L/2,-E/2),z(L/2,-E/2),z(L/2,E/2),z(-L/2,E/2),z(-L/2,-E/2)],{color:k,op:Math.min(1,H*1.8),dy:.3});for(let te=-L/2+1.6;te<L/2;te+=1.6){let be=(te+L/2)/L<=B;ze([z(te,-E/2),z(te,E/2)],{color:be?k:D,op:be?H:H*.45,dy:.2,step:3})}return!0}function Bn(M,N){let P=lr[N],L=f(0,6.28),E=ne(M.x,M.lv,M.z,L);X(M.x,M.z,L,{w:17,d:11,h:7,rh:5.5,color:P,op:1,y:M.lv-.1});for(let[H,B]of[[13,-5],[18,-5]]){let D=K(E,[H,0,B]);oe(He(2.3,2.3,15,12),{pos:[D[0],M.lv+7.5,D[2]],color:P}),oe(new Er(2.3,12,4,0,6.29,0,1.57),{pos:[D[0],M.lv+15,D[2]],color:P})}{let H=K(E,[-12,0,6]);X(H[0],H[2],L,{w:6,d:5,h:3.4,rh:2.4,op:.85,chim:!0,y:M.lv-.1})}return[[-30,-24,28,20],[2,-30,30,18],[34,-18,26,30],[-34,14,24,28],[26,26,34,22],[-6,34,28,18]].map(H=>H.map(B=>B*1.2)).forEach(([H,B,D,Z],Y)=>{let W=K(E,[H,0,B]),z=N==="work"&&Y===2;Ut(W[0],W[2],L,D,Z,z?hn:st,.42,z?.55:1,st,4.5),z&&zn(...(()=>{let te=K(E,[H-D/2+D*.55,0,B]);return[te[0],te[2]]})(),L+Math.PI/2,hn,1.3)}),N==="work"&&C(K(E,[3,9,2]),14,st,120,.35),[M.x,M.lv+17,M.z]}function zn(M,N,P,L=hn,E=1){let k=ne(M,V(M,N),N,P);oe(Ae(3.2*E,1.3*E,1.5*E),{m:k,pos:[.4*E,1.5*E,0],color:L}),oe(Ae(1.8*E,1.9*E,1.7*E),{m:k,pos:[-.7*E,3.1*E,0],color:L,fill:!1});for(let H of[-1,1])oe(He(1.1*E,1.1*E,.55*E,14),{m:k,pos:[-.9*E,1.1*E,H*1.05*E],rot:[Math.PI/2,0,0],color:L}),oe(He(.6*E,.6*E,.4*E,12),{m:k,pos:[1.5*E,.6*E,H*.9*E],rot:[Math.PI/2,0,0],color:L});ie(k,[1.2*E,2.15*E,.4*E],[1.2*E,3.4*E,.4*E],L);for(let H of[-1,0,1])ie(k,[-2.2*E,1*E,H*.9*E],[-3.6*E,0,H*.9*E],L);return ie(k,[-2.2*E,1*E,-1*E],[-2.2*E,1*E,1*E],L),k}function oc(M){let N=[],P=M.coast?M.x+22:M.x,L=M.coast?46:M.t==="farm"?50:M.r*1.4;for(let H=0;H<16;H++){let B=H/16*6.283;for(let D of[0,M.coast?18:24])N.push(Ne([P+Math.cos(B)*L,M.lv+D,M.z+Math.sin(B)*L]))}let E=N.map(H=>H[0]),k=N.map(H=>H[1]);return[Math.min(...E),Math.min(...k),Math.max(...E),Math.max(...k)]}function Fo(M,N,P){let L=[[0,0,215,94],[nn-215,0,nn,94],[nn/2-240,0,nn/2+240,86],[0,mn-40,nn,mn]],E=[...L],k=[];M.textContent="";let H=Ti("svg",{class:"lead",width:nn,height:mn});M.append(H);let B=N.map(Y=>{let W=Bh(Y,"");W.style.visibility="hidden",M.append(W);let z=[W.offsetWidth+2,W.offsetHeight];return W.remove(),z}),D=(Y,W)=>W.some(z=>Y[0]<z[2]&&Y[2]>z[0]&&Y[1]<z[3]&&Y[3]>z[1]),Z=N.map((Y,W)=>W).sort((Y,W)=>Ne(N[Y].at)[1]-Ne(N[W].at)[1]);for(let Y of Z){let W=N[Y],z=Ne(W.at),[te,be]=B[Y],Le=null;for(let It of[!0,!1]){for(let vt of[14,28,46,70,100,140]){for(let[Qe,dt]of[[1,-1],[-1,-1],[1,0],[-1,0],[0,-1],[1,1],[-1,1],[0,1]]){let yt=Qe>0?z[0]+vt:Qe<0?z[0]-vt-te:z[0]-te/2,Ot=dt<0?z[1]-vt-be:dt>0?z[1]+vt:z[1]-be/2,sn=[yt,Ot,yt+te,Ot+be];if(!(yt<14||Ot<14||yt+te>nn-14||Ot+be>mn-14||D(sn,E)||It&&D(sn,P))){Le={x:yt,y:Ot,r:sn,right:Qe<0};break}}if(Le)break}if(Le)break}if(!Le){k.push(W.name);continue}E.push([Le.r[0]-8,Le.r[1]-8,Le.r[2]+8,Le.r[3]+8]);let De=Bh(W,Le.right?"r":"");De.style.left=`${Le.x}px`,De.style.top=`${Le.y}px`,De.style.width=`${te}px`,M.append(De);let Ze=Math.min(Math.max(z[0],Le.r[0]),Le.r[2]),gt=Math.min(Math.max(z[1],Le.r[1]+9),Le.r[3]),_t=`M${z[0].toFixed(1)} ${z[1].toFixed(1)} L${Ze.toFixed(1)} ${gt.toFixed(1)}`;H.append(Ti("path",{d:_t,fill:"none",stroke:pt.bg,"stroke-width":4,"stroke-opacity":.85}),Ti("path",{d:_t,fill:"none",stroke:Ro[W.st],"stroke-width":1.2,"stroke-opacity":.9}),Ti("rect",{x:(z[0]-3).toFixed(1),y:(z[1]-3).toFixed(1),width:6,height:6,fill:Ro[W.st]})),W.st==="fail"&&M.append(Kd(z))}return k}function*ko(M){d=17,performance.now()>A.end&&(yield 958);let N={mixed:[[110,430,610],[100,0,-50]],village:[[-40,250,420],[-50,0,-60]],harbor:[[-120,240,400],[150,0,-40]],farm:[[-90,230,420],[-70,0,-40]]}[M];performance.now()>A.end&&(yield 959),me=new Mn(40,nn/mn,1,8e3),performance.now()>A.end&&(yield 960),me.position.set(...N[0]),performance.now()>A.end&&(yield 961),me.lookAt(...N[1]),performance.now()>A.end&&(yield 962),me.updateMatrixWorld(),performance.now()>A.end&&(yield 963),me.updateProjectionMatrix(),performance.now()>A.end&&(yield 964);let{f:P,S:L}=Re(M);if(performance.now()>A.end&&(yield 965),V=c?Se(c.blendH(c.portHF(P,L))):P,performance.now()>A.end&&(yield 966),h=c?-1:0,performance.now()>A.end&&(yield 967),o.fog=new es(Kl,700,2300),performance.now()>A.end&&(yield 968),yield*xe({x0:-760,x1:520,z0:-700,z1:560,step:2.5,rowK:2,colK:c?8:6,op:c?.5:.3,colOp:.1,water:-.3,colSteep:.7,rowSteep:3}),performance.now()>A.end&&(yield 969),c?yield*xe({x0:-1800,x1:1800,z0:-1800,z1:1800,step:5,rowK:1,colK:4,op:.5,colOp:.1,hole:[-760,520,-700,560],water:-.3,colSteep:.7,rowSteep:3,fillR:1430}):yield*xe({x0:-1600,x1:1600,z0:-1900,z1:1400,step:10,rowK:1,colK:4,op:.36,colOp:.07,hole:[-760,520,-700,560],water:-.3,colSteep:.5,rowSteep:2.2}),performance.now()>A.end&&(yield 971),c){let W=c.port,z=Math.round((W.Ox-80)/5)*5,te=Math.round((W.Oz-80)/5)*5;h=-2,yield*xe({x0:z,x1:z+160,z0:te,z1:te+160,step:1.25,rowK:1,op:.5,colOp:.1,water:-.3,rowSteep:3,fill:!1,cols:!1,rowSkip:be=>Math.abs(be/5-Math.round(be/5))<1e-6,lodUnit:1.25}),h=-1}if(performance.now()>A.end&&(yield 977),c){let W=new fo(0,1430,160,60);W.rotateX(-Math.PI/2),o.add(new _n(W,O))}else Pe(-1600,1600,-1900,1500,0);if(performance.now()>A.end&&(yield 982),yield*Ee(0,{x0:-760,x1:700,z0:-700,z1:560,step:2.5,op:.9}),performance.now()>A.end&&(yield 983),yield*Ee(-1.6,{x0:-760,x1:700,z0:-700,z1:560,step:5,op:.28}),performance.now()>A.end&&(yield 984),c&&(yield*Ee(0,{x0:-1800,x1:1800,z0:-1800,z1:1800,step:10,op:.9,hole:[-760,700,-700,560]})),performance.now()>A.end&&(yield 985),l=c?40:0,performance.now()>A.end&&(yield 986),yield*Ee([40,70,100,130,160,190,220,250,280],{x0:-760,x1:520,z0:-700,z1:560,step:4,op:.42,dy:.3}),performance.now()>A.end&&(yield 987),c&&(yield*Ee([40,70,100,130,160,190,220,250,280],{x0:-1800,x1:1800,z0:-1800,z1:1800,step:8,op:.42,dy:.3,hole:[-760,520,-700,560]}),l=0,yield*Ee(-1.6,{x0:-1800,x1:1800,z0:-1800,z1:1800,step:10,op:.28,hole:[-760,700,-700,560]})),performance.now()>A.end&&(yield 992),l=c?6:0,performance.now()>A.end&&(yield 993),c?yield*Ie(3e4,-1600,1600,-1600,1600,0,.26,(W,z)=>.5*(1-p(1250,1600,Math.hypot(W,z)))):yield*Ie(9e3,-760,900,-700,560,0,.26,(W,z)=>.15+.85*p(-560,300,z)),performance.now()>A.end&&(yield 995),!c){let W=J(st,1.3,.5);for(let z=0;z<700;z++){performance.now()>A.end&&(yield 998);let te=f(-1.4,1.4),be=f(.02,.5);W.push(Math.sin(te)*3e3,300+Math.sin(be)*3e3,-Math.cos(te)*3e3)}}performance.now()>A.end&&(yield 1002);let E={village:[[0,3],[0,4],[0,2],[3,1],[1,5],[2,5]],harbor:[[0,1],[1,2],[2,3],[3,4],[4,5]],farm:[[0,4],[0,3],[3,1],[3,2],[1,5],[0,5]]}[M];if(performance.now()>A.end&&(yield 1003),M==="mixed"){E=[];let W=new Set([0]);for(;W.size<L.length;){performance.now()>A.end&&(yield 1007);let z=null;for(let te of W)!(++A.n&255)&&performance.now()>A.end&&(yield 1009),L.forEach((be,Le)=>{if(W.has(Le))return;let De=Math.hypot(L[te].x-be.x,L[te].z-be.z);(!z||De<z[2])&&(z=[te,Le,De])});E.push([z[0],z[1]]),W.add(z[1])}}performance.now()>A.end&&(yield 1017),l=0,performance.now()>A.end&&(yield 1018);let k=[];performance.now()>A.end&&(yield 1019);for(let[W,z]of E){performance.now()>A.end&&(yield 1020),d=Oe(Ge(Je[W].key+"|"+Je[z].key));let te=L[W],be=L[z],Le=(te.x+be.x)/2+f(-20,20),De=(te.z+be.z)/2+f(-20,20);k.push(nt([[te.x,te.z],[Le,De],[be.x,be.z]],2.4,{op:.7,minY:1.4}))}performance.now()>A.end&&(yield 1024);let H=Je.map(W=>[W.label,W.st,W.chip]);performance.now()>A.end&&(yield 1025),l=c?6:0,performance.now()>A.end&&(yield 1026);let B=yield*Uy(L,function*(W,z){let[te,be,Le]=H[z];performance.now()>A.end&&(yield 1028),d=tt(z),performance.now()>A.end&&(yield 1029);let De=c&&z===c.port.i?yield*gi(W,be):W.t==="village"?ut(W,be):W.t==="harbor"?at(W,be):Bn(W,be);return performance.now()>A.end&&(yield 1030),{name:te,st:be,chip:Le,at:De,id:Je[z].key}});performance.now()>A.end&&(yield 1032),l=c?15:0,performance.now()>A.end&&(yield 1033);for(let W=0;W<(c?900:M==="farm"?320:240);W++){performance.now()>A.end&&(yield 1034),d=Oe(W+1);let z=c?f(-1250,1250):f(-700,300),te=c?f(-1250,1250):f(-200,540),be=V(z,te);c&&u()<p(950,1250,Math.hypot(z,te))||be<2||be>30||R(z,te,de)<16||lt(z,te,10)||Ut(z,te,f(-.5,.5)+(u()<.5?0:1.57),f(12,26),f(10,18),st,.2,1,st,2.2)}performance.now()>A.end&&(yield 1040),l=c?8:0,performance.now()>A.end&&(yield 1041);let D=0;performance.now()>A.end&&(yield 1042);for(let W=0;W<(c?42e4:11e4)&&D<(c?24e3:6500);W++){performance.now()>A.end&&(yield 1043),d=Oe(W+5e6);let z=c?f(-1250,1250):f(-740,500),te=c?f(-1250,1250):f(-680,540),be=V(z,te);c&&u()<p(950,1250,Math.hypot(z,te))||be<2.5||be>150||S(z/70+11,te/70,3,21)<.55||Math.abs(V(z+3,te)-be)>4.5||R(z,te,de)<10||lt(z,te,2.5)||(mt(z,te,f(1.1,1.7),be>26||u()<.35?"c":"d",.5),D++)}performance.now()>A.end&&(yield 1054),l=c?6:0,performance.now()>A.end&&(yield 1055);let Z=H.findIndex(W=>W[1]==="work");performance.now()>A.end&&(yield 1056),yield*Fy(k,function*(W,z){let[te,be]=E[z];if(performance.now()>A.end&&(yield 1058),te!==Z&&be!==Z)return;performance.now()>A.end&&(yield 1059);let Le=te===Z;if(performance.now()>A.end&&(yield 1060),a){let De=V;for(let Ze of[0,.5]){performance.now()>A.end&&(yield 1063);let gt=yield*pi(()=>se(0,0,0,hn,2.2));a.movers.push(_t=>{let It=(_t/14+Ze)%1,vt=It<.5,Qe=vt?p(0,.5,It):1-p(.5,1,It),[dt,yt,Ot]=ht(W,Le?Qe:1-Qe);gt.position.set(dt,Math.max(1.4,De(dt,yt)),yt),gt.rotation.y=Ot+(vt===Le?0:Math.PI)})}return}performance.now()>A.end&&(yield 1072);for(let De of[.22,.5]){performance.now()>A.end&&(yield 1073);let[Ze,gt,_t]=ht(W,te===Z?De:1-De);se(Ze,gt,_t,hn,2.2)}}),performance.now()>A.end&&(yield 1077),l=0,performance.now()>A.end&&(yield 1078),h=0,performance.now()>A.end&&(yield 1079);let Y=yield*ge();return performance.now()>A.end&&(yield 1080),c.items=B,performance.now()>A.end&&(yield 1081),c.S=L,performance.now()>A.end&&(yield 1082),Y}function*As(M,N,P,L){let E=ne(M,2.2,N,0);performance.now()>A.end&&(yield 1086);for(let D of[-6,6]){performance.now()>A.end&&(yield 1087);for(let Z of[2,16])!(++A.n&255)&&performance.now()>A.end&&(yield 1087),oe(Ae(.9,26,.9),{m:E,pos:[D,13,Z],color:P})}performance.now()>A.end&&(yield 1087);for(let D of[2,16])performance.now()>A.end&&(yield 1088),oe(Ae(13,1.2,1.2),{m:E,pos:[0,26,D],color:P}),oe(Ae(13,.8,.8),{m:E,pos:[0,9,D],color:P});performance.now()>A.end&&(yield 1091);for(let D of[-6,6])performance.now()>A.end&&(yield 1092),oe(Ae(1,1,15),{m:E,pos:[D,26,9],color:P}),ie(E,[D,9,2],[D,26,16],P,.6),ie(E,[D,9,16],[D,26,2],P,.6);performance.now()>A.end&&(yield 1096);let k=!L;performance.now()>A.end&&(yield 1097);let H=k?2:-40,B=k?70:29;performance.now()>A.end&&(yield 1098),x(K(E,[0,29,26]),K(E,[0,29,2]),2,P,.9),performance.now()>A.end&&(yield 1099),x(K(E,[0,29,2]),K(E,[0,B,H]),2,P,.9),performance.now()>A.end&&(yield 1100);for(let D of[-1,1])performance.now()>A.end&&(yield 1101),ie(E,[D,26,2],[0,44,9],P),ie(E,[D,26,16],[0,44,9],P);performance.now()>A.end&&(yield 1104),ie(E,[0,44,9],[0,B+1,H],P,.8),performance.now()>A.end&&(yield 1105),ie(E,[0,44,9],[0,30,26],P,.8),performance.now()>A.end&&(yield 1106),oe(Ae(5,4,6),{m:E,pos:[0,32,20],color:P}),performance.now()>A.end&&(yield 1107);for(let D of[-6,6]){performance.now()>A.end&&(yield 1108);for(let Z of[2,16])!(++A.n&255)&&performance.now()>A.end&&(yield 1108),oe(Ae(2.2,.9,2.2),{m:E,pos:[D,.45,Z],color:P})}if(performance.now()>A.end&&(yield 1110),L&&a){let D=M,Z=N,Y=D>0?.37:0,W=yield*pi(()=>oe(Ae(2.6,1.6,3),{color:P})),z=yield*pi(()=>{for(let Le of[-.8,.8])ie(null,[Le,0,0],[Le,-1,0],P,.9)}),te=yield*pi(()=>oe(Ae(12,.5,2.8),{pos:[0,.25,0],color:P})),be=yield*pi(()=>oe(Ae(12,2.6,2.6),{pos:[0,-1.3,0],color:hn}));a.movers.push(Le=>{let De=(Le/9+Y)%1,Ze=9.5,gt=-24,_t=18,It=2.6,vt=3.9,Qe=Ze,dt=_t,yt=!1;De<.15?dt=w(_t,It,p(0,.15,De)):De<.3?(dt=w(It,_t,p(.15,.3,De)),yt=!0):De<.45?(Qe=w(Ze,gt,p(.3,.45,De)),yt=!0):De<.6?(Qe=gt,dt=w(_t,vt,p(.45,.6,De)),yt=!0):De<.7?(Qe=gt,dt=w(vt,_t,p(.6,.7,De))):De<.85&&(Qe=w(gt,Ze,p(.7,.85,De))),W.position.set(D,2.2+27.4,Z+Qe),te.position.set(D,2.2+dt,Z+Qe),be.position.set(D,2.2+dt,Z+Qe),be.visible=yt,z.position.set(D,2.2+26.6,Z+Qe),z.scale.y=26.6-dt-.5})}else if(L){oe(Ae(2.6,1.6,3),{m:E,pos:[0,27.4,-24],color:P});for(let D of[-.8,.8])performance.now()>A.end&&(yield 1144),ie(E,[D,26.6,-24],[D,15,-24],P,.9);oe(Ae(12,2.6,2.6),{m:E,pos:[0,13.6,-24],color:hn})}return performance.now()>A.end&&(yield 1146),K(E,[0,47,9])}function Cs(M,N,P,L=st){let E=ne(M,2.2,N,P);oe(Ae(2.6,2.6,2.5),{m:E,pos:[5.3,2.1,0]}),oe(Ae(12,.5,2.4),{m:E,pos:[0,1.1,0]});for(let k of[-4.5,-3.2,3.5,5.3])for(let H of[-1,1])oe(He(.55,.55,.35,10),{m:E,pos:[k,.55,H*1.1],rot:[Math.PI/2,0,0]});L&&oe(Ae(9.5,2.6,2.4),{m:E,pos:[-1.2,2.65,0],color:L})}function Rs(M,N){let P;N>0?P=2.2+p(70,170,N)*S(M/80,N/80,4,2)*80:P=-6;let L=p(-150,-200,M)*p(70,20,N);L>0&&(P=w(P,6+S(M/50,N/50,4,3)*60,L));let E=p(-480,-700,N);return E>0&&(P=w(P,10+Math.pow(U(M/220,N/220,5,8),2)*520,E)),P}var Qn=Math.PI/180,Pi=M=>Math.min(1,Math.max(0,M));function an(M,N,P=100){let L=M*Qn,E=N*Qn;return[P*Math.cos(L)*Math.sin(E),P*Math.sin(L),P*Math.cos(L)*Math.cos(E)]}function*pi(M){let N=[_,b,F,V];performance.now()>A.end&&(yield 1173),_=new Map,performance.now()>A.end&&(yield 1174),b=new Map,performance.now()>A.end&&(yield 1175),F=[],performance.now()>A.end&&(yield 1176),V=()=>0,performance.now()>A.end&&(yield 1177);let P=h;performance.now()>A.end&&(yield 1178),h=0,performance.now()>A.end&&(yield 1179),M(),performance.now()>A.end&&(yield 1180);let L=new si;return performance.now()>A.end&&(yield 1181),L.userData.local=!0,performance.now()>A.end&&(yield 1182),yield*ge(L),performance.now()>A.end&&(yield 1183),[_,b,F,V]=N,performance.now()>A.end&&(yield 1184),h=P,performance.now()>A.end&&(yield 1185),o.add(L),performance.now()>A.end&&(yield 1186),L}var Dr=e.boards.map(M=>({...M}));function Hi(M,N){return c?c.landF(M,N,Ur):Ur(M,N)}function Ur(M,N){let P=S(N/24+40,M/24+40,5,61)*1.05;for(let L of Dr){let E=(N-L.lon)*Math.cos(M*Qn),k=E*E+(M-L.lat)**2;P+=.2*Math.exp(-k/70)}return P}var ur=M=>M.current,Is=(()=>{let M=Dr.find(ur);if(!M)throw new Error("world data: no open board");return[M.lat,M.lon]})(),dr=[4,32,-12,16],ac=(M,N)=>M>=dr[0]&&M<dr[1]&&N>=dr[2]&&N<dr[3];function*Ps(M,N,P,L,E=[-80,80,-150,150],k=.6,H=!1){let B=Math.round((E[3]-E[2])/k),D=Math.round((E[1]-E[0])/k),Z=new Float32Array((B+1)*(D+1)),Y=G(N,P);performance.now()>A.end&&(yield 1210);for(let W=0;W<=D;W++){performance.now()>A.end&&(yield 1211);for(let z=0;z<=B;z++)!(++A.n&255)&&performance.now()>A.end&&(yield 1211),Z[W*(B+1)+z]=Hi(E[0]+W*k,E[2]+z*k)}performance.now()>A.end&&(yield 1211);for(let W of M){performance.now()>A.end&&(yield 1212);for(let z=0;z<D;z++){!(++A.n&255)&&performance.now()>A.end&&(yield 1212);for(let te=0;te<B;te++){if(!(++A.n&255)&&performance.now()>A.end&&(yield 1212),H&&ac(E[0]+(z+.5)*k,E[2]+(te+.5)*k)||c&&c.hole(E[0]+(z+.5)*k,E[2]+(te+.5)*k))continue;let be=[[te,z],[te+1,z],[te+1,z+1],[te,z+1]].map(([De,Ze])=>[E[2]+De*k,E[0]+Ze*k,Z[Ze*(B+1)+De]-W]),Le=[];for(let De=0;De<4;De++){!(++A.n&255)&&performance.now()>A.end&&(yield 1216);let Ze=be[De],gt=be[(De+1)%4];if(Ze[2]<0!=gt[2]<0){let _t=Ze[2]/(Ze[2]-gt[2]);Le.push(an(Ze[1]+(gt[1]-Ze[1])*_t,Ze[0]+(gt[0]-Ze[0])*_t,L))}}Le.length>=2&&Y.push(...Le[0],...Le[1]),Le.length===4&&Y.push(...Le[2],...Le[3])}}}}var Oo=[];function*lc(){d=23,performance.now()>A.end&&(yield 1229),o.fog=null,performance.now()>A.end&&(yield 1230);let M=.52;performance.now()>A.end&&(yield 1231),h=c?1:0,performance.now()>A.end&&(yield 1232),o.add(new _n(new Er(99.7,160,120),O)),performance.now()>A.end&&(yield 1233);let N=G(st,.1);performance.now()>A.end&&(yield 1234);for(let B=-75;B<=75;B+=15){performance.now()>A.end&&(yield 1235);for(let D=-180;D<180;D+=2)!(++A.n&255)&&performance.now()>A.end&&(yield 1235),(!c||!c.hole(B,D+1))&&N.push(...an(B,D,100.02),...an(B,D+2,100.02))}performance.now()>A.end&&(yield 1235);for(let B=-180;B<180;B+=15){performance.now()>A.end&&(yield 1236);for(let D=-88;D<88;D+=2)!(++A.n&255)&&performance.now()>A.end&&(yield 1236),(!c||!c.hole(D+1,B))&&N.push(...an(D,B,100.02),...an(D+2,B,100.02))}performance.now()>A.end&&(yield 1236);let P=G(st,.34),L=G(st,.09),E=.7;performance.now()>A.end&&(yield 1237);for(let B=0;B*E<=156;B++){performance.now()>A.end&&(yield 1238);let D=-78+B*E;for(let Z=-150;Z<150;Z+=E)!(++A.n&255)&&performance.now()>A.end&&(yield 1240),Hi(D,Z+E/2)>M?(c&&c.hole(D,Z+E/2)?[]:P).push(...an(D,Z,100.05),...an(D,Z+E,100.05)):B%5===0&&L.push(...an(D,Z,100.02),...an(D,Z+E,100.02))}if(performance.now()>A.end&&(yield 1244),c)for(let[B,D]of[[.5,49],[.25,24.5],[.75,24.5]]){performance.now()>A.end&&(yield 1245),l=D;let Z=G(st,.34);for(let Y=0;Y*E<156;Y++){!(++A.n&255)&&performance.now()>A.end&&(yield 1248);let W=-78+(Y+B)*E;for(let z=-150;z<150;z+=E)!(++A.n&255)&&performance.now()>A.end&&(yield 1250),Hi(W,z+E/2)>M&&!c.hole(W,z+E/2)&&Z.push(...an(W,z,100.05),...an(W,z+E,100.05))}l=0}performance.now()>A.end&&(yield 1253),yield*Ps([M],st,.95,100.08),performance.now()>A.end&&(yield 1254),yield*Ps([M+.06,M+.12,M+.18,M+.24],st,.42,100.07),performance.now()>A.end&&(yield 1255),c&&(yield*Ps([40,70,100,130,160,190,220,250,280].map(B=>M+B*.004),st,.42,100.09,[-80,80,-150,150],.3)),performance.now()>A.end&&(yield 1256);let k=[];performance.now()>A.end&&(yield 1257);for(let B of Dr){if(performance.now()>A.end&&(yield 1258),c&&ur(B)){k.push({name:B.name,st:B.st,chip:B.chip,at:an(B.lat,B.lon,100.3),id:B.slug});continue}let D=lr[B.st],Z=1.2+Math.sqrt(B.n)*.45,Y=[],W=J(st,2,.9),z=J(D,2.4,1);for(let be=0;be<30+B.n*7;be++){!(++A.n&255)&&performance.now()>A.end&&(yield 1264);let Le=u()*6.283,De=Z*Math.sqrt(u())*(u()<.2?1.8:1),Ze=an(B.lat+Math.sin(Le)*De,B.lon+Math.cos(Le)*De/Math.cos(B.lat*Qn),100.35);Y.push(Ze),(be%4===0?z:W).push(...Ze)}let te=G(D,.45);for(let be=0;be<Y.length;be++){!(++A.n&255)&&performance.now()>A.end&&(yield 1270);let Le=-1,De=1e9;for(let Ze=0;Ze<Y.length;Ze++){if(!(++A.n&255)&&performance.now()>A.end&&(yield 1272),Ze===be)continue;let gt=Math.hypot(Y[be][0]-Y[Ze][0],Y[be][1]-Y[Ze][1],Y[be][2]-Y[Ze][2]);gt<De&&(De=gt,Le=Ze)}De<Z*.7&&te.push(...Y[be],...Y[Le])}B.labeled!==!1&&k.push({name:B.name,st:B.st,chip:B.chip,at:an(B.lat,B.lon,100.3),id:B.slug})}performance.now()>A.end&&(yield 1283),h=0,performance.now()>A.end&&(yield 1284);{let B=J(st,1.3,.55);for(let D=0;D<1500;D++)performance.now()>A.end&&(yield 1287),B.push(...an(f(-85,85),f(-180,180),3e3))}performance.now()>A.end&&(yield 1288),yield*ge(),performance.now()>A.end&&(yield 1289);let H=new si;return performance.now()>A.end&&(yield 1290),Oo=[[100,.55],[101.6,.25],[104.5,.1]].map(([B,D])=>{let Z=[];for(let z=0;z<=256;z++){let te=z/256*6.283;Z.push(Math.cos(te),Math.sin(te),0)}let Y=new Kt;Y.setAttribute("position",new Ft(Z,3));let W=new ns(Y,new br({color:st,transparent:!0,opacity:D,depthTest:!1}));return W.userData={r:B,o:D},H.add(W),W}),performance.now()>A.end&&(yield 1303),o.add(H),performance.now()>A.end&&(yield 1304),k}function Ls(M,N,P,L,E){let k=P-N,H=Math.min(Math.max(M-N,0),k),B=L/2+(k-L-E)+E/2,D=(Z,Y)=>Z/2-Y/(2*Math.PI)*Math.sin(Math.PI*Z/Y);return(H<=L?D(H,L):H<=k-E?L/2+H-L:B-D(k-H,E))/B}var T=M=>.5-.5*Math.cos(Math.PI*Pi(M)),Q=mn/2/Math.tan(20*Qn);function pe(){let L=[1250,1600],E=.52,k=new $(...an(Is[0],Is[1],1)),H=new $(0,1,0).sub(k.clone().multiplyScalar(k.y)).normalize(),B=H.clone().cross(k).normalize(),D=(Qe,dt,yt)=>{let Ot=k.x*8e3+B.x*Qe-H.x*yt,sn=k.y*8e3+B.y*Qe-H.y*yt,qt=k.z*8e3+B.z*Qe-H.z*yt,dn=(100+dt*.0125)/Math.hypot(Ot,sn,qt);return[Ot*dn,sn*dn,qt*dn]},Z=Qe=>new $(...D(Qe[0],Qe[1],Qe[2])),Y=Qe=>{let dt=Qe.dot(k);return[8e3*Qe.dot(B)/dt,-8e3*Qe.dot(H)/dt,dt]},W=(Qe,dt)=>{let yt=new $(...an(Qe,dt,1));return Math.acos(Math.min(1,yt.dot(k)))*8e3},z=(Qe,dt,yt)=>({vertexShader:`${Qe}
  #include <fog_pars_vertex>
  void main(){
  ${dt}
  #include <fog_vertex>
  }`,fragmentShader:`uniform vec3 color; uniform float opacity; varying float vL;
  #include <fog_pars_fragment>
  void main(){ float a = opacity * vL${yt}; if (a < .002) discard; gl_FragColor = vec4(color, a);
  #include <colorspace_fragment>
  #include <fog_fragment>
  }`}),te=`float dd = max(-mvPosition.z, 1e-4), fp = abs(feat) * focal / dd; vL = feat == 0. ? 1. : smoothstep(px0, px1, fp); if (feat < 0.) vL = 1. - vL;
    if (zone != 0.) { float r = acos(clamp(dot(normalize(position), cen), -1., 1.)) * 100., q = zb.y - zb.x; vL *= zone > 0. ? smoothstep(zb.x, zb.x + .6 * q, r) : 1. - smoothstep(zb.x + .4 * q, zb.y, r); }`,be=(Qe,dt,yt,Ot,sn={})=>{let qt=Ot===-2,dn=qt?vt.port.cen:k,Ct=qt?vt.port.band:[L[0]*.0125,L[1]*.0125];return Hl.merge([Ye.fog,{color:{value:new Pt(Qe)},opacity:{value:dt},feat:{value:yt*.0125},focal:{value:Q},px0:{value:2.5},px1:{value:14},zone:{value:Ot},cen:{value:dn.clone()},zb:{value:new Ve(Ct[0],Ct[1])},...sn}])},Le=(Qe,dt,yt,Ot)=>new Cn({transparent:!0,fog:!0,uniforms:be(Qe,dt,yt,Ot),...z("uniform float feat, focal, px0, px1, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;",`vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${te} gl_Position = projectionMatrix * mvPosition;`,"")}),De=(Qe,dt,yt,Ot,sn)=>new Cn({transparent:!0,fog:!0,uniforms:be(Qe,yt,Ot,sn,{size:{value:dt*s.getPixelRatio()}}),...z("uniform float feat, focal, px0, px1, size, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;",`vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${te} gl_PointSize = size; gl_Position = projectionMatrix * mvPosition;`,"")}),Ze=(Qe,dt,yt)=>Math.max(-110,Math.min(110,(fe(dt)-Qe)*.6))*(1-p(1500,3200,yt)),gt=(Qe,dt)=>{let yt=new $(...D(Qe,0,dt));return(Ur(Math.asin(yt.y/100)/Qn,Math.atan2(yt.x,yt.z)/Qn)-E)/.004+Ze(Qe,dt,Math.hypot(Qe,dt))},vt={K:.0125,RP:100,RR:8e3,N:k,NO:H,E:B,TH:E,BAND:L,xyz:D,xf:Z,toRegion:Y,lineMat:Le,pointMat:De,blendH:Qe=>(dt,yt)=>{let Ot=Math.hypot(dt,yt);return Ot<950?Qe(dt,yt):w(Qe(dt,yt),gt(dt,yt),p(950,1250,Ot))},portHF:(Qe,dt)=>{let yt=bt,Ot=dt[yt],sn=Be==="harbor",qt=sn?.25:.5,dn=sn?Ot.x+16:Ot.x,Ct=Ot.z;if(Ot.t!==Be)throw new Error(`world data: site ${yt} is a ${Ot.t}, the pipeline a ${Be}`);let Jt=sn?([Wt,Vt,tn])=>[dn-qt*tn,qt*(Vt+.4),Ct+qt*Wt]:([Wt,Vt,tn])=>[dn-qt*tn,Ot.lv+qt*Vt,Ct+qt*Wt];return vt.port={i:yt,k:qt,Ox:dn,Oz:Ct,s2r:Jt,cen:Z([sn?dn+10:dn,0,Ct]).normalize(),band:sn?[45*.0125,75*.0125]:[70*.0125,100*.0125]},sn?(Wt,Vt)=>{let tn=(Vt-Ct)/qt,Vn=(dn-Wt)/qt,fr=qt*Math.hypot(Math.max(0,Math.abs(tn)-240),Math.max(0,Math.abs(Vn)-200));if(fr>=30)return Qe(Wt,Vt);let cc=Rs(tn,Vn),_f=cc>=-.4?qt*(cc+.4):w(0,-8,Math.min(1,(-.4-cc)/5.6));return w(_f,Qe(Wt,Vt),p(0,30,fr))}:(Wt,Vt)=>{let tn=(Vt-Ct)/qt,Vn=(dn-Wt)/qt,fr=qt*Math.hypot(Math.max(0,Math.abs(tn)-150),Math.max(0,Math.abs(Vn-25)-125));return fr>=24?Qe(Wt,Vt):w(Ot.lv,Qe(Wt,Vt),p(0,24,fr))}},port:null,mapProj:!1,locals:[],hole:(Qe,dt,yt=1)=>W(Qe,dt)<L[0]*yt,landF:(Qe,dt,yt)=>{let Ot=new $(...an(Qe,dt,1)),sn=Math.acos(Math.min(1,Ot.dot(k)))*8e3;if(sn>3300)return yt(Qe,dt);let[qt,dn]=Y(Ot);return sn>1250?yt(Qe,dt)+Ze(qt,dn,sn)*.004:E+vt.HF(qt,dn)*.004}};return vt}function*ae(M){let N=M.geometry.attributes.position,P=N.array;performance.now()>A.end&&(yield 1413);for(let L=0;L<P.length;L+=3){performance.now()>A.end&&(yield 1414);let E=c.xyz(P[L],P[L+1],P[L+2]);P[L]=E[0],P[L+1]=E[1],P[L+2]=E[2]}performance.now()>A.end&&(yield 1419),N.needsUpdate=!0,performance.now()>A.end&&(yield 1420),M.geometry.computeBoundingSphere()}var re=new Mn(40,nn/mn,1,9e3),We={a:.8,b:11.6,r1:1.4,r2:3},$e={a:We.b+2.2,b:We.b+11.7,r1:1.4,r2:2.6,pan:6.5},qe=Math.log(260),it=Math.log(60),ot,St,Et,rt,kt,en,$t,Gt,zt=null,je=M=>Ls(M,We.a,We.b,We.r1,We.r2)*(qe-Et),wn=M=>Ls(M,$e.a,$e.b,$e.r1,$e.r2)*(Et-rt);function Nt(M,N,P,L){let E=c.xf(M),k=E.clone().normalize(),H=c.E.clone().addScaledVector(k,-c.E.dot(k)).normalize(),B=H.clone().cross(k),D=H.clone().multiplyScalar(Math.cos(P)*Math.sin(N)).addScaledVector(k,Math.sin(P)).addScaledVector(B,Math.cos(P)*Math.cos(N)),Z=H.clone().multiplyScalar(-Math.sin(P)*Math.sin(N)).addScaledVector(k,Math.cos(P)).addScaledVector(B,-Math.sin(P)*Math.cos(N));re.position.copy(E).addScaledVector(D,L),re.up.copy(Z),re.lookAt(E)}function bn(M){let N;if(M<$e.a){let L=qe-je(M);N=Math.exp(L),Nt(ot,en,w(Math.PI/2,kt,T((it-L)/(it-Et))),N)}else{N=Math.exp(Et-wn(M));let L=T((M-$e.a)/$e.pan);Nt(ot.map((E,k)=>w(E,St[k],L)),w(en,Gt,L),w(kt,$t,L),N)}let P=re.position.length()-100;return re.near=Math.max(.002,P*w(.08,.3,p(5,20,P))),re.far=P>20?re.position.length()+3100:N*4+40,re.updateProjectionMatrix(),re.updateMatrixWorld(),{dist:N,alt:P}}function Yn(M,N=M,P=!1,L=!1){let{dist:E,alt:k}=bn(M);for(let Y of a.movers)Y(N);for(let Y of c.locals){let W=Y.userData.site,z=W?c.port.s2r([Y.position.x,Y.position.y,Y.position.z]):[Y.position.x,Y.position.y,Y.position.z],te=c.K*(W?c.port.k:1),be=c.xf(z),Le=be.clone().normalize(),De=c.E.clone().addScaledVector(Le,-c.E.dot(Le)).normalize(),Ze=De.clone().cross(Le);Y.matrix.makeBasis(De,Le,Ze).multiply(new Yt().makeRotationY(Y.rotation.y-(W?Math.PI/2:0))).scale(new $(te*Y.scale.x,te*Y.scale.y,te*Y.scale.z)).setPosition(be),Y.matrixWorldNeedsUpdate=!0}o.fog.near=E*.9+150*c.K,o.fog.far=o.fog.near+Math.max(1700*c.K,E*1.5);let H=re.position.length(),B=re.position.clone().normalize();for(let Y of Oo){let W=Y.userData.r;if(H<=W*1.001){Y.visible=!1;continue}Y.visible=!0,Y.position.copy(B).multiplyScalar(W*W/H),Y.scale.setScalar(W*Math.sqrt(1-(W/H)**2)),Y.lookAt(re.position),Y.material.opacity=Y.userData.o*p(6,40,k)}s.setRenderTarget(null),s.render(o,re);let D=M<zt.rIn0-.3?"planet":M<zt.sIn0-.3?"region":"site",Z=D==="planet"?1-p(zt.pOut0,zt.pOut1,M):D==="region"?p(zt.rIn0,zt.rIn1,M)*(1-p(zt.rOut0,zt.rOut1,M)):p(zt.sIn0,zt.sIn1,M);for(let Y of Io){let W=i[Y],z=Y===D;W.hud.classList.toggle("on",z),W.ov.classList.toggle("on",z&&!L),W.ov.classList.toggle("dim",P||Z<.6),W.hud.classList.toggle("dim",P||Z<.6),z&&(W.hud.style.opacity=W.ov.style.opacity=String(Z))}return D}function*mi(){a={movers:[]},performance.now()>A.end&&(yield 1504),c=pe(),performance.now()>A.end&&(yield 1505);let M=()=>{_=new Map,b=new Map,F=[],we.clear()};performance.now()>A.end&&(yield 1511),M(),performance.now()>A.end&&(yield 1512);let N=o=new vr;performance.now()>A.end&&(yield 1513),yield*ko("mixed"),performance.now()>A.end&&(yield 1514),c.HF=V,performance.now()>A.end&&(yield 1515);let P=new vr;performance.now()>A.end&&(yield 1516);for(let z of[...N.children])performance.now()>A.end&&(yield 1517),z.userData.local?(z.matrixAutoUpdate=!1,c.locals.push(z)):yield*ae(z),P.add(z);performance.now()>A.end&&(yield 1523),M(),performance.now()>A.end&&(yield 1524),o=P,performance.now()>A.end&&(yield 1525);let L=yield*lc();performance.now()>A.end&&(yield 1526),o.fog=new es(Kl,1,2),performance.now()>A.end&&(yield 1527),M(),performance.now()>A.end&&(yield 1528),l=-6,c.S.forEach((te,be)=>{d=tt(be);let Le=c.items[be].st,De=J(st,2,.9),Ze=J(lr[Le],2.4,1);for(let gt=0;gt<45;gt++){let _t=u()*6.283,It=te.r*1.5*Math.sqrt(u()),vt=te.x+Math.cos(_t)*It,Qe=te.z+Math.sin(_t)*It;(gt%4===0?Ze:De).push(...c.xyz(vt,Math.max(1,V(vt,Qe))+2,Qe))}}),yield*ge(P),l=0,performance.now()>A.end&&(yield 1542),ot=[100,0,-50],performance.now()>A.end&&(yield 1543);let E=new $(10,430,660);performance.now()>A.end&&(yield 1544),Et=Math.log(E.length()*c.K),performance.now()>A.end&&(yield 1545),kt=Math.asin(E.y/E.length()),performance.now()>A.end&&(yield 1546),en=Math.atan2(E.x,E.z),performance.now()>A.end&&(yield 1547),St=c.port.s2r([0,0,{harbor:35,village:10,farm:30}[Be]]),performance.now()>A.end&&(yield 1548),rt=Math.log({harbor:320,village:230,farm:280}[Be]*c.port.k*c.K),performance.now()>A.end&&(yield 1549),$t=Math.atan2(200,260),performance.now()>A.end&&(yield 1550),Gt=70*Qn,performance.now()>A.end&&(yield 1551),zt={pOut0:.8,pOut1:1.3,rIn0:We.b,rIn1:We.b+.5,rOut0:$e.a,rOut1:$e.a+.4,sIn0:$e.b,sIn1:$e.b+.5},performance.now()>A.end&&(yield 1552),bn(0),performance.now()>A.end&&(yield 1553),me=re,performance.now()>A.end&&(yield 1554);let k=z=>{r(i.planet.hud,{...z.planet,tabCol:Oh[z.planet.tabTone],hint:t.hint.planet}),r(i.region.hud,{...z.region.chrome,tabCol:Oh[z.region.chrome.tabTone],hint:t.hint.region});let te=z.region.pipelines.find(be=>be.key===j.key)||j;r(i.site.hud,{...te.chrome,tabCol:Oh[te.chrome.tabTone],hint:t.hint[Be]})};performance.now()>A.end&&(yield 1560);for(let z of Io)performance.now()>A.end&&(yield 1561),i[z].hud.classList.add("on");performance.now()>A.end&&(yield 1561),k(e),performance.now()>A.end&&(yield 1562),Fo(i.planet.ov,L,[]),performance.now()>A.end&&(yield 1563),bn(zt.rIn1),performance.now()>A.end&&(yield 1564),c.mapProj=!0,performance.now()>A.end&&(yield 1565),Fo(i.region.ov,c.items,c.S.map(oc)),performance.now()>A.end&&(yield 1566),bn(zt.sIn1),performance.now()>A.end&&(yield 1567),Fe(i.site.ov,c.portItems,{top:130}),performance.now()>A.end&&(yield 1568),c.mapProj=!1,performance.now()>A.end&&(yield 1569);for(let z of Io)performance.now()>A.end&&(yield 1570),i[z].hud.classList.remove("on");performance.now()>A.end&&(yield 1570),yield*Dy(s,o,re);let H=[...P.children],B=H.map(z=>z.visible),D=[];performance.now()>A.end&&(yield 1571),P.traverse(z=>{D.push([z,z.frustumCulled]),z.frustumCulled=!1}),performance.now()>A.end&&(yield 1575);for(let z of H)performance.now()>A.end&&(yield 1576),z.visible=!1;performance.now()>A.end&&(yield 1576);let Z=new jt,Y=new jt;performance.now()>A.end&&(yield 1577);for(let z=0;z<H.length;z+=6){performance.now()>A.end&&(yield 1578);let te=H.slice(z,z+6),be=s.getScissorTest();s.getViewport(Z),s.getScissor(Y),s.setRenderTarget(null),s.setViewport(0,0,1,1),s.setScissor(0,0,1,1),s.setScissorTest(!0);for(let Le of te)!(++A.n&255)&&performance.now()>A.end&&(yield 1586),Le.visible=!0;s.render(P,re);for(let Le of te)!(++A.n&255)&&performance.now()>A.end&&(yield 1588),Le.visible=!1;s.setViewport(Z),s.setScissor(Y),s.setScissorTest(be)}performance.now()>A.end&&(yield 1592),H.forEach((z,te)=>{z.visible=B[te]}),performance.now()>A.end&&(yield 1595);for(let[z,te]of D)performance.now()>A.end&&(yield 1596),z.frustumCulled=te;performance.now()>A.end&&(yield 1596);let W={planet:.75,region:zt.rIn1+.1,site:zt.sIn1+.1};return performance.now()>A.end&&(yield 1597),{scene:P,stops:W,board:e.region.slug,focus:j.key,spots:Xe,home:c.N.clone(),frame:Yn,rehud:k,dispose(){for(let z of Io)i[z].ov.remove(),i[z].hud.remove();Ly(P)}}}function*Wi(){let M=[];performance.now()>A.end&&(yield 1617),l=4,performance.now()>A.end&&(yield 1618),G(st,.9).push(-240,2.25,0,240,2.25,0),performance.now()>A.end&&(yield 1622),l=.5,performance.now()>A.end&&(yield 1623);for(let H=-234;H<240;H+=8)performance.now()>A.end&&(yield 1624),oe(He(.35,.45,.8,8),{pos:[H,2.6,1]});performance.now()>A.end&&(yield 1624);{let H=G(st,.45);for(let D of[3,4.4,15,16.4])performance.now()>A.end&&(yield 1627),H.push(-240,2.25,D,240,2.25,D);l=.4;let B=G(st,.45);for(let D=-240;D<240;D+=1.5)performance.now()>A.end&&(yield 1630),B.push(D,2.25,2.8,D,2.25,4.6,D,2.25,14.8,D,2.25,16.6)}performance.now()>A.end&&(yield 1631),l=3,performance.now()>A.end&&(yield 1632);{let H=ne(-118,2.2,52,0);oe(Ae(60,12,22),{m:H,pos:[0,6,0],op:1});for(let B=-27;B<=27;B+=6)performance.now()>A.end&&(yield 1636),ie(H,[B,0,11.02],[B,12,11.02],st,.4);oe(ue(61,4,23),{m:H,pos:[0,12,0]});for(let B of[-18,0,18])performance.now()>A.end&&(yield 1638),le(H,[[B-3.5,0,11.03],[B-3.5,7,11.03],[B+3.5,7,11.03],[B+3.5,0,11.03]],st,.9)}performance.now()>A.end&&(yield 1639),l=1.5,performance.now()>A.end&&(yield 1640);for(let H=0;H<6;H++){performance.now()>A.end&&(yield 1641);for(let B=0;B<5;B++){!(++A.n&255)&&performance.now()>A.end&&(yield 1641);let D=1+Math.floor(u()*3);for(let Z=0;Z<D;Z++)!(++A.n&255)&&performance.now()>A.end&&(yield 1643),oe(Ae(12,2.6,2.5),{pos:[-80+H*13.5,2.2+1.3+Z*2.6,30+B*3.2],op:.7})}}performance.now()>A.end&&(yield 1644);let N=Math.min(70,210/Math.max(1,j.units.length-1));performance.now()>A.end&&(yield 1645);let P=j.units.map((H,B,D)=>[H.label,H.st,(B-(D.length-1)/2)*N,H.chip,H.id]);performance.now()>A.end&&(yield 1646);let L=!j.counts.work;performance.now()>A.end&&(yield 1647);for(let[H,B,D,Z,Y]of P){performance.now()>A.end&&(yield 1648);let W=lr[B],z=B==="work";l=6;let te=yield*As(D,0,W,z);Bt(ne(D,-.4,-18,0),Math.min(62,N*.88),13,z?.55:1,z?hn:st,.95),l=1,z&&he(K(ne(D,0,-24,0),[0,12,0]),26,2.2),M.push({name:H,st:B,chip:Z,at:te,id:Y})}performance.now()>A.end&&(yield 1656),l=1,performance.now()>A.end&&(yield 1657);for(let[H,B,D,Z,Y]of[[-78,-35,6.5,0,hn],[-70,35,12.5,.45,hn],[-60,60,9.5,.7,null]]){performance.now()>A.end&&(yield 1658);let W=yield*pi(()=>Cs(0,0,0,L?st:Y));a.movers.push(z=>{let te=L?0:(z/11+Z)%1,be=te<.5?p(0,.45,te):1-p(.5,.95,te);W.position.set(w(H,B,be),0,D),W.rotation.y=te<.5?0:Math.PI})}performance.now()>A.end&&(yield 1665),Cs(-140,22,.1,st),performance.now()>A.end&&(yield 1666),Cs(100,25,Math.PI,st),performance.now()>A.end&&(yield 1667),l=4,performance.now()>A.end&&(yield 1668);{let H=[[[-200,-10],[-120,-120],[-26,-175]],[[200,-10],[150,-120],[26,-175]]];for(let B of H){performance.now()>A.end&&(yield 1671);for(let D=0;D<B.length-1;D++){!(++A.n&255)&&performance.now()>A.end&&(yield 1672);let[Z,Y]=B[D],[W,z]=B[D+1],te=Math.hypot(W-Z,z-Y);oe(Ae(te,4,6),{pos:[(Z+W)/2,0,(Y+z)/2],rot:[0,-Math.atan2(z-Y,W-Z),0],op:.85})}}l=2;for(let B of[-1,1]){performance.now()>A.end&&(yield 1678);let D=B*26,Z=-175;oe(He(1.6,2.6,16,10),{pos:[D,10,Z],color:Nn}),oe(He(2.6,2.6,.6,12),{pos:[D,18.2,Z],color:Nn}),oe(He(1.3,1.3,2.4,8),{pos:[D,19.7,Z],color:Nn,fill:!1}),oe(new bi(1.7,2,8),{pos:[D,21.9,Z],color:Nn}),oe(Ae(1.4,9,27),{pos:[B*12.5,2.5,Z-6],rot:[0,B*1.2,0],color:Nn})}for(let B of j.gate?[j.gate]:[])performance.now()>A.end&&(yield 1686),M.push({name:B.label,st:B.st,chip:B.chip,at:[0,9,-180],id:B.id})}performance.now()>A.end&&(yield 1687),l=4,performance.now()>A.end&&(yield 1688),Bt(ne(-20,-.4,-250,.3),70,13,1,st,.6),performance.now()>A.end&&(yield 1689),Bt(ne(70,-.4,-80,-.4),16,5,0,st,.9),performance.now()>A.end&&(yield 1690),l=2,performance.now()>A.end&&(yield 1691);let E=0;performance.now()>A.end&&(yield 1692);for(let H=0;H<800&&E<90;H++){performance.now()>A.end&&(yield 1693);let B=f(-230,230),D=f(70,170);V(B,D)>60||(X(B,D,f(-.2,.2)+(u()<.5?0:Math.PI/2),{w:f(5,9),d:f(5,8),h:f(3.5,8),rh:f(1.2,2.8),op:.7}),E++)}performance.now()>A.end&&(yield 1698);let k=0;performance.now()>A.end&&(yield 1699);for(let H=0;H<6e3&&k<600;H++){performance.now()>A.end&&(yield 1700);let B=f(-235,235),D=f(-195,195),Z=V(B,D);Z<4||Z>300||lt(B,D,3)||S(B/50,D/50,3,41)<.47||(mt(B,D,f(2,3),"c",.7),k++)}return performance.now()>A.end&&(yield 1706),h=-2,performance.now()>A.end&&(yield 1707),l=1.5,performance.now()>A.end&&(yield 1708),yield*Ie(2600,-240,240,-200,0,-.4,.28),performance.now()>A.end&&(yield 1709),h=0,performance.now()>A.end&&(yield 1710),M}function*Ht(){let M=[],N=j.units,P=N.length,L=Math.min(26,130/Math.max(1,P-1)),E=j.gate;performance.now()>A.end&&(yield 1714),l=3,performance.now()>A.end&&(yield 1715),nt([[-120,-16],[120,-16]],5,{op:.7,center:!0}),performance.now()>A.end&&(yield 1716),nt([[0,-16],[0,-100]],4,{op:.6}),performance.now()>A.end&&(yield 1717),nt([[0,-16],[0,40],[-12,90]],3.2,{op:.55,n:8}),performance.now()>A.end&&(yield 1718),N.forEach((B,D)=>{let Z=(D-(P-1)/2)*L,Y=lr[B.st],W=B.st==="work";l=3;let z=X(Z,4,Math.PI,{w:Math.min(13,L-5),d:8,h:5,rh:3.6,color:Y,op:1,chim:!0});oe(Ae(8,.3,4),{m:z,pos:[0,4.2,6],rot:[-.25,0,0],color:Y,op:.9});for(let te of[-3.6,3.6])ie(z,[te,0,7.8],[te,3.7,7.8],Y,.9);if(oe(Ae(4,.9,1.4),{m:z,pos:[-1,.45,6],color:Y}),l=1,W){he(K(z,[-1,1.4,6]),40,1.6);let te=K(z,[-1,0,7.6]),be=K(z,[1.8,0,6.6]);ee(te[0],te[2],0,hn,"work"),ee(be[0],be[2],2,hn,"work"),C(K(z,[3.6,9,1]),18,st,200,.4),At(z,[2.8,.9,6],[1.3,1,1],hn)}else At(z,[2.5,0,6.5],[1.6,1.2,1.3],B.st==="fail"?Y:st);M.push({name:B.label,st:B.st,chip:B.chip,at:K(z,[0,10,0]),id:B.id})}),performance.now()>A.end&&(yield 1736),l=3,performance.now()>A.end&&(yield 1737);{for(let[D,Z]of[[-130,-9],[9,130]])performance.now()>A.end&&(yield 1740),oe(Ae(Z-D,6,2.6),{pos:[(D+Z)/2,3,-66],op:.85});for(let D of[-1,1])performance.now()>A.end&&(yield 1741),oe(Ae(7,14,7),{pos:[D*9.5,7,-66],color:Nn}),oe(new bi(5.6,6,4),{pos:[D*9.5,17,-66],rot:[0,Math.PI/4,0],color:Nn});oe(Ae(12,4,4),{pos:[0,9,-66],color:Nn}),E&&M.push({name:E.label,st:E.st,chip:E.chip,at:[0,13,-66],id:E.id})}performance.now()>A.end&&(yield 1747);{let B=X(-44,46,0,{w:22,d:11,h:7,rh:5,chim:!0,op:1});for(let D=0;D<3;D++)performance.now()>A.end&&(yield 1750),At(B,[6+D*2.2,0,7.5],[1.8,1.4,1.4],st)}if(performance.now()>A.end&&(yield 1751),l=1,performance.now()>A.end&&(yield 1752),N.some(B=>B.st==="work"))for(let B of[0,.5]){performance.now()>A.end&&(yield 1753);let D=yield*pi(()=>{se(0,0,0,hn,1.3),ee(1.6,2.2,0)});a.movers.push(Z=>{let Y=(Z/14+B)%1,W=Y<.5?p(0,.45,Y):1-p(.5,.95,Y);D.position.set(w(-100,100,B?1-W:W),0,B?-14:-18),D.rotation.y=Y<.5==!B?0:Math.PI})}performance.now()>A.end&&(yield 1763),l=2,performance.now()>A.end&&(yield 1764);let k=0;performance.now()>A.end&&(yield 1765);for(let B=0;B<900&&k<44;B++){performance.now()>A.end&&(yield 1766);let D=f(-140,140),Z=f(26,130);Math.hypot(D,Z-50)>110||lt(D,Z,5)||(X(D,Z,(u()<.5?0:Math.PI/2)+f(-.15,.15),{w:f(6,10),d:f(5,7),h:f(3.5,5.5),rh:f(2.4,3.4),op:.78,chim:u()<.4}),k++)}performance.now()>A.end&&(yield 1771);let H=0;performance.now()>A.end&&(yield 1772);for(let B=0;B<4e3&&H<160;B++){performance.now()>A.end&&(yield 1773);let D=f(-150,150),Z=f(-100,150);(Z<-72?Math.abs(D)<12:Math.hypot(D,Z-40)<118||Z<0)||lt(D,Z,3)||S(D/40,Z/40,3,61)<.45||(mt(D,Z,f(1.8,2.6),u()<.5?"c":"d",.7),H++)}return performance.now()>A.end&&(yield 1779),M}function rn(){let M=[],N=j.units,P=N.length,L=Math.min(3,P),E=Math.ceil(P/L),k=60,H=34,B=j.gate,D=E*46+22;l=3;let Z=-L*35-6;nt([[-130,-32],[130,-32]],4,{op:.65}),nt([[0,-32],[0,-100]],3.4,{op:.55}),nt([[Z,-32],[Z,D+20]],3,{op:.5}),N.forEach((W,z)=>{let te=z%L,be=Math.floor(z/L),Le=(te-(L-1)/2)*70,De=be*46,Ze=W.st==="work",gt=lr[W.st];if(l=2,Ut(Le,De,0,k,H,gt,Ze?.6:.38,Ze?.55:1,st),l=1,Ze){let _t=Le-k/2+k*.55+2;zn(_t,De,Math.PI/2,hn,1.5),C([_t+1.8,6,De],8,st,80,.35);let It=J(hn,1.6,.6);for(let vt=0;vt<120;vt++)It.push(_t-f(3,8),f(0,2.5),De+f(-8,8))}else for(let _t=0;_t<8;_t++)oe(He(.85,.85,1.5,12),{pos:[Le-21+_t%4*14+f(-2,2),.9,De-8+Math.floor(_t/4)*16+f(-2,2)],rot:[Math.PI/2,f(0,3),0],op:.9,color:W.st==="fail"?gt:st});M.push({name:W.label,st:W.st,chip:W.chip,at:[Le,3,De],id:W.id})}),l=1;for(let W=0;W<E-1;W++)for(let z=-104;z<=104;z+=5)Math.abs(z)>5&&mt(z+f(-1,1),W*46+23+f(-1,1),f(1.1,1.5),"d",.7);l=3;{let W=X(-60,D,0,{w:22,d:13,h:7,rh:6,op:1});le(W,[[-4,0,6.52],[-4,6,6.52],[4,6,6.52],[4,0,6.52]],st,.9),X(-88,D+6,.1,{w:10,d:7,h:4.5,rh:3,chim:!0,op:.9})}{oe(Ae(8,34,8),{pos:[44,17,D],color:Nn}),oe(Ae(10,5,10),{pos:[44,36.5,D],color:Nn}),oe(ue(10.5,2.5,10.5),{pos:[44,39,D],color:Nn});for(let z of[-1,1]){let te=44+z*11;oe(He(4,4,22,16),{pos:[te,11,D+2],color:Nn}),oe(new bi(4.2,3,16),{pos:[te,23.5,D+2],color:Nn}),ie(null,[44,34,D],[te,24.5,D+2],Nn,.8),ke(te,D+2,6)}ke(44,D,8),B&&M.push({name:B.label,st:B.st,chip:B.chip,at:[44,40,D],id:B.id})}l=2;let Y=0;for(let W=0;W<4e3&&Y<160;W++){let z=f(-150,150),te=f(-100,150);Math.abs(z)<112&&te>-40&&te<D+16||lt(z,te,3)||S(z/40,te/40,3,71)<.45||(mt(z,te,f(1.8,2.6),u()<.6?"d":"c",.7),Y++)}return M}function*gi(M,N){let P=c.port,L=[_,b,F,V,l,h],E=new Map(we),k=o.children.length;performance.now()>A.end&&(yield 1839),_=new Map,performance.now()>A.end&&(yield 1840),b=new Map,performance.now()>A.end&&(yield 1841),F=[],performance.now()>A.end&&(yield 1842),V=Be==="harbor"?Rs:()=>0,performance.now()>A.end&&(yield 1843),we.clear(),performance.now()>A.end&&(yield 1844),l=0,performance.now()>A.end&&(yield 1845),h=0,performance.now()>A.end&&(yield 1846);let H=Be==="village"?yield*Ht():Be==="farm"?rn():yield*Wi(),B=new si;performance.now()>A.end&&(yield 1847),yield*ge(B),performance.now()>A.end&&(yield 1848);for(let Z of[...B.children]){performance.now()>A.end&&(yield 1849);let Y=Z.geometry.attributes.position.array;for(let W=0;W<Y.length;W+=3){!(++A.n&255)&&performance.now()>A.end&&(yield 1851);let z=P.s2r([Y[W],Y[W+1],Y[W+2]]);Y[W]=z[0],Y[W+1]=z[1],Y[W+2]=z[2]}Z.geometry.attributes.position.needsUpdate=!0,o.add(Z)}performance.now()>A.end&&(yield 1859);for(let Z of o.children.slice(k))performance.now()>A.end&&(yield 1860),Z.isGroup&&Z.userData.local&&(Z.userData.site=!0);performance.now()>A.end&&(yield 1860),[_,b,F,V,l,h]=L,performance.now()>A.end&&(yield 1861),we.clear(),performance.now()>A.end&&(yield 1862),E.forEach((Z,Y)=>we.set(Y,Z)),performance.now()>A.end&&(yield 1863);let D=Be==="harbor"?[-240,240,10,200]:[-160,160,-100,160];performance.now()>A.end&&(yield 1864);for(let Z=D[0];Z<=D[1];Z+=40){performance.now()>A.end&&(yield 1865);for(let Y=D[2];Y<=D[3];Y+=40){!(++A.n&255)&&performance.now()>A.end&&(yield 1865);let[W,,z]=P.s2r([Z,0,Y]);ke(W,z,14)}}return performance.now()>A.end&&(yield 1868),c.portItems=H.map(Z=>({...Z,at:P.s2r(Z.at)})),performance.now()>A.end&&(yield 1869),P.s2r(Be==="harbor"?[0,47,9]:[0,24,20])}return mi()}function jd(n,e){let{words:t,onPick:i,onFallback:r,onStop:s}=e,o=Py();if(o)return r(o),{update(){},destroy(){}};let a=Zt("div","wlw"),c=Zt("div","wlw-stage"),l=Zt("div","wlw-note");l.setAttribute("role","status");let h=()=>{let ye=n.getBoundingClientRect(),oe=Math.max(.1,Math.min(ye.width/nn,ye.height/mn));return c.style.transform=`translate(${(ye.width-nn*oe)/2}px, ${(ye.height-mn*oe)/2}px) scale(${oe})`,oe},d=new Yl({antialias:!0});a.append(Zt("style",null,Cy),c,l),n.append(a),d.setPixelRatio(Math.min(2,Math.max(1,(window.devicePixelRatio||1)*h()))),d.setSize(nn,mn,!1),d.setClearColor(Kl),c.append(d.domElement,Zt("div","vig"));let u=[],f={renderer:d,words:t,layers(){let ye={};for(let oe of Io){let Ae=Zt("div","layer"),He=Zt("div","layer");Ae.dataset.kind=Ay[oe],c.append(Ae,He),ye[oe]={ov:Ae,hud:He},u.push(Ae,He)}return ye}},p=new ResizeObserver(()=>h());p.observe(n);let w=null,g=null,m=e.data,S=null,U=!1,v=!1,R=null,I=null,O=null,_=null,b=!1,F=!1,G=0,J=0,ne=[],q=(ye,oe)=>{console.warn(`[wingline] the world view ${ye} failed`,oe),et(),r(`${ye}: ${oe?.message||oe}`)},K=ye=>{if(!ye?.region?.pipelines?.length){q("build",new Error("the open board has no pipelines"));return}let oe=_||w,Ae=oe&&oe.board===ye.region.slug,He=S||(Ae?oe.focus:null),ue={...ye,focus:He,keepSites:Ae?oe.spots:void 0};u.length=0;let ge;try{ge=ky(f,ue)}catch(Ce){q("build",Ce);return}let V={g:ge,board:ye.region.slug,sig:zh(ye),nodes:u.slice(),slow:[],from:"start"};g=V,l.textContent=w?t.updating:t.loading;let we=new MessageChannel;we.port1.onmessage=()=>{if(F||g!==V)return;let Ce=performance.now();A.end=Ce+A.ms;let ke;try{ke=ge.next()}catch(Ie){A.end=1/0,g=null;for(let Pe of V.nodes)Pe.remove();q("build",Ie);return}A.end=1/0;let lt=performance.now()-Ce,xe=ke.done?"end":ke.value;if(lt>30&&V.slow.push([V.from,xe,Math.round(lt)]),V.from=xe,!ke.done){we.port2.postMessage(0);return}g=null,l.textContent="";let Ee={...ke.value,sig:V.sig,slow:V.slow};if(U&&m?.region?.slug!==Ee.board){Ee.dispose(),U=!1,K(m);return}if(w&&w.board!==Ee.board&&R!==w.stops.planet?(_=Ee,I=w.stops.planet):ie(Ee),U){U=!1;let Ie=_||w;zh(m)!==Ie.sig||S?K(m):Ie.rehud(m)}},we.port2.postMessage(0)},ie=ye=>{let oe=w;if(w=ye,S===ye.focus&&(S=null),!oe)R=I=ye.stops[e.stop in ye.stops?e.stop:"region"];else if(oe.board!==ye.board){R=ye.stops.planet,I=ye.stops.planet;let Ae=new Pn().setFromUnitVectors(oe.home,ye.home);O={q:Ae,t0:performance.now()},ye.scene.quaternion.copy(Ae)}v&&(v=!1,I=ye.stops.site),oe&&oe.dispose(),e.onSwap?.({board:ye.board,focus:ye.focus,first:!oe,slow:ye.slow}),b=!0},le=ye=>{w&&(I=w.stops[ye],s?.(ye))},ve=()=>R<w.stops.region-1?"planet":R<w.stops.site-1?"region":"site",ce=(ye,oe)=>{!w||O||(ye==="board"?oe===w.board?le("region"):i("board",oe):ye==="pipe"?oe===w.focus?le("site"):(S=oe,v=!0,g?U=!0:K(m)):ye==="task"&&i("task",oe))},_e=ye=>{if(ye.target.closest?.("[data-nav]"))return le(ve()==="site"?"region":"planet"),!0;let Ae=ye.target.closest?.(".tg");return!Ae||!Ae.dataset.id?!1:(ce(Ae.parentElement?.dataset.kind,Ae.dataset.id),!0)};a.addEventListener("click",_e),a.addEventListener("keydown",ye=>{(ye.key==="Enter"||ye.key===" ")&&_e(ye)&&ye.preventDefault()});let Se=ye=>{if(G=requestAnimationFrame(Se),!w||document.visibilityState==="hidden"||!a.isConnected){J=0;return}let oe=J?Math.min(.1,(ye-J)/1e3):0;if(J&&ne.length<40&&ye-J<900&&(ne.push(ye-J),ne.length===40)){let He=ne.slice(10).sort((ge,V)=>ge-V),ue=1e3/He[He.length>>1];if(ue<Jd){q("frame rate check",new Error(`${ue.toFixed(0)} frames per second, needs ${Jd}`));return}}if(J=ye,_&&R===w.stops.planet){let He=_;_=null,ie(He)}if(O){let He=Iy(0,1,(ye-O.t0)/1400);w.scene.quaternion.slerpQuaternions(O.q,new Pn,He),He>=1&&(O=null,I=w.stops.region)}else if(R!==I){let He=oe*Ey;R=Math.abs(I-R)<=He?I:R+Math.sign(I-R)*He}let Ae=performance.now();if(w.frame(R,ye/1e3,!!O||R!==I),b){b=!1;let He=performance.now()-Ae;He>30&&e.onSlowFrame?.(Math.round(He))}};G=requestAnimationFrame(Se);function et(){F||(F=!0,cancelAnimationFrame(G),p.disconnect(),g=null,_?.dispose(),_=null,w?.dispose(),w=null,d.dispose(),d.forceContextLoss(),a.remove())}return K(m),{update(ye){if(F||!ye)return;let oe=m?.region?.slug;m=ye,ye.region?.slug!==oe&&(S=null,w&&(I=w.stops.planet)),g?U=!0:w?zh(ye)!==w.sig?K(ye):w.rehud(ye):K(ye)},destroy:et}}var Ir="wingline",ef="/wingline",Vy=5e3,Gy=360,Hy="/api/plugins/kanban",tf="view",Gh="board",Hh="worldSpots",nf="worldStop",Wy=131072,ys={working:260,timeline:520,error:160,log:300,problems:132,dialog:720},qh=["builder","review","gate","detective"],No={builder:"var(--ui-blue)",review:"var(--ui-purple)",gate:"var(--ui-orange)",detective:"var(--ui-cyan)"},Xy=["blocked","running","todo","ready","triage","scheduled","review","done","archived"],df={blocked:"var(--ui-yellow)",running:"var(--ui-accent)",done:"var(--ui-green)",archived:"var(--ui-text-quaternary)"},$y={needs:["blocked"],working:["running"],queued:["todo","ready","triage"],done:["done"]},qy=["completed","ok","done","review_requested"],Yy=["blocked","changes_requested","needs_input"],Pr=null,Yh={en:{wingline:{title:"Wingline",subtitle:"Your Kanban boards, from the human side",nav:"Wingline",boardPick:"Kanban board",boardOpt:(n,e)=>`${n} · ${e===1?"1 task":`${e} tasks`}`,raw:"Raw error",view:{label:"View",board:"Board",factory:"Factory"},world:{st:{done:"Done",work:"Working",fail:"Needs you",wait:"Waiting"},boardChip:(n,e)=>`${n} · ${e===1?"1 task":`${e} tasks`}`,emptyChip:"No tasks yet",pipeChip:(n,e)=>`${n} · ${e}`,pipeDone:(n,e,t)=>`${n} · ${e}/${t}`,allNeed:n=>`All boards · ${n===1?"1 needs you":`${n} need you`}`,allClear:"All boards · nothing needs you",boardNeed:(n,e)=>`${n} · ${e===1?"1 needs you":`${e} need you`}`,boardsClear:(n,e)=>`${n}/${e} boards clear`,tasksDone:(n,e)=>`${n}/${e} done`,k:{boards:"Boards",tasks:"Tasks",spent:"Spent",pipelines:"Pipelines",runs:"Runs",working:"Working",needs:"Needs you",waiting:"Waiting",done:"Done"},unitChip:(n,e)=>`${n} · ${e}`,allBoards:"All boards",hint:{planet:"Each light is a board · click one to fly down to it",region:"Each place is a pipeline · farm under $4 · village $4–10 · port over $10 · click one to land",harbor:"Each berth is a task · cranes and trucks are the agents · click one for its details and log",village:"Each workshop is a task · workers and carts are the agents · click one for its details and log",farm:"Each field is a task · tractors are the agents · click one for its details and log"},loading:"Charting the boards…",updating:"Redrawing what changed…",off:n=>`World view is off on this computer (${n}), so the Board shows the lists only.`,label:"Board world: planet of boards, region of pipelines, site of tasks"},count:{needs:"Needs you",working:"Working",queued:"Queued",done:"Done",spend:"Spend",filter:n=>`Show only ${n} in the timeline`},updated:n=>`Updated ${n}`,loading:"Loading the board…",empty:"This board has no tasks yet.",tryAgain:"Try again",unit:{s:n=>`${n}s`,m:n=>`${n}m`,ms:(n,e)=>`${n}m ${e}s`,hm:(n,e)=>e?`${n}h ${e}m`:`${n}h`},problems:{title:n=>n===1?"1 problem reading or changing the board":`${n} problems reading or changing the board`,dismiss:"Dismiss",overview:"Reading the board",backend:n=>`Wingline backend (${n})`},needs:{title:"Needs you",none:"Nothing is waiting for you.",count:n=>n===1?"1 task":`${n} tasks`,reasonUnknown:"Hermes stopped this task without a reason on record.",retries:(n,e)=>`Retries used ${n}/${e}`,retriesNoMax:n=>`Retries used ${n}`,worked:n=>`${n} worked`,stopped:n=>`stopped ${n}`,attempts:n=>n===1?"1 attempt":`${n} attempts`},working:{title:"Working now",none:"No worker is running.",lastStop:n=>`Last one stopped ${n}.`,nothingYet:"Nothing has run on this board yet.",elapsed:n=>`running for ${n}`,limit:n=>`limit ${n}`,noActivity:"No activity reported yet.",ago:n=>`${n} ago`},pipe:{title:"Pipeline",sub:"every group on this board",dep:"waits for",seq:"next attempt or review of the same work"},tl:{title:"Timeline",sub:"grouped by pipeline · idle stretches squeezed, working time at true length",task:"Task",spent:"Spent",other:"Other tasks",group:(n,e,t)=>`${n===1?"1 task":`${n} tasks`} · ${e} · ${t}`,roles:"Roles:"},role:{builder:"Builder",review:"Reviewer",gate:"Gate",detective:"Investigator"},status:{blocked:"Needs you",running:"Working",todo:"To do",ready:"Ready",triage:"Triage",scheduled:"Scheduled",review:"In review",done:"Done",archived:"Archived",other:"Other"},run:{ok:"finished",stopped:"stopped",outcome:n=>`Hermes recorded: ${n}`,paused:"paused for input",running:"running",attempt:n=>`Attempt ${n}`,took:n=>`took ${n}`,limitHit:n=>`Stopped by its time limit (${n}).`,pastLimit:(n,e)=>`Ran past its time limit (${n}); Hermes recorded the end as ${e}, not as a time-out.`},cost:{estimated:"estimated",actual:"billed",mixed:"partly estimated",none:"no cost recorded"},dr:{pick:"Pick a task to see its details.",spent:"Spent",work:"Working time",attempts:"Attempts",comments:"Comments",assignee:"Assignee",role:"Role",limit:"Time limit",retries:"Retries used",created:"Created",waits:"Waits for",unlocks:"Unlocks",nothing:"nothing",activity:"Now",why:"Why it needs you",error:"Last error",raw:"Error as stored",noRuns:"Not started yet.",noLimit:"none set",close:"Close details",note:"Note for the next worker",notePh:"Add a note…",log:"Worker log",logLoading:"Reading the log…",logNone:"No log: this task never started a worker.",logEmpty:"The log is empty.",logClose:"Hide log",logTrunc:"Showing the end of the log.",logFailed:n=>`The log could not be read: ${n}`},act:{retry:"Retry with more time",details:"Details",log:"Open log",kanban:"Open in Kanban",chat:"Ask in chat",archive:"Archive",note:"Add note"},chat:{prompt:(n,e,t,i,r)=>`About Kanban task ${n} "${e}" on board ${t} (status: ${i}). ${r} What should I do next?`,inserted:"The question is in the chat composer.",copied:"No chat composer answered, so the question was copied to the clipboard. Paste it into a chat.",failed:"Could not reach the chat composer or the clipboard."},dlg:{cancel:"Cancel",close:"Close",retryTitle:"Retry with more time",retryWhy:"Hermes cannot change an existing task's time limit, so a new task is used: Wingline creates it and retires this one.",limit:"New time limit (hours)",limitOld:n=>`Old limit: ${n}. The default is twice the old one, rounded to 30 minutes.`,limitNone:"This task had no time limit. The default is 2 hours.",limitBad:"Enter a time limit of at least 0.5 hours.",willHappen:"These changes happen on the board, in this order:",retriesNote:"The Kanban API does not accept a retry count when it creates a task, so the new task uses the board default for retries.",retryGo:n=>`Create the new task (${n})`,stepRead:n=>`Read ${n} from Hermes Kanban.`,stepCreate:n=>`Create a new task with the same title, body, assignee, priority, parents, skills, goal mode, model/provider/reasoning overrides and workspace (also tenant and project), time limit ${n}.`,stepLink:n=>`Link the new task to child ${n}, so ${n} waits for the new task.`,stepUnlink:(n,e)=>`Remove the old link ${n} → ${e}.`,stepComment:n=>`Add a comment on ${n} naming the new task's id.`,stepArchive:n=>`Archive ${n}.`,noChildren:"No children to re-link: no task waits for this one.",newId:n=>`New task: ${n}`,state:{pending:"Not done",running:"Working…",done:"Done",failed:"Failed"},retryOk:n=>`Done. The new task is ${n}; the old one is archived.`,stoppedAt:"Stopped at the first failure. Steps marked Done already happened on the board; nothing after the failed step ran.",retryComment:(n,e)=>`Wingline retried this task as ${n} with a time limit of ${e}; this task is archived.`,noteTitle:"Add a note",noteWill:n=>`Adds this comment to ${n}, signed "wingline". The next worker on the task reads it.`,noteEmpty:"Write a note first.",noteOk:"The note was added.",archiveTitle:"Archive this task?",archiveWill:n=>`${n} moves to the archived status. It stays readable under archived and can be found again with Kanban's archived filter; nothing is deleted.`,archiveNext:"Continue",archiveSure:"Yes, archive it",archiveSecond:"Second step: confirm once more to archive.",archiveOk:"The task was archived.",failed:n=>`Failed: ${n}`},fx:{aria:"Production line: tasks as packages moving through machines",live:"Live",replay:n=>`Replay · ${n}×`,paused:"Replay · paused",idle:"Line idle — nothing running right now",running:n=>n===1?"1 machine running":`${n} machines running`,working:n=>`${n} working`,play:"Play replay",pause:"Pause replay",now:"Now",nowTip:"Jump to the live state",speed:"Replay speed",scrub:"Replay position",zone:{intake:"INTAKE",build:"BUILD",review:"REVIEW · 4 SCANNERS",merge:"MERGE → GATE",shipped:"SHIPPED",archived:"ARCHIVED",investigate:"INVESTIGATE"},machine:{pressA:"Press A",pressB:"Press B",scan:n=>`Scanner ${n}`,gate:"Gate stamp",lab:"Detective lab"},jam:"Jammed — needs you",held:"Paused — needs input",bin:n=>`NEEDS YOU · ${n}`,clear:"All clear — nothing waiting on you",queueEmpty:"Queue empty",none:"none",crates:n=>n===1?"for 1 crate":`for ${n} crates`,shipped:"shipped",inputs:(n,e)=>`${n}/${e} inputs`,callLimit:"STOPPED · TIME LIMIT",callCrash:"STOPPED · CRASHED",callStop:"STOPPED",callPause:"PAUSED · WAITING FOR INPUT",callMeta:(n,e,t)=>`${n} worked · ${e===1?"1 attempt":`${e} attempts`} · ${t}`,decide:"Click to decide →",more:n=>`+${n}`,where:{intake:"queued",wait:"queued, waiting for its inputs",machine:n=>`working at ${n}`,crash:"stopped — needs you",pause:"paused — needs input",dock:"shipped (done)",scrap:"archived"},pkg:(n,e)=>`${n} — ${e}`,mIdle:n=>`${n}: idle`,mWork:(n,e)=>`${n}: working on ${e}`,mJam:(n,e)=>`${n}: stopped on ${e}`,noTask:n=>`${n} has not processed a task yet at this point.`,replayAt:n=>`In replay at ${n}`},err:{noBridge:"The Hermes desktop bridge is not available, so Wingline cannot reach the Kanban API.",noRest:"The plugin REST door is not available.",shape:"The board answer did not contain a task list.",noId:"Hermes did not return the new task id.",refused:"Hermes answered but did not make the change."}}}};function y(n,e,...t){let{key:i,...r}=e||{};return t.length?t.length===1?$h(n,{...r,children:t[0]},i):By(n,{...r,children:t},i):$h(n,r,i)}var Tt=n=>typeof n=="number"&&Number.isFinite(n),Ci=encodeURIComponent,jn=n=>`$${(Tt(n)?n:0).toFixed(2)}`,fi=n=>qh.includes(n?.role)?n.role:"builder",In=n=>Array.isArray(n?.runs)?n.runs.filter(e=>e&&Tt(e.started_at)):[],Lr=(n,e)=>Tt(n.ended_at)?n.ended_at:e,Ss=(n,e)=>In(n).reduce((t,i)=>t+Math.max(0,Lr(i,e)-i.started_at),0),Uo=n=>{let e=In(n);return e.length?e[e.length-1]:null},_s=n=>String(n?.message||n||""),Zh=n=>Xy.includes(n)?n:"other";function hr(n){if(!Tt(n?.ended_at))return"running";let e=String(n.outcome||n.status||"");return qy.includes(e)?"ok":Yy.includes(e)?"paused":"stopped"}function ff(n){return String(n??"").replace(/\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g,"").replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g,"").replace(/\u001b[@-_]/g,"").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,"")}function gn(n,e){if(!Tt(e)||e<0)return"—";let t=Math.round(e);if(t<60)return n("wingline.unit.s",t);if(t<3600)return t%60?n("wingline.unit.ms",Math.floor(t/60),t%60):n("wingline.unit.m",t/60);let i=Math.round(t/60);return n("wingline.unit.hm",Math.floor(i/60),i%60)}function Nr(n){if(!Tt(n))return"—";let e=new Date(n*1e3),t=e.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}),i=e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"});return`${t} ${i}`}function Zy(n){if(!Tt(n))return["—","--:--"];let e=new Date(n*1e3);return[e.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}),e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"})]}function bs(n,e){try{return Pr?.storage?.get?.(n,e)??e}catch(t){return console.warn(`[${Ir}] could not read ${n} from plugin storage`,t),e}}function tc(n,e){try{Pr?.storage?.set?.(n,e)}catch(t){console.warn(`[${Ir}] could not keep ${n} in plugin storage`,t)}}async function Vi(n,e,t={}){let i=typeof window<"u"?window.hermesDesktop?.api:null;if(typeof i!="function")throw new Error(Yh.en.wingline.err.noBridge);let r=n.includes("?")?"&":"?",s={path:`${Hy}${n}${e?`${r}board=${Ci(e)}`:""}`,method:t.method||"GET"};return t.body!==void 0&&(s.body=t.body),i(s)}function Jy(n,e){let t=[],i=new Set;for(let h of n){Tt(h.created_at)&&i.add(h.created_at);for(let d of In(h)){let u=Lr(d,e);t.push([d.started_at,u]),i.add(d.started_at),i.add(u)}}let r=[...i].sort((h,d)=>h-d);if(r.length<2){let h=r.length?r[0]:e;r.splice(0,r.length,h-60,h)}let s=[0];for(let h=1;h<r.length;h++){let d=r[h]-r[h-1],u=t.some(([f,p])=>f<=r[h-1]&&p>=r[h]);s.push(u?d:Math.min(d,Gy))}let o=[0];for(let h=1;h<r.length;h++)o.push(o[h-1]+s[h]);let a=o[o.length-1]||1,c=h=>{if(h<=r[0])return 0;for(let d=1;d<r.length;d++)if(h<=r[d]){let u=r[d]-r[d-1];return o[d-1]+(u?(h-r[d-1])/u:0)*s[d]}return a},l=h=>{for(let d=1;d<r.length;d++)if(h<=o[d]){let u=o[d]-o[d-1];return r[d-1]+(u?(h-o[d-1])/u:0)*(r[d]-r[d-1])}return r[r.length-1]};return{start:r[0],end:r[r.length-1],span:a,toC:c,toR:l}}function Ky(n){let e=new Set(n.map(o=>o.id)),t=new Map(n.map(o=>[o.id,o.id])),i=o=>{for(;t.get(o)!==o;)t.set(o,t.get(t.get(o))),o=t.get(o);return o},r=(o,a)=>{let c=i(o),l=i(a);c!==l&&t.set(c,l)};for(let o of n){for(let a of o.parents||[])e.has(a)&&r(o.id,a);for(let a of o.children||[])e.has(a)&&r(o.id,a)}let s=new Map;for(let o of n){let a=i(o.id);s.has(a)||s.set(a,[]),s.get(a).push(o)}return[...s.values()]}function rf(n){if(!n.length)return"";let e=n.map(i=>String(i||"").split(" ")),t=[];for(let i=0;i<e[0].length;i++){let r=e[0][i];if(e.some(s=>s[i]!==r))break;t.push(r)}return t.join(" ").replace(/[:\s]+$/,"")}var Es=n=>{let e=In(n)[0];return e?e.started_at:Tt(n.created_at)?n.created_at:0},nc=(n,e)=>Es(n)-Es(e),sf=n=>String(n||"").split(":")[0].replace(/\s*\((?:retry|rerun)\)\s*$/i,"").replace(/\s+(?:review|retry)$/i,"").trim();function Jh(n,e){let t=new Set(n.map(o=>o.id)),i=[],r=[];for(let o of Ky(n)){if(o.length<2){r.push(o[0]);continue}let a=[...o].sort(nc),c=[];for(let l of a)for(let h of l.parents||[])t.has(h)&&c.push({from:h,to:l.id,kind:"dep"});i.push({kind:"chain",name:rf(a.map(l=>l.title))||a[0].title,tasks:a,edges:c})}let s=(o,a,c)=>{let l=new Map;for(let d of o){let u=a(d);l.has(u)||l.set(u,[]),l.get(u).push(d)}let h=[];for(let[d,u]of l)d&&u.length>1?i.push(c(d,[...u].sort(nc))):h.push(...u);return h};return r=s(r,o=>sf(o.title).toLowerCase(),(o,a)=>({kind:"pair",name:sf(a[0].title),tasks:a,edges:a.slice(1).map((c,l)=>({from:a[l].id,to:c.id,kind:"seq"}))})),r=s(r,o=>String(o.title||"").split(" ")[0].toLowerCase(),(o,a)=>({kind:"family",name:rf(a.map(c=>c.title))||o,tasks:a,edges:[]})),r.length&&i.push({kind:"other",name:e("wingline.tl.other"),tasks:[...r].sort(nc),edges:[],other:!0}),i.sort((o,a)=>(o.other?1:0)-(a.other?1:0)||Es(o.tasks[0])-Es(a.tasks[0])),i}function sc(n,e){let t=String(n?.title||"");return!e||!t.startsWith(e)||t.length<=e.length+1?t:t.slice(e.length).replace(/^[\s:·—-]+/,"")||t}var Do={boards:12,pipelines:12,units:6,label:26},jl={builder:0,review:1,detective:2,gate:3},cr={fail:0,work:1,wait:2,done:3},jy={lat:10,lon:0,radius:46},ic=n=>n==="blocked"?"fail":n==="running"?"work":n==="done"?"done":"wait",Qy=n=>n.reduce((e,t)=>cr[t]<cr[e]?t:e,"done");function pf(n){let e=2166136261;for(let t of String(n))e^=t.codePointAt(0),e=Math.imul(e,16777619)>>>0;return e}function e_(n){let e=n<=48?48:n<=96?96:48*2**Math.ceil(Math.log2(n/48)),t=[],{lat:i,lon:r,radius:s}=jy;for(let o=0;o<e;o++){let a=s*Math.sqrt((o+.5)/e),c=o*2.399963229728653,l=i+a*Math.cos(c);t.push([+l.toFixed(2),+(r+a*Math.sin(c)/Math.cos(l*Math.PI/180)).toFixed(2)])}return t}function t_(n,e){let t=e_(n.length),i=t.length,r=[...new Set(n)].map(h=>({s:h,h:pf(h)})).sort((h,d)=>h.h-d.h||(h.s<d.s?-1:1)),s=new Set,o=new Map,a=[],c=e&&e.tier===i&&e.at&&typeof e.at=="object"?e.at:{},l=[];for(let h of r){let d=c[h.s];Number.isInteger(d)&&d>=0&&d<i&&!s.has(d)?(s.add(d),o.set(h.s,d)):l.push(h)}for(let h of l){let d=h.h%i;s.has(d)?a.push(h):(s.add(d),o.set(h.s,d))}for(let h of a){let d=h.h%i;for(;s.has(d);)d=(d+1)%i;s.add(d),o.set(h.s,d)}return{where:new Map([...o].map(([h,d])=>[h,t[d]])),spots:{tier:i,at:Object.fromEntries(o)}}}function Ms(n,e){return n(e==="fail"?"wingline.world.st.fail":e==="work"?"wingline.world.st.work":e==="wait"?"wingline.world.st.wait":"wingline.world.st.done")}function n_(n,e,t,i){return e==="fail"?n("wingline.world.pipeChip",Ms(n,e),t.fail):e==="work"?n("wingline.world.pipeChip",Ms(n,e),t.work):e==="wait"?n("wingline.world.pipeChip",Ms(n,e),t.wait):n("wingline.world.pipeDone",Ms(n,e),t.done,i)}var Gi=n=>String(n).padStart(2,"0"),of=n=>{let e={fail:0,work:0,wait:0,done:0};for(let t of n)e[t]++;return e},i_=n=>n.reduce((e,t)=>Math.max(e,t.completed_at||0,t.started_at||0,t.created_at||0),0);function r_(n){return n.other?"other":n.kind==="chain"?`chain:${[...n.tasks.map(e=>e.id)].sort()[0]}`:`${n.kind}:${String(n.name).toLowerCase()}`}var mf=n=>n.length>Do.label?`${n.slice(0,Do.label-1)}…`:n;function s_(n,e,t){let i=n.map((l,h)=>{let d=ic(l.status),u=Uo(l),f=sc(l,e);return{id:l.id,title:String(l.title||""),short:f,label:mf(f),role:fi(l),chip:t("wingline.world.unitChip",Ms(t,d),t(`wingline.role.${fi(l)}`)),st:d,i:h,agent:d==="work"?{profile:u?.profile||l.assignee||null,activity:l.activity?.text||null}:null}}),r=i.find(l=>l.role==="gate")||null,s=i.filter(l=>l!==r),a=[...s].sort((l,h)=>cr[l.st]-cr[h.st]||jl[l.role]-jl[h.role]||l.i-h.i).slice(0,Do.units).sort((l,h)=>jl[l.role]-jl[h.role]||l.i-h.i),c=({i:l,...h})=>h;return{units:a.map(c),gate:r&&c(r),more:s.length-a.length}}function o_(n,e,t){let i=Array.isArray(n?.tasks)?n.tasks.filter(b=>b&&typeof b.id=="string"):[],r=Array.isArray(n?.boards)?n.boards.filter(b=>b&&typeof b.slug=="string"):[],s=typeof n?.board=="string"?n.board:r[0]?.slug||null,{where:o,spots:a}=t_(r.map(b=>b.slug),t),c=r.map(b=>{let F=Tt(b.tasks)?b.tasks:0,G={fail:b.needs_you||0,work:b.working||0,wait:b.queued||0,done:b.done||0},J=G.fail?"fail":G.work?"work":G.wait?"wait":"done",[ne,q]=o.get(b.slug);return{slug:b.slug,name:String(b.name||b.slug),n:F,st:J,empty:F===0,chip:F===0?e("wingline.world.emptyChip"):e("wingline.world.boardChip",Ms(e,J),F),lat:ne,lon:q,current:b.slug===s,spend:Tt(b.spend_usd)?b.spend_usd:0,counts:G,last:Tt(b.last_activity)?b.last_activity:0}}),l=[...c].sort((b,F)=>F.current-b.current||cr[b.st]-cr[F.st]||b.empty-F.empty||F.last-b.last),h=new Set(l.slice(0,Do.boards).map(b=>b.slug));for(let b of c)b.labeled=h.has(b.slug);let d=c.reduce((b,F)=>b+F.n,0),u=c.filter(b=>b.counts.fail).length,f=c.filter(b=>b.st==="done").length,p=b=>c.reduce((F,G)=>F+G.counts[b],0),w={tab:u?e("wingline.world.allNeed",u):e("wingline.world.allClear"),tabTone:u?"fail":"work",ticks:{label:e("wingline.world.boardsClear",f,c.length),list:c.map(b=>b.st)},tl:[[e("wingline.world.k.boards"),String(c.length)],[e("wingline.world.k.tasks"),String(d)],[e("wingline.world.k.spent"),jn(c.reduce((b,F)=>b+F.spend,0))]],tr:[[e("wingline.world.k.working"),Gi(p("work"))],[e("wingline.world.k.needs"),Gi(p("fail"))],[e("wingline.world.k.done"),Gi(p("done"))]],more:Math.max(0,c.length-h.size)},g=[],m=0;for(let b of Jh(i,e)){let F=b.tasks.filter(ie=>ie.status!=="archived");if(!F.length){m++;continue}let G=F.map(ie=>ic(ie.status)),J=Qy(G),ne=of(G),q=b.tasks.reduce((ie,le)=>ie+(Tt(le.cost?.usd)?le.cost.usd:0),0),K=r_(b);g.push({key:K,seed:pf(K),name:b.name,kind:b.kind,usd:+q.toFixed(6),place:q<4?"farm":q<=10?"village":"harbor",st:J,counts:ne,n:F.length,runs:F.reduce((ie,le)=>ie+In(le).length,0),chip:n_(e,J,ne,F.length),last:i_(F),ticks:F.map(ie=>ic(ie.status)),...s_(F,b.other?"":b.name,e)})}let S=new Map;for(let b of[...g].sort((F,G)=>F.key<G.key?-1:1))S.set(b.name,[...S.get(b.name)||[],b]);for(let b of S.values())b.length>1&&b.forEach((F,G)=>F.name=`${F.name} (${G+1})`);for(let b of g)b.label=mf(b.name);g.sort((b,F)=>cr[b.st]-cr[F.st]||F.last-b.last||(b.key<F.key?-1:1));let U=g.slice(0,Do.pipelines),v=c.find(b=>b.current),R=i.filter(b=>b.status!=="archived"),I=R.map(b=>ic(b.status)),O=of(I),_=v?{slug:v.slug,name:v.name,pipelines:U,more:g.length-U.length,archivedOnly:m,chrome:{tab:O.fail?e("wingline.world.boardNeed",v.name,O.fail):v.name,back:e("wingline.world.allBoards"),tabTone:O.fail?"fail":"work",ticks:{label:e("wingline.world.tasksDone",O.done,R.length),list:I},tl:[[e("wingline.world.k.pipelines"),String(g.length)],[e("wingline.world.k.tasks"),String(R.length)],[e("wingline.world.k.spent"),jn(i.reduce((b,F)=>b+(Tt(F.cost?.usd)?F.cost.usd:0),0))]],tr:[[e("wingline.world.k.working"),Gi(O.work)],[e("wingline.world.k.needs"),Gi(O.fail)],[e("wingline.world.k.done"),Gi(O.done)]]}}:null;if(_)for(let b of U)b.chrome={tab:b.name,back:v.name,tabTone:b.st==="fail"?"fail":"work",ticks:{label:e("wingline.world.tasksDone",b.counts.done,b.n),list:b.ticks},tl:[[e("wingline.world.k.tasks"),String(b.n)],[e("wingline.world.k.runs"),String(b.runs)],[e("wingline.world.k.spent"),jn(b.usd)]],tr:[[e("wingline.world.k.working"),Gi(b.counts.work)],[e("wingline.world.k.waiting"),Gi(b.counts.wait)],[e("wingline.world.k.done"),Gi(b.counts.done)]]};return{boards:c,planet:w,region:_,spots:a}}var ln={w:188,h:48,gx:40,gy:8,pad:10};function a_(n){let e=new Map(n.tasks.map(l=>[l.id,l])),t=new Map;if(n.kind==="chain"){let l=new Set,h=d=>{if(t.has(d.id))return t.get(d.id);if(l.has(d.id))return 0;l.add(d.id);let u=(d.parents||[]).map(p=>e.get(p)).filter(Boolean),f=u.length?Math.max(...u.map(h))+1:0;return l.delete(d.id),t.set(d.id,f),f};n.tasks.forEach(h)}else n.kind==="pair"?n.tasks.forEach((l,h)=>t.set(l.id,h)):n.tasks.forEach(l=>t.set(l.id,0));let i=[];for(let l of n.tasks){let h=t.get(l.id);i[h]||(i[h]=[]),i[h].push(l)}let r=Math.max(...i.map(l=>l?l.length:0)),s=r*ln.h+(r-1)*ln.gy,o=[];i.forEach((l,h)=>{if(!l)return;let d=l.length*ln.h+(l.length-1)*ln.gy;l.forEach((u,f)=>{o.push({task:u,label:sc(u,n.kind==="other"?"":n.name),x:ln.pad+h*(ln.w+ln.gx),y:ln.pad+(s-d)/2+f*(ln.h+ln.gy)})})});let a=new Map(o.map(l=>[l.task.id,l])),c=n.edges.filter(l=>a.has(l.from)&&a.has(l.to)).map(l=>({...l,key:`${l.from}>${l.to}`,a:a.get(l.from),b:a.get(l.to)}));return{nodes:o,edges:c,width:ln.pad*2+i.length*ln.w+(i.length-1)*ln.gx,height:ln.pad*2+s}}var gf=[300,400,500,600],Lo=[{key:"pressA",kind:"press",role:"builder",x:430,y:230,w:108,h:116},{key:"pressB",kind:"press",role:"builder",x:430,y:410,w:108,h:116},...gf.map((n,e)=>({key:`scan${e+1}`,kind:"scan",role:"review",x:820,y:n,w:70,h:76,n:e+1})),{key:"gate",kind:"gate",role:"gate",x:1085,y:450,w:120,h:124},{key:"lab",kind:"lab",role:"detective",x:478,y:770,w:132,h:96}],af={builder:["pressA","pressB"],review:["scan1","scan2","scan3","scan4"],gate:["gate"],detective:["lab"]},Wh=[[[226,450],[290,450]],[[290,450],[290,230],[540,230],[540,130],[1500,130],[1500,205]],[[290,410],[540,410],[540,230]],[[290,450],[290,680],[670,680],[670,300]],[[290,680],[290,770],[420,770]],...gf.map(n=>[[670,n],[1e3,n]]),[[1e3,300],[1e3,450]],[[1e3,600],[1e3,450]],[[1e3,450],[1290,450]]],Xh=[[548,770],[1110,770]],l_=["M486,262 C590,262 620,300 662,300","M486,440 L600,440 L640,470 L662,470"],ui={intake:{x:40,y:300,w:186,h:300},dock:{x:1290,y:190,w:272,h:376},bay:{x:1110,y:612,w:452,h:200},scrap:{x:48,y:676,w:166,h:140}},rc={intake:10,dock:42,bay:4,scrap:12},Dn={x:14,y:72,w:1572,h:812},Ts={builder:"#3d7dd8",review:"#8b6fd6",gate:"#e2a336",detective:"#2fa58e"},c_={builder:"#6d9de1",review:"#a893e0",gate:"#e9ba68",detective:"#63bcaa"},Ai={zone:17,name:16,tag:16,note:16,num:16,sign:28},vs=n=>n.map(e=>e.join(",")).join(" ");function h_(n){let e=Uo(n);return e?Lr(e,e.started_at)+600:Tt(n.created_at)?n.created_at:0}function u_(n,e){if(e==null){let o=n.status;return o==="running"?"machine":o==="blocked"?"bay":o==="done"?"dock":o==="archived"?"scrap":"intake"}let t=In(n),i=Tt(n.created_at)?n.created_at:t.length?t[0].started_at:null;if(i==null||i>e)return"hidden";if(n.status==="archived"&&e>=h_(n))return"scrap";let r=t.filter(o=>o.started_at<=e);if(r.some(o=>!Tt(o.ended_at)||o.ended_at>e))return"machine";if(n.status==="done"&&Tt(n.completed_at)&&e>=n.completed_at)return"dock";let s=r[r.length-1];return s?hr(s)==="ok"?"dock":"bay":"intake"}function d_(n,e){let t=In(n).filter(r=>Tt(r.ended_at)&&(e==null||r.ended_at<=e)),i=t[t.length-1];return i&&hr(i)==="stopped"?"crash":"pause"}function f_(n,e){return n==="intake"?[86+e%2*64,372+Math.floor(e/2)*48]:n==="dock"?[1322+e%6*41+Math.floor(e/6)%2*10,530-Math.floor(e/6)*46]:n==="bay"?[1168+e*76,742]:[96+e%3*38,778-Math.floor(e/3)*12]}function p_(n,e){let t={intake:[],machine:[],bay:[],dock:[],scrap:[]},i={};for(let l of n){let h=u_(l,e);i[l.id]=h,h!=="hidden"&&t[h].push(l)}let r=l=>{let h=Uo(l);return h?Lr(h,h.started_at):Tt(l.created_at)?l.created_at:0};t.intake.sort((l,h)=>(l.created_at||0)-(h.created_at||0)),t.machine.sort(nc),t.bay.sort((l,h)=>r(l)-r(h)),t.dock.sort((l,h)=>r(l)-r(h)),t.scrap.sort((l,h)=>r(l)-r(h));let s={},o={},a={};for(let l of t.machine){let h=af[fi(l)],d=h.find(w=>!s[w]),u=d||h[h.length-1];s[u]?s[u].extra.push(l):s[u]={task:l,state:"work",extra:[]};let f=Lo.find(w=>w.key===u),p=d?0:s[u].extra.length;o[l.id]=[f.x+p*14,f.y-p*6]}for(let l of t.bay){let h=d_(l,e);a[l.id]=h;let u=af[fi(l)].find(f=>!s[f]);u&&(s[u]={task:l,state:h,extra:[]})}let c={};for(let l of["intake","dock","bay","scrap"])t[l].forEach((h,d)=>{d<rc[l]&&(o[h.id]=f_(l,d))}),c[l]=Math.max(0,t[l].length-rc[l]);return{zones:t,zoneOf:i,occ:s,pos:o,kinds:a,overflow:c}}var Me={bg0:"#ddd3c2",bg1:"#d2c7b4",floor0:"#f3ede2",floor1:"#ebe3d5",grid:"rgba(120,95,55,.07)",intake:"#e6dece",intakeLine:"#cbbfa8",door:"#b9ae99",doorSlat:"rgba(255,255,255,.25)",dock:"#e4d3b5",plank:"rgba(120,85,40,.10)",scrap:"#e2ddd4",scrapLine:"#c6beb0",bed:"#3a4150",bedIn:"#4a5264",slat:"rgba(255,255,255,.11)",redBed:"#2b2d33",yellow:"#f2c230",cable:"#c9bfae",cableIn:"#e9e2d6",label:"#776b58",ink:"#26303f",mute:"#5f6779",block0:"#fdfbf7",block1:"#ece5d8",lab1:"#e9e2d4",housing:"#2f3747",vent:"rgba(255,255,255,.10)",rod:"#8a92a3",plate:"rgba(40,30,10,.14)",inset:"rgba(0,0,0,.15)",shine:"rgba(255,255,255,.25)",glass:"rgba(139,111,214,.08)",glassOn:"rgba(139,111,214,.20)",glassLine:"rgba(139,111,214,.55)",beam:"rgba(196,181,253,.95)",scanNum:"#dfe3ec",disc0:"#ffd98a",ring:"rgba(255,255,255,.6)",dome:"rgba(47,165,142,.10)",liquid:"rgba(47,165,142,.35)",liquidOn:"rgba(47,165,142,.55)",domeLine:"rgba(47,165,142,.6)",glint:"rgba(255,255,255,.8)",lampIdle:"#8fd3a5",lampWork:"#2fd07a",lampRed:"#ff3b3b",lampAmber:"#ffb020",lampAmberDim:"#c98a1a",lampOff:"#d8d0c2",lampHi:"rgba(255,255,255,.7)",crateLid:"#efd7ae",crate0:"#dcb784",crate1:"#c99c64",tape:"#c9985e",shade:"rgba(0,0,0,.06)",crateShadow:"rgba(60,40,10,.22)",crateHi:"rgba(255,255,255,.35)",scrapLid:"#d8d4cc",scrap0:"#c9c3b8",scrap1:"#b9b2a6",scrapTape:"#bdb6aa",scrapTag:"#9aa0ab",red:"#e5484d",redText:"#c0353a",amber:"#e9a23b",amberText:"#8f5c12",white:"#ffffff",card:"#fffdf8",bin:"#efe7dc",binOn:"#f5e6e0",binLine:"#3a4150",binOff:"#cfc5b4",halo:"rgba(229,72,77,.14)",ringRed:"rgba(229,72,77,.55)",shadow:"#3c280a",smoke:"#5f626b"},m_={clock:["M12 7v5l3 2","C12,12,9"],alert:["M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z","M12 9v4M12 17h.01"],retry:["M3 12a9 9 0 0 1 15.5-6.2L21 8","M21 3v5h-5","M21 12a9 9 0 0 1-15.5 6.2L3 16","M3 21v-5h5"],log:["M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z","M14 3v5h5M9 13h6M9 17h4"],chat:["M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"],archive:["M3 4h18v4H3z","M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"],coin:["M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2","C12,12,9"],board:["M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z"],moon:["M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"],info:["M12 11v5M12 8h.01","C12,12,9"],note:["M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z"],user:["M20 21a8 8 0 0 0-16 0","C12,8,4"],play:["M7 5v14l11-7z"],pause:["M8 5v14M16 5v14"],close:["M6 6l12 12M18 6 6 18"]};function di({name:n,size:e=15}){let t=m_[n]||[];return y("svg",{className:"wl-i",width:e,height:e,viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},t.map((i,r)=>{if(i.startsWith("C")){let[s,o,a]=i.slice(1).split(",").map(Number);return y("circle",{key:r,cx:s,cy:o,r:a})}return y("path",{key:r,d:i})}))}function cn({icon:n,label:e,onClick:t,kind:i,disabled:r,id:s}){return y("button",{type:"button",className:`wl-btn${i?` is-${i}`:""}`,onClick:t,disabled:r,"data-act":s},n?y(di,{name:n}):null,y("span",null,e))}var g_=`
.wl-root{container:wl/inline-size;position:relative;min-height:100%;box-sizing:border-box;padding:0 0 24px;color:var(--ui-text-primary);background:var(--ui-bg-chrome);font-size:13px;line-height:1.5}
.wl-root *{box-sizing:border-box}
.wl-root button{font:inherit;color:inherit;cursor:pointer}
.wl-root :focus-visible{outline:2px solid var(--ui-accent);outline-offset:2px;border-radius:6px}
.wl-root ::selection{background:color-mix(in srgb,var(--ui-accent) 35%,transparent)}
.wl-i{flex:none;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.wl-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px}
.wl-muted{margin:4px 0;color:var(--ui-text-tertiary);font-size:12.5px}
.wl-top{position:sticky;top:0;z-index:6;display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:12px 24px;background:var(--ui-bg-chrome);border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-brand{display:flex;flex-direction:column;min-width:0}
.wl-brand h1{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}
.wl-brand span{font-size:12px;color:var(--ui-text-tertiary)}
.wl-select{height:30px;max-width:260px;padding:0 8px;border-radius:8px;border:1px solid var(--ui-stroke-secondary);background:var(--ui-bg-editor);color:var(--ui-text-primary);font:inherit}
.wl-seg{display:inline-flex;gap:2px;padding:3px;background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:10px}
.wl-seg button{border:0;background:none;padding:4px 12px;border-radius:7px;color:var(--ui-text-secondary);font-weight:500}
.wl-seg button:hover{color:var(--ui-text-primary)}
.wl-seg button[aria-pressed=true]{background:var(--ui-bg-elevated);color:var(--ui-text-primary)}
.wl-counts{display:flex;flex-wrap:wrap;gap:4px;margin-left:auto}
.wl-count{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9px;border:1px solid transparent;background:none;color:var(--ui-text-secondary);font-size:12.5px}
.wl-count b{color:var(--ui-text-primary);font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-count:hover{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-tertiary)}
.wl-count[aria-pressed=true]{background:var(--ui-bg-secondary);border-color:var(--ui-stroke-secondary)}
.wl-count.is-alert{border-color:color-mix(in srgb,var(--ui-yellow) 45%,transparent);background:color-mix(in srgb,var(--ui-yellow) 10%,transparent)}
.wl-count .wl-dot{width:8px;height:8px;border-radius:50%}
.wl-count.is-static{cursor:default}
.wl-count.is-static:hover{background:none;border-color:transparent}
.wl-updated{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-problems{margin:12px 24px 0;padding:8px 12px;border-radius:10px;border:1px solid color-mix(in srgb,var(--ui-red) 45%,transparent);background:color-mix(in srgb,var(--ui-red) 8%,var(--ui-bg-chrome));max-height:${ys.problems}px;overflow:auto}
.wl-problems-head{display:flex;align-items:center;gap:8px;font-weight:600}
.wl-problems-head .wl-i{stroke:var(--ui-red)}
.wl-problems ul{margin:4px 0 0;padding-left:24px;font-size:12.5px;color:var(--ui-text-secondary)}
.wl-problems li{overflow-wrap:anywhere}
.wl-problems li b{color:var(--ui-text-primary);font-weight:600}
.wl-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);font-size:12.5px;font-weight:500;white-space:nowrap}
.wl-btn:hover{background:var(--ui-control-hover-background)}
.wl-btn.is-primary{background:var(--ui-text-primary);border-color:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-btn.is-primary:hover{opacity:.9;background:var(--ui-text-primary)}
.wl-btn.is-danger{background:var(--ui-red);border-color:var(--ui-red);color:var(--ui-bg-chrome)}
.wl-btn.is-ghost{background:none;border-color:transparent;color:var(--ui-text-secondary)}
.wl-btn.is-ghost:hover{background:var(--ui-bg-tertiary);color:var(--ui-text-primary)}
.wl-btn[disabled]{opacity:.45;cursor:default}
.wl-state{display:flex;flex-direction:column;align-items:flex-start;gap:8px;margin:24px;padding:16px 20px;border-radius:12px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);color:var(--ui-text-secondary)}
.wl-main{min-width:0;display:flex;flex-direction:column;gap:24px;padding:20px 24px;max-width:1280px}
.wl-world-host{width:100%;aspect-ratio:1180/900;max-height:calc(100vh - 150px);border-radius:12px;overflow:hidden;border:1px solid var(--ui-stroke-tertiary)}
.wl-world-off{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ui-text-secondary)}
.wl-h2{margin:0 0 8px;font-size:13px;font-weight:600;display:flex;align-items:baseline;gap:8px;color:var(--ui-text-secondary)}
.wl-h2 small{font-weight:400;color:var(--ui-text-tertiary);font-size:12px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-sec.is-needs>.wl-h2{font-size:15px;color:var(--ui-text-primary)}
.wl-h4{margin:16px 0 8px;font-size:12.5px;font-weight:600;color:var(--ui-text-secondary)}
.wl-panel{background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);border-radius:12px;min-width:0}
.wl-slim{display:flex;align-items:center;gap:8px;margin:0;min-height:32px;padding:6px 12px;border-radius:9px;background:var(--ui-bg-secondary);color:var(--ui-text-secondary);font-size:12.5px;white-space:nowrap;overflow:hidden}
.wl-slim b{color:var(--ui-text-primary);font-weight:600}
.wl-slim span{overflow:hidden;text-overflow:ellipsis}
.wl-needs{display:flex;flex-direction:column;gap:12px}
.wl-attn{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;padding:16px 20px;cursor:pointer;border-radius:12px;border:1px solid color-mix(in srgb,var(--ui-yellow) 55%,var(--ui-stroke-tertiary));background:color-mix(in srgb,var(--ui-yellow) 7%,var(--ui-bg-secondary))}
.wl-attn:hover{border-color:var(--ui-yellow)}
.wl-attn.is-sel{border-color:var(--ui-yellow);box-shadow:0 0 0 1px var(--ui-yellow)}
.wl-badge{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--ui-yellow) 18%,transparent);color:var(--ui-yellow)}
.wl-attn-body{min-width:0}
.wl-attn h3{margin:0;font-size:16px;font-weight:600;line-height:1.35;overflow-wrap:anywhere}
.wl-reason{margin:4px 0 0;font-size:14px;color:var(--ui-text-primary);max-width:90ch;overflow-wrap:anywhere}
.wl-facts{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-size:12px;color:var(--ui-text-tertiary);font-variant-numeric:tabular-nums}
.wl-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.wl-rawbox{margin-top:8px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-rawbox summary{cursor:pointer;width:max-content}
.wl-rawbox summary:hover{color:var(--ui-text-secondary)}
.wl-rawtext{margin:6px 0 0;max-height:${ys.error}px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:8px 10px;border-radius:8px;background:var(--ui-bg-editor);color:var(--ui-text-secondary)}
.wl-work{display:flex;flex-direction:column;gap:8px;max-height:${ys.working}px;overflow:auto}
.wl-wrow{flex:none;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;padding:12px 16px;cursor:pointer;border-color:color-mix(in srgb,var(--ui-accent) 40%,var(--ui-stroke-tertiary))}
.wl-wrow.is-sel{border-color:var(--ui-accent)}
.wl-wtitle{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600}
.wl-wtitle span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-wmeta{font-size:12px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-wact{grid-column:1/-1;font-size:12px;color:var(--ui-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-bar{grid-column:1/-1;height:4px;border-radius:2px;background:var(--ui-bg-tertiary);overflow:hidden}
.wl-bar i{display:block;height:100%;background:var(--ui-accent)}
.wl-pipes{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}
.wl-pipe{margin:0;padding:8px 8px 4px;border-radius:12px;background:var(--ui-bg-secondary);border:1px solid var(--ui-stroke-tertiary);max-width:100%;overflow-x:auto}
.wl-pipe figcaption{display:flex;align-items:baseline;gap:8px;padding:0 4px 4px;font-size:12.5px;min-width:0}
.wl-pipe figcaption b{font-weight:600;white-space:nowrap}
.wl-pipe figcaption span{color:var(--ui-text-tertiary);font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-pipe svg{display:block}
.wl-node{cursor:pointer;outline:none}
.wl-card{fill:var(--ui-bg-tertiary);stroke:var(--ui-stroke-secondary);stroke-width:1}
.wl-node:hover .wl-card,.wl-node:focus-visible .wl-card,.wl-node.is-sel .wl-card{stroke:var(--ui-accent);stroke-width:1.5}
.wl-edge{stroke:var(--ui-stroke-primary);stroke-width:1.5;fill:none}
.wl-edge.is-seq{stroke-dasharray:4 4}
.wl-arrow{fill:var(--ui-stroke-primary)}
.wl-nt{height:100%;padding:6px 8px 0 24px;font-size:12.5px;line-height:1.35;pointer-events:none}
.wl-nt b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-nt span{display:block;color:var(--ui-text-tertiary);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.wl-key{display:flex;gap:16px;margin:8px 0 0;font-size:12px;color:var(--ui-text-tertiary)}
.wl-key span{display:inline-flex;align-items:center;gap:6px}
.wl-key i{display:inline-block;width:18px;border-top:1.5px solid var(--ui-stroke-primary)}
.wl-key i.is-seq{border-top-style:dashed}
.wl-tl{overflow:hidden}
.wl-tl-head,.wl-tl-row{display:grid;grid-template-columns:minmax(140px,260px) minmax(0,1fr) 64px;gap:12px;align-items:center}
.wl-tl-head{font-size:11.5px;color:var(--ui-text-tertiary);height:28px;padding:0 16px;border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-tl-cost{text-align:right}
.wl-ticks{position:relative;height:100%}
.wl-ticks span{position:absolute;top:6px;white-space:nowrap;transform:translateX(-50%);font-variant-numeric:tabular-nums}
.wl-tl-body{max-height:${ys.timeline}px;overflow:auto;padding:0 0 4px}
.wl-tl-group{display:flex;align-items:baseline;gap:8px;min-width:0;height:26px;padding:6px 16px 0;font-size:12px;font-weight:600;color:var(--ui-text-secondary)}
.wl-tl-group span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-tl-group em{font-style:normal;font-weight:400;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-tl-row{height:24px;cursor:pointer;border-radius:6px;margin:0 4px;padding:0 12px;font-size:12.5px}
.wl-tl-row:hover{background:var(--ui-row-hover-background)}
.wl-tl-row.is-sel{background:var(--ui-row-active-background)}
.wl-tl-row.is-dim{opacity:.35}
.wl-tl-name{display:flex;align-items:center;gap:8px;min-width:0}
.wl-tl-name span:last-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wl-role{width:8px;height:8px;border-radius:2px;flex:none;display:inline-block}
.wl-track{position:relative;height:16px}
.wl-gridline{position:absolute;top:-4px;bottom:-4px;width:1px;background:var(--ui-stroke-quaternary)}
.wl-run{position:absolute;top:4px;height:8px;border-radius:4px;min-width:6px}
.wl-k-ok{background:var(--ui-green)}
.wl-k-paused{background:var(--ui-yellow)}
.wl-k-running{background:var(--ui-accent)}
.wl-k-stopped{background:var(--ui-red)}
.wl-cost{text-align:right;font-size:12px;color:var(--ui-text-secondary);font-variant-numeric:tabular-nums}
.wl-legend{display:flex;gap:16px;flex-wrap:wrap;padding:8px 16px;font-size:12px;color:var(--ui-text-tertiary);border-top:1px solid var(--ui-stroke-tertiary)}
.wl-legend span{display:inline-flex;align-items:center;gap:6px}
.wl-legend i{display:inline-block;width:14px;height:8px;border-radius:4px}
.wl-roles{margin-left:auto;gap:12px!important}
.wl-sheet{position:fixed;z-index:30;top:0;right:0;height:100vh;width:min(440px,100vw);display:flex;flex-direction:column;background:var(--ui-bg-elevated);border-left:1px solid var(--ui-stroke-secondary);box-shadow:-12px 0 32px color-mix(in srgb,var(--ui-bg-chrome) 55%,transparent);overflow-wrap:anywhere}
.wl-sheet-head{flex:none;padding:16px 20px 12px;border-bottom:1px solid var(--ui-stroke-tertiary)}
.wl-sheet-top{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ui-text-tertiary)}
.wl-sheet-top .wl-x{margin-left:auto}
.wl-x{border:0;background:var(--ui-bg-tertiary);border-radius:8px;width:28px;height:28px;display:grid;place-items:center}
.wl-x:hover{background:var(--ui-control-hover-background)}
.wl-sheet h3{margin:8px 0;font-size:16px;font-weight:600;line-height:1.3}
.wl-sheet-body{flex:1;min-height:0;overflow:auto;padding:12px 20px 16px}
.wl-sheet-why{margin:0 0 12px;font-size:13.5px}
.wl-sheet-foot{flex:none;display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;border-top:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-elevated)}
.wl-status{display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:var(--ui-bg-tertiary);border:1px solid var(--ui-stroke-tertiary)}
.wl-status i{width:7px;height:7px;border-radius:50%}
.wl-dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin:0 0 12px;background:var(--ui-stroke-tertiary);border-radius:10px;overflow:hidden}
.wl-dl div{background:var(--ui-bg-tertiary);padding:8px 10px;min-width:0}
.wl-dl dt{font-size:11.5px;color:var(--ui-text-tertiary)}
.wl-dl dd{margin:2px 0 0;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums}
.wl-dl dd small{display:block;font-size:11.5px;font-weight:400;color:var(--ui-text-tertiary)}
.wl-kv{display:grid;grid-template-columns:96px minmax(0,1fr);gap:4px 12px;font-size:12.5px}
.wl-kv>span:nth-child(odd){color:var(--ui-text-tertiary)}
.wl-attempts{margin:0;padding:0;list-style:none;position:relative}
.wl-attempts:before{content:"";position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:var(--ui-stroke-secondary)}
.wl-attempts li{position:relative;padding:0 0 12px 24px;font-size:12.5px}
.wl-attempts li>i{position:absolute;left:0;top:4px;width:11px;height:11px;border-radius:50%;background:var(--ui-bg-elevated);border:2px solid var(--ui-text-tertiary)}
.wl-attempts li.is-ok>i{border-color:var(--ui-green)}
.wl-attempts li.is-stopped>i{border-color:var(--ui-red)}
.wl-attempts li.is-paused>i{border-color:var(--ui-yellow)}
.wl-attempts li.is-running>i{border-color:var(--ui-accent)}
.wl-att-line{display:flex;gap:8px;align-items:baseline}
.wl-att-line span{color:var(--ui-text-tertiary);font-size:12px}
.wl-att-out{display:flex;gap:8px;font-variant-numeric:tabular-nums}
.wl-att-out span:first-child{font-weight:600}
.wl-attempts small{display:block;color:var(--ui-text-tertiary);font-size:12px}
.wl-log{margin-top:16px}
.wl-log-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-weight:600}
.wl-log-head .wl-btn{margin-left:auto}
.wl-logpre{margin:0;max-height:${ys.log}px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:10px;border-radius:10px;background:var(--ui-bg-editor);color:var(--ui-text-secondary);line-height:1.45}
.wl-note{margin-top:4px}
.wl-input{width:100%;background:var(--ui-bg-editor);border:1px solid var(--ui-stroke-secondary);border-radius:9px;padding:8px 10px;color:var(--ui-text-primary);font:inherit}
.wl-input:focus{outline:none;border-color:var(--ui-accent)}
textarea.wl-input{min-height:64px;resize:vertical}
.wl-note .wl-btn{margin-top:8px}
.wl-notice{position:fixed;right:24px;bottom:24px;z-index:40;display:flex;gap:10px;align-items:flex-start;max-width:420px;padding:12px 14px;border-radius:12px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);font-size:12.5px}
.wl-notice .wl-i{stroke:var(--ui-accent);margin-top:2px}
.wl-fx{padding:12px 24px 16px;min-width:0}
.wl-fx-bar{display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap}
.wl-pill{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:999px;border:1px solid var(--ui-stroke-tertiary);background:var(--ui-bg-secondary);white-space:nowrap}
.wl-pill i{width:9px;height:9px;border-radius:50%;background:var(--ui-green)}
.wl-pill.is-replay i{background:var(--ui-blue)}
.wl-pill b{font-weight:600}
.wl-pill span{color:var(--ui-text-tertiary)}
.wl-clock{display:flex;align-items:baseline;gap:8px;line-height:1.1;padding-left:12px;border-left:1px solid var(--ui-stroke-tertiary)}
.wl-clock small{font-size:12px;color:var(--ui-text-tertiary)}
.wl-clock b{font-size:17px;font-weight:600;font-variant-numeric:tabular-nums}
.wlf-stage{position:relative;width:min(100%,calc((100vh - 200px) * ${Dn.w/Dn.h}));min-width:min(100%,640px);margin:0 auto;border-radius:16px;overflow:hidden;background:linear-gradient(${Me.bg0},${Me.bg1})}
.wlf-svg{display:block;width:100%;height:auto;font-family:inherit}
.wl-ctrl{display:flex;align-items:center;gap:10px;width:min(100%,calc((100vh - 200px) * ${Dn.w/Dn.h}));min-width:min(100%,640px);margin:8px auto 0;padding:6px 8px;border:1px solid var(--ui-stroke-tertiary);border-radius:12px;background:var(--ui-bg-secondary)}
.wl-ctrl input[type=range]{flex:1;min-width:80px;accent-color:var(--ui-accent)}
.wl-tlab{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums}
.wl-tlab b{color:var(--ui-text-primary);font-weight:600}
.wl-root .wl-play{border:0;width:34px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--ui-text-primary);color:var(--ui-bg-chrome)}
.wl-play .wl-i{fill:currentColor}
.wl-now{border:1px solid var(--ui-stroke-secondary);height:30px;padding:0 12px;border-radius:9px;background:var(--ui-bg-tertiary);font-weight:600}
.wl-now.is-live{background:var(--ui-green);border-color:var(--ui-green);color:var(--ui-bg-chrome)}
.wlf-zone-l{font-size:${Ai.zone}px;font-weight:600;letter-spacing:1.6px}
.wlf-name{font-size:${Ai.name}px;font-weight:600;letter-spacing:1.2px}
.wlf-note{font-size:${Ai.note}px;font-weight:500}
.wlf-num{font-size:${Ai.num}px;font-weight:700}
.wlf-sign{font-size:${Ai.sign}px;font-weight:600;font-variant-numeric:tabular-nums}
.wlf-binhead{font-size:${Ai.note}px;font-weight:600;letter-spacing:1px}
.wlf-slats{opacity:0}
.wlf-svg[data-moving="1"] .wlf-slats{opacity:1;animation:wlf-run 1.1s linear infinite}
.wlf-svg[data-moving="1"] .wlf-redslats{animation:wlf-run 1.4s linear infinite}
.wlf-m{cursor:pointer;outline:none}
.wlf-m-focus{fill:none;stroke:transparent;stroke-width:2;stroke-dasharray:5 4}
.wlf-m:hover .wlf-m-focus,.wlf-m:focus-visible .wlf-m-focus{stroke:${Me.ink}}
.wlf-press,.wlf-stamp,.wlf-beam,.wlf-glass{transform-box:view-box}
.wlf-press.is-work{animation:wlf-press 1.05s ease-in-out infinite}
.wlf-press.is-jam{transform:translateY(14px)}
.wlf-stamp.is-work{animation:wlf-stamp 1.43s ease-in-out infinite}
.wlf-stamp.is-jam{transform:translateY(8px)}
.wlf-arm{transform-box:fill-box;transform-origin:top;transform:scaleY(.05)}
.wlf-arm.is-work{animation:wlf-arm 1.43s ease-in-out infinite}
.wlf-arm.is-jam{transform:scaleY(.35)}
.wlf-beam{animation:wlf-beam 1.5s ease-in-out infinite}
.wlf-glass.is-work{animation:wlf-glass 3.9s linear infinite;transform-origin:444px 752px}
.wlf-lamp-c{fill:${Me.lampIdle}}
.wlf-lamp.is-work .wlf-lamp-c{fill:${Me.lampWork};filter:drop-shadow(0 0 4px ${Me.lampWork})}
.wlf-lamp.is-crash .wlf-lamp-c{fill:${Me.lampRed};animation:wlf-crash .52s steps(1) infinite;filter:drop-shadow(0 0 6px ${Me.lampRed})}
.wlf-lamp.is-pause .wlf-lamp-c{fill:${Me.lampAmber};animation:wlf-pause 1s steps(1) infinite}
.wlf-pkg{cursor:pointer;outline:none;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.wlf-pkg.is-scrap{opacity:.55}
.wlf-pkg-focus{fill:none;stroke:transparent;stroke-width:2}
.wlf-pkg:hover .wlf-pkg-focus,.wlf-pkg:focus-visible .wlf-pkg-focus{stroke:${Me.ink}}
.wlf-ring{transform-box:fill-box;transform-origin:center;animation:wlf-ring 2.8s ease-out infinite}
.wlf-smoke circle{opacity:.3;transform-box:fill-box;transform-origin:center;animation:wlf-smoke 2.4s ease-out infinite}
.wlf-smoke circle:nth-child(2){animation-delay:.8s}
.wlf-smoke circle:nth-child(3){animation-delay:1.6s}
.wlf-fo{overflow:visible}
.wlf-tag{height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none}
.wlf-tag.is-start{justify-content:flex-start}
.wlf-tag span{display:inline-flex;align-items:center;gap:8px;max-width:100%;height:28px;padding:0 14px 0 10px;border-radius:14px;background:${Me.card};color:${Me.ink};box-shadow:0 3px 8px ${Me.crateShadow};font-size:${Ai.tag}px;font-weight:500;white-space:nowrap}
.wlf-tag em{font-style:normal;overflow:hidden;text-overflow:ellipsis}
.wlf-tag i{width:9px;height:9px;border-radius:50%;flex:none}
.wlf-tag.is-crash span{background:${Me.red};color:${Me.white};padding-left:14px}
.wlf-tag.is-pause span{background:${Me.amber};color:${Me.ink};padding-left:14px}
.wlf-call{height:100%;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:8px 14px 8px 20px;border-radius:14px;background:${Me.card};color:${Me.ink};box-shadow:0 6px 18px ${Me.crateShadow},inset 6px 0 0 ${Me.red};cursor:pointer;min-width:0;line-height:1.3}
.wlf-call.is-pause{box-shadow:0 6px 18px ${Me.crateShadow},inset 6px 0 0 ${Me.amber}}
.wlf-call:focus-visible{outline:2px solid ${Me.ink};outline-offset:2px}
.wlf-call small{font-size:${Ai.note}px;font-weight:600;letter-spacing:1.2px;color:${Me.redText}}
.wlf-call.is-pause small,.wlf-call.is-pause em{color:${Me.amberText}}
.wlf-call b{font-size:18px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wlf-call span{font-size:${Ai.note}px;color:${Me.mute};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.wlf-call em{font-style:normal;font-size:${Ai.note}px;font-weight:600;color:${Me.redText}}
.wl-scrim{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:24px;background:color-mix(in srgb,var(--ui-bg-chrome) 72%,transparent)}
.wl-dlg{width:min(620px,100%);max-height:min(${ys.dialog}px,100%);overflow:auto;padding:20px 24px;border-radius:14px;background:var(--ui-bg-elevated);border:1px solid var(--ui-stroke-secondary);color:var(--ui-text-primary);overflow-wrap:anywhere}
.wl-dlg h2{margin:0 0 8px;font-size:16px;font-weight:600}
.wl-dlg p{margin:8px 0;color:var(--ui-text-secondary)}
.wl-dlg .wl-task{font-weight:600;color:var(--ui-text-primary)}
.wl-steps{margin:12px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}
.wl-steps li{display:grid;grid-template-columns:14px minmax(0,1fr) auto;gap:8px;align-items:start;font-size:12.5px}
.wl-steps .wl-st{font-size:11.5px;color:var(--ui-text-tertiary);white-space:nowrap}
.wl-steps .wl-st.is-failed{color:var(--ui-text-primary);font-weight:600}
.wl-steps .wl-serr{grid-column:2/-1;font-size:12px;color:var(--ui-text-secondary)}
.wl-mark{width:10px;height:10px;border-radius:50%;margin-top:4px;border:2px solid var(--ui-stroke-primary)}
.wl-mark.is-done{background:var(--ui-green);border-color:var(--ui-green)}
.wl-mark.is-failed{background:var(--ui-red);border-color:var(--ui-red)}
.wl-mark.is-running{border-color:var(--ui-accent)}
.wl-field{display:flex;flex-direction:column;gap:4px;margin:12px 0;font-weight:600}
.wl-field small{font-weight:400;color:var(--ui-text-tertiary)}
.wl-field .wl-input{width:140px}
.wl-quote{white-space:pre-wrap;padding:10px 12px;border-radius:10px;background:var(--ui-bg-secondary);max-height:200px;overflow:auto}
.wl-callnote{padding:8px 10px;border-radius:8px;background:var(--ui-bg-secondary);font-size:12.5px}
.wl-result{margin-top:12px;padding:8px 10px;border-radius:8px;border:1px solid color-mix(in srgb,var(--ui-green) 50%,transparent);background:var(--ui-bg-secondary)}
.wl-result.is-failed{border-color:color-mix(in srgb,var(--ui-red) 50%,transparent)}
.wl-dlg-actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;margin-top:16px}
@keyframes wlf-run{to{stroke-dashoffset:-22}}
@keyframes wlf-press{0%,62%,100%{transform:translateY(0)}22%,30%{transform:translateY(20px)}}
@keyframes wlf-stamp{0%,62%,100%{transform:translateY(0)}18%,32%{transform:translateY(24px)}}
@keyframes wlf-arm{0%,62%,100%{transform:scaleY(.05)}18%,32%{transform:scaleY(1)}}
@keyframes wlf-beam{0%,100%{transform:translateX(0)}50%{transform:translateX(40px)}}
@keyframes wlf-glass{0%{transform:translate(4px,0)}25%{transform:translate(0,4px)}50%{transform:translate(-4px,0)}75%{transform:translate(0,-4px)}100%{transform:translate(4px,0)}}
@keyframes wlf-crash{50%{fill:${Me.lampAmber}}}
@keyframes wlf-pause{50%{fill:${Me.lampAmberDim}}}
@keyframes wlf-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
@keyframes wlf-smoke{0%{transform:translate(0,0) scale(.6);opacity:.45}100%{transform:translate(18px,-64px) scale(1.9);opacity:0}}
@media (prefers-reduced-motion:reduce){.wl-root *,.wl-root *::before,.wl-root *::after{animation:none!important;transition:none!important}}
`;function x_({task:n,t:e}){let t=Zh(n.status);return y("span",{className:"wl-status","data-status":t},y("i",{style:{background:df[t]||"var(--ui-text-tertiary)"}}),e(`wingline.status.${t}`))}var lf=(n,e=160)=>{let t=String(n||"").split(`
`)[0].replace(/\s+/g," ").trim();return t.length>e?`${t.slice(0,e-1).trimEnd()}…`:t},y_=/traceback|last output|^\s*(?:file |at )|\\x1b|\u001b/i;function Kh(n,e){let t=lf(n.block_reason_plain);if(t)return t;let i=lf(n.error_plain);return i&&!y_.test(i)?i:e("wingline.needs.reasonUnknown")}function __(n,e){let t=Tt(n.consecutive_failures)?n.consecutive_failures:0;return Tt(n.max_retries)?e("wingline.needs.retries",t,n.max_retries):e("wingline.needs.retriesNoMax",t)}function xf({text:n,t:e}){let t=ff(n).trim();return t?y("details",{className:"wl-rawbox","data-raw":"1",onClick:i=>i.stopPropagation()},y("summary",null,e("wingline.raw")),y("pre",{className:"wl-rawtext wl-mono"},t)):null}function v_({list:n,selId:e,onSelect:t,onAction:i,now:r,t:s}){return y("section",{className:"wl-sec is-needs","aria-labelledby":"wl-needs-h"},y("h2",{className:"wl-h2",id:"wl-needs-h"},s("wingline.needs.title"),n.length?y("small",null,s("wingline.needs.count",n.length)):null),n.length?y("div",{className:"wl-needs"},n.map(o=>{let a=Uo(o);return y("article",{key:o.id,className:`wl-attn${o.id===e?" is-sel":""}`,"data-id":o.id,onClick:()=>t(o.id)},y("div",{className:"wl-badge"},y(di,{name:"alert",size:18})),y("div",{className:"wl-attn-body"},y("h3",null,o.title),y("p",{className:"wl-reason","data-reason":"1"},Kh(o,s)),y("div",{className:"wl-facts"},y("span",null,__(o,s)),y("span",null,s("wingline.needs.worked",gn(s,Ss(o,r)))),y("span",null,s("wingline.needs.attempts",In(o).length)),y("span",null,jn(o.cost?.usd)),a&&Tt(a.ended_at)?y("span",null,s("wingline.needs.stopped",Nr(a.ended_at))):null),y(xf,{text:o.error_raw||o.error_plain,t:s}),y("div",{className:"wl-actions",onClick:c=>c.stopPropagation()},y(cn,{id:"retry",icon:"retry",kind:"primary",label:s("wingline.act.retry"),onClick:()=>i("retry",o)}),y(cn,{id:"details",icon:"info",label:s("wingline.act.details"),onClick:()=>t(o.id)}),y(cn,{id:"log",icon:"log",label:s("wingline.act.log"),onClick:()=>i("log",o)}),y(cn,{id:"chat",icon:"chat",label:s("wingline.act.chat"),onClick:()=>i("chat",o)}),y(cn,{id:"archive",icon:"archive",kind:"ghost",label:s("wingline.act.archive"),onClick:()=>i("archive",o)}))))})):y("p",{className:"wl-slim"},y(di,{name:"info"}),s("wingline.needs.none")))}function w_({list:n,tasks:e,selId:t,onSelect:i,now:r,t:s}){if(!n.length){let o=e.flatMap(a=>In(a).map(c=>c.ended_at)).filter(Tt);return y("section",{className:"wl-sec is-idle","aria-labelledby":"wl-work-h","data-idle":"1"},y("p",{className:"wl-slim"},y(di,{name:"moon"}),y("b",{id:"wl-work-h"},s("wingline.working.title")),y("span",null,s("wingline.working.none")," ",o.length?s("wingline.working.lastStop",Nr(Math.max(...o))):s("wingline.working.nothingYet"))))}return y("section",{className:"wl-sec","aria-labelledby":"wl-work-h"},y("h2",{className:"wl-h2",id:"wl-work-h"},s("wingline.working.title")),y("div",{className:"wl-work"},n.map(o=>{let a=In(o),c=a.filter(u=>!Tt(u.ended_at)).pop()||a[a.length-1],l=c?Math.max(0,r-c.started_at):0,h=c&&Tt(c.max_runtime_seconds)&&c.max_runtime_seconds||(Tt(o.max_runtime_seconds)?o.max_runtime_seconds:null),d=o.activity&&o.activity.text?o.activity:null;return y("article",{key:o.id,className:`wl-panel wl-wrow${o.id===t?" is-sel":""}`,"data-id":o.id,onClick:()=>i(o.id)},y("div",{className:"wl-wtitle"},y("span",{className:"wl-role",style:{background:No[fi(o)]}}),y("span",null,o.title)),y("div",{className:"wl-wmeta"},s("wingline.working.elapsed",gn(s,l)),h?` · ${s("wingline.working.limit",gn(s,h))}`:""),y("div",{className:"wl-wact"},d?`${d.text}${Tt(d.at)?` · ${s("wingline.working.ago",gn(s,Math.max(0,r-d.at)))}`:""}`:s("wingline.working.noActivity")),h?y("div",{className:"wl-bar"},y("i",{style:{width:`${Math.min(100,l/h*100)}%`}})):null)})))}function b_({groups:n,selId:e,onSelect:t,now:i,t:r}){let s=hi(()=>n.map(o=>({g:o,lay:a_(o)})),[n]);return y("section",{className:"wl-sec","aria-labelledby":"wl-pipe-h"},y("h2",{className:"wl-h2",id:"wl-pipe-h"},r("wingline.pipe.title"),y("small",null,r("wingline.pipe.sub"))),y("div",{className:"wl-pipes"},s.map(({g:o,lay:a})=>y("figure",{key:`${o.kind}-${o.tasks[0].id}`,className:"wl-pipe","data-group":o.name,"data-kind":o.kind},y("figcaption",null,y("b",null,o.name),y("span",null,r("wingline.tl.group",o.tasks.length,gn(r,o.tasks.reduce((c,l)=>c+Ss(l,i),0)),jn(o.tasks.reduce((c,l)=>c+(l.cost?.usd||0),0))))),y("svg",{width:a.width,height:a.height,viewBox:`0 0 ${a.width} ${a.height}`,role:"group","aria-label":o.name},y("defs",null,y("marker",{id:`wl-ar-${o.tasks[0].id}`,viewBox:"0 0 10 10",refX:8,refY:5,markerWidth:6,markerHeight:6,orient:"auto"},y("path",{d:"M0,1L9,5L0,9z",className:"wl-arrow"}))),a.edges.map(c=>{let l=c.a.x+ln.w,h=c.a.y+ln.h/2,d=c.b.x-3,u=c.b.y+ln.h/2,f=(l+d)/2;return y("path",{key:c.key,className:`wl-edge is-${c.kind}`,"data-edge":c.kind,d:`M${l},${h} C${f},${h} ${f},${u} ${d},${u}`,markerEnd:`url(#wl-ar-${o.tasks[0].id})`})}),a.nodes.map(c=>{let l=c.task,h=Uo(l),d=df[Zh(l.status)]||"var(--ui-text-tertiary)";return y("g",{key:l.id,className:`wl-node${l.id===e?" is-sel":""}`,transform:`translate(${c.x},${c.y})`,tabIndex:0,role:"button","aria-label":l.title,"data-id":l.id,onClick:()=>t(l.id),onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),t(l.id))}},y("rect",{className:"wl-card",width:ln.w,height:ln.h,rx:9}),y("rect",{x:10,y:12,width:8,height:8,rx:2,style:{fill:No[fi(l)]}}),y("circle",{cx:ln.w-12,cy:16,r:4,style:{fill:d}}),y("foreignObject",{x:0,y:0,width:ln.w-20,height:ln.h},y("div",{className:"wl-nt"},y("b",null,c.label),y("span",null,`${gn(r,Ss(l,i))} · ${jn(l.cost?.usd)}${h?` · ${r(`wingline.run.${hr(h)}`)}`:""}`))))}))))),y("p",{className:"wl-key"},y("span",null,y("i",{className:"is-dep"}),r("wingline.pipe.dep")),y("span",null,y("i",{className:"is-seq"}),r("wingline.pipe.seq"))))}var cf=5;function M_({groups:n,axis:e,selId:t,onSelect:i,filter:r,now:s,t:o}){let a=h=>e.toC(h)/e.span*100,c=r?$y[r]:null,l=Array.from({length:cf},(h,d)=>(d+.5)*(100/cf));return y("section",{className:"wl-sec","aria-labelledby":"wl-tl-h"},y("h2",{className:"wl-h2",id:"wl-tl-h"},o("wingline.tl.title"),y("small",null,o("wingline.tl.sub"))),y("div",{className:"wl-panel wl-tl"},y("div",{className:"wl-tl-head"},y("span",null,o("wingline.tl.task")),y("div",{className:"wl-ticks"},l.map(h=>y("span",{key:h,"data-tick":h,style:{left:`${h}%`}},Nr(e.toR(e.span*h/100))))),y("span",{className:"wl-tl-cost"},o("wingline.tl.spent"))),y("div",{className:"wl-tl-body"},n.map(h=>y("div",{key:`g-${h.kind}-${h.tasks[0].id}`,className:"wl-tl-groupbox","data-group":h.name},y("div",{className:"wl-tl-group"},y("span",null,h.name),y("em",null,o("wingline.tl.group",h.tasks.length,gn(o,h.tasks.reduce((d,u)=>d+Ss(u,s),0)),jn(h.tasks.reduce((d,u)=>d+(u.cost?.usd||0),0))))),h.tasks.map(d=>y("div",{key:d.id,className:`wl-tl-row${d.id===t?" is-sel":""}${c&&!c.includes(d.status)?" is-dim":""}`,"data-id":d.id,tabIndex:0,role:"button","aria-label":d.title,onClick:()=>i(d.id),onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),i(d.id))}},y("div",{className:"wl-tl-name"},y("span",{className:"wl-role",style:{background:No[fi(d)]}}),y("span",null,sc(d,h.other?"":h.name))),y("div",{className:"wl-track"},l.map(u=>y("i",{key:u,className:"wl-gridline",style:{left:`${u}%`}})),In(d).map((u,f)=>{let p=a(u.started_at),w=a(Lr(u,s));return y("div",{key:`${d.id}-${u.id??f}`,className:`wl-run wl-k-${hr(u)}`,"data-kind":hr(u),title:`${o(`wingline.run.${hr(u)}`)} · ${gn(o,Lr(u,s)-u.started_at)}`,style:{left:`${p}%`,width:`${Math.max(0,w-p)}%`}})})),y("div",{className:"wl-cost"},jn(d.cost?.usd))))))),y("div",{className:"wl-legend"},["ok","stopped","paused","running"].map(h=>y("span",{key:h},y("i",{className:`wl-k-${h}`}),o(`wingline.run.${h}`))),y("span",{className:"wl-roles"},qh.map(h=>y("span",{key:h},y("span",{className:"wl-role",style:{background:No[h]}}),o(`wingline.role.${h}`)))))))}function S_(n,e,t){if(hr(n)!=="stopped")return"";let r=Tt(n.max_runtime_seconds)&&n.max_runtime_seconds>0?n.max_runtime_seconds:null;return n.outcome==="timed_out"?t("wingline.run.limitHit",gn(t,r||e)):r&&e>r?t("wingline.run.pastLimit",gn(t,r),n.outcome||n.status||"?"):""}function E_({task:n,byId:e,now:t,t:i,onAction:r,log:s,note:o,setNote:a,onClose:c,showReason:l,place:h}){let d=fi(n),u=In(n),f=v=>e.get(v)?.title||v,p=(n.parents||[]).map(f).join(", ")||i("wingline.dr.nothing"),w=(n.children||[]).map(f).join(", ")||i("wingline.dr.nothing"),g=n.status==="blocked",m=["estimated","actual","mixed","none"].includes(n.cost?.status)?n.cost.status:"none",S=Tt(n.max_runtime_seconds)&&n.max_runtime_seconds>0?gn(i,n.max_runtime_seconds):i("wingline.dr.noLimit"),U=s&&s.id===n.id?s:null;return y("aside",{className:"wl-sheet",role:"dialog","aria-modal":"false","aria-labelledby":"wl-sheet-h","data-id":n.id,style:h||void 0},y("div",{className:"wl-sheet-head"},y("div",{className:"wl-sheet-top"},y("span",{className:"wl-role",style:{background:No[d]}}),y("span",null,i(`wingline.role.${d}`)),y("span",{className:"wl-mono"},n.id),y("button",{type:"button",className:"wl-x","aria-label":i("wingline.dr.close"),"data-act":"close-sheet",onClick:c},y(di,{name:"close",size:14}))),y("h3",{id:"wl-sheet-h"},n.title),y(x_,{task:n,t:i})),y("div",{className:"wl-sheet-body"},l&&g?y("p",{className:"wl-sheet-why","data-reason":"1"},Kh(n,i)):null,y("dl",{className:"wl-dl"},y("div",null,y("dt",null,i("wingline.dr.spent")),y("dd",null,jn(n.cost?.usd),y("small",{"data-cost":m},i(`wingline.cost.${m}`)))),y("div",null,y("dt",null,i("wingline.dr.work")),y("dd",null,gn(i,Ss(n,t)))),y("div",null,y("dt",null,i("wingline.dr.attempts")),y("dd",null,String(u.length))),y("div",null,y("dt",null,i("wingline.dr.comments")),y("dd",null,String(Tt(n.comments)?n.comments:0)))),y("div",{className:"wl-kv"},y("span",null,i("wingline.dr.assignee")),y("span",null,n.assignee||"—"),y("span",null,i("wingline.dr.limit")),y("span",null,S),y("span",null,i("wingline.dr.retries")),y("span",null,Tt(n.max_retries)?`${n.consecutive_failures||0}/${n.max_retries}`:String(n.consecutive_failures||0)),y("span",null,i("wingline.dr.created")),y("span",null,Nr(n.created_at)),y("span",null,i("wingline.dr.waits")),y("span",null,p),y("span",null,i("wingline.dr.unlocks")),y("span",null,w),n.activity&&n.activity.text?y("span",null,i("wingline.dr.activity")):null,n.activity&&n.activity.text?y("span",null,n.activity.text):null),y("h4",{className:"wl-h4"},i("wingline.dr.attempts")),u.length?y("ol",{className:"wl-attempts"},u.map((v,R)=>{let I=hr(v),O=Lr(v,t)-v.started_at,_=S_(v,O,i);return y("li",{key:v.id??R,className:`is-${I}`,"data-attempt":R+1},y("i",null),y("div",{className:"wl-att-line"},y("b",null,i("wingline.run.attempt",R+1)),y("span",null,Nr(v.started_at))),y("div",{className:"wl-att-out"},y("span",{"data-outcome":"1"},v.outcome||v.status||i(`wingline.run.${I}`)),y("span",null,gn(i,O))),_?y("small",null,_):null,y(xf,{text:v.error_plain||"",t:i}))})):y("p",{className:"wl-muted"},i("wingline.dr.noRuns")),U?y("div",{className:"wl-log"},y("div",{className:"wl-log-head"},y(di,{name:"log"}),i("wingline.dr.log"),y(cn,{id:"log-close",kind:"ghost",label:i("wingline.dr.logClose"),onClick:()=>r("log-close",n)})),U.loading?y("p",{className:"wl-muted"},i("wingline.dr.logLoading")):U.error?y("p",{className:"wl-muted",role:"alert"},i("wingline.dr.logFailed",U.error)):U.exists?y("div",null,U.truncated?y("p",{className:"wl-muted"},i("wingline.dr.logTrunc")):null,y("pre",{className:"wl-logpre wl-mono"},U.content||i("wingline.dr.logEmpty"))):y("p",{className:"wl-muted"},i("wingline.dr.logNone"))):null,y("div",{className:"wl-note"},y("h4",{className:"wl-h4"},i("wingline.dr.note")),y("textarea",{className:"wl-input",placeholder:i("wingline.dr.notePh"),"aria-label":i("wingline.dr.note"),value:o,onChange:v=>a(v.target.value)}),y(cn,{id:"note",icon:"note",label:i("wingline.act.note"),disabled:!o.trim(),onClick:()=>r("note",n)}))),y("div",{className:"wl-sheet-foot"},g?y(cn,{id:"retry",icon:"retry",kind:"primary",label:i("wingline.act.retry"),onClick:()=>r("retry",n)}):null,y(cn,{id:"log",icon:"log",label:i("wingline.act.log"),onClick:()=>r("log",n)}),y(cn,{id:"kanban",icon:"board",label:i("wingline.act.kanban"),onClick:()=>r("kanban",n)}),y(cn,{id:"chat",icon:"chat",label:i("wingline.act.chat"),onClick:()=>r("chat",n)}),n.status!=="archived"?y(cn,{id:"archive",icon:"archive",kind:"ghost",label:i("wingline.act.archive"),onClick:()=>r("archive",n)}):null))}function Ql({x:n,y:e,st:t}){let i=t==="crash"?6.5:t==="pause"?6:5;return y("g",{className:`wlf-lamp is-${t}`},y("circle",{className:"wlf-lamp-c",cx:n,cy:e,r:i}),y("circle",{cx:n-i*.3,cy:e-i*.3,r:i*.35,fill:Me.lampHi}))}function yf(n,e,t,i,r,s){let o=r-Math.sqrt(Math.max(0,r*r-(r-s)*(r-s)));return`M${n+o},${e+i-s} H${n+t-o} A${r},${r} 0 0 1 ${n+t-r},${e+i} H${n+r} A${r},${r} 0 0 1 ${n+o},${e+i-s} Z`}function ws({x:n,y:e,w:t,h:i,r=10,role:s}){return y("g",null,y("rect",{x:n,y:e,width:t,height:i,rx:r,fill:"url(#wlf-block)",filter:"url(#wlf-f-block)"}),y("path",{d:yf(n,e,t,i,r,4),fill:Ts[s],opacity:.85}))}function ec({x:n,y:e,w:t,h:i,r}){return y("rect",{className:"wlf-hazard",x:n,y:e,width:t,height:i,rx:r,fill:"url(#wlf-hz)"})}function T_({m:n,st:e,gateIn:t}){let{x:i,y:r}=n,s=e==="crash"||e==="pause",o=e==="work"?" is-work":s?" is-jam":"";if(n.kind==="press")return y("g",null,y(ws,{x:i-50,y:r-62,w:100,h:34,role:n.role}),y(ws,{x:i-50,y:r+28,w:100,h:34,role:n.role}),s?y(ec,{x:i-46,y:r+48,w:92,h:10,r:4}):null,y("rect",{x:i-27.6,y:r-20,width:55.2,height:42,rx:8,fill:Me.plate}),y("g",{className:`wlf-press${o}`},[-18,18].map(f=>y("line",{key:f,x1:i+f,y1:r-66,x2:i+f,y2:r-48,stroke:Me.rod,strokeWidth:5,strokeLinecap:"round"})),y("rect",{x:i-30,y:r-50,width:60,height:46,rx:9,fill:`url(#wlf-head-${n.role})`,filter:"url(#wlf-f-head)"}),y("path",{d:`M${i-30},${r-42} V${r-41} A9,9 0 0 1 ${i-21},${r-50} H${i+21} A9,9 0 0 1 ${i+30},${r-41} V${r-42} Z`,fill:Me.shine}),y("rect",{x:i-14,y:r-34,width:28,height:14,rx:4,fill:Me.inset})),y("rect",{x:i-40,y:r-66,width:80,height:26,rx:8,fill:Me.housing}),[0,1,2,3,4].map(f=>y("rect",{key:f,x:i-30+f*10,y:r-60,width:5,height:14,fill:Me.vent})),y(Ql,{x:i+30,y:r-53,st:e}));if(n.kind==="scan")return y("g",null,y(ws,{x:i-30,y:r-42,w:60,h:20,r:8,role:n.role}),y(ws,{x:i-30,y:r+22,w:60,h:20,r:8,role:n.role}),s?y(ec,{x:i-28,y:r+34,w:56,h:7,r:3}):null,y("rect",{x:i-26,y:r-30,width:52,height:60,rx:10,fill:e==="work"?Me.glassOn:Me.glass,stroke:Me.glassLine,strokeWidth:2}),e==="work"?y("rect",{className:"wlf-beam",x:i-21.5,y:r-28,width:3,height:56,fill:Me.beam}):null,y("rect",{x:i-34,y:r-50,width:68,height:20,rx:7,fill:Me.housing}),y("text",{className:"wlf-num",x:i-21,y:r-39.5,fill:Me.scanNum,textAnchor:"middle",dominantBaseline:"central"},String(n.n)),y(Ql,{x:i+24,y:r-40,st:e}));if(n.kind==="gate"){let f=t?t.done.slice(0,5):[];return y("g",null,y(ws,{x:i-60,y:r-66,w:120,h:40,r:12,role:n.role}),y(ws,{x:i-60,y:r+26,w:120,h:40,r:12,role:n.role}),f.map((p,w)=>y("circle",{key:w,className:p?"wlf-in is-on":"wlf-in",cx:i-(f.length-1)*12+w*24,cy:r+38,r:6,fill:p?Me.lampWork:Me.lampOff})),t?y("text",{className:"wlf-note",x:i,y:r+58,textAnchor:"middle",dominantBaseline:"central",fill:Me.mute},t.label):null,s?y(ec,{x:i-56,y:r-40,w:112,h:8,r:4}):null,y("ellipse",{cx:i,cy:r+2,rx:24.8,ry:18.1,fill:Me.plate}),y("rect",{className:`wlf-arm${o}`,x:i-3.5,y:r-50,width:7,height:24,rx:3.5,fill:Me.rod}),y("g",{className:`wlf-stamp${o}`},y("circle",{cx:i,cy:r-36,r:26,fill:"url(#wlf-disc)",filter:"url(#wlf-f-head)"}),y("circle",{cx:i,cy:r-36,r:15,fill:"none",stroke:Me.ring,strokeWidth:3})),y(Ql,{x:i+46,y:r-56,st:e}))}let a=i+8+9*Math.cos(1.1*Math.PI),c=r-16+9*Math.sin(1.1*Math.PI),l=i+8+9*Math.cos(1.6*Math.PI),h=r-16+9*Math.sin(1.6*Math.PI),d=r+6,u=Array.from({length:9},(f,p)=>`L${i-14+p*8},${d+Math.sin(p)*2}`).join(" ");return y("g",null,y("rect",{x:i-66,y:r-48,width:132,height:96,rx:22,fill:"url(#wlf-lab)",filter:"url(#wlf-f-block)"}),y("path",{d:yf(i-66,r-48,132,96,22,8),fill:Ts[n.role]}),s?y(ec,{x:i-60,y:r+28,w:120,h:10,r:4}):null,y("g",{clipPath:"url(#wlf-dome)"},y("rect",{x:i-20,y:r-40,width:80,height:80,fill:Me.dome}),y("path",{d:`M${i-14},${d} ${u} L${i+50},${r+30} L${i-14},${r+30} Z`,fill:e==="work"?Me.liquidOn:Me.liquid})),y("circle",{cx:i+18,cy:r-6,r:30,fill:"none",stroke:Me.domeLine,strokeWidth:3}),y("path",{d:`M${a},${c} A9,9 0 0 1 ${l},${h}`,fill:"none",stroke:Me.glint,strokeWidth:3}),y("g",{className:`wlf-glass${o}`},y("circle",{cx:i-34,cy:r-18,r:9,fill:"none",stroke:Me.housing,strokeWidth:4}),y("line",{x1:i-28,y1:r-12,x2:i-20,y2:r-4,stroke:Me.housing,strokeWidth:4,strokeLinecap:"round"})),y(Ql,{x:i+52,y:r-34,st:e}))}function A_({task:n,x:e,y:t,sel:i,alert:r,scrap:s,waits:o,onSelect:a,label:c}){let l=()=>a(n.id);return y("g",{className:`wlf-pkg${s?" is-scrap":""}`,style:{transform:`translate(${e}px,${t}px)`},role:"button",tabIndex:0,"aria-label":c,"data-pkg":"1","data-id":n.id,onClick:l,onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),l())}},y("rect",{x:-21,y:-21,width:42,height:42,fill:"transparent"}),y("ellipse",{cx:2,cy:12,rx:16,ry:5.5,fill:Me.crateShadow}),y("rect",{x:-15,y:-13.5,width:30,height:14,rx:4,fill:s?Me.scrapLid:Me.crateLid}),y("rect",{x:-15,y:-4.5,width:30,height:18,rx:4,fill:s?"url(#wlf-scrapc)":"url(#wlf-crate)"}),y("rect",{x:-12,y:-4,width:24,height:1,fill:Me.crateHi}),y("rect",{x:-3,y:-13.5,width:6,height:9,fill:s?Me.scrapTape:Me.tape}),y("rect",{x:-3,y:-4.5,width:6,height:6,fill:Me.shade}),y("rect",{x:-11,y:.5,width:9,height:8,rx:2,fill:s?Me.scrapTag:Ts[fi(n)]}),r?y("g",{className:"wlf-bang","data-alert":r},y("rect",{x:1,y:-.5,width:11,height:10,rx:2,fill:r==="crash"?Me.red:Me.amber}),y("rect",{x:5.8,y:1.2,width:1.4,height:4.6,fill:Me.white}),y("rect",{x:5.8,y:6.6,width:1.4,height:1.4,fill:Me.white})):null,o?y("g",{"aria-hidden":"true"},y("circle",{cx:14,cy:-16,r:8,fill:Me.ink}),y("path",{d:"M11.4,-17.5 A2.6,2.6 0 0 1 16.6,-17.5",fill:"none",stroke:Me.white,strokeWidth:1.6}),y("rect",{x:10.5,y:-17,width:7,height:5,fill:Me.white})):null,y("rect",{className:"wlf-pkg-focus",x:-20,y:-18.5,width:40,height:37,rx:8}),i?y("rect",{className:"wlf-pkg-sel",x:-20,y:-18.5,width:40,height:37,rx:8,fill:"none",stroke:Me.ink,strokeWidth:2}):null)}function hf({x:n,y:e,w:t=260,text:i,tone:r,kind:s,anchor:o="middle"}){let a=o==="start"?n:n-t/2;return y("foreignObject",{className:"wlf-fo",x:a,y:e-16,width:t,height:32},y("div",{className:`wlf-tag${s?` is-${s}`:""}${o==="start"?" is-start":""}`},y("span",null,r?y("i",{style:{background:r}}):null,y("em",null,i))))}function C_(){let n=(i,r,s,o)=>y("filter",{id:i,x:"-30%",y:"-30%",width:"160%",height:"180%"},y("feDropShadow",{dx:0,dy:r,stdDeviation:s,floodColor:Me.shadow,floodOpacity:o})),e=(i,r,s)=>y("linearGradient",{id:i,x1:0,y1:0,x2:0,y2:1},y("stop",{offset:0,stopColor:r}),y("stop",{offset:1,stopColor:s})),t=Dn;return y("defs",null,e("wlf-floor",Me.floor0,Me.floor1),e("wlf-block",Me.block0,Me.block1),e("wlf-lab",Me.block0,Me.lab1),e("wlf-crate",Me.crate0,Me.crate1),e("wlf-scrapc",Me.scrap0,Me.scrap1),qh.map(i=>y("linearGradient",{key:i,id:`wlf-head-${i}`,x1:0,y1:0,x2:0,y2:1},y("stop",{offset:0,stopColor:c_[i]}),y("stop",{offset:1,stopColor:Ts[i]}))),y("radialGradient",{id:"wlf-disc",cx:.35,cy:.3,r:.75},y("stop",{offset:0,stopColor:Me.disc0}),y("stop",{offset:1,stopColor:Ts.gate})),n("wlf-f-floor",18,20,.28),n("wlf-f-belt",4,4,.25),n("wlf-f-block",5,5,.25),n("wlf-f-zone",4,5,.18),n("wlf-f-head",6,5,.3),y("pattern",{id:"wlf-hz",width:14,height:14,patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)"},y("rect",{width:7,height:14,fill:Me.yellow}),y("rect",{x:7,width:7,height:14,fill:Me.redBed})),y("clipPath",{id:"wlf-floorclip"},y("rect",{x:t.x+12,y:t.y+12,width:t.w-24,height:t.h-26,rx:28})),y("clipPath",{id:"wlf-dome"},y("circle",{cx:496,cy:764,r:30})),y("clipPath",{id:"wlf-dockclip"},y("rect",{x:ui.dock.x,y:ui.dock.y,width:ui.dock.w,height:ui.dock.h,rx:18})))}function R_({t:n}){let e=ui.intake,t=ui.dock,i=ui.scrap,r={x:Dn.x+12,y:Dn.y+12,w:Dn.w-24,h:Dn.h-26},s=[];for(let c=r.x+40;c<r.x+r.w;c+=40)s.push(c);let o=[];for(let c=r.y+40;c<r.y+r.h;c+=40)o.push(c);let a=(c,l,h,d,u=Me.label)=>y("text",{key:d,className:"wlf-zone-l",x:l,y:h,fill:u},c);return y("g",{"aria-hidden":"true"},y("rect",{x:r.x,y:r.y,width:r.w,height:r.h,rx:28,fill:"url(#wlf-floor)",filter:"url(#wlf-f-floor)"}),y("g",{clipPath:"url(#wlf-floorclip)",stroke:Me.grid,strokeWidth:1},s.map(c=>y("line",{key:`x${c}`,x1:c,y1:r.y,x2:c,y2:r.y+r.h})),o.map(c=>y("line",{key:`y${c}`,x1:r.x,y1:c,x2:r.x+r.w,y2:c}))),y("rect",{x:e.x,y:e.y,width:e.w,height:e.h,rx:18,fill:Me.intake,stroke:Me.intakeLine,strokeWidth:2,strokeDasharray:"6 6"}),y("rect",{x:26,y:380,width:18,height:140,rx:6,fill:Me.door}),Array.from({length:17},(c,l)=>y("rect",{key:`d${l}`,x:28,y:386+l*8,width:14,height:2,fill:Me.doorSlat})),y("rect",{x:t.x,y:t.y,width:t.w,height:t.h,rx:18,fill:Me.dock,filter:"url(#wlf-f-zone)"}),y("g",{clipPath:"url(#wlf-dockclip)"},Array.from({length:Math.floor((t.h-60)/23)+1},(c,l)=>y("rect",{key:`p${l}`,x:t.x,y:t.y+60+l*23,width:t.w,height:1.5,fill:Me.plank}))),y("rect",{x:i.x,y:i.y,width:i.w,height:i.h,rx:16,fill:Me.scrap,stroke:Me.scrapLine,strokeWidth:2,strokeDasharray:"4 6"}),y("g",{filter:"url(#wlf-f-belt)"},Wh.map((c,l)=>y("polyline",{key:`bd${l}`,className:"wlf-bed",points:vs(c),fill:"none",stroke:Me.bed,strokeWidth:30,strokeLinejoin:"round"})),y("polyline",{className:"wlf-redbed",points:vs(Xh),fill:"none",stroke:Me.redBed,strokeWidth:30})),Wh.map((c,l)=>y("polyline",{key:`bi${l}`,points:vs(c),fill:"none",stroke:Me.bedIn,strokeWidth:22,strokeLinejoin:"round"})),Wh.map((c,l)=>y("polyline",{key:`bs${l}`,className:"wlf-slats",points:vs(c),fill:"none",stroke:Me.slat,strokeWidth:22,strokeLinejoin:"round",strokeDasharray:"3 8"})),y("polyline",{points:vs(Xh),fill:"none",stroke:Me.yellow,strokeWidth:22}),y("polyline",{className:"wlf-redslats",points:vs(Xh),fill:"none",stroke:Me.redBed,strokeWidth:22,strokeDasharray:"2 16",opacity:.35}),l_.map((c,l)=>y("g",{key:`cb${l}`,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},y("path",{d:c,stroke:Me.cable,strokeWidth:5}),y("path",{d:c,stroke:Me.cableIn,strokeWidth:2}))),a(n("wingline.fx.zone.intake"),e.x+14,e.y+28,"li"),a(n("wingline.fx.zone.build"),308,190,"lb"),a(n("wingline.fx.zone.review"),690,236,"lr"),a(n("wingline.fx.zone.merge"),1012,266,"lm"),a(n("wingline.fx.zone.shipped"),t.x+16,t.y+28,"ls"),a(n("wingline.fx.zone.archived"),i.x+14,i.y+26,"la"))}function I_({tasks:n,now:e,axis:t,selId:i,onSelect:r,onNotice:s,t:o}){let[a,c]=vn(!0),[l,h]=vn(!1),[d,u]=vn(4),[f,p]=vn(t.span),w=Ii(f);w.current=f;let g=Ii(t.span);g.current=t.span,Ri(()=>{if(!l)return;let V=window.setInterval(()=>{let we=w.current+.1*d*60;we>=g.current?(h(!1),c(!0),p(g.current)):p(we)},100);return()=>window.clearInterval(V)},[l,d]),Ri(()=>{a&&p(t.span)},[a,t.span]);let m=a?null:t.toR(Math.min(f,t.span)),S=hi(()=>p_(n,m),[n,m]),U=hi(()=>new Map(n.map(V=>[V.id,V])),[n]),v=hi(()=>Jh(n,o),[n,o]),R=hi(()=>{let V=new Map;for(let we of v)for(let Ce of we.tasks)V.set(Ce.id,we.other?"":we.name);return V},[v]),I={pressA:o("wingline.fx.machine.pressA"),pressB:o("wingline.fx.machine.pressB"),gate:o("wingline.fx.machine.gate"),lab:o("wingline.fx.machine.lab")},O=V=>V.kind==="scan"?o("wingline.fx.machine.scan",V.n):I[V.key],_=Object.values(S.occ).filter(V=>V.state==="work").length,b=S.zones.bay.length,F=S.zones.dock.reduce((V,we)=>V+(we.cost?.usd||0),0),[G,J]=Zy(a?e:m),ne=V=>{let we=S.zoneOf[V.id];if(we==="machine"){let Ce=Object.keys(S.occ).find(lt=>S.occ[lt].task.id===V.id||S.occ[lt].extra.some(xe=>xe.id===V.id)),ke=Lo.find(lt=>lt.key===Ce);return o("wingline.fx.where.machine",ke?O(ke):"")}return we==="bay"?S.kinds[V.id]==="crash"?o("wingline.fx.where.crash"):o("wingline.fx.where.pause"):we==="intake"?(V.parents||[]).some(Ce=>S.zoneOf[Ce]&&S.zoneOf[Ce]!=="dock")?o("wingline.fx.where.wait"):o("wingline.fx.where.intake"):o(we==="dock"?"wingline.fx.where.dock":"wingline.fx.where.scrap")},q=S.occ.gate&&S.occ.gate.task||[...n].filter(V=>fi(V)==="gate"&&S.zoneOf[V.id]!=="hidden").sort((V,we)=>Es(we)-Es(V))[0],K=q?(()=>{let V=(q.parents||[]).filter(Ce=>U.has(Ce)),we=V.map(Ce=>S.zoneOf[Ce]==="dock");return V.length?{done:we,label:o("wingline.fx.inputs",we.filter(Boolean).length,V.length)}:null})():null,ie=V=>{let we=S.occ[V.key];if(we)return we.task;let Ce=n.filter(ke=>fi(ke)===V.role).map(ke=>({x:ke,r:In(ke).filter(lt=>m==null||lt.started_at<=m).pop()})).filter(ke=>ke.r).sort((ke,lt)=>lt.r.started_at-ke.r.started_at);return Ce.length?Ce[0].x:null},le=V=>{let we=ie(V);we?r(we.id):s(o("wingline.fx.noTask",O(V)))},ve=(V,we)=>{let Ce=S.pos[V.id];return Ce?y(A_,{key:V.id,task:V,x:Ce[0],y:Ce[1],sel:V.id===i,alert:we==="bay"?S.kinds[V.id]:null,scrap:we==="scrap",waits:we==="intake"&&(V.parents||[]).some(ke=>S.zoneOf[ke]&&S.zoneOf[ke]!=="dock"),onSelect:r,label:o("wingline.fx.pkg",V.title,ne(V))}):null},ce=S.zones.bay[0],_e=ce?S.pos[ce.id]:null,Se=ce&&_e?(()=>{let V=S.kinds[ce.id],we=In(ce).filter(Ee=>Tt(Ee.ended_at)&&(m==null||Ee.ended_at<=m)).pop(),Ce=V==="pause"?o("wingline.fx.callPause"):we&&we.outcome==="timed_out"?o("wingline.fx.callLimit"):we&&we.outcome==="crashed"?o("wingline.fx.callCrash"):o("wingline.fx.callStop"),ke=_e[0]+40+(Math.min(b,rc.bay)-1)*76,lt=Math.max(200,Math.min(Dn.x+Dn.w-20-ke,350)),xe=_e[1]-62;return y("g",{key:"callout"},y("path",{d:`M${ke+1},${xe+50} L${ke-10},${xe+58} L${ke+1},${xe+66} Z`,fill:Me.card}),y("foreignObject",{className:"wlf-fo",x:ke,y:xe,width:lt,height:120},y("div",{className:`wlf-call${V==="pause"?" is-pause":""}`,role:"button",tabIndex:0,"data-callout":ce.id,onClick:()=>r(ce.id),onKeyDown:Ee=>{(Ee.key==="Enter"||Ee.key===" ")&&(Ee.preventDefault(),r(ce.id))}},y("small",null,Ce),y("b",null,ce.title),y("span",null,o("wingline.fx.callMeta",gn(o,Ss(ce,m??e)),In(ce).length,jn(ce.cost?.usd))),y("em",null,o("wingline.fx.decide")))))})():null,et=()=>{if(l){h(!1);return}(a||f>=t.span)&&p(0),c(!1),h(!0)},ye=()=>{h(!1),c(!0),p(t.span)},oe=ui.bay,Ae=ui.dock,He=ui.intake,ue=ui.scrap,ge=a?_>0:l;return y("div",{className:"wl-fx"},y("div",{className:"wl-fx-bar"},y("div",{className:`wl-pill${a?"":" is-replay"}`,"data-mode":a?"live":"replay",role:"status"},y("i",null),y("b",null,a?o("wingline.fx.live"):l?o("wingline.fx.replay",d):o("wingline.fx.paused")),y("span",null,a?_?o("wingline.fx.running",_):o("wingline.fx.idle"):_?o("wingline.fx.working",_):o("wingline.fx.idle"))),y("div",{className:"wl-clock"},y("small",null,G),y("b",null,J))),y("div",{className:"wlf-stage"},y("svg",{className:"wlf-svg",viewBox:`${Dn.x} ${Dn.y} ${Dn.w} ${Dn.h}`,preserveAspectRatio:"xMidYMid meet",role:"group","aria-label":o("wingline.fx.aria"),"data-moving":ge?"1":"0","data-jam":b?"1":"0"},y(C_,null),y(R_,{t:o}),y("g",{"data-bay":b},y("rect",{className:`wlf-bin${b?" is-on":""}`,x:oe.x,y:oe.y,width:oe.w,height:oe.h,rx:20,fill:b?Me.binOn:Me.bin,filter:"url(#wlf-f-zone)"}),y("rect",{className:"wlf-binline",x:oe.x+7,y:oe.y+7,width:oe.w-14,height:oe.h-14,rx:15,fill:"none",stroke:Me.binLine,strokeWidth:2.5,strokeDasharray:"10 8",opacity:b?.8:.3}),y("rect",{x:oe.x+22,y:oe.y+20,width:b?184:162,height:34,rx:17,fill:b?Me.red:Me.binOff}),y("text",{className:"wlf-binhead",x:oe.x+38,y:oe.y+37,dominantBaseline:"central",fill:Me.white},o("wingline.fx.bin",b)),b?null:y("text",{className:"wlf-note",x:oe.x+26,y:oe.y+100,dominantBaseline:"central",fill:Me.label},o("wingline.fx.clear")),S.zones.bay.slice(0,rc.bay).map(V=>{let we=S.pos[V.id];return y("g",{key:`ring-${V.id}`,"aria-hidden":"true"},y("circle",{cx:we[0],cy:we[1]+2,r:25,fill:Me.halo}),y("circle",{className:"wlf-ring",cx:we[0],cy:we[1]+2,r:25,fill:"none",stroke:Me.ringRed,strokeWidth:2}))})),S.zones.intake.length?null:y("text",{className:"wlf-note",x:He.x+He.w/2,y:He.y+He.h/2,textAnchor:"middle",fill:Me.label},o("wingline.fx.queueEmpty")),S.zones.scrap.length?null:y("text",{className:"wlf-note",x:ue.x+ue.w/2,y:ue.y+84,textAnchor:"middle",fill:Me.label},o("wingline.fx.none")),y("g",{"data-shipped":S.zones.dock.length},y("rect",{x:Ae.x+12,y:Ae.y+44,width:Ae.w-24,height:66,rx:12,fill:Me.card,filter:"url(#wlf-f-zone)"}),y("text",{className:"wlf-sign",x:Ae.x+26,y:Ae.y+78,dominantBaseline:"central",fill:Me.ink},jn(F)),y("text",{className:"wlf-note",x:Ae.x+Ae.w-26,y:Ae.y+67,textAnchor:"end",dominantBaseline:"central",fill:Me.mute},o("wingline.fx.crates",S.zones.dock.length)),y("text",{className:"wlf-note",x:Ae.x+Ae.w-26,y:Ae.y+89,textAnchor:"end",dominantBaseline:"central",fill:Me.mute},o("wingline.fx.shipped"))),Lo.map(V=>{let we=S.occ[V.key],Ce=we?we.state:"idle",ke=we?we.state==="work"?o("wingline.fx.mWork",O(V),we.task.title):o("wingline.fx.mJam",O(V),we.task.title):o("wingline.fx.mIdle",O(V));return y("g",{key:V.key,className:"wlf-m",role:"button",tabIndex:0,"aria-label":ke,"data-machine":V.key,"data-state":Ce,onClick:()=>le(V),onKeyDown:lt=>{(lt.key==="Enter"||lt.key===" ")&&(lt.preventDefault(),le(V))}},y("rect",{className:"wlf-m-focus",x:V.x-V.w/2-8,y:V.y-V.h/2-8,width:V.w+16,height:V.h+16,rx:14}),y(T_,{m:V,st:Ce,gateIn:V.key==="gate"?K:null}),V.kind==="scan"?null:y("text",{className:"wlf-name",x:V.x,y:V.y+V.h/2+(V.kind==="gate"?26:20),textAnchor:"middle",dominantBaseline:"central",fill:Ce==="crash"?Me.redText:Me.label},O(V).toUpperCase()))}),["intake","bay","dock","scrap"].flatMap(V=>S.zones[V].map(we=>ve(we,V))),S.zones.machine.map(V=>ve(V,"machine")),Lo.filter(V=>S.occ[V.key]&&S.occ[V.key].state==="crash").map(V=>y("g",{key:`sm-${V.key}`,className:"wlf-smoke","data-smoke":V.key,"aria-hidden":"true",fill:Me.smoke},y("circle",{cx:V.x-8,cy:V.y-V.h/2-4,r:7}),y("circle",{cx:V.x+4,cy:V.y-V.h/2-10,r:6}),y("circle",{cx:V.x+14,cy:V.y-V.h/2-2,r:5}))),Lo.map(V=>{let we=S.occ[V.key];if(!we)return null;let Ce=V.kind==="scan",ke=Ce?V.x+40:V.x,lt=Ce?V.y-24:V.y-V.h/2-24;if(we.state==="work"){let xe=In(we.task).filter(Ie=>Ie.started_at<=(m??e)).pop(),Ee=sc(we.task,R.get(we.task.id))+(xe?` · ${gn(o,Math.max(0,(m??e)-xe.started_at))}`:"")+(we.extra.length?` · ${o("wingline.fx.more",we.extra.length)}`:"");return y(hf,{key:`tag-${V.key}`,x:ke,y:lt,w:Ce?250:280,text:Ee,tone:Ts[V.role],anchor:Ce?"start":"middle"})}return y(hf,{key:`tag-${V.key}`,x:ke,y:lt,w:260,text:we.state==="crash"?o("wingline.fx.jam"):o("wingline.fx.held"),kind:we.state,anchor:Ce?"start":"middle"})}),["intake","dock","scrap","bay"].map(V=>S.overflow[V]?y("text",{key:`of-${V}`,className:"wlf-note",x:V==="dock"?Ae.x+Ae.w-20:V==="bay"?oe.x+oe.w-24:V==="intake"?He.x+He.w-14:ue.x+ue.w-14,y:V==="dock"?Ae.y+Ae.h-16:V==="bay"?oe.y+42:V==="intake"?He.y+He.h-14:ue.y+26,textAnchor:"end",fill:Me.mute},o("wingline.fx.more",S.overflow[V])):null),Se)),y("div",{className:"wl-ctrl"},y("button",{type:"button",className:"wl-play","aria-label":o(l?"wingline.fx.pause":"wingline.fx.play"),"data-ctl":"play",onClick:et},y(di,{name:l?"pause":"play",size:14})),y("div",{className:"wl-seg",role:"group","aria-label":o("wingline.fx.speed")},[1,4,16].map(V=>y("button",{key:V,type:"button","aria-pressed":d===V?"true":"false","data-speed":V,onClick:()=>u(V)},`${V}×`))),y("span",{className:"wl-tlab"},Nr(t.toR(0))),y("input",{type:"range",min:0,max:1e3,step:1,value:Math.round(Math.min(f,t.span)/t.span*1e3),"aria-label":o("wingline.fx.scrub"),onChange:V=>{h(!1),c(!1),p(Number(V.target.value)/1e3*t.span)}}),y("span",{className:"wl-tlab"},y("b",null,Nr(a?e:m))),y("button",{type:"button",className:`wl-now${a?" is-live":""}`,"data-ctl":"now","aria-label":o("wingline.fx.nowTip"),onClick:ye},o("wingline.fx.now"))))}function uf(n){return[{key:"read",state:"pending"},{key:"create",state:"pending"},...n.flatMap(e=>[{key:"link",child:e,state:"pending"},{key:"unlink",child:e,state:"pending"}]),{key:"comment",state:"pending"},{key:"archive",state:"pending"}]}function P_(n,e,t,i){return n.key==="read"?i("wingline.dlg.stepRead",e.id):n.key==="create"?i("wingline.dlg.stepCreate",t):n.key==="link"?i("wingline.dlg.stepLink",n.child):n.key==="unlink"?i("wingline.dlg.stepUnlink",e.id,n.child):n.key==="comment"?i("wingline.dlg.stepComment",e.id):i("wingline.dlg.stepArchive",e.id)}function L_(n){let e=Tt(n.max_runtime_seconds)&&n.max_runtime_seconds>0?n.max_runtime_seconds:null;return e?Math.max(1800,Math.round(e*2/1800)*1800):7200}function N_({dlg:n,setDlg:e,onRetry:t,onNote:i,onArchive:r,t:s}){let o=Ii(null),a=n.phase==="running";Ri(()=>{o.current?.focus?.()},[n.kind,n.phase]);let c=()=>{a||e(null)},l=p=>{p.key==="Escape"&&(p.stopPropagation(),c())},h=n.task,d,u,f;if(n.kind==="retry"){f=s("wingline.dlg.retryTitle");let p=parseFloat(n.hours),w=Number.isFinite(p)&&p>=.5,g=w?Math.round(p*3600):0,m=w?gn(s,g):"—",S=Tt(h.max_runtime_seconds)&&h.max_runtime_seconds>0?h.max_runtime_seconds:null,U=n.steps.filter(v=>v.key==="link");d=y("div",null,y("p",{className:"wl-task"},`${h.id} · ${h.title}`),y("p",{className:"wl-callnote","data-note":"why"},s("wingline.dlg.retryWhy")),n.phase==="confirm"?y("label",{className:"wl-field"},s("wingline.dlg.limit"),y("input",{ref:o,className:"wl-input",type:"number",min:.5,step:.5,value:n.hours,"data-field":"limit",onChange:v=>e(R=>({...R,hours:v.target.value}))}),y("small",null,S?s("wingline.dlg.limitOld",gn(s,S)):s("wingline.dlg.limitNone")),w?null:y("small",{role:"alert"},s("wingline.dlg.limitBad"))):null,y("p",null,s("wingline.dlg.willHappen")),y("ol",{className:"wl-steps","data-steps":n.steps.length},n.steps.map((v,R)=>y("li",{key:`${v.key}-${v.child||""}-${R}`,"data-step":v.key,"data-state":v.state},y("i",{className:`wl-mark is-${v.state}`}),y("span",null,P_(v,h,n.phase==="confirm"?m:gn(s,n.limit),s)),y("span",{className:`wl-st is-${v.state}`},s(`wingline.dlg.state.${v.state}`)),v.error?y("span",{className:"wl-serr",role:"alert"},s("wingline.dlg.failed",v.error)):null))),U.length?null:y("p",null,s("wingline.dlg.noChildren")),y("p",{className:"wl-callnote","data-note":"retries"},s("wingline.dlg.retriesNote")),n.newId?y("p",null,s("wingline.dlg.newId",n.newId)):null,n.phase==="done"?y("div",{className:"wl-result",role:"status"},s("wingline.dlg.retryOk",n.newId)):null,n.phase==="failed"?y("div",{className:"wl-result is-failed",role:"alert"},s("wingline.dlg.stoppedAt")):null),u=n.phase==="confirm"?[y(cn,{key:"c",id:"cancel",kind:"ghost",label:s("wingline.dlg.cancel"),onClick:c}),y(cn,{key:"g",id:"confirm",kind:"primary",label:s("wingline.dlg.retryGo",m),disabled:!w,onClick:()=>t(g)})]:[y(cn,{key:"x",id:"close",label:s("wingline.dlg.close"),disabled:a,onClick:c})]}else n.kind==="note"?(f=s("wingline.dlg.noteTitle"),d=y("div",null,y("p",{className:"wl-task"},`${h.id} · ${h.title}`),y("p",null,s("wingline.dlg.noteWill",h.id)),y("div",{className:"wl-quote","data-quote":"1"},n.text),n.phase==="done"?y("div",{className:"wl-result",role:"status"},s("wingline.dlg.noteOk")):null,n.phase==="failed"?y("div",{className:"wl-result is-failed",role:"alert"},s("wingline.dlg.failed",n.error)):null),u=n.phase==="confirm"?[y(cn,{key:"c",id:"cancel",kind:"ghost",label:s("wingline.dlg.cancel"),onClick:c}),y("button",{key:"g",ref:o,type:"button",className:"wl-btn is-primary","data-act":"confirm",onClick:i},s("wingline.act.note"))]:[y(cn,{key:"x",id:"close",label:s("wingline.dlg.close"),disabled:a,onClick:c})]):(f=s("wingline.dlg.archiveTitle"),d=y("div",null,y("p",{className:"wl-task"},`${h.id} · ${h.title}`),y("p",null,s("wingline.dlg.archiveWill",h.id)),n.phase==="sure"?y("p",{className:"wl-callnote",role:"alert"},s("wingline.dlg.archiveSecond")):null,n.phase==="done"?y("div",{className:"wl-result",role:"status"},s("wingline.dlg.archiveOk")):null,n.phase==="failed"?y("div",{className:"wl-result is-failed",role:"alert"},s("wingline.dlg.failed",n.error)):null),u=n.phase==="confirm"?[y(cn,{key:"c",id:"cancel",kind:"ghost",label:s("wingline.dlg.cancel"),onClick:c}),y("button",{key:"g",ref:o,type:"button",className:"wl-btn","data-act":"confirm",onClick:()=>e(p=>({...p,phase:"sure"}))},s("wingline.dlg.archiveNext"))]:n.phase==="sure"?[y(cn,{key:"c",id:"cancel",kind:"ghost",label:s("wingline.dlg.cancel"),onClick:c}),y("button",{key:"g",ref:o,type:"button",className:"wl-btn is-danger","data-act":"confirm",onClick:r},s("wingline.dlg.archiveSure"))]:[y(cn,{key:"x",id:"close",label:s("wingline.dlg.close"),disabled:a,onClick:c})]);return y("div",{className:"wl-scrim",onKeyDown:l,onClick:p=>{p.target===p.currentTarget&&c()}},y("div",{className:"wl-dlg",role:"dialog","aria-modal":"true","aria-labelledby":"wl-dlg-h","data-dialog":n.kind,"data-phase":n.phase},y("h2",{id:"wl-dlg-h"},f),d,y("div",{className:"wl-dlg-actions"},u)))}function D_({world:n,onPick:e,onFallback:t,t:i}){let r=Ii(null),s=Ii(null),o=Ii({onPick:e,onFallback:t});return o.current={onPick:e,onFallback:t},Ri(()=>{if(!r.current)return;let a={legend:{work:i("wingline.world.st.work"),done:i("wingline.world.st.done"),fail:i("wingline.world.st.fail"),wait:i("wingline.world.st.wait")},hint:{planet:i("wingline.world.hint.planet"),region:i("wingline.world.hint.region"),harbor:i("wingline.world.hint.harbor"),village:i("wingline.world.hint.village"),farm:i("wingline.world.hint.farm")},loading:i("wingline.world.loading"),updating:i("wingline.world.updating")};return s.current=jd(r.current,{data:n,words:a,stop:bs(nf,"region"),onPick:(c,l)=>o.current.onPick(c,l),onFallback:c=>o.current.onFallback(c),onStop:c=>tc(nf,c)}),()=>{s.current?.destroy(),s.current=null}},[]),Ri(()=>{s.current?.update(n)},[n]),y("section",{className:"wl-world","aria-label":i("wingline.world.label")},y("div",{className:"wl-world-host",ref:r}))}function U_(){let n=Oy(Ir),[e,t]=vn(()=>{let he=bs(Gh,"");return typeof he=="string"?he:""}),[i,r]=vn(()=>bs(tf,"board")==="factory"?"factory":"board"),[s,o]=vn(null),[a,c]=vn(null),[l,h]=vn(null),[d,u]=vn(null),[f,p]=vn([]),[w,g]=vn(null),[m,S]=vn(null),U=Ii(null),v=Ii(!1),[R,I]=vn(null),[O,_]=vn(null),[b,F]=vn(null),[G,J]=vn(null),[ne,q]=vn(""),K=Ii(0),ie=Ii(n);ie.current=n;let le=Vh(async()=>{let he=++K.current;try{if(!Pr||typeof Pr.rest!="function")throw new Error(ie.current("wingline.err.noRest"));let C=await Pr.rest(`/overview${e?`?board=${Ci(e)}`:""}`);if(he!==K.current)return;if(!C||!Array.isArray(C.tasks))throw new Error(ie.current("wingline.err.shape"));o(C),h(null),u(Date.now())}catch(C){if(he!==K.current)return;console.warn(`[${Ir}] reading the overview failed`,C),h(_s(C))}},[e]);Ri(()=>{let he=()=>{document.visibilityState!=="hidden"&&le()};he();let C=window.setInterval(he,Vy),x=()=>{document.visibilityState==="visible"&&le()};return document.addEventListener("visibilitychange",x),()=>{window.clearInterval(C),document.removeEventListener("visibilitychange",x)}},[le]),Ri(()=>{if(!b)return;let he=window.setTimeout(()=>F(null),6e3);return()=>window.clearTimeout(he)},[b]);let ve=hi(()=>s&&Array.isArray(s.tasks)?s.tasks.filter(he=>he&&typeof he.id=="string"):[],[s]),ce=s&&Tt(s.now)?s.now:Date.now()/1e3,_e=hi(()=>new Map(ve.map(he=>[he.id,he])),[ve]),Se=hi(()=>Jy(ve,ce),[ve,ce]),et=ve.filter(he=>he.status==="blocked"),ye=ve.filter(he=>he.status==="running"),oe=_e.get(w)||null,Ae=s?.board||e,He=hi(()=>Array.isArray(s?.boards)?s.boards.filter(he=>he&&typeof he.slug=="string"):[],[s]);Ri(()=>{if(!s||v.current||!He.length)return;v.current=!0;let he=bs(Gh,"");if(he&&He.some(x=>x.slug===he)){he!==s.board&&t(he);return}if(ve.length)return;let C=He.filter(x=>Tt(x.tasks)&&x.tasks>0).sort((x,ee)=>(ee.last_activity||0)-(x.last_activity||0))[0];C&&C.slug!==s.board&&(o(null),t(C.slug))},[s,He,ve.length]),zy(()=>{if(!oe)return;let he=()=>{let C=U.current;for(;C&&C.parentElement&&!/auto|scroll/.test(window.getComputedStyle(C).overflowY);)C=C.parentElement;let x=C?C.getBoundingClientRect():null;if(!x||x.width<320||x.height<240){S(null);return}let ee=Math.max(0,x.top),se=Math.min(window.innerHeight,x.bottom);S({top:`${ee}px`,height:`${se-ee}px`,right:`${Math.max(0,window.innerWidth-x.right)}px`})};return he(),window.addEventListener("resize",he),()=>window.removeEventListener("resize",he)},[oe]),Ri(()=>{if(!oe)return;let he=C=>{C.key==="Escape"&&!O&&g(null)};return document.addEventListener("keydown",he),()=>document.removeEventListener("keydown",he)},[oe,O]);let ue=Vh((he,C)=>{console.warn(`[${Ir}] ${he} failed`,C),p(x=>[...x.slice(-5),{id:`${Date.now()}-${x.length}`,source:he,message:_s(C)}])},[]),ge=Vh(he=>g(he),[]),V=he=>{r(he),tc(tf,he)},we=he=>{v.current=!0,t(he),tc(Gh,he),(i!=="board"||a)&&o(null),g(null),J(null)},Ce=he=>{J({id:he.id,loading:!0}),Vi(`/tasks/${Ci(he.id)}/log?tail=${Wy}`,Ae).then(C=>J({id:he.id,loading:!1,exists:C?.exists!==!1,content:ff(C?.content||""),truncated:!!C?.truncated})).catch(C=>{J({id:he.id,loading:!1,error:_s(C)}),ue(n("wingline.act.log"),C)})},ke=async he=>{let C=n("wingline.chat.prompt",he.id,he.title,Ae,n(`wingline.status.${Zh(he.status)}`),he.status==="blocked"?Kh(he,n):""),x=!1;try{x=!!await Qd?.composer?.insertText?.(null,C)}catch(ee){console.warn(`[${Ir}] the chat composer refused the question`,ee)}if(x){F(n("wingline.chat.inserted"));return}try{await navigator.clipboard.writeText(C),F(n("wingline.chat.copied"))}catch(ee){ue(n("wingline.act.chat"),ee),F(n("wingline.chat.failed"))}},lt=(he,C)=>{he==="retry"?_({kind:"retry",task:C,phase:"confirm",hours:String(L_(C)/3600),steps:uf((C.children||[]).slice())}):he==="archive"?_({kind:"archive",task:C,phase:"confirm"}):he==="note"?ne.trim()&&_({kind:"note",task:C,phase:"confirm",text:ne.trim()}):he==="log"?Ce(C):he==="log-close"?J(null):he==="kanban"?Qd?.navigate?.("/kanban"):he==="chat"&&ke(C)},xe=async he=>{let C=O.task,x=Ae,ee=O.steps.map(de=>({...de,state:"pending",error:void 0})),se=de=>_(fe=>fe&&fe.task.id===C.id?{...fe,...de}:fe),me=0,Ne=(de,fe)=>{ee=ee.map((Ue,Je)=>Je===me?{...Ue,state:de,error:fe}:Ue),se({steps:ee})},Fe=async de=>{Ne("running");try{let fe=await de();return Ne("done"),me+=1,fe}catch(fe){throw Ne("failed",_s(fe)),fe}};se({phase:"running",limit:he,steps:ee});try{let de=await Fe(()=>Vi(`/tasks/${Ci(C.id)}`,x)),fe=de?.task||{},Ue=Array.isArray(de?.links?.children)?de.links.children:C.children||[],Je=Array.isArray(de?.links?.parents)?de.links.parents:C.parents||[];ee=[ee[0],...uf(Ue).slice(1)],se({steps:ee});let Ge=await Fe(async()=>{let tt=(await Vi("/tasks",x,{method:"POST",body:{title:fe.title??C.title,body:fe.body??null,assignee:fe.assignee??C.assignee??null,tenant:fe.tenant??null,priority:Tt(fe.priority)?fe.priority:0,parents:Je,skills:fe.skills??null,goal_mode:!!fe.goal_mode,goal_max_turns:fe.goal_max_turns??null,model_override:fe.model_override??null,provider_override:fe.provider_override??null,reasoning_effort:fe.reasoning_effort??null,workspace_kind:fe.workspace_kind??null,workspace_path:fe.workspace_path??null,project_id:fe.project_id??null,max_runtime_seconds:he}}))?.task?.id;if(!tt)throw new Error(n("wingline.err.noId"));return tt});se({newId:Ge});for(let Oe of Ue)await Fe(()=>Vi("/links",x,{method:"POST",body:{parent_id:Ge,child_id:Oe}})),await Fe(async()=>{let tt=await Vi(`/links?parent_id=${Ci(C.id)}&child_id=${Ci(Oe)}`,x,{method:"DELETE"});if(tt&&tt.ok===!1)throw new Error(n("wingline.err.refused"))});await Fe(()=>Vi(`/tasks/${Ci(C.id)}/comments`,x,{method:"POST",body:{body:n("wingline.dlg.retryComment",Ge,gn(n,he)),author:"wingline"}})),await Fe(async()=>{let Oe=await Vi(`/tasks/${Ci(C.id)}`,x,{method:"PATCH",body:{status:"archived"}});if(Oe?.task&&Oe.task.status!=="archived")throw new Error(n("wingline.err.refused"))}),se({phase:"done"}),g(Ge)}catch(de){ue(n("wingline.act.retry"),de),se({phase:"failed"})}le()},Ee=async()=>{let{task:he,text:C}=O;_(x=>({...x,phase:"running"}));try{await Vi(`/tasks/${Ci(he.id)}/comments`,Ae,{method:"POST",body:{body:C,author:"wingline"}}),_(x=>({...x,phase:"done"})),q("")}catch(x){ue(n("wingline.act.note"),x),_(ee=>({...ee,phase:"failed",error:_s(x)}))}le()},Ie=async()=>{let{task:he}=O;_(C=>({...C,phase:"running"}));try{let C=await Vi(`/tasks/${Ci(he.id)}`,Ae,{method:"PATCH",body:{status:"archived"}});if(C?.task&&C.task.status!=="archived")throw new Error(n("wingline.err.refused"));_(x=>({...x,phase:"done"}))}catch(C){ue(n("wingline.act.archive"),C),_(x=>({...x,phase:"failed",error:_s(C)}))}le()},Pe=s?.totals||{},ze=[{k:"needs",v:Pe.needs_you,tone:"var(--ui-yellow)",alert:(Pe.needs_you||0)>0},{k:"working",v:Pe.working,tone:"var(--ui-accent)"},{k:"queued",v:Pe.queued,tone:"var(--ui-text-tertiary)"},{k:"done",v:Pe.done,tone:"var(--ui-green)"}],ct=[...l?[{id:"overview",source:n("wingline.problems.overview"),message:l}]:[],...(Array.isArray(s?.errors)?s.errors:[]).map((he,C)=>({id:`be-${C}`,source:n("wingline.problems.backend",String(he?.source||"")),message:String(he?.message||"")})),...f],nt=hi(()=>Jh(ve,n),[ve,n]),ht=hi(()=>s&&i==="board"&&!a?o_(s,n,bs(Hh,null)):null,[s,n,i,a]);Ri(()=>{ht?.spots&&JSON.stringify(ht.spots)!==JSON.stringify(bs(Hh,null))&&tc(Hh,ht.spots)},[ht]);let mt=(he,C)=>{if(he==="board")we(C);else if(he==="task"){g(C);let x=_e.get(C);x?.status==="running"&&Ce(x)}},X=oe?y(E_,{task:oe,byId:_e,now:ce,t:n,onAction:lt,log:G,note:ne,setNote:q,place:m,onClose:()=>g(null),showReason:i==="factory"}):null,At;return s?ve.length?i==="factory"?At=y(I_,{tasks:ve,now:ce,axis:Se,selId:oe?.id,onSelect:ge,onNotice:F,t:n}):At=y("main",{className:"wl-main"},a?y("div",{className:"wl-world-off",role:"status"},y(di,{name:"info"}),y("span",null,n("wingline.world.off",a))):ht?.region?.pipelines?.length?y(D_,{world:ht,onPick:mt,onFallback:c,t:n}):null,y(v_,{list:et,selId:oe?.id,onSelect:ge,onAction:lt,now:ce,t:n}),y(w_,{list:ye,tasks:ve,selId:oe?.id,onSelect:ge,now:ce,t:n}),y(b_,{groups:nt,selId:oe?.id,onSelect:ge,now:ce,t:n}),y(M_,{groups:nt,axis:Se,selId:oe?.id,onSelect:ge,filter:R,now:ce,t:n})):At=y("div",{className:"wl-state"},n("wingline.empty")):At=l?y("div",{className:"wl-state",role:"alert"},l,y(cn,{id:"reload",icon:"retry",label:n("wingline.tryAgain"),onClick:()=>le()})):y("div",{className:"wl-state",role:"status"},n("wingline.loading")),y("div",{className:"wl-root","data-view":i,ref:U},y("style",null,g_),y("header",{className:"wl-top"},y("div",{className:"wl-brand"},y("h1",null,n("wingline.title")),y("span",null,n("wingline.subtitle"))),y("select",{className:"wl-select","aria-label":n("wingline.boardPick"),value:Ae||"",onChange:he=>we(he.target.value)},He.length?He.map(he=>y("option",{key:he.slug,value:he.slug,"data-tasks":Tt(he.tasks)?he.tasks:""},Tt(he.tasks)?n("wingline.boardOpt",he.name||he.slug,he.tasks):he.name||he.slug)):y("option",{value:Ae||""},Ae||"—")),y("div",{className:"wl-seg",role:"group","aria-label":n("wingline.view.label")},["board","factory"].map(he=>y("button",{key:he,type:"button","data-view":he,"aria-pressed":i===he?"true":"false",onClick:()=>V(he)},n(`wingline.view.${he}`)))),y("div",{className:"wl-counts"},ze.map(he=>y("button",{key:he.k,type:"button",className:`wl-count${he.alert?" is-alert":""}`,"data-count":he.k,"aria-pressed":R===he.k?"true":"false","aria-label":`${n(`wingline.count.${he.k}`)}: ${Tt(he.v)?he.v:"—"}. ${n("wingline.count.filter",n(`wingline.count.${he.k}`))}`,onClick:()=>I(C=>C===he.k?null:he.k)},y("span",{className:"wl-dot",style:{background:he.tone}}),y("b",null,Tt(he.v)?String(he.v):"—"),y("span",null,n(`wingline.count.${he.k}`)))),y("span",{className:"wl-count is-static","data-count":"spend"},y(di,{name:"coin"}),y("b",null,Tt(Pe.spend_usd)?jn(Pe.spend_usd):"—"),y("span",null,n("wingline.count.spend")))),d?y("span",{className:"wl-updated"},n("wingline.updated",new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}))):null),ct.length?y("div",{className:"wl-problems",role:"alert"},y("div",{className:"wl-problems-head"},y(di,{name:"alert"}),n("wingline.problems.title",ct.length),f.length?y(cn,{id:"dismiss",kind:"ghost",label:n("wingline.problems.dismiss"),onClick:()=>p([])}):null),y("ul",null,ct.map(he=>y("li",{key:he.id},y("b",null,he.source),`: ${he.message}`)))):null,At,X,O?y(N_,{dlg:O,setDlg:_,onRetry:xe,onNote:Ee,onArchive:Ie,t:n}):null,b?y("div",{className:"wl-notice",role:"status"},y(di,{name:"info"}),y("span",null,b)):null)}function F_(){let n=Pr?.i18n?.t?.("wingline.nav");return n&&n!=="wingline.nav"?n:Yh.en.wingline.nav}var tb={id:Ir,name:"Wingline",register(n){Pr=n,n.i18n?.register?.(Yh),n.register({id:"page",area:"routes",data:{path:ef},render:()=>$h(U_,{})}),n.register({id:"nav",area:"sidebar.nav",data:{path:ef,label:F_(),codicon:"pulse"}})}};export{tb as default,jd as mountWorld,o_ as worldOf};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
