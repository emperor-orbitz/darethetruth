<!DOCTYPE html>
<html>
<head>
	<title>twodolist</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>
<body>
<!------- student login section start here ------->

<div class="container-fluid login_banner " id="banner">
     <div class="row">

         <div class="banner_cont col-xs-8  col-xs-offset-2">

             <div class="well wellform">
                 <form method="post" action="loginprocess.php">
                     <h1 class="text-center">Login</h1><hr>

                    <fieldset class="form-group position-relative ">
                        <input type="text" class="form-control form-control-sm input-sm" placeholder="Enter Username" name="username" required>
                    </fieldset>
                    <fieldset class="form-group position-relative has-icon-left">
                        <input type="password" class="form-control form-control-sm input-sm" placeholder="Enter Password" name="password" required>
                    </fieldset>
                        <button type="submit" name="login" class="btn btn-primary btn-sm btn-block">Login</button>
                          <?php 
                    if (isset($_GET['id'])) {
                      echo '<div class="alert alert-danger">Oops ! incorrect login details</div>';
                    }
                   ?>
                    </form>
             </div>
         </div>

    </div>
</div>




<!--Main section start here  -->
    <section  id="about" class=" welcome">
        <div class="container">
            <div class="row" >


         <!-- Footer section start here -------->
    
    <footer id="footer">
        <div class="subfooter text-center footer">
            <p class="text-primary">&copy; Copyright Reserved | Developed and Design By <a href="#" >Oladipo Olamilekan</a></p>
        </div>
    </footer>
    
    <!-- Footer section Ends here -------->
    



<!-- GLOBAL SCRIPTS -->
    <script src="js/jquery-2.0.3.min.js"></script>
     <script src="js/bootstrap.min.js"></script>
    <!-- END GLOBAL SCRIPTS -->
<script type="text/javascript">
  $('.dropdown').hover(function(){
      $('.dropdown-toggle', this).trigger('click');
  });
</script>
<script src="js/login.js"></script>
</body>
</html>