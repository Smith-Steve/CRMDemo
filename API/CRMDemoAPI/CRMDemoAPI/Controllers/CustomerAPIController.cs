using CRMDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace CRMDemoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAPIController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CustomerAPIController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        string dataBaseNameString = "DemoCRMDataBase";

        [HttpGet]
        public JsonResult GetAll()
        {
            string getAllQuery = @"select CustomerId, CustomerName, CustomerStreet1, CustomerStreet2, CustomerCity, CustomerState, CustomerJoin, CustomerVertical
                            from dbo.Customers";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader getReader;

            using (SqlConnection connectionGetAll = new SqlConnection(sqlDataSource))
            {
                connectionGetAll.Open();
                using (SqlCommand getCommand = new SqlCommand(getAllQuery, connectionGetAll))
                {
                    getReader = getCommand.ExecuteReader();
                    table.Load(getReader);
                    getReader.Close();
                    connectionGetAll.Close();
                };
            };
            return new JsonResult(table);
        }

        [HttpGet("details/{id}")]
        public JsonResult getOne(int id)
        {
            string getOneSqlQuery = @"select CustomerName, CustomerStreet1, CustomerCity,
                                    CustomerState, CustomerJoin, CustomerVertical
                                    from dbo.Customers where CustomerId = @CustomerId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader getOneReader;
            using (SqlConnection getOneSqlConnection = new SqlConnection(sqlDataSource))
            {
                getOneSqlConnection.Open();
                using (SqlCommand getOneCommand = new SqlCommand(getOneSqlQuery, getOneSqlConnection))
                {
                    getOneCommand.Parameters.AddWithValue("@CustomerId", id);

                    getOneReader = getOneCommand.ExecuteReader();
                    table.Load(getOneReader);
                    getOneReader.Close();
                    getOneSqlConnection.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult PostCustomer(Customers customer)
        {
            string insertCustomer = @"insert into dbo.Customers (CustomerName, CustomerStreet1, CustomerCity, CustomerState, CustomerJoin, CustomerVertical)
                                    values (@CustomerName, @CustomerStreet1, @CustomerCity, @CustomerState, @CustomerJoin, @CustomerVertical)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader postReader;
            using (SqlConnection postSqlConnection = new SqlConnection(sqlDataSource))
            {
                postSqlConnection.Open();
                using (SqlCommand postCommand = new SqlCommand(insertCustomer, postSqlConnection))
                {
                    postCommand.Parameters.AddWithValue("@CustomerName", customer.CustomerName);
                    postCommand.Parameters.AddWithValue("@CustomerStreet1", customer.CustomerStreet1);
                    postCommand.Parameters.AddWithValue("@CustomerCity", customer.CustomerCity);
                    postCommand.Parameters.AddWithValue("@CustomerState", customer.CustomerState);
                    postCommand.Parameters.AddWithValue("@CustomerJoin", DateTime.Now);
                    postCommand.Parameters.AddWithValue("@CustomerVertical", customer.CustomerVertical);
                    postReader = postCommand.ExecuteReader();
                    table.Load(postReader);
                    postReader.Close();
                    postSqlConnection.Close();
                }
            }
            return new JsonResult($"Customer '{customer.CustomerName}' added.");
        }

        [HttpPut("Update")]
        public JsonResult PutCustomer(Customers customers)
        {
            string updateCustomerSqlString = @"update dbo.Customers
                                            set CustomerName = @CustomerName, CustomerStreet1 = @CustomerStreet1,
                                            CustomerCity = @CustomerCity, CustomerState = @CustomerState,
                                            CustomerVertical = @CustomerVertical where CustomerId = @CustomerId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader putReader;
            using(SqlConnection putSqlConnection = new SqlConnection(sqlDataSource))
            {
                putSqlConnection.Open();
                using (SqlCommand putCommand = new SqlCommand(updateCustomerSqlString, putSqlConnection))
                {
                    putCommand.Parameters.AddWithValue("@CustomerId", customers.CustomerId);
                    putCommand.Parameters.AddWithValue("@CustomerName", customers.CustomerName);
                    putCommand.Parameters.AddWithValue("@CustomerStreet1", customers.CustomerStreet1);
                    putCommand.Parameters.AddWithValue("@CustomerCity", customers.CustomerCity);
                    putCommand.Parameters.AddWithValue("@CustomerState", customers.CustomerState);
                    putCommand.Parameters.AddWithValue("@CustomerVertical", customers.CustomerVertical);
                    putReader = putCommand.ExecuteReader();
                    table.Load(putReader);
                    putReader.Close();
                    putSqlConnection.Close();
                }
            }
            return new JsonResult($"Customer {customers.CustomerName} updated.");
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteCustomer(int id)
        {
            string deleteQuery = @"delete from dbo.Customers where CustomerId=@CustomerId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader deleteReader;
            using (SqlConnection deleteSqlConnection = new SqlConnection(sqlDataSource))
            {
                deleteSqlConnection.Open();
                using (SqlCommand deleteCommand = new SqlCommand(deleteQuery, deleteSqlConnection))
                {
                    deleteCommand.Parameters.AddWithValue("@CustomerId", id);

                    deleteReader = deleteCommand.ExecuteReader();
                    table.Load(deleteReader);
                    deleteReader.Close();
                    deleteSqlConnection.Close();
                }
            }
            return new JsonResult("Delete Successful");
        }
    }
}
