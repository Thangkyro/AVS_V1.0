using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AVSProject.Models
{
    public class UserModel
    {
        public int Userid { get; set; }
        public int BranchId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public bool IsAdmin { get; set; }
        public int StaffId { get; set; }
        public string Password { get; set; }
        public string Permission { get; set; }
        public string Decriptions { get; set; }
        public bool IsInactive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public long Expired { get; set; }
    }
}
