(function(){
	
	//Create references. referencia do bando de dados do firebase.
	const dbRefObjec = firebase.database().ref();
	const dbRefList = dbRefObjec.child('estoque');
	
	localStorage.setObject("estoque", []);
	
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList.on('child_added', snap => {
		
		produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap.val().nome + "')>" + 
								"<li class='collection-item avatar' href='principal.html'>" + 
									"<i class='material-icons circle'>folder</i>" + 
									"<span class='title'>" + snap.val().nome + "</span>" + 
									"<p>" + snap.val().quantidade + "</p>" + 
									"<a class='btn-floating red' href='produtoacrecimo.html'>" +
										"<i class='large material-icons'>add</i>" +
									"</a>" +
									"<a class='btn-floating red' href='produto.html'>" +
										"<i class='large material-icons'>remove</i>" +
									"</a>" +
									"<a class='btn-floating red' onclick=remove('" + snap.val().nome + "')>" +
										"<i class='large material-icons'>delete_forever</i>" +
									"</a>" +
								"</li>" + 
							"</ul>";
							
		adde(snap.val().nome);
	});
	
	dbRefList.on('child_changed', snap => {
		
		produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap.val().nome + "')>" + 
								"<li class='collection-item avatar' href='principal.html'>" + 
									"<i class='material-icons circle'>folder</i>" + 
									"<span class='title'>" + snap.val().nome + "</span>" + 
									"<p>" + snap.val().quantidade + "</p>" + 
									"<a class='btn-floating red' href='produtoacrecimo.html'>" +
										"<i class='large material-icons'>add</i>" +
									"</a>" +
									"<a class='btn-floating red' href='produto.html'>" +
										"<i class='large material-icons'>remove</i>" +
									"</a>" +
									"<a class='btn-floating red' onclick=remove('" + snap.val().nome + "')>" +
										"<i class='large material-icons'>delete_forever</i>" +
									"</a>" +
								"</li>" + 
							"</ul>";
	});
	
	
	//verifica remoçao de dados no firebase e atualiza para a pagina.
	dbRefList.on('child_removed', snap => {
		
		produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap.val().nome + "')>" + 
								"<li class='collection-item avatar' href='principal.html'>" + 
									"<i class='material-icons circle'>folder</i>" + 
									"<span class='title'>" + snap.val().nome + "</span>" + 
									"<p>" + snap.val().quantidade + "</p>" + 
									"<a class='btn-floating red' href='produtoacrecimo.html'>" +
										"<i class='large material-icons'>add</i>" +
									"</a>" +
									"<a class='btn-floating red' href='produto.html'>" +
										"<i class='large material-icons'>remove</i>" +
									"</a>" +
									"<a class='btn-floating red' onclick=remove('" + snap.val().nome + "')>" +
										"<i class='large material-icons'>delete_forever</i>" +
									"</a>" +
								"</li>" + 
							"</ul>";
							
		
	});

}());

function adde(nome){
	
	var array = localStorage.getObject("estoque");
	array.push(nome);
	console.log(nome);
	localStorage.setObject("estoque", array);
	
}

function escolhido(titulo) {
		localStorage.setObject("produto", []);
		
		var array = localStorage.getObject("produto");
		array.push(titulo);
		localStorage.setObject("produto", array);
}

function remove(nome){
	
	//Create references. referencia do bando de dados do firebase.
	const dbRefObjec = firebase.database().ref();
	const dbRefList1 = dbRefObjec.child('estoque');
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList1.on('child_added', snap => {
		
		if(snap.val().nome == nome){
			
			firebase.database().ref('estoque/' + snap.key).remove();
			window.location.replace("estoque.html");
		}
	});
}