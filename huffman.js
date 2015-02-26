function huffman(text){
    this.text = text;
    this.traverseFunctonList = ['deepFirst','breathFirst']
}

huffman.prototype.getTraverseFunctions = function(){
    return this.traverseFunctonList;
}

huffman.prototype.leaves = function(){
    var array_char_json = [];
    var not_check = []; 

    for(var i = 0; i < this.text.length; i++)
    { 
        if (not_check.indexOf(this.text[i]) != -1) 
            continue; //avoid checking same char twice
        
        //new char node
        var char_json = {};
        char_json.c = this.text[i];
        char_json.freq = 1;
        array_char_json.push(char_json);

        for(var j = i + 1; j < this.text.length ; j++)
        {
            if(this.text[i] === this.text[j]){
                not_check.push(this.text[j]);
                char_json.freq++;
            }
        } 
    }

    return array_char_json;
}

huffman.prototype.tree = function(){
    var tree = this.leaves(this.text).sort(
                    function(a,b) { 
                        return a.freq - b.freq; //min -> max
                    } 
                ); //priority queue of low-freq


    while(tree.length > 1)
    {
        //create new node with first two nodes
        var n = {};
        n.c = tree[0].c + tree[1].c;
        n.l = tree[0];
        n.r = tree[1];
        n.freq = tree[0].freq + tree[1].freq

        //remove first two nodes
        tree = tree.slice(2,tree.length);
        
        //add new node
        tree.push(n);

        //sort min->max
        tree.sort(
            function(a,b) { 
                return a.freq - b.freq;
            } 
        );
    }

    return tree[0]; //remaining node is root
}


huffman.prototype.rightCode = function(cod){
    return cod + '0'
}

huffman.prototype.leftCode = function(cod){
    return cod + '1'
}


huffman.prototype.deepFirst = function(array,node,cod){

    array.push({
        c: node.c,
        cod: cod,
        freq: node.freq
    });
    
    if(node.l != undefined) this.deepFirst(array,node.l,this.leftCode(cod));
    if(node.r != undefined) this.deepFirst(array,node.r,this.rightCode(cod));
}

/*huffman.prototype.breathFirstN = function(array,node){
    
    // MAL. iplementar queue/heap unica forma

    if(node === undefined) return;

    if(node.l != undefined)
    {
        array.push({
            c: node.l.c,
            freq: node.l.freq
        });
    }

    if(node.r != undefined)
    {
        array.push({
            c: node.r.c,
            freq: node.r.freq
        });
    }

    if(node.l != undefined) this.breathFirstN(array,node.l,true);
    if(node.r != undefined) this.breathFirstN(array,node.r,true);
}

huffman.prototype.breathFirst = function(array,node){
    
    array.push({
        c: node.c,
        freq: node.freq
    });

    this.breathFirstN(array,node);
}

huffman.prototype.array = function(traverseFuncton){
    var t = this.tree();
    var a = [];

    if(traverseFuncton === undefined)
    {
        this.breathFirst(a,t);
    }
    else
    {
        this[traverseFuncton](a,t);
    }
    
    return a;
}*/

huffman.prototype.coding = function(){
    var t = this.tree();
    var a = []
    var cod = '';

    this.deepFirst(a,t,cod);

    return a;
}

huffman.prototype.code = function(){
    var c = this.coding();
    var s = '';

    for(var i = 0; i < this.text.length; i++)
    {
        for(var j = 0; j < c.length; j++)
        {
            if(this.text[i] === c[j].c)
            {
                s += c[j].cod;
            }
        }
    }

    return s;
}




