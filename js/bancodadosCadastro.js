
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDTgFfL8QZU6kA1q9Jc9I4Lu24CuaQiJEs",
		authDomain: "hibaby-1bebf.firebaseapp.com",
		databaseURL: "https://hibaby-1bebf.firebaseio.com",
		projectId: "hibaby-1bebf",
		storageBucket: "hibaby-1bebf.appspot.com",
		messagingSenderId: "9227781946"
	};
	firebase.initializeApp(config);
	
	//pega a cor que usuario clicou.
	var cor;
	blue.addEventListener('click' , ee =>{
		cor = "blue";
	});
	pink.addEventListener('click' , ez => {
		cor = "pink";
	});
	
	const novoEmail = document.getElementById('email');
	const novoPass = document.getElementById('password');
	const novoName = document.getElementById('first_name');
	const filebutton = document.getElementById('arquivo');
	var file;
	//Adiciona o arquivo na variavel file.
	filebutton.addEventListener('change', function(e){
		
		file = e.target.files[0];
		
	});
	
	btnNovo.addEventListener('click' , e => {
		
		var confirma = cadastra(file,cor,novoName.value, novoEmail.value, novoPass.value);
		
	});
	
	function cadastra(file, cor, novoName, novoEmail, novoPass){
		
		//Para testar si o usuario clicou na cor e adicinou o arquivo.
		if((file) && (cor) && (novoName)){
			//Cria o usuario no firebase no autenticar.
			firebase.auth().createUserWithEmailAndPassword(novoEmail, novoPass).then(function(){
				// Update successful.
				//Cria o usuario no firebase no database.
				firebase.database().ref('user/').push({
					name : novoName,
					email : novoEmail,
					pass : novoPass,
					cor : cor
				}).key;
				
				//Cria uma referencia no storage do firabase.
				var storageRef = firebase.storage().ref('icon/' + novoName + '/' + novoName);
				//Ele adiciona a foto na referencia criada no firabase storage.
				storageRef.put(file);
				
				alert("Cadastro feito com sucesso!")
				return true;
			}, function(error) {
				// An error happened. Erro de criaçao no autenticar.
				if(document.getElementById("email").value == "" || document.getElementById("password").value == "" ){
					alert("Preencha as campos vazios!")
					return false;
				}else{
					alert("Dados incorretos")
					return false;
				}
			});
			
		}else{
			alert("ERRO! Nao clicou na cor ou Nao adicionou o arquivo ou Nao preencheu o campo nome!");
			return false;
		}
	}