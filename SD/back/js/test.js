(function(){
	
	//�㼯�������ʽ�������ʽ���Ƿ���ߣ��Ƿ���䣬����һ��canvas.
	var Polygon=function(points,strokeStyle,fillStyle,isStroke,isFill){
		this.points=points;
		this.strokeStyle=strokeStyle;
		this.fillStyle=fillStyle;
		this.isFill=isFill;
		
		this.draw=function(id){
			var canvas=document.createElement('canvas');
			var context=canvas.getContext('2d');
			var maxX=0,maxY=0;
			for(var i=0;i<this.points.length;i++){
				if(this.points[i][0]>maxX)
					maxX=this.points[i][0];
				if(this.points[i][1]>maxY)
					maxY=this.points[i][1];
			}
			canvas.height=maxY;
			canvas.width=maxX;
			context.beginPath();
			context.strokeStyle=this.strokeStyle;
			context.fillStyle=this.fillStyle;
			context.moveTo(this.points[0][0],this.points[0][1]);
			for(var i=1;i<this.points.length;i++)
				context.lineTo(this.points[i][0],this.points[i][1]);
			context.closePath();
			if(isFill)
				context.fill();
			if(isStroke)
				context.stroke();
			canvas.style.position="absolute";
			canvas.id=id;
			document.getElementById('stage').appendChild(canvas);
			return canvas;
		}
	}
	//�������ĸߣ��?����ÿ�ε��������֣��α�ߴ�
	function Slide(height,width,blockCount,descriptions,cursorUnit){			
		this.height=height;
		this.width=width;
		this.cursorUnit=cursorUnit;
			
		//�����α���״
		this.cursor=[[cursorUnit,0],[2*cursorUnit,cursorUnit],[2*cursorUnit,3*cursorUnit],[0,3*cursorUnit],[0,cursorUnit],[cursorUnit,0]];
			
		//������ɫ
		this.colors=['#EA0000','#0000E3','#00BB00','#00E3E3','#F9F900','#8600FF','#0000C6','#28FF28','#FF8000','#000079','#009100','#3A006F','#FF2D2D','#7B7B7B','#642100','#484891','#336666','#FFFF37','#600030','#003E3E','#613030'];
			
		//����
		var tmp;
		tmp=new Polygon([[0,0],[width,0],[width,10],[0,height],[0,0]],'blue',undefined,true,false);
		this.axis=tmp.draw('axis');
			
		//�α������
		this.points=[];
		for(var i=0,d=width/blockCount;i<blockCount;i++){
				
			tmp=new Polygon(this.cursor,undefined,this.colors[i],false,true);
			this.points[i]=tmp.draw(i);
			this.points[i].style.top=this.height+'px';
			this.points[i].style.left=d*(i+1)-this.cursorUnit+'px';
				
			//ÿ���α��������
			var description=document.createElement('div');
			//ÿ���α��ռ��
			var ratio=document.createElement('p');
			//ÿ���α����������
			var content=document.createElement('p');
				
			description.id=i+'description';
			ratio.id=i+'ratio';
			content.id=i+'content';
			description.style.position="absolute";
			description.style.width=this.width;
			description.style.left=this.points[i].style.left;
			description.style.top=this.height+this.cursorUnit+'px';
			description.style.color=this.colors[i];
			description.style.fontFamily='';
			description.style.visibility='hidden';
			document.getElementById('stage').appendChild(description);
			description.appendChild(ratio);
			description.appendChild(content);
				
			if(i==0)
				ratio.innerHTML=Math.round((parseInt(this.points[i].style.left)+this.cursorUnit)/parseInt(this.width)*10000)/100+'%';
			else
				ratio.innerHTML=Math.round((parseInt(this.points[i].style.left)-parseInt(this.points[i-1].style.left))/parseInt(this.width)*10000)/100+'%';
			content.innerHTML=descriptions[i];
		}
			
		//������ɫ
		this.axisContext=this.axis.getContext('2d');
		for(var i=0,d=width/blockCount;i<blockCount;i++){
			this.axisContext.fillStyle=this.colors[i];
			this.axisContext.fillRect(d*i,0,d,this.height);
		}
		
		//����α���Ӧ�¼�
		this.addListener=function(){
			//��ǰ�϶��α�
			var drager=undefined;
			//���ǰһ��ʱ�̵ĺ����
			var pre=undefined;
			//��ǰ�϶����α�ɻ��Χ���������
			var left=undefined;
			//��ǰ�϶����α�ɻ��Χ���������
			var right=undefined;
			//��ǰ�϶��α��ID
			var id=undefined;
			var temp=this;
		
			//ÿ���α������갴���¼�
			for(var i=0;i<temp.points.length;i++){
				temp.points[i].onmousedown=function(e){
					if(i!=temp.points.length-1)
						drager=this;
					pre=e.clientX;
					id=parseInt(this.id);
					left=(id==0?temp.cursorUnit:parseInt(temp.points[id-1].style.left)+2*temp.cursorUnit);
					right=(id==temp.points.length-1?parseInt(temp.width)-3*temp.cursorUnit:parseInt(temp.points[id+1].style.left)-2*temp.cursorUnit);
					document.getElementById(id+'description').style.visibility='visible';
				}	
			}
			
			document.onmouseup=function(e){
				if(drager!=undefined){
					document.getElementById(id+'description').style.visibility='hidden';
					drager=undefined;
					pre=undefined;
					id=undefined;
				}
			}
			
			document.onmousemove=function(e){
				if(drager!=undefined){
					var tmp=parseInt(drager.style.left)+e.clientX-pre;
					if(tmp>=left&&tmp<=right){
						drager.style.left=tmp+'px';
						var description=document.getElementById(id+'description');
						description.style.left=tmp+'px';
						document.getElementById(id+'ratio').innerHTML=Math.round((tmp-left+2*temp.cursorUnit)/temp.width*10000)/100+'%';
						document.getElementById(id+1+'ratio').innerHTML=Math.round((right-tmp+2*temp.cursorUnit)/temp.width*10000)/100+'%';
						temp.axisContext.fillStyle=temp.colors[id];
						temp.axisContext.fillRect(left,0,tmp-left+temp.cursorUnit,temp.height);
						temp.axisContext.fillStyle=temp.colors[id+1];
						temp.axisContext.fillRect(tmp+temp.cursorUnit,0,right-tmp,temp.height);
					}
					pre=e.clientX;
				}
			}
		}
	}
	
	new Slide(15,600,4,[],8).addListener();
})();