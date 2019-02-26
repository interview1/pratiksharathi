using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication3.DataAccessLayer
{
    public class EmployeeData
    {
        string connStr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        public DataTable EmployeeInfo(string sortName, string sortDirection)
        {
            using (SqlConnection cn = new SqlConnection(connStr))

            {

                cn.Open();
                string sql = "Select employeeId, employeeName , designation from dbo.EmployeeInfoTable order by " + sortName + " " + sortDirection;
                using (SqlDataAdapter da = new SqlDataAdapter(sql, connStr))

                {
                    DataSet ds = new DataSet();

                    da.Fill(ds);

                    return ds.Tables[0];

                }

            }
        }

        public int Save(string employeeName, string designation,int id , int flag)
        {
                      
            string createQuery = String.Format("Insert into dbo.EmployeeInfoTable (employeeName,designation) values('" + employeeName + "','" + designation+ "')");

            string updateQuery = String.Format("Update dbo.EmployeeInfoTable SET employeeName='{0}', designation = '{1}' Where employeeId = {2};",
               employeeName, designation ,id);

            SqlConnection connection = new SqlConnection(connStr);
            connection.Open();

            //Create a Command object
            SqlCommand command = null;

            if (flag != 0)
                command = new SqlCommand(updateQuery, connection);
            else
                command = new SqlCommand(createQuery, connection);

            int empId = 0;
            try
            {
                //Execute the command to SQL Server and return the newly created ID
                var commandResult = command.ExecuteScalar();
                if (commandResult != null)
                {
                    empId = Convert.ToInt32(commandResult);
                }
                else
                {
                    //the update SQL query will not return the primary key but if doesn't throw exception
                    //then we will take it from the already provided data
                    empId = id+1;
                }
            }
            catch (Exception ex)
            {
                //there was a problem executing the script
            }

            //Close and dispose
            command.Dispose();
            connection.Close();
            connection.Dispose();

            return empId;
        }

        public bool Delete(int id)
        {
            
            bool result = false;
            string sqlQuery = String.Format("delete from dbo.EmployeeInfoTable where employeeId = {0}", id);

            SqlConnection connection = new SqlConnection(connStr);
            connection.Open();

            SqlCommand command = new SqlCommand(sqlQuery, connection);

            int rowsDeletedCount = command.ExecuteNonQuery();
            if (rowsDeletedCount != 0)
                result = true;
 
            command.Dispose();
            connection.Close();
            connection.Dispose();
            return result;
        }
    }
}