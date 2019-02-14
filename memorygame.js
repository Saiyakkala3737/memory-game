    var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I'];
    var memory_values = [];                                                            //array for storing the values from memory array
    var memory_tile_ids = [];                                                        //array for storing the tile ids
    var tiles_flipped = 0; 
    var moves =1;                                                        //here this stores how many tiles have been flipped 
    Array.prototype.memory_tile_shuffle = function()                             //it is an dynamic array for shuffling tile id's w.r.t function
    {
        var i = this.length, j, temp;
        while(--i > 0)                                                              //this while loop iterate untill the i value is greater than 0
                                                                                             //where i is the array index of the memory_array[]
        {       
            j = Math.floor(Math.random() * (i+1));                       //this statements will random the vlaues and send the fllor values to j
            temp = this[j];                                                                 //value is sent to temp variable for storing
            this[j] = this[i];                                      
            this[i] = temp;
        }
    }
    function newBoard()                                                                         //here new board is created
    {
        tiles_flipped = 0;                                                              //when board is created initially the flipped tiles is 0    
        var output = '';
        memory_array.memory_tile_shuffle();                                                // here the shuffled values array function is called
        for(var i = 0; i < memory_array.length; i++)
        {
            output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
        }
        document.getElementById('memory_board').innerHTML = output;
        
    }
    function memoryFlipTile(tile,val,val2)
    {
        if(tile.innerHTML == "" && memory_values.length < 2)
        {
            tile.style.background = '#FFF';                                     //here  the background will change to white when we clicked
            tile.innerHTML = val;                                                            //when we flipped the tile it shows the value;
            if(memory_values.length == 0)                                                   //if there is no value in  memory it mean ===0
            {
                memory_values.push(val);                                                  //then the value is pushed into memoryvalues array
                memory_tile_ids.push(tile.id);                                         //when we clicked the tile the value is pushed into tile
            } 
            else if(memory_values.length == 1)                                               //if there are values in memory it mean equal to 1
            { 
                moveCounter();
                setTimer();
                memory_values.push(val);                       
                memory_tile_ids.push(tile.id);
                if(memory_values[0] == memory_values[1])                                            //if the first value is eqal to second value                
                {
                    tiles_flipped += 2;                                                             //then the tiles will be flipped            
                    // Clear both arrays
                    memory_values = [];                                                              //for next values the array will be cleared 
                    memory_tile_ids = [];                                                              //same for tiles        
                    // Check to see if the whole board is cleared
                    if(tiles_flipped == memory_array.length)                       //if all tiles flipped is equal to the total number of memory       
                    {
                        alert("Board cleared... generating new board");                 
                        document.getElementById('memory_board').innerHTML = "";     
                         //here the memory board will be deleted and by the newboard will be created with the dynamic function called newboard()
                    }
                } 
                else
                 {
                    function flip2Back()                                                                   //if the tiles of values not matched
                    {
                        // Flip the 2 tiles back over
                        var tile_1 = document.getElementById(memory_tile_ids[0]);
                        var tile_2 = document.getElementById(memory_tile_ids[1]);
                        tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                        tile_1.innerHTML = "";
                        tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                        tile_2.innerHTML = "";
                        // Clear both arrays
                        memory_values = [];
                        memory_tile_ids = [];
                    }
                    setTimeout(flip2Back, 700);
                }
            }
        }
    }
   
    function moveCounter(){
       head = document.getElementById('moves');
       head.innerHTML ='Moves' +"   "+moves++;
       document.getElementById('btn').addEventListener('click',restart)
    }
    second =0; minute =0; hour =0;
    function setTimer(){
    var timer = document.querySelector('.timer');

       interval =setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
    }
    function restart(){
        head.innerHTML = 'Moves';
        console.log(clearInterval(interval));
        newBoard();  
    }