using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CRMDemoAPI.Models
{
    public class Emails
    {
        public int EmailId { get; set; }
        public int FlightId { get; set; }
        public string EmailName { get; set; }
        public string EmailSubjectTitle { get; set; }
        public string EmailBody { get; set; }
    }
}
