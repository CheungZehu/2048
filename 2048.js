var game = {
	data:null,
	RN:4,
	CN:4,
	scroe:0,
	state:0, //保存游戏的状态
	RUNNIMG:1, //表示游戏正在运行
	GAMEOVER:0,//表示游戏结束
	start:function(){
		this.state=this.RUNNIMG;
		this.data=[];
		for(var r=0;r<this.RN;r++){
			this.data[r]=[];
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;
			}
		}
		this.score=0;
		this.randowNum();
		this.randowNum();
		this.updateView();
	},
	isGameOver:function(){
		for(var r=0;r<this.data.length;r++){
			for(var c=0;c<this.data[r].length;c++){
				if(this.data[r][c]==0){
					return false;
				}else{
					if(c!=this.data[r].length-1&&this.data[r][c]==this.data[r][c+1]){
						return false;
					}else if(r!=this.data.length-1&&this.data[r][c]==this.data[r+1][c]){
						return false;
					}
				}
			}
		}
		this.state=this.GAMEOVER;
		return true;
	},
	randowNum:function(){
		if(!this.isFull()){
			while(true){
				var r=parseInt(Math.random()*(this.RN));
				var c=parseInt(Math.random()*(this.CN));
				if(this.data[r][c]==0){
					this.data[r][c]=Math.random()<0.5?2:4;
					break;
				}
			}
		}
	},
	isFull:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}
			}
		}
	},
	updateView:function(){
		//将数组中不为0的数字显示在棋盘中，并设置相应的样式。
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var div = document.getElementById("c"+r+c);
				if(this.data[r][c]!=0){
					div.innerHTML=this.data[r][c];
					div.className="cell n"+this.data[r][c];
				}else{
					div.className="cell";
					div.innerHTML="";
				}
			}
		}
		var span=document.getElementById("score");
		span.innerHTML=this.score;
		var gameover=document.getElementById("gameover");
		if(this.state==this.GAMEOVER){
			var spann=document.getElementById("finalScroe");
			spann.innerHTML=this.score;
			gameover.style.display="block";
		}else{
			gameover.style.display="none";
		}
		
	},
	moveLeft:function(){//左
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){
			this.moveLeftInRow(r);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randowNum();
			this.isGameOver();
			this.updateView();
		}
	},
	moveLeftInRow:function(r){
		for(var c=0;c<this.CN-1;c++){
			var next=this.getRightNext(r,c);
			if(next==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][next];
					this.data[r][next]=0;
					c--;
				}else if(this.data[r][c]==this.data[r][next]){
					this.data[r][c]*=2;
					this.data[r][next]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getRightNext:function(r,c){
		for(var nextC=c+1;nextC<this.CN;nextC++){
			if(this.data[r][nextC]!=0){
				return nextC;
			}
		}
		return -1;
	},

	moveRight:function(){//右
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){
			this.moveRightInRow(r);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randowNum();
			this.isGameOver();
			this.updateView();
		}
	},
	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var last=this.getLeftLast(r,c);
			if(last==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][last];
					this.data[r][last]=0;
					c++;
				}else if(this.data[r][c]==this.data[r][last]){
					this.data[r][c]*=2;
					this.data[r][last]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getLeftLast:function(r,c){
		for(var lastC=c-1;lastC>=0;lastC--){
			if(this.data[r][lastC]!=0){
				return lastC;
			}
		}
		return -1;
	},

	mvoeUp:function(){//上
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){
			this.moveUpInCol(c);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randowNum();
			this.isGameOver();
			this.updateView();
		}
	},
	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var down=this.getDownNext(r,c);
			if(down==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[down][c];
					this.data[down][c]=0;
					r--;
				}else if(this.data[r][c]==this.data[down][c]){
					this.data[r][c]*=2;
					this.data[down][c]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getDownNext:function(r,c){
		for(var downR=r+1;downR<this.RN;downR++){
			if(this.data[downR][c]!=0){
				return downR;
			}
		}
		return -1;
	},
	moveDown:function(){//下
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){
			this.moveDownInCol(c);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randowNum();
			this.isGameOver();
			this.updateView();
		}
	},
	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var up=this.getUpLast(r,c);
			if(up==-1){
				break;
			}else{
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[up][c];
					this.data[up][c]=0;
					r++;
				}else if(this.data[r][c]==this.data[up][c]){
					this.data[r][c]*=2;
					this.data[up][c]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getUpLast:function(r,c){
		for(var lastR=r-1;lastR>=0;lastR--){
			if(this.data[lastR][c]!=0){
				return lastR;
			}
		}
		return -1;
	}
}
window.onload=function(){
	game.start();
	document.onkeydown=function(){
		var e=window.event||arguments[0];
		if(e.keyCode==37){
			game.moveLeft();
		}else if(e.keyCode==39){
			game.moveRight();
		}else if(e.keyCode==38){
			game.mvoeUp();
		}else if(e.keyCode==40){
			game.moveDown();
		}
	}
}
