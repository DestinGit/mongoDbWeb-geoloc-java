/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.db.mongodb.controls;

import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import theconnections.TheConnections;

/**
 *
 * @author formation
 */
@WebServlet(name = "CinemasNear", urlPatterns = {"/CinemasNear"})
public class CinemasNear extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String collectionName = "cinemas", databaseName = "m2icdi_cine";
        MongoClient mongoClient = null;
        MongoCollection collection;
        MongoDatabase db;
        FindIterable<Document> resultat;

        JSONObject objetJSON;
        JSONArray tableauJSON = new JSONArray();
        try {
            mongoClient = TheConnections.getConnexionMongoDB();
            db = mongoClient.getDatabase(databaseName);
            collection = db.getCollection(collectionName);

            Document document;
            List<Double> listeCoordonnees = new ArrayList();
            double lat, lng;
            int liMaxDistance = 0;
            
            if (!request.getParameter("latitude").isEmpty() && !request.getParameter("longitude").isEmpty()) {
                lat = Double.valueOf(request.getParameter("latitude"));
                lng = Double.valueOf(request.getParameter("longitude"));
                
                listeCoordonnees.add(lng);
                listeCoordonnees.add(lat);
            }
            if (!request.getParameter("distance").isEmpty()) {
                liMaxDistance = Integer.valueOf(request.getParameter("distance"));
            }

            if (!request.getParameter("latitude").isEmpty() && !request.getParameter("longitude").isEmpty()
                    && !request.getParameter("distance").isEmpty()) {
                
                BasicDBObject requeteNear = (BasicDBObject) BasicDBObjectBuilder.start()
                        .push("coords")
                        .push("$near")
                        .add("$maxDistance", liMaxDistance)
                        .push("$geometry")
                        .add("coordinates", listeCoordonnees)
                        .get();

                resultat = collection.find(requeteNear);
            } else {
                resultat = collection.find();
            }

            for (Document doc : resultat) {

                objetJSON = new JSONObject();
                objetJSON.put("nomCinema", doc.get("nomCinema"));
                objetJSON.put("coords", doc.get("coords"));
                tableauJSON.add(objetJSON);
            }
        } catch (Exception ex) {
            System.out.println("Erreur : " + ex.getMessage());
        } finally {
            if (mongoClient != null) {
                TheConnections.deconnexionMDB(mongoClient);
            }
        }

        request.setAttribute("listeCinemas", tableauJSON);
        String lsURL = "cinemas.jsp";
        getServletContext().getRequestDispatcher("/" + lsURL).forward(request, response);

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
