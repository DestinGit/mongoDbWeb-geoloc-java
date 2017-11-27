<%-- 
    Document   : cinemas
    Created on : 27 nov. 2017, 10:10:42
    Author     : formation
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">        

        <script src="http://maps.google.com/maps/api/js?key=AIzaSyAm0nEmoO6ulxzsk_CIgFDz1qQ2_OA0Zgg"></script>

        <title>JSP Page</title>
        <style>
            #divMap{height: 500px; border: 1px solid black;}
        </style>
    </head>
    <body class="container">
        <div class="row">
            <h1 class="col-md-7 col-md-offset-2">Recherche les Cinémas à proximité!</h1>
            <form class="col-md-7 col-md-offset-2" action="/MongoDBWeb/CinemasNear" method="GET">
                <div class="form-group">
                    <label for="inputLatitude">Latitude</label>
                    <input type="text" class="form-control" id="inputLatitude" name="latitude" placeholder="Latitude">
                </div>
                <div class="form-group">
                    <label for="inputLongitude">Longitude</label>
                    <input type="text" class="form-control" id="inputLongitude" name="longitude" placeholder="Longitude">
                </div>
                <div class="form-group">
                    <label for="inputDistance">Distance</label>
                    <input type="text" class="form-control" id="inputDistance" name="distance" placeholder="Distance">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" type="submit">Rechercher</button>
                </div>
            </form>

            <h2 class="col-md-7">Liste des cinémas</h2>
            <div class="col-md-7">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nom Cinéma</th>
                            <th>Latitude Cinéma</th>
                            <th>Longitude Cinéma</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="element" items="${listeCinemas}">
                            <tr>
                                <td>${element["nomCinema"]}</td>
                                <td>${element["coords"]["lat"]}</td>
                                <td>${element["coords"]["lng"]}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div> 
            <div class="col-md-5">
                <div id="divMap"></div>
            </div>

        </div>
        <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>        
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>        
        <script src="js/geolocJQ.js"></script>
    </body>
</html>
