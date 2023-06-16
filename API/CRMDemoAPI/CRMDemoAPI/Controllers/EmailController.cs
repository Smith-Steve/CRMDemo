using CRMDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
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
            string getAllQuery = @"select EmailId, FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, CreatedAt, SentAt, EmailNumberInSequence
                                   from dbo.Emails";

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

        [HttpGet("Flight/{id}")]
        public JsonResult getAllFromFlight(int id)
        {
            string getAllFromFlight = @"Select EmailId, FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, CreatedAt, SentAt, EmailNumberInSequence
                                        from dbo.Emails where FlightId = @FlightId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader getAllFlightReader;

            using (SqlConnection getAllEmailsFlightConnection = new SqlConnection(sqlDataSource))
            {
                getAllEmailsFlightConnection.Open();
                using(SqlCommand getEmailsByFlightCommand = new SqlCommand(getAllFromFlight, getAllEmailsFlightConnection))
                {
                    getEmailsByFlightCommand.Parameters.AddWithValue("@FlightId", id);
                    getAllFlightReader = getEmailsByFlightCommand.ExecuteReader();
                    table.Load(getAllFlightReader);
                    getAllFlightReader.Close();
                    getAllEmailsFlightConnection.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult PostEmail(Emails email)
        {

            string insertEmail = @"insert into dbo.Emails (FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, CreatedAt, SentAt, EmailNumberInSequence)
			                        values(@FlightId, @EmailName, @EmailSubjectTitle, @EmailBody, @SendOn, @CreatedAt, @SentAt, @EmailNumberInSequence)";
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
                    postCommand.Parameters.AddWithValue("@SendOn", email.SendOn);
                    postCommand.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
                    postCommand.Parameters.AddWithValue("@SentAt", email.SentAt);
                    postCommand.Parameters.AddWithValue("@EmailNumberInSequence", email.EmailNumberInSequence);
                    postReader = postCommand.ExecuteReader();
                    table.Load(postReader);
                    postReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult($"Email '{email.EmailName}' added.");
        }

        [HttpPut("Update")]
        public JsonResult PutEmail(Emails email)
        {
            string updateEmailSqlString = @"update dbo.Emails set EmailName = @EmailName, EmailSubjectTitle = @EmailSubjectTitle, EmailBody = @EmailBody, SendOn = @SendOn, EmailNumberInSequence = @EmailNumberInSequence
                                            where EmailId = @EmailId";

            DataTable table= new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader putReader;
            using(SqlConnection SqlConnection = new SqlConnection(sqlDataSource))
            {
                SqlConnection.Open();
                using (SqlCommand putCommand = new SqlCommand(updateEmailSqlString, SqlConnection))
                {
                    putCommand.Parameters.AddWithValue("@EmailId", email.EmailId);
                    putCommand.Parameters.AddWithValue("@EmailName", email.EmailName);
                    putCommand.Parameters.AddWithValue("@EmailSubjectTitle", email.EmailSubjectTitle);
                    putCommand.Parameters.AddWithValue("@EmailBody", email.EmailBody);
                    putCommand.Parameters.AddWithValue("@SendOn", email.SendOn);
                    putCommand.Parameters.AddWithValue("@EmailNumberInSequence", email.EmailNumberInSequence);
                    putReader = putCommand.ExecuteReader();
                    table.Load(putReader);
                    putReader.Close();
                    SqlConnection.Close();
                }
            }
            return new JsonResult($"Customer {email.EmailName} in {email.FlightId} updated.");
        }

        [HttpDelete("delete/{id}")]
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
