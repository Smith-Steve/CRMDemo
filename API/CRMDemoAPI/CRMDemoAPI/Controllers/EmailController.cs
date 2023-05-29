using CRMDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.Design;
using System.Data;
using System.Data.SqlClient;

namespace CRMDemoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        string dataBaseNameString = "DemoCRMDataBase";

        [HttpGet]
        public JsonResult GetAll()
        {
            string getAllQuery = @"select FlightId, EmailName, EmailSubjectTitle, EmailBody from dbo.Emails";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader getAllReader;

            using (SqlConnection connectionGetAll = new SqlConnection(sqlDataSource))
            {
                connectionGetAll.Open();
                using (SqlCommand getCommand = new SqlCommand(getAllQuery, connectionGetAll))
                {
                    getAllReader= getCommand.ExecuteReader();
                    table.Load(getAllReader);
                    getAllReader.Close();
                    connectionGetAll.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("details/{id}")]
        public JsonResult getOne(int id)
        {
            string getOneSqlQuery = @"select EmailId, FlightId, EmailName, EmailSubjectTitle, EmailBody 
                                    from dbo.Emails where EmailId = @EmailId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader getOneReader;
            using (SqlConnection getOneSqlConnection = new SqlConnection(sqlDataSource))
            {
                getOneSqlConnection.Open();
                using (SqlCommand getOneCommand = new SqlCommand(getOneSqlQuery, getOneSqlConnection))
                {
                    getOneCommand.Parameters.AddWithValue("@EmailId", id);

                    getOneReader = getOneCommand.ExecuteReader();
                    table.Load(getOneReader);
                    getOneReader.Close();
                    getOneSqlConnection.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult PostEmail(Emails email)
        {
            string insertEmail = @"insert into dbo.Emails (FlightId, EmailName, EmailSubjectTitle, EmailBody)
                                   values(@FlightId, @EmailName, @EmailSubjectTitle, @EmailBody)";
            DataTable table= new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader postReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDataSource))
            {
                sqlConnection.Open();
                using (SqlCommand postCommand = new SqlCommand(insertEmail, sqlConnection))
                {
                    postCommand.Parameters.AddWithValue("@FlightId", email.FlightId);
                    postCommand.Parameters.AddWithValue("@EmailName", email.EmailName);
                    postCommand.Parameters.AddWithValue("@EmailSubjectTitle", email.EmailSubjectTitle);
                    postCommand.Parameters.AddWithValue("@EmailBody", email.EmailBody);
                    postReader = postCommand.ExecuteReader();
                    table.Load(postReader);
                    postReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult($"Email '{email.EmailName}' added.");
        }

        [HttpPut]
        public JsonResult PutEmail(Emails email)
        {
            string updateEmailSqlString = @"update dbo.Emails set FlightId = @FlightId,
                                            EmailName = @EmailName, EmailSubjectTitle = @EmailSubjectTitle, EmailBody = @EmailBody where EmailId = @EmailId";

            DataTable table= new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader putReader;
            using(SqlConnection SqlConnection = new SqlConnection(sqlDataSource))
            {
                SqlConnection.Open();
                using (SqlCommand putCommand = new SqlCommand(updateEmailSqlString, SqlConnection))
                {
                    putCommand.Parameters.AddWithValue("@EmailId", email.EmailId);
                    putCommand.Parameters.AddWithValue("@FlightId", email.FlightId);
                    putCommand.Parameters.AddWithValue("@EmailName", email.EmailName);
                    putCommand.Parameters.AddWithValue("@EmailSubjectTitle", email.EmailSubjectTitle);
                    putCommand.Parameters.AddWithValue("@EmailBody", email.EmailBody);
                    putReader = putCommand.ExecuteReader();
                    table.Load(putReader);
                    putReader.Close();
                    SqlConnection.Close();
                }
            }
            return new JsonResult($"Customer {email.EmailName} in {email.FlightId} updated.");
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteEmail(int id)
        {
            string deleteQuery = @"delete from dbo.Emails where EmailId = @EmailId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader dataReader;
            using(SqlConnection SqlConnection = new SqlConnection(sqlDataSource))
            {
                SqlConnection.Open();
                using (SqlCommand deleteCommand = new SqlCommand(deleteQuery,SqlConnection))
                {
                    deleteCommand.Parameters.AddWithValue("@EmailId", id);
                    dataReader = deleteCommand.ExecuteReader();
                    table.Load(dataReader);
                    dataReader.Close();
                    SqlConnection.Close();
                };
            }
            return new JsonResult("New Delete Complete");
        }
    }
}
