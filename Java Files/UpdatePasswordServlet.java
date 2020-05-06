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

@WebServlet("/UpdatePasswordServlet")
public class UpdatePasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public UpdatePasswordServlet() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userName=request.getParameter("userName");
		String password=request.getParameter("passWord");
		String newpassword=request.getParameter("newpassWord");
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from credential where username=? and password=?");  
            ps.setString(1,userName);
            ps.setString(2,password);
        	ResultSet rs = ps.executeQuery();
            if(rs.next()==true) {
            	ps.close();
            	rs.close();
            	PreparedStatement ps1=con.prepareStatement("update credential set password=? where username=?");  
                ps1.setString(1,newpassword);
                ps1.setString(2,userName);
            	ps1.executeUpdate();
            	ps1.close();
            	con.close();
            	ps1.close();
            	out.println("The Password Updated Successfully");
            }
            else {
            	out.println("This Admin/USer Doesn't exist");
            }
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}
}
