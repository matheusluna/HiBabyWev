
	const filebutton = document.getElementById('arquivo');
	var file;
	
	filebutton.addEventListener('change', function(arquivo){
		
		file = arquivo.target.files[0];
		
	});
	
	var cor;
	//Salvo a cor que o usuario escolheu.
	blue.addEventListener('click' , ee =>{
		cor = "blue";
	});
	pink.addEventListener('click' , ez => {
		cor = "pink";
	});
	
	//Get elements
	const novoEmail = document.getElementById('emailC');
	const novoPass = document.getElementById('passC'); 
	const novoName = document.getElementById('nameC');
	
	
	//metodo para atualizar os dados.
	btnNovo.addEventListener('click' , e => {
		
		var confirma = configurar(file, cor , novoEmail, novoPass, novoName);
		
	});
	
	
	function configurar(file, cor , novoEmail, novoPass, novoName){
		
		// Add a realtime listener. Esse metodo onAuthStateChanged e para saber em tempo real si o usuario esta logado ou nao.
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			
			//verifico si tem usuario on.
			if(firebaseUser){
				
				//Create references
				const dbRefObjec = firebase.database().ref();
				const dbRefList = dbRefObjec.child('user');
				
				var user = firebaseUser;
				if((file) && (cor) && (novoName.value)){
				//Sync list changes.metodo de recuperar os dados do usuario.
				dbRefList.on('child_added', snap => {
					
					//testo para saber qual e os dados que serao modificados.
					if(firebaseUser.email == snap.val().email){
						
						//metodo para atualizar o email de autenticaçao.
						user.updateEmail(novoEmail.value).then(function() {
							// Update successful.
							//metodo para atualizar a senha de autenticaçao.
							user.updatePassword(novoPass.value).then(function() {
								// Update successful.
								//um novo objeto com os novos dados.
								const novo = {
									name : novoName.value,
									email : novoEmail.value,
									pass : novoPass.value,
									cor : cor
								}
								
								var updates = {};
								
								updates['user/' + snap.key] = novo;
								
								//metodo para atualizar os dados.
								firebase.database().ref().update(updates);
								
								
								
								var storageRef1 = firebase.storage().ref('icon/');
								// Create a reference to the file to delete
								storageRef1.child(snap.val().nome + '/' + snap.val().nome + '.jpg').delete();
								
								//Cria uma referencia no storage do firabase.
								var storageRef = firebase.storage().ref('icon/' + novoName.value + '/' + novoName.value);
								//Ele adiciona a foto na referencia criada no firabase storage.
								storageRef.put(file);
								/*
								//metodo para o usuario deslogar.
								firebase.auth().signOut();
								//redireciono para a pagina inicial para fazer o login novamente com a novo email e senha.
								window.location.replace("index.html");
								*/
								return true;
							}, function(error) {
								if(document.getElementById("passC").value == ""){
									alert("Preencha as campos vazios!")
									return false;
								}else{
									alert("Dados incorretos")
									return false;
								}
								
							});
						}, function(error) {
							// An error happened.
							if(document.getElementById("emailC").value == "" || document.getElementById("passC").value == "" ){
									alert("Preencha as campos vazios!")
									return false;
							}else{
									alert("Dados incorretos")
									return false;
							}
						});
					}else{
						return false;
					}
					
				});
				}else{
					return false;
				}
			}else{
				return false;
			}
			
		});
	}
