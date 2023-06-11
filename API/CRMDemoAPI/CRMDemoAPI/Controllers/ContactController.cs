using CRMDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CRMDemoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public ContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        string databaseSQLString = "DemoCRMDataBase";

        //Get API Calls
        [HttpGet]
        public JsonResult GetAll()
        {
            string getAllContactsQuery = @"Select ContactId, CustomerId, FirstName, LastName, Email, PhoneNumber from dbo.Contacts";

            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader getAllReader;

            using(SqlConnection connectionGetAll = new SqlConnection(SqlDataSource))
            {
                connectionGetAll.Open();
                using(SqlCommand getAllCommand = new SqlCommand(getAllContactsQuery, connectionGetAll))
                {
                    getAllReader = getAllCommand.ExecuteReader();
                    table.Load(getAllReader);
                    getAllReader.Close();
                    connectionGetAll.Close();
                };
            };
            return new JsonResult(table);
        }

        [HttpGet("CustomerContacts/{id}")]
        public JsonResult getAllFromClient(int id)
        {
            string getAllContactsByClientQuery = @"Select ContactId, CustomerId, FirstName, LastName, Email, PhoneNumber 
                                                    from dbo.Contacts where CustomerId = @CustomerId";
            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader getAllContactsClientReader;
            using (SqlConnection getContactsByCustomerConnection = new SqlConnection(SqlDataSource))
            {
                getContactsByCustomerConnection.Open();
                using (SqlCommand getContactsByCustomerCommand = new SqlCommand(getAllContactsByClientQuery, getContactsByCustomerConnection))
                {
                    getContactsByCustomerCommand.Parameters.AddWithValue("@CustomerId", id);
                    getAllContactsClientReader = getContactsByCustomerCommand.ExecuteReader();
                    table.Load(getAllContactsClientReader);
                    getAllContactsClientReader.Close();
                    getContactsByCustomerConnection.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("CustomerContacts/{CustomerId}/contact/{ContactId}")]
        public JsonResult GetOneFromClient(int CustomerId, int ContactId)
        {
            string getAllContactsByClientQuery = @"Select CustomerId, FirstName, LastName, Email, PhoneNumber 
                                                    from dbo.Contacts where CustomerId = @CustomerId and ContactId = @ContactId";
            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader getAllContactsClientReader;
            using (SqlConnection getContactsByCustomerConnection = new SqlConnection(SqlDataSource))
            {
                getContactsByCustomerConnection.Open();
                using (SqlCommand getContactsByCustomerCommand = new SqlCommand(getAllContactsByClientQuery, getContactsByCustomerConnection))
                {
                    getContactsByCustomerCommand.Parameters.AddWithValue("@CustomerId", CustomerId);
                    getContactsByCustomerCommand.Parameters.AddWithValue("@ContactId", ContactId);
                    getAllContactsClientReader = getContactsByCustomerCommand.ExecuteReader();
                    table.Load(getAllContactsClientReader);
                    getAllContactsClientReader.Close();
                    getContactsByCustomerConnection.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult PostContact(Contacts contact)
        {
            string insertContact = @"insert into dbo.Contacts (CustomerId,FirstName, LastName, Email, PhoneNumber)
                                    values (@CustomerId, @FirstName, @LastName, @Email, @PhoneNumber)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader postContactReader;
            using (SqlConnection postSqlConnection = new SqlConnection(sqlDataSource))
            {
                postSqlConnection.Open();
                using (SqlCommand postCommand = new SqlCommand(insertContact, postSqlConnection))
                {
                    postCommand.Parameters.AddWithValue("@CustomerId", contact.CustomerId);
                    postCommand.Parameters.AddWithValue("@FirstName", contact.FirstName);
                    postCommand.Parameters.AddWithValue("@LastName", contact.LastName);
                    postCommand.Parameters.AddWithValue("@Email", contact.Email);
                    postCommand.Parameters.AddWithValue("@PhoneNumber", contact.PhoneNumber);
                    postContactReader = postCommand.ExecuteReader();
                    table.Load(postContactReader); 
                    postContactReader.Close();
                    postSqlConnection.Close();
                }
            }
            return new JsonResult($"Contact {contact.FirstName} {contact.LastName} added.");
        }
        [HttpPut("Update")]
        public JsonResult PutContact(Contacts contact)
        {
            string updateContactSqlString = @"update dbo.Contacts set FirstName = @FirstName, LastName = @LastName, Email = @Email, PhoneNumber = @PhoneNumber
                                            where ContactId = @ContactId";

            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader putReader;
            using (SqlConnection putSqlConnection = new SqlConnection(SqlDataSource))
            {
                putSqlConnection.Open();
                using (SqlCommand putCommand = new SqlCommand(updateContactSqlString, putSqlConnection))
                {
                    putCommand.Parameters.AddWithValue("@ContactId", contact.ContactId);
                    putCommand.Parameters.AddWithValue("@FirstName", contact.FirstName);
                    putCommand.Parameters.AddWithValue("@LastName", contact.LastName);
                    putCommand.Parameters.AddWithValue("@Email", contact.Email);
                    putCommand.Parameters.AddWithValue("@PhoneNumber", contact.PhoneNumber);
                    putReader = putCommand.ExecuteReader();
                    table.Load(putReader);
                    putReader.Close();
                    putSqlConnection.Close();
                }
            }
            return new JsonResult($"Contact {contact.FirstName} {contact.LastName} updated.");
        }
        [HttpDelete("delete/{id}")]
        public JsonResult DeleteContact(int id)
        {
            string deleteQuery = @"delete from dbo.Contacts where ContactId=@ContactId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(databaseSQLString);
            SqlDataReader deleteContactReader;
            using (SqlConnection deleteSqlConneciton = new SqlConnection(sqlDataSource))
            {
                deleteSqlConneciton.Open();
                using (SqlCommand deleteContactCommand = new SqlCommand(deleteQuery, deleteSqlConneciton))
                {
                    deleteContactCommand.Parameters.AddWithValue("@ContactId", id);
                    
                    deleteContactReader = deleteContactCommand.ExecuteReader();
                    table.Load(deleteContactReader);
                    deleteContactReader.Close();
                    deleteSqlConneciton.Close();
                }
            }
            return new JsonResult("Delete Successful.");
        }
    }
}
