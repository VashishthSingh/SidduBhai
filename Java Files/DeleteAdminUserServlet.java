package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DeleteAdminUserServlet")
public class DeleteAdminUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public DeleteAdminUserServlet() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userName=request.getParameter("userName");
//		String password=request.getParameter("passWord");
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("delete from credential where username=?");  
            ps.setString(1,userName);
//            ps.setString(2,password);
        	int i = ps.executeUpdate();
            if(i==1) 
            	out.println("Deleted");
            else 
            	out.println("Does't Exist");
            
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}

}
