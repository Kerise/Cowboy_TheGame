
class Game{
 
 constructor(p1,p2)
 {
  this._players = [p1,p2];
  this._turns = [null,null];
  this._bullets = [1,1];
  this._score = [0,0];

  this._sendToPlayers("Game Starts!");

  this._players.forEach((player,idx) => {
   player.on('turn',(turn) => {
    this._onTurn(idx,turn);
   });
  });
 }
 _sendToPlayer(playerIndex,msg)
 {
  this._players[playerIndex].emit('message',msg);
 }
 _sendToPlayers(msg)
 {
  this._players.forEach(player => {
  player.emit('message',msg);
   });
 }
 _onTurn(playerIndex,turn)
 {
  this._turns[playerIndex] = turn;
  this._sendToPlayer(playerIndex,`You selected ${turn}`);
  this._checkEndRound();
 }
 _checkEndRound()
 {
  const turns = this._turns;
  if(turns[0] && turns[1])
  {
   this._sendToPlayers('This round ' + turns.join(' : '));
   this._getRoundResult();
   this._players[0].emit('bullets',this._bullets[0]);
   this._players[1].emit('bullets',this._bullets[1]);
   this._players[0].emit('bullets2',this._bullets[1]);
   this._players[1].emit('bullets2',this._bullets[0]);
   this._players[0].emit('score',this._score[0]);
   this._players[1].emit('score',this._score[1]);
   this._players[0].emit('score2',this._score[1]);
   this._players[1].emit('score2',this._score[0]);
   this._turns = [null,null];
   this._sendToPlayers('Next Round!!!');
  }
 }
 _getRoundResult()
  {
   let p0 = this._decodeTurn(this._turns[0]);
   if(this._bullets[0]<=0 && p0 == 2) {this._sendToPlayer(0,"Nie masz amunicji");p0=1;}
   let p1 = this._decodeTurn(this._turns[1]);
   if(this._bullets[1]<=0 && p1 == 2) {this._sendToPlayer(1,"Nie masz amunicji");p1=1;}
   if(p0 == 0 && p1 == 0) {this._bullets[0]++; this._bullets[1]++;}
   if(p0 == 0 && p1 == 1) {this._bullets[0]++;}
   if(p0 == 0 && p1 == 2) {this._Win("P2 Wins");this._score[1]++;}
   if(p0 == 1 && p1 == 0) {this._bullets[1]++;}
   if(p0 == 1 && p1 == 1) ;
   if(p0 == 1 && p1 == 2) {this._bullets[1]--;}
   if(p0 == 2 && p1 == 0) {this._Win("P1 Wins");this._score[0]++;}
   if(p0 == 2 && p1 == 1) {this._bullets[0]--;}
   if(p0 == 2 && p1 == 2) {this._bullets[0]--;this._bullets[1]--;}
   if(this._bullets[0]==0)this._players[0].emit('message','Brak amunicji!');
   if(this._bullets[1]==0)this._players[1].emit('message','Brak amunicji!');
   if(p0 == 3){this._Win("P1 Wins");this._score[0]++;}
   if(p1 == 3){this._Win("P2 Wins");this._score[1]++;}
  }
_Win(msg)
{
 this._players[0].emit('win',"winable");
 this._players[1].emit('win',"winable");
 this._sendToPlayers(msg);
 this._bullets[0] = 1;
 this._bullets[1] = 1;
}
 _decodeTurn(turn)
 {
  switch (turn)
   {
     case 'reload':
      return 0;
     case 'shield':
      return 1;
     case 'aim':
      return 2;
     case 'bomb':
      return 3;
     default:
      throw new Error(`Could not decode turn ${turn}`);
   }
 }
}

module.exports = Game;


