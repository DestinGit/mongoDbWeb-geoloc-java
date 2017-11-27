/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package theconnections;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author formation
 */
public class TheConnections {

 
    /**
     *
     * @return
     */
    public static Connection getConnexionMySQL() {
        Connection cnx = null;
        try {
            cnx = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/cinescope2017", "root", "");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return cnx;
    } /// getConnexionMySQL

    /**
     *
     * @return
     */
    public static MongoClient getConnexionMongoDB() {
        MongoClient mongoClient = null;
        try {
//            MongoClientURI uri = new MongoClientURI("mongodb://127.0.0.1:27017");
//            mongoClient = new MongoClient(uri);
//            mongoClient = new MongoClient("172.26.10.144");

//            mongoClient = new MongoClient("127.0.0.1");

            mongoClient = new MongoClient(new MongoClientURI("mongodb://m2icdi:mdp12345@185.31.40.41/m2icdi_cine"));
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return mongoClient;
    } /// getConnexionMongoDB

    /**
     *
     * @param pcnx
     * @return
     */
    public static boolean deconnexionSQL(Connection pcnx) {
        boolean lbOK = true;
        try {
            pcnx.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return lbOK;
    } /// deconnexionSQL

    /**
     *
     * @param pcnx
     * @return
     */
    public static boolean deconnexionMDB(MongoClient pcnx) {
        boolean lbOK = true;
        try {
            pcnx.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return lbOK;
    } /// deconnexionMDB   
}
