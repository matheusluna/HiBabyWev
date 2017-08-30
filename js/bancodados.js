(function(){
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
	
	// Pego os elementos do html email, senha e do butao logar.
	const Email = document.getElementById('email');
	const Password = document.getElementById('password');
	const btnSignIn = document.getElementById('buttonSignIn');
	
	// Funçao de login. quando ele de um click no butao login vai ativar essa funçao, que serve para logar ele no firebase.
	btnSignIn.addEventListener('click', e => {
		
		// Pego os valores de email e pass.
		const email = Email.value;
		const pass = Password.value;
		
		var confirma = logar(email,pass);
	});
	
	function logar(email,pass){
		
		const auth = firebase.auth();
		
		//o metodo signInWithEmailAndPassword serve para fazer o login no firebase.
		auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
			// Handle Errors here.
			if (email == ""||pass == "") {
				alert("Preencha os dados vazios!")
			}else{
				alert("Dados incorretos!")
			}
			// ...
		});
	}
	
	// Add a realtime listener. Esse metodo onAuthStateChanged e para saber em tempo real si o usuario esta logado ou nao.
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			
			//Se ele tiver logado com sucesso ele e mandado para a pagina principal.
			window.location.replace("principal.html");
		}else{
		
		}
	});
	
}());