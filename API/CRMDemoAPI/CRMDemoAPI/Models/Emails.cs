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
        public DateTime SendOn { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime SentAt { get; set; } = DateTime.Now;
        //I am temporarily setting this value as this.
        //There shoud be a better way to address this
        public int EmailNumberInSequence { get; set;}
    }
}
