var db = new Pouch('presentation');
var replicate;
    marked.setOptions({color: true})
    var ee = document.getElementById("md");
    var cur = 1;
    function load(){
    db.query('medium/sum',function(err,doc){
        var len = doc.rows[0].value;
        console.log(len);
        function go(n) {
        cur = n||1;
        
        db.get(n.toString(),function(err,doc){
            var i = 1e3;
            ee.innerHTML = marked(doc.text);
            var e = document.getElementsByTagName('p')[0];
            e.style.display = 'inline';
        e.style.fontSize = i + 'px';
        document.body.style.backgroundImage = '';
            if(n%2){
                e.style.backgroundColor='#fff';
                e.style.color='#000';
            }else{
                e.style.backgroundColor='#000';
                e.style.color='#fff';
            }
            document.body.style.backgroundColor = e.style.backgroundColor;
        if (e.firstChild.nodeName === 'IMG') {
            document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
            e.firstChild.style.display = 'none';
        }
        while (
            e.offsetWidth > window.innerWidth ||
            e.offsetHeight > window.innerHeight) {
            e.style.fontSize = (i -= 10) + 'px';
            if (i < 0) break;
        }
        e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
        if (window.location.hash !== n) window.location.hash = n;
        document.title = e.textContent || e.innerText;
        });
        
    }
    document.onclick = function() { go(++cur % (len)); };
    function fwd() { go(Math.min(len, ++cur)); }
    function rev() { go(Math.max(1, --cur)); }
    document.onkeydown = function(e) {
        if (e.which === 39) fwd();
        if (e.which === 37) rev();
    };
    document.ontouchstart = function(e) {
        var x0 = e.changedTouches[0].pageX;
        document.ontouchend = function(e) {
            var x1 = e.changedTouches[0].pageX;
            if (x1 - x0 < 0) fwd();
            if (x1 - x0 > 0) rev();
        };
    };
    function parse_hash() {
        return Math.max(
            parseInt(window.location.hash.substring(1), 10), 1);
    }
    if (window.location.hash) cur = parse_hash() || cur;
    window.onhashchange = function() {
        var c = parse_hash();
        if (c !== cur) go(c);
    };
go(cur);
 });
}
load();
replicate = function (){
    db.replicate.from(location.protocol+'//'+location.host+'/pres',{complete:function(){ 
        load();
    }});
}

   
