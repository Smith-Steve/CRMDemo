﻿using CRMDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace CRMDemoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public FlightController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        string dataBaseNameString = "DemoCRMDataBase";

        [HttpGet]
        public JsonResult GetAll()
        {
            string getAllQuery = @"select FlightId, FlightName from dbo.Flights";
            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader SqlDataReader;

            using (SqlConnection connectionGetAll = new SqlConnection(SqlDataSource))
            {
                connectionGetAll.Open();
                using (SqlCommand getCommand = new SqlCommand(getAllQuery, connectionGetAll))
                {
                    SqlDataReader = getCommand.ExecuteReader();
                    table.Load(SqlDataReader);
                    SqlDataReader.Close();
                    connectionGetAll.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult getOne(int id)
        {
            string getOneSqlQuery = @"select FlightId, FlightName from dbo.flights where FlightId = @FlightId";
            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader SqlDataReader;
            using (SqlConnection getOneConnection = new SqlConnection(SqlDataSource))
            {
                getOneConnection.Open();
                using(SqlCommand getOneCommand = new SqlCommand(getOneSqlQuery, getOneConnection))
                {
                    getOneCommand.Parameters.AddWithValue("@FlightId", id);
                    SqlDataReader = getOneCommand.ExecuteReader();
                    table.Load(SqlDataReader);
                    SqlDataReader.Close();
                    getOneConnection.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult PostFlight(Flights flight)
        {
            string insertFlight = @"insert dbo.Flights (FlightName)
                                    values (@FlightName)";
            DataTable table = new DataTable();
            string SqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader postReader;
            using(SqlConnection postSqlConnection = new SqlConnection(SqlDataSource))
            {
                postSqlConnection.Open();
                using (SqlCommand postCommand = new SqlCommand(insertFlight, postSqlConnection))
                {
                    postCommand.Parameters.AddWithValue("@FlightName", flight.FlightName);
                    postReader = postCommand.ExecuteReader();
                    table.Load(postReader);
                    postReader.Close();
                    postSqlConnection.Close();
                }
            }
            return new JsonResult($"Flight '{flight.FlightName}' added.");
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteFlight(int id)
        {
            string deleteQuery = @"delete from dbo.Flights where FlightId=@FlightId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString(dataBaseNameString);
            SqlDataReader deleteReader;
            using (SqlConnection deleteSqlConnection = new SqlConnection(sqlDataSource))
            {
                deleteSqlConnection.Open();
                using (SqlCommand deleteCommand = new SqlCommand(deleteQuery, deleteSqlConnection))
                {
                    deleteCommand.Parameters.AddWithValue("@FlightId", id);

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
