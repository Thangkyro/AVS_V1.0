using System;
using System.Collections.Generic;

namespace AVSProject.model
{
    public partial class SStaff
    {
        public int StaffId { get; set; }
        public int BranchId { get; set; }
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool? IsVn { get; set; }
        public string Idcard { get; set; }
        public string Decriptions { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
