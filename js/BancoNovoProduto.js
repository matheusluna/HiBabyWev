(function(){
	
	//metodo para atualizar os dados.
	done.addEventListener('click' , e => {
		
		//Get elements
		const nome = document.getElementById('last_name');
		const quantidade = document.getElementById('icon_telephone');
		
		//Create references
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('estoque');
		
		var array = localStorage.getObject("estoque");
		var confimar = false;
		
		for(var i=0; i<array.length; i++){
			if(nome.value == array[i]){
				confimar = true;
			}
		}
		
		if(parseInt(quantidade.value) < 0){
			alert("ERRO!Valor negativo")
		}else if (nome.value == "" || quantidade.value == ""){
			alert("Dados vazios")
		}else if(confimar == true){
			
			alert("Ja exite esse produto");
		}else{
			dbRefList.once('value', s =>{
				var a = s.exists();
					
				if(a === true){
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('estoque/').push({
						nome: nome.value,
						quantidade: parseInt(quantidade.value)
					});
					window.location.replace("estoque.html");
					
				}else{
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('estoque/').push({
						nome: nome.value,
						quantidade: parseInt(quantidade.value)
					});
					window.location.replace("estoque.html");
				}
			});
			
		}
		/*
		var confimar = false;
		for(var a= 0; a< vetor.length; a++){
			
			if(nome.value == vetor[a]){
				confirma = true;
			}
		}
		
		if(confimar != true){
			// adicionar direto. nao tem esse produto no banco.
			firebase.database().ref('estoque/').push({
				nome: nome.value,
				quantidade: parseInt(quantidade.value)
			});
			window.location.replace("estoque.html");
			
		}
		*/
	});
	
}());