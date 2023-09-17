using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AVSProject.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public long Expired { get; set; }
    }
}
