<!DOCTYPE html>
<html>
	<head>
		<!--Import Google Icon Font-->
		<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<!--Import materialize.css-->
		<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

		<!--Let browser know website is optimized for mobile-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	</head>

	<body class="blue lighten-5">
		<!--Import jQuery before materialize.js-->
		<div class="container">
			<div class="container">
				<div class="container">
					<div class="row center-align">
						<img src="img/logo.png" height="250px">
					</div>
					<div class="container">
						<form action="login.php" method="post">
							<div class="row">
								<div class="input-field col s12">
									<input id="email" type="email" name="email" class="validate">
									<label for="email">Email</label>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12">
									<input id="password" type="password" name="senha" class="validate">
									<label for="password">Senha</label>
								</div>
							</div>
							<div class="col s12">
								<p>Não possui conta?<a href="cadastro.php"> Crie uma conta.</a></p>
							</div>
							<div class="row center-align">
								<input class="waves-effect waves-light btn blue lighten-3" type="submit" name="" value="Login">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="js/materialize.min.js"></script>
	</body>
</html>
