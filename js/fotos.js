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
	
	var url   = window.location.href;
	var titulo = url.split("?")[1];
	var titulo1 = titulo.split("&")[0];
	var idAlbum = titulo.split("&")[1].split("=")[1];
	var titulo2 = titulo1.split("=")[1];
	document.getElementById("titulo").innerHTML = titulo2;
	//Função que adciona uma url de imagem ao banco de dados e adciona na pagina html
	//Recebe uma url
	//retorna true
	function onSuccess(imageData) {
		
		//Create references. referencia do bando de dados do firebase.
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('albuns');
		
		//Sync list changes.metodo de recuperar os dados do usuario.
		dbRefList.on('child_added', snap => {
			
			//testo para saber qual e os dados que serao modificados.
			if(idAlbum == snap.key){
				const db2 = firebase.database().ref('albuns/'+ snap.key + '/');
				const db3 = db2.child('fotos');
				
				db3.push({
					url: imageData
				}).key;
				
				db3.on('child_added', snap2 => {
					
					albuns.innerHTML += "<div id='" + snap2.key +"' class='col s12'><img class='materialboxed' width='500' height='500' src='"+snap2.url+"'></div>";
					
				});
				
				db3.on('child_changed', snap2 => {
					
					albuns.innerHTML += "<div id='" +snap2.key+"' class='col s12'><img class='materialboxed' width='500' height='500' src='"+snap2.url+"'></div>";
				});
				
				//verifica remoçao de dados no firebase e atualiza para a pagina.
				db3.on('child_removed', snap2 => {
					
					document.getElementById(snap2.key).innerHTML = '';
				});
				
			}
		});
		return true;
	}
	//função que se falhar imprime a mensagem de erro
	//recebe uma mensagem de erro
	//retorna false
	function onFail(message) {
		alert('Failed because: ' + message);
		return false;
	}
	//função que chama a camera do dispositivo e se conseguir capturar a foto, chama a função onSucess se falhar chama a função onFail
	btFoto.onclick = function () {
		// body...
		navigator.camera.getPicture(onSuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.DATA_URL
	})};
}());