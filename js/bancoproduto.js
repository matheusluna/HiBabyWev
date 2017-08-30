(function(){
	
	//metodo para atualizar os dados.
	done.addEventListener('click' , e => {
		
		//Create references. referencia do bando de dados do firebase.
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('estoque');
		
		//Sync list changes.metodo de recuperar os dados do usuario.
		dbRefList.on('child_added', snap => {
			
			const retirada = document.getElementById('last_name');
			var array = localStorage.getObject("produto");
			
			if(snap.val().nome == array[0]){
				
				if((snap.val().quantidade - parseInt(retirada.value)) >= 0){
					
					const novo = {
						nome : snap.val().nome,
						quantidade : snap.val().quantidade - parseInt(retirada.value)
					}
					
					var updates = {};
					
					updates['estoque/' + snap.key] = novo;
					
					//metodo para atualizar os dados.
					firebase.database().ref().update(updates);
					
					window.location.replace("estoque.html");
				}else{
					alert("Valor incorreto!")
				}
			}
			
		});
	});
	
}());