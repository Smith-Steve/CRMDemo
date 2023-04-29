using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CRMDemoAPI.Models
{
    public class Customers
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerStreet { get; set; }
        public string CustomerStreet2 { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerState { get; set; }
        public DateTime CustomerJoin { get; set; }
        public string CustomerVertical { get; set; }
    }
}
