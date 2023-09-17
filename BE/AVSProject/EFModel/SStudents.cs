using System;
using System.Collections.Generic;

namespace AVSProject.model
{
    public partial class SStudents
    {
        public int StudentId { get; set; }
        public int BranchId { get; set; }
        public string StudentCode { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Decriptions { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
