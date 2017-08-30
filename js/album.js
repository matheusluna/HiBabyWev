(function(){

	var config = {
		apiKey: "AIzaSyDTgFfL8QZU6kA1q9Jc9I4Lu24CuaQiJEs",
		authDomain: "hibaby-1bebf.firebaseapp.com",
		databaseURL: "https://hibaby-1bebf.firebaseio.com",
		projectId: "hibaby-1bebf",
		storageBucket: "hibaby-1bebf.appspot.com",
		messagingSenderId: "9227781946"
	};
	firebase.initializeApp(config);
	
	//Create references. referencia do bando de dados do firebase.
	const dbRefObjec = firebase.database().ref();
	const dbRefList = dbRefObjec.child('albuns');
	
	localStorage.setObject("albuns", []);
	
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList.on('child_added', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum="+ snap.val().nome +"&idAlbum="+ snap.key +"'>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light' onclick=remove('"+snap.val().nome+"')>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='novo"+snap.val().nome+"'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<a class='editar btn green waves-effect waves-light btn' onclick=editAlbum('"+snap.val().nome+"')>Salvar</a>" +
						"</form>" +
					"</div>" +
					"</div>";
		adde(snap.val().nome);
	});
	
	dbRefList.on('child_changed', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum="+ snap.val().nome +"&idAlbum="+ snap.key +"'>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light' onclick=remove('"+snap.val().nome+"')>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='novo"+snap.val().nome+"'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<a class='editar btn green waves-effect waves-light btn' onclick=editAlbum('"+snap.val().nome+"')>Salvar</a>" +
						"</form>" +
					"</div>" +
					"</div>";
		
	});
	
	dbRefList.on('child_removed', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum="+ snap.val().nome +"&idAlbum="+ snap.key +"'>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light' onclick=remove('"+snap.val().nome+"')>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='novo"+snap.val().nome+"'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<a class='editar btn green waves-effect waves-light btn' onclick=editAlbum('"+snap.val().nome+"')>Salvar</a>" +
						"</form>" +
					"</div>" +
					"</div>";
		
	});
	
	criar.addEventListener('click' , ss => {
		var nome = document.getElementById("nomeAlbum").value;
		addAlbum(nome);
	});

	
}());
	//função quee edita o album no firebase
//recebe o nome do album
//retorna false se não for editado com sucesso e true se for
function editAlbum (name) {
	// body...
	const dbRefObjec = firebase.database().ref();
	const dbRefList1 = dbRefObjec.child('albuns');
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList1.on('child_added', snap => {
		
		if(snap.val().nome == name){
			var novoNome = document.getElementById("novo"+name).value;
			
			dbRefList1.child(snap.key).set({nome:novoNome});
			window.location.replace("albuns.html");

		}
	});
}
//função quee deleta o album no firebase
//recebe o nome do album
//retorna false se não for removido com sucesso e true se for
function remove (nome) {
	// body...
	const dbRefObjec = firebase.database().ref();
	const dbRefList1 = dbRefObjec.child('albuns');
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList1.on('child_added', snap => {
		
		if(snap.val().nome == nome){
			
			firebase.database().ref('albuns/' + snap.key).set(null);
			window.location.replace("albuns.html");
		}
	});
	
}
//função quee adciona o album no firebase
//recebe o nome do album
//retorna true se for adcionado com sucesso e false se não for
function addAlbum (nome) {
	// body...
	//Create references
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('albuns');
		
		var array = localStorage.getObject("albuns");
		var confimar = false;
		
		for(var i=0; i<array.length; i++){
			if(nome == array[i]){
				confimar = true;
			}
		}
		
		if (nome == ""){
			alert("Dado vazio")
			return false;
		}else if(confimar == true){
			
			alert("Ja exite esse album");
			return false;
		}else{
			
			dbRefList.once('value', s =>{
				var a = s.exists();
				
				if(a === true){
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('albuns/').push({
						nome: nome
					});
					return true;
					
				}else{
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('albuns/').push({
						nome: nome
					});
					return true;
				}
			});
			
		}
}

function adde(nome){
	
	var array = localStorage.getObject("albuns");
	array.push(nome);
	localStorage.setObject("albuns", array);
	
}
