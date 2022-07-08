kaboom({
    global:true,
    fullscreen:true,
    clearColor:[0,0.5,1,1],
    debug:true,
    scale:2,

})

loadRoot("./sprites/")
loadSprite('block','block.png')
loadSprite('mario','mario.png')
loadSprite('coin','coin.png' )
loadSprite('evil_mushroom','evil_mushroom.png')
loadSprite('pipe_up','pipe_up.png' )
loadSprite('surprise','surprise.png' )
loadSprite('unboxed','unboxed.png')
loadSound('gameSound','gameSound.mp3')
loadSound('jumpSound','jumpSound.mp3')
loadSprite('mushroom','mushroom.png')
loadSprite('cloud','cloud.png')
loadSprite('castle','castle.png')

scene("over",(score) => {
    add([
        text("game over!\n\n score:"+score+"\n Press R to restart ",20 ),
        origin("center"),
        pos (width() /2,height()/2),
       
    ]);
   
    keyDown('r', () =>{  
        go("begin");
      } );
})
scene("begin",() =>{
    add([
        text(["welcome to super mario bros \n made by eyal  " ]),
        origin("center"),
        pos(width()/2 ,height ()/2 -100 ),
    ]);
    const btn = add([rect (80,60 ),origin ("center"),pos(width ()/2 ,height () /2 )]);
    add([
        text ("start ",14 ),
        origin ("center"),
        pos (width ()/2 ,height ()/2 ),
        color (0.1,0.1,0.1),
    ]);
    btn.action(()=>{
        if(btn.isHovered()){
            btn.color=rgb(0.5,0.5,0.5);
             if (mouseIsClicked()){
            go("game");
        }
        
         }
         else{
            btn.color=rgb(1,1,1);
         }
    })
});
 scene("win",(score) =>{
    add([
        text("you winnnnn!!!"),origin("center"),(pos (width ()/2 ,height ()/2 )),

    ])

})
scene("game", () => {
    layers(["bg","obj","ui"] ,"obj")
    play("gameSound");
 
const key={
width:20,
height:20,
$:[sprite("coin"),"coin"],
k:[sprite("mushroom"),,"mushroom",body()],
m:[sprite("evil_mushroom"),("goomba")],
"=":[sprite("block"),solid(),],
"#":[sprite("surprise"),solid(),"surprise-coin"],
"*":[sprite("surprise"),solid(),"surprise-mushroom"],
"!":[sprite("unboxed"),solid(),],
"^":[sprite("pipe_up"),solid()],
"&":[sprite("cloud")],
c:[sprite("castle"),"catsle"],

};
const map =[
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                &                                                                   &                 ",
    "                                                                                                      ",
    "                                 &           &                                                        ",
    "                                                                                                     ",
    "                                                             &                                        ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                             *  =                     ",
    "                 #                                                        =                      c      ",
    "                      *=*            $         ^                       =                               ",
    "          #    ===    $     *    ===          =^   $$               =-                                 ",
    "            m                               =  ^                     m       =                        ",
    "===============   ====================================================================================",
    "===============   ====================================================================================",
    "===============   ====================================================================================",
    "===============   ====================================================================================",
    "===============   ====================================================================================",
    "===============   ====================================================================================",
 
];
const gameLevel=addLevel(map,key);
let isJumping=false
const speed=140
const jumpForce=360

const player=add([
    sprite("mario"),
    solid(),
    pos(30,0),
    body(),
    origin("bot"),
    big(jumpForce)
])
let score =0;
const scoreLabel =add([
    text ("SCORE\n"+score ),
    origin ("center"),
    pos (-20,170 ),
    layer("ui"),
    {
        value:score,
    }
])

keyDown('d', () =>{  
    player.move(speed,0);
  } );

keyDown('a', () =>{   
    
    if (player.pos.x>10){
        player.move(-speed,0);
    }  

    
 } );
keyPress("w", () =>{
if(player.grounded()){
    isJumping=true;
    player.jump(jumpForce)
    play("jumpSound");
}
})
player.on("headbump",(obj)=>{
    if(obj.is("surprise-coin")){
        gameLevel.spawn("$",obj.gridPos.sub(0,1));
        destroy(obj);
        gameLevel.spawn("!",obj.gridPos)

    }
  
    if(obj.is("surprise-mushroom")){
        gameLevel.spawn("k",obj.gridPos.sub(0,1));
        destroy(obj);
        gameLevel.spawn("!",obj.gridPos)


    }
})
    



  player.collides("coin", (x) => {
    destroy(x);
    scoreLabel.value+=100;
    scoreLabel.text="SCORE\n"+scoreLabel.value
      });
      player.collides("mushroom", (x) => {
        destroy(x);
        player.biggify(10);
        scoreLabel.value+=1000;
            scoreLabel.text="SCORE\n"+scoreLabel.value
          });
action("mushroom",(x)=>{
    x.move(50,0);
   
})
    player.collides("goomba",(x)=>{
        if( isJumping){
            destroy(x);
            scoreLabel.value+=100;
            scoreLabel.text="SCORE\n"+scoreLabel.value
        }
        else{
               destroy(player);
               go("over",scoreLabel.value);
        }

     
    });
action ("mushroom",(X)=>{
    X.move(20,0);
});



player.action(()=>{
    camPos(player.pos);
    if(player.pos.x>=1968.974800000001){
        go("win");
    }
    scoreLabel.pos.x=player.pos.x -320;
    if(player.grounded()){
        isJumping=false;
    }else{
        isJumping=true
    }
    if(player.pos.y >= height() +200){
        go("over",scoreLabel.value);
    }
})
;});


  start("begin") 

