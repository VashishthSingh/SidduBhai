package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.google.gson.Gson;

@WebServlet("/AngularJsServlet3")
public class AngularJsServlet3 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AngularJsServlet3() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        ArrayList<Users> al = new ArrayList<>();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from credential");  
        	ResultSet rs = ps.executeQuery();
             
            while (rs.next()) {
                Users userobj = new Users(rs.getString("username"), rs.getString("password"),rs.getString("isadmin"));
                al.add(userobj);
            }
           JSONArray  arrayObj = new JSONArray(al);
           String json = new Gson().toJson(arrayObj);
           out.println(json);
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}

}
