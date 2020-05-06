package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AdminUserLoginServlet")
public class AdminUserLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AdminUserLoginServlet() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isFound1="{\"found\":\"yes\",\"isAdminOrNot\":\"yes\"}";
		String isFound2="{\"found\":\"yes\",\"isAdminOrNot\":\"no\"}";
		String notFound="{\"found\":\"no\"}";
		
		String userName=request.getParameter("userName");
		String password=request.getParameter("passWord");
		//System.out.println(userName+" "+password);
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from credential where username=? and password=?");  
            ps.setString(1,userName);
            ps.setString(2,password);
        	ResultSet rs = ps.executeQuery();
            if(rs.next()==true) {
            	if(rs.getString(3).equals("yes"))
            		out.println(isFound1);
            	else
            		out.println(isFound2);
            }
            else {
            	out.println(notFound);
            }
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}

}
